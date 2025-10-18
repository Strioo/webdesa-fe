'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface TermsModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function TermsModal({ isOpen, onClose }: TermsModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Focus trap
  useEffect(() => {
    if (!isOpen) return

    const modal = modalRef.current
    if (!modal) return

    // Get all focusable elements
    const focusableElements = modal.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    // Focus first element (close button)
    setTimeout(() => closeButtonRef.current?.focus(), 100)

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleTabKey)
    return () => document.removeEventListener('keydown', handleTabKey)
  }, [isOpen])

  // ESC key to close
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="terms-modal-title"
              className="relative w-full max-w-2xl max-h-[85vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 z-10 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between">
                <h2
                  id="terms-modal-title"
                  className="text-2xl font-bold text-neutral-900"
                >
                  Syarat dan Ketentuan
                </h2>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-neutral-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] focus-visible:ring-offset-2"
                  aria-label="Tutup modal"
                >
                  <XMarkIcon className="w-6 h-6 text-neutral-600" />
                </button>
              </div>

              {/* Content - Scrollable */}
              <div className="px-6 py-6 overflow-y-auto max-h-[calc(85vh-80px)]">
                <div className="prose prose-neutral max-w-none">
                  <h3 className="text-lg font-semibold text-neutral-900 mt-0">
                    1. Ketentuan Umum
                  </h3>
                  <p className="text-neutral-700 leading-relaxed">
                    Dengan melakukan pembelian tiket melalui platform ini, Anda
                    menyatakan telah membaca, memahami, dan menyetujui semua syarat
                    dan ketentuan yang berlaku. Tiket yang telah dibeli tidak dapat
                    dikembalikan atau ditukar kecuali terdapat kebijakan khusus yang
                    ditetapkan oleh pengelola destinasi wisata.
                  </p>

                  <h3 className="text-lg font-semibold text-neutral-900 mt-6">
                    2. Harga dan Pembayaran
                  </h3>
                  <p className="text-neutral-700 leading-relaxed">
                    Harga tiket yang tertera sudah termasuk pajak dan biaya
                    administrasi. Pembayaran dilakukan melalui gateway pembayaran
                    Midtrans yang aman dan terpercaya. Anda bertanggung jawab atas
                    keakuratan informasi pembayaran yang diberikan.
                  </p>

                  <h3 className="text-lg font-semibold text-neutral-900 mt-6">
                    3. Penggunaan Tiket
                  </h3>
                  <ul className="text-neutral-700 leading-relaxed space-y-2">
                    <li>
                      Tiket berlaku untuk satu kali kunjungan sesuai dengan tanggal
                      dan waktu yang tertera (jika ada).
                    </li>
                    <li>
                      Pengunjung wajib menunjukkan bukti pembelian tiket (e-ticket)
                      saat memasuki area destinasi wisata.
                    </li>
                    <li>
                      Tiket tidak dapat dipindahtangankan kepada pihak lain tanpa
                      izin pengelola.
                    </li>
                    <li>
                      Tiket yang hilang atau rusak tidak dapat diganti atau
                      dikembalikan.
                    </li>
                  </ul>

                  <h3 className="text-lg font-semibold text-neutral-900 mt-6">
                    4. Jam Operasional
                  </h3>
                  <p className="text-neutral-700 leading-relaxed">
                    Setiap destinasi wisata memiliki jam operasional yang berbeda.
                    Pastikan Anda mengunjungi destinasi sesuai dengan jam buka yang
                    tertera. Pengelola berhak menutup atau mengubah jam operasional
                    tanpa pemberitahuan sebelumnya karena kondisi cuaca, perawatan,
                    atau keadaan darurat lainnya.
                  </p>

                  <h3 className="text-lg font-semibold text-neutral-900 mt-6">
                    5. Peraturan Kunjungan
                  </h3>
                  <ul className="text-neutral-700 leading-relaxed space-y-2">
                    <li>
                      Pengunjung wajib menjaga kebersihan dan kelestarian lingkungan
                      destinasi wisata.
                    </li>
                    <li>
                      Dilarang membawa barang-barang berbahaya, narkotika, atau
                      minuman beralkohol ke dalam area wisata.
                    </li>
                    <li>
                      Pengunjung wajib mengikuti instruksi dan arahan dari petugas
                      atau pemandu wisata.
                    </li>
                    <li>
                      Pengelola tidak bertanggung jawab atas kehilangan atau
                      kerusakan barang pribadi pengunjung.
                    </li>
                    <li>
                      Pengunjung bertanggung jawab atas keselamatan diri sendiri dan
                      orang lain selama berada di area wisata.
                    </li>
                  </ul>

                  <h3 className="text-lg font-semibold text-neutral-900 mt-6">
                    6. Pembatalan dan Pengembalian Dana
                  </h3>
                  <p className="text-neutral-700 leading-relaxed">
                    Tiket yang telah dibeli tidak dapat dibatalkan atau dikembalikan
                    kecuali terdapat kebijakan khusus dari pengelola destinasi wisata
                    atau dalam kondisi force majeure (bencana alam, pandemi, dll).
                    Pengajuan pembatalan harus dilakukan maksimal 24 jam sebelum
                    tanggal kunjungan dengan menghubungi kontak pengelola yang
                    tertera.
                  </p>

                  <h3 className="text-lg font-semibold text-neutral-900 mt-6">
                    7. Kebijakan Privasi
                  </h3>
                  <p className="text-neutral-700 leading-relaxed">
                    Informasi pribadi yang Anda berikan akan digunakan untuk
                    keperluan transaksi dan komunikasi terkait kunjungan Anda. Kami
                    berkomitmen untuk melindungi privasi Anda dan tidak akan
                    membagikan informasi pribadi Anda kepada pihak ketiga tanpa
                    persetujuan Anda, kecuali diwajibkan oleh hukum.
                  </p>

                  <h3 className="text-lg font-semibold text-neutral-900 mt-6">
                    8. Tanggung Jawab
                  </h3>
                  <p className="text-neutral-700 leading-relaxed">
                    Pengelola destinasi wisata dan platform pemesanan tidak
                    bertanggung jawab atas cedera, kecelakaan, atau kerugian yang
                    terjadi selama kunjungan Anda, kecuali disebabkan oleh kelalaian
                    atau kesalahan pengelola. Pengunjung diharapkan untuk mengikuti
                    semua peraturan keselamatan yang berlaku.
                  </p>

                  <h3 className="text-lg font-semibold text-neutral-900 mt-6">
                    9. Perubahan Syarat dan Ketentuan
                  </h3>
                  <p className="text-neutral-700 leading-relaxed">
                    Pengelola berhak untuk mengubah syarat dan ketentuan ini sewaktu-
                    waktu tanpa pemberitahuan sebelumnya. Perubahan akan berlaku
                    sejak dipublikasikan di platform. Pengunjung disarankan untuk
                    memeriksa syarat dan ketentuan secara berkala.
                  </p>

                  <h3 className="text-lg font-semibold text-neutral-900 mt-6">
                    10. Kontak
                  </h3>
                  <p className="text-neutral-700 leading-relaxed">
                    Jika Anda memiliki pertanyaan atau memerlukan bantuan terkait
                    syarat dan ketentuan ini, silakan hubungi kami melalui informasi
                    kontak yang tertera pada halaman detail destinasi wisata atau
                    email ke:{' '}
                    <a
                      href="mailto:info@desabaturaden.id"
                      className="text-[#5B903A] hover:underline"
                    >
                      info@desabaturaden.id
                    </a>
                  </p>

                  <div className="mt-8 p-4 bg-emerald-50 rounded-lg border border-emerald-100">
                    <p className="text-sm text-emerald-900 font-medium">
                      Dengan melanjutkan pembelian tiket, Anda menyatakan telah
                      membaca dan menyetujui seluruh syarat dan ketentuan di atas.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white border-t border-neutral-200 px-6 py-4 flex justify-end">
                <motion.button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#5B903A] text-white font-semibold rounded-full hover:bg-[#4a7a2f] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] focus-visible:ring-offset-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Saya Mengerti
                </motion.button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
