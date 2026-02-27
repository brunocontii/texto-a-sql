"use client"

import { motion } from "framer-motion"
import { TrendingUp, Info } from "lucide-react"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
}

const results = [
  { difficulty: "Easy", exec: "84.7%", exact: "85.1%", color: "bg-green-400", barColor: "bg-green-400/70", width: "84.7%" },
  { difficulty: "Medium", exec: "71.1%", exact: "67.7%", color: "bg-primary", barColor: "bg-primary/70", width: "71.1%" },
  { difficulty: "Hard", exec: "56.9%", exact: "48.9%", color: "bg-yellow-400", barColor: "bg-yellow-400/70", width: "56.9%" },
  { difficulty: "Extra Hard", exec: "44.0%", exact: "36.7%", color: "bg-red-400", barColor: "bg-red-400/70", width: "44%" },
]

export function SlideResults() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex h-full flex-col justify-center"
    >
      <motion.div variants={item} className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
        Resultados Oficiales
      </motion.div>
      <motion.h2 variants={item} className="mb-8 text-balance text-4xl font-bold text-foreground lg:text-5xl">
        Evaluacion con el script oficial de Spider
      </motion.h2>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Table */}
        <motion.div variants={item} className="lg:col-span-3">
          <div className="overflow-hidden rounded-xl border border-border bg-card/60 backdrop-blur-sm">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Dificultad</th>
                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">Execution Accuracy</th>
                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground">Exact Match</th>
                </tr>
              </thead>
              <tbody>
                {results.map((r, i) => (
                  <tr key={i} className="border-b border-border/50 transition-colors hover:bg-muted/20">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className={`h-2.5 w-2.5 rounded-full ${r.color}`} />
                        <span className="text-sm font-medium text-foreground">{r.difficulty}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-center font-mono text-sm text-foreground">{r.exec}</td>
                    <td className="px-5 py-3 text-center font-mono text-sm text-muted-foreground">{r.exact}</td>
                  </tr>
                ))}
                {/* Total row */}
                <tr className="bg-primary/5">
                  <td className="px-5 py-3">
                    <span className="text-sm font-bold text-primary">TOTAL</span>
                  </td>
                  <td className="px-5 py-3 text-center font-mono text-sm font-bold text-primary">68.67%</td>
                  <td className="px-5 py-3 text-center font-mono text-sm font-bold text-primary">63.7%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Visual bar chart */}
          <motion.div variants={item} className="mt-4 flex flex-col gap-2 rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm">
            <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Execution Accuracy por Dificultad</h4>
            {results.map((r, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-20 text-xs text-muted-foreground">{r.difficulty}</span>
                <div className="flex-1 overflow-hidden rounded-full bg-muted/30">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: r.width }}
                    transition={{ delay: 0.5 + i * 0.15, duration: 0.8, ease: "easeOut" }}
                    className={`h-3 rounded-full ${r.barColor}`}
                  />
                </div>
                <span className="w-14 text-right font-mono text-xs text-foreground">{r.exec}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Metrics explanation */}
        <motion.div variants={item} className="flex flex-col gap-4 lg:col-span-2">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
            <div className="mb-3 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-primary">Execution Accuracy</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Mide si la consulta SQL generada devuelve{" "}
              <span className="text-foreground">exactamente los mismos resultados</span>{" "}
              (mismas filas y columnas) que la consulta de referencia cuando se ejecuta
              contra la base de datos.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-2">
              <Info className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">Exact Match</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Mide si el SQL generado es{" "}
              <span className="text-foreground">sintacticamente identico</span> clausula
              por clausula a la consulta de referencia. Metrica mas estricta pero a veces
              engaanosa, ya que existen multiples formas de escribir una consulta que
              devuelve el mismo resultado.
            </p>
          </div>

          <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-5">
            <h3 className="mb-2 font-semibold text-green-400">Resultado destacado</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Un <span className="font-bold text-green-400">68.67%</span> de Execution Accuracy con solo{" "}
              <span className="text-foreground">770M de parametros</span> y una GPU T4 de Google Colab
              demuestra la eficiencia del enfoque de fine-tuning directo.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
