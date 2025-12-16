/**
 * ============================================
 * DATA SERVICE - LAPORAN
 * ============================================
 * 
 * Service layer untuk data laporan masyarakat.
 * Mendukung switch antara dummy dan API.
 */

import { DATA_SOURCE, simulateDelay, API_BASE_URL } from './config'
import { 
  laporanData,
  getLaporanByKategori as getDummyByKategori,
  getLaporanByStatus as getDummyByStatus,
  getLaporanById as getDummyById,
  getLaporanByUser as getDummyByUser,
  getStatistikLaporan as getDummyStatistik,
  LAPORAN_CATEGORY_OPTIONS
} from '../dummy'
import type { 
  Laporan, 
  LaporanKategori, 
  LaporanStatus,
  LaporanFormData,
  ApiResponse 
} from '../types'

// Helper untuk format response
const formatResponse = <T>(data: T, success = true): ApiResponse<T> => ({
  success,
  data,
  message: success ? 'Success' : 'Failed'
})

// Get auth token (untuk mode API)
const getAuthToken = () => {
  if (typeof document !== 'undefined') {
    const cookies = document.cookie.split(';')
    const authCookie = cookies.find(cookie => cookie.trim().startsWith('auth-token='))
    return authCookie ? authCookie.split('=')[1] : null
  }
  return null
}

// ============================================
// SERVICE FUNCTIONS
// ============================================

/**
 * Get all laporan
 */
