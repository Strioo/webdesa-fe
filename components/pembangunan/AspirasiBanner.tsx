'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function AspirasiBanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-screen-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative overflow-hidden rounded-2xl sm:rounded-3xl 
                     bg-gradient-to-br from-[#5B903A] via-[#4e7a32] to-[#3d5f26]
                     p-8 sm:p-12 lg:p-16 text-center shadow-2xl"
        >
          {/* Enhanced Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />

          {/* Pattern Background - More patterns */}
          <div className="absolute inset-0 opacity-10">
            {/* Grid Pattern */}
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
              backgroundSize: '50px 50px'
            }} />
            
            {/* Geometric Shapes */}
            <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-lg rotate-12" />
            <div className="absolute bottom-20 right-20 w-16 h-16 border-2 border-white rounded-full" />
            <div className="absolute top-1/2 left-1/4 w-12 h-12 border-2 border-white rounded-lg -rotate-12" />
            <div className="absolute top-1/4 right-1/4 w-14 h-14 border-2 border-white rounded-full rotate-45" />
            <div className="absolute bottom-1/4 left-1/3 w-10 h-10 border-2 border-white rounded-lg rotate-6" />
            
            {/* Dots Pattern */}
            <div className="absolute top-16 right-16 w-2 h-2 bg-white rounded-full" />
            <div className="absolute top-24 right-32 w-2 h-2 bg-white rounded-full" />
            <div className="absolute top-32 right-24 w-2 h-2 bg-white rounded-full" />
            <div className="absolute bottom-16 left-16 w-2 h-2 bg-white rounded-full" />
            <div className="absolute bottom-24 left-32 w-2 h-2 bg-white rounded-full" />
            <div className="absolute bottom-32 left-24 w-2 h-2 bg-white rounded-full" />
            
            {/* Lines */}
            <div className="absolute top-1/3 left-10 w-24 h-px bg-white rotate-45" />
            <div className="absolute bottom-1/3 right-10 w-32 h-px bg-white -rotate-45" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-3xl mx-auto">
            {/* Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: isInView ? 1 : 0 }}
              transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 
                         bg-white/20 backdrop-blur-sm rounded-full mb-6"
            >
              <svg 
                className="w-8 h-8 sm:w-10 sm:h-10 text-white" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 
                         leading-tight"
            >
              Layanan Aspirasi dan<br />Laporan Masyarakat
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/90 text-base sm:text-lg lg:text-xl leading-relaxed 
                         mb-8 sm:mb-10 max-w-2xl mx-auto"
            >
              Kami menyediakan sarana bagi warga untuk menyampaikan kritik, saran, dan 
              laporan terkait pembangunan di lingkungan kita.
            </motion.p>

            {/* CTA Button - Style dari HeroPembangunan */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 12 }}
              transition={{
                delay: 0.5,
                duration: 0.35,
                ease: [0.16, 1, 0.3, 1]
              }}
            >
              <Link href="/lapor">
                <motion.button
                  className="inline-flex items-center justify-center w-max bg-white text-black font-medium pl-5 pr-2 py-2 rounded-full gap-3 cursor-pointer relative will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  aria-label="Laporkan Sekarang"
                  whileHover={{
                    scale: 1.03,
                    boxShadow: '0 12px 28px -8px rgba(0, 0, 0, 0.35)',
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 25,
                    duration: 0.15
                  }}
                >
                  <span className="text-sm sm:text-base font-medium">
                    Laporkan Sekarang
                  </span>
                  <motion.div
                    className="flex items-center justify-center bg-[#5B903A] rounded-full w-12 h-12"
                    whileHover={{
                      rotate: 45,
                      scale: 1.08,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 20
                    }}
                  >
                    <Image
                      src="/assets/icons/arrow.svg"
                      alt="Arrow"
                      width={12}
                      height={12}
                      className="invert"
                    />
                  </motion.div>
                </motion.button>
              </Link>
            </motion.div>

            {/* Additional Info */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-white/70 text-sm sm:text-base mt-6"
            >
              Laporan Anda akan ditindaklanjuti dalam 3x24 jam
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
