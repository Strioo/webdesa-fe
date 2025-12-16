/**
 * ============================================
 * DUMMY DATA - PROFIL DESA
 * ============================================
 * 
 * Data profil desa mencakup informasi umum, sejarah,
 * visi misi, struktur pemerintahan, dan timeline.
 */

import { 
  VillageProfile, 
  VillageOfficial, 
  TimelineEvent, 
  VillageStats,
  TestimonialItem 
} from '../types'

export const villageOfficials: VillageOfficial[] = [
  {
    id: 'official-1',
    name: 'H. Bambang Sutrisno, S.Sos., M.M.',
    position: 'Kepala Desa',
    photo: '/assets/images/officials/kepala-desa.jpg',
    phone: '+6282137654321',
    email: 'kepala.desa@baturaden.desa.id',
    period: '2021 - 2027',
    bio: 'Memimpin Desa Baturaden dengan fokus pada pembangunan berkelanjutan dan kesejahteraan masyarakat.'
  },
  {
    id: 'official-2',
    name: 'Siti Nurhaliza, S.E.',
    position: 'Sekretaris Desa',
    photo: '/assets/images/officials/sekretaris-desa.jpg',
    phone: '+6282137654322',
    email: 'sekdes@baturaden.desa.id',
    period: '2021 - 2027',
    bio: 'Bertanggung jawab atas administrasi dan tata kelola pemerintahan desa.'
  },
  {
    id: 'official-3',
    name: 'Ahmad Fauzi, S.Pd.',
    position: 'Kepala Urusan Umum',
    photo: '/assets/images/officials/kaur-umum.jpg',
    phone: '+6282137654323',
    period: '2021 - 2027'
  },
  {
    id: 'official-4',
    name: 'Dewi Lestari, A.Md.',
    position: 'Kepala Urusan Keuangan',
    photo: '/assets/images/officials/kaur-keuangan.jpg',
    phone: '+6282137654324',
    period: '2021 - 2027'
  },
  {
    id: 'official-5',
    name: 'Hendra Gunawan',
    position: 'Kepala Seksi Pemerintahan',
    photo: '/assets/images/officials/kasi-pemerintahan.jpg',
    phone: '+6282137654325',
    period: '2021 - 2027'
  },
  {
    id: 'official-6',
    name: 'Sri Wahyuni, S.Sos.',
    position: 'Kepala Seksi Kesejahteraan',
    photo: '/assets/images/officials/kasi-kesejahteraan.jpg',
    phone: '+6282137654326',
    period: '2021 - 2027'
  },
  {
    id: 'official-7',
    name: 'Agus Prasetyo',
    position: 'Kepala Seksi Pelayanan',
    photo: '/assets/images/officials/kasi-pelayanan.jpg',
    phone: '+6282137654327',
    period: '2021 - 2027'
  },
  {
    id: 'official-8',
    name: 'Rina Kusumawati',
    position: 'Kepala Dusun I',
    photo: '/assets/images/officials/kadus-1.jpg',
    phone: '+6282137654328',
    period: '2021 - 2027'
  }
]

