'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

function VisiCard() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-2xl shadow-lg p-8 md:p-10 lg:p-12 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-xl mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8 text-green-600"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
        </svg>
      </div>
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
        VISI
      </h3>
      <p className="text-base md:text-lg text-gray-700 leading-relaxed">
        Terwujudnya Desa Baturaden yang maju, mandiri, dan sejahtera berbasis pada pembangunan berkelanjutan, pemberdayaan masyarakat, dan pelestarian nilai-nilai budaya lokal.
      </p>
    </motion.div>
  )
}

function MisiCard() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const misiItems = [
    'Meningkatkan kualitas pelayanan publik melalui digitalisasi dan transparansi',
    'Mengembangkan ekonomi lokal dengan memberdayakan UMKM dan sektor pertanian',
    'Membangun infrastruktur yang merata dan berkelanjutan',
    'Meningkatkan kualitas pendidikan dan kesehatan masyarakat',
    'Melestarikan budaya dan kearifan lokal sebagai identitas desa',
  ]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-2xl shadow-lg p-8 md:p-10 lg:p-12 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-6">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-8 h-8 text-blue-600"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </div>
      <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        MISI
      </h3>
      <ol className="space-y-4">
        {misiItems.map((item, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
            className="flex gap-4 items-start"
          >
            <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
              {index + 1}
            </span>
            <span className="text-base md:text-lg text-gray-700 leading-relaxed pt-0.5">
              {item}
            </span>
          </motion.li>
        ))}
      </ol>
    </motion.div>
  )
}

export default function VisiMisiSection() {
  return (
    <section className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Visi & Misi
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Arah dan tujuan pembangunan Desa Baturaden
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
          <VisiCard />
          <MisiCard />
        </div>
      </div>
    </section>
  )
}
