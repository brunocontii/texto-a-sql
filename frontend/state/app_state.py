import reflex as rx
import httpx
import asyncio
from frontend.utils.token import calculate_tokens

class AppState(rx.State):
    """
    Estado de la aplicación.
    Maneja todas las variables reactivas que cambian la interfaz.
    """
    # variables de estado
    query: str = ""             # consulta en lenguaje natural
    schema_input: str = ""      # schema de la base de datos
    result: str = ""            # sql generado
    is_loading: bool = False    # estado de carga
    is_copied: bool = False     # estado de copiado
    
    # variables para el cálculo de tokens
    token_count: int = 0
    is_calculating_tokens: bool = False

    # placeholders
    schema_placeholder: str = """CREATE TABLE Pet (
 id INTEGER PRIMARY KEY,
 name TEXT,
 owner_id INTEGER,
 FOREIGN KEY (owner_id) REFERENCES Owner(id)
);
CREATE TABLE Owner (
 id INTEGER PRIMARY KEY,
 name TEXT
);"""

    query_placeholder: str = "Show all of Mike's pets"

    # variable computada
    # se recalcula automaticamente cada vez que cambia 'query' o 'schema_input'.
    # se usa para deshabilitar el boton si los campos estan vacios.
    @rx.var
    def is_form_valid(self) -> bool:
        # Habilitar el botón de generar solo si hay texto y si los tokens no superan el límite
        has_content = (len(self.query.strip()) > 0) & (len(self.schema_input.strip()) > 0)
        within_limits = self.token_count <= 512 if self.token_count > 0 else True
        return has_content & within_limits

    @rx.var
    def is_over_limit(self) -> bool:
        return self.token_count > 512
    
    # --- NUEVA FUNCIÓN PARA CALCULAR TOKENS ---
    async def handle_calculate_tokens(self):
        """Manejador para el botón de calcular tokens"""
        self.is_calculating_tokens = True
        yield  # Actualiza la UI para mostrar "Calculando..."
        
        # Ejecutamos el conteo
        resultado = calculate_tokens(self.query, self.schema_input)
        self.token_count = resultado["total_tokens"]
        
        self.is_calculating_tokens = False
        yield
        
    # --- FUNCIÓN ORIGINAL PARA GENERAR SQL ---
    async def handle_generate(self):
        """
        Llama a la API para generar la consulta SQL basada en la consulta en lenguaje natural y el esquema proporcionado.
        """
        self.is_loading = True
        self.result = ""
        yield
        
        # cuerpo de la peticion
        payload = {
            "natural_text": self.query,
            "schema": self.schema_input
        }
        
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    "http://127.0.0.1:8000/api/generate-sql",
                    json=payload,
                    timeout=None
                )
            
            if response.status_code == 200:
                data = response.json()
                self.result = data.get("sql_query", "No se recibió ningun SQL desde el servidor.")
            else:
                error_msg = response.json().get("error", "Error desconocido del servidor.")
                self.result = f"Error del servidor ({response.status_code}):\n{error_msg}"
        except httpx.RequestError as e:
            self.result = f"Error de conexión:\nNo se pudo conectar con el servidor en http://127.0.0.1:8000.\nDetalles: {str(e)}"
        except Exception as e:
            self.result = f"Error inesperado:\n{str(e)}"
        
        self.is_loading = False

    # manejador de evento
    # boton copiar
    async def handle_copy(self):
        """Solo gestiona la animación visual del botón."""
        self.is_copied = True
        yield # Actualiza la UI para mostrar el check verde
        await asyncio.sleep(2)
        self.is_copied = False