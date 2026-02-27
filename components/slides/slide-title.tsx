"use client"

import { motion } from "framer-motion"
import { Database, Sparkles, BrainCircuit } from "lucide-react"

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const fade = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export function SlideTitle() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="flex w-full flex-col items-center gap-8 text-center"
    >
      {/* Floating icons */}
      <motion.div variants={fade} className="flex items-center gap-6">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-secondary/60">
          <Database className="h-7 w-7 text-primary" />
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 glow-cyan">
          <Sparkles className="h-7 w-7 text-primary" />
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-border bg-secondary/60">
          <BrainCircuit className="h-7 w-7 text-accent" />
        </div>
      </motion.div>

      {/* Badge */}
      <motion.div variants={fade}>
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-xs text-primary">
          Inteligencia Artificial - UNRC
        </span>
      </motion.div>

      {/* Title */}
      <motion.h1
        variants={fade}
        className="max-w-3xl text-balance text-5xl font-bold leading-tight tracking-tight text-foreground lg:text-6xl"
      >
        Generador de Consultas SQL con{" "}
        <span className="text-primary glow-text">CodeT5p</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        variants={fade}
        className="max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground"
      >
        Sistema de Text-to-SQL que transforma preguntas en lenguaje natural a
        consultas SQL complejas mediante fine-tuning de un modelo Transformer.
      </motion.p>

      {/* Divider */}
      <motion.div variants={fade} className="h-px w-40 bg-border" />

      {/* Team */}
      <motion.div variants={fade} className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-4 text-sm text-foreground">
          <span>Conti, Bruno</span>
          <span className="h-1 w-1 rounded-full bg-primary" />
          <span>Gonzalez, Juan Cruz</span>
          <span className="h-1 w-1 rounded-full bg-primary" />
          <span>Vollenweider, Erich</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Universidad Nacional de Rio Cuarto
        </p>
      </motion.div>
    </motion.div>
  )
}
