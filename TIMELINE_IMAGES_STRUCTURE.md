# 📸 Timeline Images Structure

## Overview

Setiap periode timeline sekarang memiliki **2 gambar individual** yang bisa diganti-ganti sesuai kebutuhan, bukan lagi menggunakan sistem duplikasi dengan `.map()`.

---

## 🗂️ Image Structure

### **4 Timeline Periods × 2 Images = 8 Total Images**

```
/public/assets/images/
├── timeline-1990(1).png  ← Era 1990-2000 Gambar 1
├── timeline-1990(2).png  ← Era 1990-2000 Gambar 2
├── timeline-2000(1).png  ← Era 2000-2010 Gambar 1
├── timeline-2000(2).png  ← Era 2000-2010 Gambar 2
├── timeline-2010(1).png  ← Era 2010-2020 Gambar 1
├── timeline-2010(2).png  ← Era 2010-2020 Gambar 2
├── timeline-2020(1).png  ← Era 2020-Now Gambar 1
└── timeline-2020(2).png  ← Era 2020-Now Gambar 2
```

---

## 📋 Detailed Mapping

### **1. Era 1990-2000: Awal Peradaban**

**Path:**
```
/assets/images/timeline-1990(1).png
/assets/images/timeline-1990(2).png
```

**Alt Text:**
- Gambar 1: "Baturaden era 1990-2000 gambar 1"
- Gambar 2: "Baturaden era 1990-2000 gambar 2"

**Konten Gambar (Saran):**
- Gambar 1: Air terjun atau pemandian air panas
- Gambar 2: Pertanian tradisional atau kehidupan masyarakat

---

### **2. Era 2000-2010: Kebangkitan Pariwisata**

**Path:**
```
/assets/images/timeline-2000(1).png
/assets/images/timeline-2000(2).png
```

**Alt Text:**
- Gambar 1: "Pariwisata Baturaden 2000-2010 gambar 1"
- Gambar 2: "Pariwisata Baturaden 2000-2010 gambar 2"

**Konten Gambar (Saran):**
- Gambar 1: Festival budaya atau acara lokal
- Gambar 2: Pengunjung wisata atau pemandangan alam

---

### **3. Era 2010-2020: Transformasi Digital**

**Path:**
```
/assets/images/timeline-2010(1).png
/assets/images/timeline-2010(2).png
```

**Alt Text:**
- Gambar 1: "Infrastruktur Baturaden 2010-2020 gambar 1"
- Gambar 2: "Infrastruktur Baturaden 2010-2020 gambar 2"

**Konten Gambar (Saran):**
- Gambar 1: Jalan yang diperbaiki atau kantor desa modern
- Gambar 2: Pelayanan digital atau teknologi

---

### **4. Era 2020-Sekarang: Desa Berkelanjutan**

**Path:**
```
/assets/images/timeline-2020(1).png
/assets/images/timeline-2020(2).png
```

**Alt Text:**
- Gambar 1: "Desa berkelanjutan 2020-sekarang gambar 1"
- Gambar 2: "Desa berkelanjutan 2020-sekarang gambar 2"

**Konten Gambar (Saran):**
- Gambar 1: UMKM lokal atau produk desa
- Gambar 2: Lingkungan hijau atau program berkelanjutan

---

## 🔄 Before vs After

### **Before (dengan .map duplikasi):**

```tsx
{[1, 2].map((i) => (
  <div key={i}>
    <Image src="/assets/images/bg-hero.png" alt={`Baturaden ${i}`} />
  </div>
))}
```

**Masalah:**
- ❌ Kedua gambar selalu sama (duplicate)
- ❌ Tidak bisa ganti gambar berbeda per slot
- ❌ Alt text generic
- ❌ Sulit track gambar mana yang di-update

### **After (individual images):**

```tsx
<div>
  <Image src="/assets/images/timeline-1990(1).png" alt="..." />
</div>
<div>
  <Image src="/assets/images/timeline-1990(2).png" alt="..." />
</div>
```

**Benefits:**
- ✅ Setiap gambar unique dan bisa berbeda
- ✅ Mudah ganti gambar per slot
- ✅ Alt text specific dan SEO-friendly
- ✅ Clear tracking untuk setiap gambar
- ✅ Lebih maintainable

---

## 📝 How to Update Images

### **Step 1: Prepare Your Images**

Pastikan gambar Anda:
- Format: PNG, JPG, atau WebP
- Size: Recommended 800×600px atau 1200×900px
- Aspect ratio: 4:3 atau 16:9
- File size: < 500KB per image (optimize dengan TinyPNG)

### **Step 2: Naming Convention**

```
timeline-[tahun]([nomor]).png

Contoh:
timeline-1990(1).png  ← Era pertama, gambar pertama
timeline-1990(2).png  ← Era pertama, gambar kedua
timeline-2000(1).png  ← Era kedua, gambar pertama
timeline-2000(2).png  ← Era kedua, gambar kedua
```

### **Step 3: Upload ke Public Folder**

```bash
/public/assets/images/
```

