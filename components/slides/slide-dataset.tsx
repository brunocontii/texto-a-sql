"use client"

import { motion } from "framer-motion"
import { Database, Table2, FileText, Link2 } from "lucide-react"

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const fade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const stats = [
  { label: "Consultas", value: "8,659", sub: "pares pregunta-SQL", icon: FileText },
  { label: "Bases de datos", value: "166", sub: "multidominio", icon: Database },
  { label: "Tablas promedio", value: "5.1", sub: "por base de datos", icon: Table2 },
  { label: "Relaciones FK", value: "Multiples", sub: "JOINs complejos", icon: Link2 },
]

const difficulties = [
  { level: "Easy", pct: 24, desc: "SELECT simples, una tabla", color: "bg-green-400" },
  { level: "Medium", pct: 42, desc: "JOINs, WHERE compuestos", color: "bg-primary" },
  { level: "Hard", pct: 21, desc: "Subconsultas, GROUP BY", color: "bg-yellow-400" },
  { level: "Extra Hard", pct: 13, desc: "Anidamiento multiple, HAVING", color: "bg-red-400" },
]

export function SlideDataset() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="flex w-full flex-col gap-8"
    >
      <motion.div variants={fade} className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-widest text-primary">
          04 &mdash; Dataset
        </span>
        <h2 className="text-balance text-3xl font-bold text-foreground lg:text-4xl">
          Spider Dataset{" "}
          <span className="text-muted-foreground">(Yale)</span>
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Benchmark estandar de la industria para Text-to-SQL. Contiene bases de
          datos complejas con multiples tablas interrelacionadas, cubriendo
          dominios variados como universidades, hospitales y e-commerce.
        </p>
      </motion.div>

      {/* Stats row */}
      <motion.div variants={fade} className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="flex flex-col gap-1 rounded-lg border border-border bg-card p-4"
          >
            <s.icon className="h-4 w-4 text-primary" />
            <span className="text-2xl font-bold text-foreground">{s.value}</span>
            <span className="text-xs text-muted-foreground">{s.sub}</span>
          </div>
        ))}
      </motion.div>

      {/* Difficulty distribution */}
      <motion.div variants={fade} className="rounded-lg border border-border bg-card p-5">
        <h3 className="mb-4 text-sm font-semibold text-foreground">
          Distribucion de dificultad
        </h3>
        <div className="flex flex-col gap-3">
          {difficulties.map((d) => (
            <div key={d.level} className="flex items-center gap-3">
              <span className="w-24 text-xs font-medium text-foreground">{d.level}</span>
              <div className="flex-1 overflow-hidden rounded-full bg-muted/30">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${d.pct}%` }}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                  className={`h-2.5 rounded-full ${d.color}`}
                />
              </div>
              <span className="w-10 text-right font-mono text-xs text-muted-foreground">
                {d.pct}%
              </span>
              <span className="hidden text-xs text-muted-foreground sm:block">
                {d.desc}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
