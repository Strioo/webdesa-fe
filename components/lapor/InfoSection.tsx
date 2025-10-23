'use client'

import { motion } from 'framer-motion'
import { Clock, CheckCircle, Phone } from 'lucide-react'

const infoCards = [
  {
    icon: Clock,
    title: 'Proses Cepat',
    description:
      'Laporan Anda akan langsung masuk ke sistem dan ditindaklanjuti dalam 1x24 jam kerja.',
    color: 'bg-blue-50',
    iconColor: 'text-blue-600'
  },
  {
    icon: CheckCircle,
    title: 'Transparan',
    description:
      'Setiap laporan akan mendapat nomor tracking dan dapat dipantau statusnya secara real-time.',
    color: 'bg-green-50',
    iconColor: 'text-green-600'
  },
  {
    icon: Phone,
    title: 'Hotline 24/7',
    description:
      'Untuk laporan mendesak, hubungi hotline desa: (0281) 123-4567 atau WhatsApp: 0812-3456-7890.',
    color: 'bg-orange-50',
    iconColor: 'text-orange-600'
  }
]

export default function InfoSection() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-screen-xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px', amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Cara Kerja Pelaporan
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Sistem pelaporan desa dirancang untuk kemudahan dan kecepatan respons terhadap setiap
            masukan warga.
          </p>
        </motion.div>

        {/* Info Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {infoCards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.title}
                className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm hover:shadow-lg hover:border-gray-300 transition-all duration-300 group text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px', amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
                whileHover={{ y: -4 }}
              >
                {/* Icon */}
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 ${card.color} rounded-lg mb-4`}
                >
                  <Icon className={`w-6 h-6 ${card.iconColor}`} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">{card.title}</h3>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mx-auto">
                  {card.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-12 p-6 sm:p-8 bg-white border-l-4 border-green-600 rounded-lg shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px', amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h4 className="text-lg font-bold text-gray-900 mb-2">Catatan Penting</h4>
          <ul className="space-y-2 text-sm sm:text-base text-gray-600">
            <li className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>
                Pastikan informasi yang Anda sampaikan akurat dan sesuai fakta di lapangan.
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>
                Sertakan foto atau dokumen pendukung untuk mempercepat proses penanganan.
              </span>
            </li>
            <li className="flex items-start">
              <span className="inline-block w-1.5 h-1.5 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              <span>
                Laporan yang bersifat mendesak atau darurat dapat menghubungi hotline desa secara
                langsung.
              </span>
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
