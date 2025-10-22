'use client'

import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

/**
 * Global Animation Provider
 * - Enables smooth page transitions with AnimatePresence
 * - Respects prefers-reduced-motion media query
 * - Provides consistent spring easing and duration
 */

interface AnimationProviderProps {
  children: React.ReactNode
}

export default function AnimationProvider({ children }: AnimationProviderProps) {
  const pathname = usePathname()
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check user's motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Global spring configuration for consistency
  const springTransition = {
    type: 'spring' as const,
    stiffness: 260,
    damping: 20,
    mass: 0.8
  }

  return (
    <MotionConfig
      reducedMotion={prefersReducedMotion ? 'always' : 'never'}
      transition={springTransition}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: prefersReducedMotion ? 0 : 0.3,
            ease: 'easeInOut'
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  )
}
