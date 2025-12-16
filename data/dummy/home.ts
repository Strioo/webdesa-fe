/**
 * ============================================
 * DUMMY DATA - HOME / STATISTIK
 * ============================================
 * 
 * Data untuk halaman home termasuk statistik,
 * weather, dan content dinamis.
 */

import { 
  HomeStats, 
  WeatherData, 
  TestimonialItem,
  QuickSuggestion 
} from '../types'

export const homeStats: HomeStats = {
  population: {
    total: 12458,
    male: 6234,
    female: 6224,
    growthRate: 1.2,
    monthlyData: [
      { month: 'Jan', value: 12200, date: '2024-01-01' },
      { month: 'Feb', value: 12180, date: '2024-02-01' },
      { month: 'Mar', value: 12250, date: '2024-03-01' },
      { month: 'Apr', value: 12280, date: '2024-04-01' },
      { month: 'Mei', value: 12240, date: '2024-05-01' },
      { month: 'Jun', value: 12320, date: '2024-06-01' },
      { month: 'Jul', value: 12380, date: '2024-07-01' },
      { month: 'Agu', value: 12350, date: '2024-08-01' },
      { month: 'Sep', value: 12410, date: '2024-09-01' },
      { month: 'Okt', value: 12440, date: '2024-10-01' },
      { month: 'Nov', value: 12420, date: '2024-11-01' },
      { month: 'Des', value: 12490, date: '2024-12-01' }
    ]
  },
  umkmCount: 48,
  wisataCount: 12,
  proyekAktif: 6,
  laporanSelesai: 156
}

export const weatherData: WeatherData = {
  location: 'Baturaden, Banyumas',
  temp: 22,
  tempHigh: 26,
  tempLow: 18,
  humidity: 75,
  rainfall: 5,
  pressure: 1013,
  condition: 'Berawan',
  icon: 'cloudy'
}

// Statistik untuk homepage
export const publicStats = {
  timeRange: 'bulanan',
  data: {
    wisataVisitors: 15234,
    wisataVisitorsGrowth: 12.5,
    umkmTransactions: 8567,
    umkmTransactionsGrowth: 8.3,
    laporanMasuk: 45,
    laporanSelesai: 38,
    laporanResponseRate: 84,
    populationGrowth: 1.2,
    chartData: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
      wisataVisitors: [1200, 1350, 1100, 1450, 1600, 1800, 2100, 2300, 1900, 1650, 1400, 1234],
      umkmTransactions: [650, 720, 680, 750, 800, 850, 920, 980, 870, 790, 700, 857]
    }
  }
}

// Data untuk UmkmDanWisata section
export const umkmWisataStats = {
  umkm: {
    total: 48,
    categories: [
      { name: 'Kuliner', count: 18 },
      { name: 'Kerajinan', count: 12 },
      { name: 'Jasa', count: 8 },
      { name: 'Oleh-oleh', count: 6 },
      { name: 'Lainnya', count: 4 }
    ],
    featured: [
      {
        id: 'umkm-1',
        slug: 'kopi-lereng-slamet',
        name: 'Kopi Lereng Slamet',
        image: '/assets/images/umkm/kopi-lereng-slamet-1.jpg',
        category: 'Kafe & Minuman',
        rating: 4.7
      },
      {
        id: 'umkm-3',
        slug: 'warung-mendoan-mbok-darmi',
        name: 'Warung Mendoan Mbok Darmi',
        image: '/assets/images/umkm/mendoan-1.jpg',
        category: 'Kuliner',
        rating: 4.9
      },
      {
        id: 'umkm-2',
        slug: 'batik-baturaden',
        name: 'Batik Baturaden Asri',
        image: '/assets/images/umkm/batik-1.jpg',
        category: 'Kerajinan',
        rating: 4.8
      }
    ]
  },
  wisata: {
    total: 12,
    categories: [
      { name: 'Wisata Alam', count: 5 },
      { name: 'Wisata Edukasi', count: 3 },
      { name: 'Wisata Petualangan', count: 2 },
      { name: 'Wisata Desa', count: 1 },
      { name: 'Agrowisata', count: 1 }
    ],
    featured: [
      {
        id: 'wisata-1',
        slug: 'lokawisata',
        name: 'Lokawisata Baturaden',
        image: '/assets/images/wisata/lokawisata-1.jpg',
        category: 'Wisata Alam',
        rating: 4.5
      },
      {
        id: 'wisata-2',
        slug: 'bukit-bintang',
        name: 'Bukit Bintang Baturaden',
        image: '/assets/images/wisata/bukit-bintang-1.jpg',
        category: 'Wisata Alam',
        rating: 4.7
      },
      {
        id: 'wisata-5',
        slug: 'bhumi-bambu',
        name: 'Bhumi Bambu Baturaden',
        image: '/assets/images/wisata/bhumi-bambu-1.jpg',
        category: 'Wisata Edukasi',
        rating: 4.5
      }
    ]
  }
}

// Chatbot suggestions
export const chatbotSuggestions: QuickSuggestion[] = [
  {
    id: 'suggestion-1',
    text: '📍 Wisata Populer',
    message: 'Apa saja wisata populer di Baturaden?',
    icon: 'map-pin'
  },
  {
    id: 'suggestion-2',
    text: '🏪 UMKM Lokal',
    message: 'Rekomendasikan UMKM dan kuliner di Baturaden',
    icon: 'store'
  },
  {
    id: 'suggestion-3',
    text: '📋 Cara Lapor',
    message: 'Bagaimana cara membuat laporan ke desa?',
    icon: 'clipboard'
  },
  {
    id: 'suggestion-4',
    text: '🏗️ Info Pembangunan',
    message: 'Apa saja proyek pembangunan yang sedang berjalan?',
    icon: 'construction'
  },
  {
    id: 'suggestion-5',
    text: '📄 Layanan Administrasi',
    message: 'Apa saja layanan administrasi di kantor desa?',
    icon: 'file-text'
  },
  {
    id: 'suggestion-6',
    text: '🎫 Beli Tiket Wisata',
    message: 'Bagaimana cara membeli tiket wisata online?',
    icon: 'ticket'
  }
]

// Hero section content
export const heroContent = {
  title: 'Selamat Datang di',
  subtitle: 'Desa Baturaden',
  description: 'Portal informasi dan layanan digital Desa Baturaden, Kabupaten Banyumas. Temukan wisata, UMKM, dan berbagai layanan desa dalam genggaman Anda.',
  backgroundImage: '/assets/images/hero-bg.jpg',
  ctaButtons: [
    { text: 'Jelajahi Wisata', href: '/wisata', variant: 'primary' },
    { text: 'Lihat UMKM', href: '/umkm', variant: 'secondary' }
  ]
}

// Visi Misi untuk homepage
export const visiMisiContent = {
  visi: 'Mewujudkan Desa Baturaden yang Mandiri, Sejahtera, dan Berwawasan Lingkungan',
  misi: [
    'Meningkatkan kualitas pelayanan publik',
    'Mengembangkan potensi wisata berkelanjutan',
    'Memberdayakan UMKM lokal',
    'Membangun infrastruktur berkualitas'
  ],
  stats: [
    { value: 12458, label: 'Penduduk', suffix: 'Jiwa' },
    { value: 48, label: 'UMKM Aktif', suffix: 'Unit' },
    { value: 12, label: 'Destinasi Wisata', suffix: 'Lokasi' },
    { value: 156, label: 'Laporan Selesai', suffix: '' }
  ]
}

export default {
  homeStats,
  weatherData,
  publicStats,
  umkmWisataStats,
  chatbotSuggestions,
  heroContent,
  visiMisiContent
}
