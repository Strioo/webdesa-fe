'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

export interface Destination {
  id: string
  name: string
  description: string
  price: number
  image: string
  location?: string
}

interface DestinationCardProps {
  destination: Destination
  index: number
}

export default function DestinationCard({ destination, index }: DestinationCardProps) {
  const { id, name, description, price, image } = destination

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.35, 
        delay: index * 0.08, // Stagger 80ms per card (60-90ms range)
        ease: [0.16, 1, 0.3, 1] // Smooth easing
      }}
      className="group h-full"
    >
      <motion.div
        className="h-full bg-white rounded-2xl shadow-md overflow-hidden flex flex-col cursor-pointer will-change-transform"
        whileHover={{ 
          y: -2, // Lift 2px on hover (transform-only, subtle affordance)
          boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.12)' // Subtle shadow
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
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col">
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
            {name}
          </h3> 

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed flex-1">
            {description}
          </p>

          {/* Price */}
          <div className="flex items-center gap-2 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 text-[#5B903A] flex-shrink-0"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
            </svg>
            <span className="text-lg font-bold text-gray-900">
              Rp{price.toLocaleString('id-ID')}
            </span>
            <span className="text-sm text-gray-500">/ orang</span>
          </div>

          {/* CTA Button - Rounded Full, Micro-bounce Scale 1.02 */}
          <Link href={`/wisata/${id}`} className="block">
            <motion.button
              whileHover={{ scale: 1.02 }} // Micro-bounce for tactile feel
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              className="w-full py-3 bg-[#5B903A] text-white font-semibold rounded-full hover:bg-[#4a7a2f] hover:shadow-md transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] focus-visible:ring-offset-2 min-h-[44px] cursor-pointer will-change-transform"
              suppressHydrationWarning
            >
              Beli Tiket Sekarang
            </motion.button>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}
