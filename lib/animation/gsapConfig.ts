import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// GSAP default settings
export const gsapConfig = {
  defaults: {
    ease: 'power2.out',
    duration: 0.8,
  },
  scrollTrigger: {
    defaults: {
      markers: false, // Set to true for debugging
      toggleActions: 'play none none reverse',
      start: 'top 80%',
      end: 'bottom 20%',
    },
  },
}

// Apply defaults
gsap.defaults(gsapConfig.defaults)

// Animation presets
export const animations = {
  fadeIn: {
    from: { opacity: 0, y: 24 },
    to: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    from: { opacity: 0, x: -24 },
    to: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    from: { opacity: 0, x: 24 },
    to: { opacity: 1, x: 0 },
  },
  scaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
  },
}

// Check for reduced motion preference
export const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Utility to create stagger animations
export const staggerAnimation = (
  targets: gsap.TweenTarget,
  options: gsap.TweenVars = {}
) => {
  return gsap.from(targets, {
    opacity: 0,
    y: 16,
    stagger: 0.1,
    duration: 0.6,
    ease: 'power2.out',
    ...options,
  })
}

export { gsap, ScrollTrigger }
