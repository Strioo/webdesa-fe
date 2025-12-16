# 📁 Data Architecture - WebDesa Portfolio

## Overview

Dokumentasi lengkap arsitektur data untuk proyek WebDesa Portfolio. Arsitektur ini dirancang agar:
- ✅ Mudah diganti ke backend asli
- ✅ Clean, reusable, dan maintainable
- ✅ Type-safe dengan TypeScript
- ✅ Mencerminkan praktik standar industri

---

## 📂 Struktur Folder

```
data/
├── types/                    # TypeScript interfaces
│   └── index.ts             # All type definitions
├── dummy/                    # Dummy data files
│   ├── index.ts             # Barrel export
│   ├── profil.ts            # Data profil desa
│   ├── wisata.ts            # Data destinasi wisata
│   ├── umkm.ts              # Data UMKM lokal
│   ├── pembangunan.ts       # Data proyek pembangunan
│   ├── laporan.ts           # Data laporan masyarakat
│   └── home.ts              # Data untuk homepage
├── services/                 # Data service layer
│   ├── index.ts             # Barrel export
│   ├── config.ts            # Configuration (API/dummy switch)
│   ├── wisataService.ts     # Wisata fetching functions
│   ├── umkmService.ts       # UMKM fetching functions
│   ├── pembangunanService.ts # Pembangunan fetching functions
│   ├── laporanService.ts    # Laporan fetching functions
│   └── profilService.ts     # Profil & Home services
└── README.md                # This documentation
```

---

## 🔄 Mode Operasi

### Switch Data Source

Edit file `data/services/config.ts` atau set environment variable:

```env
# .env.local
NEXT_PUBLIC_DATA_SOURCE=dummy    # Gunakan dummy data (default)
NEXT_PUBLIC_DATA_SOURCE=api      # Gunakan API backend asli
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_DUMMY_DELAY=300      # Simulasi network delay (ms)
```

### Kapan Menggunakan Mode Apa?

| Mode | Kapan Digunakan |
|------|-----------------|
| `dummy` | Portfolio showcase, demo, development tanpa backend |
| `api` | Development dengan backend, production dengan real data |

---

## 📦 Entity & Type Definitions

### Base Types

```typescript
interface BaseEntity {
  id: string
  createdAt: string
  updatedAt: string
}

interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
  meta?: PaginationMeta
}
```

### Wisata (Tourism)

```typescript
interface Wisata extends BaseEntity {
  slug: string
  name: string
  description: string
  category: WisataCategory  // 'Wisata Alam' | 'Wisata Edukasi' | etc.
  price: number
  openTime: string
  closeTime: string
  images: ImageData[]
  facilities: WisataFacility[]
  location: Location
  rating: number
  isActive: boolean
  isFeatured: boolean
}
```

### UMKM

```typescript
interface Umkm extends BaseEntity {
  slug: string
  name: string
  description: string
  category: UmkmCategory  // 'Kuliner' | 'Kerajinan' | etc.
  price: number
  menus: MenuItem[]
  contact: ContactInfo
  operatingHours: OperatingHours
  owner: string
  rating: number
}
```

### Pembangunan

```typescript
interface ProyekPembangunan extends BaseEntity {
  nama: string
  deskripsi: string
  kategori: PembangunanKategori
  anggaran: number
  sumberDana: string
  timeline: PembangunanTimeline
  status: PembangunanStatus  // 'Perencanaan' | 'Berlangsung' | 'Selesai'
  progress: number
  foto: string
  penanggungJawab: string
}
```

### Laporan

```typescript
interface Laporan extends BaseEntity {
  title: string
  description: string
  category: LaporanKategori
  location: string
  photo?: string
  status: LaporanStatus  // 'Menunggu' | 'Diproses' | 'Selesai'
  tanggapan?: string
  userName: string
  isAnonymous: boolean
}
```

---

## 🛠️ Penggunaan di Component

### 1. Import Service

```typescript
// Import individual functions
import { getAllWisata, getWisataBySlug } from '@/data/services'

// Atau import sebagai object
import { dataServices } from '@/data/services'
const wisata = await dataServices.wisata.getAllWisata()
```

### 2. Contoh di React Component

