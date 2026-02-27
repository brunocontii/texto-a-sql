"use client"

import { motion } from "framer-motion"
import { User, MonitorSmartphone, Server, Cpu, ArrowDown } from "lucide-react"

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const fade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const layers = [
  {
    icon: User,
    label: "Usuario",
    desc: "Escribe una pregunta en ingles y pega el DDL de su base de datos",
    color: "border-accent/40 bg-accent/5",
    iconColor: "text-accent",
  },
  {
    icon: MonitorSmartphone,
    label: "Frontend (Reflex)",
    desc: "Interfaz web reactiva construida con Reflex (Python). Envia HTTP Request al backend",
    color: "border-green-400/40 bg-green-400/5",
    iconColor: "text-green-400",
  },
  {
    icon: Server,
    label: "Backend (FastAPI)",
    desc: "Parsea el DDL con sqlglot, serializa el schema al formato de entrenamiento y construye el prompt",
    color: "border-primary/40 bg-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: Cpu,
    label: "CodeT5p-770m (Fine-tuned)",
    desc: "Recibe el prompt estructurado, genera la consulta SQL con Beam Search (5 beams) y la retorna",
    color: "border-yellow-400/40 bg-yellow-400/5",
    iconColor: "text-yellow-400",
  },
]

export function SlideArchitecture() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="flex w-full flex-col gap-8"
    >
      <motion.div variants={fade} className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-widest text-primary">
          05 &mdash; Arquitectura
        </span>
        <h2 className="text-balance text-3xl font-bold text-foreground lg:text-4xl">
          Arquitectura del Sistema
        </h2>
      </motion.div>

      {/* Architecture flow */}
      <div className="flex flex-col items-center gap-0">
        {layers.map((l, i) => (
          <motion.div key={l.label} variants={fade} className="flex w-full max-w-xl flex-col items-center">
            <div className={`w-full rounded-lg border ${l.color} p-4`}>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md bg-card">
                  <l.icon className={`h-5 w-5 ${l.iconColor}`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-foreground">{l.label}</h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">{l.desc}</p>
                </div>
              </div>
            </div>
            {i < layers.length - 1 && (
              <div className="flex h-8 items-center">
                <ArrowDown className="h-4 w-4 text-muted-foreground/50" />
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Tech stack badges */}
      <motion.div variants={fade} className="flex flex-wrap justify-center gap-2">
        {["Python", "Reflex", "FastAPI", "Pydantic", "sqlglot", "Transformers (HuggingFace)", "PyTorch"].map((t) => (
          <span
            key={t}
            className="rounded-full border border-border bg-secondary/60 px-3 py-1 font-mono text-xs text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </motion.div>
    </motion.div>
  )
}
