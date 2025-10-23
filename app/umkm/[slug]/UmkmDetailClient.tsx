'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import DockNavbar from '@/components/DockNavbar'
import Image from 'next/image'
import { 
  MapPin, 
  Clock, 
  Phone, 
  User, 
  ShoppingBag, 
  ArrowLeft,
  Package
} from 'lucide-react'

interface UmkmData {
  id: string
  nama: string
  deskripsi: string
  pemilik: string
  alamat: string
  kontak: string
  harga: number
  kategori: string
  foto: string
  gambar?: string[]
  jamBuka?: string
  jamTutup?: string
  produk?: string[]
}

interface UmkmDetailClientProps {
  umkmData: UmkmData
}

export default function UmkmDetailClient({ umkmData }: UmkmDetailClientProps) {
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = umkmData.gambar && umkmData.gambar.length > 0
    ? umkmData.gambar
    : [umkmData.foto]

  const handleWhatsAppContact = () => {
    const message = `Halo, saya tertarik dengan produk ${umkmData.nama}. Bisa info lebih lanjut?`
    const phoneNumber = umkmData.kontak.replace(/[^0-9]/g, '')
    const whatsappUrl = `https://wa.me/62${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <>
      <Navbar />
      <DockNavbar />

      <main className="min-h-screen bg-neutral-50 pt-20 pb-20 lg:pb-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button & Breadcrumb */}
          <motion.div
            className="mb-6 flex items-center gap-4"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Kembali</span>
            </button>
            
            <nav className="ml-auto">
              <ol className="flex items-center space-x-2 text-sm">
                <li>
                  <a href="/umkm" className="text-gray-500 hover:text-gray-700">
                    UMKM
                  </a>
                </li>
                <li className="text-gray-400">/</li>
                <li className="text-gray-900 font-medium">{umkmData.nama}</li>
              </ol>
            </nav>
          </motion.div>

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
                    alt={umkmData.nama}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    priority
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
                          alt={`${umkmData.nama} ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="200px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </motion.div>

              {/* Product Info */}
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-sm"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                      {umkmData.nama}
                    </h1>
                    <div className="inline-block px-3 py-1 bg-[#EFF4EB] text-[#5B903A] text-sm font-semibold rounded-full">
                      {umkmData.kategori}
                    </div>
                  </div>
                </div>

                <div className="prose prose-neutral max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {umkmData.deskripsi}
                  </p>
                </div>
              </motion.div>

              {/* Products List */}
              {umkmData.produk && umkmData.produk.length > 0 && (
                <motion.div
                  className="bg-white rounded-2xl p-6 shadow-sm"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Package className="w-5 h-5 text-[#5B903A]" />
                    <h2 className="text-xl font-bold text-gray-900">
                      Produk yang Tersedia
                    </h2>
                  </div>
                  <ul className="space-y-2">
                    {umkmData.produk.map((produk, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-3 text-gray-700 py-2 border-b border-gray-100 last:border-0"
                      >
                        <div className="w-2 h-2 bg-[#5B903A] rounded-full flex-shrink-0" />
                        <span>{produk}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Right Column - Contact Info */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-white rounded-2xl p-6 shadow-sm sticky top-24 space-y-6"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Informasi Kontak
                </h3>

                {/* Owner */}
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-[#5B903A] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Pemilik</div>
                    <div className="font-medium text-gray-900">{umkmData.pemilik}</div>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#5B903A] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Alamat</div>
                    <div className="font-medium text-gray-900">{umkmData.alamat}</div>
                  </div>
                </div>

                {/* Operating Hours */}
                {umkmData.jamBuka && umkmData.jamTutup && (
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#5B903A] flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Jam Operasional</div>
                      <div className="font-medium text-gray-900">
                        {umkmData.jamBuka} - {umkmData.jamTutup} WIB
                      </div>
                    </div>
                  </div>
                )}

                {/* Phone */}
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#5B903A] flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="text-sm text-gray-500 mb-1">Kontak</div>
                    <a
                      href={`tel:${umkmData.kontak}`}
                      className="font-medium text-gray-900 hover:text-[#5B903A] transition-colors"
                    >
                      {umkmData.kontak}
                    </a>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  {/* WhatsApp Button */}
                  <motion.button
                    onClick={handleWhatsAppContact}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Hubungi via WhatsApp
                  </motion.button>

                  {/* Phone Button */}
                  <motion.a
                    href={`tel:${umkmData.kontak}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3.5 mt-3 bg-white border-2 border-[#5B903A] text-[#5B903A] hover:bg-[#5B903A] hover:text-white font-semibold rounded-xl transition-colors duration-300 flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Phone className="w-5 h-5" />
                    Telepon Langsung
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