```tsx
'use client'

import { useEffect, useState } from 'react'
import { getAllWisata, type WisataListItem } from '@/data/services'

export default function WisataGrid() {
  const [wisata, setWisata] = useState<WisataListItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllWisata()
      if (response.success && response.data) {
        setWisata(response.data)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) return <Skeleton />
  
  return (
    <div className="grid grid-cols-3 gap-4">
      {wisata.map(item => (
        <WisataCard key={item.id} data={item} />
      ))}
    </div>
  )
}
```

### 3. Contoh di Server Component (Next.js 14+)

```tsx
import { getAllWisata } from '@/data/services'

export default async function WisataPage() {
  const response = await getAllWisata()
  const wisataList = response.data || []

  return (
    <div>
      {wisataList.map(item => (
        <WisataCard key={item.id} data={item} />
      ))}
    </div>
  )
}
```

### 4. Dengan React Query / SWR (Opsional)

```typescript
import useSWR from 'swr'
import { getAllWisata } from '@/data/services'

export function useWisata() {
  return useSWR('wisata', () => getAllWisata().then(r => r.data))
}
```

---

## 📊 Data Statistics

### Dummy Data yang Tersedia

| Entity | Jumlah Item | Status |
|--------|-------------|--------|
| Wisata | 10 destinasi | ✅ Complete |
| UMKM | 9 usaha | ✅ Complete |
| Pembangunan | 10 proyek | ✅ Complete |
| Laporan | 12 laporan | ✅ Complete |
| Officials | 8 pejabat | ✅ Complete |
| Timeline | 8 events | ✅ Complete |
| Testimonials | 5 items | ✅ Complete |

### Fitur Service Layer

| Feature | Status |
|---------|--------|
| Get All | ✅ |
| Get by ID/Slug | ✅ |
| Get by Category | ✅ |
| Search/Filter | ✅ |
| Featured Items | ✅ |
| Statistics | ✅ |
| Create (dummy) | ✅ |
| Auto Fallback | ✅ |

---

## 🔀 Migrasi ke API Asli

Untuk beralih ke API backend asli:

### 1. Set Environment Variable

```env
NEXT_PUBLIC_DATA_SOURCE=api
NEXT_PUBLIC_API_URL=https://api.baturaden.desa.id/api
```

### 2. Tidak Ada Perubahan di Component!

Service layer akan otomatis menggunakan API. Jika API gagal, akan fallback ke dummy data.

### 3. Sesuaikan Transform (Jika Perlu)

Jika struktur response API berbeda, edit transform di file service:

```typescript
// di wisataService.ts
const transformed: Wisata = {
  id: apiData.id,
  name: apiData.nama,  // mapping field berbeda
  // ...
}
```

---

## 🎨 Best Practices

### 1. Selalu Gunakan Types

```typescript
// ✅ Good
const wisata: Wisata[] = response.data

// ❌ Bad
const wisata: any = response.data
```

### 2. Handle Loading & Error States

```tsx
const [loading, setLoading] = useState(true)
const [error, setError] = useState<string | null>(null)

if (!response.success) {
  setError(response.error || 'Failed to fetch')
}
```

### 3. Gunakan Barrel Exports

```typescript
// ✅ Good - dari barrel export
import { getAllWisata, Wisata } from '@/data/services'

// ❌ Bad - direct import
import { getAllWisata } from '@/data/services/wisataService'
```

### 4. Lazy Loading untuk Data Besar

```typescript
// Hanya load yang diperlukan
const featuredOnly = await getFeaturedWisata()

// Jangan load semua jika tidak perlu
// const allData = await getAllWisata()
```

---

## 📝 Checklist Migrasi

- [ ] Set `NEXT_PUBLIC_DATA_SOURCE=api`
- [ ] Verify API endpoints match
- [ ] Test all service functions
- [ ] Check transform mappings
- [ ] Test error fallbacks
- [ ] Remove/update dummy delay
- [ ] Update any hardcoded URLs

---

## 🤝 Contributing

Untuk menambah/edit dummy data:

1. Edit file di `data/dummy/*.ts`
2. Pastikan follow TypeScript interface
3. Export dari `data/dummy/index.ts`
4. Test dengan mode dummy

---

## 📄 License

MIT License - Free to use for portfolio and learning purposes.

---

*Last Updated: December 2024*
