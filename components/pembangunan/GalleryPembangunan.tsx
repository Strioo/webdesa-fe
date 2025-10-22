'use client'

import { motion, useInView, useMotionValue, useAnimationFrame } from 'framer-motion'
import { useRef, useState } from 'react'
import Image from 'next/image'
import { dummyProyekPembangunan } from '@/types/pembangunan'

// Use data from table - only take projects with photos
const galleryImages = dummyProyekPembangunan.map(proyek => ({
  id: proyek.id,
  src: proyek.foto,
  alt: proyek.nama,
  title: proyek.nama,
  kategori: proyek.kategori
}))

// Duplicate images for infinite loop effect
const infiniteImages = [...galleryImages, ...galleryImages, ...galleryImages]

export default function GalleryPembangunan() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isPaused, setIsPaused] = useState(false)
  
  const x = useMotionValue(0)
  const baseVelocity = -0.5 // Speed of scroll (negative = left to right)

  useAnimationFrame((t, delta) => {
    if (!isPaused) {
      let moveBy = baseVelocity * (delta / 16) // Normalize to 60fps
      x.set(x.get() + moveBy)
      
      // Reset position when scrolled enough (seamless loop)
      // Each image is ~80% of container width, assuming ~500px per image
      const resetPoint = -(galleryImages.length * 500)
      if (x.get() < resetPoint) {
        x.set(0)
      }
    }
  })

  return (
    <section ref={ref} className="py-12 sm:py-16 lg:py-20 bg-gray-50 overflow-hidden">
      {/* Header with padding */}
      <div className="px-4 sm:px-6 lg:px-8 mb-8 sm:mb-12">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : -20 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-center md:text-left">
                Potret<br />Perkembangan Desa
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: isInView ? 1 : 0, x: isInView ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center"
            >
              <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed text-center md:text-left">
                Setiap gambar menceritakan langkah kecil menuju desa yang lebih maju dan 
                sejahtera untuk masyarakat Baturaden.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Infinite Carousel - Full width container, 80% images */}
      <div className="relative w-full">
        <motion.div
          className="flex gap-4 sm:gap-6"
          style={{ x }}
          onHoverStart={() => setIsPaused(true)}
          onHoverEnd={() => setIsPaused(false)}
        >
          {infiniteImages.map((image, index) => (
            <motion.div
              key={`${image.id}-${index}`}
              className="flex-shrink-0 group"
              style={{ width: '85vw', maxWidth: '700px' }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-all duration-500 
                           group-hover:scale-105 group-hover:brightness-95"
                  sizes="80vw"
                  priority={index < 3}
                />
                
                {/* Gradient Overlay - Darker on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent 
                               opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Title Overlay with Kategori Badge */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 
                               transform translate-y-full group-hover:translate-y-0 
                               transition-transform duration-300">
                  <span className="inline-block px-3 py-1 bg-[#5B903A] text-white text-xs font-semibold rounded-full mb-2">
                    {image.kategori}
                  </span>
                  <h3 className="text-white font-bold text-xl sm:text-2xl line-clamp-2">
                    {image.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
