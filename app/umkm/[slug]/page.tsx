import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import UmkmDetailClient from './UmkmDetailClient'
import { getUmkmBySlug } from '@/data/services'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

// Server Component - Fetch data
export default async function UmkmDetailPage({ params }: PageProps) {
  // ✅ Await params first before accessing properties
  const resolvedParams = await params
  const response = await getUmkmBySlug(resolvedParams.slug)

  // Handle response and check for null data
  if (!response.success || !response.data) {
    notFound()
  }

  const umkm = response.data

  // Transform data from Umkm type to UmkmDetailClient props
  const transformedData = {
    id: umkm.id,
    nama: umkm.name,
    deskripsi: umkm.description,
    pemilik: umkm.owner || 'N/A',
    alamat: umkm.address,
    kontak: umkm.contact.phone || umkm.contact.whatsapp || '',
    harga: umkm.price,
    kategori: umkm.category,
    foto: umkm.images[0] || '/assets/images/placeholder.jpg',
    gambar: umkm.images && umkm.images.length > 0 
      ? umkm.images
      : [umkm.images[0] || '/assets/images/placeholder.jpg'],
    jamBuka: umkm.operatingHours?.weekday?.split(' - ')[0] || '08:00',
    jamTutup: umkm.operatingHours?.weekday?.split(' - ')[1]?.replace(' WIB', '') || '17:00',
    produk: umkm.menus?.map(menu => menu.name) || []
  }

  return <UmkmDetailClient umkmData={transformedData} />
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // ✅ Await params first before accessing properties
  const resolvedParams = await params
  const response = await getUmkmBySlug(resolvedParams.slug)

  if (!response.success || !response.data) {
    return {
      title: 'UMKM Tidak Ditemukan',
    }
  }

  const umkm = response.data

  return {
    title: `${umkm.name} | UMKM Baturaden`,
    description: umkm.description.substring(0, 160),
  }
}