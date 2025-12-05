from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import Optional, Any
from model import get_sql_generator
import uvicorn
from fastapi.responses import JSONResponse

# creacion de la aplicacion
app = FastAPI()

# CORS para que el frontend (localhost:3000) pueda llamar al backend (localhost:8000)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["localhost", "127.0.0.1", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# tipo formulario para decir como viene los datos del frontend(del usuario)
class SQLRequest(BaseModel):
    natural_text: str # si llega por ejemplo natural_text: 121 error te dice, debe ser str(string)
    db_schema: Optional[Any] = Field(None, alias="schema") # de igual manera string requerido, o json
    
    class Config:
        populate_by_name = True

@app.get("/")
def root():
    return {"status": "ok", "msg": "Texto-a-SQL"}

# endpoint POST, request requerido con el formato que tiene que ser, por la clase SQLRequest
@app.post("/api/generate-sql")
def generate_sql(request: SQLRequest):    
    # ver que la consulta no este vacia
    if not request.natural_text or request.natural_text.strip() == "":
        return JSONResponse(
            status_code=400, 
            content={"success": False, "error": "Debe ingresar un texto en lenguaje natural"}
        )
    
    # ver que el schema no este vacio
    if not request.db_schema or str(request.db_schema).strip() == "":
        return JSONResponse(
            status_code=400, 
            content={"success": False, "error": "Debe ingresar un schema de base de datos"}
        )
    
    try:
        generator = get_sql_generator()
        sql_query = generator.generate_sql(request.natural_text, request.db_schema)
        
        return {"success": True, "sql_query": sql_query}
    except Exception as e:
        print(f"ERROR: {e}")
                
        return JSONResponse(
            status_code=500, 
            content={"success": False, "error": f"Error interno: {str(e)}"}
        )

@app.get("/health")
def health():
    return {"status": "ok"}

if __name__ == "__main__":
    uvicorn.run("api:app", host="127.0.0.1", port=8000, reload=False)