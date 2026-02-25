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
        Ejemplo salida: table_name : text col1 , number col2 (pk) | foreign keys: table_name.col = ref_table.ref_col
        """
        if not user_schema or "CREATE TABLE" not in user_schema.upper():
            return user_schema.strip()

        normalized_schema = re.sub(r'\s+', ' ', user_schema).strip()
        table_pattern = r'CREATE\s+TABLE\s+(\w+)\s*\((.*?)\)\s*;'
        table_matches = re.findall(table_pattern, normalized_schema, re.IGNORECASE | re.DOTALL)
        
        fk_list = []
        fk_pattern = r'FOREIGN\s+KEY\s*\(\s*(\w+)\s*\)\s*REFERENCES\s+(\w+)\s*\(\s*(\w+)\s*\)'

        # extraer todas las fk y guardarlas en el formato: "t1.c1 = t2.c2"
        for table_name, table_content in table_matches:
            fk_matches = re.findall(fk_pattern, table_content, re.IGNORECASE)
            if fk_matches:
                for local_col, ref_table, ref_col in fk_matches:
                    fk_list.append(f"{table_name.lower()}.{local_col.lower()} = {ref_table.lower()}.{ref_col.lower()}")

        try:
            parsed = sqlglot.parse(user_schema, read="mysql")
        except Exception:
            return user_schema.strip()

        tables_formatted = []

        for expression in parsed:
            if not isinstance(expression, exp.Create):
                continue
            
            table_name = expression.this.this.name if isinstance(expression.this, exp.Schema) else (
                        expression.this.name if hasattr(expression.this, "name") else None)
            
            if not table_name:
                continue

            columns_formatted = []
            
            def _get_simplified_type(raw_type: str) -> str:
                raw_type = raw_type.lower()
                if 'int' in raw_type or 'serial' in raw_type: return 'number'
                if 'char' in raw_type or 'text' in raw_type or 'varchar' in raw_type: return 'text'
                if 'date' in raw_type or 'time' in raw_type: return 'time'
                if 'float' in raw_type or 'double' in raw_type or 'decimal' in raw_type: return 'number'
                return 'text'

            if hasattr(expression.this, "expressions") and expression.this.expressions:
                for def_col in expression.this.expressions:
                    if not isinstance(def_col, exp.ColumnDef):
                        continue

                    col_name = def_col.name.lower()
                    raw_type = def_col.kind.sql() if def_col.kind else "text"
                    col_type = _get_simplified_type(raw_type)

                    is_pk = False
                    for constraint in def_col.args.get("constraints", []):
                        if isinstance(constraint.kind, exp.PrimaryKeyColumnConstraint):
                            is_pk = True
                            break
                    
                    # formato: "type name" o "type name (pk)"
                    col_str = f"{col_type} {col_name}"
                    if is_pk:
                        col_str += " (pk)"
                        
                    columns_formatted.append(col_str)

            if table_name and columns_formatted:
                tables_formatted.append(f"{table_name.lower()} : {' , '.join(columns_formatted)}")

        schema_str = " | ".join(tables_formatted)
        
        # agregar las fk al final de todo el schema
        if fk_list:
            schema_str += f" | foreign keys: {', '.join(fk_list)}"
            
        return schema_str
    
    def generate_sql(self, natural_text: str, schema: Any = "", max_length: int = 256) -> str:        
        # convertir schema a string
        schema_text = str(schema).strip() if schema else ""
        
        print(f"\nConsulta: {natural_text}")
        print(f"\nSchema:\n{schema_text}")
        
        # pasar el schema subido por el usuario al formato de entrenamiento
        if schema_text:
            schema_text = self._serialize_schema(schema_text)
        
        # prompt exacto con el que se entreno
        prompt = f"translate to SQL: {natural_text} | db_id: custom_db | schema: {schema_text}"
        
        print(f"\nPrompt:\n{prompt}")
        
        input_ids = self.tokenizer(
            prompt,
            return_tensors="pt",
            max_length=512,
            truncation=True
        ).input_ids.to(self.device)
        
        with torch.no_grad():
            outputs = self.model.generate(
                input_ids,
                max_length=max_length,
                num_beams=5,
                early_stopping=True,
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