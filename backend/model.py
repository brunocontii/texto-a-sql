# carga y ejecución del modelo, tambien genera SQL obviamente
import torch
from typing import Any, List
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import os

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
    
    def _serialize_schema(self, schema: Any) -> str:
        # si schema ya es texto derecho
        if schema is None:
            return ""
        if isinstance(schema, str):
            return schema.strip()
        # si schema es lista/dict estructurado: intentar serializar a CREATE TABLE...
        parts: List[str] = []
        try:
            # se convierte todo a una lista para procesarlo igual
            tables_list = []
            if isinstance(schema, list):
                tables_list = schema
            elif isinstance(schema, dict):
                tables_list = schema.get("tables") or schema.get("tables_list") or []

            for t in tables_list:
                name = t.get("schema_name") or t.get("name") or t.get("table") or ""
                
                cols = t.get("columns") or []
                
                cols_names = []
                for c in cols:
                    if isinstance(c, str):
                        cols_names.append(c)
                    else:
                        col_name = c.get("value") or c.get("name") or ""
                        if col_name:
                            cols_names.append(col_name)
                
                cols_str = ", ".join(cols_names)
                
                if name and cols_str:
                    cols_str = ", ".join(cols_names)
                    parts.append(f"{name} : {cols_str}")
        except Exception as e:
            print(f"⚠️ Error serializando schema: {e}")
            return ""
            
        return " | ".join(parts)
    
    def generate_sql(self, natural_text: str, schema: str = "", max_length: int = 256) -> str:
        schema_text = self._serialize_schema(schema)
        # combinar natural_text + schema para mejor contexto, anda mejor
        prompt = f"Question: {natural_text} | Schema: {schema_text}"
        
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
                num_return_sequences=1,
                early_stopping=True,
                length_penalty=1.0,
                repetition_penalty=1.2,
                no_repeat_ngram_size=3,
                do_sample=False
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