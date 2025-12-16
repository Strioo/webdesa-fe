/**
 * ============================================
 * DUMMY DATA - WISATA / TOURISM
 * ============================================
 * 
 * Data lengkap destinasi wisata di Desa Baturaden
 * dengan detail, fasilitas, dan lokasi.
 */

import { Wisata, WisataListItem, WisataCategory } from '../types'

export const wisataData: Wisata[] = [
  {
    id: 'wisata-1',
    slug: 'lokawisata',
    name: 'Lokawisata Baturaden',
    description: 'Lokawisata Baturaden adalah destinasi wisata alam populer di kaki Gunung Slamet yang menawarkan pemandangan hijau, udara sejuk, dan suasana tenang. Tempat ini cocok untuk keluarga, rekreasi, atau sekadar menikmati berbagai wahana seperti kolam air panas, area bermain anak, hingga spot foto dengan panorama pegunungan yang menyejukkan. Di sekitar juga tersedia area kuliner dengan wahana menarik seperti taman bunga warna-warni, kolam air panas alami, area bermain anak, hingga spot foto dengan panorama pegunungan yang menyejukkan.',
    shortDescription: 'Destinasi wisata alam populer dengan kolam air panas dan pemandangan Gunung Slamet.',
    category: 'Wisata Alam',
    price: 15000,
    priceWeekend: 20000,
    openTime: '08:00',
    closeTime: '17:00',
    phone: '+6282137654321',
    images: [
      { src: '/assets/images/wisata/wisata-preview-1.jpg', alt: 'Lokawisata Baturaden - Air Terjun Utama' },
      { src: '/assets/images/wisata/wisata-preview-2.jpg', alt: 'Lokawisata Baturaden - Area Kolam' },
      { src: '/assets/images/wisata/wisata-preview-3.jpg', alt: 'Lokawisata Baturaden - Jembatan Merah' },
      { src: '/assets/images/wisata/wisata-preview-2.jpg', alt: 'Lokawisata Baturaden - Taman Bunga' },
      { src: '/assets/images/wisata/wisata-preview-2.jpg', alt: 'Lokawisata Baturaden - Spot Foto' },
      { src: '/assets/images/wisata/wisata-preview-3.jpg', alt: 'Lokawisata Baturaden - Area Bermain' }
    ],
    facilities: [
      { key: 'parking', label: 'Area parkir luas', icon: 'parking' },
      { key: 'pool', label: 'Kolam air panas dan taman bermain', icon: 'pool' },
      { key: 'photo', label: 'Spot foto dan taman bunga', icon: 'photo' },
      { key: 'mushola', label: 'Mushola dan toilet umum', icon: 'mushola' },
      { key: 'food', label: 'Warung & area kuliner lokal', icon: 'food' },
      { key: 'lodging', label: 'Penginapan sekitar lokasi', icon: 'lodging' }
    ],
    location: {
      lat: -7.3028,
      lng: 109.2341,
      address: 'Jl. Raya Baturaden No. 1, Baturaden, Banyumas, Jawa Tengah 53151'
    },
    isActive: true,
    isFeatured: true,
    rating: 4.5,
    reviewCount: 1250,
    tips: [
      'Datang pagi hari untuk menghindari keramaian',
      'Bawa pakaian ganti jika ingin berendam di kolam air panas',
      'Gunakan alas kaki yang nyaman untuk trekking'
    ],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z'
  },
  {
    id: 'wisata-2',
    slug: 'bukit-bintang',
    name: 'Bukit Bintang Baturaden',
    description: 'Bukit Bintang Baturaden menawarkan pemandangan sunrise spektakuler dengan latar Gunung Slamet. Nikmati keindahan langit malam dan ketenangan dengan pemandangan lampu kota Purwokerto. Spot favorit para fotografer dan pecinta alam untuk menikmati keindahan alam Baturaden dari ketinggian. Cocok untuk camping, healing, dan menikmati ketenangan alam.',
    shortDescription: 'Spot terbaik untuk menikmati sunrise dan pemandangan malam kota Purwokerto.',
    category: 'Wisata Alam',
    price: 15000,
    openTime: '05:00',
    closeTime: '21:00',
    phone: '+6282137654322',
    images: [
      { src: '/assets/images/wisata/wisata-preview-2.jpg', alt: 'Bukit Bintang - Sunrise View' },
      { src: '/assets/images/wisata/wisata-preview-3.jpg', alt: 'Bukit Bintang - Viewpoint' },
      { src: '/assets/images/wisata/wisata-preview-1.jpg', alt: 'Bukit Bintang - Night Sky' },
      { src: '/assets/images/wisata/wisata-preview-2.jpg', alt: 'Bukit Bintang - Camping Area' },
      { src: '/assets/images/wisata/wisata-preview-3.jpg', alt: 'Bukit Bintang - Panorama' },
      { src: '/assets/images/wisata/wisata-preview-1.jpg', alt: 'Bukit Bintang - Sunset View' }
    ],
    facilities: [
      { key: 'parking', label: 'Area parkir', icon: 'parking' },
      { key: 'sunrise', label: 'Spot sunrise terbaik', icon: 'photo' },
      { key: 'cafe', label: 'Cafe & resto dengan view', icon: 'food' },
      { key: 'toilet', label: 'Toilet umum', icon: 'mushola' },
      { key: 'camping', label: 'Camping ground', icon: 'lodging' }
    ],
    location: {
      lat: -7.3015,
      lng: 109.2355,
      address: 'Bukit Bintang, Baturaden, Banyumas, Jawa Tengah'
    },
    isActive: true,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 890,
    tips: [
      'Datang sebelum jam 5 pagi untuk sunrise terbaik',
      'Bawa jaket tebal karena udara sangat dingin',
      'Siapkan kamera untuk foto night sky'
    ],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-11-20T00:00:00Z'
  },
  {
    id: 'wisata-3',
    slug: 'adventure-forest',
    name: 'Baturaden Adventure Forest',
    description: 'Tempat ideal untuk pecinta alam dan tantangan. Nikmati aktivitas seperti trekking, flying fox, dan edukasi konservasi lingkungan. Fasilitas outbound lengkap dengan pemandu berpengalaman untuk menjamin keamanan dan kenyamanan petualangan Anda di tengah hutan pinus yang asri.',
    shortDescription: 'Destinasi petualangan dengan flying fox, trekking, dan aktivitas outbound.',
    category: 'Wisata Petualangan',
    price: 30000,
    priceWeekend: 35000,
    openTime: '07:00',
    closeTime: '17:00',
    phone: '+6282137654323',
    images: [
      { src: '/assets/images/wisata/wisata-preview-3.jpg', alt: 'Adventure Forest - Flying Fox' },
      { src: '/assets/images/wisata/wisata-preview-1.jpg', alt: 'Adventure Forest - Trekking Trail' },
      { src: '/assets/images/wisata/wisata-preview-2.jpg', alt: 'Adventure Forest - Tree House' },
      { src: '/assets/images/wisata/wisata-preview-3.jpg', alt: 'Adventure Forest - Outbound Area' },
      { src: '/assets/images/wisata/wisata-preview-1.jpg', alt: 'Adventure Forest - Rope Course' },
      { src: '/assets/images/wisata/wisata-preview-2.jpg', alt: 'Adventure Forest - Rest Area' }
    ],
    facilities: [
      { key: 'flyingfox', label: 'Flying fox 200m', icon: 'adventure' },
      { key: 'trekking', label: 'Trekking trail 5km', icon: 'trail' },
      { key: 'equipment', label: 'Outbound equipment', icon: 'gear' },
      { key: 'safety', label: 'Safety gear rental', icon: 'safety' },
      { key: 'guide', label: 'Guide profesional', icon: 'guide' },
      { key: 'rest', label: 'Rest area & kantin', icon: 'lodging' }
    ],
    location: {
      lat: -7.3020,
      lng: 109.2360,
      address: 'Baturaden Adventure Forest, Banyumas, Jawa Tengah'
    },
    isActive: true,
    isFeatured: false,
    rating: 4.6,
    reviewCount: 456,
    tips: [
      'Gunakan sepatu trekking yang nyaman',
      'Ikuti petunjuk dari pemandu',
      'Cocok untuk team building dan outing'
    ],
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-10-15T00:00:00Z'
  },
  {
    id: 'wisata-4',
    slug: 'gurau',
    name: 'Gurau Baturaden',
    description: 'Spot wisata dengan suasana pedesaan, area camping, dan pemandangan sawah yang menenangkan - cocok untuk healing dan foto estetik. Nikmati kesejukan udara pegunungan sambil menikmati pemandangan hamparan sawah hijau yang membentang luas. Perfect spot untuk quality time bersama keluarga.',
    shortDescription: 'Wisata pedesaan dengan pemandangan sawah terasering dan camping ground.',
    category: 'Wisata Desa',
    price: 10000,
    openTime: '06:00',
    closeTime: '18:00',
    phone: '+6282137654324',
    images: [
      { src: '/assets/images/wisata/wisata-preview-1.jpg', alt: 'Gurau - Sawah Terasering' },
      { src: '/assets/images/wisata/wisata-preview-2.jpg', alt: 'Gurau - Camping Ground' },
      { src: '/assets/images/wisata/wisata-preview-3.jpg', alt: 'Gurau - Sunset View' },
      { src: '/assets/images/wisata/wisata-preview-1.jpg', alt: 'Gurau - Gazebo' },
      { src: '/assets/images/wisata/wisata-preview-2.jpg', alt: 'Gurau - Rice Field View' },
      { src: '/assets/images/wisata/wisata-preview-3.jpg', alt: 'Gurau - Morning Mist' }
    ],
    facilities: [
      { key: 'camping', label: 'Camping area', icon: 'lodging' },
      { key: 'gazebo', label: 'Gazebo & saung', icon: 'shelter' },
      { key: 'photo', label: 'Spot foto estetik', icon: 'photo' },
      { key: 'parking', label: 'Area parkir luas', icon: 'parking' },
      { key: 'toilet', label: 'Toilet & mushola', icon: 'mushola' }
    ],
    location: {
      lat: -7.3005,
      lng: 109.2348,
      address: 'Gurau, Baturaden, Banyumas, Jawa Tengah'
    },
    isActive: true,
    isFeatured: false,
    rating: 4.4,
    reviewCount: 320,
    tips: [
      'Bawa perlengkapan camping sendiri',
      'Waktu terbaik saat sunrise dan sunset',
      'Siapkan jaket untuk malam hari'
    ],
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-11-01T00:00:00Z'
  },
  {
    id: 'wisata-5',
    slug: 'bhumi-bambu',
    name: 'Bhumi Bambu Baturaden',
    description: 'Wisata dengan konsep bambu alami dan arsitektur unik. Dilengkapi spot foto, taman bambu, serta kuliner khas pegunungan. Tempat yang tepat untuk belajar tentang kerajinan bambu sambil menikmati suasana alam yang asri dan sejuk. Cocok untuk wisata edukasi keluarga dan pecinta arsitektur bambu.',
    shortDescription: 'Wisata edukasi dengan konsep bambu alami dan arsitektur unik.',
    category: 'Wisata Edukasi',
    price: 20000,
    openTime: '08:00',
    closeTime: '17:00',
    phone: '+6282137654325',
    images: [
      { src: '/assets/images/wisata/wisata-preview-2.jpg', alt: 'Bhumi Bambu - Bamboo Garden' },
      { src: '/assets/images/wisata/wisata-preview-3.jpg', alt: 'Bhumi Bambu - Traditional House' },
      { src: '/assets/images/wisata/wisata-preview-1.jpg', alt: 'Bhumi Bambu - Dining Area' },
      { src: '/assets/images/wisata/wisata-preview-2.jpg', alt: 'Bhumi Bambu - Workshop' },
      { src: '/assets/images/wisata/wisata-preview-3.jpg', alt: 'Bhumi Bambu - Bamboo Bridge' },
      { src: '/assets/images/wisata/wisata-preview-1.jpg', alt: 'Bhumi Bambu - Photo Spot' }
    ],
    facilities: [
      { key: 'garden', label: 'Taman bambu', icon: 'garden' },
      { key: 'photo', label: 'Spot foto instagramable', icon: 'photo' },
      { key: 'resto', label: 'Resto & cafe', icon: 'food' },
      { key: 'playground', label: 'Area bermain anak', icon: 'playground' },
      { key: 'workshop', label: 'Workshop kerajinan bambu', icon: 'workshop' },
      { key: 'gazebo', label: 'Gazebo bambu', icon: 'shelter' }
    ],
    location: {
      lat: -7.3012,
      lng: 109.2342,
      address: 'Bhumi Bambu, Baturaden, Banyumas, Jawa Tengah'
    },
    isActive: true,
    isFeatured: true,
    rating: 4.5,
    reviewCount: 567,
    tips: [
      'Ikuti workshop kerajinan bambu untuk pengalaman unik',
      'Coba menu kuliner khas dari bambu',
      'Cocok untuk foto prewedding'
    ],
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z'
  },
  {
    id: 'wisata-6',
    slug: 'taman-botani',
    name: 'Taman Botani Baturaden',
    description: 'Surga bagi pecinta tanaman dan fotografi. Ratusan koleksi flora tropis dan bunga warna-warni menciptakan suasana taman yang sejuk dan indah. Taman botani ini menjadi tempat edukasi yang menyenangkan untuk mengenal berbagai jenis tanaman sambil menikmati keindahan alam yang tertata rapi.',
    shortDescription: 'Koleksi ratusan flora tropis dengan taman bunga yang indah.',
    category: 'Wisata Edukasi',
    price: 20000,
    openTime: '08:00',
    closeTime: '16:00',
    phone: '+6282137654326',
    images: [
      { src: '/assets/images/wisata/wisata-preview-3.jpg', alt: 'Taman Botani - Flower Garden' },
      { src: '/assets/images/wisata/wisata-preview-1.jpg', alt: 'Taman Botani - Tropical Plants' },
      { src: '/assets/images/wisata/wisata-preview-2.jpg', alt: 'Taman Botani - Walking Path' },
      { src: '/assets/images/wisata/wisata-preview-3.jpg', alt: 'Taman Botani - Greenhouse' },
      { src: '/assets/images/wisata/wisata-preview-1.jpg', alt: 'Taman Botani - Orchid House' },
      { src: '/assets/images/wisata/wisata-preview-2.jpg', alt: 'Taman Botani - Garden Pond' }
    ],
    facilities: [
      { key: 'flora', label: 'Koleksi 500+ flora', icon: 'garden' },
      { key: 'flower', label: 'Taman bunga warna-warni', icon: 'flower' },
      { key: 'edu', label: 'Jalur edukasi botani', icon: 'education' },
      { key: 'photo', label: 'Spot foto aesthetic', icon: 'photo' },
      { key: 'picnic', label: 'Area piknik keluarga', icon: 'picnic' },
      { key: 'greenhouse', label: 'Greenhouse tanaman langka', icon: 'greenhouse' }
    ],
    location: {
      lat: -7.3025,
      lng: 109.2338,
      address: 'Taman Botani, Baturaden, Banyumas, Jawa Tengah'
    },
    isActive: true,
    isFeatured: false,
    rating: 4.3,
    reviewCount: 234,
    tips: [
      'Bawa kamera untuk fotografi tanaman',
      'Ikuti tur edukasi dengan guide',
      'Cocok untuk wisata sekolah'
    ],
    createdAt: '2024-04-01T00:00:00Z',
    updatedAt: '2024-10-01T00:00:00Z'
  },
  {
    id: 'wisata-7',
    slug: 'pancuran-pitu',
    name: 'Pancuran Pitu',
    description: 'Pemandian air panas alami dengan 7 pancuran yang dipercaya memiliki khasiat menyembuhkan berbagai penyakit kulit. Setiap pancuran memiliki suhu dan kandungan mineral yang berbeda. Tempat wisata bersejarah yang sudah ada sejak zaman Belanda dan masih terawat hingga kini.',
    shortDescription: 'Pemandian air panas alami dengan 7 pancuran berkhasiat.',
    category: 'Wisata Alam',
    price: 12000,
    openTime: '07:00',
    closeTime: '16:00',
    phone: '+6282137654327',
    images: [
      { src: '/assets/images/wisata/wisata-preview-1.jpg', alt: 'Pancuran Pitu - Main Pool' },
      { src: '/assets/images/wisata/wisata-preview-2.jpg', alt: 'Pancuran Pitu - Hot Springs' },
      { src: '/assets/images/wisata/wisata-preview-3.jpg', alt: 'Pancuran Pitu - Natural Setting' },
      { src: '/assets/images/wisata/wisata-preview-1.jpg', alt: 'Pancuran Pitu - Seven Showers' },
      { src: '/assets/images/wisata/wisata-preview-2.jpg', alt: 'Pancuran Pitu - Changing Room' },
      { src: '/assets/images/wisata/wisata-preview-3.jpg', alt: 'Pancuran Pitu - Surroundings' }
    ],
    facilities: [
      { key: 'hotspring', label: '7 pancuran air panas', icon: 'pool' },
      { key: 'locker', label: 'Loker & kamar bilas', icon: 'locker' },
      { key: 'parking', label: 'Area parkir', icon: 'parking' },
      { key: 'food', label: 'Warung makan', icon: 'food' },
      { key: 'toilet', label: 'Toilet umum', icon: 'mushola' }
    ],
    location: {
      lat: -7.3035,
      lng: 109.2345,
      address: 'Pancuran Pitu, Baturaden, Banyumas, Jawa Tengah'
    },
    isActive: true,
    isFeatured: false,
    rating: 4.2,
    reviewCount: 678,
    tips: [
      'Bawa pakaian ganti dan handuk',
      'Berendam 15-30 menit untuk hasil optimal',
      'Minum air putih setelah berendam'
    ],
    createdAt: '2024-01-20T00:00:00Z',
    updatedAt: '2024-09-15T00:00:00Z'
  },
  {
    id: 'wisata-8',
    slug: 'curug-gede',
    name: 'Curug Gede',
    description: 'Air terjun megah dengan ketinggian 40 meter di tengah hutan lindung. Perjalanan trekking menuju curug menawarkan pemandangan hutan tropis yang asri. Cocok untuk pecinta alam dan fotografi landscape. Air yang jernih dan sejuk langsung dari mata air pegunungan.',
    shortDescription: 'Air terjun megah setinggi 40 meter di tengah hutan lindung.',
    category: 'Wisata Alam',
    price: 10000,
    openTime: '07:00',
    closeTime: '16:00',
    phone: '+6282137654328',
    images: [
      { src: '/assets/images/wisata/wisata-preview-2.jpg', alt: 'Curug Gede - Main Waterfall' },
      { src: '/assets/images/wisata/wisata-preview-3.jpg', alt: 'Curug Gede - Trekking Path' },
      { src: '/assets/images/wisata/wisata-preview-1.jpg', alt: 'Curug Gede - Pool Area' },
      { src: '/assets/images/wisata/wisata-preview-2.jpg', alt: 'Curug Gede - Upper Falls' },
      { src: '/assets/images/wisata/wisata-preview-3.jpg', alt: 'Curug Gede - Forest Trail' },
      { src: '/assets/images/wisata/wisata-preview-1.jpg', alt: 'Curug Gede - Natural Pool' }
    ],
    facilities: [
      { key: 'waterfall', label: 'Air terjun 40m', icon: 'waterfall' },
      { key: 'trekking', label: 'Jalur trekking 2km', icon: 'trail' },
      { key: 'parking', label: 'Area parkir', icon: 'parking' },
      { key: 'guide', label: 'Jasa guide lokal', icon: 'guide' },
      { key: 'warung', label: 'Warung sederhana', icon: 'food' }
    ],
    location: {
      lat: -7.3050,
      lng: 109.2370,
      address: 'Curug Gede, Baturaden, Banyumas, Jawa Tengah'
    },
    isActive: true,
    isFeatured: false,
    rating: 4.6,
    reviewCount: 445,
    tips: [
      'Gunakan sepatu trekking anti slip',
      'Hati-hati saat musim hujan',
      'Sewa guide untuk jalur yang aman'
    ],
    createdAt: '2024-03-10T00:00:00Z',
    updatedAt: '2024-11-10T00:00:00Z'
  },
  {
    id: 'wisata-9',
    slug: 'agro-strawberry',
    name: 'Agrowisata Strawberry',
    description: 'Kebun strawberry organik dengan konsep petik langsung. Pengunjung dapat menikmati pengalaman memetik strawberry segar sambil belajar tentang budidaya tanaman strawberry di dataran tinggi. Tersedia juga produk olahan strawberry seperti jus, selai, dan es krim.',
    shortDescription: 'Kebun strawberry organik dengan konsep petik langsung.',
    category: 'Agrowisata',
    price: 25000,
    openTime: '08:00',
    closeTime: '16:00',
    phone: '+6282137654329',
    images: [
      { src: '/assets/images/wisata/wisata-preview-3.jpg', alt: 'Agro Strawberry - Farm' },
      { src: '/assets/images/wisata/wisata-preview-1.jpg', alt: 'Agro Strawberry - Picking' },
      { src: '/assets/images/wisata/wisata-preview-2.jpg', alt: 'Agro Strawberry - Products' },
      { src: '/assets/images/wisata/wisata-preview-3.jpg', alt: 'Agro Strawberry - Fresh Berries' },
      { src: '/assets/images/wisata/wisata-preview-1.jpg', alt: 'Agro Strawberry - Greenhouse' },
      { src: '/assets/images/wisata/wisata-preview-2.jpg', alt: 'Agro Strawberry - Cafe' }
    ],
    facilities: [
      { key: 'picking', label: 'Petik strawberry langsung', icon: 'harvest' },
      { key: 'edu', label: 'Edukasi pertanian', icon: 'education' },
      { key: 'cafe', label: 'Cafe strawberry', icon: 'food' },
      { key: 'shop', label: 'Toko oleh-oleh', icon: 'shop' },
      { key: 'parking', label: 'Area parkir', icon: 'parking' }
    ],
    location: {
      lat: -7.3008,
      lng: 109.2365,
      address: 'Agrowisata Strawberry, Baturaden, Banyumas, Jawa Tengah'
    },
    isActive: true,
    isFeatured: false,
    rating: 4.4,
    reviewCount: 312,
    tips: [
      'Datang pagi untuk strawberry paling segar',
      'Harga petik Rp 40.000/keranjang',
      'Coba es krim strawberry homemade'
    ],
    createdAt: '2024-05-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z'
  },
  {
    id: 'wisata-10',
    slug: 'wana-wisata-kalipagu',
    name: 'Wana Wisata Kalipagu',
    description: 'Kawasan hutan wisata dengan berbagai aktivitas outdoor seperti camping, trekking, dan paintball. Udara sejuk pegunungan dan hutan pinus yang rindang menjadi daya tarik utama. Cocok untuk kegiatan outbound perusahaan, gathering keluarga, dan camping komunitas.',
    shortDescription: 'Kawasan hutan wisata untuk camping, trekking, dan aktivitas outdoor.',
    category: 'Wisata Petualangan',
    price: 15000,
    openTime: '06:00',
    closeTime: '18:00',
    phone: '+6282137654330',
    images: [
      { src: '/assets/images/wisata/wisata-preview-1.jpg', alt: 'Kalipagu - Pine Forest' },
      { src: '/assets/images/wisata/wisata-preview-2.jpg', alt: 'Kalipagu - Camping Area' },
      { src: '/assets/images/wisata/wisata-preview-3.jpg', alt: 'Kalipagu - Trekking Trail' },
      { src: '/assets/images/wisata/wisata-preview-1.jpg', alt: 'Kalipagu - Paintball Arena' },
      { src: '/assets/images/wisata/wisata-preview-2.jpg', alt: 'Kalipagu - Outbound Area' },
      { src: '/assets/images/wisata/wisata-preview-3.jpg', alt: 'Kalipagu - Forest View' }
    ],
    facilities: [
      { key: 'camping', label: 'Camping ground luas', icon: 'lodging' },
      { key: 'trekking', label: 'Jalur trekking hutan', icon: 'trail' },
      { key: 'outbound', label: 'Area outbound', icon: 'adventure' },
      { key: 'paintball', label: 'Arena paintball', icon: 'game' },
      { key: 'parking', label: 'Parkir luas', icon: 'parking' },
      { key: 'toilet', label: 'Toilet & MCK', icon: 'mushola' }
    ],
    location: {
      lat: -7.3060,
      lng: 109.2355,
      address: 'Wana Wisata Kalipagu, Baturaden, Banyumas, Jawa Tengah'
    },
    isActive: true,
    isFeatured: false,
    rating: 4.5,
    reviewCount: 523,
    tips: [
      'Reservasi camping spot untuk weekend',
      'Bawa perlengkapan camping lengkap',
      'Sewa tenda tersedia di lokasi'
    ],
    createdAt: '2024-02-20T00:00:00Z',
    updatedAt: '2024-11-25T00:00:00Z'
  }
]

// Transform ke list item untuk grid display
export const wisataListItems: WisataListItem[] = wisataData.map(w => ({
  id: w.id,
  slug: w.slug,
  name: w.name,
  description: w.shortDescription || w.description.substring(0, 150) + '...',
  price: w.price,
  image: w.images[0]?.src || '/assets/images/placeholder.jpg',
  location: w.location.address.split(',')[0],
  category: w.category,
  rating: w.rating,
  isActive: w.isActive
}))

// Get wisata by slug
export const getWisataBySlug = (slug: string): Wisata | undefined => {
  return wisataData.find(w => w.slug === slug)
}

// Get featured wisata
export const getFeaturedWisata = (): Wisata[] => {
  return wisataData.filter(w => w.isFeatured && w.isActive)
}

// Get wisata by category
export const getWisataByCategory = (category: WisataCategory): Wisata[] => {
  return wisataData.filter(w => w.category === category && w.isActive)
}

// Get all categories
export const getWisataCategories = (): WisataCategory[] => {
  return [...new Set(wisataData.map(w => w.category))]
}

export default {
  wisataData,
  wisataListItems,
  getWisataBySlug,
  getFeaturedWisata,
  getWisataByCategory,
  getWisataCategories
}




