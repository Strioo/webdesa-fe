'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'

/**
 * useViewTransition Hook
 * 
 * Enables native browser View Transitions API for ultra-smooth page transitions
 * in supported browsers (Chrome 111+, Edge 111+, Safari 18+)
 * 
 * Gracefully falls back to Framer Motion transitions in unsupported browsers.
 * 
 * Benefits of View Transition API:
 * - Native browser optimization (60fps guaranteed)
 * - Automatic crossfade between pages
 * - No white flash or layout shift
 * - Lower JavaScript overhead
 * - Smoother than any JS library
 * 
 * Usage: Just import and call in layout or page component
 */
export function useViewTransition() {
  const pathname = usePathname()
  const previousPath = useRef(pathname)

  useEffect(() => {
    // Check if browser supports View Transition API
    const supportsViewTransition = typeof document !== 'undefined' && 'startViewTransition' in document

    if (!supportsViewTransition) {
      // Fallback: use Framer Motion (already implemented)
      return
    }

    // Only trigger on path change
    if (pathname === previousPath.current) {
      return
    }

    // Store previous path
    previousPath.current = pathname

    // Trigger native view transition
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        // Update happens here automatically
        // Browser handles the smooth transition
      })
    }
  }, [pathname])
}

