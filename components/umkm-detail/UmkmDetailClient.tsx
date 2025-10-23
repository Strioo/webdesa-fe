'use client'

import UmkmHeader from './UmkmHeader'
import UmkmGallery from './UmkmGallery'
import UmkmInfo from './UmkmInfo'
import type { UmkmDetail } from '@/types/umkm-detail'

interface UmkmDetailClientProps {
  umkmData: UmkmDetail
}

export default function UmkmDetailClient({ umkmData }: UmkmDetailClientProps) {
  return (
    <main className="min-h-screen bg-white">
      {/* Container with top spacing for navbar */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 lg:pt-28 pb-8 sm:pb-12 lg:pb-16">
        
        {/* Gallery Section */}
        <UmkmGallery images={umkmData.images} name={umkmData.name} />

        {/* Header Section */}
        <UmkmHeader
          name={umkmData.name}
          location={umkmData.location}
          foundedYear={umkmData.foundedYear}
          description={umkmData.description}
          category={umkmData.category}
        />

        {/* Contact & Info Section */}
        <UmkmInfo
          address={umkmData.address}
          contact={umkmData.contact}
          operatingHours={umkmData.operatingHours}
          owner={umkmData.owner}
        />
      </div>
    </main>
  )
}
