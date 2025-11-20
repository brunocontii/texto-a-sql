import reflex as rx
import httpx
from .InputState import InputState
from .SchemaState import SchemaState

class QueryState(rx.State):
    result_sql: str = ""
    is_loading: bool = False

    async def generate_sql(self):
        self.is_loading = True
        self.result_sql = "Generando"
        
        text_val = await self.get_state(InputState)
        schema_val = await self.get_state(SchemaState)

        # api.py espera: { "natural_text": "...", "schema": ... } tipo json
        payload = {
            "natural_text": text_val.user_text,
            "schema": schema_val.tables 
        }

        # llamo a la API
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    "http://127.0.0.1:8000/api/generate-sql",
                    json=payload,
                    timeout=60.0 # dar tiempo al modelo
                )
                
            if response.status_code == 200:
                data = response.json()
                self.result_sql = data["sql_query"]
            else:
                self.result_sql = f"Error: {response.text}"
                
        except Exception as e:
            self.result_sql = f"Error de conexión: {str(e)}"
        
        self.is_loading = False