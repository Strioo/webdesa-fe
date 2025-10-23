import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import HeroPembangunan from '@/components/pembangunan/HeroPembangunan'
import TransparansiDanaDesa from '@/components/pembangunan/TransparansiDanaDesa'
import AspirasiBanner from '@/components/pembangunan/AspirasiBanner'
import Footer from '@/components/Footer'
import { SectionSkeleton } from '@/components/ui/skeletons'
import type { Metadata } from 'next'

// Lazy load gallery component
const GalleryPembangunan = dynamic(
  () => import('@/components/pembangunan/GalleryPembangunan'),
  {
    loading: () => <SectionSkeleton />,
    ssr: true,
  }
)

export const metadata: Metadata = {
  title: 'Pembangunan Desa | Baturaden',
  description: 'Perkembangan dan Transparansi Pembangunan di Baturaden - Proyek infrastruktur, transparansi dana desa, dan layanan aspirasi masyarakat',
}

export default function PembangunanPage() {
  return (
    <>
      <HeroPembangunan />
      <TransparansiDanaDesa />
      <Suspense fallback={<SectionSkeleton />}>
        <GalleryPembangunan />
      </Suspense>
      <AspirasiBanner />
      <Footer />
    </>
  )
}
