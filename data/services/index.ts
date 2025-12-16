/**
 * ============================================
 * DATA SERVICES - INDEX (BARREL EXPORT)
 * ============================================
 * 
 * Central export untuk semua data services.
 * Import dari sini untuk kemudahan penggunaan.
 */

// Configuration
export { DATA_SOURCE, API_BASE_URL, DUMMY_DELAY, simulateDelay } from './config'

// Wisata Service
export {
  getAllWisata,
  getWisataBySlug,
  getFeaturedWisata,
  getWisataByCategory,
  getWisataCategories,
  searchWisata
} from './wisataService'

// UMKM Service
export {
  getAllUmkm,
  getUmkmBySlug,
  getFeaturedUmkm,
  getUmkmByCategory,
  getUmkmCategories,
  searchUmkm
} from './umkmService'

// Pembangunan Service
export {
  getAllProyek,
  getProyekById,
  getProyekByKategori,
  getProyekByStatus,
  getAllKategori,
  getStatistikPembangunan,
  getTransparansiDana
} from './pembangunanService'

// Laporan Service
export {
  getAllLaporan,
  getLaporanById,
  getLaporanByUser,
  getLaporanByKategori,
  getLaporanByStatus,
  getStatistikLaporan,
  createLaporan,
  getCategoryOptions
} from './laporanService'

// Profil & Home Service
export {
  getVillageProfile,
  getVillageOfficials,
  getVillageTimeline,
  getVillageStats,
  getHomeStats,
  getWeatherData,
  getPublicStats,
  getUmkmWisataStats,
  getTestimonials,
  getHeroContent,
  getVisiMisiContent,
  getChatbotSuggestions,
  sendChatbotMessage
} from './profilService'

// Re-export types
export * from '../types'

// ============================================
// Unified API Object (Optional)
// ============================================
// Untuk penggunaan yang lebih terstruktur

import wisataService from './wisataService'
import umkmService from './umkmService'
import pembangunanService from './pembangunanService'
import laporanService from './laporanService'
import profilService from './profilService'

export const dataServices = {
  wisata: wisataService,
  umkm: umkmService,
  pembangunan: pembangunanService,
  laporan: laporanService,
  profil: profilService
}

export default dataServices
