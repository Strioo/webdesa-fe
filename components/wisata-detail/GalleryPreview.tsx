'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { TourismImage } from '@/lib/types'

interface GalleryPreviewProps {
  images: TourismImage[]
  onOpenModal: (index: number) => void
  className?: string
}

export default function GalleryPreview({
  images,
  onOpenModal,
  className = '',
}: GalleryPreviewProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  // Limit thumbnails to first 4
  const thumbnails = images.slice(0, 4)
  const hasMore = images.length > 4

  const handleThumbnailClick = (index: number) => {
    if (index < thumbnails.length - 1 || !hasMore) {
      setActiveIndex(index)
    } else {
      // If clicking last thumbnail and there are more images, open modal
      onOpenModal(0)
    }
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Image */}
      <motion.div
        className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-neutral-100 cursor-pointer group"
        onClick={() => onOpenModal(activeIndex)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onOpenModal(activeIndex)
          }
        }}
        tabIndex={0}
        role="button"
        aria-label="Buka galeri"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ scale: 1.005 }}
        style={{ willChange: 'transform' }}
      >
        <Image
          src={images[activeIndex]?.src || '/placeholder.jpg'}
          alt={images[activeIndex]?.alt || 'Gallery image'}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 60vw, 800px"
          priority
          unoptimized
        />

        {/* Zoom Icon Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
          <motion.div
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            initial={{ scale: 0.8 }}
            whileHover={{ scale: 1 }}
          >
            <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-neutral-900"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6"
                />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Image Counter Badge */}
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm font-medium">
          {activeIndex + 1} / {images.length}
        </div>
      </motion.div>

      {/* Thumbnail Strip */}
      <div className="grid grid-cols-4 gap-3">
        {thumbnails.map((image, index) => {
          const isLast = index === thumbnails.length - 1 && hasMore
          const isActive = index === activeIndex

          return (
            <motion.button
              key={index}
              className={`relative aspect-[4/3] rounded-lg overflow-hidden bg-neutral-100 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] focus-visible:ring-offset-2 ${
                isActive ? 'ring-2 ring-[#5B903A]' : 'ring-1 ring-neutral-200'
              }`}
              onClick={() => handleThumbnailClick(index)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ willChange: 'transform' }}
              aria-label={
                isLast
                  ? `Lihat semua ${images.length} gambar`
                  : `Lihat gambar ${index + 1}`
              }
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 25vw, 150px"
                unoptimized
              />

              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 bg-[#5B903A]/20"
                  layoutId="active-thumbnail"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}

              {/* "View All" Overlay for last thumbnail */}
              {isLast && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6 mb-1"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                    />
                  </svg>
                  <span className="text-xs font-medium">
                    +{images.length - 3} more
                  </span>
                </div>
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
