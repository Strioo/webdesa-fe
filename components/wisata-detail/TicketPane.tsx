'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ClockIcon, PhoneIcon, TagIcon } from '@heroicons/react/24/outline'
import { getMidtransSnapUrl, getMidtransClientKey } from '@/lib/midtrans'
import { PaymentRequest, PaymentResponse } from '@/lib/types'

interface TicketPaneProps {
  destinationId: string
  destinationName: string
  category: string
  price: number
  openTime: string
  closeTime: string
  phone: string
  className?: string
  onTermsClick?: () => void
}

// Extend Window type for Midtrans Snap
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

export default function TicketPane({
  destinationId,
  destinationName,
  category,
  price,
  openTime,
  closeTime,
  phone,
  className = '',
  onTermsClick,
}: TicketPaneProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isSnapLoaded, setIsSnapLoaded] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load Midtrans Snap script
  const loadSnapScript = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (window.snap) {
        resolve()
        return
      }

      const script = document.createElement('script')
      script.src = getMidtransSnapUrl()
      script.setAttribute('data-client-key', getMidtransClientKey())

      script.onload = () => {
        setIsSnapLoaded(true)
        resolve()
      }

      script.onerror = () => {
        reject(new Error('Failed to load Midtrans Snap script'))
      }

      document.body.appendChild(script)
    })
  }

  const handleBuyTicket = async () => {
    try {
      setIsLoading(true)
      setError(null)

      // TODO: In production, get actual customer details from auth/form
      const customerData = {
        customerName: 'Customer Name',
        customerEmail: 'customer@example.com',
        customerPhone: '081234567890',
      }

      // Create payment request
      const paymentRequest: PaymentRequest = {
        destinationId,
        destinationName,
        quantity: 1,
        price,
        ...customerData,
      }

      // Call payment API
      const response = await fetch('/api/payments/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentRequest),
      })

      const data: PaymentResponse = await response.json()

      if (!data.success || !data.token) {
        throw new Error(data.error || 'Failed to create payment')
      }

      // Load Snap script if not loaded
      if (!isSnapLoaded) {
        await loadSnapScript()
      }

      // Open Snap payment popup
      if (window.snap) {
        window.snap.pay(data.token, {
          onSuccess: (result) => {
            console.log('Payment success:', result)
            alert('Pembayaran berhasil! Terima kasih.')
          },
          onPending: (result) => {
            console.log('Payment pending:', result)
            alert('Pembayaran pending. Silakan selesaikan pembayaran Anda.')
          },
          onError: (result) => {
            console.error('Payment error:', result)
            alert('Terjadi kesalahan saat memproses pembayaran.')
          },
          onClose: () => {
            console.log('Payment popup closed')
          },
        })
      } else {
        // Fallback: redirect to payment URL
        if (data.redirectUrl) {
          window.location.href = data.redirectUrl
        } else {
          throw new Error('Snap not available and no redirect URL provided')
        }
      }
    } catch (err) {
      console.error('Payment error:', err)
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-lg ring-1 ring-neutral-200 p-6 sticky top-24 ${className}`}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Title */}
      <h1 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-3">
        {destinationName}
      </h1>

      {/* Category Badge */}
      <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 bg-white ring-1 ring-[#5B903A]/20 rounded-full">
        <TagIcon className="w-4 h-4 text-[#5B903A]" />
        <span className="text-sm font-medium text-[#5B903A]">{category}</span>
      </div>

      {/* Operating Hours */}
      <div className="mb-4 p-3 bg-emerald-50 hover:bg-emerald-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] focus-visible:ring-offset-2 rounded-lg">
        <div className="flex items-center gap-2 text-sm">
          <ClockIcon className="w-5 h-5 text-[#5B903A] flex-shrink-0" />
          <div className="flex-1">
            <span className="font-medium text-neutral-900">Jam Operasional</span>
            <div className="text-neutral-700 mt-0.5 font-medium">
              {openTime} - {closeTime} WIB
            </div>
          </div>
        </div>
      </div>

      {/* Contact Phone */}
      <a
        href={`tel:${phone}`}
        className="mb-6 p-3 bg-emerald-50 rounded-lg flex items-center gap-2 text-sm hover:bg-emerald-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] focus-visible:ring-offset-2 group"
      >
        <PhoneIcon className="w-5 h-5 text-[#5B903A] flex-shrink-0" />
        <div className="flex-1">
          <span className="font-medium text-neutral-700 block">Hubungi Kami</span>
          <span className="text-[#5B903A]">{phone}</span>
        </div>
      </a>

      {/* Price */}
      <div className="mb-6 p-4 bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl ring-1 ring-emerald-100">
        <div className="flex items-center gap-2 mb-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-5 h-5 text-[#5B903A]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
            />
          </svg>
          <span className="text-sm text-neutral-600">Harga Tiket</span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-[#5B903A]">
            Rp{price.toLocaleString('id-ID')}
          </span>
          <span className="text-neutral-600">/ orang</span>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}

      {/* Buy Button */}
      <motion.button
        onClick={handleBuyTicket}
        disabled={isLoading}
        className="w-full py-3.5 px-6 bg-[#5B903A] text-white font-semibold rounded-full hover:bg-[#4a7a2f] disabled:bg-neutral-300 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] focus-visible:ring-offset-2 min-h-[48px]"
        whileHover={isLoading ? {} : { scale: 1.02 }}
        whileTap={isLoading ? {} : { scale: 0.98 }}
        style={{ willChange: 'transform' }}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span>Memproses...</span>
          </>
        ) : (
          <>
            <span>Pesan Tiket Sekarang</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </>
        )}
      </motion.button>

      {/* Info Text */}
      <p className="mt-4 text-xs text-center text-neutral-500">
        Dengan membeli tiket, Anda menyetujui{' '}
        <button
          type="button"
          onClick={onTermsClick}
          className="text-[#5B903A] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] focus-visible:ring-offset-1 rounded"
        >
          syarat dan ketentuan
        </button>{' '}
        yang berlaku.
      </p>
    </motion.div>
  )
}
