'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

/**
 * SearchGlassCard - Smart Search with AI Recommendation
 * - 3 fields: Location, Number of People, Max Price
 * - 2 search modes: Regular search & AI-powered recommendation
 */

interface SearchGlassCardProps {
  onAIRecommend?: (data: { location: string; numPeople: number; maxPrice: number }) => void
}

export default function SearchGlassCard({ onAIRecommend }: SearchGlassCardProps) {
  const router = useRouter()
  const [location, setLocation] = useState('')
  const [numPeople, setNumPeople] = useState('2')
  const [maxPrice, setMaxPrice] = useState('')

  const handleRegularSearch = (e: React.FormEvent) => {
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

  const handleAISearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    const numPeopleInt = parseInt(numPeople) || 1
    const maxPriceInt = maxPrice ? parseInt(maxPrice) : 0

    if (onAIRecommend) {
      onAIRecommend({
        location,
        numPeople: numPeopleInt,
        maxPrice: maxPriceInt
      })
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

        <form onSubmit={handleRegularSearch} className="space-y-4">
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

          {/* Number of People Field */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.25 }}
          >
            <label htmlFor="numPeople" className="block text-sm font-medium text-white/90 mb-2">
              Jumlah Pengunjung
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                </svg>
              </div>
              <input
                type="number"
                id="numPeople"
                value={numPeople}
                onChange={(e) => setNumPeople(e.target.value)}
                placeholder="Berapa orang?"
                min="1"
                max="50"
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

          {/* Action Buttons */}
          <motion.div
            className="grid grid-cols-2 gap-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.25 }}
          >
            {/* Regular Search Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="py-3.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-full hover:bg-white/15 hover:shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 min-h-[44px]"
            >
              Search
            </motion.button>

            {/* AI Recommendation Button */}
            <motion.button
              type="button"
              onClick={handleAISearch}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="py-3.5 bg-gradient-to-r from-[#5B903A] to-[#4a7a2f] text-white font-semibold rounded-full hover:shadow-lg hover:shadow-[#5B903A]/50 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 min-h-[44px] flex items-center justify-center gap-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
              </svg>
              AI Suggest
            </motion.button>
          </motion.div>
        </form>
      </div>
    </motion.div>
  )
}
