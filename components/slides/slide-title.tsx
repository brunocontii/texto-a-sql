"use client"

import { motion } from "framer-motion"
import { Database, Sparkles } from "lucide-react"

export function SlideTitle() {
  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      {/* Floating icon */}
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="mb-8 flex items-center gap-3 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5 backdrop-blur-sm"
      >
        <Sparkles className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium text-primary">
          Inteligencia Artificial - UNRC
        </span>
      </motion.div>

      {/* Main title */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-6 max-w-4xl text-balance text-5xl font-bold leading-tight tracking-tight text-foreground lg:text-7xl"
      >
        Generador de Consultas{" "}
        <span className="text-primary glow-text">SQL</span> con{" "}
        <span className="text-primary glow-text">CodeT5p</span>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mb-10 max-w-2xl text-pretty text-lg text-muted-foreground lg:text-xl"
      >
        Un sistema de Text-to-SQL que permite a usuarios sin conocimientos
        tecnicos generar consultas SQL complejas escribiendo preguntas en
        lenguaje natural
      </motion.p>

      {/* Visual element - SQL transformation */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-4"
      >
        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 font-mono text-sm text-muted-foreground">
          <span className="text-foreground">
            {'"How many students are in CS?"'}
          </span>
        </div>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
          <Sparkles className="h-4 w-4 text-primary" />
        </div>
        <div className="flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 font-mono text-sm glow-cyan">
          <Database className="h-4 w-4 text-primary" />
          <span className="text-primary">SELECT count(*) FROM ...</span>
        </div>
      </motion.div>

      {/* Team info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-16 flex flex-col items-center gap-2 text-sm text-muted-foreground"
      >
        <p>Conti, Bruno &middot; Gonzalez, Juan Cruz &middot; Vollenweider, Erich</p>
        <p className="text-muted-foreground/60">
          Universidad Nacional de Rio Cuarto
        </p>
      </motion.div>
    </div>
  )
}
