import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import UmkmDetailClient from './UmkmDetailClient'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

// Fetch UMKM data from API by slug
async function getUmkmBySlug(slug: string) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.18.3:5000'
    const response = await fetch(`${baseUrl}/umkm/slug/${slug}`, {
      cache: 'no-store'
    })
    
    if (!response.ok) {
      console.error(`Failed to fetch UMKM: ${response.status}`)
      return null
    }
    
    const result = await response.json()
    console.log('UMKM API Response:', result)
    return result.success ? result.data : null
  } catch (error) {
    console.error('Error fetching UMKM:', error)
    return null
  }
}

// Helper to format image URL
const getImageUrl = (foto: string | null): string => {
  if (!foto) return '/assets/images/placeholder.jpg'
  if (foto.startsWith('http')) return foto
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.18.3:5000'
  return `${baseUrl}${foto}`
}

// Helper to parse produk string to array
const parseProduk = (produk: any): string[] => {
  if (!produk) return []
  if (Array.isArray(produk)) return produk
  if (typeof produk === 'string') {
    return produk.split(/[\n,]+/).map(p => p.trim()).filter(p => p.length > 0)
  }
  return []
}

// Helper to parse harga
const parseHarga = (harga: any): number => {
  if (!harga) return 0
  if (typeof harga === 'number') return harga
  if (typeof harga === 'string') {
    const numericString = harga.replace(/[^\d,.-]/g, '')
    return parseFloat(numericString.replace(',', '')) || 0
  }
  return 0
}

// Server Component - Fetch data
export default async function UmkmDetailPage({ params }: PageProps) {
  // ✅ Await params first before accessing properties
  const resolvedParams = await params
  const umkm = await getUmkmBySlug(resolvedParams.slug)

  if (!umkm) {
    notFound()
  }

  // Transform API data
  const transformedData = {
    id: umkm.slug || umkm.id,
    nama: umkm.nama,
    deskripsi: umkm.deskripsi,
    pemilik: umkm.pemilik,
    alamat: umkm.alamat,
    kontak: umkm.kontak || '',
    harga: parseHarga(umkm.harga),
    kategori: umkm.kategori,
    foto: getImageUrl(umkm.foto),
    gambar: umkm.gambar && Array.isArray(umkm.gambar) && umkm.gambar.length > 0 
      ? umkm.gambar.map((img: string) => getImageUrl(img))
      : [getImageUrl(umkm.foto)],
    jamBuka: umkm.jamBuka || '08:00',
    jamTutup: umkm.jamTutup || '17:00',
    produk: parseProduk(umkm.produk)
  }

  return <UmkmDetailClient umkmData={transformedData} />
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  // ✅ Await params first before accessing properties
  const resolvedParams = await params
  const umkm = await getUmkmBySlug(resolvedParams.slug)

  if (!umkm) {
    return {
      title: 'UMKM Tidak Ditemukan',
    }
  }

  return {
    title: `${umkm.nama} | UMKM Baturaden`,
    description: umkm.deskripsi.substring(0, 160),
  }
}