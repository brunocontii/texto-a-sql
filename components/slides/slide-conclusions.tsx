"use client"

import { motion } from "framer-motion"
import { CheckCircle2, Lightbulb, ArrowUpRight, Users } from "lucide-react"

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const fade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const conclusions = [
  {
    icon: CheckCircle2,
    title: "Validacion del enfoque",
    desc: "Un modelo de 770M parametros logro 68.67% de Execution Accuracy, demostrando que el fine-tuning especifico supera a modelos genericos mas grandes.",
    color: "text-green-400",
  },
  {
    icon: Lightbulb,
    title: "Alineacion Train-Inference",
    desc: "El factor mas critico: el prompt de produccion debe respetar exactamente los delimitadores del entrenamiento. Cualquier desviacion degrada el rendimiento.",
    color: "text-yellow-400",
  },
  {
    icon: ArrowUpRight,
    title: "Schema Completo > Pruning",
    desc: "CodeT5p tiene capacidad de atencion suficiente para ignorar tablas irrelevantes. El pruning elimina tablas puente necesarias para JOINs complejos.",
    color: "text-primary",
  },
  {
    icon: Users,
    title: "Democratizacion del acceso a datos",
    desc: "El sistema permite a usuarios sin conocimientos tecnicos interactuar con bases de datos complejas usando preguntas en lenguaje natural.",
    color: "text-accent",
  },
]

const futureWork = [
  "Escalar a modelos mas grandes (CodeT5+ 2B/16B) con mejor hardware",
  "Expandir la ventana de contexto para soportar esquemas masivos",
  "Soporte multilingue nativo (consultas en espanol)",
  "Integracion con bases de datos en tiempo real para validacion",
]

export function SlideConclusions() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="flex w-full flex-col gap-6"
    >
      <motion.div variants={fade} className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-widest text-primary">
          11 &mdash; Conclusiones
        </span>
        <h2 className="text-balance text-3xl font-bold text-foreground lg:text-4xl">
          Conclusiones y Trabajo Futuro
        </h2>
      </motion.div>

      <div className="grid gap-4 lg:grid-cols-2">
        {/* Conclusions */}
        <div className="flex flex-col gap-3">
          {conclusions.map((c) => (
            <motion.div
              key={c.title}
              variants={fade}
              className="flex items-start gap-3 rounded-lg border border-border bg-card p-4"
            >
              <c.icon className={`mt-0.5 h-5 w-5 shrink-0 ${c.color}`} />
              <div>
                <h3 className="text-sm font-semibold text-foreground">{c.title}</h3>
                <p className="text-xs leading-relaxed text-muted-foreground">{c.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Future work */}
        <motion.div variants={fade} className="flex flex-col gap-4">
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 glow-cyan">
            <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-primary">
              <ArrowUpRight className="h-4 w-4" />
              Trabajo Futuro
            </h3>
            <ul className="flex flex-col gap-3">
              {futureWork.map((f, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/20 text-[10px] font-bold text-primary">
                    {i + 1}
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Final note */}
          <div className="rounded-lg border border-border bg-card p-5 text-center">
            <p className="text-3xl font-bold text-primary">68.67%</p>
            <p className="text-xs text-muted-foreground">
              Execution Accuracy con un modelo de 770M parametros
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              entrenado en una GPU T4 gratuita de Google Colab
            </p>
          </div>
        </motion.div>
      </div>

      {/* Team */}
      <motion.div variants={fade} className="flex flex-col items-center gap-2 pt-2">
        <div className="h-px w-32 bg-border" />
        <div className="flex items-center gap-4 text-sm text-foreground">
          <span>Conti, Bruno</span>
          <span className="h-1 w-1 rounded-full bg-primary" />
          <span>Gonzalez, Juan Cruz</span>
          <span className="h-1 w-1 rounded-full bg-primary" />
          <span>Vollenweider, Erich</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Universidad Nacional de Rio Cuarto &mdash; Inteligencia Artificial
        </p>
      </motion.div>
    </motion.div>
  )
}
