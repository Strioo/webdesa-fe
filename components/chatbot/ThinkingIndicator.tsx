'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { Brain, Search, Database, Sparkles } from 'lucide-react'

/**
 * Thinking Indicator - ChatGPT-style thinking animation with elapsed seconds
 * 
 * Timer starts on mount and counts up without limit, showing real AI processing time
 */
export default function ThinkingIndicator() {
  const [currentStep, setCurrentStep] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const startRef = useRef<number | null>(null)

  const thinkingSteps = [
    { icon: Search, text: 'Memahami pertanyaan...', color: 'text-blue-600' },
    { icon: Database, text: 'Mencari data dari database...', color: 'text-emerald-600' },
    { icon: Brain, text: 'Menganalisis informasi...', color: 'text-purple-600' },
    { icon: Sparkles, text: 'Menyusun jawaban...', color: 'text-amber-600' },
  ]

  // cycle visual steps
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % thinkingSteps.length)
    }, 1400)
    return () => clearInterval(id)
  }, [thinkingSteps.length])

  // elapsed timer - counts up infinitely
  useEffect(() => {
    startRef.current = Date.now()
    const t = setInterval(() => {
      if (startRef.current) {
        setElapsed(Math.floor((Date.now() - startRef.current) / 1000))
      }
    }, 200)

    return () => clearInterval(t)
  }, [])

  const CurrentIcon = thinkingSteps[currentStep].icon

  // format mm:ss or just seconds
  const formatSeconds = (s: number) => {
    if (s < 60) return `${s}s`
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}m ${sec}s`
  }

  // Progress bar visual feedback (aesthetic only, infinite)
  // Changes color based on elapsed time
  const getProgressColor = () => {
    if (elapsed < 10) return 'bg-emerald-500'
    if (elapsed < 20) return 'bg-blue-500'
    if (elapsed < 30) return 'bg-amber-500'
    return 'bg-orange-500'
  }

  // Animated progress bar that pulses
  const progressWidth = Math.min(85, (elapsed / 40) * 100) // caps at 85% for visual effect

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-white to-neutral-50 rounded-2xl rounded-bl-sm shadow-md border border-neutral-100 min-w-[280px]">
        {/* Animated icon */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.28 }}
            className={thinkingSteps[currentStep].color}
          >
            <CurrentIcon className="w-5 h-5" />
          </motion.div>
        </AnimatePresence>

        <div className="flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentStep}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="text-sm font-medium text-neutral-700 truncate"
            >
              {thinkingSteps[currentStep].text}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* elapsed seconds */}
        <motion.div 
          className="text-xs font-semibold text-neutral-600 tabular-nums bg-neutral-100 px-2 py-1 rounded-md"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {formatSeconds(elapsed)}
        </motion.div>
      </div>

      {/* animated progress bar */}
      <div className="h-1.5 w-full bg-neutral-100 rounded-full overflow-hidden">
        <motion.div
          className={`h-1.5 rounded-full ${getProgressColor()}`}
          initial={{ width: '0%' }}
          animate={{ 
            width: `${progressWidth}%`,
            opacity: [0.8, 1, 0.8]
          }}
          transition={{ 
            width: { duration: 0.3 },
            opacity: { duration: 1.5, repeat: Infinity }
          }}
        />
      </div>
    </div>
  )
}
