"use client"

import { motion } from "framer-motion"
import { FlaskConical, X, Check, Minus } from "lucide-react"

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const fade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const experiments = [
  {
    title: "Schema Pruning vs Full Schema",
    hypothesis: "Filtrar tablas irrelevantes con un Cross-Encoder semantico mejoraria el accuracy.",
    result: "Accuracy cayo a ~57%",
    conclusion: "El filtro eliminaba las Tablas Puente vitales para JOINs. CodeT5p puede ignorar tablas inutiles por si solo.",
    success: false,
  },
  {
    title: "10 Beams vs 5 Beams",
    hypothesis: "Mas caminos de busqueda darian mejor precision en queries dificiles.",
    result: "Se estanco en 67.6%",
    conclusion: "Los beams 6-10 carecen de confianza estadistica. Se uso num_beams=5 en produccion.",
    success: false,
  },
  {
    title: "Evaluacion de Arquitecturas Base",
    hypothesis: "Comparar T5, BART, CodeT5 para encontrar la mejor base de conocimiento.",
    result: "CodeT5 supero ampliamente",
    conclusion: "El pre-entrenamiento en codigo da ventaja decisiva. Se eligio CodeT5p-770m como optimo.",
    success: true,
  },
  {
    title: "Sensibilidad al Prompt",
    hypothesis: "Diferentes formatos de prompt afectan significativamente la precision.",
    result: "Altisima sensibilidad",
    conclusion: "La alineacion estricta Train-Inference es el factor mas determinante. El prompt debe usar los mismos delimitadores del entrenamiento.",
    success: true,
  },
  {
    title: "Pre-entrenamiento Intermedio (WikiSQL)",
    hypothesis: "Entrenar primero con WikiSQL antes de Spider afianzaria la sintaxis SQL.",
    result: "Rendimiento peor",
    conclusion: "WikiSQL (consultas simples, sin JOINs) genera un sesgo hacia queries planas que penaliza en entornos complejos.",
    success: false,
  },
]

export function SlideExperiments() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="flex w-full flex-col gap-6"
    >
      <motion.div variants={fade} className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-widest text-primary">
          09 &mdash; Experimentos
        </span>
        <h2 className="text-balance text-3xl font-bold text-foreground lg:text-4xl">
          Experimentos Realizados
        </h2>
      </motion.div>

      <div className="grid gap-3 lg:grid-cols-2">
        {experiments.map((e) => (
          <motion.div
            key={e.title}
            variants={fade}
            className="rounded-lg border border-border bg-card p-4"
          >
            <div className="mb-2 flex items-center gap-2">
              <FlaskConical className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold text-foreground">{e.title}</h3>
              <span className="ml-auto">
                {e.success ? (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-400/10">
                    <Check className="h-3 w-3 text-green-400" />
                  </span>
                ) : (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-400/10">
                    <X className="h-3 w-3 text-red-400" />
                  </span>
                )}
              </span>
            </div>
            <p className="mb-1 text-xs text-muted-foreground">
              <span className="font-medium text-foreground/70">Hipotesis:</span> {e.hypothesis}
            </p>
            <p className="mb-1 text-xs text-muted-foreground">
              <span className="font-medium text-yellow-400/80">Resultado:</span> {e.result}
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-primary/80">Conclusion:</span> {e.conclusion}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
