'use client'

import { motion } from 'framer-motion'
import { PropsWithChildren } from 'react'

/**
 * SmoothPageWrapper
 * 
 * Wraps page content with optimizations to prevent white flash and jarring transitions.
 * 
 * Features:
 * - Prevents white background flash during transitions
 * - Maintains background color during route changes
 * - Smooth opacity transitions
 * - GPU-accelerated transforms
 * 
 * Use this to wrap page content in page.tsx files for ultra-smooth experience.
 */
export default function SmoothPageWrapper({ 
  children,
  className = '',
}: PropsWithChildren<{ className?: string }>) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0.98 }}
      animate={{ opacity: 1 }}
      transition={{ 
        duration: 0.3,
        ease: 'easeOut',
      }}
      style={{
        // Prevent white flash
        backgroundColor: 'inherit',
        minHeight: '100vh',
        // GPU acceleration
        willChange: 'opacity, transform',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
        WebkitTransform: 'translateZ(0)',
      }}
    >
      {children}
    </motion.div>
  )
}
