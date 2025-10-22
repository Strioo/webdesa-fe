'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import DockNavbar from '@/components/DockNavbar'
import Image from 'next/image'

interface Fasilitas {
  nama: string
  icon: string
}

interface WisataData {
  id: string
  slug?: string
  nama: string
  deskripsi: string
  lokasi: string
  kategori?: string
  harga: number
  jamBuka?: string
  jamTutup?: string
  kontak?: string
  foto?: string
  gambar?: string[]
  fasilitas?: Fasilitas[]
  latitude?: number
  longitude?: number
}

interface WisataDetailClientProps {
  wisataData: WisataData
}

const getFacilityIcon = (iconName: string) => {
  const icons: Record<string, string> = {
    parking: 'M3 19h18a1 1 0 001-1v-8a1 1 0 00-1-1h-2V7a1 1 0 00-1-1H6a1 1 0 00-1 1v2H3a1 1 0 00-1 1v8a1 1 0 001 1zm13-9h2v7h-2v-7zm-4 0h2v7h-2v-7zM8 7h8v10H8V7z',
    restroom: 'M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V7H1v13h2v-6h4v6h2v-7h8v7h2V7h-2z',
    restaurant: 'M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z',
    cafe: 'M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4z',
    store: 'M20 4H4v2h16V4zm1 10v-2l-1-5H4l-1 5v2h1v6h10v-6h4v6h2v-6h1zm-9 4H6v-4h6v4z',
    guide: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z',
    picnic: 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 16H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1z',
    camera: 'M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z',
    pavilion: 'M12 2L2 7v2h20V7l-10-5zM4 11v10h16V11H4zm12 8h-8v-6h8v6z',
  }
  return icons[iconName] || icons.parking
}

