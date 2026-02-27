"use client"

import { motion } from "framer-motion"
import { Monitor, Server, Brain, Database, Code2, FileCode } from "lucide-react"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
}

const techStack = [
  {
    category: "Frontend",
    icon: Monitor,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    items: [
      { name: "Reflex", desc: "Framework Python full-stack para interfaces web reactivas" },
    ],
  },
  {
    category: "Backend",
    icon: Server,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
    items: [
      { name: "FastAPI", desc: "Framework asincrono de alto rendimiento para APIs REST" },
      { name: "Pydantic", desc: "Validacion de datos y serializacion con tipado estatico" },
      { name: "sqlglot", desc: "Parser SQL para convertir DDL al formato de entrenamiento" },
    ],
  },
  {
    category: "Modelo de IA",
    icon: Brain,
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/30",
    items: [
      { name: "CodeT5p-770m", desc: "Transformer encoder-decoder de Salesforce pre-entrenado en codigo" },
      { name: "HuggingFace Transformers", desc: "Libreria para cargar y ejecutar modelos de lenguaje" },
      { name: "PyTorch", desc: "Framework de deep learning para inferencia con GPU" },
    ],
  },
  {
    category: "Datos y Evaluacion",
    icon: Database,
    color: "text-accent",
    bgColor: "bg-accent/10",
    borderColor: "border-accent/20",
    items: [
      { name: "Spider Dataset", desc: "8,659 consultas de entrenamiento sobre 166 bases de datos" },
      { name: "Google Colab", desc: "Entorno de entrenamiento con GPU NVIDIA T4" },
    ],
  },
]

export function SlideDemo() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex h-full flex-col justify-center"
    >
      <motion.div variants={item} className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
        Tecnologias y Stack
      </motion.div>
      <motion.h2 variants={item} className="mb-8 text-balance text-4xl font-bold text-foreground lg:text-5xl">
        Las herramientas detras del proyecto
      </motion.h2>

      <div className="grid gap-4 md:grid-cols-2">
        {techStack.map((tech, i) => (
          <motion.div
            key={i}
            variants={item}
            className={`rounded-xl border ${tech.borderColor} ${tech.bgColor} p-5 backdrop-blur-sm`}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${tech.bgColor}`}>
                <tech.icon className={`h-5 w-5 ${tech.color}`} />
              </div>
              <h3 className={`text-lg font-semibold ${tech.color}`}>{tech.category}</h3>
            </div>
            <div className="flex flex-col gap-2">
              {tech.items.map((t, j) => (
                <div key={j} className="flex items-start gap-2 rounded-lg bg-background/30 px-3 py-2">
                  <Code2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                  <div>
                    <span className="text-sm font-medium text-foreground">{t.name}</span>
                    <span className="ml-2 text-xs text-muted-foreground">{t.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Project structure */}
      <motion.div variants={item} className="mt-4 rounded-xl border border-border bg-card/60 p-4 backdrop-blur-sm">
        <div className="flex items-center gap-2 mb-3">
          <FileCode className="h-4 w-4 text-muted-foreground" />
          <h4 className="text-sm font-semibold text-foreground">Estructura del Proyecto</h4>
        </div>
        <pre className="font-mono text-xs leading-relaxed text-muted-foreground">
{`texto-a-sql/
├── backend/
│   ├── api.py          `}<span className="text-primary"># FastAPI endpoints</span>{`
│   └── model.py        `}<span className="text-primary"># CodeT5p + serializacion</span>{`
├── frontend/
│   ├── components/     `}<span className="text-accent"># UI components (Reflex)</span>{`
│   ├── pages/          `}<span className="text-accent"># Paginas de la app</span>{`
│   └── state/          `}<span className="text-accent"># Estado reactivo</span>{`
└── requirements.txt`}
        </pre>
      </motion.div>
    </motion.div>
  )
}
