"use client"

import { motion } from "framer-motion"
import { Brain, Repeat, Layers, ArrowRight } from "lucide-react"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
}

export function SlideTheory() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex h-full flex-col justify-center"
    >
      <motion.div variants={item} className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
        Fundamentos Teoricos
      </motion.div>
      <motion.h2 variants={item} className="mb-8 text-balance text-4xl font-bold text-foreground lg:text-5xl">
        Transformers, Encoder-Decoder y Transfer Learning
      </motion.h2>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Left column - Concepts */}
        <motion.div variants={item} className="flex flex-col gap-4">
          {/* Transformer */}
          <div className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Arquitectura Transformer</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Introducida en <span className="font-semibold text-foreground">{'"Attention is All You Need"'}</span> (Vaswani et al., 2017).
              Utiliza mecanismos de <span className="text-primary">Self-Attention</span> para procesar secuencias en paralelo,
              capturando dependencias a larga distancia sin recurrir a redes recurrentes.
            </p>
          </div>

          {/* Encoder-Decoder */}
          <div className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                <Repeat className="h-5 w-5 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Modelo Encoder-Decoder</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              CodeT5p utiliza una arquitectura <span className="text-primary">Seq2Seq</span> donde el encoder procesa
              la entrada (pregunta + esquema) y el decoder genera la secuencia SQL token por token.
              Ideal para tareas de traduccion estructurada.
            </p>
          </div>

          {/* Transfer Learning */}
          <div className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <Layers className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Transfer Learning y Fine-Tuning</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Se toma un modelo <span className="text-primary">pre-entrenado en codigo fuente</span> (CodeT5p de Salesforce)
              y se realiza fine-tuning especifico sobre el dataset Spider. Esto aprovecha el conocimiento previo del
              modelo sobre sintaxis de programacion.
            </p>
          </div>
        </motion.div>

        {/* Right column - CodeT5p specifics */}
        <motion.div variants={item} className="flex flex-col gap-4">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-5 backdrop-blur-sm">
            <h3 className="mb-3 text-lg font-semibold text-primary">CodeT5p-770m (Salesforce)</h3>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              Variante de T5 pre-entrenada especificamente sobre repositorios de codigo fuente.
              Sus 770 millones de parametros le otorgan capacidad de razonamiento relacional
              suficiente para generar JOINs complejos.
            </p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-center gap-2">
                <ArrowRight className="h-3.5 w-3.5 text-primary" />
                <span className="text-muted-foreground">Pre-entrenado en <span className="text-foreground">codigo fuente multilenguaje</span></span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="h-3.5 w-3.5 text-primary" />
                <span className="text-muted-foreground">Arquitectura <span className="text-foreground">Seq2Seq (Encoder-Decoder)</span></span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="h-3.5 w-3.5 text-primary" />
                <span className="text-muted-foreground">Fine-tuning sobre <span className="text-foreground">8,659 consultas</span> del dataset Spider</span>
              </div>
              <div className="flex items-center gap-2">
                <ArrowRight className="h-3.5 w-3.5 text-primary" />
                <span className="text-muted-foreground"><span className="text-foreground">166 bases de datos</span> multidominio</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm">
            <h3 className="mb-3 text-lg font-semibold text-foreground">Dataset Spider</h3>
            <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
              Benchmark estandar de la Universidad de Yale para Text-to-SQL.
              Contiene consultas de multiples niveles de dificultad sobre
              bases de datos realistas y complejas.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-muted/40 p-3 text-center">
                <div className="text-2xl font-bold text-primary">8,659</div>
                <div className="text-xs text-muted-foreground">Consultas de entrenamiento</div>
              </div>
              <div className="rounded-lg bg-muted/40 p-3 text-center">
                <div className="text-2xl font-bold text-primary">166</div>
                <div className="text-xs text-muted-foreground">Bases de datos</div>
              </div>
              <div className="rounded-lg bg-muted/40 p-3 text-center">
                <div className="text-2xl font-bold text-accent">4</div>
                <div className="text-xs text-muted-foreground">Niveles de dificultad</div>
              </div>
              <div className="rounded-lg bg-muted/40 p-3 text-center">
                <div className="text-2xl font-bold text-accent">1,034</div>
                <div className="text-xs text-muted-foreground">Consultas de evaluacion</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
