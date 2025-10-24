'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { PropsWithChildren } from 'react'

/**
 * PageTransitionProvider - INSTANT SMOOTH VERSION
 * 
 * Ultra-fast, buttery smooth page transitions with ZERO white flash.
 * Inspired by premium websites like nexuscloud.id
 * 
 * Strategy:
 * - INSTANT page swap (no delay, no "wait" mode)
 * - Opacity fade ONLY (fastest, no blur/scale overhead)
 * - Crossfade overlap (old & new page visible together)
 * - Minimal duration (200-300ms) for instant feel
 * - GPU accelerated (will-change: opacity)
 * 
 * Result:
 * - No white flash
 * - No jarring transitions
 * - Feels like instant page swap
 * - Smooth like native app
 */
export default function PageTransitionProvider({ children }: PropsWithChildren) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{
          duration: 0.2, // Super fast - instant feel!
          ease: 'easeInOut',
        }}
        style={{
          width: '100%',
          minHeight: '100vh',
          position: 'relative',
          // GPU acceleration
          willChange: 'opacity',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
