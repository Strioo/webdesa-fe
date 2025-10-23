'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import DockNavbar from '@/components/DockNavbar'
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
      <Navbar />
      <DockNavbar />
      
      <main className="min-h-screen bg-white">
        <HeroLapor onOpenModal={() => setIsModalOpen(true)} />
        <InfoSection />
        <AspirasiBanner onOpenModal={() => setIsModalOpen(true)} />
      </main>

      <Footer />

      {/* Modal - lazy loaded */}
      {isModalOpen && (
        <LaporanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  )
}
