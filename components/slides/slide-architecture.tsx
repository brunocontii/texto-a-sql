"use client"

import { motion } from "framer-motion"
import { User, Monitor, Server, Brain, ArrowRight, ArrowLeft } from "lucide-react"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
}

export function SlideArchitecture() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex h-full flex-col justify-center"
    >
      <motion.div variants={item} className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
        Arquitectura del Sistema
      </motion.div>
      <motion.h2 variants={item} className="mb-8 text-balance text-4xl font-bold text-foreground lg:text-5xl">
        Del frontend al modelo de IA
      </motion.h2>

      {/* Architecture diagram */}
      <motion.div variants={item} className="flex flex-col gap-6">
        {/* Main flow */}
        <div className="flex flex-wrap items-center justify-center gap-3 lg:gap-4">
          {/* User */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/30 bg-accent/10">
              <User className="h-7 w-7 text-accent" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">Usuario</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <ArrowRight className="h-5 w-5 text-muted-foreground/50" />
            <span className="text-[10px] text-muted-foreground/50">Pregunta + Schema</span>
          </div>

          {/* Frontend */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-green-500/30 bg-green-500/10">
              <Monitor className="h-7 w-7 text-green-400" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">Frontend</span>
            <span className="text-[10px] text-muted-foreground/60">Reflex (Python)</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <ArrowRight className="h-5 w-5 text-muted-foreground/50" />
            <span className="text-[10px] text-muted-foreground/50">HTTP Request</span>
          </div>

          {/* Backend */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10">
              <Server className="h-7 w-7 text-primary" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">Backend</span>
            <span className="text-[10px] text-muted-foreground/60">FastAPI + Pydantic</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <ArrowRight className="h-5 w-5 text-muted-foreground/50" />
            <span className="text-[10px] text-muted-foreground/50">Prompt</span>
          </div>

          {/* AI Model */}
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/40 bg-primary/15 glow-cyan">
              <Brain className="h-7 w-7 text-primary" />
            </div>
            <span className="text-xs font-medium text-muted-foreground">CodeT5p-770m</span>
            <span className="text-[10px] text-muted-foreground/60">Fine-tuned Spider</span>
          </div>

          <div className="flex flex-col items-center gap-1">
            <ArrowLeft className="h-5 w-5 text-primary/50" />
            <span className="text-[10px] text-primary/60">SQL Query</span>
          </div>
        </div>

        {/* Backend details */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
              <h3 className="text-sm font-semibold text-foreground">1. Parseo del Schema</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              El DDL ingresado por el usuario (CREATE TABLE) se parsea usando{" "}
              <span className="font-mono text-primary">sqlglot</span> y regex para extraer tablas, columnas, tipos y claves foraneas.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-primary" />
              <h3 className="text-sm font-semibold text-foreground">2. Serializacion</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              El schema se convierte al formato de entrenamiento:{" "}
              <span className="font-mono text-xs text-primary">{'table : type col (pk) , type col | foreign keys: ...'}</span>
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm">
            <div className="mb-2 flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-accent" />
              <h3 className="text-sm font-semibold text-foreground">3. Prompt Engineering</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Se ensambla el prompt final con la estructura rigida:{" "}
              <span className="font-mono text-xs text-primary">{'translate to SQL: ... | db_id: ... | schema: ...'}</span>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
