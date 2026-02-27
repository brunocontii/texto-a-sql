"use client"

import { motion } from "framer-motion"

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const fade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function SlideCode() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="flex w-full flex-col gap-6"
    >
      <motion.div variants={fade} className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-widest text-primary">
          07 &mdash; Implementacion
        </span>
        <h2 className="text-balance text-3xl font-bold text-foreground lg:text-4xl">
          Codigo Clave
        </h2>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Serialization */}
        <motion.div variants={fade} className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-4 py-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
            <span className="ml-2 font-mono text-[10px] text-muted-foreground">model.py - Serializacion</span>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-[11px] leading-relaxed">
            <code>
{`def _serialize_schema(self, user_schema):
  """
  Convierte SQL DDL al formato
  de entrenamiento
  """
  parsed = sqlglot.parse(
    user_schema, read="mysql"
  )
  # Extraer tablas, columnas, PKs, FKs
  # Formato: table : type col (pk) , ...
  # | foreign keys: t1.c1 = t2.c2
  return schema_str`}
            </code>
          </pre>
        </motion.div>

        {/* Generation */}
        <motion.div variants={fade} className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-4 py-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
            <span className="ml-2 font-mono text-[10px] text-muted-foreground">model.py - Generacion</span>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-[11px] leading-relaxed">
            <code>
{`def generate_sql(self, text, schema):
  schema = self._serialize_schema(schema)

  # Prompt alineado al entrenamiento
  prompt = f"translate to SQL: {text}"
          f" | db_id: custom_db"
          f" | schema: {schema}"

  ids = self.tokenizer(
    prompt, max_length=512
  ).input_ids

  out = self.model.generate(
    ids,
    num_beams=5,
    early_stopping=True
  )
  return self.tokenizer.decode(out[0])`}
            </code>
          </pre>
        </motion.div>

        {/* API */}
        <motion.div variants={fade} className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-4 py-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
            <span className="ml-2 font-mono text-[10px] text-muted-foreground">api.py - Endpoint</span>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-[11px] leading-relaxed">
            <code>
{`@app.post("/api/generate-sql")
def generate_sql(request: SQLRequest):
  generator = get_sql_generator()
  sql = generator.generate_sql(
    request.natural_text,
    request.db_schema
  )
  return {
    "success": True,
    "sql_query": sql
  }`}
            </code>
          </pre>
        </motion.div>

        {/* Frontend state */}
        <motion.div variants={fade} className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="flex items-center gap-2 border-b border-border bg-muted/30 px-4 py-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
            <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
            <span className="ml-2 font-mono text-[10px] text-muted-foreground">app_state.py - Frontend</span>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-[11px] leading-relaxed">
            <code>
{`class AppState(rx.State):
  query: str = ""
  schema_input: str = ""
  result: str = ""
  is_loading: bool = False

  async def handle_generate(self):
    payload = {
      "natural_text": self.query,
      "schema": self.schema_input
    }
    async with httpx.AsyncClient() as c:
      resp = await c.post(
        "http://127.0.0.1:8000"
        "/api/generate-sql",
        json=payload
      )
    data = resp.json()
    self.result = data["sql_query"]`}
            </code>
          </pre>
        </motion.div>
      </div>
    </motion.div>
  )
}
