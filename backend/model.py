import re
import torch
import sqlglot
from sqlglot import exp
from typing import List, Any
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

class SQLGenerator:
    def __init__(self, model_path: str = "brunnoconti/codet5-sql-generator"):        
        # si tenes gpu que agarre esa
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
        
        try:
            self.tokenizer = AutoTokenizer.from_pretrained(model_path, use_fast=False)
            self.model = AutoModelForSeq2SeqLM.from_pretrained(model_path)
            self.model.to(self.device)
            self.model.eval()
            print(f"✅ Modelo cargado desde: {model_path}")
        except Exception as e:
            print(f"❌ Error cargando modelo: {e}")
            raise

    def _serialize_schema(self, user_schema: str) -> str:
        """
        Convierte SQL DDL al formato usado para entrenar
        """
        
        # verificacion de esquema basico
        if not user_schema or "CREATE TABLE" not in user_schema.upper():
            return user_schema.strip()

        # primero extraer mapeo de fks con regex
        # normalizar espacios y saltos de linea a un solo espacio para facilitar la busqueda
        normalized_schema = re.sub(r'\s+', ' ', user_schema).strip()
        
        # patron para definicion de tabla
        table_pattern = r'CREATE\s+TABLE\s+(\w+)\s*\((.*?)\)\s*;'
        table_matches = re.findall(table_pattern, normalized_schema, re.IGNORECASE | re.DOTALL)
        
        # mapear fks: {tabla_local: {columna_local: (tabla_ref, columna_ref)}}
        fk_map = {}
        
        # patron para encontrar fk dentro de los contenidos de la tabla
        fk_pattern = r'FOREIGN\s+KEY\s*\(\s*(\w+)\s*\)\s*REFERENCES\s+(\w+)\s*\(\s*(\w+)\s*\)'

        for table_name, table_content in table_matches:
            fk_matches = re.findall(fk_pattern, table_content, re.IGNORECASE)
            
            if fk_matches:
                fk_map[table_name] = {}
                for local_col, ref_table, ref_col in fk_matches:
                    # almacenamos el nombre de la tabla de referencia y la columna de referencia
                    fk_map[table_name][local_col] = (ref_table, ref_col)

        # parsear con sqlglot y formatear al estilo entrenamiento
        try:
            parsed = sqlglot.parse(user_schema, read="mysql")
        except Exception:
            return user_schema.strip()

        tables_formatted = []

        for expression in parsed:
            if not isinstance(expression, exp.Create):
                continue
            
            # obtener nombre de la tabla
            table_name = expression.this.this.name if isinstance(expression.this, exp.Schema) else (
                        expression.this.name if hasattr(expression.this, "name") else None)
            
            if not table_name:
                continue

            columns_formatted = []
            
            # definicion de tipos
            def _get_simplified_type(raw_type: str) -> str:
                raw_type = raw_type.lower()
                if 'int' in raw_type or 'serial' in raw_type: return 'int'
                if 'char' in raw_type or 'text' in raw_type or 'varchar' in raw_type: return 'text'
                if 'date' in raw_type or 'time' in raw_type: return 'time'
                if 'float' in raw_type or 'double' in raw_type or 'decimal' in raw_type: return 'number'
                return 'text'

            # procesar columnas
            if hasattr(expression.this, "expressions") and expression.this.expressions:
                for def_col in expression.this.expressions:
                    if not isinstance(def_col, exp.ColumnDef):
                        continue

                    col_name = def_col.name
                    
                    # tipo de datos
                    raw_type = def_col.kind.sql() if def_col.kind else "text"
                    col_type = _get_simplified_type(raw_type)

                    props: List[str] = []

                    # detectar pk
                    for constraint in def_col.args.get("constraints", []):
                        if isinstance(constraint.kind, exp.PrimaryKeyColumnConstraint):
                            props.append("PK")
                            break
                    
                    # detectar fk usando el mapeo
                    if table_name in fk_map and col_name in fk_map[table_name]:
                        ref_table, ref_col = fk_map[table_name][col_name]
                        
                        props.append(f"FK->{ref_table}.{ref_col}")

                    # construir el string de la columna
                    props_str = f", {', '.join(props)}" if props else ""
                    columns_formatted.append(f"{col_name} ({col_type}{props_str})")

            if table_name and columns_formatted:
                # table_name : col1 (type, prop), col2 (type, prop)
                tables_formatted.append(f"{table_name} : {', '.join(columns_formatted)}")

        # el resultado final se une por ' | '
        return " | ".join(tables_formatted)
    
    def generate_sql(self, natural_text: str, schema: Any = "", max_length: int = 256) -> str:        
        # convertir schema a string
        schema_text = str(schema).strip() if schema else ""
        
        print(f"\nConsulta: {natural_text}")
        print(f"\nSchema:\n{schema_text}")
        
        # pasar el schema subido por el usuario al formato de entrenamiento
        if schema_text:
            schema_text = self._serialize_schema(schema_text)
        
        # combinar natural_text + schema para mejor contexto
        prompt = (
            f"Generate SQL query for the following question. "
            f"Use standard SQL syntax with lowercase keywords. "
            f"Question: {natural_text} | Database Schema: {schema_text}"
        )
        
        print(f"\nPrompt:\n{prompt}")
        
        input_ids = self.tokenizer(
            prompt,
            return_tensors="pt",
            max_length=1024,
            truncation=True
        ).input_ids.to(self.device)
        
        with torch.no_grad():
            outputs = self.model.generate(
                input_ids,
                max_length=max_length,
                num_beams=5,
                early_stopping=True,
                repetition_penalty=1.0,
            )
        sql_query = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return sql_query

# instancia global (se carga una sola vez, para la segunda solo lo agarra no recarga modelo)
sql_generator = None

def get_sql_generator():
    global sql_generator
    if sql_generator is None:
        sql_generator = SQLGenerator()
    return sql_generator