import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import DockNavbar from '@/components/DockNavbar'
import Footer from '@/components/Footer'
import UmkmDetailClient from '@/components/umkm-detail/UmkmDetailClient'
import { sampleUmkmData } from '@/types/umkm-detail'

interface PageProps {
  params: {
    slug: string
  }
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const umkmData = sampleUmkmData[params.slug]
  
  if (!umkmData) {
    return {
      title: 'UMKM Tidak Ditemukan | Baturaden',
      description: 'Halaman UMKM yang Anda cari tidak ditemukan'
    }
  }

  return {
    title: `${umkmData.name} | UMKM Baturaden`,
    description: umkmData.description,
    openGraph: {
      title: `${umkmData.name} - UMKM Baturaden`,
      description: umkmData.description,
      images: umkmData.images[0] ? [umkmData.images[0]] : []
    }
  }
}

// Generate static params (optional, for static generation)
export function generateStaticParams() {
  return Object.keys(sampleUmkmData).map((slug) => ({
    slug
  }))
}

export default function UmkmDetailPage({ params }: PageProps) {
  const umkmData = sampleUmkmData[params.slug]

  // Handle 404
  if (!umkmData) {
    notFound()
  }

  return (
    <>
      <Navbar />
      <DockNavbar />
      <UmkmDetailClient umkmData={umkmData} />
      <Footer />
    </>
  )
}
