"use client"

import { motion } from "framer-motion"
import { FlaskConical, X, Check } from "lucide-react"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
}

const experiments = [
  {
    title: "Schema Pruning (Cross-Encoder)",
    hypothesis: "Filtrar tablas irrelevantes con un modelo semantico reduciria la sobrecarga cognitiva y mejoraria el Accuracy.",
    result: "El Accuracy cayo a ~57%. El filtro eliminaba Tablas Puente vitales para JOINs de Muchos-a-Muchos.",
    conclusion: "El Transformer tiene la capacidad de atencion suficiente para ignorar tablas inutiles por si solo. Es necesario inyectar el esquema completo.",
    success: false,
    accuracy: "~57%",
  },
  {
    title: "10 Beams vs. 5 Beams",
    hypothesis: "Mas caminos de busqueda darian mejor abanico de opciones para sortear errores en queries dificiles.",
    result: "La precision se estanco en 67.6%. Las opciones del 6 al 10 carecen de confianza estadistica.",
    conclusion: "num_beams=5 es el parametro adecuado: maxima precision con la mitad de costo computacional.",
    success: false,
    accuracy: "67.6%",
  },
  {
    title: "Evaluacion de Arquitecturas Base",
    hypothesis: "Se evaluaron T5-base, T5-large, BART, CodeT5-base y CodeT5-large para determinar la mejor base.",
    result: "Los modelos generales (T5, BART) presentaban alucinaciones de columnas. CodeT5 supero a los demas.",
    conclusion: "El pre-entrenamiento especifico en codigo le da a CodeT5 una ventaja decisiva. Se selecciono CodeT5p-770m.",
    success: true,
    accuracy: "68.7%",
  },
  {
    title: "Sensibilidad al Prompt",
    hypothesis: "Se probaron multiples estructuras de prompt para evaluar el impacto del formato en el Accuracy.",
    result: "Altisima sensibilidad: cambiar el orden de los elementos provocaba caidas significativas.",
    conclusion: "La estricta alineacion Train-Inference es el factor mas determinante para el exito en produccion.",
    success: true,
    accuracy: "68.7%",
  },
  {
    title: "Pre-entrenamiento Intermedio (WikiSQL)",
    hypothesis: "Entrenar primero con WikiSQL afianzaria las bases de SQL antes de Spider.",
    result: "Rendimiento peor. WikiSQL genero un sesgo hacia consultas planas, olvidando capacidad generativa compleja.",
    conclusion: "Pre-entrenar con datasets de baja complejidad relacional penaliza el desempenio en entornos complejos.",
    success: false,
    accuracy: "<68%",
  },
]

export function SlideExperiments() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex h-full flex-col justify-center"
    >
      <motion.div variants={item} className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
        Experimentos Realizados
      </motion.div>
      <motion.h2 variants={item} className="mb-6 text-balance text-3xl font-bold text-foreground lg:text-4xl">
        Exploracion iterativa para maximizar el rendimiento
      </motion.h2>

      <div className="grid gap-3 lg:grid-cols-2 xl:grid-cols-3">
        {experiments.map((exp, i) => (
          <motion.div
            key={i}
            variants={item}
            className={`rounded-xl border p-4 backdrop-blur-sm transition-all ${
              exp.success
                ? "border-green-500/20 bg-green-500/5 hover:border-green-500/40"
                : "border-red-400/20 bg-red-400/5 hover:border-red-400/30"
            }`}
          >
            <div className="mb-2 flex items-start justify-between gap-2">
              <div className="flex items-center gap-2">
                <FlaskConical className={`h-4 w-4 ${exp.success ? "text-green-400" : "text-red-400"}`} />
                <h3 className="text-sm font-semibold text-foreground">{exp.title}</h3>
              </div>
              <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                exp.success ? "bg-green-500/20" : "bg-red-400/20"
              }`}>
                {exp.success ? (
                  <Check className="h-3 w-3 text-green-400" />
                ) : (
                  <X className="h-3 w-3 text-red-400" />
                )}
              </div>
            </div>
            <p className="mb-2 text-xs leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground/80">Hipotesis:</span> {exp.hypothesis}
            </p>
            <p className="mb-2 text-xs leading-relaxed text-muted-foreground">
              <span className="font-semibold text-foreground/80">Resultado:</span> {exp.result}
            </p>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-muted-foreground">
                Acc: <span className={exp.success ? "text-green-400" : "text-red-400"}>{exp.accuracy}</span>
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
