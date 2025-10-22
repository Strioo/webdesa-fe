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
  paymentType?: string
  vaNumber?: string
  bank?: string
  expiryTime?: string
  wisata: {
    id: string
    nama: string
    lokasi: string
    foto?: string
  }
  createdAt: string
}

export default function PaymentPendingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  
  const [transaction, setTransaction] = useState<TransactionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [timeLeft, setTimeLeft] = useState<string>('')
  const [isCopied, setIsCopied] = useState(false)

  // Fetch transaction data
  useEffect(() => {
    if (!orderId) {
      router.push('/wisata')
      return
    }

    const fetchTransaction = async () => {
      try {
        setLoading(true)
        
        // ✅ CHANGED: Fetch from backend
        const response = await transactionApi.getByOrderId(orderId)
        
        if (response.success && response.data) {
          setTransaction(response.data as TransactionData)
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

  // Countdown timer
  useEffect(() => {
    if (!transaction?.expiryTime) return

    const interval = setInterval(() => {
      const now = new Date().getTime()
      const expiry = new Date(transaction.expiryTime!).getTime()
      const distance = expiry - now

      if (distance < 0) {
        setTimeLeft('Expired')
        clearInterval(interval)
        return
      }

      const hours = Math.floor(distance / (1000 * 60 * 60))
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((distance % (1000 * 60)) / 1000)

      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`)
    }, 1000)

    return () => clearInterval(interval)
  }, [transaction])

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setIsCopied(true)
    setTimeout(() => setIsCopied(false), 2000)
  }

  const getBankLogo = (bank?: string) => {
    const logos: { [key: string]: string } = {
      bca: '🏦 BCA',
      mandiri: '🏦 Mandiri',
      bni: '🏦 BNI',
      bri: '🏦 BRI',
      permata: '🏦 Permata'
    }
    return logos[bank || ''] || '🏦 Bank'
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-neutral-50 pt-20 pb-20 lg:pb-8">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
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
      
      <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 pt-20 pb-20 lg:pb-8">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            className="bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Pending Header */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 p-8 text-center">
              <motion.div
                className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </motion.div>
              
              <h1 className="text-3xl font-bold text-white mb-2">
                Menunggu Pembayaran ⏳
              </h1>
              
              <p className="text-amber-100">
                Selesaikan pembayaran sebelum batas waktu
              </p>
            </div>

            {/* Transaction Details */}
            <div className="p-8">
              {transaction && (
                <>
                  {/* Timer */}
                  <div className="mb-8 p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-xl text-center">
                    <p className="text-sm text-amber-800 mb-2 font-medium">
                      Batas Waktu Pembayaran
                    </p>
                    <div className="text-4xl font-bold text-amber-600 font-mono">
                      {timeLeft || '00:00:00'}
                    </div>
                    {timeLeft === 'Expired' && (
                      <p className="mt-3 text-sm text-red-600 font-medium">
                        Waktu pembayaran telah habis. Silakan buat pesanan baru.
                      </p>
                    )}
                  </div>

                  {/* Payment Instructions */}
                  {transaction.paymentType === 'bank_transfer' && transaction.vaNumber && (
                    <div className="mb-8 p-6 bg-blue-50 border-2 border-blue-200 rounded-xl">
                      <h3 className="font-bold text-blue-900 mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                        </svg>
                        Cara Pembayaran - Virtual Account
                      </h3>

                      {/* Bank & VA Number */}
                      <div className="mb-4 p-4 bg-white rounded-lg border border-blue-200">
                        <p className="text-sm text-gray-600 mb-2">Bank</p>
                        <p className="text-xl font-bold text-gray-900 mb-4">
                          {getBankLogo(transaction.bank)}
                        </p>
                        
                        <p className="text-sm text-gray-600 mb-2">Nomor Virtual Account</p>
                        <div className="flex items-center gap-3">
                          <p className="text-2xl font-bold text-blue-600 font-mono flex-1">
                            {transaction.vaNumber}
                          </p>
                          <button
                            onClick={() => copyToClipboard(transaction.vaNumber!)}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                          >
                            {isCopied ? (
                              <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Copied
                              </>
                            ) : (
                              <>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                Copy
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Amount */}
                      <div className="mb-4 p-4 bg-white rounded-lg border border-blue-200">
                        <p className="text-sm text-gray-600 mb-2">Total Pembayaran</p>
                        <p className="text-3xl font-bold text-gray-900">
                          Rp {transaction.totalHarga.toLocaleString('id-ID')}
                        </p>
                      </div>

                      {/* Instructions */}
                      <div className="space-y-3">
                        <p className="text-sm font-bold text-blue-900">Langkah Pembayaran:</p>
                        <ol className="text-sm text-blue-800 space-y-2 list-decimal list-inside">
                          <li>Buka aplikasi mobile banking atau internet banking Anda</li>
                          <li>Pilih menu Transfer atau Bayar</li>
                          <li>Pilih Virtual Account</li>
                          <li>Masukkan nomor VA: <span className="font-mono font-bold">{transaction.vaNumber}</span></li>
                          <li>Masukkan nominal: <span className="font-bold">Rp {transaction.totalHarga.toLocaleString('id-ID')}</span></li>
                          <li>Konfirmasi dan selesaikan pembayaran</li>
                        </ol>
                      </div>
                    </div>
                  )}

                  {/* E-wallet / QRIS */}
                  {(transaction.paymentType === 'gopay' || transaction.paymentType === 'qris') && (
                    <div className="mb-8 p-6 bg-green-50 border-2 border-green-200 rounded-xl">
                      <h3 className="font-bold text-green-900 mb-4">
                        Pembayaran via {transaction.paymentType === 'gopay' ? 'GoPay' : 'QRIS'}
                      </h3>
                      <p className="text-sm text-green-800 mb-4">
                        Scan QR code pada aplikasi pembayaran Anda atau buka deeplink yang telah dikirim.
                      </p>
                      <div className="p-4 bg-white rounded-lg text-center">
                        <div className="w-48 h-48 mx-auto bg-gray-200 rounded-lg flex items-center justify-center mb-3">
                          <svg className="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                          </svg>
                        </div>
                        <p className="text-xs text-gray-500">QR Code untuk pembayaran</p>
                      </div>
                    </div>
                  )}

                  {/* Order Summary */}
                  <div className="mb-8 pb-6 border-b border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-4">Ringkasan Pesanan</h3>
                    
                    {/* Wisata Info */}
                    <div className="mb-4 p-4 bg-gray-50 rounded-lg">
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
                          <h4 className="font-bold text-gray-900 mb-1">
                            {transaction.wisata.nama}
                          </h4>
                          <p className="text-sm text-gray-600">
                            📍 {transaction.wisata.lokasi}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Transaction Details */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order ID</span>
                        <span className="font-mono font-medium">{transaction.orderId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nama</span>
                        <span className="font-medium">{transaction.namaLengkap}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Jumlah Tiket</span>
                        <span className="font-medium">{transaction.jumlahTiket} Tiket</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tanggal Kunjungan</span>
                        <span className="font-medium">
                          {new Date(transaction.tanggalKunjungan).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
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
                        <span>E-ticket akan dikirim otomatis ke email & WhatsApp setelah pembayaran berhasil</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 mt-1">•</span>
                        <span>Pembayaran akan dikonfirmasi maksimal 10 menit</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 mt-1">•</span>
                        <span>Jika sudah membayar, tunggu notifikasi di email/WhatsApp</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-amber-600 mt-1">•</span>
                        <span>Jangan tutup halaman ini sebelum pembayaran selesai</span>
                      </li>
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={() => window.location.reload()}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Cek Status Pembayaran
                    </button>
                    <button
                      onClick={() => router.push('/wisata')}
                      className="w-full py-3 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border-2 border-gray-300 transition-colors flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Kembali ke Beranda
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Help Section */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-sm text-gray-600 mb-2">
              Mengalami kendala pembayaran?
            </p>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Hubungi Customer Service
            </a>
          </motion.div>
        </div>
      </main>

      <DockNavbar />
    </>
  )
}
