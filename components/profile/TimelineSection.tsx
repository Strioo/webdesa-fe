'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

interface TimelineItemProps {
  year: string
  title: string
  description: string
  imageSrc: string
  isLeft: boolean
  index: number
}

function TimelineItem({ year, title, description, imageSrc, isLeft, index }: TimelineItemProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12 items-center ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Image */}
      <div className="w-full md:w-1/2">
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
          <Image
            src={imageSrc}
            alt={`${title} - ${year}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>

      {/* Content */}
      <div className={`w-full md:w-1/2 ${isLeft ? 'md:text-left' : 'md:text-right'}`}>
        <div className="inline-block px-4 py-2 bg-green-600 text-white font-semibold rounded-full mb-4">
          {year}
        </div>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
          {title}
        </h3>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>

      {/* Connector Dot (hidden on mobile) */}
      <div className="hidden md:block absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-green-600 rounded-full border-4 border-white shadow-md z-10" />
    </motion.div>
  )
}

export default function TimelineSection() {
  const timelineData = [
    {
      year: '1990 - 2000',
      title: 'Era Pembentukan',
      description: 'Masa pembentukan struktur desa yang lebih modern dengan fokus pada pengembangan infrastruktur dasar seperti jalan, air bersih, dan fasilitas umum.',
      imageSrc: '/assets/images/bg-hero.png',
    },
    {
      year: '2000 - 2010',
      title: 'Pengembangan Ekonomi',
      description: 'Periode pengembangan sektor ekonomi lokal dengan mendorong UMKM dan pertanian berkelanjutan. Mulai ada peningkatan kesejahteraan masyarakat.',
      imageSrc: '/assets/images/bg-hero.png',
    },
    {
      year: '2010 - 2020',
      title: 'Transformasi Digital',
      description: 'Era digitalisasi administrasi desa dan pelayanan publik. Implementasi sistem online untuk meningkatkan transparansi dan efisiensi.',
      imageSrc: '/assets/images/bg-hero.png',
    },
    {
      year: '2020 - Sekarang',
      title: 'Desa Mandiri & Berkelanjutan',
      description: 'Fokus pada pembangunan berkelanjutan dengan memanfaatkan teknologi dan memberdayakan masyarakat untuk mencapai desa mandiri.',
      imageSrc: '/assets/images/bg-hero.png',
    },
  ]

  return (
    <section className="py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16 lg:mb-20"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Sejarah Desa Baturaden
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Perjalanan panjang Desa Baturaden dari masa ke masa
          </p>
        </motion.div>

        {/* Timeline Container with Dashed Line */}
        <div className="relative">
          {/* Vertical Dashed Line (hidden on mobile) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 border-l-2 border-dashed border-gray-300 -translate-x-1/2" />

          {/* Timeline Items */}
          <div className="space-y-16 md:space-y-24 lg:space-y-32">
            {timelineData.map((item, index) => (
              <TimelineItem
                key={item.year}
                year={item.year}
                title={item.title}
                description={item.description}
                imageSrc={item.imageSrc}
                isLeft={index % 2 === 0}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
