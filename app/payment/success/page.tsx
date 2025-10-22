'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import DockNavbar from '@/components/DockNavbar'
import { transactionApi } from '@/lib/api'

interface TransactionData {
  id: string
  orderId: string
  namaLengkap: string
  email: string
  noTelp: string
  jumlahTiket: number
  totalHarga: number
  tanggalKunjungan: string
  status: string
  wisata: {
    id: string
    nama: string
    lokasi: string
    foto?: string
  }
  createdAt: string
}

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  
  const [transaction, setTransaction] = useState<TransactionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [countdown, setCountdown] = useState(10)
  const [error, setError] = useState<string | null>(null)

  // Fetch transaction data
  useEffect(() => {
    if (!orderId) {
      router.push('/wisata')
      return
    }

    const fetchTransaction = async () => {
      try {
        setLoading(true)
        
        // ✅ Fetch from backend using orderId
        const response = await transactionApi.getByOrderId(orderId)
        
        if (response.success && response.data) {
          const transactionData = response.data as TransactionData
          
          // ✅ Verify payment status
          if (transactionData.status !== 'PAID') {
            setError('Pembayaran belum selesai')
          } else {
            setTransaction(transactionData)
          }
        } else {
          setError('Transaksi tidak ditemukan')
        }
        
        setLoading(false)
      } catch (err: any) {
        console.error('Error fetching transaction:', err)
        setError(err.message || 'Gagal memuat data transaksi')
        setLoading(false)
      }
    }

    fetchTransaction()
  }, [orderId, router])

  // Countdown redirect
  useEffect(() => {
    if (countdown > 0 && !loading && transaction) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0 && transaction) {
      // ✅ FIXED: Use actual transaction.id instead of mock '1'
      router.push(`/ticket/${transaction.id}`)
    }
  }, [countdown, router, loading, transaction])

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-neutral-50 pt-20 pb-20 lg:pb-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          </div>
        </main>
        <DockNavbar />
      </>
    )
  }

  if (error) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-neutral-50 pt-20 pb-20 lg:pb-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
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
        <DockNavbar />
      </>
    )
  }

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 pt-20 pb-20 lg:pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Success Header */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-center">
              <motion.div
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              >
                <motion.svg
                  className="w-12 h-12 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </motion.svg>
              </motion.div>
              
              <motion.h1
                className="text-3xl font-bold text-white mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Pembayaran Berhasil! 🎉
              </motion.h1>
              
              <motion.p
                className="text-green-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Transaksi Anda telah dikonfirmasi
              </motion.p>
            </div>

            {/* Transaction Details */}
            <div className="p-8">
              {transaction && (
                <>
                  {/* Order ID */}
                  <div className="mb-8 pb-6 border-b border-gray-200">
                    <div className="text-center">
                      <p className="text-sm text-gray-600 mb-2">Order ID</p>
                      <p className="text-2xl font-bold text-gray-900 font-mono">
                        {transaction.orderId}
                      </p>
                    </div>
                  </div>

                  {/* Wisata Info */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                    <div className="flex gap-4">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={transaction.wisata.foto 
                            ? `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${transaction.wisata.foto}`
                            : '/assets/images/bg-hero.png'
                          }
                          alt={transaction.wisata.nama}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = '/assets/images/bg-hero.png'
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-1">
                          {transaction.wisata.nama}
                        </h3>
                        <p className="text-sm text-gray-600">
                          📍 {transaction.wisata.lokasi}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Transaction Summary */}
                  <div className="space-y-3 mb-8">
                    <div className="flex justify-between text-gray-700">
                      <span>Nama Pemesan</span>
                      <span className="font-medium">{transaction.namaLengkap}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Email</span>
                      <span className="font-medium">{transaction.email}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>WhatsApp</span>
                      <span className="font-medium">{transaction.noTelp}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Tanggal Kunjungan</span>
                      <span className="font-medium">
                        {new Date(transaction.tanggalKunjungan).toLocaleDateString('id-ID', {
                          weekday: 'long',
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Jumlah Tiket</span>
                      <span className="font-medium">{transaction.jumlahTiket} Tiket</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                      <span>Total Pembayaran</span>
                      <span className="text-green-600">
                        Rp {transaction.totalHarga.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  {/* Notification Info */}
                  <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <svg className="w-6 h-6 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-blue-900 mb-2">
                          E-Ticket Telah Dikirim! 📨
                        </h4>
                        <p className="text-sm text-blue-800 mb-2">
                          E-ticket telah dikirim ke:
                        </p>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            Email: <strong>{transaction.email}</strong>
                          </li>
                          <li className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            WhatsApp: <strong>{transaction.noTelp}</strong>
                          </li>
                        </ul>
                        <p className="text-xs text-blue-600 mt-3">
                          💡 Periksa inbox email dan WhatsApp Anda untuk melihat e-ticket
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Important Notes */}
                  <div className="mb-8 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                    <h4 className="font-bold text-amber-900 mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Catatan Penting
                    </h4>
                    <ul className="text-sm text-amber-800 space-y-2">
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 mt-1">•</span>
                        <span>Simpan e-ticket atau tunjukkan Order ID saat masuk lokasi wisata</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 mt-1">•</span>
                        <span>E-ticket berlaku untuk tanggal kunjungan yang dipilih</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 mt-1">•</span>
                        <span>Datang 15 menit sebelum jam buka untuk check-in</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 mt-1">•</span>
                        <span>Hubungi pengelola wisata jika ada kendala</span>
                      </li>
                    </ul>
                  </div>

                  {/* Auto Redirect Counter */}
                  <div className="text-center mb-6">
                    <p className="text-sm text-gray-600">
                      Otomatis menuju halaman e-ticket dalam{' '}
                      <span className="font-bold text-green-600">{countdown}</span> detik
                    </p>
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                      <motion.div
                        className="bg-green-600 h-1.5 rounded-full"
                        initial={{ width: '100%' }}
                        animate={{ width: '0%' }}
                        transition={{ duration: 10, ease: 'linear' }}
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => router.push(`/ticket/${transaction.id}`)}
                      className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                      Lihat E-Ticket
                    </button>
                    <button
                      onClick={() => router.push('/wisata')}
                      className="w-full py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border-2 border-gray-300 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Kembali ke Wisata
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-sm text-gray-600">
              Ada pertanyaan? Hubungi{' '}
              <a href="tel:+6281234567890" className="text-green-600 hover:text-green-700 font-medium">
                Customer Service
              </a>
            </p>
          </motion.div>
        </div>
      </main>

      <DockNavbar />
    </>
  )
}