export const villageTimeline: TimelineEvent[] = [
  {
    year: '1850',
    title: 'Awal Mula Pemukiman',
    description: 'Desa Baturaden mulai dihuni oleh penduduk yang tertarik dengan kesuburan tanah di lereng Gunung Slamet. Mereka membuka lahan untuk pertanian dan tempat tinggal.',
    icon: 'home'
  },
  {
    year: '1920',
    title: 'Era Kolonial Belanda',
    description: 'Belanda membangun fasilitas peristirahatan di Baturaden karena udaranya yang sejuk. Pembangunan jalan dan infrastruktur dasar dimulai.',
    icon: 'building'
  },
  {
    year: '1945',
    title: 'Kemerdekaan Indonesia',
    description: 'Pasca kemerdekaan, Baturaden resmi menjadi bagian dari wilayah administratif Kabupaten Banyumas, Jawa Tengah.',
    icon: 'flag'
  },
  {
    year: '1970',
    title: 'Pengembangan Pariwisata',
    description: 'Pemerintah daerah mulai mengembangkan potensi wisata alam Baturaden. Pembangunan objek wisata Lokawisata dimulai.',
    icon: 'map'
  },
  {
    year: '1995',
    title: 'Modernisasi Desa',
    description: 'Listrik dan telepon masuk ke seluruh pelosok desa. Akses jalan diperbaiki untuk mendukung aktivitas wisata dan ekonomi warga.',
    icon: 'zap'
  },
  {
    year: '2010',
    title: 'Era Digital',
    description: 'Internet mulai masuk ke desa. UMKM lokal mulai memanfaatkan teknologi untuk pemasaran produk dan layanan.',
    icon: 'wifi'
  },
  {
    year: '2020',
    title: 'Desa Wisata Unggulan',
    description: 'Baturaden ditetapkan sebagai salah satu Desa Wisata unggulan di Jawa Tengah dengan berbagai destinasi wisata alam dan budaya.',
    icon: 'award'
  },
  {
    year: '2024',
    title: 'Transformasi Digital Desa',
    description: 'Peluncuran platform digital desa untuk layanan publik, transparansi pembangunan, dan promosi potensi desa secara online.',
    icon: 'globe'
  }
]

export const villageStats: VillageStats = {
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
  demographic: {
    ageGroups: [
      { label: '0-14 tahun', count: 2616, percentage: 21 },
      { label: '15-24 tahun', count: 2242, percentage: 18 },
      { label: '25-44 tahun', count: 3737, percentage: 30 },
      { label: '45-64 tahun', count: 2616, percentage: 21 },
      { label: '65+ tahun', count: 1247, percentage: 10 }
    ],
    education: [
      { level: 'Tidak/Belum Sekolah', count: 1495, percentage: 12 },
      { level: 'SD/Sederajat', count: 2616, percentage: 21 },
      { level: 'SMP/Sederajat', count: 2491, percentage: 20 },
      { level: 'SMA/Sederajat', count: 3488, percentage: 28 },
      { level: 'Diploma/S1', count: 1993, percentage: 16 },
      { level: 'S2/S3', count: 375, percentage: 3 }
    ],
    occupation: [
      { type: 'Petani', count: 2866, percentage: 23 },
      { type: 'Pedagang/Wiraswasta', count: 2616, percentage: 21 },
      { type: 'Buruh', count: 1869, percentage: 15 },
      { type: 'PNS/TNI/Polri', count: 747, percentage: 6 },
      { type: 'Pelajar/Mahasiswa', count: 2491, percentage: 20 },
      { type: 'Lainnya', count: 1869, percentage: 15 }
    ]
  },
  area: {
    total: 2850, // hektar
    agricultural: 1425,
    residential: 570,
    forest: 855
  },
  infrastructure: {
    roads: 45, // km
    bridges: 12,
    schools: 8,
    healthFacilities: 4,
    mosques: 15
  }
}

