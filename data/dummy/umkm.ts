import { Umkm, UmkmListItem, UmkmCategory } from '../types'

export const umkmData: Umkm[] = [
  {
    id: 'umkm-1',
    slug: 'kopi-lereng-slamet',
    name: 'Kopi Lereng Slamet',
    description: 'Kopi Lereng Slamet dibuat dari biji pilihan yang diolah dengan proses sangat tradisional. Setiap langkah dikerjakan dengan cermat untuk menjaga aroma dan cita rasa alaminya. Hasilnya, secangkir kopi dengan rasa seimbang, lembut, dan autentik yang menghadirkan kehangatan di setiap tegukan. Biji kopi dipetik langsung dari perkebunan di lereng Gunung Slamet.',
    shortDescription: 'Kedai kopi dengan biji pilihan dari lereng Gunung Slamet.',
    category: 'Kafe & Minuman',
    price: 12000,
    location: 'Baturaden, Banyumas',
    address: 'Jl. Raya Baturaden No. 123, Desa Baturaden, Kecamatan Baturaden, Kabupaten Banyumas, Jawa Tengah 53151',
    foundedYear: 2015,
    images: [
      '/assets/images/umkm/umkm-kopi-lereng-slamet.png',
      '/assets/images/umkm/umkm-preview-1.jpg',
      '/assets/images/umkm/umkm-preview-2.jpg',
      '/assets/images/umkm/umkm-preview-3.jpg'
    ],
    menus: [
      { id: 'menu-1-1', name: 'Espresso Signature', description: 'Espresso klasik dengan karakter bold', price: 12000, image: '/assets/images/umkm/umkm-kopi-lereng-slamet.png', isAvailable: true, isPopular: true },
      { id: 'menu-1-2', name: 'Kopi Tubruk Klasik', description: 'Kopi tradisional ala Jawa', price: 12000, image: '/assets/images/umkm/umkm-preview-1.jpg', isAvailable: true, isPopular: true },
      { id: 'menu-1-3', name: 'Cold Brew Original', description: 'Kopi dingin smooth 12 jam brewing', price: 25000, image: '/assets/images/umkm/umkm-preview-2.jpg', isAvailable: true },
      { id: 'menu-1-4', name: 'Latte Creamy Blend', description: 'Espresso dengan susu creamy', price: 25000, image: '/assets/images/umkm/umkm-preview-3.jpg', isAvailable: true },
      { id: 'menu-1-5', name: 'Mocha Classic', description: 'Kopi cokelat premium', price: 24000, image: '/assets/images/umkm/umkm-preview-4.jpg', isAvailable: true },
      { id: 'menu-1-6', name: 'Coffee Aren Latte', description: 'Kopi susu gula aren khas Baturaden', price: 23000, image: '/assets/images/umkm/umkm-kopi-lereng-slamet.png', isAvailable: true, isPopular: true },
      { id: 'menu-1-7', name: 'Manual Brew V60', description: 'Single origin pour over', price: 28000, image: '/assets/images/umkm/umkm-preview-1.jpg', isAvailable: true },
      { id: 'menu-1-8', name: 'Affogato', description: 'Espresso dengan gelato vanilla', price: 30000, image: '/assets/images/umkm/umkm-preview-2.jpg', isAvailable: true }
    ],
    contact: {
      phone: '0281-1234567',
      email: 'kopilerengslamet@gmail.com',
      whatsapp: '6281234567890',
      instagram: '@kopilerengslamet'
    },
    operatingHours: {
      weekday: '08.00 - 20.00 WIB',
      weekend: '07.00 - 22.00 WIB',
      notes: 'Tutup setiap Senin'
    },
    owner: 'Bapak Suryanto',
    isActive: true,
    isFeatured: true,
    rating: 4.7,
    reviewCount: 234,
    tags: ['kopi', 'cafe', 'hangout', 'work-friendly'],
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z'
  },
  {
    id: 'umkm-2',
    slug: 'batik-baturaden',
    name: 'Batik Baturaden Asri',
    description: 'Batik Baturaden Asri memproduksi batik khas dengan motif terinspirasi dari keindahan alam Baturaden - Gunung Slamet, air terjun, dan flora pegunungan. Setiap helai batik dibuat dengan teknik cap dan tulis oleh pengrajin lokal yang berpengalaman. Produk kami cocok untuk pakaian sehari-hari hingga acara formal.',
    shortDescription: 'Batik khas Baturaden dengan motif alam pegunungan.',
    category: 'Kerajinan',
    price: 150000,
    location: 'Baturaden, Banyumas',
    address: 'Jl. Batik No. 45, Desa Baturaden, Kabupaten Banyumas, Jawa Tengah 53151',
    foundedYear: 2008,
    images: [
      '/assets/images/umkm/umkm-batik-lestari-baturraden.png',
      '/assets/images/umkm/umkm-preview-2.jpg',
      '/assets/images/umkm/umkm-preview-3.jpg'
    ],
    menus: [
      { id: 'menu-2-1', name: 'Batik Motif Gunung Slamet', price: 250000, image: '/assets/images/umkm/umkm-batik-lestari-baturraden.png', isAvailable: true, isPopular: true },
      { id: 'menu-2-2', name: 'Batik Motif Curug Gede', price: 280000, image: '/assets/images/umkm/umkm-preview-1.jpg', isAvailable: true },
      { id: 'menu-2-3', name: 'Batik Motif Flora Pegunungan', price: 220000, image: '/assets/images/umkm/umkm-preview-2.jpg', isAvailable: true },
      { id: 'menu-2-4', name: 'Kemeja Batik Pria', price: 350000, image: '/assets/images/umkm/umkm-batik-lestari-baturraden.png', isAvailable: true, isPopular: true },
      { id: 'menu-2-5', name: 'Blouse Batik Wanita', price: 320000, image: '/assets/images/umkm/umkm-preview-3.jpg', isAvailable: true },
      { id: 'menu-2-6', name: 'Scarf Batik', price: 150000, image: '/assets/images/umkm/umkm-preview-4.jpg', isAvailable: true }
    ],
    contact: {
      phone: '0281-5678901',
      whatsapp: '6289876543210',
      instagram: '@batikbaturaden'
    },
    operatingHours: {
      weekday: '09.00 - 17.00 WIB',
      weekend: '09.00 - 15.00 WIB'
    },
    owner: 'Ibu Kartini',
    isActive: true,
    isFeatured: true,
    rating: 4.8,
    reviewCount: 156,
    tags: ['batik', 'kerajinan', 'fashion', 'oleh-oleh'],
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-11-20T00:00:00Z'
  },
  {
    id: 'umkm-3',
    slug: 'warung-mendoan-mbok-darmi',
    name: 'Warung Mendoan Mbok Darmi',
    description: 'Warung legendaris yang sudah berdiri sejak 1985. Mendoan crispy dengan tempe berkualitas dan bumbu rahasia turun-temurun. Dilengkapi berbagai kuliner khas Banyumas lainnya seperti getuk goreng, tempe kemul, dan sroto Sokaraja. Tempat wajib dikunjungi saat ke Baturaden!',
    shortDescription: 'Warung legendaris dengan mendoan crispy dan kuliner khas Banyumas.',
    category: 'Kuliner',
    price: 5000,
    location: 'Baturaden, Banyumas',
    address: 'Jl. Pasar Baturaden No. 12, Desa Baturaden, Kabupaten Banyumas, Jawa Tengah 53151',
    foundedYear: 1985,
    images: [
      '/assets/images/umkm/umkm-preview-2.jpg',
      '/assets/images/umkm/umkm-preview-3.jpg',
      '/assets/images/umkm/umkm-preview-4.jpg'
    ],
    menus: [
      { id: 'menu-3-1', name: 'Mendoan Original', description: 'Mendoan klasik renyah', price: 5000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true, isPopular: true },
      { id: 'menu-3-2', name: 'Mendoan Jumbo', description: 'Mendoan ukuran besar', price: 8000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true },
      { id: 'menu-3-3', name: 'Tempe Kemul', description: 'Tempe goreng bumbu kemul', price: 6000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true, isPopular: true },
      { id: 'menu-3-4', name: 'Getuk Goreng', description: 'Getuk singkong goreng legit', price: 7000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true },
      { id: 'menu-3-5', name: 'Sroto Sokaraja', description: 'Soto khas Sokaraja', price: 15000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true, isPopular: true },
      { id: 'menu-3-6', name: 'Nasi Liwet Komplit', description: 'Nasi liwet dengan lauk lengkap', price: 25000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true },
      { id: 'menu-3-7', name: 'Es Dawet Ayu', description: 'Es dawet segar khas Banyumas', price: 8000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true }
    ],
    contact: {
      phone: '0281-2345678',
      whatsapp: '6285678901234'
    },
    operatingHours: {
      weekday: '06.00 - 21.00 WIB',
      weekend: '06.00 - 22.00 WIB'
    },
    owner: 'Mbok Darmi',
    isActive: true,
    isFeatured: true,
    rating: 4.9,
    reviewCount: 567,
    tags: ['kuliner', 'mendoan', 'tradisional', 'legend'],
    createdAt: '2024-02-01T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z'
  },
  {
    id: 'umkm-4',
    slug: 'oleh-oleh-baturaden',
    name: 'Toko Oleh-oleh Berkah',
    description: 'Pusat oleh-oleh terlengkap di Baturaden. Menyediakan berbagai produk olahan khas seperti keripik tempe, gula semut kelapa, madu hutan, jamur crispy, dan aneka kue tradisional. Semua produk terjamin kualitasnya dan dikemas rapi untuk oleh-oleh.',
    shortDescription: 'Pusat oleh-oleh khas Baturaden terlengkap.',
    category: 'Oleh-oleh',
    price: 15000,
    location: 'Baturaden, Banyumas',
    address: 'Jl. Raya Baturaden No. 88, Desa Baturaden, Kabupaten Banyumas, Jawa Tengah 53151',
    foundedYear: 2010,
    images: [
      '/assets/images/umkm/umkm-pasar-sayur-segar.png',
      '/assets/images/umkm/umkm-preview-1.jpg',
      '/assets/images/umkm/umkm-preview-4.jpg'
    ],
    menus: [
      { id: 'menu-4-1', name: 'Keripik Tempe Baturaden', price: 25000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true, isPopular: true },
      { id: 'menu-4-2', name: 'Gula Semut Kelapa', price: 35000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true, isPopular: true },
      { id: 'menu-4-3', name: 'Madu Hutan Slamet', price: 75000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true },
      { id: 'menu-4-4', name: 'Jamur Crispy', price: 30000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true },
      { id: 'menu-4-5', name: 'Kue Lapis Legit', price: 85000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true },
      { id: 'menu-4-6', name: 'Kopi Bubuk Slamet 250gr', price: 45000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true, isPopular: true },
      { id: 'menu-4-7', name: 'Paket Oleh-oleh Komplit', price: 150000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true },
      { id: 'menu-4-8', name: 'Sale Pisang', price: 20000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true }
    ],
    contact: {
      phone: '0281-3456789',
      whatsapp: '6887654321098',
      instagram: '@oleholehbaturaden'
    },
    operatingHours: {
      weekday: '08.00 - 20.00 WIB',
      weekend: '07.00 - 21.00 WIB'
    },
    owner: 'Bapak Hadi',
    isActive: true,
    isFeatured: false,
    rating: 4.5,
    reviewCount: 345,
    tags: ['oleh-oleh', 'souvenir', 'makanan', 'khas'],
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-11-15T00:00:00Z'
  },
  {
    id: 'umkm-5',
    slug: 'kerajinan-bambu-slamet',
    name: 'Kerajinan Bambu Slamet',
    description: 'Workshop dan gallery kerajinan bambu berkualitas tinggi. Memproduksi berbagai produk dari bambu seperti furniture, dekorasi rumah, alat musik tradisional, dan souvenir. Menyediakan juga workshop pembuatan kerajinan bambu untuk wisatawan yang ingin belajar.',
    shortDescription: 'Workshop kerajinan bambu dengan produk furniture dan dekorasi.',
    category: 'Kerajinan',
    price: 50000,
    location: 'Baturaden, Banyumas',
    address: 'Jl. Bambu Indah No. 7, Desa Baturaden, Kabupaten Banyumas, Jawa Tengah 53151',
    foundedYear: 2012,
    images: [
      '/assets/images/umkm/umkm-kerajinan-sumber-rejeki.png',
      '/assets/images/umkm/umkm-preview-1.jpg',
      '/assets/images/umkm/umkm-preview-2.jpg'
    ],
    menus: [
      { id: 'menu-5-1', name: 'Kursi Bambu', price: 350000, image: '/assets/images/umkm/umkm-kerajinan-sumber-rejeki.png', isAvailable: true },
      { id: 'menu-5-2', name: 'Meja Bambu Mini', price: 250000, image: '/assets/images/umkm/umkm-preview-1.jpg', isAvailable: true },
      { id: 'menu-5-3', name: 'Lampu Hias Bambu', price: 150000, image: '/assets/images/umkm/umkm-preview-2.jpg', isAvailable: true, isPopular: true },
      { id: 'menu-5-4', name: 'Angklung', price: 75000, image: '/assets/images/umkm/umkm-kerajinan-sumber-rejeki.png', isAvailable: true, isPopular: true },
      { id: 'menu-5-5', name: 'Vas Bunga Bambu', price: 85000, image: '/assets/images/umkm/umkm-preview-3.jpg', isAvailable: true },
      { id: 'menu-5-6', name: 'Gantungan Kunci Bambu', price: 15000, image: '/assets/images/umkm/umkm-preview-4.jpg', isAvailable: true },
      { id: 'menu-5-7', name: 'Workshop Kerajinan Bambu', description: 'Belajar membuat kerajinan bambu', price: 100000, image: '/assets/images/umkm/umkm-preview-1.jpg', isAvailable: true }
    ],
    contact: {
      phone: '0281-4567890',
      whatsapp: '6886543210987',
      instagram: '@bambuslamet'
    },
    operatingHours: {
      weekday: '09.00 - 17.00 WIB',
      weekend: '08.00 - 18.00 WIB'
    },
    owner: 'Pak Bambang',
    isActive: true,
    isFeatured: false,
    rating: 4.6,
    reviewCount: 123,
    tags: ['kerajinan', 'bambu', 'furniture', 'workshop'],
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-10-20T00:00:00Z'
  },
  {
    id: 'umkm-6',
    slug: 'resto-panorama-slamet',
    name: 'Resto Panorama Slamet',
    description: 'Restoran dengan pemandangan langsung Gunung Slamet. Menu utama adalah masakan Sunda dan Jawa dengan bahan-bahan segar lokal. Dilengkapi dengan area outdoor yang nyaman untuk menikmati makanan sambil memandang keindahan alam pegunungan.',
    shortDescription: 'Restoran dengan view Gunung Slamet dan masakan tradisional.',
    category: 'Kuliner',
    price: 30000,
    location: 'Baturaden, Banyumas',
    address: 'Jl. Panorama No. 1, Desa Baturaden, Kabupaten Banyumas, Jawa Tengah 53151',
    foundedYear: 2018,
    images: [
      '/assets/images/umkm/umkm-preview-1.jpg',
      '/assets/images/umkm/umkm-preview-3.jpg',
      '/assets/images/umkm/umkm-preview-4.jpg'
    ],
    menus: [
      { id: 'menu-6-1', name: 'Nasi Timbel Komplit', price: 35000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true, isPopular: true },
      { id: 'menu-6-2', name: 'Ikan Gurame Bakar', price: 75000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true, isPopular: true },
      { id: 'menu-6-3', name: 'Ayam Goreng Kampung', price: 45000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true },
      { id: 'menu-6-4', name: 'Sayur Asem Segar', price: 20000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true },
      { id: 'menu-6-5', name: 'Pencok Kacang Panjang', price: 18000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true },
      { id: 'menu-6-6', name: 'Es Kelapa Muda', price: 15000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true },
      { id: 'menu-6-7', name: 'Paket Keluarga (4 orang)', price: 200000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true }
    ],
    contact: {
      phone: '0281-5678901',
      whatsapp: '6885432109876',
      instagram: '@restopanorama'
    },
    operatingHours: {
      weekday: '10.00 - 21.00 WIB',
      weekend: '09.00 - 22.00 WIB'
    },
    owner: 'Bu Sri Wahyuni',
    isActive: true,
    isFeatured: true,
    rating: 4.6,
    reviewCount: 289,
    tags: ['kuliner', 'restoran', 'view', 'keluarga'],
    createdAt: '2024-03-15T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z'
  },
  {
    id: 'umkm-7',
    slug: 'kebun-sayur-organik',
    name: 'Kebun Sayur Organik Sejahtera',
    description: 'Kebun sayur organik yang menyediakan sayuran segar langsung dari petani. Konsep farm-to-table dengan jaminan tanpa pestisida kimia. Melayani penjualan langsung dan delivery ke rumah. Tersedia juga paket wisata edukasi pertanian organik.',
    shortDescription: 'Sayuran organik segar langsung dari kebun tanpa pestisida.',
    category: 'Pertanian',
    price: 10000,
    location: 'Baturaden, Banyumas',
    address: 'Dusun Kebun Hijau, Desa Baturaden, Kabupaten Banyumas, Jawa Tengah 53151',
    foundedYear: 2019,
    images: [
      '/assets/images/umkm/umkm-herbal-wangi-lestari.png',
      '/assets/images/umkm/umkm-pasar-sayur-segar.png',
      '/assets/images/umkm/umkm-preview-3.jpg'
    ],
    menus: [
      { id: 'menu-7-1', name: 'Paket Sayur Harian', description: '5 jenis sayur segar', price: 30000, image: '/assets/images/umkm/umkm-pasar-sayur-segar.png', isAvailable: true, isPopular: true },
      { id: 'menu-7-2', name: 'Sawi Organik 500gr', price: 10000, image: '/assets/images/umkm/umkm-herbal-wangi-lestari.png', isAvailable: true },
      { id: 'menu-7-3', name: 'Wortel Organik 500gr', price: 12000, image: '/assets/images/umkm/umkm-pasar-sayur-segar.png', isAvailable: true },
      { id: 'menu-7-4', name: 'Brokoli Organik 500gr', price: 18000, image: '/assets/images/umkm/umkm-preview-1.jpg', isAvailable: true },
      { id: 'menu-7-5', name: 'Tomat Cherry 250gr', price: 15000, image: '/assets/images/umkm/umkm-preview-2.jpg', isAvailable: true },
      { id: 'menu-7-6', name: 'Paket Wisata Edukasi', description: 'Belajar pertanian organik', price: 50000, image: '/assets/images/umkm/umkm-preview-3.jpg', isAvailable: true }
    ],
    contact: {
      phone: '0281-6789012',
      whatsapp: '6884321098765',
      instagram: '@sayurorganikbaturaden'
    },
    operatingHours: {
      weekday: '06.00 - 16.00 WIB',
      weekend: '06.00 - 14.00 WIB'
    },
    owner: 'Pak Tani Joko',
    isActive: true,
    isFeatured: false,
    rating: 4.7,
    reviewCount: 98,
    tags: ['pertanian', 'organik', 'sayur', 'sehat'],
    createdAt: '2024-04-01T00:00:00Z',
    updatedAt: '2024-11-30T00:00:00Z'
  },
  {
    id: 'umkm-8',
    slug: 'homestay-gunung-slamet',
    name: 'Homestay Gunung Slamet View',
    description: 'Penginapan nyaman dengan pemandangan langsung Gunung Slamet. Kamar-kamar yang bersih dan asri dengan fasilitas lengkap. Cocok untuk keluarga, backpacker, atau pasangan yang ingin menikmati ketenangan alam Baturaden. Termasuk sarapan pagi dengan menu tradisional.',
    shortDescription: 'Penginapan nyaman dengan view Gunung Slamet dan sarapan tradisional.',
    category: 'Jasa',
    price: 250000,
    location: 'Baturaden, Banyumas',
    address: 'Jl. Penginapan No. 15, Desa Baturaden, Kabupaten Banyumas, Jawa Tengah 53151',
    foundedYear: 2017,
    images: [
      '/assets/images/umkm/umkm-preview-4.jpg',
      '/assets/images/umkm/umkm-preview-1.jpg',
      '/assets/images/umkm/umkm-preview-2.jpg'
    ],
    menus: [
      { id: 'menu-8-1', name: 'Kamar Standard', description: 'AC, TV, kamar mandi dalam', price: 250000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true },
      { id: 'menu-8-2', name: 'Kamar Deluxe', description: 'View Gunung, AC, TV, kamar mandi dalam', price: 350000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true, isPopular: true },
      { id: 'menu-8-3', name: 'Family Room', description: '2 tempat tidur, view garden', price: 450000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true },
      { id: 'menu-8-4', name: 'Villa Mini', description: 'Private villa untuk 4 orang', price: 750000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true, isPopular: true }
    ],
    contact: {
      phone: '0281-7890123',
      whatsapp: '6883210987654',
      instagram: '@homestayslamet',
      email: 'booking@homestayslamet.com'
    },
    operatingHours: {
      weekday: '24 Jam',
      weekend: '24 Jam',
      notes: 'Check-in 14:00, Check-out 12:00'
    },
    owner: 'Bu Ratna',
    isActive: true,
    isFeatured: true,
    rating: 4.5,
    reviewCount: 178,
    tags: ['penginapan', 'homestay', 'wisata', 'liburan'],
    createdAt: '2024-04-15T00:00:00Z',
    updatedAt: '2024-12-01T00:00:00Z'
  },
  {
    id: 'umkm-9',
    slug: 'jahit-tradisional-asih',
    name: 'Jahit & Bordir Asih',
    description: 'Jasa jahit dan bordir tradisional dengan kualitas premium. Spesialisasi dalam pembuatan kebaya, baju adat Jawa, dan seragam. Menerima pesanan dalam jumlah besar maupun satuan dengan harga terjangkau dan pengerjaan cepat.',
    shortDescription: 'Jasa jahit dan bordir tradisional untuk kebaya dan baju adat.',
    category: 'Jasa',
    price: 100000,
    location: 'Baturaden, Banyumas',
    address: 'Jl. Jahit No. 22, Desa Baturaden, Kabupaten Banyumas, Jawa Tengah 53151',
    foundedYear: 2005,
    images: [
      '/assets/images/umkm/umkm-batik-lestari-baturraden.png',
      '/assets/images/umkm/umkm-preview-3.jpg',
      '/assets/images/umkm/umkm-preview-1.jpg'
    ],
    menus: [
      { id: 'menu-9-1', name: 'Jahit Kebaya', description: 'Kebaya modern atau tradisional', price: 350000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true, isPopular: true },
      { id: 'menu-9-2', name: 'Jahit Baju Adat Jawa', price: 500000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true },
      { id: 'menu-9-3', name: 'Bordir Nama/Logo', price: 25000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true },
      { id: 'menu-9-4', name: 'Seragam Sekolah', price: 150000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true },
      { id: 'menu-9-5', name: 'Permak Baju', price: 50000, image: '/assets/images/umkm/umkm-preview-2.jpg' , isAvailable: true }
    ],
    contact: {
      phone: '0281-8901234',
      whatsapp: '6882109876543'
    },
    operatingHours: {
      weekday: '08.00 - 17.00 WIB',
      weekend: '08.00 - 14.00 WIB',
      notes: 'Tutup Minggu'
    },
    owner: 'Ibu Asih',
    isActive: true,
    isFeatured: false,
    rating: 4.8,
    reviewCount: 89,
    tags: ['jahit', 'bordir', 'fashion', 'tradisional'],
    createdAt: '2024-05-01T00:00:00Z',
    updatedAt: '2024-10-15T00:00:00Z'
  }
]

// Transform ke list item untuk grid display
export const umkmListItems: UmkmListItem[] = umkmData.map(u => ({
  id: u.id,
  slug: u.slug,
  name: u.name,
  description: u.shortDescription || u.description.substring(0, 150) + '...',
  price: u.price,
  image: u.images[0] || '/assets/images/placeholder.jpg',
  category: u.category,
  rating: u.rating,
  isActive: u.isActive
}))

// Get UMKM by slug
export const getUmkmBySlug = (slug: string): Umkm | undefined => {
  return umkmData.find(u => u.slug === slug)
}

// Get featured UMKM
export const getFeaturedUmkm = (): Umkm[] => {
  return umkmData.filter(u => u.isFeatured && u.isActive)
}

// Get UMKM by category
export const getUmkmByCategory = (category: UmkmCategory): Umkm[] => {
  return umkmData.filter(u => u.category === category && u.isActive)
}

// Get all categories
export const getUmkmCategories = (): UmkmCategory[] => {
  return [...new Set(umkmData.map(u => u.category))]
}

export default {
  umkmData,
  umkmListItems,
  getUmkmBySlug,
  getFeaturedUmkm,
  getUmkmByCategory,
  getUmkmCategories
}





