export interface LaporanFormData {
  title: string
  description: string
  category: '' | 'Infrastruktur' | 'Kebersihan' | 'Keamanan' | 'Pelayanan' | 'Lainnya'
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
}

export const LAPORAN_CATEGORIES = [
  'Infrastruktur',
  'Kebersihan',
  'Keamanan',
  'Pelayanan',
  'Lainnya'
] as const
