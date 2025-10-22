// ============================================
// TYPE DEFINITIONS
// ============================================

export interface TourismDestination {
  id: string
  slug: string
  name: string
  category: string
  price: number
  openTime: string
  closeTime: string
  phone: string
  images: TourismImage[]
  facilities: TourismFacility[]
  description: string
  location: TourismLocation
}

export interface TourismFacility {
  key: string
  label: string
  icon: string
}

export interface TourismImage {
  src: string
  alt: string
  width?: number
  height?: number
}

export interface TourismLocation {
  lat: number
  lng: number
  address?: string
  embedUrl?: string
}

export interface MidtransTransaction {
  order_id: string
  gross_amount: number
  customer_details: {
    first_name: string
    last_name?: string
    email: string
    phone: string
  }
  item_details: {
    id: string
    price: number
    quantity: number
    name: string
  }[]
}

export interface MidtransSnapResponse {
  token: string
  redirect_url: string
}

export interface PaymentRequest {
  destinationId: string
  destinationName: string
  quantity: number
  price: number
  customerName: string
  customerEmail: string
  customerPhone: string
}

export interface PaymentResponse {
  success: boolean
  token?: string
  redirectUrl?: string
  error?: string
}

// Mock data for development
export const MOCK_DESTINATIONS: Record<string, TourismDestination> = {
  'lokawisata': {
    id: '1',
    slug: 'lokawisata',
    name: 'Lokawisata Baturaden',
    category: 'Wisata Alam',
    price: 15000,
    openTime: '08:00',
    closeTime: '17:00',
    phone: '+6282137654321',
    images: [
      {
        src: '/assets/images/wisata/lokawisata-1.jpg',
        alt: 'Lokawisata Baturaden - Air Terjun Utama',
      },
      {
        src: '/assets/images/wisata/lokawisata-2.jpg',
        alt: 'Lokawisata Baturaden - Area Kolam',
      },
      {
        src: '/assets/images/wisata/lokawisata-3.jpg',
        alt: 'Lokawisata Baturaden - Jembatan Merah',
      },
      {
        src: '/assets/images/wisata/lokawisata-4.jpg',
        alt: 'Lokawisata Baturaden - Taman Bunga',
      },
      {
        src: '/assets/images/wisata/lokawisata-5.jpg',
        alt: 'Lokawisata Baturaden - Spot Foto',
      },
      {
        src: '/assets/images/wisata/lokawisata-6.jpg',
        alt: 'Lokawisata Baturaden - Area Bermain',
      },
      {
        src: '/assets/images/wisata/lokawisata-7.jpg',
        alt: 'Lokawisata Baturaden - Pemandangan',
      },
      {
        src: '/assets/images/wisata/lokawisata-8.jpg',
        alt: 'Lokawisata Baturaden - Mushola',
      },
      {
        src: '/assets/images/wisata/lokawisata-9.jpg',
        alt: 'Lokawisata Baturaden - Warung Kuliner',
      },
    ],
    facilities: [
      { key: 'parking', label: 'Area parkir luas', icon: 'parking' },
      { key: 'pool', label: 'Kolam air panas dan taman bermain', icon: 'pool' },
      { key: 'photo', label: 'Spot foto dan taman bunga', icon: 'photo' },
      { key: 'mushola', label: 'Mushola dan toilet umum', icon: 'mushola' },
      { key: 'food', label: 'Warung & area kuliner lokal', icon: 'food' },
      { key: 'lodging', label: 'Penginapan sekitar lokasi', icon: 'lodging' },
    ],
    description:
      'Lokawisata Baturaden adalah destinasi wisata alam populer di kaki Gunung Slamet yang menawarkan pemandangan hijau, udara sejuk, dan suasana tenang. Tempat ini cocok untuk keluarga, rekreasi, atau sekadar menikmati berbagai wahana seperti kolam air panas, area bermain anak, hingga spot foto dengan panorama pegunungan yang menyejukkan. Di sekitar juga tersedia area kuliner dengan wahana menarik seperti taman bunga warna-warni, kolam air panas alami, area bermain anak, hingga spot foto dengan panorama pegunungan yang menyejukkan. Di sekitar lokasi juga tersedia area kuliner dan tempat bersantai dengan pemandangan alam terbuka.',
    location: {
      lat: -7.3028,
      lng: 109.2341,
      address: 'Kantor Desa Baturaden, Banyumas, Jawa Tengah',
    },
  },
  'bukit-bintang': {
    id: '2',
    slug: 'bukit-bintang',
    name: 'Bukit Bintang Baturaden',
    category: 'Wisata Alam',
    price: 15000,
    openTime: '05:00',
    closeTime: '21:00',
    phone: '+6282137654322',
    images: [
      {
        src: '/assets/images/wisata/bukit-bintang-1.jpg',
        alt: 'Bukit Bintang - Sunrise View',
      },
      {
        src: '/assets/images/wisata/bukit-bintang-2.jpg',
        alt: 'Bukit Bintang - Viewpoint',
      },
      {
        src: '/assets/images/wisata/bukit-bintang-3.jpg',
        alt: 'Bukit Bintang - Night Sky',
      },
      {
        src: '/assets/images/wisata/bukit-bintang-4.jpg',
        alt: 'Bukit Bintang - Camping Area',
      },
    ],
    facilities: [
      { key: 'parking', label: 'Area parkir', icon: 'parking' },
      { key: 'sunrise', label: 'Spot sunrise terbaik', icon: 'photo' },
      { key: 'cafe', label: 'Cafe & resto dengan view', icon: 'food' },
      { key: 'toilet', label: 'Toilet umum', icon: 'mushola' },
      { key: 'camping', label: 'Camping ground', icon: 'lodging' },
    ],
    description:
      'Bukit Bintang Baturaden menawarkan pemandangan sunrise spektakuler dengan latar Gunung Slamet. Nikmati keindahan langit malam dan ketenangan dengan pemandangan lampu kota Purwokerto. Spot favorit para fotografer dan pecinta alam untuk menikmati keindahan alam Baturaden dari ketinggian. Cocok untuk bersenang-senang dan healing.',
    location: {
      lat: -7.3015,
      lng: 109.2355,
      address: 'Baturaden, Banyumas, Jawa Tengah',
    },
  },
  'adventure-forest': {
    id: '3',
    slug: 'adventure-forest',
    name: 'Baturaden Adventure Forest',
    category: 'Wisata Petualangan',
    price: 30000,
    openTime: '07:00',
    closeTime: '17:00',
    phone: '+6282137654323',
    images: [
      {
        src: '/assets/images/wisata/adventure-forest-1.jpg',
        alt: 'Adventure Forest - Flying Fox',
      },
      {
        src: '/assets/images/wisata/adventure-forest-2.jpg',
        alt: 'Adventure Forest - Trekking Trail',
      },
      {
        src: '/assets/images/wisata/adventure-forest-3.jpg',
        alt: 'Adventure Forest - Tree House',
      },
    ],
    facilities: [
      { key: 'flyingfox', label: 'Flying fox', icon: 'adventure' },
      { key: 'trekking', label: 'Trekking trail', icon: 'trail' },
      { key: 'equipment', label: 'Outbound equipment', icon: 'gear' },
      { key: 'safety', label: 'Safety gear rental', icon: 'safety' },
      { key: 'guide', label: 'Guide profesional', icon: 'guide' },
      { key: 'rest', label: 'Rest area', icon: 'lodging' },
    ],
    description:
      'Tempat ideal untuk pecinta alam dan tantangan. Nikmati aktivitas seperti trekking, flying fox, dan edukasi konservasi lingkungan. Fasilitas outbound lengkap dengan pemandu berpengalaman untuk menjamin keamanan dan kenyamanan petualangan Anda di tengah hutan pinus yang asri.',
    location: {
      lat: -7.3020,
      lng: 109.2360,
      address: 'Baturaden Adventure Forest, Banyumas, Jawa Tengah',
    },
  },
  'gurau': {
    id: '4',
    slug: 'gurau',
    name: 'Gurau Baturaden',
    category: 'Wisata Desa',
    price: 10000,
    openTime: '06:00',
    closeTime: '18:00',
    phone: '+6282137654324',
    images: [
      {
        src: '/assets/images/wisata/gurau-1.jpg',
        alt: 'Gurau - Sawah Terasering',
      },
      {
        src: '/assets/images/wisata/gurau-2.jpg',
        alt: 'Gurau - Camping Ground',
      },
      {
        src: '/assets/images/wisata/gurau-3.jpg',
        alt: 'Gurau - Sunset View',
      },
    ],
    facilities: [
      { key: 'camping', label: 'Camping area', icon: 'lodging' },
      { key: 'gazebo', label: 'Gazebo & saung', icon: 'shelter' },
      { key: 'photo', label: 'Spot foto estetik', icon: 'photo' },
      { key: 'parking', label: 'Area parkir luas', icon: 'parking' },
      { key: 'toilet', label: 'Toilet & mushola', icon: 'mushola' },
    ],
    description:
      'Spot wisata dengan suasana pedesaan, area camping, dan pemandangan sawah yang menenangkan - cocok untuk healing dan foto estetik. Nikmati kesejukan udara pegunungan sambil menikmati pemandangan hamparan sawah hijau yang membentang luas. Perfect spot untuk quality time bersama keluarga.',
    location: {
      lat: -7.3005,
      lng: 109.2348,
      address: 'Gurau, Baturaden, Banyumas, Jawa Tengah',
    },
  },
  'bhumi-bambu': {
    id: '5',
    slug: 'bhumi-bambu',
    name: 'Bhumi Bambu Baturaden',
    category: 'Wisata Edukasi',
    price: 20000,
    openTime: '08:00',
    closeTime: '17:00',
    phone: '+6282137654325',
    images: [
      {
        src: '/assets/images/wisata/bhumi-bambu-1.jpg',
        alt: 'Bhumi Bambu - Bamboo Garden',
      },
      {
        src: '/assets/images/wisata/bhumi-bambu-2.jpg',
        alt: 'Bhumi Bambu - Traditional House',
      },
      {
        src: '/assets/images/wisata/bhumi-bambu-3.jpg',
        alt: 'Bhumi Bambu - Dining Area',
      },
    ],
    facilities: [
      { key: 'garden', label: 'Taman bambu', icon: 'garden' },
      { key: 'photo', label: 'Spot foto instagramable', icon: 'photo' },
      { key: 'resto', label: 'Resto & cafe', icon: 'food' },
      { key: 'playground', label: 'Area bermain anak', icon: 'playground' },
      { key: 'workshop', label: 'Workshop kerajinan bambu', icon: 'workshop' },
      { key: 'gazebo', label: 'Gazebo bambu', icon: 'shelter' },
    ],
    description:
      'Wisata dengan konsep bambu alami dan arsitektur unik. Dilengkapi spot foto, taman bambu, serta kuliner khas pegunungan. Tempat yang tepat untuk belajar tentang kerajinan bambu sambil menikmati suasana alam yang asri dan sejuk. Cocok untuk wisata edukasi keluarga.',
    location: {
      lat: -7.3012,
      lng: 109.2342,
      address: 'Bhumi Bambu, Baturaden, Banyumas, Jawa Tengah',
    },
  },
  'taman-botani': {
    id: '6',
    slug: 'taman-botani',
    name: 'Taman Botani Baturaden',
    category: 'Wisata Edukasi',
    price: 20000,
    openTime: '08:00',
    closeTime: '16:00',
    phone: '+6282137654326',
    images: [
      {
        src: '/assets/images/wisata/taman-botani-1.jpg',
        alt: 'Taman Botani - Flower Garden',
      },
      {
        src: '/assets/images/wisata/taman-botani-2.jpg',
        alt: 'Taman Botani - Tropical Plants',
      },
      {
        src: '/assets/images/wisata/taman-botani-3.jpg',
        alt: 'Taman Botani - Walking Path',
      },
    ],
    facilities: [
      { key: 'flora', label: 'Koleksi ratusan flora', icon: 'garden' },
      { key: 'flower', label: 'Taman bunga warna-warni', icon: 'flower' },
      { key: 'edu', label: 'Jalur edukasi', icon: 'education' },
      { key: 'photo', label: 'Spot foto aesthetic', icon: 'photo' },
      { key: 'picnic', label: 'Area piknik', icon: 'picnic' },
      { key: 'greenhouse', label: 'Greenhouse', icon: 'greenhouse' },
    ],
    description:
      'Surga bagi pecinta tanaman dan fotografi. Ratusan koleksi flora tropis dan bunga warna-warni menciptakan suasana taman yang sejuk dan indah. Taman botani ini menjadi tempat edukasi yang menyenangkan untuk mengenal berbagai jenis tanaman sambil menikmati keindahan alam yang tertata rapi.',
    location: {
      lat: -7.3025,
      lng: 109.2338,
      address: 'Taman Botani, Baturaden, Banyumas, Jawa Tengah',
    },
  },
}
