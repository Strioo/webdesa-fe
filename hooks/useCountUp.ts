import { useEffect, useRef, useState } from 'react'

interface UseCountUpProps {
  end: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  separator?: string
  enabled?: boolean
}

export const useCountUp = ({
  end,
  duration = 2000,
  decimals = 0,
  prefix = '',
  suffix = '',
  separator = '',
  enabled = true
}: UseCountUpProps) => {
  const [count, setCount] = useState<string>('0')
  // ✅ Change to HTMLElement to support any element type
  const ref = useRef<HTMLElement>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    if (!enabled) return

    const startTime = Date.now()
    const startValue = 0

    const animate = () => {
      const currentTime = Date.now()
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentValue = startValue + (end - startValue) * easeOutQuart

      let formattedValue = currentValue.toFixed(decimals)
      
      if (separator) {
        const parts = formattedValue.split('.')
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator)
        formattedValue = parts.join(',')
      }

      setCount(`${prefix}${formattedValue}${suffix}`)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      }
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [end, duration, decimals, prefix, suffix, separator, enabled])

  return { count, ref }
}
