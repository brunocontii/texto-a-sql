"use client"

import { motion } from "framer-motion"
import { Cpu, MemoryStick, AlertCircle, TrendingUp } from "lucide-react"

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const fade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const limitations = [
  {
    icon: MemoryStick,
    title: "Restriccion de Parametros",
    desc: "La VRAM limitada de la T4 nos impidio cargar modelos mas grandes de la familia de billones de parametros (CodeT5+ 2B/16B).",
    color: "text-red-400",
    bg: "bg-red-400/10",
  },
  {
    icon: Cpu,
    title: "Seleccion del Modelo",
    desc: "CodeT5p-770m fue elegido como el modelo mas inteligente que matematicamente cabia en la memoria de la GPU.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: TrendingUp,
    title: "Impacto en Accuracy",
    desc: "El 68.67% demuestra gran eficiencia. Escalar el tamano del modelo con mejor hardware impactaria positivamente en queries Extra Hard.",
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    icon: AlertCircle,
    title: "Ventana de Contexto",
    desc: "Limite de 512-1024 tokens. Bases de datos masivas de Spider (Hard/Extra Hard) exceden esta ventana, truncando tablas y claves foraneas.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
]

export function SlideHardware() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="flex w-full flex-col gap-8"
    >
      <motion.div variants={fade} className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-widest text-primary">
          10 &mdash; Hardware
        </span>
        <h2 className="text-balance text-3xl font-bold text-foreground lg:text-4xl">
          Entorno de Entrenamiento y Limitaciones
        </h2>
      </motion.div>

      {/* GPU Info */}
      <motion.div variants={fade} className="rounded-lg border border-primary/20 bg-primary/5 p-5 glow-cyan">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-card">
              <Cpu className="h-7 w-7 text-primary" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">Google Colab</p>
              <p className="text-sm text-muted-foreground">GPU NVIDIA T4</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div>
              <p className="text-2xl font-bold text-primary">16 GB</p>
              <p className="text-xs text-muted-foreground">VRAM</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">770M</p>
              <p className="text-xs text-muted-foreground">Parametros</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">512</p>
              <p className="text-xs text-muted-foreground">Max Tokens</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Limitations grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {limitations.map((l) => (
          <motion.div
            key={l.title}
            variants={fade}
            className="rounded-lg border border-border bg-card p-4"
          >
            <div className="mb-2 flex items-center gap-3">
              <div className={`flex h-8 w-8 items-center justify-center rounded-md ${l.bg}`}>
                <l.icon className={`h-4 w-4 ${l.color}`} />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{l.title}</h3>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">{l.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
