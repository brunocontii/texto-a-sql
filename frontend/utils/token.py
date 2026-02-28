# frontend/utils/token.py
import re
import sqlglot
from sqlglot import exp
from transformers import AutoTokenizer

# Cargamos solo el tokenizador de manera global para que se inicialice una vez.
# Esto descargará el vocabulario (~3MB) si no está en caché.
try:
    tokenizer = AutoTokenizer.from_pretrained("Salesforce/codet5p-770m", use_fast=False)
except Exception as e:
    print(f"Error cargando tokenizador: {e}")
    tokenizer = None

def serialize_schema_for_tokens(user_schema: str) -> str:
    """
    Copia exacta de la función _serialize_schema de model.py
    para garantizar que el conteo de tokens sea preciso.
    """
    if not user_schema or "CREATE TABLE" not in user_schema.upper():
        return user_schema.strip()

    normalized_schema = re.sub(r'\s+', ' ', user_schema).strip()
    table_pattern = r'CREATE\s+TABLE\s+(\w+)\s*\((.*?)\)\s*;'
    table_matches = re.findall(table_pattern, normalized_schema, re.IGNORECASE | re.DOTALL)
    
    fk_list = []
    fk_pattern = r'FOREIGN\s+KEY\s*\(\s*(\w+)\s*\)\s*REFERENCES\s+(\w+)\s*\(\s*(\w+)\s*\)'

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
                
                col_str = f"{col_type} {col_name}"
                if is_pk:
                    col_str += " (pk)"
                    
                columns_formatted.append(col_str)

        if table_name and columns_formatted:
            tables_formatted.append(f"{table_name.lower()} : {' , '.join(columns_formatted)}")

    schema_str = " | ".join(tables_formatted)
    
    if fk_list:
        schema_str += f" | foreign keys: {', '.join(fk_list)}"
        
    return schema_str

def calculate_tokens(natural_text: str, schema: str) -> dict:
    """
    Construye el prompt idéntico al de CodeT5p y cuenta la longitud de los input_ids.
    """
    if tokenizer is None:
        return {"total_tokens": 0, "error": True}
        
    schema_text = str(schema).strip() if schema else ""
    spider_format = ""
    
    if schema_text:
        spider_format = serialize_schema_for_tokens(schema_text)
        
    # El prompt exacto con el que se entrenó
    prompt = f"translate to SQL: {natural_text} | db_id: custom_db | schema: {spider_format}"
    
    # Obtenemos la cantidad de tokens
    tokens = tokenizer(prompt, truncation=False).input_ids
    total_tokens = len(tokens)
    
    return {
        "total_tokens": total_tokens,
        "error": False
    }