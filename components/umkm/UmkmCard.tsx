'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export interface UmkmProduct {
  id: string // This is the slug
  title: string
  description: string
  price: number
  image: string
  category?: string
}

interface UmkmCardProps {
  product: UmkmProduct
  index: number
}

export default function UmkmCard({ product, index }: UmkmCardProps) {
  const { id, title, description, price, image } = product

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.35, 
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1]
      }}
      className="group h-full"
    >
      <motion.div
        className="h-full bg-white rounded-2xl shadow-md overflow-hidden flex flex-col cursor-pointer will-change-transform"
        whileHover={{ 
          y: -2,
          boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.12)'
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col text-center sm:text-left items-center sm:items-start">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-6 line-clamp-3 leading-relaxed flex-1">
            {description}
          </p>

          {/* CTA Button - Using slug in URL */}
          <Link href={`/umkm/${id}`} className="w-full block">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="w-full py-3 bg-[#5B903A] text-white font-semibold rounded-full hover:bg-[#4a7a2f] hover:shadow-md transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] focus-visible:ring-offset-2 min-h-[44px] cursor-pointer will-change-transform"
              suppressHydrationWarning
            >
              Detail UMKM
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}