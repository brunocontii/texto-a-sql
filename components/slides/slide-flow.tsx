"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const fade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export function SlideFlow() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="flex w-full flex-col gap-6"
    >
      <motion.div variants={fade} className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-widest text-primary">
          06 &mdash; Flujo de Ejecucion
        </span>
        <h2 className="text-balance text-3xl font-bold text-foreground lg:text-4xl">
          De la pregunta a la consulta SQL
        </h2>
      </motion.div>

      {/* Step 1 */}
      <motion.div variants={fade} className="rounded-lg border border-border bg-card p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            1
          </span>
          <h3 className="text-sm font-semibold text-foreground">Entrada del Usuario</h3>
        </div>
        <div className="grid gap-3 lg:grid-cols-2">
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="mb-1 font-mono text-[10px] uppercase text-muted-foreground">Pregunta</p>
            <p className="font-mono text-xs text-green-400">
              &quot;How many students belong to the Computer Science department?&quot;
            </p>
          </div>
          <div className="rounded-md border border-border bg-muted/30 p-3">
            <p className="mb-1 font-mono text-[10px] uppercase text-muted-foreground">Schema DDL</p>
            <pre className="font-mono text-[11px] leading-relaxed text-foreground/80">
{`CREATE TABLE department (
  id int PRIMARY KEY, name text
);
CREATE TABLE student (
  id int PRIMARY KEY, name text,
  department_id int,
  FOREIGN KEY (department_id)
    REFERENCES department(id)
);`}
            </pre>
          </div>
        </div>
      </motion.div>

      {/* Arrow */}
      <motion.div variants={fade} className="flex justify-center">
        <ArrowRight className="h-4 w-4 rotate-90 text-primary/50" />
      </motion.div>

      {/* Step 2 */}
      <motion.div variants={fade} className="rounded-lg border border-border bg-card p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            2
          </span>
          <h3 className="text-sm font-semibold text-foreground">Parseo y Serializacion (sqlglot + regex)</h3>
        </div>
        <div className="rounded-md border border-primary/20 bg-primary/5 p-3">
          <pre className="overflow-x-auto font-mono text-[11px] leading-relaxed text-primary">
{`department : number department_id (pk) , text name
| student : number student_id (pk) , text name ,
number department_id
| foreign keys: student.department_id =
department.department_id`}
          </pre>
        </div>
      </motion.div>

      <motion.div variants={fade} className="flex justify-center">
        <ArrowRight className="h-4 w-4 rotate-90 text-primary/50" />
      </motion.div>

      {/* Step 3 */}
      <motion.div variants={fade} className="rounded-lg border border-border bg-card p-4">
        <div className="mb-2 flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
            3
          </span>
          <h3 className="text-sm font-semibold text-foreground">Prompt Final + Respuesta del Modelo</h3>
        </div>
        <div className="mb-3 rounded-md border border-border bg-muted/30 p-3">
          <p className="mb-1 font-mono text-[10px] uppercase text-muted-foreground">Prompt</p>
          <p className="font-mono text-[11px] leading-relaxed text-yellow-400">
            translate to SQL: How many students... | db_id: custom_db | schema: department : number department_id (pk) ...
          </p>
        </div>
        <div className="rounded-md border border-green-400/20 bg-green-400/5 p-3">
          <p className="mb-1 font-mono text-[10px] uppercase text-muted-foreground">SQL Generado</p>
          <p className="font-mono text-xs text-green-400">
            SELECT count(*) FROM student AS T1 JOIN department AS T2 ON T1.department_id = T2.id WHERE T2.name = &apos;Computer Science&apos;
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}
