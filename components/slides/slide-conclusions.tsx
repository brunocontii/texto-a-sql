"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Lightbulb, ArrowUpRight } from "lucide-react"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
}

const keyFindings = [
  "El fine-tuning directo de CodeT5p-770m sobre Spider logro un 68.67% de Execution Accuracy con hardware limitado.",
  "La alineacion estricta Train-Inference es el factor mas determinante para el exito: el prompt en produccion debe ser identico al de entrenamiento.",
  "El schema completo debe inyectarse sin filtrar: el Transformer tiene capacidad de atencion suficiente para ignorar tablas irrelevantes.",
  "num_beams=5 es el punto optimo entre precision y costo computacional. Mas beams no mejoran resultados.",
  "Pre-entrenar con datasets simples (WikiSQL) genera sesgo negativo hacia consultas planas.",
]

const futureWork = [
  "Escalar a modelos mas grandes (CodeT5p-2B o superiores) con GPUs mas potentes",
  "Implementar tecnicas de compresion de esquema para superar la ventana de contexto",
  "Agregar soporte para multiples dialectos SQL (PostgreSQL, MySQL, SQLite)",
  "Integrar feedback del usuario para mejorar iterativamente el modelo",
]

export function SlideConclusions() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex h-full flex-col justify-center"
    >
      <motion.div variants={item} className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
        Conclusiones
      </motion.div>
      <motion.h2 variants={item} className="mb-8 text-balance text-4xl font-bold text-foreground lg:text-5xl">
        Lecciones aprendidas y trabajo futuro
      </motion.h2>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Key findings */}
        <motion.div variants={item}>
          <div className="mb-4 flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Hallazgos Clave</h3>
          </div>
          <div className="flex flex-col gap-2.5">
            {keyFindings.map((finding, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-border bg-card/60 p-3 backdrop-blur-sm"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                  {i + 1}
                </span>
                <p className="text-sm leading-relaxed text-muted-foreground">{finding}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Future work */}
        <motion.div variants={item}>
          <div className="mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-accent" />
            <h3 className="text-lg font-semibold text-foreground">Trabajo Futuro</h3>
          </div>
          <div className="flex flex-col gap-2.5">
            {futureWork.map((work, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-accent/10 bg-accent/5 p-3"
              >
                <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <p className="text-sm leading-relaxed text-muted-foreground">{work}</p>
              </div>
            ))}
          </div>

          {/* Summary stat */}
          <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-primary">68.67%</div>
                <div className="text-sm text-muted-foreground">Execution Accuracy</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">770M</div>
                <div className="text-sm text-muted-foreground">Parametros</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent">16GB</div>
                <div className="text-sm text-muted-foreground">VRAM (T4)</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
