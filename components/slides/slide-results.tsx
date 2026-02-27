"use client"

import { motion } from "framer-motion"
import { Trophy, Target, CheckCircle2 } from "lucide-react"

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const fade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const results = [
  { difficulty: "Easy", exec: "84.7%", exact: "85.1%", barWidth: "84.7%", barClass: "bg-green-400" },
  { difficulty: "Medium", exec: "71.1%", exact: "67.7%", barWidth: "71.1%", barClass: "bg-primary" },
  { difficulty: "Hard", exec: "56.9%", exact: "48.9%", barWidth: "56.9%", barClass: "bg-yellow-400" },
  { difficulty: "Extra Hard", exec: "44.0%", exact: "36.7%", barWidth: "44%", barClass: "bg-red-400" },
]

export function SlideResults() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="flex w-full flex-col gap-6"
    >
      <motion.div variants={fade} className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-widest text-primary">
          08 &mdash; Resultados
        </span>
        <h2 className="text-balance text-3xl font-bold text-foreground lg:text-4xl">
          Resultados Oficiales
        </h2>
        <p className="text-sm text-muted-foreground">
          Evaluado con el script oficial de Spider (evaluation.py con --etype all)
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Table */}
        <motion.div variants={fade} className="overflow-hidden rounded-lg border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-4 py-3 text-left font-medium text-muted-foreground">Dificultad</th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground">Exec. Acc.</th>
                <th className="px-4 py-3 text-center font-medium text-muted-foreground">Exact Match</th>
              </tr>
            </thead>
            <tbody>
              {results.map((r) => (
                <tr key={r.difficulty} className="border-b border-border/50">
                  <td className="px-4 py-2.5 font-medium text-foreground">{r.difficulty}</td>
                  <td className="px-4 py-2.5 text-center font-mono text-foreground">{r.exec}</td>
                  <td className="px-4 py-2.5 text-center font-mono text-muted-foreground">{r.exact}</td>
                </tr>
              ))}
              <tr className="bg-primary/5">
                <td className="px-4 py-2.5 font-bold text-primary">TOTAL</td>
                <td className="px-4 py-2.5 text-center font-mono font-bold text-primary">68.67%</td>
                <td className="px-4 py-2.5 text-center font-mono font-bold text-primary">63.7%</td>
              </tr>
            </tbody>
          </table>
        </motion.div>

        {/* Right side */}
        <div className="flex flex-col gap-4">
          {/* Visual bar chart */}
          <motion.div variants={fade} className="rounded-lg border border-border bg-card p-4">
            <h3 className="mb-3 text-xs font-semibold uppercase text-muted-foreground">
              Execution Accuracy por Dificultad
            </h3>
            <div className="flex flex-col gap-2.5">
              {results.map((r, i) => (
                <div key={r.difficulty} className="flex items-center gap-3">
                  <span className="w-20 text-xs text-foreground">{r.difficulty}</span>
                  <div className="flex-1 overflow-hidden rounded-full bg-muted/30">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: r.barWidth }}
                      transition={{ delay: 0.5 + i * 0.15, duration: 0.8, ease: "easeOut" }}
                      className={`h-3 rounded-full ${r.barClass}`}
                    />
                  </div>
                  <span className="w-12 text-right font-mono text-xs text-muted-foreground">{r.exec}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Metrics explanation */}
          <motion.div variants={fade} className="flex flex-col gap-3">
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-3">
              <Target className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              <div>
                <p className="text-xs font-semibold text-foreground">Execution Accuracy</p>
                <p className="text-xs text-muted-foreground">
                  Mide si el SQL generado devuelve exactamente los mismos resultados que la query de referencia.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-3">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-400" />
              <div>
                <p className="text-xs font-semibold text-foreground">Exact Match</p>
                <p className="text-xs text-muted-foreground">
                  Mide si el SQL es sintacticamente identico clausula por clausula. Mas estricta pero a veces enganosa.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}
