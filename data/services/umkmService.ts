/**
 * ============================================
 * DATA SERVICE - UMKM
 * ============================================
 * 
 * Service layer untuk data UMKM.
 * Mendukung switch antara dummy dan API.
 */

import { DATA_SOURCE, simulateDelay, API_BASE_URL } from './config'
import { 
  umkmData, 
  umkmListItems, 
  getUmkmBySlug as getDummyBySlug,
  getFeaturedUmkm as getDummyFeatured,
  getUmkmByCategory as getDummyByCategory,
  getUmkmCategories as getDummyCategories
} from '../dummy'
import type { Umkm, UmkmListItem, UmkmCategory, ApiResponse } from '../types'

// Helper untuk format response
const formatResponse = <T>(data: T, success = true): ApiResponse<T> => ({
  success,
  data,
  message: success ? 'Success' : 'Failed'
})

// ============================================
// SERVICE FUNCTIONS
// ============================================

/**
 * Get all UMKM
 */
export async function getAllUmkm(): Promise<ApiResponse<UmkmListItem[]>> {
  try {
    if (DATA_SOURCE === 'dummy') {
      await simulateDelay()
      const activeUmkm = umkmListItems.filter(u => u.isActive)
      return formatResponse(activeUmkm)
    }

    // API Mode
    const response = await fetch(`${API_BASE_URL}/umkm/getall`)
    const data = await response.json()
    
    if (!response.ok) throw new Error(data.message)
    
    // Transform API response
    const transformed: UmkmListItem[] = (data.data || [])
      .filter((u: any) => u.isAktif)
      .map((u: any) => ({
        id: u.slug || u.id,
        slug: u.slug,
        name: u.nama,
        description: u.deskripsi?.substring(0, 150) + '...',
        price: parsePrice(u.harga),
        image: formatImageUrl(u.foto),
        category: u.kategori as UmkmCategory,
        rating: u.rating || 4.0,
        isActive: u.isAktif
      }))
    
    return formatResponse(transformed)
  } catch (error) {
    console.warn('API failed, falling back to dummy data')
    const activeUmkm = umkmListItems.filter(u => u.isActive)
    return formatResponse(activeUmkm)
  }
}

/**
 * Get UMKM by slug
 */
export async function getUmkmBySlug(slug: string): Promise<ApiResponse<Umkm | null>> {
  try {
    if (DATA_SOURCE === 'dummy') {
      await simulateDelay()
      const umkm = getDummyBySlug(slug)
      return umkm 
        ? formatResponse(umkm)
        : { success: false, error: 'UMKM not found' }
    }

    // API Mode
    const response = await fetch(`${API_BASE_URL}/umkm/slug/${slug}`)
    const data = await response.json()
    
    if (!response.ok) throw new Error(data.message)
    
    const u = data.data
    const transformed: Umkm = {
      id: u.id,
      slug: u.slug,
      name: u.nama,
      description: u.deskripsi,
      category: u.kategori as UmkmCategory,
      price: parsePrice(u.harga),
      location: u.lokasi || 'Baturaden',
      address: u.alamat || u.lokasi || '',
      foundedYear: u.tahunBerdiri || 2020,
      images: u.galeri?.map((img: string) => formatImageUrl(img)) || [formatImageUrl(u.foto)],
      menus: u.produk || [],
      contact: {
        phone: u.telepon,
        email: u.email,
        whatsapp: u.whatsapp,
        instagram: u.instagram
      },
      operatingHours: {
        weekday: u.jamBuka,
        weekend: u.jamBukaWeekend
      },
      owner: u.pemilik || '',
      isActive: u.isAktif,
      isFeatured: u.isFeatured || false,
      rating: u.rating || 4.0,
      reviewCount: u.reviewCount || 0,
      createdAt: u.createdAt,
      updatedAt: u.updatedAt
    }
    
    return formatResponse(transformed)
  } catch (error) {
    const umkm = getDummyBySlug(slug)
    return umkm 
      ? formatResponse(umkm)
      : { success: false, error: 'UMKM not found' }
  }
}

/**
 * Get featured UMKM
 */
export async function getFeaturedUmkm(): Promise<ApiResponse<Umkm[]>> {
  try {
    if (DATA_SOURCE === 'dummy') {
      await simulateDelay()
      return formatResponse(getDummyFeatured())
    }

    const response = await getAllUmkm()
    if (!response.success) throw new Error('Failed to fetch')
    
    const featured = (response.data || [])
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 3)
    
    const fullData = await Promise.all(
      featured.map(u => getUmkmBySlug(u.slug))
    )
    
    const validData = fullData
      .filter(r => r.success && r.data)
      .map(r => r.data as Umkm)
    
    return formatResponse(validData)
  } catch (error) {
    return formatResponse(getDummyFeatured())
  }
}

/**
 * Get UMKM by category
 */
export async function getUmkmByCategory(
  category: UmkmCategory
): Promise<ApiResponse<UmkmListItem[]>> {
  try {
    if (DATA_SOURCE === 'dummy') {
      await simulateDelay()
      const filtered = umkmListItems.filter(
        u => u.category === category && u.isActive
      )
      return formatResponse(filtered)
    }

    const response = await getAllUmkm()
    if (!response.success) throw new Error('Failed to fetch')
    
    const filtered = (response.data || []).filter(u => u.category === category)
    return formatResponse(filtered)
  } catch (error) {
    const filtered = umkmListItems.filter(
      u => u.category === category && u.isActive
    )
    return formatResponse(filtered)
  }
}

/**
 * Get all categories
 */
export async function getUmkmCategories(): Promise<ApiResponse<UmkmCategory[]>> {
  if (DATA_SOURCE === 'dummy') {
    await simulateDelay()
    return formatResponse(getDummyCategories())
  }
  return formatResponse(getDummyCategories())
}

/**
 * Search UMKM
 */
export async function searchUmkm(
  query: string,
  filters?: {
    category?: UmkmCategory
    maxPrice?: number
  }
): Promise<ApiResponse<UmkmListItem[]>> {
  try {
    const response = await getAllUmkm()
    if (!response.success) throw new Error('Failed to fetch')
    
    let results = response.data || []
    const q = query.toLowerCase()
    
    if (query) {
      results = results.filter(u => 
        u.name.toLowerCase().includes(q) ||
        u.description.toLowerCase().includes(q)
      )
    }
    
    if (filters?.category) {
      results = results.filter(u => u.category === filters.category)
    }
    
    if (filters?.maxPrice) {
      results = results.filter(u => u.price <= filters.maxPrice!)
    }
    
    return formatResponse(results)
  } catch (error) {
    console.error('Search UMKM error:', error)
    return { success: false, data: [], error: 'Search failed' }
  }
}

// ============================================
// HELPERS
// ============================================

function parsePrice(harga: any): number {
  if (!harga) return 0
  if (typeof harga === 'number') return harga
  if (typeof harga === 'string') {
    const numericString = harga.replace(/[^\d,.-]/g, '')
    return parseFloat(numericString.replace(',', '')) || 0
  }
  return 0
}

function formatImageUrl(foto: string | null): string {
  if (!foto) return '/assets/images/placeholder.jpg'
  if (foto.startsWith('http')) return foto
  return `${API_BASE_URL.replace('/api', '')}${foto}`
}

export default {
  getAllUmkm,
  getUmkmBySlug,
  getFeaturedUmkm,
  getUmkmByCategory,
  getUmkmCategories,
  searchUmkm
}
