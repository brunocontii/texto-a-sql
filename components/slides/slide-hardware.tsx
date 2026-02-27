"use client"

import { motion } from "framer-motion"
import { Cpu, HardDrive, AlertCircle, Maximize2 } from "lucide-react"

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 },
}

export function SlideHardware() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex h-full flex-col justify-center"
    >
      <motion.div variants={item} className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">
        Entorno de Entrenamiento
      </motion.div>
      <motion.h2 variants={item} className="mb-8 text-balance text-4xl font-bold text-foreground lg:text-5xl">
        Limitaciones de hardware y decisiones de ingenieria
      </motion.h2>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Hardware specs */}
        <motion.div variants={item} className="flex flex-col gap-4">
          <div className="rounded-xl border border-primary/20 bg-primary/5 p-6">
            <div className="mb-4 flex items-center gap-3">
              <Cpu className="h-6 w-6 text-primary" />
              <h3 className="text-lg font-semibold text-primary">Google Colab - GPU NVIDIA T4</h3>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-background/40 p-3 text-center">
                <div className="text-2xl font-bold text-foreground">16 GB</div>
                <div className="text-xs text-muted-foreground">VRAM disponible</div>
              </div>
              <div className="rounded-lg bg-background/40 p-3 text-center">
                <div className="text-2xl font-bold text-foreground">770M</div>
                <div className="text-xs text-muted-foreground">Parametros del modelo</div>
              </div>
              <div className="rounded-lg bg-background/40 p-3 text-center">
                <div className="text-2xl font-bold text-foreground">512</div>
                <div className="text-xs text-muted-foreground">Max tokens de entrada</div>
              </div>
              <div className="rounded-lg bg-background/40 p-3 text-center">
                <div className="text-2xl font-bold text-foreground">5</div>
                <div className="text-xs text-muted-foreground">Beam Search</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold text-foreground">Seleccion del Modelo</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              La memoria VRAM limitada de la T4 impidio cargar LLMs mas grandes
              (CodeT5+ 2B/16B). <span className="text-primary">CodeT5p-770m</span> fue el modelo mas inteligente
              que cabia en la GPU, siendo el punto optimo entre capacidad de
              razonamiento y viabilidad de entrenamiento.
            </p>
          </div>
        </motion.div>

        {/* Limitations */}
        <motion.div variants={item} className="flex flex-col gap-4">
          <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-5">
            <div className="mb-3 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-yellow-400" />
              <h3 className="font-semibold text-yellow-400">Ventana de Contexto y Truncamiento</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              El modelo procesa un limite maximo de <span className="text-foreground">512-1024 tokens</span> por inferencia.
              Las bases de datos masivas de Spider (decenas de tablas, cientos de columnas) exceden esta ventana,
              provocando que el tokenizador <span className="text-yellow-400">trunce el final del prompt</span>.
            </p>
            <div className="mt-3 rounded-lg bg-background/40 p-3">
              <p className="text-xs text-muted-foreground">
                Esto deja al modelo {'"ciego"'} ante las ultimas tablas o claves foraneas,
                explicando gran parte de la caida de precision en dificultades{" "}
                <span className="font-semibold text-yellow-400">Hard</span> y{" "}
                <span className="font-semibold text-yellow-400">Extra Hard</span>.
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card/60 p-5 backdrop-blur-sm">
            <div className="mb-3 flex items-center gap-2">
              <Maximize2 className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-foreground">Impacto en el Accuracy</h3>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Aunque el modelo logro un excelente <span className="font-bold text-primary">68.67%</span> demostrando gran eficiencia,
              escalar el tamanio del modelo con hardware superior impactaria directamente en el porcentaje final,
              especialmente en las consultas Extra Hard.
            </p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="rounded-lg bg-muted/30 p-2 text-center">
                <div className="text-lg font-bold text-green-400">84.7%</div>
                <div className="text-xs text-muted-foreground">Easy</div>
              </div>
              <div className="rounded-lg bg-muted/30 p-2 text-center">
                <div className="text-lg font-bold text-red-400">44.0%</div>
                <div className="text-xs text-muted-foreground">Extra Hard</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
