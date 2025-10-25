'use client'

import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import { useRef } from 'react'

export default function ProfileVisiMisiSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number]
      }
    }
  }

  return (
    <section ref={ref} className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1400px] mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 items-stretch">
          {/* Left Side - Visi & Misi Cards */}
          <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {/* Visi Card */}
            <motion.div
              className="group bg-white rounded-2xl p-6 sm:p-8 lg:p-10
                         border border-gray-200 hover:border-gray-300 hover:shadow-lg
                         transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                VISI
              </h2>
              <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed">
                Terwujudnya Pemerintahan Kecamatan Baturraden yang <strong className="text-gray-900">Profesional, Bersih, Adil dan
                Inovatif</strong> untuk mewujudkan masyarakat Baturraden yang <strong className="text-gray-900">Sejahtera, Mandiri, dan Berdaya
                saing</strong>.
              </p>
            </motion.div>

            {/* Misi Card */}
            <motion.div
              className="group bg-white rounded-2xl p-6 sm:p-8 lg:p-10
                         border border-gray-200 hover:border-gray-300 hover:shadow-lg
                         transition-all duration-300"
              variants={itemVariants}
              whileHover={{ y: -4 }}
            >

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
                MISI
              </h2>
              <ul className="space-y-4">
                {[
                  'Meningkatkan Kualitas Sumber Daya Manusia Pemerintahan Kecamatan Baturraden menuju Aparatur yang profesional, kreatif, Inovatif dan Beretos kerja yang tinggi',
                  'Meningkatkan Pelayanan Prima kepada Masyarakat secara Profesional, adil dan Transparan',
                  'Meningkatkan partisipasi di Desa dalam penyelenggaraan pemerintah, pembangunan dan Kemasyarakat',
                  'Meningkatkan upaya peningkatan pendapatan asli daerah dengan penggalian potensi lokal unggulan khususnya di sektor pariwisata yang didukung oleh sektor pertanian, perikanan dan peternakan'
                ].map((item, index) => (
                  <li
                    key={index}
                    className="flex gap-3 text-gray-600 text-base sm:text-lg leading-relaxed"
                  >
                    <span className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full 
                                   bg-gray-900 text-white font-semibold 
                                   flex items-center justify-center text-sm">
                      {index + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Right Side - Decorative Image Card */}
          <motion.div
            className="relative rounded-3xl overflow-hidden h-[500px] sm:h-[600px] lg:h-full min-h-[600px] shadow-xl
                       hover:shadow-2xl transition-shadow duration-300"
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 40, scale: 0.95 }}
            whileHover={{ y: -4 }}
          >
            <div className="w-full h-full relative">
              <Image
                src="/assets/images/desa-aerial.jpg"
                alt="Panorama Desa Baturaden"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={90}
              />
            </div>

            {/* Static Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Content Overlay */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <motion.h2
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-3 sm:mb-4"
              >
                Kenal Lebih Dekat
                <br />
                <span className="text-white">
                  Desa Baturraden
                </span>
              </motion.h2>
              <p className="text-white/90 text-base sm:text-lg lg:text-xl max-w-md leading-relaxed">
                Mewujudkan visi-misi dan potensi unggulan Desa Baturraden yang menjadi kebanggaan
                masyarakat Banyumas.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
