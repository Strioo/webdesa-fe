export interface ProyekPembangunan {
  id: string;
  nama: string;
  deskripsi: string;
  kategori: 'Infrastruktur' | 'Air Bersih' | 'Pertanian' | 'Pendidikan' | 'Kesehatan' | 'Fasilitas Umum';
  anggaran: number;
  sumberDana: string;
  timeline: string; // JSON string or object { mulai, selesai }
  status: 'Perencanaan' | 'Berlangsung' | 'Selesai' | 'Ditunda';
  progress: number;
  foto: string;
  penanggungJawab: string;
  createdAt: string;
  updatedAt: string;
}

export interface TimelineData {
  mulai: string;
  selesai: string;
}

// Helper to parse timeline
export const parseTimeline = (timeline: string | TimelineData): TimelineData => {
  if (typeof timeline === 'string') {
    try {
      return JSON.parse(timeline);
    } catch {
      // Fallback if it's just a text string
      return { mulai: timeline, selesai: timeline };
    }
  }
  return timeline;
};

// Helper to format image URL
export const getImageUrl = (foto: string | null): string => {
  if (!foto) return '/assets/images/placeholder.jpg';
  if (foto.startsWith('http')) return foto;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.18.3:5000';
  return `${baseUrl}${foto}`;
};

// Dummy data for fallback (keep existing)
export const dummyProyekPembangunan: ProyekPembangunan[] = [
  {
    id: '1',
    nama: 'Pembangunan Jalan Desa',
    deskripsi: 'Peningkatan kualitas jalan utama desa sepanjang 2 km dengan material beton untuk meningkatkan akses transportasi warga.',
    kategori: 'Infrastruktur',
    anggaran: 500000000,
    sumberDana: 'Dana Desa 2024',
    timeline: JSON.stringify({ mulai: '01 Jan 2024', selesai: '30 Jun 2024' }),
    status: 'Berlangsung',
    progress: 65,
    foto: '/assets/images/pembangunan/jalan.jpg',
    penanggungJawab: 'Dinas Pekerjaan Umum',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    nama: 'Instalasi Air Bersih RT 05',
    deskripsi: 'Pembangunan sistem distribusi air bersih untuk 50 rumah tangga.',
    kategori: 'Air Bersih',
    anggaran: 180000000,
    sumberDana: 'Dana Desa & Swadaya',
    timeline: JSON.stringify({ mulai: '01 Mar 2024', selesai: '31 Aug 2024' }),
    status: 'Berlangsung',
    progress: 40,
    foto: '/assets/images/pembangunan/air.jpg',
    penanggungJawab: 'Siti Nurhaliza, S.Si.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    nama: 'Renovasi Gedung SD Negeri 1',
    deskripsi: 'Perbaikan atap, cat dinding, dan renovasi 6 ruang kelas.',
    kategori: 'Pendidikan',
    anggaran: 320000000,
    sumberDana: 'APBDes & APBD Kab.',
    timeline: JSON.stringify({ mulai: '01 Nov 2024', selesai: '31 Feb 2025' }),
    status: 'Selesai',
    progress: 100,
    foto: '/assets/images/pembangunan/sd.jpg',
    penanggungJawab: 'Ahmad Fauzi, S.Pd.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '4',
    nama: 'Pembangunan Jembatan Bambu',
    deskripsi: 'Jembatan penghubung antar dusun sepanjang 45 meter.',
    kategori: 'Infrastruktur',
    anggaran: 275000000,
    sumberDana: 'Dana Desa 2025',
    timeline: JSON.stringify({ mulai: '01 Feb 2025', selesai: '30 Mei 2025' }),
    status: 'Berlangsung',
    progress: 25,
    foto: '/assets/images/pembangunan/jembatan.jpg',
    penanggungJawab: 'Bambang Sutrisno, S.T.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    nama: 'Irigasi Sawah Blok Selatan',
    deskripsi: 'Perbaikan saluran irigasi primer sepanjang 3 km.',
    kategori: 'Pertanian',
    anggaran: 390000000,
    sumberDana: 'APBDes 2025',
    timeline: JSON.stringify({ mulai: '01 Apr 2025', selesai: '30 Sep 2025' }),
    status: 'Perencanaan',
    progress: 0,
    foto: '/assets/images/pembangunan/irigasi.jpg',
    penanggungJawab: 'Hendra Gunawan, S.P.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '6',
    nama: 'Posyandu Balita Desa',
    deskripsi: 'Pembangunan gedung posyandu lengkap dengan peralatan medis.',
    kategori: 'Kesehatan',
    anggaran: 210000000,
    sumberDana: 'Dana Desa & Bantuan Provinsi',
    timeline: JSON.stringify({ mulai: '01 Jan 2025', selesai: '30 Apr 2025' }),
    status: 'Berlangsung',
    progress: 80,
    foto: '/assets/images/pembangunan/posyandu.jpg',
    penanggungJawab: 'Dr. Lina Marlina',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '7',
    nama: 'Balai Pertemuan Warga',
    deskripsi: 'Renovasi total balai desa untuk kegiatan masyarakat.',
    kategori: 'Fasilitas Umum',
    anggaran: 520000000,
    sumberDana: 'APBDes & Swadaya Masyarakat',
    timeline: JSON.stringify({ mulai: '01 Mei 2025', selesai: '31 Des 2025' }),
    status: 'Perencanaan',
    progress: 0,
    foto: '/assets/images/pembangunan/balai.jpg',
    penanggungJawab: 'Suharto, S.Sos.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '8',
    nama: 'Drainase Lingkungan RT 03',
    deskripsi: 'Pembangunan sistem drainase untuk pencegahan banjir.',
    kategori: 'Infrastruktur',
    anggaran: 165000000,
    sumberDana: 'APBDes 2025',
    timeline: JSON.stringify({ mulai: '01 Mar 2025', selesai: '31 Jul 2025' }),
    status: 'Berlangsung',
    progress: 55,
    foto: '/assets/images/pembangunan/drainase.jpg',
    penanggungJawab: 'Yusuf Hidayat, S.T.',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
