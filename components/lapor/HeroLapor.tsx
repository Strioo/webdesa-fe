'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

interface HeroLaporProps {
  onOpenModal: () => void
}

export default function HeroLapor({ onOpenModal }: HeroLaporProps) {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollTo } = useSmoothScroll({ offset: 80, duration: 1000, easing: 'easeInOut' })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative w-full min-h-screen h-screen flex items-center overflow-hidden -mt-[88px] pt-[88px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/herosection-lapor.png"
          alt="Laporan Desa Baturaden"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          className="max-w-3xl mx-auto md:mx-0 text-center md:text-left"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Badge Glassmorph - Konsisten dengan hero lain */}
          <motion.div
            className="mb-6 flex justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
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
              Pelayanan Publik Desa
            </motion.span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Sampaikan Laporan Anda untuk Kemajuan Desa
          </motion.h1>

          {/* Description */}
          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/90 leading-relaxed max-w-2xl mx-auto md:mx-0 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Fitur Lapor Desa memudahkan warga menyampaikan laporan atau masukan terkait pelayanan
            dan pembangunan desa. Semua laporan akan ditangani secara transparan dan tepat waktu
            untuk kemajuan bersama.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            className="flex justify-center md:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <motion.button
              onClick={() => scrollTo('info-section')}
              className="inline-flex items-center justify-center w-max bg-white text-black font-medium pl-5 pr-2 py-2 rounded-full gap-3 cursor-pointer relative will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
              aria-label="Pelajari Lebih Lanjut"
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
                Pelajari Lebih Lanjut
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
          </motion.div>
        </motion.div>
      </div>

      {/* Prefers Reduced Motion Support */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  )
}
