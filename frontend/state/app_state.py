import reflex as rx
import httpx
import asyncio

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
    
    # placeholders
    schema_placeholder: str = """Ejemplo:

TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  created_at TIMESTAMP
)"""

    query_placeholder: str = "Ejemplo: Muéstrame todos los usuarios que hicieron una compra en los últimos 30 días..."

    # variable computada
    # se recalcula automaticamente cada vez que cambia 'query' o 'schema_input'.
    # se usa para deshabilitar el boton si los campos estan vacios.
    @rx.var
    def is_form_valid(self) -> bool:
        return (len(self.query.strip()) > 0) & (len(self.schema_input.strip()) > 0)

    # conexion con la api
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
                    timeout=30.0
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