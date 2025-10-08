'use client'

import Navbar from '@/components/Navbar'
import HeroSection from '@/components/home/HeroSection'
import StatistikDesa from '@/components/home/StatistikDesa'
import UmkmDanWisata from '@/components/home/UmkmDanWisata'
import VisiMisiSection from '@/components/home/VisiMisiSection'
import TestimonialSection from '@/components/home/TestimonialSection'
import Footer from '@/components/Footer'

export default function Home() {

  return (
    <div>
      <Navbar />
      <HeroSection />
      <StatistikDesa />
      <UmkmDanWisata />
      <VisiMisiSection />
      <TestimonialSection />
      <Footer />
    </div>
  )
}

