'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

export default function ProfileHeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollTo } = useSmoothScroll({ offset: 80, duration: 1000, easing: 'easeInOut' })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const scrollToSejarah = () => {
    scrollTo('sejarah-section')
  }

  return (
    <section className="relative w-full h-screen flex items-center overflow-hidden -mt-[88px] pt-[88px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/herosection-profile.jpg"
          alt="Panorama Baturaden"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={90}
        />
        {/* Gradient Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <motion.div
          className="max-w-3xl mx-auto lg:mx-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Badge - Enhanced hover effect */}
          <motion.div
            className="mb-4 sm:mb-6 flex justify-center lg:justify-start"
            initial={{ opacity: 0, filter: 'blur(4px)' }}
            animate={{ opacity: isVisible ? 1 : 0, filter: isVisible ? 'blur(0px)' : 'blur(4px)' }}
            transition={{ 
              duration: 0.4, 
              delay: 0.2,
              ease: [0.16, 1, 0.3, 1]
            }}
          >
            <motion.span
              className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 rounded-full 
                         bg-white/10 backdrop-blur-sm border border-white/15 
                         text-white text-xs sm:text-sm font-medium shadow-lg 
                         cursor-default"
              whileHover={{
                scale: 1.05,
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              Pesona Alam Banyumas
            </motion.span>
          </motion.div>

          {/* Heading - Responsive typography */}
          <motion.h1
            className="font-bold text-white mb-4 sm:mb-6 leading-tight 
                       text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[68px]
                       text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Mengenal Lebih Dekat
            <br />
            <span className="bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
              Baturaden
            </span>
          </motion.h1>

          {/* Description - Responsive text */}
          <motion.p
            className="text-white/90 leading-relaxed max-w-2xl mx-auto lg:mx-0
                       text-sm sm:text-base md:text-lg lg:text-xl
                       text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Jelajahi sejarah, visi-misi, dan potensi unggulan Desa Baturaden yang menjadi kebanggaan
            masyarakat Banyumas.
          </motion.p>
        </motion.div>
      </div>

      {/* Scroll Indicator - Enhanced animation */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 
                   flex flex-col items-center gap-2 sm:gap-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        {/* Instruction Text */}
        <motion.p
          className="text-xs sm:text-sm text-white/70 font-medium tracking-wide uppercase"
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          Scroll Ke Bawah
        </motion.p>

        {/* Scroll Button */}
        <motion.button
          onClick={scrollToSejarah}
          className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full 
                     bg-white/10 backdrop-blur-md border border-white/20 
                     flex items-center justify-center
                     transition-all duration-300 cursor-pointer 
                     shadow-lg hover:shadow-2xl
                     focus-visible:outline-none focus-visible:ring-2 
                     focus-visible:ring-white focus-visible:ring-offset-2 
                     focus-visible:ring-offset-transparent
                     group overflow-hidden"
          whileHover={{
            scale: 1.1,
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            y: 3,
          }}
          whileTap={{ scale: 0.95 }}
          aria-label="Scroll ke section sejarah"
        >
          {/* Animated Chevrons */}
          <motion.div
            className="relative w-6 h-6"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg
              className="w-6 h-6 text-white absolute top-0 left-0 opacity-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
            <svg
              className="w-6 h-6 text-white absolute top-2 left-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  )
}
