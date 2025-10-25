'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

export default function HeroPembangunan() {
  const { scrollTo } = useSmoothScroll({ offset: 80, duration: 1000, easing: 'easeInOut' })

  return (
    <section className="relative w-full min-h-[900px] md:h-[900px] overflow-hidden -mt-[88px] pt-[120px] sm:pt-[140px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/assets/images/herosection-pembangunan.png"
          alt="Pembangunan Desa Baturaden"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end h-full pb-10 sm:pb-16 lg:pb-20 gap-8 lg:gap-12">

            {/* Left Content */}
            <div className="flex-1 flex flex-col justify-end pt-32 sm:pt-40 lg:pt-0">

              {/* Badge Glassmorph - Blur-to-Sharp Animation */}
              <motion.div
                className="mb-6 flex justify-center sm:justify-start"
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{
                  delay: 0.2,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <motion.span
                  className="inline-block bg-white/10 backdrop-blur-sm border border-white/15 text-white px-4 py-2 sm:px-5 sm:py-3 rounded-full text-xs sm:text-sm font-medium shadow-lg cursor-default"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    transition: { duration: 0.2 }
                  }}
                >
                  Pembangunan Untuk Kemajuan Bersama
                </motion.span>
              </motion.div>

              {/* Heading - Fade + Y-up 12px */}
              <motion.h1
                className="max-w-lg text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white mb-4 sm:mb-6 leading-tight text-center sm:text-left mx-auto sm:mx-0"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.3,
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                Perkembangan dan Transparansi
                Pembangunan di Baturaden
              </motion.h1>

              {/* Subtitle - Fade + Y-up 12px */}
              <motion.p
                className="text-white text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl opacity-90 leading-relaxed text-center sm:text-left mx-auto sm:mx-0"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4,
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                Setiap langkah pembangunan dilakukan dengan prinsip transparansi dan partisipasi masyarakat demi tercapainya kesejahteraan bersama.
              </motion.p>

              {/* CTA Button - Transform-only (scale 1.03 hover, 0.98 tap) */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.5,
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="flex justify-center sm:justify-start"
              >
                <motion.button
                  onClick={() => scrollTo('statistik-section')}
                  className="inline-flex items-center justify-center w-max bg-white text-black font-medium pl-5 pr-2 py-2 rounded-full gap-3 cursor-pointer relative will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  aria-label="Lihat Proyek Pembangunan"
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
                    Lihat Proyek Pembangunan
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
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
