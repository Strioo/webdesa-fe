import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import HeroWisata from '@/components/wisata/HeroWisata'
import DestinationsIntro from '@/components/wisata/DestinationsIntro'
import DestinationsGrid from '@/components/wisata/DestinationsGrid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wisata Alam Baturaden | Destinasi Wisata Terbaik',
  description: 'Jelajahi keindahan wisata alam Baturaden. Temukan destinasi terbaik untuk liburan keluarga, adventure, dan healing di pegunungan.',
}

interface WisataPageProps {
  searchParams: {
    q?: string
    loc?: string
    max?: string
  }
}

export default function WisataPage({ searchParams }: WisataPageProps) {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden pb-20 lg:pb-0">
      <Navbar />
      <HeroWisata />
      <DestinationsIntro />
      <DestinationsGrid searchParams={searchParams} />
      <Footer />
    </main>
  )
}
