import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import WisataDetailClientNew from './WisataDetailClient'
import { getWisataBySlug } from '@/data/services'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

// Server Component - Fetch data
export default async function WisataDetailPage({ params }: PageProps) {
  // Await params first before accessing properties
  const resolvedParams = await params
  const response = await getWisataBySlug(resolvedParams.slug)

  // Handle response and check for null data
  if (!response.success || !response.data) {
    notFound()
  }

  const wisata = response.data

  // Transform data from Wisata type to WisataDetailClient props
  const transformedData = {
    id: wisata.id,
    slug: wisata.slug,
    nama: wisata.name,
    deskripsi: wisata.description,
    lokasi: wisata.location.address,
    kategori: wisata.category,
    harga: wisata.price,
    jamBuka: wisata.openTime,
    jamTutup: wisata.closeTime,
    kontak: wisata.phone,
    foto: wisata.images[0]?.src || '/assets/images/wisata-default.jpg',
    gambar: wisata.images.map(img => img.src),
    fasilitas: wisata.facilities.map(f => ({
      nama: f.label,
      icon: f.key
    })),
    latitude: wisata.location.lat,
    longitude: wisata.location.lng
  }

  return <WisataDetailClientNew wisataData={transformedData} />
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params
  const response = await getWisataBySlug(resolvedParams.slug)

  if (!response.success || !response.data) {
    return {
      title: 'Wisata Tidak Ditemukan',
    }
  }

  const wisata = response.data

  return {
    title: `${wisata.name} | Wisata Baturaden`,
    description: wisata.description.substring(0, 160),
  }
}
