import reflex as rx
from typing import List, Dict, TypedDict

# Definir tipos específicos para que Reflex pueda inferirlos
class Column(TypedDict):
    id: int
    value: str

class Table(TypedDict):
    id: int
    schema_name: str
    columns: List[Column]

class SchemaState(rx.State):
    """Estado para manejar tablas y sus columnas dinámicamente."""
    
    # Lista de tablas con type hint específico
    tables: List[Table] = [
        {
            "id": 1,
            "schema_name": "",
            "columns": [
                {"id": 1, "value": ""}
            ]
        }
    ]
    
    # Contador para IDs únicos
    table_counter: int = 1
    column_counters: Dict[int, int] = {0: 1}
    
    def update_schema_name(self, table_id: int, value: str):
        """Actualiza el nombre del schema de una tabla."""
        for t in self.tables:
            if t["id"] == table_id:
                t["schema_name"] = value
                break
    
    def update_column_value(self, table_id: int, column_id: int, value: str):
        """Actualiza el valor de una columna específica."""
        for t in self.tables:
            if t["id"] == table_id:
                for col in t["columns"]:
                    if col["id"] == column_id:
                        col["value"] = value
                        break
                break
    
    def add_column(self, table_id: int):
        """Añade una nueva columna a una tabla específica."""
        for t in self.tables:
            if t["id"] == table_id:
                new_id = len(t["columns"]) + 1
                t["columns"].append({"id": new_id, "value": ""})
                break
    
    def add_table(self):
        """Añade una nueva tabla al esquema."""
        new_id = len(self.tables) + 1
        self.tables.append({
            "id": new_id,
            "schema_name": "",
            "columns": [
                {"id": 1, "value": ""}
            ]
        })
    
    def remove_column(self, table_id: int, column_id: int):
        """Elimina una columna de una tabla (opcional)."""
        for table in self.tables:
            if table["id"] == table_id:
                if len(table["columns"]) > 1:  # Mantener al menos una columna
                    table["columns"] = [col for col in table["columns"] if col["id"] != column_id]
                break
    
    def remove_table(self, table_id: int):
        """Elimina una tabla (opcional)."""
        if len(self.tables) > 1:  # Mantener al menos una tabla
            self.tables = [table for table in self.tables if table["id"] != table_id]