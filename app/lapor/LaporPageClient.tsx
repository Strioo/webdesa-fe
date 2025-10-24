'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Footer from '@/components/Footer'
import HeroLapor from '@/components/lapor/HeroLapor'
import InfoSection from '@/components/lapor/InfoSection'
import AspirasiBanner from '@/components/lapor/AspirasiBanner'

// Lazy load modal component - only loaded when needed
const LaporanModal = dynamic(() => import('@/components/lapor/LaporanModal'), {
  ssr: false,
})

export default function LaporPageClient() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      {/* Navbar & DockNavbar sudah ada di ConditionalNavbar (root layout) */}
      
        <HeroLapor onOpenModal={() => setIsModalOpen(true)} />
        <InfoSection />
        <AspirasiBanner onOpenModal={() => setIsModalOpen(true)} />

      <Footer />

      {/* Modal - lazy loaded */}
      {isModalOpen && (
        <LaporanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  )
}
