import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import UmkmDetailClient from './UmkmDetailClient'

interface PageProps {
  params: {
    id: string
  }
}

// Dummy data untuk UMKM (nanti bisa diganti dengan API)
const umkmData = [
  {
    id: 'kopi-lereng-slamet',
    nama: 'Kopi Lereng Slamet',
    deskripsi: 'Nikmati kopi lokal hasil panen petani Baturaden. Setiap cangkir menghadirkan kehangatan dari sejuknya lereng gunung. Kopi ini dipanen langsung dari kebun kopi di lereng Gunung Slamet dengan ketinggian optimal untuk menghasilkan biji kopi berkualitas tinggi.\n\nProses pengolahan dilakukan secara tradisional dengan sentuhan modern untuk menjaga kualitas dan cita rasa khas pegunungan. Cocok untuk Anda yang menyukai kopi dengan karakter strong dan aroma yang khas.',
    pemilik: 'Pak Budi Santoso',
    alamat: 'Jl. Raya Baturaden No. 45, Desa Baturaden',
    kontak: '0812-3456-7890',
    harga: 45000,
    kategori: 'Minuman',
    foto: '/assets/images/umkm-kopi-lereng-slamet.png',
    gambar: [
      '/assets/images/umkm-kopi-lereng-slamet.png',
      '/assets/images/bg-hero.png',
      '/assets/images/bg-hero.png',
    ],
    jamBuka: '07:00',
    jamTutup: '20:00',
    produk: [
      'Kopi Arabica Premium - Rp 45.000',
      'Kopi Robusta - Rp 35.000',
      'Kopi Bubuk Halus - Rp 40.000',
    ],
  },
  {
    id: 'herbal-wangi-lestari',
    nama: 'Herbal Wangi Lestari',
    deskripsi: 'Produk herbal alami dari bahan segar pegunungan untuk kesehatan dan relaksasi alami. Dibuat dari tanaman herbal pilihan yang tumbuh subur di kawasan Baturaden dengan udara sejuk dan tanah yang subur.\n\nSetiap produk diolah dengan metode tradisional yang diwariskan turun-temurun, menjaga khasiat alami tanpa bahan kimia berbahaya.',
    pemilik: 'Ibu Siti Aminah',
    alamat: 'Jl. Mendung Sari No. 12, Desa Baturaden',
    kontak: '0856-7890-1234',
    harga: 35000,
    kategori: 'Kesehatan',
    foto: '/assets/images/umkm-herbal-wangi-lestari.png',
    gambar: ['/assets/images/umkm-herbal-wangi-lestari.png'],
    jamBuka: '08:00',
    jamTutup: '17:00',
    produk: [
      'Teh Herbal Jahe - Rp 25.000',
      'Minyak Kayu Putih - Rp 35.000',
      'Balsem Herbal - Rp 30.000',
    ],
  },
  {
    id: 'batik-lestari-baturraden',
    nama: 'Batik Lestari Baturaden',
    deskripsi: 'Motif batik terinspirasi dari alam — dibuat dengan tangan penuh makna dan budaya lokal. Setiap helai kain batik dikerjakan dengan teknik tulis dan cap yang telah diwariskan selama puluhan tahun.\n\nMotif yang digunakan mengangkat keindahan alam Baturaden seperti air terjun, pepohonan, dan flora khas pegunungan yang menjadi ciri khas batik Baturaden.',
    pemilik: 'Ibu Dewi Lestari',
    alamat: 'Jl. Batik Indah No. 8, Desa Baturaden',
    kontak: '0821-9876-5432',
    harga: 250000,
    kategori: 'Fashion',
    foto: '/assets/images/umkm-batik-lestari-baturraden.png',
    gambar: ['/assets/images/umkm-batik-lestari-baturraden.png'],
    jamBuka: '09:00',
    jamTutup: '18:00',
    produk: [
      'Kain Batik Tulis Premium - Rp 350.000',
      'Kain Batik Cap - Rp 250.000',
      'Kemeja Batik Pria - Rp 200.000',
      'Dress Batik Wanita - Rp 275.000',
    ],
  },
  {
    id: 'pasar-sayur-segar',
    nama: 'Pasar Sayur Segar',
    deskripsi: 'Sayuran segar langsung dari ladang petani lokal — sehat, alami, dan penuh kesegaran setiap hari. Setiap pagi, sayuran dipanen langsung dari kebun organik di sekitar Baturaden yang bebas pestisida kimia.\n\nKami menyediakan berbagai jenis sayuran lokal dan imported dengan kualitas terbaik dan harga yang terjangkau untuk memenuhi kebutuhan dapur keluarga Indonesia.',
    pemilik: 'Pak Ahmad Yani',
    alamat: 'Pasar Baturaden Blok B No. 15',
    kontak: '0813-2468-1357',
    harga: 25000,
    kategori: 'Makanan',
    foto: '/assets/images/umkm-pasar-sayur-segar.png',
    gambar: ['/assets/images/umkm-pasar-sayur-segar.png'],
    jamBuka: '05:00',
    jamTutup: '12:00',
    produk: [
      'Paket Sayur Organik A - Rp 25.000',
      'Paket Sayur Organik B - Rp 35.000',
      'Sayuran Hidroponik Premium - Rp 30.000',
    ],
  },
  {
    id: 'kerajinan-sumber-rejeki',
    nama: 'Kerajinan Sumber Rejeki',
    deskripsi: 'Anyaman bambu dan tas rajut hasil tangan pengrajin lokal — karya penuh makna dari alam Baturaden. Setiap produk dikerjakan oleh pengrajin berpengalaman yang telah menggeluti kerajinan anyaman selama puluhan tahun.\n\nBahan baku bambu dan rotan dipilih dari hutan lokal yang dikelola secara berkelanjutan, menghasilkan produk ramah lingkungan dengan kualitas tinggi dan daya tahan lama.',
    pemilik: 'Pak Suryanto',
    alamat: 'Jl. Kerajinan No. 22, Desa Baturaden',
    kontak: '0878-5432-1098',
    harga: 75000,
    kategori: 'Kerajinan',
    foto: '/assets/images/umkm-kerajinan-sumber-rejeki.png',
    gambar: ['/assets/images/umkm-kerajinan-sumber-rejeki.png'],
    jamBuka: '08:00',
    jamTutup: '16:00',
    produk: [
      'Tas Anyaman Bambu Sedang - Rp 75.000',
      'Tas Anyaman Bambu Besar - Rp 100.000',
      'Keranjang Buah - Rp 50.000',
      'Tempat Tisu Anyaman - Rp 35.000',
    ],
  },
  {
    id: 'madu-hutan-baturaden',
    nama: 'Madu Hutan Baturaden',
    deskripsi: 'Madu murni dari hutan pegunungan Baturaden. Kaya manfaat dan nikmat untuk kesehatan keluarga. Madu ini dipanen langsung dari sarang lebah hutan liar yang hidup di pepohonan tinggi di kawasan hutan pegunungan.\n\nProses panen dilakukan secara tradisional dan alami tanpa merusak habitat lebah, menjaga kelestarian alam sekaligus menghasilkan madu berkualitas tinggi yang kaya nutrisi dan memiliki khasiat kesehatan yang luar biasa.',
    pemilik: 'Pak Widodo',
    alamat: 'Jl. Hutan Raya No. 7, Desa Baturaden',
    kontak: '0819-6543-2109',
    harga: 85000,
    kategori: 'Kesehatan',
    foto: '/assets/images/umkm-herbal-wangi-lestari.png',
    gambar: ['/assets/images/umkm-herbal-wangi-lestari.png'],
    jamBuka: '08:00',
    jamTutup: '17:00',
    produk: [
      'Madu Murni 250ml - Rp 65.000',
      'Madu Murni 500ml - Rp 115.000',
      'Madu Murni 1L - Rp 200.000',
      'Propolis - Rp 150.000',
    ],
  },
]

// Server Component - Fetch data
export default async function UmkmDetailPage({ params }: PageProps) {
  // Find UMKM by ID
  const umkm = umkmData.find((item) => item.id === params.id)

  if (!umkm) {
    notFound()
  }

  // Pass data to client component
  return <UmkmDetailClient umkmData={umkm} />
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const umkm = umkmData.find((item) => item.id === params.id)

  if (!umkm) {
    return {
      title: 'UMKM Tidak Ditemukan',
    }
  }

  return {
    title: `${umkm.nama} | UMKM Baturaden`,
    description: umkm.deskripsi.substring(0, 160),
  }
}
