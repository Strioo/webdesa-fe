export interface MenuItem {
  id: string
  name: string
  description?: string
  price: number
  image: string
}

export interface UmkmDetail {
  id: string
  slug: string
  name: string
  description: string
  location: string
  address: string // Full address
  foundedYear: number
  category?: string
  images: string[]
  menus: MenuItem[]
  contact: {
    phone?: string
    email?: string
    whatsapp?: string
  }
  operatingHours?: {
    weekday?: string
    weekend?: string
  }
  owner?: string
}

// Sample data for development
export const sampleUmkmData: Record<string, UmkmDetail> = {
  'kopi-lereng-slamet': {
    id: 'kopi-lereng-slamet',
    slug: 'kopi-lereng-slamet',
    name: 'Kopi Lereng Slamet',
    description: 'Kopi Lereng Slamet dibuat dari biji pilihan yang diolah dengan proses sangat tradisional. Setiap langkah dikerjakan dengan cermat untuk menjaga aroma dan cita rasa alaminya. Hasilnya, secangkir kopi dengan rasa seimbang, lembut, dan autentik yang menghadirkan kehangatan di setiap tegukan.',
    location: 'Baturaden, Banyumas',
    address: 'Jl. Raya Baturaden No. 123, Desa Baturaden, Kecamatan Baturaden, Kabupaten Banyumas, Jawa Tengah 53151',
    foundedYear: 2015,
    category: 'Kafe & Minuman',
    owner: 'Bapak Suryanto',
    images: [
      '/assets/images/umkm-kopi-1.jpg',
      '/assets/images/umkm-kopi-2.jpg',
      '/assets/images/umkm-kopi-3.jpg',
      '/assets/images/umkm-kopi-4.jpg',
      '/assets/images/umkm-kopi-lereng-slamet.png'
    ],
    menus: [
      {
        id: 'espresso-signature',
        name: 'Espresso Signature',
        price: 12000,
        image: '/assets/images/menu-espresso.jpg'
      },
      {
        id: 'kopi-tubruk-klasik',
        name: 'Kopi Tubruk Klasik',
        price: 12000,
        image: '/assets/images/menu-tubruk.jpg'
      },
      {
        id: 'cold-brew-original',
        name: 'Cold Brew Original',
        price: 25000,
        image: '/assets/images/menu-coldbrew.jpg'
      },
      {
        id: 'latte-creamy-blend',
        name: 'Latte Creamy Blend',
        price: 25000,
        image: '/assets/images/menu-latte.jpg'
      },
      {
        id: 'mocha-classic',
        name: 'Mocha Classic',
        price: 24000,
        image: '/assets/images/menu-mocha.jpg'
      },
      {
        id: 'coffee-aren-latte',
        name: 'Coffee Aren Latte',
        price: 23000,
        image: '/assets/images/menu-aren.jpg'
      }
    ],
    contact: {
      phone: '0281-1234567',
      email: 'kopilerengslamet@gmail.com',
      whatsapp: '6281234567890'
    },
    operatingHours: {
      weekday: 'Senin - Jumat: 08.00 - 20.00 WIB',
      weekend: 'Sabtu - Minggu: 07.00 - 22.00 WIB'
    }
  }
}
