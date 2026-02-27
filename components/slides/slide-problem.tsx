"use client"

import { motion } from "framer-motion"
import { MessageSquareText, ArrowRight, Code2, AlertTriangle, Users, Lightbulb } from "lucide-react"

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const fade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function SlideProblem() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="flex w-full flex-col gap-8"
    >
      {/* Header */}
      <motion.div variants={fade} className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-widest text-primary">
          01 &mdash; El Problema
        </span>
        <h2 className="text-balance text-3xl font-bold text-foreground lg:text-4xl">
          La brecha entre lenguaje natural y SQL
        </h2>
      </motion.div>

      {/* Content grid */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left - problem */}
        <motion.div variants={fade} className="flex flex-col gap-4">
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-red-500/10">
                <AlertTriangle className="h-5 w-5 text-red-400" />
              </div>
              <h3 className="font-semibold text-foreground">El desafio</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Millones de personas necesitan extraer informacion de bases de
              datos pero no conocen SQL. La barrera tecnica impide el acceso a
              datos valiosos en organizaciones de todos los tamanios.
            </p>
          </div>

          <div className="rounded-lg border border-border bg-card p-5">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Usuarios objetivo</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Analistas de negocio, gerentes, investigadores y cualquier
              profesional que necesite datos pero no tenga conocimientos tecnicos
              en lenguajes de consulta.
            </p>
          </div>
        </motion.div>

        {/* Right - solution */}
        <motion.div variants={fade} className="flex flex-col gap-4">
          <div className="rounded-lg border border-primary/20 bg-primary/5 p-5 glow-cyan">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-primary">Nuestra solucion</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Un sistema de IA que traduce preguntas en ingles a consultas SQL
              validas, entendiendo esquemas complejos con multiples tablas,
              relaciones, JOINs, agregaciones y subconsultas.
            </p>
          </div>

          {/* Visual */}
          <div className="rounded-lg border border-border bg-card p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-col items-center gap-1.5">
                <MessageSquareText className="h-6 w-6 text-primary" />
                <span className="text-xs text-muted-foreground">Pregunta</span>
              </div>
              <ArrowRight className="h-5 w-5 text-primary/60" />
              <div className="flex h-10 items-center rounded-md border border-primary/30 bg-primary/5 px-3">
                <span className="font-mono text-xs text-primary">CodeT5p</span>
              </div>
              <ArrowRight className="h-5 w-5 text-primary/60" />
              <div className="flex flex-col items-center gap-1.5">
                <Code2 className="h-6 w-6 text-green-400" />
                <span className="text-xs text-muted-foreground">SQL</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
