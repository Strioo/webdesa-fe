'use client'

import { Timeline } from '@/components/ui/timeline'
import { motion } from 'framer-motion'
import Image from 'next/image'

export default function ProfileTimelineSection() {
  const timelineData = [
    {
      title: '1990–2000',
      content: (
        <motion.div
          className="group bg-white p-6 md:p-8 lg:p-10 rounded-2xl border border-gray-200 
                     hover:border-gray-300 hover:shadow-lg transition-all duration-300"
          whileHover={{ y: -3 }}
        >
          <div className="mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 bg-gray-100 rounded-full">
              <span className="text-xs font-semibold text-gray-700">Era Awal</span>
            </div>

            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Awal Peradaban Baru di Lereng Slamet
            </h3>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Pada dekade ini, Baturaden mulai dikenal sebagai desa wisata alam. Masyarakat hidup
              dari hasil pertanian, namun perlahan membuka diri terhadap potensi wisata. Air
              terjun, pemandian air panas, dan keindahan alamnya menjadi daya tarik awal bagi para
              pengunjung dari luar Banyumas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="relative h-56 md:h-72 lg:h-80 rounded-xl overflow-hidden shadow-sm">
              <Image
                src="/assets/images/timeline-1990(1).jpg"
                alt="Baturaden era 1990-2000 gambar 1"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 400px"
              />
            </div>
            <div className="relative h-56 md:h-72 lg:h-80 rounded-xl overflow-hidden shadow-sm">
              <Image
                src="/assets/images/timeline-1990(2).jpg"
                alt="Baturaden era 1990-2000 gambar 2"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 400px"
              />
            </div>
          </div>
        </motion.div>
      )
    },
    {
      title: '2000–2010',
      content: (
        <motion.div
          className="group bg-white p-6 md:p-8 lg:p-10 rounded-2xl border border-gray-200 
                     hover:border-gray-300 hover:shadow-lg transition-all duration-300"
          whileHover={{ y: -3 }}
        >
          <div className="mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 bg-gray-100 rounded-full">
              <span className="text-xs font-semibold text-gray-700">Era Kebangkitan</span>
            </div>

            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Bangkitnya Pariwisata dan Budaya Lokal
            </h3>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Pemerintah daerah bersama warga mulai memperkuat sektor pariwisata dengan menjaga
              kearifan lokal. Festival budaya dan tradisi gotong royong digalakkan kembali,
              menjadikan Baturaden sebagai simbol harmoni antara kemajuan dan pelestarian budaya.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="relative h-56 md:h-72 lg:h-80 rounded-xl overflow-hidden shadow-sm">
              <Image
                src="/assets/images/timeline-2000(1).jpg"
                alt="Pariwisata Baturaden 2000-2010 gambar 1"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 400px"
              />
            </div>
            <div className="relative h-56 md:h-72 lg:h-80 rounded-xl overflow-hidden shadow-sm">
              <Image
                src="/assets/images/timeline-2000(2).jpg"
                alt="Pariwisata Baturaden 2000-2010 gambar 2"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 400px"
              />
            </div>
          </div>
        </motion.div>
      )
    },
    {
      title: '2010–2020',
      content: (
        <motion.div
          className="group bg-white p-6 md:p-8 lg:p-10 rounded-2xl border border-gray-200 
                     hover:border-gray-300 hover:shadow-lg transition-all duration-300"
          whileHover={{ y: -3 }}
        >
          <div className="mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 bg-gray-100 rounded-full">
              <span className="text-xs font-semibold text-gray-700">Era Digital</span>
            </div>

            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Era Transformasi Digital dan Infrastruktur
            </h3>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Desa mulai bertransformasi dengan digitalisasi layanan publik dan pembangunan
              infrastruktur modern. Akses jalan diperbaiki, sinyal internet masuk, dan pelayanan
              administrasi beralih online untuk kemudahan warga.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="relative h-56 md:h-72 lg:h-80 rounded-xl overflow-hidden shadow-sm">
              <Image
                src="/assets/images/timeline-2010(1).jpg"
                alt="Infrastruktur Baturaden 2010-2020 gambar 1"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 400px"
              />
            </div>
            <div className="relative h-56 md:h-72 lg:h-80 rounded-xl overflow-hidden shadow-sm">
              <Image
                src="/assets/images/timeline-2010(2).jpg"
                alt="Infrastruktur Baturaden 2010-2020 gambar 2"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 400px"
              />
            </div>
          </div>
        </motion.div>
      )
    },
    {
      title: '2020–Sekarang',
      content: (
        <motion.div
          className="group bg-white p-6 md:p-8 lg:p-10 rounded-2xl border border-gray-200 
                     hover:border-gray-300 hover:shadow-lg transition-all duration-300"
          whileHover={{ y: -3 }}
        >
          <div className="mb-6 md:mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 bg-gray-100 rounded-full">
              <span className="text-xs font-semibold text-gray-700">Era Berkelanjutan</span>
            </div>

            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Menuju Desa Mandiri dan Berkelanjutan
            </h3>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              Fokus pada pembangunan berkelanjutan dengan memanfaatkan teknologi hijau dan
              pemberdayaan UMKM lokal. Baturaden kini menjadi role model desa wisata yang seimbang
              antara ekonomi, sosial, dan lingkungan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="relative h-56 md:h-72 lg:h-80 rounded-xl overflow-hidden shadow-sm">
              <Image
                src="/assets/images/timeline-2020(1).jpg"
                alt="Desa berkelanjutan 2020-sekarang gambar 1"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 400px"
              />
            </div>
            <div className="relative h-56 md:h-72 lg:h-80 rounded-xl overflow-hidden shadow-sm">
              <Image
                src="/assets/images/timeline-2020(2).jpg"
                alt="Desa berkelanjutan 2020-sekarang gambar 2"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 400px"
              />
            </div>
          </div>
        </motion.div>
      )
    }
  ]

  return (
    <section id="sejarah-section" className="bg-white overflow-hidden">
      <Timeline data={timelineData} />
    </section>
  )
}