export async function getAllLaporan(): Promise<ApiResponse<Laporan[]>> {
  try {
    if (DATA_SOURCE === 'dummy') {
      await simulateDelay()
      return formatResponse(laporanData)
    }

    const token = getAuthToken()
    const response = await fetch(`${API_BASE_URL}/laporan/getall`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
    const data = await response.json()
    
    if (!response.ok) throw new Error(data.message)
    
    // Transform API response
    const transformed: Laporan[] = (data.data || []).map((l: any) => ({
      id: l.id,
      title: l.judul || l.title,
      description: l.deskripsi || l.description,
      category: l.kategori as LaporanKategori,
      location: l.lokasi || l.location,
      photo: l.foto ? formatImageUrl(l.foto) : undefined,
      status: mapStatus(l.status),
      tanggapan: l.tanggapan,
      tanggapanDate: l.tanggapanDate,
      userId: l.userId,
      userName: l.user?.name || l.userName || 'Anonymous',
      userEmail: l.user?.email,
      isAnonymous: l.isAnonymous || false,
      priority: l.priority,
      createdAt: l.createdAt,
      updatedAt: l.updatedAt
    }))
    
    return formatResponse(transformed)
  } catch (error) {
    console.warn('API failed, falling back to dummy data')
    return formatResponse(laporanData)
  }
}

/**
 * Get laporan by ID
 */
export async function getLaporanById(id: string): Promise<ApiResponse<Laporan | null>> {
  try {
    if (DATA_SOURCE === 'dummy') {
      await simulateDelay()
      const laporan = getDummyById(id)
      return laporan 
        ? formatResponse(laporan)
        : { success: false, error: 'Laporan not found' }
    }

    const token = getAuthToken()
    const response = await fetch(`${API_BASE_URL}/laporan/get/${id}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
    const data = await response.json()
    
    if (!response.ok) throw new Error(data.message)
    
    return formatResponse(data.data)
  } catch (error) {
    const laporan = getDummyById(id)
    return laporan 
      ? formatResponse(laporan)
      : { success: false, error: 'Laporan not found' }
  }
}

/**
 * Get laporan by user ID
 */
export async function getLaporanByUser(userId: string): Promise<ApiResponse<Laporan[]>> {
  try {
    if (DATA_SOURCE === 'dummy') {
      await simulateDelay()
      return formatResponse(getDummyByUser(userId))
    }

    const token = getAuthToken()
    const response = await fetch(`${API_BASE_URL}/laporan/user/get/${userId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
    const data = await response.json()
    
    if (!response.ok) throw new Error(data.message)
    
    return formatResponse(data.data || [])
  } catch (error) {
    return formatResponse(getDummyByUser(userId))
  }
}

/**
 * Get laporan by kategori
 */
export async function getLaporanByKategori(
  kategori: LaporanKategori
): Promise<ApiResponse<Laporan[]>> {
  try {
    if (DATA_SOURCE === 'dummy') {
      await simulateDelay()
      return formatResponse(getDummyByKategori(kategori))
    }

    const response = await getAllLaporan()
    if (!response.success) throw new Error('Failed to fetch')
    
    const filtered = (response.data || []).filter(l => l.category === kategori)
    return formatResponse(filtered)
  } catch (error) {
    return formatResponse(getDummyByKategori(kategori))
  }
}

/**
 * Get laporan by status
 */
export async function getLaporanByStatus(
  status: LaporanStatus
): Promise<ApiResponse<Laporan[]>> {
  try {
    if (DATA_SOURCE === 'dummy') {
      await simulateDelay()
      return formatResponse(getDummyByStatus(status))
    }

    const response = await getAllLaporan()
    if (!response.success) throw new Error('Failed to fetch')
    
    const filtered = (response.data || []).filter(l => l.status === status)
    return formatResponse(filtered)
  } catch (error) {
    return formatResponse(getDummyByStatus(status))
  }
}

/**
 * Get statistik laporan
 */
export async function getStatistikLaporan(): Promise<ApiResponse<ReturnType<typeof getDummyStatistik>>> {
  try {
    if (DATA_SOURCE === 'dummy') {
      await simulateDelay()
      return formatResponse(getDummyStatistik())
    }

    const response = await getAllLaporan()
    if (!response.success) throw new Error('Failed to fetch')
    
    const data = response.data || []
    const total = data.length
    const menunggu = data.filter(l => l.status === 'Menunggu').length
    const diproses = data.filter(l => l.status === 'Diproses').length
    const selesai = data.filter(l => l.status === 'Selesai').length
    const ditolak = data.filter(l => l.status === 'Ditolak').length

    const byCategory = {
      infrastruktur: data.filter(l => l.category === 'INFRASTRUKTUR').length,
      kesehatan: data.filter(l => l.category === 'KESEHATAN').length,
      pendidikan: data.filter(l => l.category === 'PENDIDIKAN').length,
      lingkungan: data.filter(l => l.category === 'LINGKUNGAN').length,
      keamanan: data.filter(l => l.category === 'KEAMANAN').length,
      lainnya: data.filter(l => l.category === 'LAINNYA').length,
    }
    
    return formatResponse({
      total,
      menunggu,
      diproses,
      selesai,
      ditolak,
      byCategory,
      persentaseSelesai: Math.round((selesai / total) * 100)
    })
  } catch (error) {
    return formatResponse(getDummyStatistik())
  }
}

/**
 * Create new laporan (dummy mode: simulasi saja)
 */
export async function createLaporan(
  formData: LaporanFormData
): Promise<ApiResponse<{ id: string }>> {
  try {
    if (DATA_SOURCE === 'dummy') {
      await simulateDelay()
      // Simulasi create - return dummy ID
      const newId = `laporan-${Date.now()}`
      console.log('📝 Dummy mode: Laporan created', { id: newId, ...formData })
      return formatResponse({ id: newId })
    }

    // API Mode
    const token = getAuthToken()
    const form = new FormData()
    form.append('judul', formData.title)
    form.append('deskripsi', formData.description)
    form.append('kategori', formData.category)
    if (formData.location) form.append('lokasi', formData.location)
    if (formData.photo) form.append('foto', formData.photo)

    const response = await fetch(`${API_BASE_URL}/laporan/create`, {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: form
    })
    const data = await response.json()
    
    if (!response.ok) throw new Error(data.message)
    
    return formatResponse({ id: data.data?.id || data.id })
  } catch (error) {
    console.error('Create laporan error:', error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create laporan' 
    }
  }
}

/**
 * Get category options
 */
export function getCategoryOptions() {
  return LAPORAN_CATEGORY_OPTIONS
}

// ============================================
// HELPERS
// ============================================

function formatImageUrl(foto: string | null | undefined): string {
  if (!foto) return '/assets/images/placeholder.jpg'
  if (foto.startsWith('http')) return foto
  return `${API_BASE_URL.replace('/api', '')}${foto}`
}

function mapStatus(status: string): LaporanStatus {
  const statusMap: Record<string, LaporanStatus> = {
    'MENUNGGU': 'Menunggu',
    'PENDING': 'Menunggu',
    'DIPROSES': 'Diproses',
    'PROCESSING': 'Diproses',
    'SELESAI': 'Selesai',
    'COMPLETED': 'Selesai',
    'DONE': 'Selesai',
    'DITOLAK': 'Ditolak',
    'REJECTED': 'Ditolak'
  }
  return statusMap[status?.toUpperCase()] || status as LaporanStatus
}

export default {
  getAllLaporan,
  getLaporanById,
  getLaporanByUser,
  getLaporanByKategori,
  getLaporanByStatus,
  getStatistikLaporan,
  createLaporan,
  getCategoryOptions
}
