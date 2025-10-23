'use client'

import { motion } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { useInView } from 'framer-motion'
import UmkmCard, { UmkmProduct } from './UmkmCard'
import { umkmApi } from '@/lib/api'
import { ChevronLeft, ChevronRight } from 'lucide-react'

// Helper to format image URL
const getImageUrl = (foto: string | null): string => {
  if (!foto) return '/assets/images/placeholder.jpg'
  if (foto.startsWith('http')) return foto
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.18.3:5000'
  return `${baseUrl}${foto}`
}

// Helper to parse price
const parsePrice = (harga: any): number => {
  if (!harga) return 0
  if (typeof harga === 'number') return harga
  if (typeof harga === 'string') {
    const numericString = harga.replace(/[^\d,.-]/g, '')
    return parseFloat(numericString.replace(',', '')) || 0
  }
  return 0
}

const ITEMS_PER_PAGE = 9 // 3x3 grid

export default function UmkmSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [allUmkmProducts, setAllUmkmProducts] = useState<UmkmProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    const fetchUmkm = async () => {
      try {
        setIsLoading(true)
        const response = await umkmApi.getAll()
        
        if (response.success && response.data) {
          const transformedData: UmkmProduct[] = (response.data as any[])
            .filter((umkm: any) => umkm.isAktif)
            .map((umkm: any) => ({
              id: umkm.slug || umkm.id,
              title: umkm.nama,
              description: umkm.deskripsi,
              price: parsePrice(umkm.harga),
              image: getImageUrl(umkm.foto),
              category: umkm.kategori
            }))
          
          setAllUmkmProducts(transformedData)
        }
      } catch (error) {
        console.error('Error fetching UMKM:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUmkm()
  }, [])

  // Scroll to top when page changes
  useEffect(() => {
    if (ref.current) {
      (ref.current as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [currentPage])

  // Pagination calculations
  const totalPages = Math.ceil(allUmkmProducts.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const endIndex = startIndex + ITEMS_PER_PAGE
  const currentProducts = allUmkmProducts.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('...')
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <section ref={ref} className="w-full pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 bg-[#F8F8F8]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            UMKM Desa Baturaden
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Dukung produk lokal dan UMKM di desa kami
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl shadow-md overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : allUmkmProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">Belum ada data UMKM tersedia</p>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {currentProducts.map((product, index) => (
                <UmkmCard key={product.id} product={product} index={index} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8"
              >
                {/* Info */}
                <div className="text-sm text-gray-600">
                  Menampilkan {startIndex + 1}-{Math.min(endIndex, allUmkmProducts.length)} dari {allUmkmProducts.length} UMKM
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`p-2 rounded-lg transition-colors ${
                      currentPage === 1
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-[#5B903A] hover:text-white shadow-md'
                    }`}
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </motion.button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-2">
                    {getPageNumbers().map((page, index) => (
                      <div key={index}>
                        {page === '...' ? (
                          <span className="px-3 py-2 text-gray-400">...</span>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handlePageChange(page as number)}
                            className={`min-w-[40px] h-[40px] rounded-lg font-medium transition-colors ${
                              currentPage === page
                                ? 'bg-[#5B903A] text-white shadow-md'
                                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
                            }`}
                          >
                            {page}
                          </motion.button>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Next Button */}
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`p-2 rounded-lg transition-colors ${
                      currentPage === totalPages
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : 'bg-white text-gray-700 hover:bg-[#5B903A] hover:text-white shadow-md'
                    }`}
                  >
                    <ChevronRight className="w-5 h-5" />
                  </motion.button>
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  )
}