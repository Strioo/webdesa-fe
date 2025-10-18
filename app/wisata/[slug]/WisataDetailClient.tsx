'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import DockNavbar from '@/components/DockNavbar'
import GalleryPreview from '@/components/wisata-detail/GalleryPreview'
import GalleryModal from '@/components/wisata-detail/GalleryModal'
import TicketPane from '@/components/wisata-detail/TicketPane'
import FacilitiesList from '@/components/wisata-detail/FacilitiesList'
import MapEmbed from '@/components/wisata-detail/MapEmbed'
import Description from '@/components/wisata-detail/Description'
import TermsModal from '@/components/wisata-detail/TermsModal'
import { TourismDestination } from '@/lib/types'

interface WisataDetailClientProps {
  destination: TourismDestination
}

export default function WisataDetailClient({ destination }: WisataDetailClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false)
  const [modalInitialIndex, setModalInitialIndex] = useState(0)

  const handleOpenModal = (index: number) => {
    setModalInitialIndex(index)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleOpenTermsModal = () => {
    setIsTermsModalOpen(true)
  }

  const handleCloseTermsModal = () => {
    setIsTermsModalOpen(false)
  }

  const handleBuyTicketFromModal = () => {
    // Close modal and scroll to ticket pane
    setIsModalOpen(false)
    setTimeout(() => {
      document.getElementById('ticket-pane')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-neutral-50 pt-20 pb-20 lg:pb-8">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <motion.nav
            className="mb-6"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            <ol className="flex items-center gap-2 text-sm text-neutral-600">
              <li>
                <a href="/" className="hover:text-[#5B903A] transition-colors">
                  Home
                </a>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </li>
              <li>
                <a
                  href="/wisata"
                  className="hover:text-[#5B903A] transition-colors"
                >
                  Wisata
                </a>
              </li>
              <li>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </li>
              <li className="text-neutral-900 font-medium">
                {destination.name}
              </li>
            </ol>
          </motion.nav>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Gallery & Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Gallery Preview */}
              <GalleryPreview
                images={destination.images}
                onOpenModal={handleOpenModal}
              />

              {/* Description */}
              <Description description={destination.description} />

              {/* Facilities */}
              <FacilitiesList facilities={destination.facilities} />

              {/* Map */}
              <MapEmbed location={destination.location} />
            </div>

            {/* Right Column: Ticket Pane */}
            <div id="ticket-pane">
              <TicketPane
                destinationId={destination.id}
                destinationName={destination.name}
                category={destination.category}
                price={destination.price}
                openTime={destination.openTime}
                closeTime={destination.closeTime}
                phone={destination.phone}
                onTermsClick={handleOpenTermsModal}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Gallery Modal */}
      <GalleryModal
        images={destination.images}
        initialIndex={modalInitialIndex}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        destinationName={destination.name}
        price={destination.price}
        onBuyTicket={handleBuyTicketFromModal}
      />

      {/* Terms Modal */}
      <TermsModal
        isOpen={isTermsModalOpen}
        onClose={handleCloseTermsModal}
      />

      {/* Mobile/Tablet Dock Navigation */}
      <DockNavbar />
    </>
  )
}
