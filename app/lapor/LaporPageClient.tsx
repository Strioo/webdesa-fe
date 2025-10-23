'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import DockNavbar from '@/components/DockNavbar'
import Footer from '@/components/Footer'
import HeroLapor from '@/components/lapor/HeroLapor'
import LaporanModal from '@/components/lapor/LaporanModal'
import InfoSection from '@/components/lapor/InfoSection'
import AspirasiBanner from '@/components/lapor/AspirasiBanner'

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

      {/* Modal */}
      <LaporanModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}
