'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { MenuItem } from '@/types/umkm-detail'

interface MenuCardProps {
  menu: MenuItem
}

export default function MenuCard({ menu }: MenuCardProps) {
  const { name, price, image } = menu

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group h-full"
    >
      <div className="h-full rounded-xl overflow-hidden flex flex-col ring-1 ring-neutral-200 hover:ring-neutral-300 hover:shadow-sm bg-white transition-all duration-200">
        {/* Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            unoptimized
          />
        </div>

        {/* Content */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col items-center sm:items-start text-center sm:text-left">
          {/* Name */}
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {name}
          </h3>

          {/* Price */}
          <p className="text-lg sm:text-xl font-bold text-gray-900">
            Rp{price.toLocaleString('id-ID')}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
