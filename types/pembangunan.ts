export interface ProyekPembangunan {
  id: string
  nama: string
  deskripsi: string
  kategori: 'Infrastruktur' | 'Air Bersih' | 'Pertanian' | 'Pendidikan' | 'Kesehatan' | 'Fasilitas Umum'
  anggaran: number
  sumberDana: string
  timeline: {
    mulai: string // Format: "Januari 2025"
    selesai: string
  }
  status: 'Perencanaan' | 'Berlangsung' | 'Selesai' | 'Ditunda'
  progress: number // 0-100
  foto: string // URL gambar
  penanggungJawab: string
}

export const dummyProyekPembangunan: ProyekPembangunan[] = [
  {
    id: '1',
    nama: 'Pembangunan Jalan Desa Utara',
    deskripsi: 'Pengaspalan jalan sepanjang 2.5 km untuk akses ke area pertanian',
    kategori: 'Infrastruktur',
    anggaran: 450000000,
    sumberDana: 'APBDes 2025',
    timeline: {
      mulai: 'Januari 2025',
      selesai: 'Juni 2025'
    },
    status: 'Berlangsung',
    progress: 65,
    foto: '/assets/images/bg-hero.png',
    penanggungJawab: 'Budi Santoso, S.T.'
  },
  {
    id: '2',
    nama: 'Instalasi Air Bersih RT 05',
    deskripsi: 'Pembangunan sistem distribusi air bersih untuk 50 rumah tangga',
    kategori: 'Air Bersih',
    anggaran: 180000000,
    sumberDana: 'Dana Desa & Swadaya',
    timeline: {
      mulai: 'Maret 2025',
      selesai: 'Agustus 2025'
    },
    status: 'Berlangsung',
    progress: 40,
    foto: '/assets/images/bg-hero.png',
    penanggungJawab: 'Siti Nurhaliza, S.Si.'
  },
  {
    id: '3',
    nama: 'Renovasi Gedung SD Negeri 1',
    deskripsi: 'Perbaikan atap, cat dinding, dan renovasi 6 ruang kelas',
    kategori: 'Pendidikan',
    anggaran: 320000000,
    sumberDana: 'APBDes & APBD Kab.',
    timeline: {
      mulai: 'November 2024',
      selesai: 'Februari 2025'
    },
    status: 'Selesai',
    progress: 100,
    foto: '/assets/images/bg-hero.png',
    penanggungJawab: 'Ahmad Fauzi, S.Pd.'
  },
  {
    id: '4',
    nama: 'Pembangunan Jembatan Bambu',
    deskripsi: 'Jembatan penghubung antar dusun sepanjang 45 meter',
    kategori: 'Infrastruktur',
    anggaran: 275000000,
    sumberDana: 'Dana Desa 2025',
    timeline: {
      mulai: 'Februari 2025',
      selesai: 'Mei 2025'
    },
    status: 'Berlangsung',
    progress: 25,
    foto: '/assets/images/bg-hero.png',
    penanggungJawab: 'Bambang Sutrisno, S.T.'
  },
  {
    id: '5',
    nama: 'Irigasi Sawah Blok Selatan',
    deskripsi: 'Perbaikan saluran irigasi primer sepanjang 3 km',
    kategori: 'Pertanian',
    anggaran: 390000000,
    sumberDana: 'APBDes 2025',
    timeline: {
      mulai: 'April 2025',
      selesai: 'September 2025'
    },
    status: 'Perencanaan',
    progress: 0,
    foto: '/assets/images/bg-hero.png',
    penanggungJawab: 'Hendra Gunawan, S.P.'
  },
  {
    id: '6',
    nama: 'Posyandu Balita Desa',
    deskripsi: 'Pembangunan gedung posyandu lengkap dengan peralatan medis',
    kategori: 'Kesehatan',
    anggaran: 210000000,
    sumberDana: 'Dana Desa & Bantuan Provinsi',
    timeline: {
      mulai: 'Januari 2025',
      selesai: 'April 2025'
    },
    status: 'Berlangsung',
    progress: 80,
    foto: '/assets/images/bg-hero.png',
    penanggungJawab: 'Dr. Lina Marlina'
  },
  {
    id: '7',
    nama: 'Balai Pertemuan Warga',
    deskripsi: 'Renovasi total balai desa untuk kegiatan masyarakat',
    kategori: 'Fasilitas Umum',
    anggaran: 520000000,
    sumberDana: 'APBDes & Swadaya Masyarakat',
    timeline: {
      mulai: 'Mei 2025',
      selesai: 'Desember 2025'
    },
    status: 'Perencanaan',
    progress: 0,
    foto: '/assets/images/bg-hero.png',
    penanggungJawab: 'Suharto, S.Sos.'
  },
  {
    id: '8',
    nama: 'Drainase Lingkungan RT 03',
    deskripsi: 'Pembangunan sistem drainase untuk pencegahan banjir',
    kategori: 'Infrastruktur',
    anggaran: 165000000,
    sumberDana: 'APBDes 2025',
    timeline: {
      mulai: 'Maret 2025',
      selesai: 'Juli 2025'
    },
    status: 'Berlangsung',
    progress: 55,
    foto: '/assets/images/bg-hero.png',
    penanggungJawab: 'Yusuf Hidayat, S.T.'
  }
]
