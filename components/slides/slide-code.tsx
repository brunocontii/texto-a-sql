"use client"

import { motion } from "framer-motion"
import { Zap, Target } from "lucide-react"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
}

export function SlideCode() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex h-full flex-col justify-center"
    >
      <motion.div variants={item} className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
        Fine-Tuning y Prompt Engineering
      </motion.div>
      <motion.h2 variants={item} className="mb-8 text-balance text-4xl font-bold text-foreground lg:text-5xl">
        Entrenamiento sobre el dataset Spider
      </motion.h2>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left - Training details */}
        <motion.div variants={item} className="flex flex-col gap-4">
          <div className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Proceso de Fine-Tuning</h3>
            </div>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <div className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2">
                <span>Modelo base</span>
                <span className="font-mono text-foreground">CodeT5p-770m</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2">
                <span>Dataset</span>
                <span className="font-mono text-foreground">Spider (Yale)</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2">
                <span>Muestras de entrenamiento</span>
                <span className="font-mono text-foreground">8,659</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2">
                <span>GPU</span>
                <span className="font-mono text-foreground">NVIDIA T4 (16GB)</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2">
                <span>Num Beams (inferencia)</span>
                <span className="font-mono text-foreground">5</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-muted/30 px-3 py-2">
                <span>Max Length (tokens)</span>
                <span className="font-mono text-foreground">512</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-primary">Factor Critico: Alineacion Train-Inference</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              El modelo debe recibir el prompt <span className="text-primary">exactamente</span> con los mismos delimitadores
              rigidos con los que fue entrenado. Cualquier alteracion en el formato
              provoca caidas significativas en el rendimiento.
            </p>
          </div>
        </motion.div>

        {/* Right - Code example */}
        <motion.div variants={item} className="flex flex-col gap-4">
          <div className="rounded-xl border border-border bg-card/80 p-5 backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/70" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <div className="h-3 w-3 rounded-full bg-green-500/70" />
              <span className="ml-2 text-xs text-muted-foreground">model.py - generate_sql()</span>
            </div>
            <pre className="overflow-x-auto font-mono text-xs leading-relaxed">
              <code>
{`# Prompt exacto con el que se entreno
prompt = f"translate to SQL: {natural_text}`}
{`  | db_id: custom_db`}
{`  | schema: {schema_text}"`}
{``}
{`input_ids = self.tokenizer(`}
{`    prompt,`}
{`    return_tensors="pt",`}
{`    max_length=512,`}
{`    truncation=True`}
{`).input_ids.to(self.device)`}
{``}
{`with torch.no_grad():`}
{`    outputs = self.model.generate(`}
{`        input_ids,`}
{`        max_length=256,`}
{`        `}<span className="text-primary">num_beams=5</span>{`,`}
{`        early_stopping=True,`}
{`    )`}
{``}
{`sql = self.tokenizer.decode(`}
{`    outputs[0],`}
{`    skip_special_tokens=True`}
{`)`}
              </code>
            </pre>
          </div>

          <div className="rounded-xl border border-border bg-card/80 p-5 backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500/70" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
              <div className="h-3 w-3 rounded-full bg-green-500/70" />
              <span className="ml-2 text-xs text-muted-foreground">model.py - _serialize_schema()</span>
            </div>
            <pre className="overflow-x-auto font-mono text-xs leading-relaxed">
              <code>
{`# Convierte DDL al formato de entrenamiento`}
{`# Entrada: CREATE TABLE department (...);`}
{`# Salida:  department : number id (pk)`}
{`#          , text name`}
{``}
{`parsed = `}<span className="text-primary">sqlglot</span>{`.parse(user_schema)`}
{``}
{`for expression in parsed:`}
{`    if isinstance(expression, exp.Create):`}
{`        # Extraer columnas y tipos`}
{`        # Detectar primary keys`}
{`        # Recopilar foreign keys`}
              </code>
            </pre>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
