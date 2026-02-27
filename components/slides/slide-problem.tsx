"use client"

import { motion } from "framer-motion"
import { AlertTriangle, Users, Code2, Database } from "lucide-react"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
}

export function SlideProblem() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex h-full flex-col justify-center"
    >
      <motion.div variants={item} className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
        El Problema
      </motion.div>
      <motion.h2 variants={item} className="mb-4 text-balance text-4xl font-bold text-foreground lg:text-5xl">
        La brecha entre el lenguaje natural y las bases de datos
      </motion.h2>
      <motion.p variants={item} className="mb-10 max-w-3xl text-pretty text-lg text-muted-foreground">
        Millones de usuarios necesitan extraer informacion de bases de datos pero carecen del conocimiento tecnico
        para escribir SQL. Esto crea una dependencia constante de equipos tecnicos para consultas simples.
      </motion.p>

      <motion.div variants={item} className="grid gap-4 md:grid-cols-3">
        {/* Card 1 */}
        <div className="group rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
            <Users className="h-5 w-5 text-primary" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">Usuarios no tecnicos</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Analistas de datos, gerentes y profesionales necesitan acceder a datos
            sin conocer SQL, JOINs o subconsultas.
          </p>
        </div>

        {/* Card 2 */}
        <div className="group rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-accent/10">
            <Code2 className="h-5 w-5 text-accent" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">SQL es complejo</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Consultas reales requieren JOINs multiples, agregaciones, subconsultas
            y logicas condicionales avanzadas.
          </p>
        </div>

        {/* Card 3 */}
        <div className="group rounded-xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
            <Database className="h-5 w-5 text-primary" />
          </div>
          <h3 className="mb-2 text-lg font-semibold text-foreground">Multiples esquemas</h3>
          <p className="text-sm leading-relaxed text-muted-foreground">
            El sistema debe comprender esquemas con muchas tablas, relaciones,
            claves primarias y foraneas simultaneamente.
          </p>
        </div>
      </motion.div>

      <motion.div
        variants={item}
        className="mt-8 flex items-center gap-3 rounded-lg border border-yellow-500/20 bg-yellow-500/5 px-5 py-3"
      >
        <AlertTriangle className="h-5 w-5 shrink-0 text-yellow-500" />
        <p className="text-sm text-yellow-200/80">
          <span className="font-semibold text-yellow-400">Nuestra solucion:</span>{" "}
          Un modelo Transformer (CodeT5p-770m) fine-tuneado con el dataset Spider que traduce lenguaje natural a SQL
          con un <span className="font-semibold text-yellow-400">68.7% de Execution Accuracy</span>.
        </p>
      </motion.div>
    </motion.div>
  )
}
