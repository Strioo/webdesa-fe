'use client'

import { useSmoothScrollLinks } from '@/hooks/useSmoothScroll'

/**
 * SmoothScrollProvider
 * Initializes smooth scrolling for all anchor links in the application
 * Based on CSS-Tricks smooth scrolling implementation
 */
export default function SmoothScrollProvider() {
  // Initialize smooth scroll for all anchor links with hash
  useSmoothScrollLinks(80) // 80px offset for fixed headers

  return null // This component doesn't render anything
}
