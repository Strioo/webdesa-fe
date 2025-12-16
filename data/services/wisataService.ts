/**
 * ============================================
 * DATA SERVICE - WISATA
 * ============================================
 * 
 * Service layer untuk data wisata.
 * Mendukung switch antara dummy dan API.
 */

import { DATA_SOURCE, simulateDelay, API_BASE_URL } from './config'
import { 
  wisataData, 
  wisataListItems, 
  getWisataBySlug as getDummyBySlug,
  getFeaturedWisata as getDummyFeatured,
  getWisataByCategory as getDummyByCategory,
  getWisataCategories as getDummyCategories
} from '../dummy'
import type { Wisata, WisataListItem, WisataCategory, ApiResponse } from '../types'

// Helper untuk format response
const formatResponse = <T>(data: T, success = true): ApiResponse<T> => ({
  success,
  data,
  message: success ? 'Success' : 'Failed'
})

// Helper untuk handle API errors
const handleApiError = (error: unknown): ApiResponse<null> => {
  console.error('Wisata API Error:', error)
  return {
    success: false,
    error: error instanceof Error ? error.message : 'Unknown error'
  }
}

// ============================================
// SERVICE FUNCTIONS
// ============================================

/**
 * Get all wisata
 */
export async function getAllWisata(): Promise<ApiResponse<WisataListItem[]>> {
  try {
    if (DATA_SOURCE === 'dummy') {
      await simulateDelay()
      const activeWisata = wisataListItems.filter(w => w.isActive)
      return formatResponse(activeWisata)
    }

    // API Mode
    const response = await fetch(`${API_BASE_URL}/wisata/getall`)
    const data = await response.json()
    
    if (!response.ok) throw new Error(data.message)
    
    // Transform API response ke format frontend
    const transformed: WisataListItem[] = (data.data || [])
      .filter((w: any) => w.isAktif)
      .map((w: any) => ({
        id: w.id,
        slug: w.slug,
        name: w.nama,
        description: w.deskripsi?.substring(0, 150) + '...',
        price: w.harga || 0,
        image: w.foto ? `${API_BASE_URL.replace('/api', '')}${w.foto}` : '/assets/images/placeholder.jpg',
        location: w.lokasi || 'Baturaden',
        category: w.kategori as WisataCategory,
        rating: w.rating || 4.0,
        isActive: w.isAktif
      }))
    
    return formatResponse(transformed)
  } catch (error) {
    // Fallback ke dummy jika API error
    console.warn('API failed, falling back to dummy data')
    const activeWisata = wisataListItems.filter(w => w.isActive)
    return formatResponse(activeWisata)
  }
}

/**
 * Get wisata by slug
 */
export async function getWisataBySlug(slug: string): Promise<ApiResponse<Wisata | null>> {
  try {
    if (DATA_SOURCE === 'dummy') {
      await simulateDelay()
      const wisata = getDummyBySlug(slug)
      return wisata 
        ? formatResponse(wisata)
        : { success: false, error: 'Wisata not found' }
    }

    // API Mode
    const response = await fetch(`${API_BASE_URL}/wisata/slug/${slug}`)
    const data = await response.json()
    
    if (!response.ok) throw new Error(data.message)
    
    // Transform API response - sesuaikan dengan struktur Wisata
    const w = data.data
    const transformed: Wisata = {
      id: w.id,
      slug: w.slug,
      name: w.nama,
      description: w.deskripsi,
      category: w.kategori as WisataCategory,
      price: w.harga || 0,
      openTime: w.jamBuka || '08:00',
      closeTime: w.jamTutup || '17:00',
      phone: w.telepon || '',
      images: w.galeri?.map((img: string) => ({
        src: img.startsWith('http') ? img : `${API_BASE_URL.replace('/api', '')}${img}`,
        alt: w.nama
      })) || [],
      facilities: w.fasilitas || [],
      location: {
        lat: w.latitude || -7.3028,
        lng: w.longitude || 109.2341,
        address: w.alamat || w.lokasi || 'Baturaden'
      },
      isActive: w.isAktif,
      isFeatured: w.isFeatured || false,
      rating: w.rating || 4.0,
      reviewCount: w.reviewCount || 0,
      createdAt: w.createdAt,
      updatedAt: w.updatedAt
    }
    
    return formatResponse(transformed)
  } catch (error) {
    // Fallback ke dummy
    const wisata = getDummyBySlug(slug)
    return wisata 
      ? formatResponse(wisata)
      : { success: false, error: 'Wisata not found' }
  }
}

