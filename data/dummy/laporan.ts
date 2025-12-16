/**
 * ============================================
 * DUMMY DATA - LAPORAN MASYARAKAT
 * ============================================
 * 
 * Data laporan/aspirasi masyarakat dengan
 * berbagai status dan kategori.
 */

import { 
  Laporan, 
  LaporanKategori, 
  LaporanStatus 
} from '../types'

export const laporanData: Laporan[] = [
  {
    id: 'laporan-1',
    title: 'Jalan Rusak di RT 03',
    description: 'Jalan di depan rumah nomor 45 RT 03 mengalami kerusakan parah dengan lubang besar yang membahayakan pengendara motor. Sudah ada 2 kejadian warga terjatuh. Mohon segera diperbaiki.',
    category: 'INFRASTRUKTUR',
    location: 'RT 03 / RW 02, depan rumah No. 45',
    photo: '/assets/images/laporan/jalan-rusak.jpg',
    status: 'Diproses',
    tanggapan: 'Terima kasih atas laporannya. Tim dari Dinas PU sudah melakukan survei lokasi. Perbaikan dijadwalkan minggu depan.',
    tanggapanDate: '2024-12-08T10:30:00Z',
    userId: 'user-1',
    userName: 'Budi Santoso',
    userEmail: 'budi.santoso@email.com',
    isAnonymous: false,
    priority: 'high',
    createdAt: '2024-12-05T08:00:00Z',
    updatedAt: '2024-12-08T10:30:00Z'
  },
  {
    id: 'laporan-2',
    title: 'Lampu Jalan Mati di Perempatan',
    description: 'Lampu penerangan jalan di perempatan dekat masjid Al-Hidayah sudah mati selama 2 minggu. Sangat gelap dan berbahaya untuk warga yang pulang malam.',
    category: 'INFRASTRUKTUR',
    location: 'Perempatan Masjid Al-Hidayah, RT 05',
    status: 'Selesai',
    tanggapan: 'Lampu sudah diperbaiki pada tanggal 10 Desember 2024. Terima kasih atas partisipasi warga.',
    tanggapanDate: '2024-12-10T14:00:00Z',
    userId: 'user-2',
    userName: 'Siti Rahmawati',
    isAnonymous: false,
    priority: 'medium',
    createdAt: '2024-12-01T19:30:00Z',
    updatedAt: '2024-12-10T14:00:00Z'
  },
  {
    id: 'laporan-3',
    title: 'Sampah Menumpuk di TPS',
    description: 'TPS di belakang pasar desa sudah penuh dan sampah mulai berserakan ke jalan. Bau sangat menyengat dan banyak lalat. Mohon segera diangkut.',
    category: 'LINGKUNGAN',
    location: 'TPS Belakang Pasar Desa',
    photo: '/assets/images/laporan/sampah-tps.jpg',
    status: 'Selesai',
    tanggapan: 'Sampah sudah diangkut oleh DLH. Jadwal pengangkutan akan ditambah menjadi 2x seminggu.',
    tanggapanDate: '2024-12-06T09:00:00Z',
    userId: 'user-3',
    userName: 'Ahmad Hidayat',
    isAnonymous: false,
    priority: 'high',
    createdAt: '2024-12-04T07:15:00Z',
    updatedAt: '2024-12-06T09:00:00Z'
  },
  {
    id: 'laporan-4',
    title: 'Pohon Tumbang Menghalangi Jalan',
    description: 'Ada pohon besar yang tumbang di jalan menuju dusun Makmur akibat hujan deras kemarin malam. Kendaraan tidak bisa lewat.',
    category: 'LINGKUNGAN',
    location: 'Jalan Dusun Makmur, KM 2',
    photo: '/assets/images/laporan/pohon-tumbang.jpg',
    status: 'Selesai',
    tanggapan: 'Pohon sudah dibersihkan oleh tim gotong royong warga dan petugas desa. Jalan sudah bisa dilalui.',
    tanggapanDate: '2024-12-03T16:00:00Z',
    userId: 'user-4',
    userName: 'Dewi Lestari',
    isAnonymous: false,
    priority: 'high',
    createdAt: '2024-12-03T06:00:00Z',
    updatedAt: '2024-12-03T16:00:00Z'
  },
  {
    id: 'laporan-5',
    title: 'Atap Posyandu Bocor',
    description: 'Atap Posyandu di RT 02 bocor di beberapa titik. Saat hujan, air masuk dan membuat lantai licin. Berbahaya untuk ibu hamil dan balita.',
    category: 'KESEHATAN',
    location: 'Posyandu Melati, RT 02',
    status: 'Diproses',
    tanggapan: 'Sudah dimasukkan dalam anggaran perbaikan Q1 2025. Sementara dipasang terpal untuk penutup darurat.',
    tanggapanDate: '2024-12-09T11:00:00Z',
    userId: 'user-5',
    userName: 'Kader Posyandu',
    isAnonymous: false,
    priority: 'medium',
    createdAt: '2024-12-07T10:00:00Z',
    updatedAt: '2024-12-09T11:00:00Z'
  },
  {
    id: 'laporan-6',
    title: 'Kerusakan Pagar Sekolah TK',
    description: 'Pagar TK Tunas Bangsa rusak di bagian belakang. Lubangnya cukup besar dan anak-anak bisa keluar tanpa pengawasan.',
    category: 'PENDIDIKAN',
    location: 'TK Tunas Bangsa, RT 04',
    photo: '/assets/images/laporan/pagar-sekolah.jpg',
    status: 'Menunggu',
    userId: 'user-6',
    userName: 'Guru TK',
    isAnonymous: false,
    priority: 'medium',
    createdAt: '2024-12-10T08:30:00Z',
    updatedAt: '2024-12-10T08:30:00Z'
  },
  {
    id: 'laporan-7',
    title: 'Saluran Air Tersumbat',
    description: 'Saluran air di depan gang masuk RT 06 tersumbat sampah. Air meluap ke jalan saat hujan.',
    category: 'INFRASTRUKTUR',
    location: 'Gang masuk RT 06',
    status: 'Diproses',
    tanggapan: 'Tim kebersihan akan membersihkan saluran akhir pekan ini.',
    tanggapanDate: '2024-12-11T09:00:00Z',
    userId: 'user-7',
    userName: 'Anonymous',
    isAnonymous: true,
    priority: 'low',
    createdAt: '2024-12-09T15:00:00Z',
    updatedAt: '2024-12-11T09:00:00Z'
  },
  {
    id: 'laporan-8',
    title: 'Pencurian Motor di Area Wisata',
    description: 'Kemarin ada kasus pencurian motor di parkiran Lokawisata. Mohon ditingkatkan keamanan dan CCTV di area parkir wisata.',
    category: 'KEAMANAN',
    location: 'Parkiran Lokawisata Baturaden',
    status: 'Diproses',
    tanggapan: 'Laporan sudah diteruskan ke Kepolisian dan Pengelola Wisata. Akan ditambah pos jaga dan CCTV.',
    tanggapanDate: '2024-12-08T15:30:00Z',
    userId: 'user-8',
    userName: 'Korban Pencurian',
    isAnonymous: false,
    priority: 'high',
    createdAt: '2024-12-07T20:00:00Z',
    updatedAt: '2024-12-08T15:30:00Z'
  },
  {
    id: 'laporan-9',
    title: 'Bantuan untuk Lansia Sebatang Kara',
    description: 'Ada lansia (Mbah Surti) di RT 01 yang hidup sebatang kara dan sudah tidak bisa bekerja. Mohon didata untuk bantuan sosial.',
    category: 'LAINNYA',
    location: 'RT 01 / RW 01, rumah pojok gang',
    status: 'Selesai',
    tanggapan: 'Sudah diverifikasi tim PKH. Mbah Surti akan masuk dalam penerima bantuan mulai Januari 2025.',
    tanggapanDate: '2024-12-05T14:00:00Z',
    userId: 'user-9',
    userName: 'Tetangga Peduli',
    isAnonymous: true,
    priority: 'medium',
    createdAt: '2024-11-28T09:00:00Z',
    updatedAt: '2024-12-05T14:00:00Z'
  },
  {
    id: 'laporan-10',
    title: 'Gedung PAUD Perlu Cat Ulang',
    description: 'Cat dinding gedung PAUD Ceria sudah kusam dan mengelupas. Perlu pengecatan ulang agar lebih layak untuk anak-anak.',
    category: 'PENDIDIKAN',
    location: 'PAUD Ceria, RT 03',
    status: 'Menunggu',
    userId: 'user-10',
    userName: 'Orangtua Murid',
    isAnonymous: false,
    priority: 'low',
    createdAt: '2024-12-11T10:00:00Z',
    updatedAt: '2024-12-11T10:00:00Z'
  },
  {
    id: 'laporan-11',
    title: 'Air PDAM Keruh',
    description: 'Air PDAM di wilayah RT 07-08 keruh dan berbau tanah sejak 3 hari lalu. Tidak layak untuk masak dan minum.',
    category: 'KESEHATAN',
    location: 'RT 07 - RT 08',
    status: 'Diproses',
    tanggapan: 'Sudah dilaporkan ke PDAM. Sedang ada perbaikan pipa utama. Estimasi normal dalam 2 hari.',
    tanggapanDate: '2024-12-12T08:00:00Z',
    userId: 'user-11',
    userName: 'Warga RT 07',
    isAnonymous: true,
    priority: 'high',
    createdAt: '2024-12-11T17:00:00Z',
    updatedAt: '2024-12-12T08:00:00Z'
  },
  {
    id: 'laporan-12',
    title: 'Jembatan Kecil Retak',
    description: 'Jembatan kecil penyeberangan sungai di Dusun Slamet mulai retak di bagian tengah. Khawatir tidak kuat menahan beban.',
    category: 'INFRASTRUKTUR',
    location: 'Dusun Slamet, dekat sawah Pak Karno',
    photo: '/assets/images/laporan/jembatan-retak.jpg',
    status: 'Menunggu',
    userId: 'user-12',
    userName: 'Petani Dusun Slamet',
    isAnonymous: false,
    priority: 'high',
    createdAt: '2024-12-12T06:30:00Z',
    updatedAt: '2024-12-12T06:30:00Z'
  }
]

