"use client"

import { motion } from "framer-motion"
import { BrainCircuit, Code2, Hash, GitBranch } from "lucide-react"

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const fade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const features = [
  {
    icon: Code2,
    title: "Pre-entrenado en codigo",
    desc: "Entrenado con millones de pares de codigo en multiples lenguajes, lo que le da una comprension nativa de sintaxis y estructuras de programacion.",
  },
  {
    icon: Hash,
    title: "770M parametros",
    desc: "Punto optimo entre capacidad de razonamiento relacional y viabilidad de entrenamiento en hardware estandar (GPU T4 de Google Colab).",
  },
  {
    icon: BrainCircuit,
    title: "Encoder-Decoder Seq2Seq",
    desc: "Arquitectura que convierte una secuencia de entrada (pregunta + schema) en otra secuencia de salida (consulta SQL) de forma autoregresiva.",
  },
  {
    icon: GitBranch,
    title: "Beam Search (5 beams)",
    desc: "Estrategia de decodificacion que explora los 5 caminos mas probables en paralelo para seleccionar la consulta SQL con mayor confianza estadistica.",
  },
]

export function SlideCodeT5() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="flex w-full flex-col gap-8"
    >
      <motion.div variants={fade} className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-widest text-primary">
          03 &mdash; El Modelo
        </span>
        <h2 className="text-balance text-3xl font-bold text-foreground lg:text-4xl">
          CodeT5p-770m{" "}
          <span className="text-muted-foreground">(Salesforce)</span>
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Modelo Transformer Encoder-Decoder especificamente disenado para
          tareas de generacion y comprension de codigo fuente. Su
          pre-entrenamiento en codigo le otorga una ventaja significativa frente
          a modelos de proposito general (T5, BART) para la tarea de
          Text-to-SQL.
        </p>
      </motion.div>

      {/* Why CodeT5 badge */}
      <motion.div variants={fade}>
        <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 glow-cyan">
          <p className="text-sm leading-relaxed text-foreground">
            <span className="font-semibold text-primary">Por que CodeT5p?</span>{" "}
            Los modelos de proposito general (T5, BART) tuvieron dificultades
            severas con la sintaxis estricta de SQL y presentaban constantes
            alucinaciones de columnas. Las variantes de CodeT5 superaron
            ampliamente en tiempos de convergencia y precision.
          </p>
        </div>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {features.map((f) => (
          <motion.div
            key={f.title}
            variants={fade}
            className="rounded-lg border border-border bg-card p-5"
          >
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
                <f.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{f.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {f.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
