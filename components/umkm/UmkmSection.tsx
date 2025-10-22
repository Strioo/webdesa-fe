'use client'

import { motion } from 'framer-motion'
import { useRef } from 'react'
import { useInView } from 'framer-motion'
import UmkmCard, { UmkmProduct } from './UmkmCard'

const umkmProducts: UmkmProduct[] = [
  {
    id: 'kopi-lereng-slamet',
    title: 'Kopi Lereng Slamet',
    description:
      'Nikmati kopi lokal hasil panen petani Baturaden. Setiap cangkir menghadirkan kehangatan dari sejuknya lereng gunung.',
    image: '/assets/images/umkm-kopi-lereng-slamet.png',
    price: 45000,
    category: 'Minuman'
  },
  {
    id: 'herbal-wangi-lestari',
    title: 'Herbal Wangi Lestari',
    description:
      'Produk herbal alami dari bahan segar pegunungan untuk kesehatan dan relaksasi alami.',
    image: '/assets/images/umkm-herbal-wangi-lestari.png',
    price: 35000,
    category: 'Kesehatan'
  },
  {
    id: 'batik-lestari-baturraden',
    title: 'Batik Lestari Baturaden',
    description:
      'Motif batik terinspirasi dari alam — dibuat dengan tangan penuh makna dan budaya lokal.',
    image: '/assets/images/umkm-batik-lestari-baturraden.png',
    price: 250000,
    category: 'Fashion'
  },
  {
    id: 'pasar-sayur-segar',
    title: 'Pasar Sayur Segar',
    description:
      'Sayuran segar langsung dari ladang petani lokal — sehat, alami, dan penuh kesegaran setiap hari.',
    image: '/assets/images/umkm-pasar-sayur-segar.png',
    price: 25000,
    category: 'Makanan'
  },
  {
    id: 'kerajinan-sumber-rejeki',
    title: 'Kerajinan Sumber Rejeki',
    description:
      'Anyaman bambu dan tas rajut hasil tangan pengrajin lokal — karya penuh makna dari alam Baturaden.',
    image: '/assets/images/umkm-kerajinan-sumber-rejeki.png',
    price: 75000,
    category: 'Kerajinan'
  },
  {
    id: 'madu-hutan-baturaden',
    title: 'Madu Hutan Baturaden',
    description:
      'Madu murni dari hutan pegunungan Baturaden. Kaya manfaat dan nikmat untuk kesehatan keluarga.',
    image: '/assets/images/umkm-herbal-wangi-lestari.png',
    price: 85000,
    category: 'Kesehatan'
  }
]

export default function UmkmSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="w-full pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 bg-[#F8F8F8]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {umkmProducts.map((product, index) => (
            <UmkmCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