Copy gambar Anda ke folder tersebut dengan nama yang sesuai.

### **Step 4: Replace di Code (Optional)**

Jika Anda ingin mengganti path atau nama file:

```tsx
// Di TimelineSectionAceternity.tsx
<Image
  src="/assets/images/timeline-1990(1).png"  ← Ubah ini
  alt="Baturaden era 1990-2000 gambar 1"
  ...
/>
```

---

## 🎨 Image Guidelines

### **Recommended Specifications:**

| Aspect | Specification |
|--------|---------------|
| **Format** | PNG (transparansi), JPG (foto), WebP (modern) |
| **Resolution** | 800×600px (minimum), 1200×900px (optimal) |
| **Aspect Ratio** | 4:3 atau 16:9 |
| **File Size** | < 500KB (optimize!) |
| **Color Space** | sRGB |
| **Quality** | 80-90% (balance size vs quality) |

### **Content Guidelines:**

1. **Relevance**: Gambar harus sesuai dengan era yang dijelaskan
2. **Quality**: High resolution, tidak blur
3. **Composition**: Clear subject, good framing
4. **Lighting**: Well-lit, tidak terlalu gelap/terang
5. **Diversity**: Variasi konten antar gambar dalam satu era

### **Accessibility:**

- ✅ Alt text descriptive dan meaningful
- ✅ Contrast ratio sufficient
- ✅ No text embedded in images (gunakan overlay jika perlu)

---

## 🛠️ Maintenance Checklist

### **When Adding New Images:**

- [ ] Image optimized (< 500KB)
- [ ] Correct naming convention
- [ ] Uploaded to `/public/assets/images/`
- [ ] Alt text updated di code
- [ ] Tested on dev server
- [ ] Verified responsive display
- [ ] Checked loading performance

### **When Updating Existing Images:**

- [ ] Backup old image (optional)
- [ ] Replace with same filename
- [ ] Clear browser cache
- [ ] Test on mobile & desktop
- [ ] Verify alt text still accurate

---

## 📊 Current Image Mapping

```tsx
// TimelineSectionAceternity.tsx

// ERA 1: 1990-2000
timeline-1990(1).png → Gambar kiri
timeline-1990(2).png → Gambar kanan

// ERA 2: 2000-2010
timeline-2000(1).png → Gambar kiri
timeline-2000(2).png → Gambar kanan

// ERA 3: 2010-2020
timeline-2010(1).png → Gambar kiri
timeline-2010(2).png → Gambar kanan

// ERA 4: 2020-Sekarang
timeline-2020(1).png → Gambar kiri
timeline-2020(2).png → Gambar kanan
```

---

## 🚀 Quick Reference

### **Replace Single Image:**

1. Prepare image (optimize, rename)
2. Copy to `/public/assets/images/`
3. Replace existing file dengan nama sama
4. Refresh browser (Ctrl+F5)

### **Add New Timeline Period:**

1. Duplicate timeline entry di code
2. Change title & content
3. Add 2 new images: `timeline-XXXX(1).png` & `timeline-XXXX(2).png`
4. Update image paths di code
5. Test responsiveness

---

## ✅ Benefits of This Structure

### **Developer-Friendly:**
- ✅ Clear file structure
- ✅ Easy to find & replace specific images
- ✅ No confusion with duplicates
- ✅ Better version control (Git can track individual changes)

### **Content Manager-Friendly:**
- ✅ Simple naming convention
- ✅ Just drag & drop to replace
- ✅ No code knowledge needed
- ✅ Visual preview in file explorer

### **Performance:**
- ✅ Next.js Image optimization automatic
- ✅ Lazy loading built-in
- ✅ Responsive srcset generated
- ✅ WebP conversion on modern browsers

### **SEO:**
- ✅ Unique alt text per image
- ✅ Descriptive filenames
- ✅ Proper semantic HTML
- ✅ Better image search indexing

---

## 📝 Example: Complete Update Flow

### **Scenario:** Replace gambar era 2000-2010

**Step 1:** Prepare images
```
my-photo-1.jpg → Rename to: timeline-2000(1).png
my-photo-2.jpg → Rename to: timeline-2000(2).png
```

**Step 2:** Optimize
```bash
# Using TinyPNG or ImageOptim
Original: 2.5MB → Optimized: 380KB
```

**Step 3:** Upload
```
Copy to: /public/assets/images/
```

**Step 4:** Verify
```
Open: http://localhost:3002/profile
Scroll to timeline
Check images loaded
```

**Done!** ✨

---

## 🎯 Summary

- ✅ **8 unique images** (4 eras × 2 images)
- ✅ **Individual control** per image slot
- ✅ **Easy to maintain** dengan naming convention
- ✅ **SEO-optimized** dengan unique alt text
- ✅ **Performance-optimized** dengan Next.js Image

**No more duplicates, full flexibility!** 🚀

---

**Updated:** October 22, 2025  
**Status:** ✅ Production Ready  
**Files Modified:** `TimelineSectionAceternity.tsx`