/**
 * Get featured wisata
 */
export async function getFeaturedWisata(): Promise<ApiResponse<Wisata[]>> {
  try {
    if (DATA_SOURCE === 'dummy') {
      await simulateDelay()
      return formatResponse(getDummyFeatured())
    }

    // API mode - get all and filter featured
    const response = await getAllWisata()
    if (!response.success) throw new Error('Failed to fetch')
    
    // Ambil 3 teratas berdasarkan rating
    const featured = (response.data || [])
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3)
    
    // Untuk featured, kita perlu data lengkap
    const fullData = await Promise.all(
      featured.map(w => getWisataBySlug(w.slug))
    )
    
    const validData = fullData
      .filter(r => r.success && r.data)
      .map(r => r.data as Wisata)
    
    return formatResponse(validData)
  } catch (error) {
    return formatResponse(getDummyFeatured())
  }
}

/**
 * Get wisata by category
 */
export async function getWisataByCategory(
  category: WisataCategory
): Promise<ApiResponse<WisataListItem[]>> {
  try {
    if (DATA_SOURCE === 'dummy') {
      await simulateDelay()
      const filtered = wisataListItems.filter(
        w => w.category === category && w.isActive
      )
      return formatResponse(filtered)
    }

    const response = await getAllWisata()
    if (!response.success) throw new Error('Failed to fetch')
    
    const filtered = (response.data || []).filter(w => w.category === category)
    return formatResponse(filtered)
  } catch (error) {
    const filtered = wisataListItems.filter(
      w => w.category === category && w.isActive
    )
    return formatResponse(filtered)
  }
}

/**
 * Get all categories
 */
export async function getWisataCategories(): Promise<ApiResponse<WisataCategory[]>> {
  if (DATA_SOURCE === 'dummy') {
    await simulateDelay()
    return formatResponse(getDummyCategories())
  }

  // Untuk API, kita bisa hardcode atau fetch dari endpoint khusus
  return formatResponse(getDummyCategories())
}

/**
 * Search wisata
 */
export async function searchWisata(
  query: string,
  filters?: {
    category?: WisataCategory
    maxPrice?: number
    location?: string
  }
): Promise<ApiResponse<WisataListItem[]>> {
  try {
    const response = await getAllWisata()
    if (!response.success) throw new Error('Failed to fetch')
    
    let results = response.data || []
    const q = query.toLowerCase()
    
    // Filter by query
    if (query) {
      results = results.filter(w => 
        w.name.toLowerCase().includes(q) ||
        w.description.toLowerCase().includes(q) ||
        w.location.toLowerCase().includes(q)
      )
    }
    
    // Filter by category
    if (filters?.category) {
      results = results.filter(w => w.category === filters.category)
    }
    
    // Filter by max price
    if (filters?.maxPrice) {
      results = results.filter(w => w.price <= filters.maxPrice!)
    }
    
    // Filter by location
    if (filters?.location) {
      const loc = filters.location.toLowerCase()
      results = results.filter(w => w.location.toLowerCase().includes(loc))
    }
    
    return formatResponse(results)
  } catch (error) {
    console.error('Search wisata error:', error)
    return { success: false, data: [], error: 'Search failed' }
  }
}

export default {
  getAllWisata,
  getWisataBySlug,
  getFeaturedWisata,
  getWisataByCategory,
  getWisataCategories,
  searchWisata
}
