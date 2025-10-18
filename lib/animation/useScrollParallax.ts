'use client'

import { useEffect, useRef, useState } from 'react'
import { useScroll, useTransform, MotionValue } from 'framer-motion'

interface UseScrollParallaxOptions {
  speed?: number
  offset?: [number, number]
  disabled?: boolean
}

export const useScrollParallax = (options: UseScrollParallaxOptions = {}) => {
  const { speed = 0.5, offset = [0, 0], disabled = false } = options
  
  const ref = useRef<HTMLElement>(null)
  const [shouldAnimate, setShouldAnimate] = useState(!disabled)
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Check for reduced motion and mobile
  useEffect(() => {
    const checkMotion = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      const isMobile = window.innerWidth < 768
      setShouldAnimate(!disabled && !prefersReducedMotion && !isMobile)
    }

    checkMotion()
    window.addEventListener('resize', checkMotion)
    
    return () => window.removeEventListener('resize', checkMotion)
  }, [disabled])

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldAnimate ? [offset[0] - 50 * speed, offset[1] + 50 * speed] : [0, 0]
  )

  return { ref, y, scrollYProgress }
}

// Alternative hook for numeric progress
export const useScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    return scrollYProgress.on('change', (latest) => {
      setProgress(latest)
    })
  }, [scrollYProgress])

  return progress
}
