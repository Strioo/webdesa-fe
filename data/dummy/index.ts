/**
 * ============================================
 * DUMMY DATA - INDEX (BARREL EXPORT)
 * ============================================
 * 
 * Central export untuk semua dummy data.
 * Import dari sini untuk kemudahan penggunaan.
 */

// Profil Desa
export {
  villageProfile,
  villageOfficials,
  villageTimeline,
  villageStats,
  testimonials,
  getPopulationDataByTimeRange
} from './profil'

// Wisata
export {
  wisataData,
  wisataListItems,
  getWisataBySlug,
  getFeaturedWisata,
  getWisataByCategory,
  getWisataCategories
} from './wisata'

// UMKM
export {
  umkmData,
  umkmListItems,
  getUmkmBySlug,
  getFeaturedUmkm,
  getUmkmByCategory,
  getUmkmCategories
} from './umkm'

// Pembangunan
export {
  proyekPembangunanData,
  transparansiDana,
  getProyekByKategori,
  getProyekByStatus,
  getProyekById,
  getAllKategori,
  getStatistikPembangunan
} from './pembangunan'

// Laporan
export {
  laporanData,
  getLaporanByKategori,
  getLaporanByStatus,
  getLaporanById,
  getLaporanByUser,
  getStatistikLaporan,
  LAPORAN_CATEGORY_OPTIONS
} from './laporan'

// Home
export {
  homeStats,
  weatherData,
  publicStats,
  umkmWisataStats,
  chatbotSuggestions,
  heroContent,
  visiMisiContent
} from './home'

// Re-export types
export * from '../types'
