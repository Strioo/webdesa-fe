# Quick Reference: Halaman Pembangunan

## 🚀 Akses Halaman

**URL**: `/pembangunan`

**Route**: `app/pembangunan/page.tsx`

---

## 📦 5 Komponen Utama

### 1. HeroPembangunan
```tsx
import HeroPembangunan from '@/components/pembangunan/HeroPembangunan'
```
- Hero dengan background image
- CTA button "Lihat Proyek Pembangunan"
- Smooth scroll ke section statistik

### 2. StatistikPembangunan
```tsx
import StatistikPembangunan from '@/components/pembangunan/StatistikPembangunan'
```
- 4 card statistik pembangunan
- Card pertama highlighted (hijau)
- Icon custom untuk setiap card

### 3. GalleryPembangunan
```tsx
import GalleryPembangunan from '@/components/pembangunan/GalleryPembangunan'
```
- 3 foto potret perkembangan
- Grid responsif
- Hover: scale + overlay

### 4. TransparansiDanaDesa
```tsx
import TransparansiDanaDesa from '@/components/pembangunan/TransparansiDanaDesa'
```
- 3 infografis APBDes (2022-2024)
- Button download untuk setiap infografis
- Aspect ratio poster vertical

### 5. AspirasiBanner
```tsx
import AspirasiBanner from '@/components/pembangunan/AspirasiBanner'
```
- Banner CTA hijau besar
- Link ke `/lapor`
- Decorative elements

---

## 🎨 Warna Utama

```css
Primary: #5B903A (Hijau)
Hover: #4e7a32
Background: white, gray-50
Text: gray-900, gray-600
```

---

## 📱 Responsive Layout

| Device | Columns | Hero Height |
|--------|---------|-------------|
| Mobile | 1 col | 200px |
| Tablet | 2 cols | 300-400px |
| Desktop | 3-4 cols | 500px |

---

## 🎬 Animasi

### Scroll Animations
- Fade in saat masuk viewport
- Stagger children (0.1-0.15s delay)

### Hover Effects
- **Cards**: lift -4px atau -8px
- **Buttons**: scale 1.05
- **Images**: scale 1.1 + overlay

### Duration
- Fast: 0.3s (hover)
- Medium: 0.6s (scroll in)
- Slow: 0.8s (complex)

---

## 📊 Data Statistik

1. **12** Proyek Infrastruktur (Highlighted)
2. **6** Proyek Air Bersih
3. **15** Program Pertanian
4. **90%** Desa Tersosir

---

## 🖼️ Images Default

- Hero: `/assets/images/bg-hero.png`
- Gallery: 3x `/assets/images/bg-hero.png`
- Infografis: 3x `/assets/images/bg-hero.png`

**Ganti dengan gambar sebenarnya!**

---

## 🔗 Navigation

### Smooth Scroll
```tsx
const { scrollTo } = useSmoothScroll({ offset: 80 })
scrollTo('statistik-section')
```

### Links
- CTA Hero → `#statistik-section` (smooth scroll)
- Banner → `/lapor` (navigate)
- Download → `#` (download file)

---

## ⚙️ Customization

### Ubah Warna Primary
```tsx
// Cari & ganti semua:
bg-[#5B903A] → bg-[#YOUR_COLOR]
hover:bg-[#4e7a32] → hover:bg-[#YOUR_HOVER]
text-[#5B903A] → text-[#YOUR_COLOR]
```

### Ubah Statistik
Edit `statistikData` di `StatistikPembangunan.tsx`:
```tsx
{
  icon: <svg>...</svg>,
  number: '12',
  title: 'Judul Statistik',
  description: 'Deskripsi...',
  isHighlight: true  // Hanya 1 yang true
}
```

### Tambah Gallery Image
Edit `galleryImages` di `GalleryPembangunan.tsx`:
```tsx
{
  id: 4,
  src: '/path/to/image.jpg',
  alt: 'Alt text',
  title: 'Image Title'
}
```

### Tambah Infografis
Edit `infografisData` di `TransparansiDanaDesa.tsx`:
```tsx
{
  id: 4,
  year: '2025',
  title: 'Infografis APBDes 2025',
  image: '/path/to/infografis.png',
  downloadUrl: '/download/link.pdf'
}
```

---

## ✅ Checklist Penggantian Asset

### Priority High
- [ ] Replace hero background image
- [ ] Replace 3 gallery images
- [ ] Replace 3 infografis images
- [ ] Update download URLs

### Priority Medium
- [ ] Update statistik numbers (jika ada data real)
- [ ] Update text descriptions
- [ ] Add real project data

### Priority Low
- [ ] Custom icons untuk statistik
- [ ] Additional gallery images
- [ ] Testimonials/comments

---

## 🐛 Quick Fixes

### Image tidak muncul?
```tsx
// Check path:
/assets/images/filename.jpg  // ✅
/public/assets/images/...    // ❌ (wrong)
```

### Animasi tidak smooth?
```tsx
// Pastikan:
- import { motion } from 'framer-motion'
- Gunakan transform (bukan position)
```

### Hover tidak kerja di mobile?
```tsx
// Tambah active state:
className="... active:scale-95"
```

---

## 📝 Metadata

Update di `app/pembangunan/page.tsx`:
```tsx
export const metadata: Metadata = {
  title: 'Judul Halaman | Baturaden',
  description: 'Deskripsi SEO...',
}
```

---

## 🚀 Deploy Checklist

- [ ] Replace all placeholder images
- [ ] Test responsive (mobile, tablet, desktop)
- [ ] Test all buttons & links
- [ ] Verify smooth scroll works
- [ ] Check loading performance
- [ ] Test on different browsers
- [ ] Verify accessibility

---

## 📚 File Locations

```
app/pembangunan/page.tsx              # Main page
components/pembangunan/               # All components
  ├── HeroPembangunan.tsx
  ├── StatistikPembangunan.tsx
  ├── GalleryPembangunan.tsx
  ├── TransparansiDanaDesa.tsx
  └── AspirasiBanner.tsx
```

---

## 🎯 Key Features

✅ Fully responsive  
✅ Smooth animations  
✅ TypeScript typed  
✅ Accessible  
✅ Performance optimized  
✅ Clean code structure  
✅ Modular components  
✅ Easy to customize  

---

**Ready to use!** Just replace the placeholder images with real content. 🚀