export const villageProfile: VillageProfile = {
  name: 'Desa Baturaden',
  tagline: 'Sejuk, Asri, dan Penuh Potensi',
  description: 'Desa Baturaden terletak di lereng Gunung Slamet, Kabupaten Banyumas, Jawa Tengah. Dikenal dengan keindahan alamnya yang memukau, udara sejuk pegunungan, dan keramahan penduduknya. Desa ini menjadi salah satu destinasi wisata utama di Jawa Tengah.',
  history: 'Baturaden memiliki sejarah panjang yang dimulai dari pemukiman petani di lereng Gunung Slamet. Nama "Baturaden" berasal dari legenda Adipati Baturraden dan Dewi Tunjung Seta. Kini Baturaden berkembang menjadi kawasan wisata alam yang terkenal dengan air terjun, pemandian air panas, dan panorama pegunungan yang menakjubkan.',
  location: {
    lat: -7.3028,
    lng: 109.2341,
    address: 'Kecamatan Baturaden, Kabupaten Banyumas, Jawa Tengah 53151',
    embedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31648.123456789!2d109.2341!3d-7.3028'
  },
  contact: {
    phone: '+62281-1234567',
    email: 'info@baturaden.desa.id',
    whatsapp: '+6282137654321',
    instagram: '@desa.baturaden',
    facebook: 'Desa Baturaden Official',
    website: 'https://baturaden.desa.id'
  },
  visiMisi: {
    visi: 'Mewujudkan Desa Baturaden yang Mandiri, Sejahtera, dan Berwawasan Lingkungan melalui Pengembangan Pariwisata Berkelanjutan dan Pemberdayaan Ekonomi Masyarakat.',
    misi: [
      'Meningkatkan kualitas pelayanan publik yang transparan dan akuntabel',
      'Mengembangkan potensi wisata alam dengan tetap menjaga kelestarian lingkungan',
      'Memberdayakan UMKM lokal sebagai penggerak ekonomi desa',
      'Meningkatkan kualitas sumber daya manusia melalui pendidikan dan pelatihan',
      'Membangun infrastruktur yang mendukung konektivitas dan aksesibilitas desa',
      'Melestarikan budaya dan kearifan lokal sebagai identitas desa'
    ]
  },
  officials: villageOfficials,
  timeline: villageTimeline,
  stats: villageStats
}

export const testimonials: TestimonialItem[] = [
  {
    id: 'testimonial-1',
    name: 'Budi Santoso',
    role: 'Pengusaha UMKM',
    avatar: '/assets/images/testimonials/user-1.jpg',
    content: 'Berkat dukungan pemerintah desa dan platform digital ini, usaha kopi saya bisa dikenal lebih luas. Omset meningkat 40% dalam 6 bulan terakhir!',
    rating: 5,
    date: '2024-10-15'
  },
  {
    id: 'testimonial-2',
    name: 'Sri Mulyani',
    role: 'Ibu Rumah Tangga',
    avatar: '/assets/images/testimonials/user-2.jpg',
    content: 'Pelayanan administrasi desa sekarang lebih cepat dan mudah. Tidak perlu bolak-balik ke kantor desa lagi.',
    rating: 5,
    date: '2024-10-20'
  },
  {
    id: 'testimonial-3',
    name: 'Agus Prasetyo',
    role: 'Wisatawan dari Jakarta',
    avatar: '/assets/images/testimonials/user-3.jpg',
    content: 'Baturaden memang luar biasa! Udaranya sejuk, pemandangannya indah, dan warganya ramah. Pasti akan kembali lagi.',
    rating: 5,
    date: '2024-09-28'
  },
  {
    id: 'testimonial-4',
    name: 'Dewi Lestari',
    role: 'Pemilik Homestay',
    avatar: '/assets/images/testimonials/user-4.jpg',
    content: 'Fitur wisata di website desa sangat membantu promosi usaha homestay saya. Banyak tamu yang datang setelah melihat info di sini.',
    rating: 4,
    date: '2024-11-05'
  },
  {
    id: 'testimonial-5',
    name: 'Rudi Hartono',
    role: 'Petani',
    avatar: '/assets/images/testimonials/user-5.jpg',
    content: 'Program irigasi dari dana desa benar-benar mengubah hidup kami. Hasil panen meningkat dan pendapatan lebih stabil.',
    rating: 5,
    date: '2024-08-12'
  }
]

/**
 * Helper function to get population data based on time range
 */
export function getPopulationDataByTimeRange(timeRange: string = '3months') {
  const allData = villageStats.population.monthlyData
  
  switch (timeRange) {
    case '3months':
      // Last 3 months (Oct, Nov, Des)
      return allData.slice(-3)
    
    case '6months':
      // Last 6 months (Jul, Agu, Sep, Okt, Nov, Des)
      return allData.slice(-6)
    
    case '1year':
      // All 12 months
      return allData
    
    default:
      return allData.slice(-3)
  }
}

export default {
  villageProfile,
  villageOfficials,
  villageTimeline,
  villageStats,
  testimonials,
  getPopulationDataByTimeRange
}
