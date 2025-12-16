/**
 * ============================================
 * WEBDESA - TYPE DEFINITIONS
 * ============================================
 * 
 * Komprehensif TypeScript interfaces untuk semua entity
 * dalam aplikasi web desa. Dirancang untuk:
 * - Konsistensi data antar komponen
 * - Kemudahan migrasi ke backend asli
 * - Type safety dan developer experience
 */

// ============================================
// COMMON/SHARED TYPES
// ============================================

export interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

export interface ImageData {
  src: string
  alt: string
  width?: number
  height?: number
  blurDataUrl?: string
}

export interface Location {
  lat: number
  lng: number
  address: string
  embedUrl?: string
}

export interface ContactInfo {
  phone?: string
  email?: string
  whatsapp?: string
  instagram?: string
  facebook?: string
  website?: string
}

export interface OperatingHours {
  monday?: string
  tuesday?: string
  wednesday?: string
  thursday?: string
  friday?: string
  saturday?: string
  sunday?: string
  weekday?: string
  weekend?: string
  holiday?: string
  notes?: string
}

export interface PaginationMeta {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
  meta?: PaginationMeta
}

// ============================================
// HOME / STATISTIK DESA
// ============================================

export interface WeatherData {
  location: string
  temp: number
  tempHigh: number
  tempLow: number
  humidity: number
  rainfall: number
  pressure: number
  condition: string
  icon: string
}

export interface PopulationDataPoint {
  month: string
  value: number
  date: string
}

export interface PopulationData {
  total: number
  male: number
  female: number
  growthRate: number
  monthlyData: PopulationDataPoint[]
}

export interface DemographicData {
  ageGroups: {
    label: string
    count: number
    percentage: number
  }[]
  education: {
    level: string
    count: number
    percentage: number
  }[]
  occupation: {
    type: string
    count: number
    percentage: number
  }[]
}

export interface VillageStats {
  population: PopulationData
  demographic: DemographicData
  area: {
    total: number // dalam hektar
    agricultural: number
    residential: number
    forest: number
  }
  infrastructure: {
    roads: number // dalam km
    bridges: number
    schools: number
    healthFacilities: number
    mosques: number
  }
}

export interface HomeStats {
  population: PopulationData
  umkmCount: number
  wisataCount: number
  proyekAktif: number
  laporanSelesai: number
}

export interface TestimonialItem {
  id: string
  name: string
  role: string
  avatar: string
  content: string
  rating: number
  date: string
}

// ============================================
// PROFIL DESA
// ============================================

export interface TimelineEvent {
  year: string
  title: string
  description: string
  image?: string
  icon?: string
}

export interface VisiMisi {
  visi: string
  misi: string[]
}

export interface VillageOfficial {
  id: string
  name: string
  position: string
  photo: string
  phone?: string
  email?: string
  period: string
  bio?: string
}

export interface VillageProfile {
  name: string
  tagline: string
  description: string
  history: string
  location: Location
  contact: ContactInfo
  visiMisi: VisiMisi
  officials: VillageOfficial[]
  timeline: TimelineEvent[]
  stats: VillageStats
}

// ============================================
// WISATA / TOURISM
// ============================================

export type WisataCategory = 
  | 'Wisata Alam'
  | 'Wisata Petualangan'
  | 'Wisata Edukasi'
  | 'Wisata Desa'
  | 'Wisata Kuliner'
  | 'Wisata Budaya'
  | 'Agrowisata'

export interface WisataFacility {
  key: string
  label: string
  icon: string
}

export interface WisataReview {
  id: string
  userName: string
  userAvatar?: string
  rating: number
  comment: string
  date: string
  visitDate?: string
  photos?: string[]
}

export interface Wisata extends BaseEntity {
  slug: string
  name: string
  description: string
  shortDescription?: string
  category: WisataCategory
  price: number
  priceWeekend?: number
  openTime: string
  closeTime: string
  phone: string
  images: ImageData[]
  facilities: WisataFacility[]
  location: Location
  isActive: boolean
  isFeatured: boolean
  rating: number
  reviewCount: number
  reviews?: WisataReview[]
  tips?: string[]
  nearbyAttractions?: string[]
}

// List item untuk grid/card display
export interface WisataListItem {
  id: string
  slug: string
  name: string
  description: string
  price: number
  image: string
  location: string
  category: WisataCategory
  rating: number
  isActive: boolean
}

// ============================================
// UMKM
// ============================================

export type UmkmCategory = 
  | 'Kuliner'
  | 'Kafe & Minuman'
  | 'Kerajinan'
  | 'Fashion'
  | 'Pertanian'
  | 'Oleh-oleh'
  | 'Jasa'
  | 'Lainnya'

