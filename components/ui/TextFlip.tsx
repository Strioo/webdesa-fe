'use client'

import { useEffect, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface LayoutTextFlipProps {
  text?: string
  words: string[]
  duration?: number
  className?: string
}

export const LayoutTextFlip = ({ 
  text = '', 
  words, 
  duration = 3000, 
  className = '' 
}: LayoutTextFlipProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length)
    }, duration)

    return () => clearInterval(interval)
  }, [words.length, duration])

  return (
    <div className={`inline-flex items-center ${className}`}>
      {text && <span className="mr-2">{text}</span>}
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ 
            rotateX: 90,
            opacity: 0,
            y: -20
          }}
          animate={{ 
            rotateX: 0,
            opacity: 1,
            y: 0
          }}
          exit={{ 
            rotateX: -90,
            opacity: 0,
            y: 20
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="inline-block origin-center"
          style={{
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
          }}
        >
          {words[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

export default LayoutTextFlip
