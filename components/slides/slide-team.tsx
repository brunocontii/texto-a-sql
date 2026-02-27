"use client"

import { motion } from "framer-motion"
import { GraduationCap, Github, User, Database, Sparkles } from "lucide-react"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
}
const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
}

const team = [
  { name: "Conti, Bruno", icon: User },
  { name: "Gonzalez, Juan Cruz", icon: User },
  { name: "Vollenweider, Erich", icon: User },
]

export function SlideTeam() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex h-full flex-col items-center justify-center text-center"
    >
      {/* University badge */}
      <motion.div
        variants={item}
        className="mb-6 flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-5 py-2.5"
      >
        <GraduationCap className="h-4 w-4 text-primary" />
        <span className="text-sm font-medium text-primary">Inteligencia Artificial - 2025</span>
      </motion.div>

      <motion.h2 variants={item} className="mb-2 text-balance text-4xl font-bold text-foreground lg:text-5xl">
        Equipo de Desarrollo
      </motion.h2>
      <motion.p variants={item} className="mb-10 text-lg text-muted-foreground">
        Universidad Nacional de Rio Cuarto
      </motion.p>

      {/* Team members */}
      <motion.div variants={item} className="mb-10 flex flex-wrap items-center justify-center gap-4">
        {team.map((member, i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-xl border border-border bg-card/60 px-6 py-4 backdrop-blur-sm transition-all hover:border-primary/30 hover:bg-card"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <member.icon className="h-5 w-5 text-primary" />
            </div>
            <span className="text-lg font-medium text-foreground">{member.name}</span>
          </div>
        ))}
      </motion.div>

      {/* Project summary */}
      <motion.div variants={item} className="mb-8 max-w-2xl rounded-xl border border-primary/20 bg-primary/5 p-6">
        <div className="mb-4 flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-primary">Texto-a-SQL con CodeT5p</h3>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4 text-primary" />
            <span><span className="font-semibold text-foreground">68.67%</span> Execution Accuracy</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground/40">|</span>
            <span><span className="font-semibold text-foreground">770M</span> parametros</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-muted-foreground/40">|</span>
            <span><span className="font-semibold text-foreground">Spider</span> dataset</span>
          </div>
        </div>
      </motion.div>

      {/* GitHub link */}
      <motion.div variants={item}>
        <a
          href="https://github.com/brunocontii/texto-a-sql"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg border border-border bg-card/60 px-5 py-2.5 text-sm text-muted-foreground transition-all hover:border-primary/30 hover:text-foreground"
        >
          <Github className="h-4 w-4" />
          <span>github.com/brunocontii/texto-a-sql</span>
        </a>
      </motion.div>

      <motion.p variants={item} className="mt-8 text-sm text-muted-foreground/50">
        Gracias por su atencion
      </motion.p>
    </motion.div>
  )
}
