'use client'

import { motion } from 'framer-motion'
import { TourismLocation } from '@/lib/types'

interface MapEmbedProps {
  location: TourismLocation
  className?: string
}

export default function MapEmbed({ location, className = '' }: MapEmbedProps) {
  const { lat, lng, address } = location

  // Generate Google Maps embed URL with q parameter for red pin marker
  const mapEmbedUrl = `https://www.google.com/maps?q=${lat},${lng}&output=embed&z=15`
  
  // Generate Google Maps link for "Open in Maps" button
  const mapLinkUrl = `https://www.google.com/maps?q=${lat},${lng}`

  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-lg ring-1 ring-neutral-200 p-6 md:p-8 ${className}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
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
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
        Lokasi
      </h2>

      {/* Address */}
      {address && (
        <div className="mb-6 flex items-start gap-3 p-4 bg-neutral-50 rounded-xl">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-[#5B903A] flex-shrink-0 mt-0.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-neutral-600 mb-1">Alamat</p>
            <p className="text-neutral-900 leading-relaxed">{address}</p>
          </div>
        </div>
      )}

      {/* Map Embed */}
      <motion.div
        className="relative w-full aspect-video rounded-xl overflow-hidden ring-1 ring-neutral-200"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <iframe
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`Peta lokasi ${address || 'destinasi wisata'}`}
          className="w-full h-full"
        />
      </motion.div>

      {/* Open in Maps Button */}
      <div className="mt-4 flex items-center justify-between gap-4">
        <span className="text-xs text-neutral-500">
          Koordinat: {lat.toFixed(6)}, {lng.toFixed(6)}
        </span>
        <motion.a
          href={mapLinkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#5B903A] text-white text-sm font-medium rounded-full hover:bg-[#4a7a2f] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] focus-visible:ring-offset-2"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Buka di Maps</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
            />
          </svg>
        </motion.a>
      </div>
    </motion.div>
  )
}
