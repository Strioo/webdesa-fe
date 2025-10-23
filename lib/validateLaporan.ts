import type { LaporanFormData, LaporanValidationError } from '@/types/laporan'

export function validateLaporan(data: LaporanFormData): LaporanValidationError {
  const errors: LaporanValidationError = {}

  // Validasi judul (minimal 5 karakter)
  if (!data.title || data.title.trim().length === 0) {
    errors.title = 'Judul laporan wajib diisi'
  } else if (data.title.trim().length < 5) {
    errors.title = 'Judul laporan minimal 5 karakter'
  } else if (data.title.trim().length > 100) {
    errors.title = 'Judul laporan maksimal 100 karakter'
  }

  // Validasi deskripsi (minimal 10 karakter)
  if (!data.description || data.description.trim().length === 0) {
    errors.description = 'Deskripsi laporan wajib diisi'
  } else if (data.description.trim().length < 10) {
    errors.description = 'Deskripsi minimal 10 karakter'
  } else if (data.description.trim().length > 1000) {
    errors.description = 'Deskripsi maksimal 1000 karakter'
  }

  // Validasi kategori (wajib dipilih)
  if (!data.category || data.category.trim().length === 0) {
    errors.category = 'Kategori wajib dipilih'
  }

  // Validasi lokasi (opsional, tapi jika diisi min 3 karakter)
  if (data.location && data.location.trim().length > 0 && data.location.trim().length < 3) {
    errors.location = 'Lokasi minimal 3 karakter'
  }

  // Validasi foto (opsional, tapi jika ada cek size dan type)
  if (data.photo) {
    const maxSize = 5 * 1024 * 1024 // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

    if (data.photo.size > maxSize) {
      errors.photo = 'Ukuran foto maksimal 5MB'
    } else if (!allowedTypes.includes(data.photo.type)) {
      errors.photo = 'Format foto harus JPG, PNG, atau WebP'
    }
  }

  return errors
}

export function isFormValid(errors: LaporanValidationError): boolean {
  return Object.keys(errors).length === 0
}
