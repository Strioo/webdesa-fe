'use client'

import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function ProfileOfficialsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Image Container - Separate from text */}
        <motion.div
          className="relative rounded-2xl overflow-hidden bg-gray-100 
                     h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] mb-8
                     shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image
            src="/assets/images/bg-pejabat.jpg"
            alt="Pejabat Desa Baturaden"
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 1200px, 100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </motion.div>

        {/* Content Card - Separate for better responsive */}
        <motion.div
          className="bg-white rounded-2xl border border-gray-200 p-8 sm:p-10 lg:p-12
                     shadow-sm hover:shadow-md hover:border-gray-300 
                     transition-all duration-300"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6
                         bg-gray-50 border border-gray-200 rounded-full">
            <span className="text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Struktur Pemerintahan
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
            Pejabat Desa Baturaden
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg text-gray-600 leading-relaxed max-w-3xl mb-8">
            Para pejabat desa yang berkomitmen mengelola pelayanan publik dan memajukan kesejahteraan
            masyarakat Baturaden dengan dedikasi dan integritas tinggi.
          </p>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { label: 'Perangkat Desa', value: '12+' },
              { label: 'Tahun Pengalaman', value: '10+' },
              { label: 'Program Aktif', value: '25+' }
            ].map((stat) => (
              <motion.div
                key={stat.label}
                className="bg-gray-50 border border-gray-200 rounded-xl p-4 sm:p-6
                           hover:bg-gray-100 hover:border-gray-300 hover:shadow-sm
                           transition-all duration-300"
                whileHover={{ y: -2 }}
              >
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm sm:text-base text-gray-600 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
