/**
 * ============================================
 * DATA SERVICE - CONFIGURATION
 * ============================================
 * 
 * Konfigurasi untuk memilih sumber data:
 * - 'dummy': Menggunakan data dummy lokal
 * - 'api': Menggunakan API backend asli
 * 
 * Untuk production/portfolio: gunakan 'dummy'
 * Untuk development dengan backend: gunakan 'api'
 */

export type DataSource = 'dummy' | 'api'

// Default ke dummy untuk portfolio
// Ubah ke 'api' jika ingin menggunakan backend asli
export const DATA_SOURCE: DataSource = 
  (process.env.NEXT_PUBLIC_DATA_SOURCE as DataSource) || 'dummy'

// API base URL untuk mode 'api'
export const API_BASE_URL = 
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

// Simulasi delay untuk dummy data (ms)
// Set 0 untuk instant, atau 200-500 untuk simulasi network
export const DUMMY_DELAY = parseInt(process.env.NEXT_PUBLIC_DUMMY_DELAY || '300')

// Helper untuk simulasi delay
export const simulateDelay = async (): Promise<void> => {
  if (DATA_SOURCE === 'dummy' && DUMMY_DELAY > 0) {
    await new Promise(resolve => setTimeout(resolve, DUMMY_DELAY))
  }
}

// Log konfigurasi saat development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  console.log(`🔧 Data Source: ${DATA_SOURCE}`)
  console.log(`🔧 API URL: ${API_BASE_URL}`)
  console.log(`🔧 Dummy Delay: ${DUMMY_DELAY}ms`)
}
