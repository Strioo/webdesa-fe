# 🖼️ Timeline Images - Quick Reference

## Image Naming Guide

```
📁 /public/assets/images/
│
├── 📷 timeline-1990(1).png  ← Era 1: Gambar Kiri
├── 📷 timeline-1990(2).png  ← Era 1: Gambar Kanan
│
├── 📷 timeline-2000(1).png  ← Era 2: Gambar Kiri
├── 📷 timeline-2000(2).png  ← Era 2: Gambar Kanan
│
├── 📷 timeline-2010(1).png  ← Era 3: Gambar Kiri
├── 📷 timeline-2010(2).png  ← Era 3: Gambar Kanan
│
├── 📷 timeline-2020(1).png  ← Era 4: Gambar Kiri
└── 📷 timeline-2020(2).png  ← Era 4: Gambar Kanan
```

---

## How to Replace Images

### Option 1: Same Filename (Easiest)
```bash
1. Prepare your new image
2. Rename to exact filename: timeline-2000(1).png
3. Copy to: /public/assets/images/
4. Replace existing file
5. Refresh browser (Ctrl+F5)
```

### Option 2: Different Filename
```bash
1. Upload new image with any name
2. Open: components/profile/TimelineSectionAceternity.tsx
3. Find: src="/assets/images/timeline-2000(1).png"
4. Change to: src="/assets/images/your-new-image.png"
5. Save & refresh
```

---

## Image Specs

| Property | Value |
|----------|-------|
| **Format** | PNG, JPG, WebP |
| **Size** | 800×600px minimum |
| **Max File Size** | 500KB |
| **Aspect Ratio** | 4:3 atau 16:9 |

---

## Need Help?

See full documentation: `TIMELINE_IMAGES_STRUCTURE.md`
