# 🏞️ Sistem Informasi Desa BaturadenThis is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).



Website resmi Desa Baturaden - Platform digital terintegrasi untuk layanan publik, informasi wisata, UMKM, dan transparansi pembangunan desa.## Getting Started



![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat-square&logo=next.js)First, run the development server:

![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue?style=flat-square&logo=typescript)

![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4+-38B2AC?style=flat-square&logo=tailwind-css)```bash

![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)npm run dev

# or

## 📋 Daftar Isiyarn dev

# or

- [Tentang Project](#-tentang-project)pnpm dev

- [Fitur Utama](#-fitur-utama)# or

- [Teknologi](#-teknologi)bun dev

- [Prasyarat](#-prasyarat)```

- [Instalasi](#-instalasi)

- [Konfigurasi](#-konfigurasi)Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

- [Menjalankan Aplikasi](#-menjalankan-aplikasi)

- [Build Production](#-build-production)You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

- [Struktur Folder](#-struktur-folder)

- [Environment Variables](#-environment-variables)This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

- [Troubleshooting](#-troubleshooting)

## Learn More

---

To learn more about Next.js, take a look at the following resources:

## 🎯 Tentang Project

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.

**Sistem Informasi Desa Baturaden** adalah platform digital modern yang dirancang untuk:- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.



- 📍 Mempromosikan wisata dan UMKM lokalYou can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

- 📊 Menampilkan statistik dan data desa secara transparan

- 📝 Menyediakan sistem pelaporan dan aspirasi warga## Deploy on Vercel

- 💳 Memfasilitasi pembelian tiket wisata online

- 👥 Mengelola informasi profil desa dan pejabatThe easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

- 🏗️ Monitoring transparansi pembangunan desa

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## ✨ Fitur Utama

### 🌐 Portal Publik
- **Hero Section** dengan animasi modern dan scroll interaktif
- **Wisata & UMKM** dengan detail lengkap, galeri foto, dan booking online
- **Statistik Desa** dengan chart interaktif dan data real-time
- **Profil Desa** dengan timeline sejarah menggunakan Aceternity UI
- **Sistem Pelaporan** untuk aspirasi dan pengaduan warga
- **Chatbot AI** untuk bantuan navigasi dan informasi

### 🔐 Sistem Autentikasi
- Login/Register dengan validasi real-time
- Role-based access (Admin, Warga, Visitor)
- Protected routes dan middleware
- Session management dengan JWT

### 📱 Dashboard Admin
- **Manajemen Konten**: CRUD untuk Wisata, UMKM, Program, Laporan
- **User Management**: Kelola pengguna dan role
- **Analytics**: Statistik pengunjung dan transaksi
- **Transaksi**: Monitoring pembayaran tiket wisata

### 🎨 UI/UX Modern
- **Responsive Design**: Mobile-first dengan breakpoints optimal
- **Dark Mode Support**: DockNavbar dengan theme gelap
- **Smooth Animations**: Framer Motion untuk transisi halus
- **Accessibility**: ARIA labels dan keyboard navigation
- **Performance**: Lazy loading dan image optimization

---

## 🛠️ Teknologi

### Frontend Framework
- **Next.js 14+** - React framework dengan App Router
- **TypeScript** - Type safety dan better DX
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library untuk Tailwind

### UI & Animation
- **Framer Motion** - Animasi dan transisi
- **Heroicons** - Icon library
- **Lucide React** - Modern icon set
- **Aceternity UI** - Premium UI components

### Data & State Management
- **React Hooks** - Custom hooks untuk logic reusable
- **Context API** - Global state (Auth, Theme)

### Charting & Visualization
- **Recharts** - Chart library untuk statistik
- **Custom SVG** - Ilustrasi dan dekorasi

### Payment & Integration
- **Midtrans** - Payment gateway untuk tiket wisata
- **OpenWeather API** - Data cuaca real-time

---

## 📦 Prasyarat

Pastikan Anda sudah menginstall:

- **Node.js** versi 18.17 atau lebih tinggi
- **npm** versi 9.0+ atau **yarn** versi 1.22+ atau **pnpm** versi 8.0+
- **Git** untuk version control
- **Backend API** harus sudah running

Cek versi yang terinstall:

```bash
node --version   # v18.17.0 atau lebih tinggi
npm --version    # 9.0.0 atau lebih tinggi
git --version    # Git version 2.x.x
```

---

## 🚀 Instalasi

### 1. Clone Repository

```bash
# Clone dengan HTTPS
git clone https://github.com/Strioo/webdesa-fe.git

# Atau dengan SSH
git clone git@github.com:Strioo/webdesa-fe.git

# Masuk ke folder project
cd webdesa-fe
```

### 2. Install Dependencies

Pilih salah satu package manager:

```bash
# Menggunakan npm
npm install

# Atau menggunakan yarn
yarn install

# Atau menggunakan pnpm
pnpm install
```

⏱️ **Estimasi waktu**: 2-5 menit tergantung koneksi internet

### 3. Setup Environment Variables

Buat file `.env.local` di root folder:

```bash
# Windows (PowerShell)
Copy-Item .env.example .env.local

# Linux/Mac
cp .env.example .env.local
```

Jika `.env.example` tidak ada, buat file `.env.local` manual:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000/api

# Payment Gateway (Midtrans)
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_midtrans_client_key
NEXT_PUBLIC_MIDTRANS_SCRIPT_URL=https://app.sandbox.midtrans.com/snap/snap.js

# Weather API (OpenWeatherMap)
NEXT_PUBLIC_WEATHER_API_KEY=your_openweather_api_key

# App Configuration
NEXT_PUBLIC_APP_NAME=Baturaden
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

> ⚠️ **Penting**: Jangan commit file `.env.local` ke Git!

---

## ⚙️ Konfigurasi

### Backend API

Pastikan backend API sudah running di `http://localhost:5000` (atau sesuaikan `NEXT_PUBLIC_API_URL`)

Endpoint yang dibutuhkan:
- `POST /api/auth/login` - Login user
- `POST /api/auth/register` - Register user
- `GET /api/wisata` - Data wisata
- `GET /api/umkm` - Data UMKM
- `GET /api/dashboard/public-stats` - Statistik publik

### Midtrans Payment Gateway

1. Daftar di [Midtrans](https://midtrans.com/)
2. Dapatkan **Client Key** dari dashboard
3. Untuk testing, gunakan **Sandbox** environment
4. Masukkan Client Key ke `.env.local`

---

## 🏃 Menjalankan Aplikasi

### Development Mode

```bash
npm run dev
# atau
yarn dev
# atau
pnpm dev
```

Aplikasi akan berjalan di **http://localhost:3000**

**Development Features:**
- ⚡ Hot Module Replacement (HMR)
- 🔍 Error overlay dengan stack trace
- 🎨 Tailwind JIT compiler
- 📝 TypeScript type checking

### Production Preview (Local)

```bash
# Build terlebih dahulu
npm run build

# Jalankan production server
npm run start
```

---

## 📦 Build Production

### Build untuk Deployment

```bash
npm run build
```

Output build ada di folder `.next/`

### Environment Production

Untuk production, set environment variables di platform hosting (Vercel, Netlify, dll)

---

## 📁 Struktur Folder

```
webdesa-fe/
├── app/                          # Next.js 14 App Router
│   ├── (auth)/                   # Auth group routes
│   │   ├── login/               # Login page
│   │   └── register/            # Register page
│   ├── account/                 # User account settings
│   ├── chatbot/                 # AI Chatbot page
│   ├── dashboard/               # Admin dashboard
│   │   ├── laporan/            # Laporan management
│   │   ├── wisata/             # Wisata management
│   │   ├── umkm/               # UMKM management
│   │   ├── transaksi/          # Transaction history
│   │   └── users/              # User management
│   ├── home/                    # Public home page
│   ├── wisata/                  # Wisata listing & detail
│   ├── umkm/                    # UMKM listing & detail
│   ├── profile/                 # Profil desa
│   ├── pembangunan/             # Pembangunan desa
│   ├── lapor/                   # Pelaporan warga
│   ├── payment/                 # Payment pages
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
│
├── components/                   # React components
│   ├── ui/                      # Reusable UI components
│   ├── home/                    # Home page components
│   ├── profile/                 # Profile components
│   ├── chatbot/                 # Chatbot components
│   ├── Navbar.tsx               # Main navbar
│   ├── DockNavbar.tsx           # Mobile dock navigation
│   └── Footer.tsx               # Site footer
│
├── lib/                         # Utility libraries
│   ├── api.ts                   # API client functions
│   ├── auth.tsx                 # Authentication context
│   ├── utils.ts                 # Utility functions
│   ├── types.ts                 # TypeScript types
│   └── midtrans.ts              # Midtrans integration
│
├── hooks/                       # Custom React hooks
│   ├── use-mobile.ts           # Mobile detection
│   ├── useCountUp.ts           # Count up animation
│   └── useScrollAnimation.ts    # Scroll-based animation
│
├── public/                      # Static assets
│   └── assets/
│       ├── icons/              # Icon images
│       └── images/             # Photos & illustrations
│
├── .env.local                   # Environment variables (gitignored)
├── .eslintrc.json              # ESLint configuration
├── middleware.ts               # Next.js middleware (auth)
├── next.config.ts              # Next.js configuration
├── package.json                # Dependencies & scripts
├── tailwind.config.ts          # Tailwind configuration
└── tsconfig.json               # TypeScript config
```

---

## 🔑 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:5000/api` |
| `NEXT_PUBLIC_MIDTRANS_CLIENT_KEY` | Midtrans client key | `SB-Mid-client-xxx` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_WEATHER_API_KEY` | OpenWeather API key | - |
| `NEXT_PUBLIC_APP_NAME` | Application name | `Baturaden` |
| `NEXT_PUBLIC_APP_URL` | App base URL | `http://localhost:3000` |

---

## 🐛 Troubleshooting

### Port 3000 sudah digunakan

```bash
# Windows (PowerShell)
$port = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if ($port) { Stop-Process -Id $port.OwningProcess -Force }

# Atau jalankan di port lain
$env:PORT=3001; npm run dev
```

### Error: Cannot find module

```bash
# Hapus node_modules dan reinstall
Remove-Item -Recurse -Force node_modules, package-lock.json
npm install
```

### API Connection Failed

1. Pastikan backend running di port yang benar
2. Cek `NEXT_PUBLIC_API_URL` di `.env.local`
3. Periksa CORS settings di backend

### Slow Development Server

```bash
# Clear Next.js cache
Remove-Item -Recurse -Force .next

# Rebuild
npm run dev
```

---

## 📝 Scripts Available

```bash
npm run dev          # Jalankan development server
npm run build        # Build untuk production
npm run start        # Jalankan production server
npm run lint         # Check linting errors
```

---

## 📄 Lisensi

Project ini dilisensikan di bawah MIT License.

---

## 📞 Kontak & Support

- **Email**: info@baturaden.go.id
- **GitHub Issues**: [Create New Issue](https://github.com/Strioo/webdesa-fe/issues)

---

<div align="center">

**⭐ Jangan lupa berikan star jika project ini bermanfaat! ⭐**

Made with ❤️ by Desa Baturaden Development Team

</div>
