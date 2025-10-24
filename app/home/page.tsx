'use client'

import dynamic from 'next/dynamic'
import HeroSection from '@/components/home/HeroSection'

// Lazy load components yang tidak immediately visible
const StatistikDesa = dynamic(() => import('@/components/home/StatistikDesa'), {
  loading: () => <div className="min-h-[400px]" />,
})

const UmkmDanWisata = dynamic(() => import('@/components/home/UmkmDanWisata'), {
  loading: () => <div className="min-h-[400px]" />,
})

const VisiMisiSection = dynamic(() => import('@/components/home/VisiMisiSection'), {
  loading: () => <div className="min-h-[400px]" />,
})

const TestimonialSection = dynamic(() => import('@/components/home/TestimonialSection'), {
  loading: () => <div className="min-h-[400px]" />,
})

const Footer = dynamic(() => import('@/components/Footer'), {
  loading: () => <div className="min-h-[200px]" />,
})

export default function Home() {
  return (
    <div>
      {/* Navbar sudah ada di root layout, tidak perlu duplikat */}
      <HeroSection />
      <StatistikDesa />
      <UmkmDanWisata />
      <VisiMisiSection />
      <TestimonialSection />
      <Footer />
    </div>
  )
}

