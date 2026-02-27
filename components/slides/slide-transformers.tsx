"use client"

import { motion } from "framer-motion"
import { Layers, Eye, Repeat, Zap } from "lucide-react"

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const fade = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

const concepts = [
  {
    icon: Layers,
    title: "Encoder-Decoder",
    desc: "El Encoder procesa la entrada (pregunta + esquema) y genera representaciones contextuales. El Decoder genera la salida (SQL) token por token, condicionado por la representacion del Encoder.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Eye,
    title: "Self-Attention",
    desc: "Mecanismo que permite a cada token \"mirar\" todos los demas tokens de la secuencia simultaneamente, capturando dependencias a larga distancia sin importar la posicion.",
    color: "text-green-400",
    bg: "bg-green-400/10",
  },
  {
    icon: Repeat,
    title: "Multi-Head Attention",
    desc: "Multiples \"cabezas\" de atencion en paralelo, cada una aprendiendo patrones diferentes: relaciones entre tablas, tipos de datos, estructura gramatical del SQL, etc.",
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    icon: Zap,
    title: "Fine-Tuning",
    desc: "Proceso de adaptar un modelo pre-entrenado en una tarea general hacia una tarea especifica (Text-to-SQL), re-optimizando sus pesos con datos del dominio objetivo.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
]

export function SlideTransformers() {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className="flex w-full flex-col gap-8"
    >
      <motion.div variants={fade} className="flex flex-col gap-2">
        <span className="font-mono text-xs uppercase tracking-widest text-primary">
          02 &mdash; Marco Teorico
        </span>
        <h2 className="text-balance text-3xl font-bold text-foreground lg:text-4xl">
          Arquitectura Transformer
        </h2>
        <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
          Introducidos en &quot;Attention Is All You Need&quot; (Vaswani et al., 2017),
          los Transformers revolucionaron el procesamiento de secuencias al
          reemplazar las redes recurrentes con mecanismos de atencion pura.
        </p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        {concepts.map((c) => (
          <motion.div
            key={c.title}
            variants={fade}
            className="rounded-lg border border-border bg-card p-5"
          >
            <div className="mb-3 flex items-center gap-3">
              <div className={`flex h-9 w-9 items-center justify-center rounded-md ${c.bg}`}>
                <c.icon className={`h-5 w-5 ${c.color}`} />
              </div>
              <h3 className="font-semibold text-foreground">{c.title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {c.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
