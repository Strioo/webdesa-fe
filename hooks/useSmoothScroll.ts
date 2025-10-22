/**
 * useSmoothScroll Hook
 * Custom React hook for smooth scrolling functionality
 * Based on CSS-Tricks smooth scrolling implementation
 */

import { useEffect, useCallback } from 'react'

interface UseSmoothScrollOptions {
  offset?: number
  duration?: number
  easing?: 'linear' | 'easeInOut' | 'easeIn' | 'easeOut'
}

const easingFunctions = {
  linear: (t: number) => t,
  easeInOut: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeIn: (t: number) => t * t,
  easeOut: (t: number) => t * (2 - t),
}

export const useSmoothScroll = (options: UseSmoothScrollOptions = {}) => {
  const { offset = 80, duration = 1000, easing = 'easeInOut' } = options

  const scrollTo = useCallback(
    (targetId: string) => {
      const target = document.getElementById(targetId)
      if (!target) {
        console.warn(`Element with id "${targetId}" not found`)
        return
      }

      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset
      const startPosition = window.pageYOffset
      const distance = targetPosition - startPosition
      let startTime: number | null = null

      const easingFunction = easingFunctions[easing]

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime
        const timeElapsed = currentTime - startTime
        const progress = Math.min(timeElapsed / duration, 1)
        const ease = easingFunction(progress)

        window.scrollTo(0, startPosition + distance * ease)

        if (timeElapsed < duration) {
          requestAnimationFrame(animation)
        } else {
          // Ensure we end exactly at target position
          window.scrollTo(0, targetPosition)
        }
      }

      requestAnimationFrame(animation)
    },
    [offset, duration, easing]
  )

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return { scrollTo, scrollToTop }
}

/**
 * Hook to initialize smooth scroll for all anchor links
 */
export const useSmoothScrollLinks = (offset: number = 80) => {
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const link = target.closest('a[href*="#"]') as HTMLAnchorElement

      if (!link || !link.hash) return

      // Check if the link is for the same page
      const currentPath = window.location.pathname
      const linkPath = link.pathname

      if (currentPath === linkPath && link.hash) {
        const targetElement = document.querySelector(link.hash)

        if (targetElement) {
          e.preventDefault()

          const targetPosition =
            targetElement.getBoundingClientRect().top + window.pageYOffset - offset

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth',
          })

          // Update URL hash
          if (history.pushState) {
            history.pushState(null, '', link.hash)
          }
        }
      }
    }

    document.addEventListener('click', handleClick)

    return () => {
      document.removeEventListener('click', handleClick)
    }
  }, [offset])
}

/**
 * Hook for scroll to element on mount
 */
export const useScrollToOnMount = (targetId: string, offset: number = 80, delay: number = 0) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const target = document.getElementById(targetId)
      if (target) {
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        })
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [targetId, offset, delay])
}