// Helper functions
export const getLaporanByKategori = (kategori: LaporanKategori): Laporan[] => {
  return laporanData.filter(l => l.category === kategori)
}

export const getLaporanByStatus = (status: LaporanStatus): Laporan[] => {
  return laporanData.filter(l => l.status === status)
}

export const getLaporanById = (id: string): Laporan | undefined => {
  return laporanData.find(l => l.id === id)
}

export const getLaporanByUser = (userId: string): Laporan[] => {
  return laporanData.filter(l => l.userId === userId)
}

export const getStatistikLaporan = () => {
  const total = laporanData.length
  const menunggu = laporanData.filter(l => l.status === 'Menunggu').length
  const diproses = laporanData.filter(l => l.status === 'Diproses').length
  const selesai = laporanData.filter(l => l.status === 'Selesai').length
  const ditolak = laporanData.filter(l => l.status === 'Ditolak').length

  const byCategory = {
    infrastruktur: laporanData.filter(l => l.category === 'INFRASTRUKTUR').length,
    kesehatan: laporanData.filter(l => l.category === 'KESEHATAN').length,
    pendidikan: laporanData.filter(l => l.category === 'PENDIDIKAN').length,
    lingkungan: laporanData.filter(l => l.category === 'LINGKUNGAN').length,
    keamanan: laporanData.filter(l => l.category === 'KEAMANAN').length,
    lainnya: laporanData.filter(l => l.category === 'LAINNYA').length,
  }

  return {
    total,
    menunggu,
    diproses,
    selesai,
    ditolak,
    byCategory,
    persentaseSelesai: Math.round((selesai / total) * 100)
  }
}

export const LAPORAN_CATEGORY_OPTIONS = [
  { value: 'INFRASTRUKTUR', label: 'Infrastruktur', icon: 'road' },
  { value: 'KESEHATAN', label: 'Kesehatan', icon: 'heart' },
  { value: 'PENDIDIKAN', label: 'Pendidikan', icon: 'book' },
  { value: 'LINGKUNGAN', label: 'Lingkungan', icon: 'leaf' },
  { value: 'KEAMANAN', label: 'Keamanan', icon: 'shield' },
  { value: 'LAINNYA', label: 'Lainnya', icon: 'more' }
] as const

export default {
  laporanData,
  getLaporanByKategori,
  getLaporanByStatus,
  getLaporanById,
  getLaporanByUser,
  getStatistikLaporan,
  LAPORAN_CATEGORY_OPTIONS
}