export interface MenuItem {
  id: string
  name: string
  description?: string
  price: number
  image: string
  isAvailable: boolean
  isPopular?: boolean
  category?: string
}

export interface Umkm extends BaseEntity {
  slug: string
  name: string
  description: string
  shortDescription?: string
  category: UmkmCategory
  price: number // Harga mulai dari
  location: string
  address: string
  foundedYear: number
  images: string[]
  menus: MenuItem[]
  contact: ContactInfo
  operatingHours: OperatingHours
  owner: string
  isActive: boolean
  isFeatured: boolean
  rating: number
  reviewCount: number
  tags?: string[]
}

// List item untuk grid/card display
export interface UmkmListItem {
  id: string
  slug: string
  name: string
  description: string
  price: number
  image: string
  category: UmkmCategory
  rating: number
  isActive: boolean
}

// ============================================
// PEMBANGUNAN / DEVELOPMENT PROJECTS
// ============================================

export type PembangunanKategori = 
  | 'Infrastruktur'
  | 'Air Bersih'
  | 'Pertanian'
  | 'Pendidikan'
  | 'Kesehatan'
  | 'Fasilitas Umum'
  | 'Lingkungan'
  | 'Ekonomi'

export type PembangunanStatus = 
  | 'Perencanaan'
  | 'Berlangsung'
  | 'Selesai'
  | 'Ditunda'

export interface PembangunanTimeline {
  mulai: string
  selesai: string
}

export interface DanaItem {
  sumber: string
  jumlah: number
  tahun: string
  keterangan?: string
}

export interface TransparansiDana {
  totalAnggaran: number
  totalRealisasi: number
  tahunAnggaran: string
  items: DanaItem[]
  lastUpdated: string
}

export interface ProyekPembangunan extends BaseEntity {
  nama: string
  deskripsi: string
  kategori: PembangunanKategori
  anggaran: number
  realisasiAnggaran?: number
  sumberDana: string
  timeline: PembangunanTimeline
  status: PembangunanStatus
  progress: number
  foto: string
  galeri?: string[]
  penanggungJawab: string
  kontraktor?: string
  lokasi?: string
  manfaat?: string[]
  dokumentasi?: {
    date: string
    description: string
    photos: string[]
  }[]
}

// ============================================
// LAPORAN / ASPIRASI MASYARAKAT
// ============================================

export type LaporanKategori = 
  | 'INFRASTRUKTUR'
  | 'KESEHATAN'
  | 'PENDIDIKAN'
  | 'LINGKUNGAN'
  | 'KEAMANAN'
  | 'LAINNYA'

export type LaporanStatus = 
  | 'Menunggu'
  | 'Diproses'
  | 'Selesai'
  | 'Ditolak'

export interface LaporanFormData {
  title: string
  description: string
  category: LaporanKategori | ''
  location?: string
  photo?: File
}

export interface Laporan extends BaseEntity {
  title: string
  description: string
  category: LaporanKategori
  location: string
  photo?: string
  status: LaporanStatus
  tanggapan?: string
  tanggapanDate?: string
  userId: string
  userName: string
  userEmail?: string
  isAnonymous: boolean
  priority?: 'low' | 'medium' | 'high'
}

// ============================================
// USER / AUTH
// ============================================

export type UserRole = 'USER' | 'ADMIN' | 'SUPER_ADMIN'

export interface User extends BaseEntity {
  name: string
  email: string
  phone?: string
  address?: string
  avatar?: string
  role: UserRole
  isActive: boolean
  lastLogin?: string
}

export interface AuthCredentials {
  email: string
  password: string
}

export interface RegisterData {
  name: string
  email: string
  password: string
  phone?: string
  address?: string
}

// ============================================
// TRANSAKSI (Tiket Wisata)
// ============================================

export type TransactionStatus = 
  | 'pending'
  | 'success'
  | 'failed'
  | 'expired'
  | 'cancelled'

export interface Transaction extends BaseEntity {
  orderId: string
  userId: string
  userName: string
  userEmail: string
  userPhone: string
  wisataId: string
  wisataName: string
  quantity: number
  unitPrice: number
  totalAmount: number
  visitDate: string
  status: TransactionStatus
  paymentMethod?: string
  paymentDate?: string
  ticketCode?: string
  notes?: string
}

// ============================================
// CHATBOT
// ============================================

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  thinkingTime?: number
}

export interface QuickSuggestion {
  id: string
  text: string
  message: string
  icon?: string
}

// ============================================
// RE-EXPORTS untuk backward compatibility
// ============================================

export type { 
  Wisata as TourismDestination,
  WisataFacility as TourismFacility,
  ImageData as TourismImage,
  Location as TourismLocation,
  Umkm as UmkmDetail,
}
