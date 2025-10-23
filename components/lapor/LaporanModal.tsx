'use client'

import { useState, useEffect, useRef, ChangeEvent, FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, Camera, Trash2, Loader2, File } from 'lucide-react'
import Image from 'next/image'
import { LAPORAN_CATEGORIES, LaporanFormData, LaporanValidationError } from '@/types/laporan'
import { isFormValid, validateLaporan } from '@/lib/validateLaporan'


interface LaporanModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LaporanModal({ isOpen, onClose }: LaporanModalProps) {
  const [formData, setFormData] = useState<LaporanFormData>({
    title: '',
    description: '',
    category: '',
    location: '',
    photo: undefined
  })
  
  const [errors, setErrors] = useState<LaporanValidationError>({})
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const [photoFileName, setPhotoFileName] = useState<string | null>(null)
  const [photoFileSize, setPhotoFileSize] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [notification, setNotification] = useState<{
    type: 'success' | 'error'
    message: string
    reason?: string
  } | null>(null)
  
  const modalRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const firstInputRef = useRef<HTMLInputElement>(null)

  // Focus trap and ESC handler
  useEffect(() => {
    if (!isOpen) return

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !modalRef.current) return

      const focusableElements = modalRef.current.querySelectorAll(
        'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const firstElement = focusableElements[0] as HTMLElement
      const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault()
          lastElement?.focus()
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault()
          firstElement?.focus()
        }
      }
    }

    document.addEventListener('keydown', handleEscape)
    document.addEventListener('keydown', handleTab)
    document.body.style.overflow = 'hidden'

    // Auto focus first input
    setTimeout(() => firstInputRef.current?.focus(), 100)

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('keydown', handleTab)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Validate on change
  useEffect(() => {
    if (Object.keys(touched).length > 0) {
      const validationErrors = validateLaporan(formData)
      setErrors(validationErrors)
    }
  }, [formData, touched])

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev: LaporanFormData) => ({ ...prev, [name]: value }))
    setTouched((prev: Record<string, boolean>) => ({ ...prev, [name]: true }))
  }

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFormData((prev: LaporanFormData) => ({ ...prev, photo: file }))
    setTouched((prev: Record<string, boolean>) => ({ ...prev, photo: true }))

    // Store file info
    setPhotoFileName(file.name)
    const sizeInMB = (file.size / 1024 / 1024).toFixed(2)
    setPhotoFileSize(`${sizeInMB} MB`)

    // Create preview
    const reader = new FileReader()
    reader.onloadend = () => {
      setPhotoPreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleRemovePhoto = () => {
    setFormData((prev: LaporanFormData) => ({ ...prev, photo: undefined }))
    setPhotoPreview(null)
    setPhotoFileName(null)
    setPhotoFileSize(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // Open camera using MediaDevices API
  const handleOpenCamera = async () => {
    try {
      setIsCameraOpen(true)
      
      // Request camera access
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Use rear camera on mobile
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      })

      setStream(mediaStream)

      // Set video stream
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
        videoRef.current.play()
      }
    } catch (error) {
      console.error('Error accessing camera:', error)
      alert('Tidak dapat mengakses kamera. Pastikan Anda telah memberikan izin akses kamera.')
      setIsCameraOpen(false)
    }
  }

  // Capture photo from camera
  const handleCapturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return

    const video = videoRef.current
    const canvas = canvasRef.current

    // Set canvas size to video size
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Draw video frame to canvas
    const context = canvas.getContext('2d')
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height)

      // Convert canvas to blob
      canvas.toBlob((blob) => {
        if (blob) {
          // Create file from blob - use type assertion for File constructor
          const file = new (window as any).File([blob], `camera-${Date.now()}.jpg`, {
            type: 'image/jpeg',
            lastModified: Date.now()
          }) as File

          // Set form data
          setFormData((prev: LaporanFormData) => ({ ...prev, photo: file }))
          setTouched((prev: Record<string, boolean>) => ({ ...prev, photo: true }))

          // Store file info
          setPhotoFileName(file.name)
          const sizeInMB = (file.size / 1024 / 1024).toFixed(2)
          setPhotoFileSize(`${sizeInMB} MB`)

          // Create preview
          const reader = new FileReader()
          reader.onloadend = () => {
            setPhotoPreview(reader.result as string)
          }
          reader.readAsDataURL(file)

          // Close camera
          handleCloseCamera()
        }
      }, 'image/jpeg', 0.9)
    }
  }

  // Close camera
  const handleCloseCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop())
      setStream(null)
    }
    setIsCameraOpen(false)
  }

  // Cleanup on unmount or modal close
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stream])

  // Get device location using Geolocation API
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationError('Geolocation tidak didukung oleh browser Anda')
      return
    }

    setIsLoadingLocation(true)
    setLocationError(null)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords
        
        try {
          // Use reverse geocoding to get address (using OpenStreetMap Nominatim API)
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
            {
              headers: {
                'User-Agent': 'Desa Baturaden App',
              },
            }
          )
          
          const data = await response.json()
          const address = data.display_name || `${latitude}, ${longitude}`
          
          setFormData((prev: LaporanFormData) => ({ 
            ...prev, 
            location: address
          }))
          setTouched((prev: Record<string, boolean>) => ({ ...prev, location: true }))
          setLocationError(null)
        } catch (error) {
          // Fallback to coordinates if geocoding fails
          const coords = `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`
          setFormData((prev: LaporanFormData) => ({ 
            ...prev, 
            location: coords
          }))
          setTouched((prev: Record<string, boolean>) => ({ ...prev, location: true }))
        } finally {
          setIsLoadingLocation(false)
        }
      },
      (error) => {
        setIsLoadingLocation(false)
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError('Izin lokasi ditolak. Mohon aktifkan akses lokasi di pengaturan browser.')
            break
          case error.POSITION_UNAVAILABLE:
            setLocationError('Informasi lokasi tidak tersedia.')
            break
          case error.TIMEOUT:
            setLocationError('Waktu habis saat mencoba mendapatkan lokasi.')
            break
          default:
            setLocationError('Terjadi kesalahan saat mendapatkan lokasi.')
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    )
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Mark all fields as touched
    setTouched({
      title: true,
      description: true,
      category: true,
      location: true,
      photo: true
    })

    const validationErrors = validateLaporan(formData)
    setErrors(validationErrors)

    if (!isFormValid(validationErrors)) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))

      // TODO: Replace with actual API call
      console.log('Laporan submitted:', formData)

      // Success notification
      setNotification({
        type: 'success',
        message: 'Laporan berhasil dikirim! Terima kasih atas partisipasi Anda.'
      })

      // Auto dismiss after 5 seconds and close modal
      setTimeout(() => {
        setNotification(null)
        handleClose()
      }, 5000)
    } catch (error) {
      console.error('Error submitting laporan:', error)
      
      // Error notification with reason
      setNotification({
        type: 'error',
        message: 'Gagal mengirim laporan',
        reason: error instanceof Error ? error.message : 'Terjadi kesalahan pada server. Silakan coba lagi.'
      })

      // Auto dismiss after 8 seconds
      setTimeout(() => {
        setNotification(null)
      }, 8000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      category: '',
      location: '',
      photo: undefined
    })
    setErrors({})
    setPhotoPreview(null)
    setPhotoFileName(null)
    setPhotoFileSize(null)
    setTouched({})
    onClose()
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose()
    }
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={handleBackdropClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <motion.div
          ref={modalRef}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 sm:px-8 py-4 flex items-center justify-between rounded-t-2xl z-10">
            <h2 id="modal-title" className="text-2xl font-bold text-gray-900">
              Form Laporan Warga
            </h2>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 hover:scale-110 rounded-full transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
              aria-label="Tutup modal"
              type="button"
            >
              <X className="w-5 h-5 text-gray-600 hover:text-gray-800 transition-colors duration-200" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="px-6 sm:px-8 py-6 space-y-6">
            {/* Judul Laporan */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
                Judul Laporan <span className="text-red-500">*</span>
              </label>
              <input
                ref={firstInputRef}
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Contoh: Jalan Rusak di RT 02"
                className={`w-full px-4 py-3 border ${
                  touched.title && errors.title ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-[#5B903A] focus:border-transparent transition-all duration-200`}
                aria-invalid={touched.title && errors.title ? 'true' : 'false'}
                aria-describedby={touched.title && errors.title ? 'title-error' : undefined}
              />
              {touched.title && errors.title && (
                <p id="title-error" className="mt-1 text-sm text-red-500">
                  {errors.title}
                </p>
              )}
            </div>

            {/* Kategori */}
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-2">
                Kategori Laporan <span className="text-red-500">*</span>
              </label>
              <div className="relative group">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full ${
                    formData.category && !errors.category ? 'pl-8' : 'pl-4'
                  } pr-12 py-3.5 border-2 ${
                    touched.category && errors.category 
                      ? 'border-red-500 bg-red-50/30' 
                      : formData.category 
                        ? 'border-[#5B903A] bg-green-50/50' 
                        : 'border-gray-300 bg-white'
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5B903A] focus:border-[#5B903A] hover:border-[#5B903A] hover:shadow-md transition-all duration-300 appearance-none cursor-pointer text-gray-700 font-medium shadow-sm`}
                  aria-invalid={touched.category && errors.category ? 'true' : 'false'}
                  aria-describedby={touched.category && errors.category ? 'category-error' : undefined}
                >
                  <option value="" disabled>Pilih Kategori Laporan</option>
                  {LAPORAN_CATEGORIES.map((cat: string) => (
                    <option key={cat} value={cat} className="py-2">
                      {cat}
                    </option>
                  ))}
                </select>
                {/* Custom Chevron Icon with Animation */}
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 group-hover:scale-110">
                  <svg
                    className={`w-5 h-5 transition-colors duration-300 ${
                      touched.category && errors.category 
                        ? 'text-red-500' 
                        : formData.category 
                          ? 'text-[#5B903A]' 
                          : 'text-gray-400'
                    } group-hover:text-[#5B903A]`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                {/* Selected Indicator */}
                {formData.category && !errors.category && (
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    <div className="w-2 h-2 bg-[#5B903A] rounded-full animate-pulse"></div>
                  </div>
                )}
              </div>
              {touched.category && errors.category && (
                <p id="category-error" className="mt-1 text-sm text-red-500">
                  {errors.category}
                </p>
              )}
            </div>

            {/* Deskripsi */}
            <div>
              <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                Deskripsi Laporan <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={5}
                placeholder="Jelaskan kondisi yang ingin dilaporkan..."
                className={`w-full px-4 py-3 border ${
                  touched.description && errors.description ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-[#5B903A] focus:border-transparent transition-all duration-200 resize-none`}
                aria-invalid={touched.description && errors.description ? 'true' : 'false'}
                aria-describedby={
                  touched.description && errors.description ? 'description-error' : undefined
                }
              />
              {touched.description && errors.description && (
                <p id="description-error" className="mt-1 text-sm text-red-500">
                  {errors.description}
                </p>
              )}
            </div>

            {/* Lokasi - Required with GPS */}
            <div>
              <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2">
                Lokasi <span className="text-red-500">*</span>
              </label>
              
              <div className="space-y-3">
                {/* Get Location Button */}
                <button
                  type="button"
                  onClick={handleGetLocation}
                  disabled={isLoadingLocation}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-md hover:border-[#5B903A] hover:bg-green-50 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoadingLocation ? (
                    <>
                      <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
                      <span className="text-sm font-medium text-gray-700">Mendapatkan Lokasi...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">Dapatkan Lokasi Saya</span>
                    </>
                  )}
                </button>

                {/* Location Input - Read only after getting location */}
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Klik tombol di atas untuk mendapatkan lokasi otomatis"
                  className={`w-full px-4 py-3 border ${
                    touched.location && errors.location ? 'border-red-500' : 'border-gray-300'
                  } rounded-md focus:outline-none focus:ring-2 focus:ring-[#5B903A] focus:border-transparent transition-all duration-200 bg-gray-50`}
                  readOnly
                  aria-invalid={touched.location && errors.location ? 'true' : 'false'}
                  aria-describedby={touched.location && errors.location ? 'location-error' : undefined}
                />

                {locationError && (
                  <p className="text-sm text-red-500">{locationError}</p>
                )}

                {touched.location && errors.location && (
                  <p id="location-error" className="text-sm text-red-500">
                    {errors.location}
                  </p>
                )}

                <p className="text-xs text-gray-500">
                  Lokasi akan diambil dari GPS device Anda. Pastikan izin lokasi diaktifkan.
                </p>
              </div>
            </div>

            {/* Foto - Required */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Foto Pendukung <span className="text-red-500">*</span>
              </label>
              
              {!isCameraOpen && !photoPreview && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Camera Button - Dengan styling yang sama seperti Upload */}
                  <button
                    type="button"
                    onClick={handleOpenCamera}
                    className="flex items-center justify-center gap-2 px-4 py-3.5 border-2 border-dashed border-gray-300 rounded-md hover:border-[#5B903A] hover:bg-green-50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] group"
                  >
                    <Camera className="w-5 h-5 text-gray-600 group-hover:text-[#5B903A] transition-colors duration-200" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-[#5B903A] transition-colors duration-200">Ambil Foto</span>
                  </button>

                  {/* Upload Button */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center justify-center gap-2 px-4 py-3.5 border-2 border-dashed border-gray-300 rounded-md hover:border-[#5B903A] hover:bg-green-50 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] group"
                  >
                    <Upload className="w-5 h-5 text-gray-600 group-hover:text-[#5B903A] transition-colors duration-200" />
                    <span className="text-sm font-medium text-gray-700 group-hover:text-[#5B903A] transition-colors duration-200">Upload Foto</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="hidden"
                    aria-label="Upload foto dari galeri"
                  />
                </div>
              )}

              {/* Camera View */}
              {isCameraOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-4"
                >
                  <div className="relative rounded-md overflow-hidden border-2 border-dashed border-[#5B903A] bg-gray-50 shadow-sm">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-[400px] object-cover"
                    />
                    <canvas ref={canvasRef} className="hidden" />
                    
                    {/* Camera Controls */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          type="button"
                          onClick={handleCloseCamera}
                          className="px-5 py-2.5 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white font-medium rounded-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                        >
                          Batal
                        </button>
                        <button
                          type="button"
                          onClick={handleCapturePhoto}
                          className="px-6 py-2.5 bg-[#5B903A] hover:bg-[#4a7a2f] text-white font-semibold rounded-md transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] shadow-lg flex items-center gap-2"
                        >
                          <Camera className="w-4 h-4" />
                          Ambil Foto
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 text-center flex items-center justify-center gap-2">
                    <Camera className="w-4 h-4" />
                    Arahkan kamera ke objek yang ingin difoto
                  </p>
                </motion.div>
              )}

              {/* Photo Preview */}
              {photoPreview && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-3"
                >
                  <div className="relative rounded-md overflow-hidden border border-gray-300">
                    <div className="relative w-full h-48">
                      <Image
                        src={photoPreview}
                        alt="Preview foto"
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleRemovePhoto}
                      className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                      aria-label="Hapus foto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* File Info Indicator */}
                  {photoFileName && (
                    <div className="flex items-center gap-2 px-3 py-2 bg-green-50 border border-green-200 rounded-md">
                      <File className="w-4 h-4 text-green-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-green-900 truncate">
                          {photoFileName}
                        </p>
                        {photoFileSize && (
                          <p className="text-xs text-green-600">
                            {photoFileSize}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {touched.photo && errors.photo && (
                <p className="mt-1 text-sm text-red-500">{errors.photo}</p>
              )}

              <p className="mt-2 text-xs text-gray-500">
                Format: JPG, PNG, WebP. Maksimal 5MB.
              </p>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting || (Object.keys(touched).length > 0 && !isFormValid(errors))}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#5B903A] hover:bg-[#4a7a2f] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] focus-visible:ring-offset-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Mengirim Laporan...</span>
                  </>
                ) : (
                  <span>Kirim Laporan</span>
                )}
              </button>
              
              {Object.keys(touched).length > 0 && !isFormValid(errors) && (
                <p className="mt-3 text-sm text-center text-red-500">
                  Mohon lengkapi semua field yang wajib diisi dengan benar
                </p>
              )}
            </div>
          </form>
        </motion.div>

        {/* Notification Toast */}
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed top-4 left-1/2 -translate-x-1/2 z-[60] max-w-md w-full mx-4"
            >
              <div
                className={`rounded-lg shadow-2xl p-4 ${
                  notification.type === 'success'
                    ? 'bg-green-500 border-2 border-green-600'
                    : 'bg-red-500 border-2 border-red-600'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1">
                    <p className="text-white font-semibold text-base">
                      {notification.message}
                    </p>
                    {notification.reason && (
                      <p className="text-white/90 text-sm mt-1">
                        {notification.reason}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => setNotification(null)}
                    className="p-1 hover:bg-white/10 rounded transition-colors duration-200"
                    aria-label="Tutup notifikasi"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  )
}
