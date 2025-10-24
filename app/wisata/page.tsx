import { Suspense } from 'react'
import Footer from '@/components/Footer'
import HeroWisata from '@/components/wisata/HeroWisata'
import DestinationsIntro from '@/components/wisata/DestinationsIntro'
import DestinationsGrid from '@/components/wisata/DestinationsGrid'
import { SectionSkeleton } from '@/components/ui/skeletons'
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
    <div>
      <HeroWisata />
      <DestinationsIntro />
      <Suspense fallback={<SectionSkeleton />}>
        <DestinationsGrid searchParams={searchParams} />
      </Suspense>
      <Footer />
    </div>
  )
}