export default function WisataDetailClient({ wisataData }: WisataDetailClientProps) {
  const router = useRouter()
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = wisataData.gambar && wisataData.gambar.length > 0 
    ? wisataData.gambar.map(img => 
        img.startsWith('http') ? img : `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${img}`
      )
    : [wisataData.foto 
        ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${wisataData.foto}`
        : '/assets/images/bg-hero.png'
      ]

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  const handleBuyTicket = () => {
    router.push(`/checkout?wisata=${wisataData.id}`)
  }

  const mapEmbedUrl = wisataData.latitude && wisataData.longitude
    ? `https://www.google.com/maps?q=${wisataData.latitude},${wisataData.longitude}&output=embed&z=15`
    : null

  const mapLinkUrl = wisataData.latitude && wisataData.longitude
    ? `https://www.google.com/maps?q=${wisataData.latitude},${wisataData.longitude}`
    : null

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-neutral-50 pt-20 pb-20 lg:pb-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <motion.nav
            className="mb-6"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ol className="flex items-center space-x-2 text-sm">
              <li>
                <a href="/wisata" className="text-gray-500 hover:text-gray-700">
                  Wisata
                </a>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-900 font-medium">{wisataData.nama}</li>
            </ol>
          </motion.nav>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Image & Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Gallery */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Main Image */}
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-neutral-100 mb-4">
                  <Image
                    src={images[currentImageIndex]}
                    alt={wisataData.nama}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
                    onError={(e) => {
                      e.currentTarget.src = '/assets/images/bg-hero.png'
                    }}
                  />
                  {images.length > 1 && (
                    <div className="absolute bottom-4 right-4 px-4 py-2 bg-black/60 backdrop-blur-md text-white text-sm font-medium rounded-full">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  )}
                </div>

                {/* Thumbnail Strip */}
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {images.map((img, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative aspect-[4/3] rounded-lg overflow-hidden bg-neutral-100 cursor-pointer transition-all ${
                          index === currentImageIndex
                            ? 'ring-2 ring-[#5B903A]'
                            : 'ring-1 ring-neutral-200 hover:ring-neutral-300'
                        }`}
                      >
                        <Image
                          src={img}
                          alt={`${wisataData.nama} ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="150px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Title & Category */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  {wisataData.kategori && (
                    <span className="px-4 py-1.5 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                      {wisataData.kategori}
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {wisataData.nama}
                </h1>
                <div className="flex items-center gap-2 text-gray-600">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{wisataData.lokasi}</span>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                className="bg-white rounded-2xl shadow-lg ring-1 ring-neutral-200 p-6 md:p-8"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.15 }}
              >
                <h2 className="text-2xl font-bold text-neutral-900 mb-4 flex items-center gap-2">
                  <svg className="w-6 h-6 text-[#5B903A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Deskripsi
                </h2>
                <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
                  {wisataData.deskripsi}
                </p>
              </motion.div>

              {/* Facilities */}
              {wisataData.fasilitas && wisataData.fasilitas.length > 0 && (
                <motion.div
                  className="bg-white rounded-2xl shadow-lg ring-1 ring-neutral-200 p-6 md:p-8"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                    <svg className="w-6 h-6 text-[#5B903A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Fasilitas
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {wisataData.fasilitas.map((facility, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors"
                      >
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
                          <svg className="w-5 h-5 text-[#5B903A]" fill="currentColor" viewBox="0 0 24 24">
                            <path d={getFacilityIcon(facility.icon)} />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-neutral-700 leading-relaxed">{facility.nama}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Operating Hours & Contact */}
              <motion.div
                className="bg-white rounded-2xl shadow-lg ring-1 ring-neutral-200 p-6 md:p-8"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.25 }}
              >
                <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-[#5B903A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Informasi
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {wisataData.jamBuka && wisataData.jamTutup && (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[#5B903A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Jam Operasional</p>
                        <p className="font-medium text-gray-900">
                          {wisataData.jamBuka} - {wisataData.jamTutup} WIB
                        </p>
                      </div>
                    </div>
                  )}

                  {wisataData.kontak && (
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[#5B903A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Kontak</p>
                        <p className="font-medium text-gray-900">{wisataData.kontak}</p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Google Maps */}
              {mapEmbedUrl && (
                <motion.div
                  className="bg-white rounded-2xl shadow-lg ring-1 ring-neutral-200 p-6 md:p-8"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 }}
                >
                  <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
                    <svg className="w-6 h-6 text-[#5B903A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Lokasi
                  </h2>

                  {wisataData.lokasi && (
                    <div className="mb-6 flex items-start gap-3 p-4 bg-neutral-50 rounded-xl">
                      <svg className="w-5 h-5 text-[#5B903A] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                      <div>
                        <p className="text-sm font-medium text-neutral-600 mb-1">Alamat</p>
                        <p className="text-neutral-900 leading-relaxed">{wisataData.lokasi}</p>
                      </div>
                    </div>
                  )}

                  <div className="relative w-full aspect-video rounded-xl overflow-hidden ring-1 ring-neutral-200">
                    <iframe
                      src={mapEmbedUrl}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Peta lokasi ${wisataData.nama}`}
                      className="w-full h-full"
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-4">
                    <span className="text-xs text-neutral-500">
                      Koordinat: {wisataData.latitude?.toFixed(6)}, {wisataData.longitude?.toFixed(6)}
                    </span>
                    {mapLinkUrl && (
                      <a
                        href={mapLinkUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#5B903A] text-white text-sm font-medium rounded-full hover:bg-[#4a7a2f] transition-colors"
                      >
                        <span>Buka di Maps</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Right Column - Ticket Booking */}
            <div className="lg:col-span-1">
              <motion.div
                id="ticket-pane"
                className="bg-white rounded-2xl shadow-lg ring-1 ring-neutral-200 p-6 sticky top-24"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                  Pesan Tiket
                </h2>

                {/* Price */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <p className="text-sm text-gray-500 mb-1">Harga per orang</p>
                  <p className="text-3xl font-bold text-green-600">
                    Rp {wisataData.harga.toLocaleString('id-ID')}
                  </p>
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Jumlah Tiket
                  </label>
                  <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4">
                    <button
                      onClick={() => handleQuantityChange(-1)}
                      disabled={quantity <= 1}
                      className="w-10 h-10 rounded-full bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                      </svg>
                    </button>
                    <span className="text-2xl font-bold">{quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(1)}
                      disabled={quantity >= 10}
                      className="w-10 h-10 rounded-full bg-white border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-700">Total</span>
                    <span className="text-2xl font-bold text-green-600">
                      Rp {(wisataData.harga * quantity).toLocaleString('id-ID')}
                    </span>
                  </div>
                </div>

                {/* Buy Button */}
                <button
                  onClick={handleBuyTicket}
                  className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Beli Tiket Sekarang</span>
                </button>

                {/* Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    Tiket akan dikirim via email setelah pembayaran berhasil
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <DockNavbar />
    </>
  )
}
