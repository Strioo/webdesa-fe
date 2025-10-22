import { useEffect, useRef, useState } from 'react'

interface UseCountUpOptions {
  end: number
  start?: number
  duration?: number
  decimals?: number
  separator?: string
  prefix?: string
  suffix?: string
  enableScrollSpy?: boolean
  scrollSpyOnce?: boolean
}

export const useCountUp = ({
  end,
  start = 0,
  duration = 2000,
  decimals = 0,
  separator = ',',
  prefix = '',
  suffix = '',
  enableScrollSpy = true,
  scrollSpyOnce = true
}: UseCountUpOptions) => {
  const [count, setCount] = useState(start)
  const [hasAnimated, setHasAnimated] = useState(false)
  const elementRef = useRef<any>(null)

  useEffect(() => {
    if (!enableScrollSpy || (scrollSpyOnce && hasAnimated)) {
      return
    }

    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          animateCount()
          if (scrollSpyOnce) {
            setHasAnimated(true)
          }
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [hasAnimated, enableScrollSpy, scrollSpyOnce])

  const animateCount = () => {
    const startTime = Date.now()
    const endTime = startTime + duration

    const updateCount = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)

      // Easing function (easeOutExpo)
      const easeOutExpo = (t: number) => {
        return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
      }

      const currentCount = start + (end - start) * easeOutExpo(progress)
      setCount(currentCount)

      if (now < endTime) {
        requestAnimationFrame(updateCount)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(updateCount)
  }

  const formatNumber = (num: number): string => {
    const fixed = num.toFixed(decimals)
    const parts = fixed.split('.')
    
    // Add thousand separators
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
    
    const formatted = parts.join('.')
    return `${prefix}${formatted}${suffix}`
  }

  return {
    count: formatNumber(count),
    countValue: count,
    ref: elementRef,
    reset: () => {
      setCount(start)
      setHasAnimated(false)
    }
  }
}
