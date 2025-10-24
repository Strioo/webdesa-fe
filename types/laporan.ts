export interface LaporanFormData {
  title: string
  description: string
  category: '' | 'INFRASTRUKTUR' | 'KESEHATAN' | 'PENDIDIKAN' | 'LINGKUNGAN' | 'KEAMANAN' | 'LAINNYA'
  location?: string
  photo?: File
}

export interface LaporanValidationError {
  title?: string
  description?: string
  category?: string
  location?: string
  photo?: string
}

export interface LaporanSubmitResponse {
  success: boolean
  message: string
  id?: string
  data?: any
}

// ✅ Sesuaikan dengan enum backend (LaporanKategori)
export const LAPORAN_CATEGORIES = [
  'INFRASTRUKTUR',
  'KESEHATAN',
  'PENDIDIKAN',
  'LINGKUNGAN',
  'KEAMANAN',
  'LAINNYA'
] as const

// ✅ Display names untuk UI
export const LAPORAN_CATEGORY_LABELS: Record<string, string> = {
  'INFRASTRUKTUR': 'Infrastruktur',
  'KESEHATAN': 'Kesehatan',
  'PENDIDIKAN': 'Pendidikan',
  'LINGKUNGAN': 'Lingkungan',
  'KEAMANAN': 'Keamanan',
  'LAINNYA': 'Lainnya'
}
