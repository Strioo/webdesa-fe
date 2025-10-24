import { LaporanFormData, LaporanValidationError } from '@/types/laporan'

export const validateLaporan = (data: LaporanFormData): LaporanValidationError => {
  const errors: LaporanValidationError = {}

  // Validate title
  if (!data.title || !data.title.trim()) {
    errors.title = 'Judul laporan wajib diisi'
  } else if (data.title.trim().length < 5) {
    errors.title = 'Judul minimal 5 karakter'
  } else if (data.title.trim().length > 100) {
    errors.title = 'Judul maksimal 100 karakter'
  }

  // Validate category
  if (!data.category) {
    errors.category = 'Kategori laporan wajib dipilih'
  }

  // Validate description
  if (!data.description || !data.description.trim()) {
    errors.description = 'Deskripsi laporan wajib diisi'
  } else if (data.description.trim().length < 20) {
    errors.description = 'Deskripsi minimal 20 karakter'
  } else if (data.description.trim().length > 1000) {
    errors.description = 'Deskripsi maksimal 1000 karakter'
  }

  // Validate location
  if (!data.location || !data.location.trim()) {
    errors.location = 'Lokasi wajib diisi'
  }

  // ✅ Validate photo - CHECK if photo exists and has size
  if (!data.photo) {
    errors.photo = 'Foto pendukung wajib diupload'
  } else if (data.photo && typeof data.photo === 'object' && 'size' in data.photo) {
    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024 // 5MB in bytes
    if (data.photo.size > maxSize) {
      errors.photo = 'Ukuran foto maksimal 5MB'
    }
    
    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(data.photo.type)) {
      errors.photo = 'Format foto harus JPG, PNG, atau WebP'
    }
  }

  return errors
}

export const isFormValid = (errors: LaporanValidationError): boolean => {
  return Object.keys(errors).length === 0
}
