'use client'

import { motion } from 'framer-motion'
import { TourismFacility } from '@/lib/types'
import { getFacilityIcon } from '@/lib/facilityIcons'

interface FacilitiesListProps {
  facilities: TourismFacility[]
  className?: string
}

export default function FacilitiesList({
  facilities,
  className = '',
}: FacilitiesListProps) {
  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-lg ring-1 ring-neutral-200 p-6 md:p-8 ${className}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-[#5B903A]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Fasilitas
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {facilities.map((facility, index) => {
          const Icon = getFacilityIcon(facility.icon)
          
          return (
            <motion.div
              key={facility.key}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors group cursor-default"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ y: -2 }}
              transition={{
                duration: 0.25,
                delay: 0.3 + index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ willChange: 'transform' }}
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                <Icon className="w-5 h-5 text-[#5B903A]" />
              </div>
              <div className="flex-1">
                <p className="text-neutral-700 leading-relaxed">{facility.label}</p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
