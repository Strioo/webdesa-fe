'use client'

import { motion } from 'framer-motion'
import DestinationCard, { type Destination } from './DestinationCard'
import { useMemo } from 'react'

interface DestinationsGridProps {
  searchParams?: {
    q?: string
    loc?: string
    max?: string
  }
}

// Sample data - sesuai dengan gambar desain
const DESTINATIONS: Destination[] = [
  {
    id: 'lokawisata',
    name: 'Lokawisata Baturaden',
    description: 'Destinasi utama di Baturaden dengan panorama alam pegunungan, air terjun, dan tempat rekreasi keluarga dengan fasilitas lengkap.',
    price: 25000,
    image: '/assets/images/bg-hero.png',
    location: 'Baturaden',
  },
  {
    id: 'bukit-bintang',
    name: 'Bukit Bintang Baturaden',
    description: 'Nikmati keindahan langit malam dan ketenangan dengan pemandangan lampu kota Purwokerto. Cocok untuk bersenang-senang.',
    price: 15000,
    image: '/assets/images/bg-hero.png',
    location: 'Baturaden',
  },
  {
    id: 'adventure-forest',
    name: 'Baturaden Adventure Forest',
    description: 'Tempat ideal untuk pecinta alam dan tantangan. Nikmati aktivitas seperti trekking, flying fox, dan edukasi konservasi lingkungan.',
    price: 30000,
    image: '/assets/images/bg-hero.png',
    location: 'Baturaden',
  },
  {
    id: 'gurau',
    name: 'Gurau Baturaden',
    description: 'Spot wisata dengan suasana pedesaan, area camping, dan pemandangan sawah yang menenangkan - cocok untuk healing dan foto estetik.',
    price: 10000,
    image: '/assets/images/bg-hero.png',
    location: 'Baturaden',
  },
  {
    id: 'bhumi-bambu',
    name: 'Bhumi Bambu Baturaden',
    description: 'Wisata dengan konsep bambu alami dan arsitektur unik. Dilengkapi spot foto, taman bambu, serta kuliner khas pegunungan.',
    price: 20000,
    image: '/assets/images/bg-hero.png',
    location: 'Baturaden',
  },
  {
    id: 'taman-botani',
    name: 'Taman Botani Baturaden',
    description: 'Surga bagi pecinta tanaman dan fotografi. Ratusan koleksi flora tropis dan bunga warna-warni menciptakan suasana taman yang sejuk dan indah.',
    price: 20000,
    image: '/assets/images/bg-hero.png',
    location: 'Baturaden',
  },
]

export default function DestinationsGrid({ searchParams }: DestinationsGridProps) {
  // Filter destinations based on search params
  const filteredDestinations = useMemo(() => {
    let filtered = [...DESTINATIONS]

    // Filter by query (nama wisata)
    if (searchParams?.q) {
      const query = searchParams.q.toLowerCase()
      filtered = filtered.filter(dest =>
        dest.id === searchParams.q ||
        dest.name.toLowerCase().includes(query)
      )
    }

    // Filter by location
    if (searchParams?.loc) {
      const location = searchParams.loc.toLowerCase()
      filtered = filtered.filter(dest =>
        dest.location?.toLowerCase().includes(location) ||
        dest.name.toLowerCase().includes(location) ||
        dest.description.toLowerCase().includes(location)
      )
    }

    // Filter by max price
    if (searchParams?.max) {
      const maxPrice = parseInt(searchParams.max)
      if (!isNaN(maxPrice)) {
        filtered = filtered.filter(dest => dest.price <= maxPrice)
      }
    }

    return filtered
  }, [searchParams])

  const hasFilters = searchParams?.q || searchParams?.loc || searchParams?.max
  const hasResults = filteredDestinations.length > 0

  return (
    <section className="pb-16 md:pb-20 lg:pb-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Filter Info */}
        {hasFilters && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center justify-center gap-2 text-sm text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
            </svg>
            <span>
              Menampilkan {filteredDestinations.length} dari {DESTINATIONS.length} destinasi
            </span>
          </motion.div>
        )}

        {/* Grid */}
        {hasResults ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            {filteredDestinations.map((destination, index) => (
              <DestinationCard
                key={destination.id}
                destination={destination}
                index={index}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-200 rounded-full mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10 text-gray-400"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Tidak ada destinasi ditemukan
            </h3>
            <p className="text-gray-600 mb-6">
              Coba ubah filter pencarian atau hapus beberapa kriteria
            </p>
            <a
              href="/wisata"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
              Reset Filter
            </a>
          </motion.div>
        )}
      </div>
    </section>
  )
}
