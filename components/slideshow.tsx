"use client"

import { useState, useCallback, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { SlideTitle } from "@/components/slides/slide-title"
import { SlideProblem } from "@/components/slides/slide-problem"
import { SlideTransformers } from "@/components/slides/slide-transformers"
import { SlideCodeT5 } from "@/components/slides/slide-codet5"
import { SlideDataset } from "@/components/slides/slide-dataset"
import { SlideArchitecture } from "@/components/slides/slide-architecture"
import { SlideFlow } from "@/components/slides/slide-flow"
import { SlideCode } from "@/components/slides/slide-code"
import { SlideResults } from "@/components/slides/slide-results"
import { SlideExperiments } from "@/components/slides/slide-experiments"
import { SlideHardware } from "@/components/slides/slide-hardware"
import { SlideConclusions } from "@/components/slides/slide-conclusions"

const slides = [
  { id: "title", component: SlideTitle, label: "Portada" },
  { id: "problem", component: SlideProblem, label: "Problema" },
  { id: "transformers", component: SlideTransformers, label: "Transformers" },
  { id: "codet5", component: SlideCodeT5, label: "CodeT5p" },
  { id: "dataset", component: SlideDataset, label: "Spider" },
  { id: "architecture", component: SlideArchitecture, label: "Arquitectura" },
  { id: "flow", component: SlideFlow, label: "Flujo" },
  { id: "code", component: SlideCode, label: "Codigo" },
  { id: "results", component: SlideResults, label: "Resultados" },
  { id: "experiments", component: SlideExperiments, label: "Experimentos" },
  { id: "hardware", component: SlideHardware, label: "Hardware" },
  { id: "conclusions", component: SlideConclusions, label: "Conclusiones" },
]

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
}

export function Slideshow() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const go = useCallback(
    (dir: number) => {
      setDirection(dir)
      setCurrent((prev) => {
        const next = prev + dir
        if (next < 0) return 0
        if (next >= slides.length) return slides.length - 1
        return next
      })
    },
    []
  )

  const goTo = useCallback((idx: number) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }, [current])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault()
        go(1)
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        go(-1)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go])

  const Slide = slides[current].component

  return (
    <div className="relative flex h-screen w-screen flex-col overflow-hidden bg-background">
      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />

      {/* Subtle radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      {/* Slide content */}
      <div className="relative z-10 flex flex-1 items-center justify-center overflow-hidden px-6 py-8 lg:px-16 lg:py-12">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slides[current].id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-full w-full max-w-6xl items-center justify-center"
          >
            <Slide />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom bar */}
      <div className="relative z-20 flex items-center justify-between border-t border-border/50 bg-background/80 px-6 py-3 backdrop-blur-sm">
        {/* Slide counter */}
        <span className="font-mono text-xs text-muted-foreground">
          {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>

        {/* Dot navigation */}
        <div className="flex items-center gap-1.5">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => goTo(i)}
              aria-label={`Ir a slide: ${s.label}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === current
                  ? "w-6 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
            />
          ))}
        </div>

        {/* Arrow buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => go(-1)}
            disabled={current === 0}
            aria-label="Slide anterior"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border/50 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => go(1)}
            disabled={current === slides.length - 1}
            aria-label="Siguiente slide"
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border/50 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
