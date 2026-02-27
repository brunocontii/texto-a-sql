"use client"

import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
}

export function SlideFlow() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex h-full flex-col justify-center"
    >
      <motion.div variants={item} className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
        Flujo de Ejecucion
      </motion.div>
      <motion.h2 variants={item} className="mb-8 text-balance text-3xl font-bold text-foreground lg:text-4xl">
        De la pregunta del usuario a la consulta SQL
      </motion.h2>

      <div className="flex flex-col gap-3">
        {/* Step 1 - User Input */}
        <motion.div variants={item} className="rounded-xl border border-border bg-card/60 p-4 backdrop-blur-sm">
          <div className="mb-2 flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">1</span>
            <h3 className="text-sm font-semibold text-foreground">Entrada del Usuario</h3>
          </div>
          <div className="ml-10 grid gap-3 lg:grid-cols-2">
            <div className="rounded-lg bg-muted/30 p-3">
              <div className="mb-1 text-xs text-muted-foreground">Pregunta:</div>
              <code className="text-sm text-foreground">{'"How many students belong to the Computer Science department?"'}</code>
            </div>
            <div className="rounded-lg bg-muted/30 p-3">
              <div className="mb-1 text-xs text-muted-foreground">Schema DDL:</div>
              <pre className="font-mono text-xs leading-relaxed text-muted-foreground">
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

        <motion.div variants={item} className="flex justify-center">
          <ArrowDown className="h-5 w-5 text-primary/40" />
        </motion.div>

        {/* Step 2 - Serialization */}
        <motion.div variants={item} className="rounded-xl border border-border bg-card/60 p-4 backdrop-blur-sm">
          <div className="mb-2 flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent/20 text-xs font-bold text-accent">2</span>
            <h3 className="text-sm font-semibold text-foreground">Parseo y Serializacion (Backend)</h3>
          </div>
          <div className="ml-10 rounded-lg bg-muted/30 p-3">
            <div className="mb-1 text-xs text-muted-foreground">Schema transformado:</div>
            <code className="font-mono text-xs leading-relaxed text-primary">
              {'department : number department_id (pk) , text name | student : number student_id (pk) , text name , number department_id | foreign keys: student.department_id = department.department_id'}
            </code>
          </div>
        </motion.div>

        <motion.div variants={item} className="flex justify-center">
          <ArrowDown className="h-5 w-5 text-primary/40" />
        </motion.div>

        {/* Step 3 - Prompt */}
        <motion.div variants={item} className="rounded-xl border border-primary/20 bg-primary/5 p-4 backdrop-blur-sm">
          <div className="mb-2 flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">3</span>
            <h3 className="text-sm font-semibold text-foreground">Prompt Final al Modelo</h3>
          </div>
          <div className="ml-10 rounded-lg bg-background/60 p-3">
            <code className="font-mono text-xs leading-relaxed text-muted-foreground">
              <span className="text-primary">translate to SQL:</span> How many students belong to the Computer Science department? <span className="text-accent">| db_id:</span> custom_db <span className="text-accent">| schema:</span> department : number ...
            </code>
          </div>
        </motion.div>

        <motion.div variants={item} className="flex justify-center">
          <ArrowDown className="h-5 w-5 text-primary/40" />
        </motion.div>

        {/* Step 4 - Output */}
        <motion.div variants={item} className="rounded-xl border border-primary/30 bg-primary/5 p-4 backdrop-blur-sm glow-cyan">
          <div className="mb-2 flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/30 text-xs font-bold text-primary">4</span>
            <h3 className="text-sm font-semibold text-primary">SQL Generado</h3>
          </div>
          <div className="ml-10 rounded-lg bg-background/60 p-3">
            <code className="font-mono text-sm text-primary">
              {'SELECT count(*) FROM student AS T1 JOIN department AS T2 ON T1.department_id = T2.id WHERE T2.name = \'Computer Science\''}
            </code>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
