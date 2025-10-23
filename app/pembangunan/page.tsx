import HeroPembangunan from '@/components/pembangunan/HeroPembangunan'
import GalleryPembangunan from '@/components/pembangunan/GalleryPembangunan'
import TransparansiDanaDesa from '@/components/pembangunan/TransparansiDanaDesa'
import AspirasiBanner from '@/components/pembangunan/AspirasiBanner'
import Navbar from '@/components/Navbar'
import DockNavbar from '@/components/DockNavbar'
import Footer from '@/components/Footer'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Pembangunan Desa | Baturaden',
  description: 'Perkembangan dan Transparansi Pembangunan di Baturaden - Proyek infrastruktur, transparansi dana desa, dan layanan aspirasi masyarakat',
}

export default function PembangunanPage() {
  return (
    <>
      <Navbar />
      <DockNavbar />
      <main className="min-h-screen bg-white overflow-x-hidden">
        <HeroPembangunan />
        <TransparansiDanaDesa />
        <GalleryPembangunan />
        <AspirasiBanner />
      </main>
      <Footer />
    </>
  )
}
