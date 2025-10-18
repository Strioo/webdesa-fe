'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

/**
 * SearchGlassCard - Simplified Version
 * - Only 2 fields: Location and Max Price
 * - Removed "Nama Wisata" dropdown completely
 * - Slide-in animation from right (24px) with spring
 * - Transform-only animations, no layout shift
 */

export default function SearchGlassCard() {
  const router = useRouter()
  const [location, setLocation] = useState('')
  const [maxPrice, setMaxPrice] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    const params = new URLSearchParams()
    if (location) params.set('loc', location)
    if (maxPrice) params.set('max', maxPrice)

    if (params.toString()) {
      router.push(`/wisata?${params.toString()}#destinations`)
    } else {
      document.getElementById('destinations')?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.div 
      className="w-full lg:w-[380px] xl:w-[420px]"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 20,
        mass: 0.8
      }}
    >
      <div className="rounded-2xl backdrop-blur-md bg-neutral-900/45 ring-1 ring-white/15 shadow-md p-6 lg:p-8">
        <div className="mb-6">
          <motion.h3 
            className="text-xl lg:text-2xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            Temukan Destinasi
            <br />
            Wisata Sesuai Gayamu
          </motion.h3>
        </div>

        <form onSubmit={handleSearch} className="space-y-4">
          {/* Location Field */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.25 }}
          >
            <label htmlFor="location" className="block text-sm font-medium text-white/90 mb-2">
              Location
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 text-white/70">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                </svg>
              </div>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Cari area atau spot wisata..."
                className="w-full pl-10 pr-4 py-3 rounded-full backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/15 transition-all min-h-[44px]" 
              />
            </div>
          </motion.div>

          {/* Max Price Field */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.25 }}
          >
            <label htmlFor="maxPrice" className="block text-sm font-medium text-white/90 mb-2">
              Harga Tiket Maksimal
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 text-white/70">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
                </svg>
              </div>
              <input
                type="number"
                id="maxPrice"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder="590.000 max"
                min="0"
                step="1000"
                className="w-full pl-10 pr-4 py-3 rounded-full backdrop-blur-sm bg-white/10 border border-white/20 text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-white focus:bg-white/15 transition-all min-h-[44px]" 
              />
            </div>
          </motion.div>

          {/* Search Button */}
          <motion.button
            type="submit"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.25 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3.5 bg-[#5B903A] text-white font-semibold rounded-full hover:bg-[#4a7a2f] hover:shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 min-h-[44px]"
          >
            Search
          </motion.button>
        </form>
      </div>
    </motion.div>
  )
}
