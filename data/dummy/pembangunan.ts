/**
 * ============================================
 * DUMMY DATA - PEMBANGUNAN
 * ============================================
 * 
 * Data proyek pembangunan dan transparansi dana
 * desa dengan detail progress dan anggaran.
 */

import { 
  ProyekPembangunan, 
  TransparansiDana, 
  PembangunanKategori,
  PembangunanStatus 
} from '../types'

export const proyekPembangunanData: ProyekPembangunan[] = [
  {
    id: 'proyek-1',
    nama: 'Pembangunan Jalan Desa RT 01-05',
    deskripsi: 'Peningkatan kualitas jalan utama desa sepanjang 2.5 km dengan material beton bertulang untuk meningkatkan akses transportasi warga dan mendukung mobilitas wisatawan. Proyek ini mencakup pelebaran jalan dari 3m menjadi 5m.',
    kategori: 'Infrastruktur',
    anggaran: 750000000,
    realisasiAnggaran: 487500000,
    sumberDana: 'Dana Desa 2024',
    timeline: {
      mulai: '01 Januari 2024',
      selesai: '30 Juni 2024'
    },
    status: 'Berlangsung',
    progress: 65,
    foto: '/assets/images/pembangunan/pembangunan-jembatan.jpg',
    galeri: [
      '/assets/images/pembangunan/pembangunan-jembatan.jpg',
      '/assets/images/pembangunan/pembangunan-sekolah.jpg',
      '/assets/images/pembangunan/pembangunan-irigasi.jpg'
    ],
    penanggungJawab: 'Dinas Pekerjaan Umum',
    kontraktor: 'CV. Bangun Sejahtera',
    lokasi: 'Jalan utama RT 01-05 Desa Baturaden',
    manfaat: [
      'Akses transportasi lebih lancar',
      'Mengurangi waktu tempuh 30%',
      'Mendukung mobilitas wisatawan',
      'Meningkatkan nilai properti warga'
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z'
  },
  {
    id: 'proyek-2',
    nama: 'Instalasi Air Bersih RT 05-07',
    deskripsi: 'Pembangunan sistem distribusi air bersih untuk 75 rumah tangga di RT 05-07. Meliputi pembuatan bak penampung 10.000 liter, pemasangan pipa distribusi, dan instalasi meteran air per rumah.',
    kategori: 'Air Bersih',
    anggaran: 285000000,
    realisasiAnggaran: 114000000,
    sumberDana: 'Dana Desa & Swadaya Masyarakat',
    timeline: {
      mulai: '01 Maret 2024',
      selesai: '31 Agustus 2024'
    },
    status: 'Berlangsung',
    progress: 40,
    foto: '/assets/images/pembangunan/pembangunan-irigasi.jpg',
    galeri: [
      '/assets/images/pembangunan/pembangunan-irigasi.jpg',
      '/assets/images/pembangunan/pembangunan-jembatan.jpg'
    ],
    penanggungJawab: 'Siti Nurhaliza, S.Si.',
    kontraktor: 'CV. Tirta Mandiri',
    lokasi: 'RT 05-07 Desa Baturaden',
    manfaat: [
      '75 KK mendapat akses air bersih',
      'Kualitas air lebih terjamin',
      'Mengurangi ketergantungan air hujan',
      'Meningkatkan kesehatan masyarakat'
    ],
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-11-15T00:00:00Z'
  },
  {
    id: 'proyek-3',
    nama: 'Renovasi Gedung SD Negeri 1',
    deskripsi: 'Perbaikan menyeluruh gedung SD Negeri 1 Baturaden meliputi renovasi atap, pengecatan ulang, perbaikan 6 ruang kelas, renovasi toilet, dan pembuatan taman bermain anak.',
    kategori: 'Pendidikan',
    anggaran: 420000000,
    realisasiAnggaran: 420000000,
    sumberDana: 'APBDes & APBD Kabupaten',
    timeline: {
      mulai: '01 Juli 2024',
      selesai: '30 November 2024'
    },
    status: 'Selesai',
    progress: 100,
    foto: '/assets/images/pembangunan/pembangunan-sekolah.jpg',
    galeri: [
      '/assets/images/pembangunan/pembangunan-sekolah.jpg',
      '/assets/images/pembangunan/pembangunan-jembatan.jpg',
      '/assets/images/pembangunan/pembangunan-irigasi.jpg'
    ],
    penanggungJawab: 'Ahmad Fauzi, S.Pd.',
    kontraktor: 'CV. Edukasi Prima',
    lokasi: 'SD Negeri 1 Baturaden',
    manfaat: [
      'Lingkungan belajar lebih nyaman',
      '350 siswa mendapat fasilitas layak',
      'Taman bermain untuk aktivitas fisik',
      'Toilet memadai dan higienis'
    ],
    createdAt: '2024-07-01T00:00:00Z',
    updatedAt: '2024-11-30T00:00:00Z'
  },
  {
    id: 'proyek-4',
    nama: 'Pembangunan Jembatan Penghubung Dusun',
    deskripsi: 'Konstruksi jembatan beton sepanjang 45 meter menghubungkan Dusun Slamet dengan Dusun Makmur. Jembatan dirancang mampu menahan beban hingga 10 ton untuk mendukung aktivitas pertanian dan wisata.',
    kategori: 'Infrastruktur',
    anggaran: 380000000,
    realisasiAnggaran: 95000000,
    sumberDana: 'Dana Desa 2025',
    timeline: {
      mulai: '01 Februari 2025',
      selesai: '31 Mei 2025'
    },
    status: 'Berlangsung',
    progress: 25,
    foto: '/assets/images/pembangunan/pembangunan-jembatan.jpg',
    galeri: [
      '/assets/images/pembangunan/pembangunan-jembatan.jpg',
      '/assets/images/pembangunan/pembangunan-irigasi.jpg'
    ],
    penanggungJawab: 'Bambang Sutrisno, S.T.',
    kontraktor: 'CV. Jembatan Kokoh',
    lokasi: 'Penghubung Dusun Slamet - Dusun Makmur',
    manfaat: [
      'Akses antar dusun lebih mudah',
      'Mendukung distribusi hasil pertanian',
      'Membuka jalur wisata baru',
      'Meningkatkan konektivitas desa'
    ],
    createdAt: '2025-02-01T00:00:00Z',
    updatedAt: '2024-12-10T00:00:00Z'
  },
  {
    id: 'proyek-5',
    nama: 'Perbaikan Saluran Irigasi Blok Selatan',
    deskripsi: 'Rehabilitasi saluran irigasi primer sepanjang 3.5 km untuk mengairi lahan sawah seluas 120 hektar. Meliputi pengerukan, perbaikan dinding saluran, dan pembuatan pintu air otomatis.',
    kategori: 'Pertanian',
    anggaran: 450000000,
    sumberDana: 'APBDes 2025',
    timeline: {
      mulai: '01 April 2025',
      selesai: '30 September 2025'
    },
    status: 'Perencanaan',
    progress: 0,
    foto: '/assets/images/pembangunan/pembangunan-irigasi.jpg',
    galeri: [
      '/assets/images/pembangunan/pembangunan-irigasi.jpg',
      '/assets/images/pembangunan/pembangunan-sekolah.jpg'
    ],
    penanggungJawab: 'Hendra Gunawan, S.P.',
    lokasi: 'Area Persawahan Blok Selatan',
    manfaat: [
      'Irigasi 120 hektar sawah',
      'Meningkatkan produktivitas pertanian',
      'Sistem pengairan lebih efisien',
      'Mengurangi risiko gagal panen'
    ],
    createdAt: '2024-11-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z'
  },
  {
    id: 'proyek-6',
    nama: 'Pembangunan Posyandu Terpadu',
    deskripsi: 'Pembangunan gedung posyandu modern lengkap dengan ruang pemeriksaan, ruang imunisasi, ruang konsultasi, dan gudang penyimpanan. Dilengkapi dengan peralatan medis dasar dan sistem pencatatan digital.',
    kategori: 'Kesehatan',
    anggaran: 320000000,
    realisasiAnggaran: 256000000,
    sumberDana: 'Dana Desa & Bantuan Provinsi',
    timeline: {
      mulai: '01 Januari 2025',
      selesai: '30 April 2025'
    },
    status: 'Berlangsung',
    progress: 80,
    foto: '/assets/images/pembangunan/pembangunan-sekolah.jpg',
    galeri: [
      '/assets/images/pembangunan/pembangunan-sekolah.jpg',
      '/assets/images/pembangunan/pembangunan-jembatan.jpg'
    ],
    penanggungJawab: 'Dr. Lina Marlina',
    kontraktor: 'CV. Sehat Sejahtera',
    lokasi: 'Kompleks Balai Desa Baturaden',
    manfaat: [
      'Pelayanan kesehatan ibu dan anak',
      'Imunisasi rutin terjangkau',
      'Pemantauan tumbuh kembang anak',
      'Konsultasi gizi gratis'
    ],
    createdAt: '2025-01-01T00:00:00Z',
    updatedAt: '2024-12-10T00:00:00Z'
  },
  {
    id: 'proyek-7',
    nama: 'Renovasi Balai Pertemuan Warga',
    deskripsi: 'Renovasi total balai desa untuk kegiatan masyarakat. Meliputi perluasan kapasitas dari 100 menjadi 200 orang, perbaikan sound system, AC, dan pembuatan dapur umum.',
    kategori: 'Fasilitas Umum',
    anggaran: 580000000,
    sumberDana: 'APBDes & Swadaya Masyarakat',
    timeline: {
      mulai: '01 Mei 2025',
      selesai: '31 Desember 2025'
    },
    status: 'Perencanaan',
    progress: 0,
    foto: '/assets/images/pembangunan/pembangunan-jembatan.jpg',
    galeri: [
      '/assets/images/pembangunan/pembangunan-jembatan.jpg',
      '/assets/images/pembangunan/pembangunan-sekolah.jpg',
      '/assets/images/pembangunan/pembangunan-irigasi.jpg'
    ],
    penanggungJawab: 'Suharto, S.Sos.',
    lokasi: 'Balai Desa Baturaden',
    manfaat: [
      'Kapasitas pertemuan meningkat 2x lipat',
      'Fasilitas modern untuk acara warga',
      'Sound system berkualitas',
      'Dapur untuk kegiatan sosial'
    ],
    createdAt: '2024-10-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z'
  },
  {
    id: 'proyek-8',
    nama: 'Pembangunan Drainase RT 03-04',
    deskripsi: 'Pembangunan sistem drainase sepanjang 1.5 km untuk pencegahan banjir di area permukiman RT 03-04. Saluran dibuat dengan konstruksi beton dengan kedalaman 60cm dan lebar 50cm.',
    kategori: 'Infrastruktur',
    anggaran: 195000000,
    realisasiAnggaran: 107250000,
    sumberDana: 'APBDes 2025',
    timeline: {
      mulai: '01 Maret 2025',
      selesai: '31 Juli 2025'
    },
    status: 'Berlangsung',
    progress: 55,
    foto: '/assets/images/pembangunan/pembangunan-irigasi.jpg',
    galeri: [
      '/assets/images/pembangunan/pembangunan-irigasi.jpg',
      '/assets/images/pembangunan/pembangunan-jembatan.jpg'
    ],
    penanggungJawab: 'Yusuf Hidayat, S.T.',
    kontraktor: 'CV. Saluran Jaya',
    lokasi: 'Permukiman RT 03-04',
    manfaat: [
      'Mencegah banjir saat hujan deras',
      'Lingkungan lebih bersih',
      'Mengurangi genangan air',
      'Mencegah penyakit DBD'
    ],
    createdAt: '2025-03-01T00:00:00Z',
    updatedAt: '2024-12-10T00:00:00Z'
  },
  {
    id: 'proyek-9',
    nama: 'Taman Bermain Anak Desa',
    deskripsi: 'Pembangunan taman bermain ramah anak dengan berbagai wahana seperti ayunan, perosotan, jungkat-jungkit, dan area bermain pasir. Dilengkapi dengan bangku taman dan area hijau.',
    kategori: 'Fasilitas Umum',
    anggaran: 175000000,
    realisasiAnggaran: 175000000,
    sumberDana: 'Dana Desa 2024',
    timeline: {
      mulai: '01 Agustus 2024',
      selesai: '30 Oktober 2024'
    },
    status: 'Selesai',
    progress: 100,
    foto: '/assets/images/pembangunan/pembangunan-sekolah.jpg',
    galeri: [
      '/assets/images/pembangunan/pembangunan-sekolah.jpg',
      '/assets/images/pembangunan/pembangunan-irigasi.jpg'
    ],
    penanggungJawab: 'Sri Wahyuni, S.Sos.',
    kontraktor: 'CV. Playground Indonesia',
    lokasi: 'Depan Balai Desa Baturaden',
    manfaat: [
      'Area bermain aman untuk anak',
      'Meningkatkan aktivitas fisik anak',
      'Tempat berkumpul keluarga',
      'Menghijaukan lingkungan desa'
    ],
    createdAt: '2024-08-01T00:00:00Z',
    updatedAt: '2024-10-30T00:00:00Z'
  },
  {
    id: 'proyek-10',
    nama: 'Rehabilitasi Embung Pertanian',
    deskripsi: 'Rehabilitasi embung untuk cadangan air pertanian kapasitas 5.000 m³. Meliputi pengerukan, perkuatan dinding tanggul, dan pembuatan sistem pembuangan.',
    kategori: 'Pertanian',
    anggaran: 350000000,
    sumberDana: 'APBD Provinsi',
    timeline: {
      mulai: '01 Juni 2025',
      selesai: '30 November 2025'
    },
    status: 'Perencanaan',
    progress: 0,
    foto: '/assets/images/pembangunan/pembangunan-irigasi.jpg',
    galeri: [
      '/assets/images/pembangunan/pembangunan-irigasi.jpg',
      '/assets/images/pembangunan/pembangunan-jembatan.jpg',
      '/assets/images/pembangunan/pembangunan-sekolah.jpg'
    ],
    penanggungJawab: 'Dinas Pertanian Kabupaten',
    lokasi: 'Area Persawahan Desa Baturaden',
    manfaat: [
      'Cadangan air 5.000 m³',
      'Mengairi 80 hektar sawah',
      'Antisipasi kekeringan',
      'Budidaya ikan air tawar'
    ],
    createdAt: '2024-09-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z'
  }
]

export const transparansiDana: TransparansiDana = {
  totalAnggaran: 4500000000,
  totalRealisasi: 2875000000,
  tahunAnggaran: '2024/2025',
  items: [
    {
      sumber: 'Dana Desa (DD)',
      jumlah: 1800000000,
      tahun: '2024',
      keterangan: 'Transfer dari APBN untuk pembangunan desa'
    },
    {
      sumber: 'Alokasi Dana Desa (ADD)',
      jumlah: 950000000,
      tahun: '2024',
      keterangan: 'Bagian dari dana perimbangan kabupaten'
    },
    {
      sumber: 'Bagi Hasil Pajak & Retribusi',
      jumlah: 450000000,
      tahun: '2024',
      keterangan: 'Bagi hasil pajak daerah dan retribusi'
    },
    {
      sumber: 'Bantuan Provinsi',
      jumlah: 650000000,
      tahun: '2024',
      keterangan: 'Program bantuan infrastruktur provinsi'
    },
    {
      sumber: 'Pendapatan Asli Desa',
      jumlah: 350000000,
      tahun: '2024',
      keterangan: 'Retribusi wisata, pasar, dan sewa tanah desa'
    },
    {
      sumber: 'Swadaya Masyarakat',
      jumlah: 300000000,
      tahun: '2024',
      keterangan: 'Partisipasi warga dalam pembangunan'
    }
  ],
  lastUpdated: '2024-12-10T00:00:00Z'
}

// Helper functions
export const getProyekByKategori = (kategori: PembangunanKategori): ProyekPembangunan[] => {
  return proyekPembangunanData.filter(p => p.kategori === kategori)
}

export const getProyekByStatus = (status: PembangunanStatus): ProyekPembangunan[] => {
  return proyekPembangunanData.filter(p => p.status === status)
}

export const getProyekById = (id: string): ProyekPembangunan | undefined => {
  return proyekPembangunanData.find(p => p.id === id)
}

export const getAllKategori = (): PembangunanKategori[] => {
  return [...new Set(proyekPembangunanData.map(p => p.kategori))]
}

export const getStatistikPembangunan = () => {
  const total = proyekPembangunanData.length
  const selesai = proyekPembangunanData.filter(p => p.status === 'Selesai').length
  const berlangsung = proyekPembangunanData.filter(p => p.status === 'Berlangsung').length
  const perencanaan = proyekPembangunanData.filter(p => p.status === 'Perencanaan').length
  
  const totalAnggaran = proyekPembangunanData.reduce((sum, p) => sum + p.anggaran, 0)
  const totalRealisasi = proyekPembangunanData.reduce((sum, p) => sum + (p.realisasiAnggaran || 0), 0)
  
  return {
    total,
    selesai,
    berlangsung,
    perencanaan,
    totalAnggaran,
    totalRealisasi,
    persentaseRealisasi: Math.round((totalRealisasi / totalAnggaran) * 100)
  }
}

export default {
  proyekPembangunanData,
  transparansiDana,
  getProyekByKategori,
  getProyekByStatus,
  getProyekById,
  getAllKategori,
  getStatistikPembangunan
}
