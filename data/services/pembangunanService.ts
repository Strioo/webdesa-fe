/**
 * ============================================
 * DATA SERVICE - PEMBANGUNAN
 * ============================================
 * 
 * Service layer untuk data pembangunan desa.
 * Mendukung switch antara dummy dan API.
 */

import { DATA_SOURCE, simulateDelay, API_BASE_URL } from './config'
import { 
  proyekPembangunanData,
  transparansiDana,
  getProyekByKategori as getDummyByKategori,
  getProyekByStatus as getDummyByStatus,
  getProyekById as getDummyById,
  getAllKategori as getDummyKategori,
  getStatistikPembangunan as getDummyStatistik
} from '../dummy'
import type { 
  ProyekPembangunan, 
  TransparansiDana,
  PembangunanKategori, 
  PembangunanStatus,
  ApiResponse 
} from '../types'

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
 * Get all proyek pembangunan
 */
export async function getAllProyek(): Promise<ApiResponse<ProyekPembangunan[]>> {
  try {
    if (DATA_SOURCE === 'dummy') {
      await simulateDelay()
      return formatResponse(proyekPembangunanData)
    }

    // API Mode
    const response = await fetch(`${API_BASE_URL}/program/getall`)
    const data = await response.json()
    
    if (!response.ok) throw new Error(data.message)
    
    // Transform jika perlu
    const transformed: ProyekPembangunan[] = (data.data || []).map((p: any) => ({
      id: p.id,
      nama: p.nama,
      deskripsi: p.deskripsi,
      kategori: p.kategori as PembangunanKategori,
      anggaran: p.anggaran,
      realisasiAnggaran: p.realisasiAnggaran,
      sumberDana: p.sumberDana,
      timeline: typeof p.timeline === 'string' ? JSON.parse(p.timeline) : p.timeline,
      status: p.status as PembangunanStatus,
      progress: p.progress,
      foto: formatImageUrl(p.foto),
      galeri: p.galeri?.map(formatImageUrl),
      penanggungJawab: p.penanggungJawab,
      kontraktor: p.kontraktor,
      lokasi: p.lokasi,
      manfaat: p.manfaat,
      createdAt: p.createdAt,
      updatedAt: p.updatedAt
    }))
    
    return formatResponse(transformed)
  } catch (error) {
    console.warn('API failed, falling back to dummy data')
    return formatResponse(proyekPembangunanData)
  }
}

/**
 * Get proyek by ID
 */
export async function getProyekById(id: string): Promise<ApiResponse<ProyekPembangunan | null>> {
  try {
    if (DATA_SOURCE === 'dummy') {
      await simulateDelay()
      const proyek = getDummyById(id)
      return proyek 
        ? formatResponse(proyek)
        : { success: false, error: 'Proyek not found' }
    }

    const response = await fetch(`${API_BASE_URL}/program/get/${id}`)
    const data = await response.json()
    
    if (!response.ok) throw new Error(data.message)
    
    return formatResponse(data.data)
  } catch (error) {
    const proyek = getDummyById(id)
    return proyek 
      ? formatResponse(proyek)
      : { success: false, error: 'Proyek not found' }
  }
}

/**
 * Get proyek by kategori
 */
export async function getProyekByKategori(
  kategori: PembangunanKategori
): Promise<ApiResponse<ProyekPembangunan[]>> {
  try {
    if (DATA_SOURCE === 'dummy') {
      await simulateDelay()
      return formatResponse(getDummyByKategori(kategori))
    }

    const response = await getAllProyek()
    if (!response.success) throw new Error('Failed to fetch')
    
    const filtered = (response.data || []).filter(p => p.kategori === kategori)
    return formatResponse(filtered)
  } catch (error) {
    return formatResponse(getDummyByKategori(kategori))
  }
}

/**
 * Get proyek by status
 */
export async function getProyekByStatus(
  status: PembangunanStatus
): Promise<ApiResponse<ProyekPembangunan[]>> {
  try {
    if (DATA_SOURCE === 'dummy') {
      await simulateDelay()
      return formatResponse(getDummyByStatus(status))
    }

    const response = await getAllProyek()
    if (!response.success) throw new Error('Failed to fetch')
    
    const filtered = (response.data || []).filter(p => p.status === status)
    return formatResponse(filtered)
  } catch (error) {
    return formatResponse(getDummyByStatus(status))
  }
}

/**
 * Get all kategori
 */
export async function getAllKategori(): Promise<ApiResponse<PembangunanKategori[]>> {
  if (DATA_SOURCE === 'dummy') {
    await simulateDelay()
    return formatResponse(getDummyKategori())
  }
  return formatResponse(getDummyKategori())
}

/**
 * Get statistik pembangunan
 */
export async function getStatistikPembangunan(): Promise<ApiResponse<ReturnType<typeof getDummyStatistik>>> {
  try {
    if (DATA_SOURCE === 'dummy') {
      await simulateDelay()
      return formatResponse(getDummyStatistik())
    }

    const response = await getAllProyek()
    if (!response.success) throw new Error('Failed to fetch')
    
    const data = response.data || []
    const total = data.length
    const selesai = data.filter(p => p.status === 'Selesai').length
    const berlangsung = data.filter(p => p.status === 'Berlangsung').length
    const perencanaan = data.filter(p => p.status === 'Perencanaan').length
    
    const totalAnggaran = data.reduce((sum, p) => sum + p.anggaran, 0)
    const totalRealisasi = data.reduce((sum, p) => sum + (p.realisasiAnggaran || 0), 0)
    
    return formatResponse({
      total,
      selesai,
      berlangsung,
      perencanaan,
      totalAnggaran,
      totalRealisasi,
      persentaseRealisasi: Math.round((totalRealisasi / totalAnggaran) * 100)
    })
  } catch (error) {
    return formatResponse(getDummyStatistik())
  }
}

/**
 * Get transparansi dana
 */
export async function getTransparansiDana(): Promise<ApiResponse<TransparansiDana>> {
  try {
    if (DATA_SOURCE === 'dummy') {
      await simulateDelay()
      return formatResponse(transparansiDana)
    }

    // API mode - sesuaikan dengan endpoint yang tersedia
    const response = await fetch(`${API_BASE_URL}/dashboard/transparansi-dana`)
    const data = await response.json()
    
    if (!response.ok) throw new Error(data.message)
    
    return formatResponse(data.data)
  } catch (error) {
    return formatResponse(transparansiDana)
  }
}

// ============================================
// HELPERS
// ============================================

function formatImageUrl(foto: string | null | undefined): string {
  if (!foto) return '/assets/images/placeholder.jpg'
  if (foto.startsWith('http')) return foto
  return `${API_BASE_URL.replace('/api', '')}${foto}`
}

export default {
  getAllProyek,
  getProyekById,
  getProyekByKategori,
  getProyekByStatus,
  getAllKategori,
  getStatistikPembangunan,
  getTransparansiDana
}
