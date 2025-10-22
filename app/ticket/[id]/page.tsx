'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import DockNavbar from '@/components/DockNavbar'
import { transactionApi } from '@/lib/api'
import jsPDF from 'jspdf'

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
  transactionId?: string
  wisata: {
    id: string
    nama: string
    lokasi: string
    foto?: string
    jamBuka?: string
    jamTutup?: string
    kontak?: string
  }
  createdAt: string
}

export default function TicketPage() {
  const router = useRouter()
  const params = useParams()
  const ticketId = params?.id as string
  
  const [transaction, setTransaction] = useState<TransactionData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isDownloading, setIsDownloading] = useState(false)
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (!ticketId) {
      router.push('/wisata')
      return
    }

    const fetchTransaction = async () => {
      try {
        setLoading(true)
        const response = await transactionApi.getById(ticketId)
        
        if (response.success && response.data) {
          const transactionData = response.data as TransactionData
          
          if (transactionData.status !== 'PAID') {
            setError('Tiket hanya tersedia setelah pembayaran selesai')
            setLoading(false)
            return
          }
          
          setTransaction(transactionData)
        } else {
          setError('Tiket tidak ditemukan')
        }
        setLoading(false)
      } catch (err: any) {
        console.error('Error fetching transaction:', err)
        setError(err.message || 'Gagal memuat data tiket')
        setLoading(false)
      }
    }

    fetchTransaction()
  }, [ticketId, router])

  const handleDownloadPDF = async () => {
    if (!transaction) return

    try {
      setIsDownloading(true)
      
      // Create PDF directly instead of using html2canvas
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true
      })
      
      const pageWidth = pdf.internal.pageSize.getWidth()
      const margin = 10
      const contentWidth = pageWidth - (margin * 2)
      
      // Helper function to get Y position and handle page breaks
      let y = margin
      const addContentWithPageBreak = (height: number) => {
        if (y + height > pdf.internal.pageSize.getHeight() - margin) {
          pdf.addPage()
          y = margin
        }
        const currentY = y
        y += height
        return currentY
      }
      
      // Load QR Code image
      const ticketUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}/ticket/${transaction.id}`
      const qrCodeData = `${ticketUrl}\nOrder: ${transaction.orderId}\nNama: ${transaction.namaLengkap}`
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrCodeData)}`
      
      // Header - Green bar with white text
      pdf.setFillColor(91, 144, 58) // #5B903A
      pdf.rect(0, 0, pageWidth, 40, 'F')
      
      pdf.setFont('helvetica', 'bold')
      pdf.setTextColor(255, 255, 255)
      pdf.setFontSize(24)
      pdf.text('E-TICKET', margin, 20)
      
      pdf.setFontSize(14)
      pdf.text('Wisata Baturaden', margin, 30)
      
      // Order ID box
      y = 50
      pdf.setFillColor(245, 245, 245)
      pdf.roundedRect(margin, y, contentWidth, 15, 3, 3, 'F')
      
      pdf.setTextColor(100, 100, 100)
      pdf.setFontSize(9)
      pdf.text('Order ID', margin + 3, y + 5)
      
      pdf.setTextColor(0, 0, 0)
      pdf.setFontSize(12)
      pdf.setFont('courier', 'bold')
      pdf.text(transaction.orderId, margin + 3, y + 12)
      
      // Main content
      y += 25
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(14)
      pdf.text('Detail Tiket Wisata', margin, y)
      
      // Destination
      y += 10
      pdf.setFillColor(245, 245, 245)
      pdf.roundedRect(margin, y, contentWidth, 20, 3, 3, 'F')
      
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(12)
      pdf.setTextColor(0, 0, 0)
      pdf.text(transaction.wisata.nama, margin + 3, y + 7)
      
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(10)
      pdf.setTextColor(80, 80, 80)
      pdf.text(transaction.wisata.lokasi, margin + 3, y + 15)
      
      // Customer info - in grid format
      y += 30
      const gridItemHeight = 20
      const gridItemWidth = contentWidth / 2 - 2
      
      // First row
      pdf.setFillColor(255, 255, 255)
      pdf.roundedRect(margin, y, gridItemWidth, gridItemHeight, 3, 3, 'F')
      pdf.roundedRect(margin + gridItemWidth + 4, y, gridItemWidth, gridItemHeight, 3, 3, 'F')
      
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(8)
      pdf.setTextColor(120, 120, 120)
      pdf.text('NAMA', margin + 3, y + 5)
      pdf.text('JUMLAH TIKET', margin + gridItemWidth + 7, y + 5)
      
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(11)
      pdf.setTextColor(0, 0, 0)
      pdf.text(transaction.namaLengkap, margin + 3, y + 13)
      pdf.text(`${transaction.jumlahTiket} Orang`, margin + gridItemWidth + 7, y + 13)
      
      // Second row
      y += gridItemHeight + 4
      pdf.setFillColor(255, 255, 255)
      pdf.roundedRect(margin, y, gridItemWidth, gridItemHeight, 3, 3, 'F')
      pdf.setFillColor(240, 255, 240)
      pdf.roundedRect(margin + gridItemWidth + 4, y, gridItemWidth, gridItemHeight, 3, 3, 'F')
      
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(8)
      pdf.setTextColor(120, 120, 120)
      pdf.text('TANGGAL KUNJUNGAN', margin + 3, y + 5)
      pdf.setTextColor(0, 130, 0)
      pdf.text('TOTAL', margin + gridItemWidth + 7, y + 5)
      
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(11)
      pdf.setTextColor(0, 0, 0)
      pdf.text(new Date(transaction.tanggalKunjungan).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }), margin + 3, y + 13)
      pdf.setTextColor(0, 130, 0)
      pdf.text(`Rp ${transaction.totalHarga.toLocaleString('id-ID')}`, margin + gridItemWidth + 7, y + 13)
      
      // Operating hours - if available
      if (transaction.wisata.jamBuka && transaction.wisata.jamTutup) {
        y += gridItemHeight + 10
        pdf.setFillColor(240, 248, 255)
        pdf.roundedRect(margin, y, contentWidth, 15, 3, 3, 'F')
        
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(9)
        pdf.setTextColor(0, 0, 150)
        pdf.text('Jam Operasional', margin + 3, y + 6)
        
        pdf.setFont('helvetica', 'normal')
        pdf.text(`${transaction.wisata.jamBuka} - ${transaction.wisata.jamTutup} WIB`, margin + 35, y + 6)
      }
      
      // QR Code
      y += 25
      pdf.setDrawColor(200, 200, 200)
      pdf.roundedRect(margin, y, contentWidth, 100, 3, 3, 'S')
      
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(10)
      pdf.setTextColor(0, 0, 0)
      pdf.text('Scan QR Code', pageWidth/2, y + 7, { align: 'center' })
      
      // Add QR code image - needs to be pre-loaded
      const qrImage = new Image()
      qrImage.crossOrigin = 'Anonymous'
      
      // Wait for QR code to load
      await new Promise((resolve, reject) => {
        qrImage.onload = resolve
        qrImage.onerror = reject
        qrImage.src = qrUrl
      })
      
      // Center the QR code
      const qrWidth = 50
      const qrX = (pageWidth - qrWidth) / 2
      pdf.addImage(qrImage, 'PNG', qrX, y + 15, qrWidth, qrWidth)
      
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(8)
      pdf.setTextColor(100, 100, 100)
      pdf.text('Tunjukkan kode ini saat check-in', pageWidth/2, y + 75, { align: 'center' })
      
      // Payment info
      pdf.setDrawColor(200, 200, 200)
      pdf.line(margin + 10, y + 85, pageWidth - margin - 10, y + 85)
      
      pdf.setFontSize(8)
      pdf.text('Pembelian:', margin + 10, y + 90)
      pdf.text(new Date(transaction.createdAt).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      }), pageWidth - margin - 10, y + 90, { align: 'right' })
      
      pdf.text('Pembayaran:', margin + 10, y + 95)
      pdf.text(transaction.paymentType?.toUpperCase() || 'ONLINE', pageWidth - margin - 10, y + 95, { align: 'right' })
      
      // Important Notes
      y += 110
      pdf.setFillColor(255, 250, 230)
      pdf.roundedRect(margin, y, contentWidth, 35, 3, 3, 'F')
      
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(10)
      pdf.setTextColor(150, 100, 0)
      pdf.text('Syarat & Ketentuan', margin + 3, y + 7)
      
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(8)
      pdf.setTextColor(100, 80, 0)
      pdf.text('• Berlaku untuk 1 kali kunjungan pada tanggal tertera', margin + 3, y + 15)
      pdf.text('• Tunjukkan QR Code atau Order ID saat check-in', margin + 3, y + 20)
      pdf.text('• Datang 15 menit lebih awal', margin + 3, y + 25)
      pdf.text('• Tidak dapat dikembalikan atau diubah', margin + 3, y + 30)
      
      // Footer
      const footerY = pdf.internal.pageSize.getHeight() - 15
      pdf.setFont('helvetica', 'normal')
      pdf.setFontSize(9)
      pdf.setTextColor(100, 100, 100)
      pdf.text('Terima kasih telah menggunakan layanan kami!', pageWidth/2, footerY - 5, { align: 'center' })
      pdf.text('Bantuan: +62 812-3456-7890', pageWidth/2, footerY, { align: 'center' })
      
      // Save PDF
      pdf.save(`E-Ticket-${transaction.orderId}.pdf`)
      setIsDownloading(false)
    } catch (err) {
      console.error('Error downloading PDF:', err)
      setIsDownloading(false)
      alert('Gagal mengunduh tiket. Silakan coba lagi.')
    }
  }

  const getQRCodeUrl = (data: string) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(data)}`
  }

  const getWisataImageUrl = (foto?: string) => {
    if (!foto || imageError) {
      return '/assets/images/bg-hero.png'
    }
    
    if (foto.startsWith('http')) return foto
    if (foto.startsWith('/uploads')) {
      return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}${foto}`
    }
    
    return `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/uploads/${foto}`
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-20 pb-20 lg:pb-8">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <div className="relative">
                <div className="w-20 h-20 border-4 border-gray-200 rounded-full"></div>
                <div className="w-20 h-20 border-4 border-[#5B903A] border-t-transparent rounded-full animate-spin absolute top-0"></div>
              </div>
              <p className="text-gray-600 text-lg mt-6 font-medium">Memuat e-ticket...</p>
            </div>
          </div>
        </main>
        <DockNavbar />
      </>
    )
  }

  if (error || !transaction) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-20 pb-20 lg:pb-8">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center animate-fade-in">
              <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {error || 'Tiket Tidak Ditemukan'}
              </h1>
              <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
                {error === 'Tiket hanya tersedia setelah pembayaran selesai' 
                  ? 'Mohon selesaikan pembayaran terlebih dahulu untuk melihat e-ticket.'
                  : 'E-ticket yang Anda cari tidak tersedia atau telah dihapus.'}
              </p>
              <button
                onClick={() => router.push('/wisata')}
                className="inline-flex items-center bg-[#5B903A] hover:bg-[#4a7a2f] text-white font-medium px-8 py-3 rounded-full gap-2 shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Kembali ke Wisata
              </button>
            </div>
          </div>
        </main>
        <DockNavbar />
      </>
    )
  }

  const ticketUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL || 'http://localhost:3000'}/ticket/${transaction.id}`
  const qrCodeData = `${ticketUrl}\nOrder: ${transaction.orderId}\nNama: ${transaction.namaLengkap}`
  const wisataImageUrl = getWisataImageUrl(transaction.wisata.foto)

  return (
    <>
      <Navbar />
      
      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 pt-20 pb-20 lg:pb-8 print:pt-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8 animate-fade-in">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors group"
            >
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-medium">Kembali</span>
            </button>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              E-Ticket Wisata
            </h1>
            <p className="text-gray-600 text-lg">
              Tiket digital Anda untuk {transaction.wisata.nama}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mb-8 flex flex-wrap gap-3 print:hidden animate-slide-up">
            <button
              onClick={handleDownloadPDF}
              disabled={isDownloading}
              className="inline-flex items-center bg-[#5B903A] hover:bg-[#4a7a2f] text-white font-medium px-6 py-3 rounded-xl gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              {isDownloading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Mengunduh...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Download PDF</span>
                </>
              )}
            </button>

            <button
              onClick={() => window.print()}
              className="inline-flex items-center bg-white hover:bg-gray-50 text-gray-900 font-medium px-6 py-3 rounded-xl gap-2 border-2 border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              <span>Cetak</span>
            </button>

            <a
              href={`https://wa.me/?text=${encodeURIComponent(`Lihat E-Ticket saya: ${ticketUrl}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-[#25D366] hover:bg-[#20bd5a] text-white font-medium px-6 py-3 rounded-xl gap-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span>Bagikan</span>
            </a>
          </div>

          {/* Main Ticket - Simple CSS Only */}
          <div id="ticket-content" className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 animate-scale-in">
            {/* Ticket Header - NO GRADIENT IN INLINE STYLE */}
            <div className="relative overflow-hidden bg-[#5B903A]">
              <div className="p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                  <div>
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">E-TICKET</h2>
                    <p className="text-white text-lg opacity-90">Wisata Baturaden</p>
                  </div>
                  <div className="bg-white rounded-xl px-5 py-3 opacity-95">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                      <span className="text-green-600 font-bold text-lg">LUNAS</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-4 opacity-95">
                  <p className="text-sm text-gray-600 mb-1 font-medium">Order ID</p>
                  <p className="text-2xl font-bold text-gray-900 font-mono">{transaction.orderId}</p>
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="h-6 relative flex justify-between px-2 bg-[#5B903A]">
              {[...Array(30)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-white rounded-full"></div>
              ))}
            </div>

            {/* Ticket Content */}
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left - Details */}
                <div className="lg:col-span-2 space-y-5">
                  {/* Destination */}
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <div className="flex gap-4 items-start">
                      <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border-2 border-gray-200">
                        <img
                          src={wisataImageUrl}
                          alt={transaction.wisata.nama}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            if (!imageError) {
                              setImageError(true)
                              e.currentTarget.src = '/assets/images/bg-hero.png'
                            }
                          }}
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1 uppercase font-medium">Destinasi</p>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{transaction.wisata.nama}</h3>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <svg className="w-4 h-4 text-[#5B903A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {transaction.wisata.lokasi}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                      <p className="text-xs text-gray-500 mb-2 uppercase">Nama</p>
                      <p className="text-base font-bold text-gray-900">{transaction.namaLengkap}</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                      <p className="text-xs text-gray-500 mb-2 uppercase">Jumlah Tiket</p>
                      <p className="text-base font-bold text-gray-900">{transaction.jumlahTiket} Orang</p>
                    </div>
                    <div className="bg-white rounded-xl p-4 border border-gray-100">
                      <p className="text-xs text-gray-500 mb-2 uppercase">Tanggal Kunjungan</p>
                      <p className="text-base font-bold text-gray-900">
                        {new Date(transaction.tanggalKunjungan).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric'
                        })}
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-xl p-4 border border-green-200">
                      <p className="text-xs text-green-700 mb-2 uppercase font-medium">Total</p>
                      <p className="text-lg font-bold text-green-600">
                        Rp {transaction.totalHarga.toLocaleString('id-ID')}
                      </p>
                    </div>
                  </div>

                  {/* Operating Hours */}
                  {(transaction.wisata.jamBuka && transaction.wisata.jamTutup) && (
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                      <div className="flex items-center gap-2 mb-2">
                        <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm font-bold text-blue-900">Jam Operasional</p>
                      </div>
                      <p className="text-sm text-blue-800 font-medium">
                        {transaction.wisata.jamBuka} - {transaction.wisata.jamTutup} WIB
                      </p>
                    </div>
                  )}
                </div>

                {/* Right - QR Code */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                    <p className="text-center text-sm font-bold text-gray-900 mb-4">
                      Scan QR Code
                    </p>
                    <div className="bg-white p-4 rounded-xl border-2 border-gray-200">
                      <img
                        src={getQRCodeUrl(qrCodeData)}
                        alt="QR Code"
                        className="w-full h-auto rounded-lg"
                        crossOrigin="anonymous"
                      />
                    </div>
                    <p className="text-center text-xs text-gray-600 mt-4">
                      Tunjukkan kode ini saat check-in
                    </p>

                    <div className="mt-5 pt-5 border-t border-gray-200 space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Pembelian</span>
                        <span className="font-medium text-gray-900">
                          {new Date(transaction.createdAt).toLocaleDateString('id-ID', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Pembayaran</span>
                        <span className="font-medium text-gray-900 uppercase">
                          {transaction.paymentType || 'Online'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Important Notes */}
              <div className="mt-6 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-5">
                <div className="flex gap-3">
                  <svg className="w-6 h-6 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-bold text-amber-900 mb-2">Syarat & Ketentuan</h4>
                    <ul className="text-sm text-amber-800 space-y-1.5">
                      <li>• Berlaku untuk 1 kali kunjungan pada tanggal tertera</li>
                      <li>• Tunjukkan QR Code atau Order ID saat check-in</li>
                      <li>• Datang 15 menit lebih awal</li>
                      <li>• Tidak dapat dikembalikan atau diubah</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                <p className="text-sm text-gray-700 mb-1">
                  Terima kasih telah menggunakan layanan kami!
                </p>
                <p className="text-xs text-gray-500">
                  Bantuan: <strong>+62 812-3456-7890</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100 print:hidden animate-slide-up">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Pengiriman E-Ticket</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 mb-1">Email</p>
                  <p className="text-sm text-gray-600 truncate">{transaction.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-green-50 rounded-xl">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-gray-900 mb-1">WhatsApp</p>
                  <p className="text-sm text-gray-600">{transaction.noTelp}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <DockNavbar />

      {/* Optimized Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.97);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.5s ease-out;
          animation-fill-mode: both;
          will-change: opacity;
        }

        .animate-slide-up {
          animation: slideUp 0.6s ease-out;
          animation-fill-mode: both;
          will-change: transform, opacity;
        }

        .animate-scale-in {
          animation: scaleIn 0.5s ease-out;
          animation-fill-mode: both;
          will-change: transform, opacity;
        }

        /* Respect user preferences */
        @media (prefers-reduced-motion) {
          .animate-fade-in,
          .animate-slide-up,
          .animate-scale-in {
            animation: fadeIn 0.1s !important;
            transform: none !important;
          }
        }

        @media print {
          @page {
            margin: 10mm;
            size: A4 portrait;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .print\\:hidden {
            display: none !important;
          }
          .print\\:pt-0 {
            padding-top: 0 !important;
          }
        }
      `}</style>
    </>
  )
}