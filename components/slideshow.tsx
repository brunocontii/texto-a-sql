"use client"

import { useState, useEffect, useCallback } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { slides } from "@/lib/slides-data"
import { SlideTitle } from "@/components/slides/slide-title"
import { SlideProblem } from "@/components/slides/slide-problem"
import { SlideTheory } from "@/components/slides/slide-theory"
import { SlideArchitecture } from "@/components/slides/slide-architecture"
import { SlideFlow } from "@/components/slides/slide-flow"
import { SlideCode } from "@/components/slides/slide-code"
import { SlideResults } from "@/components/slides/slide-results"
import { SlideExperiments } from "@/components/slides/slide-experiments"
import { SlideHardware } from "@/components/slides/slide-hardware"
import { SlideDemo } from "@/components/slides/slide-demo"
import { SlideConclusions } from "@/components/slides/slide-conclusions"
import { SlideTeam } from "@/components/slides/slide-team"

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 80 : -80,
    opacity: 0,
    scale: 0.98,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -80 : 80,
    opacity: 0,
    scale: 0.98,
  }),
}

function renderSlide(type: string) {
  switch (type) {
    case "title":
      return <SlideTitle />
    case "problem":
      return <SlideProblem />
    case "theory":
      return <SlideTheory />
    case "architecture":
      return <SlideArchitecture />
    case "flow":
      return <SlideFlow />
    case "code":
      return <SlideCode />
    case "results":
      return <SlideResults />
    case "experiments":
      return <SlideExperiments />
    case "hardware":
      return <SlideHardware />
    case "demo":
      return <SlideDemo />
    case "conclusions":
      return <SlideConclusions />
    case "team":
      return <SlideTeam />
    default:
      return null
  }
}

export function Slideshow() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const goNext = useCallback(() => {
    if (current < slides.length - 1) {
      setDirection(1)
      setCurrent((prev) => prev + 1)
    }
  }, [current])

  const goPrev = useCallback(() => {
    if (current > 0) {
      setDirection(-1)
      setCurrent((prev) => prev - 1)
    }
  }, [current])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault()
        goNext()
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault()
        goPrev()
      }
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [goNext, goPrev])

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-background">
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-40" />

      {/* Top gradient accent */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      {/* Slide content */}
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="flex h-full w-full max-w-[1400px] flex-col justify-center px-8 py-12 lg:px-16">
            {renderSlide(slides[current].type)}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation controls */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-4">
        {/* Prev button */}
        <button
          onClick={goPrev}
          disabled={current === 0}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card disabled:opacity-30 disabled:hover:border-border disabled:hover:bg-card/80"
          aria-label="Diapositiva anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Slide indicators */}
        <div className="flex items-center gap-1.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > current ? 1 : -1)
                setCurrent(idx)
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === current
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              aria-label={`Ir a diapositiva ${idx + 1}`}
            />
          ))}
        </div>

        {/* Next button */}
        <button
          onClick={goNext}
          disabled={current === slides.length - 1}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/80 text-foreground backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card disabled:opacity-30 disabled:hover:border-border disabled:hover:bg-card/80"
          aria-label="Siguiente diapositiva"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-6 right-8 font-mono text-sm text-muted-foreground">
        {current + 1} / {slides.length}
      </div>
    </div>
  )
}
