'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import DockNavbar from '@/components/DockNavbar'
import { wisataApi, transactionApi, authApi } from '@/lib/api'
import { getMidtransClientKey, getMidtransSnapUrl } from '@/lib/midtrans'

interface WisataData {
  id: string
  nama: string
  deskripsi: string
  lokasi: string
  kategori?: string
  harga: number
  jamBuka?: string
  jamTutup?: string
  kontak?: string
  foto?: string
  rating?: number
}

interface UserData {
  id: string
  name: string
  email: string
  noTelp?: string
}

// Extend Window for Midtrans
declare global {
  interface Window {
    snap?: {
      pay: (
        token: string,
        options?: {
          onSuccess?: (result: any) => void
          onPending?: (result: any) => void
          onError?: (result: any) => void
          onClose?: () => void
        }
      ) => void
    }
  }
}

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const wisataId = searchParams.get('wisata')
  
  const [wisata, setWisata] = useState<WisataData | null>(null)
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [visitDate, setVisitDate] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSnapLoaded, setIsSnapLoaded] = useState(false)

  // ✅ FIXED: Load user data if logged in (OPTIONAL - no error if not logged in)
  useEffect(() => {
    const loadUser = async () => {
      try {
        // Check if token exists first
        const hasToken = document.cookie.split(';').some(cookie => 
          cookie.trim().startsWith('auth-token=')
        )
        
        if (!hasToken) {
          console.log('No auth token found - continuing as guest')
          return
        }

        const response = await authApi.getProfile()
        if (response.success && response.data) {
          const userData = response.data as UserData
          setUser(userData)
          // Pre-fill form with user data
          setCustomerName(userData.name)
          setCustomerEmail(userData.email)
          setCustomerPhone(userData.noTelp || '')
          console.log('User data loaded:', userData.name)
        }
      } catch (err: any) {
        // Silently fail - guest checkout is allowed
        console.log('Guest checkout mode:', err.message)
      }
    }

    loadUser()
  }, [])

  // Load wisata data
  useEffect(() => {
    if (!wisataId) {
      router.push('/wisata')
      return
    }

    const fetchWisata = async () => {
      try {
        setLoading(true)
        const response = await wisataApi.getById(wisataId)
        
        if (response.success && response.data) {
          setWisata(response.data as WisataData)
        } else {
          setError('Wisata tidak ditemukan')
        }
      } catch (err) {
        console.error('Error fetching wisata:', err)
        setError('Gagal memuat data wisata')
      } finally {
        setLoading(false)
      }
    }

    fetchWisata()
  }, [wisataId, router])

  // Set default visit date (tomorrow)
  useEffect(() => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const dateStr = tomorrow.toISOString().split('T')[0]
    setVisitDate(dateStr)
  }, [])

  // Load Midtrans Snap script
  useEffect(() => {
    const loadSnapScript = () => {
      if (window.snap) {
        setIsSnapLoaded(true)
        return
      }

      const script = document.createElement('script')
      script.src = getMidtransSnapUrl()
      script.setAttribute('data-client-key', getMidtransClientKey())
      
      script.onload = () => {
        setIsSnapLoaded(true)
        console.log('✅ Midtrans Snap loaded')
      }
      
      script.onerror = () => {
        setError('Gagal memuat payment gateway')
        console.error('❌ Failed to load Midtrans Snap')
      }

      document.body.appendChild(script)
    }

    loadSnapScript()
  }, [])

  const handleQuantityChange = (delta: number) => {
    const newQuantity = quantity + delta
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  const handleCheckout = async () => {
    if (!wisata || !customerName || !customerEmail || !customerPhone || !visitDate) {
      setError('Mohon lengkapi semua data')
      return
    }

    if (!isSnapLoaded || !window.snap) {
      setError('Payment gateway belum siap. Mohon tunggu sebentar.')
      return
    }

    // Validate phone number
    const phoneRegex = /^(08|62)\d{8,12}$/
    if (!phoneRegex.test(customerPhone.replace(/\s/g, ''))) {
      setError('Format nomor telepon tidak valid (contoh: 081234567890)')
      return
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerEmail)) {
      setError('Format email tidak valid')
      return
    }

    try {
      setIsProcessing(true)
      setError(null)

      console.log('🛒 Creating transaction...', {
        wisataId: wisata.id,
        jumlahTiket: quantity,
        tanggalKunjungan: visitDate,
        namaLengkap: customerName,
        email: customerEmail,
        noTelp: customerPhone,
        isGuest: !user
      })

      // ✅ Create transaction via backend API
      const response = await transactionApi.create({
        wisataId: wisata.id,
        jumlahTiket: quantity,
        tanggalKunjungan: visitDate,
        namaLengkap: customerName,
        email: customerEmail,
        noTelp: customerPhone
      })

      console.log('📦 Transaction response:', response)

      if (!response.success || !response.data) {
        throw new Error(response.message || 'Gagal membuat transaksi')
      }

      const { transaction, payment } = response.data as any

      if (!payment || !payment.token) {
        throw new Error('Token pembayaran tidak ditemukan')
      }

      console.log('💳 Opening Midtrans Snap with token:', payment.token)

      // Open Midtrans Snap
      window.snap!.pay(payment.token, {
        onSuccess: (result) => {
          console.log('✅ Payment success:', result)
          router.push(`/payment/success?order_id=${result.order_id}`)
        },
        onPending: (result) => {
          console.log('⏳ Payment pending:', result)
          router.push(`/payment/pending?order_id=${result.order_id}`)
        },
        onError: (result) => {
          console.error('❌ Payment error:', result)
          setError('Pembayaran gagal. Silakan coba lagi.')
          setIsProcessing(false)
        },
        onClose: () => {
          console.log('🚪 Payment popup closed')
          setIsProcessing(false)
        },
      })
    } catch (err: any) {
      console.error('❌ Checkout error:', err)
      setError(err.message || 'Terjadi kesalahan saat checkout')
      setIsProcessing(false)
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-neutral-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
          </div>
        </div>
      </main>
    )
  }

  if (error && !wisata) {
    return (
      <main className="min-h-screen bg-neutral-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Terjadi Kesalahan</h1>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => router.push('/wisata')}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Kembali ke Wisata
            </button>
          </div>
        </div>
      </main>
    )
  }

  const totalPrice = wisata ? wisata.harga * quantity : 0
  const imageUrl = wisata?.foto 
    ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${wisata.foto}`
    : '/assets/images/bg-hero.png'

  // Get minimum date (tomorrow)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const minDate = tomorrow.toISOString().split('T')[0]

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-neutral-50 pt-20 pb-20 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
              <li className="text-gray-900 font-medium">Checkout</li>
            </ol>
          </motion.nav>

          {/* User Status Banner */}
          {user ? (
            <motion.div
              className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="text-sm text-blue-900">
                  Login sebagai <strong>{user.name}</strong> - Riwayat transaksi Anda akan tersimpan
                </span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-start gap-2">
                <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div className="flex-1">
                  <p className="text-sm text-amber-900 mb-1">
                    <strong>Guest Checkout</strong> - Anda tidak login
                  </p>
                  <p className="text-xs text-amber-700">
                    E-ticket akan dikirim ke email & WhatsApp yang Anda masukkan. 
                    <a href="/login" className="underline font-medium ml-1">Login</a> untuk menyimpan riwayat transaksi.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Customer Information */}
              <motion.div
                className="bg-white rounded-2xl shadow-lg ring-1 ring-neutral-200 p-6 md:p-8"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold text-neutral-900 mb-2">
                  Informasi Pemesan
                </h2>
                <p className="text-sm text-gray-600 mb-6">
                  {user 
                    ? 'Data terisi otomatis dari akun Anda. Anda bisa mengubahnya jika perlu.'
                    : 'Isi data diri Anda untuk menerima tiket via email & WhatsApp'}
                </p>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="Masukkan nama lengkap"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="email@example.com"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      E-ticket akan dikirim ke email ini
                    </p>
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Nomor WhatsApp *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="081234567890"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Notifikasi tiket akan dikirim via WhatsApp
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Visit Details */}
              <motion.div
                className="bg-white rounded-2xl shadow-lg ring-1 ring-neutral-200 p-6 md:p-8"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                  Detail Kunjungan
                </h2>

                <div className="space-y-6">
                  {/* Visit Date */}
                  <div>
                    <label htmlFor="visitDate" className="block text-sm font-medium text-gray-700 mb-2">
                      Tanggal Kunjungan *
                    </label>
                    <input
                      type="date"
                      id="visitDate"
                      value={visitDate}
                      onChange={(e) => setVisitDate(e.target.value)}
                      min={minDate}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Pilih tanggal minimal H+1 dari hari ini
                    </p>
                  </div>

                  {/* Ticket Quantity */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Jumlah Tiket *
                    </label>
                    <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                      <span className="text-gray-700">Jumlah Pengunjung</span>
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(-1)}
                          disabled={quantity <= 1}
                          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => handleQuantityChange(1)}
                          disabled={quantity >= 10}
                          className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Maksimal 10 tiket per transaksi
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Summary */}
            <div className="lg:col-span-1">
              <motion.div
                className="bg-white rounded-2xl shadow-lg ring-1 ring-neutral-200 p-6 sticky top-24"
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold text-neutral-900 mb-6">
                  Ringkasan Pesanan
                </h2>

                {/* Wisata Card */}
                {wisata && (
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <div className="flex gap-4">
                      <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={imageUrl}
                          alt={wisata.nama}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/assets/images/bg-hero.png'
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1 line-clamp-2">{wisata.nama}</h3>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-1">
                          📍 {wisata.lokasi}
                        </p>
                        <p className="text-lg font-bold text-green-600">
                          Rp {wisata.harga.toLocaleString('id-ID')}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Price Details */}
                <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                  <div className="flex justify-between text-gray-700">
                    <span>Harga Tiket</span>
                    <span>Rp {wisata?.harga.toLocaleString('id-ID')}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Jumlah</span>
                    <span>x {quantity}</span>
                  </div>
                  {visitDate && (
                    <div className="flex justify-between text-gray-700">
                      <span>Tanggal Kunjungan</span>
                      <span className="text-sm">
                        {new Date(visitDate).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-bold text-gray-900">Total Pembayaran</span>
                  <span className="text-2xl font-bold text-green-600">
                    Rp {totalPrice.toLocaleString('id-ID')}
                  </span>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm text-red-600">{error}</p>
                    </div>
                  </div>
                )}

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isProcessing || !customerName || !customerEmail || !customerPhone || !visitDate}
                  className="w-full py-4 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Memproses...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                      <span>Bayar Sekarang</span>
                    </>
                  )}
                </button>

                {/* Info */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-start gap-2 mb-4">
                    <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-gray-900 mb-1">
                        E-Ticket Otomatis
                      </p>
                      <p className="text-xs text-gray-600">
                        Tiket dikirim ke email & WhatsApp setelah pembayaran berhasil
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-gray-500 text-center mb-3">
                    Metode Pembayaran:
                  </p>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <div className="px-3 py-1.5 bg-gray-100 rounded text-xs font-medium text-gray-600">
                      Virtual Account
                    </div>
                    <div className="px-3 py-1.5 bg-gray-100 rounded text-xs font-medium text-gray-600">
                      E-Wallet
                    </div>
                    <div className="px-3 py-1.5 bg-gray-100 rounded text-xs font-medium text-gray-600">
                      QRIS
                    </div>
                  </div>
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