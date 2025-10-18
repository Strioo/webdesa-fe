'use client'

import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

interface UseInViewStaggerOptions {
  staggerChildren?: number
  delayChildren?: number
  once?: boolean
  amount?: number | 'some' | 'all'
  margin?: string
}

export const useInViewStagger = (options: UseInViewStaggerOptions = {}) => {
  const {
    staggerChildren = 0.1,
    delayChildren = 0,
    once = true,
    amount = 0.3,
    margin = '0px 0px -100px 0px',
  } = options

  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, amount })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren,
        delayChildren,
      },
    },
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as any,
      },
    },
  }

  return {
    ref,
    isInView,
    containerVariants,
    itemVariants,
    animate: isInView ? 'visible' : 'hidden',
  }
}
