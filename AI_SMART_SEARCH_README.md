# 🤖 AI Smart Search Feature

## Overview

Fitur pencarian cerdas berbasis AI yang memberikan rekomendasi wisata personal berdasarkan preferensi pengguna menggunakan **DeepSeek AI** (via OpenRouter).

## ✨ Key Features

### 1. **Dual Search Mode**
- **Regular Search**: Filter biasa berdasarkan location & price
- **AI Recommendation**: Analisis mendalam dengan AI untuk hasil terbaik

### 2. **Smart Input Form**
- Location (optional) - Area atau spot wisata
- Jumlah Pengunjung (required) - 1-50 orang
- Max Price (optional) - Budget per tiket

### 3. **AI Analysis**
AI menganalisis dan memberikan:
- ⭐ Top 3 rekomendasi wisata terbaik
- 📊 Score 1-10 untuk setiap destinasi
- 💬 Alasan detail kenapa cocok untuk Anda
- 💡 Tips dan saran untuk kunjungan optimal

### 4. **Beautiful Results Modal**
- Gradient header dengan AI branding
- Loading animation yang smooth
- Recommendation cards dengan:
  - Rank badges (#1, #2, #3)
  - Image preview
  - Score indicators
  - Detailed reasons
  - Highlight features
  - Direct navigation ke detail
- Pro tips section

## 🔧 Technical Stack

- **AI Model**: `tngtech/deepseek-r1t2-chimera:free` (FREE ✅)
- **Provider**: OpenRouter.ai
- **Backend**: Node.js + Express
- **Frontend**: Next.js 14 + Framer Motion
- **Database**: Prisma + MySQL

## 📦 Files Structure

```
be-desa/
├── src/
│   ├── config/
│   │   └── ai.js                 # AI service & OpenRouter integration
│   ├── controllers/
│   │   └── wisataController.js   # Added getAIRecommendation()
│   └── routes/
│       └── wisata.js             # Added POST /recommend endpoint
└── .env                          # OPENROUTER_API_KEY

webdesa-fe/
└── components/
    └── wisata/
        ├── SearchGlassCard.tsx           # Enhanced with AI button
        ├── AIRecommendationModal.tsx     # New: Results modal
        └── HeroWisata.tsx                # Integrated AI flow
```

## 🚀 Quick Setup

1. **Get API Key** (FREE)
   ```bash
   # Visit https://openrouter.ai
   # Sign up → Keys → Create Key
   ```

2. **Add to .env**
   ```bash
   OPENROUTER_API_KEY=sk-or-v1-your-key-here
   APP_URL=http://localhost:5000
   ```

3. **Start Services**
   ```bash
   # Backend
   cd be-desa && npm run dev
   
   # Frontend
   cd webdesa-fe && npm run dev
   ```

4. **Test**
   - Visit http://localhost:3000/wisata
   - Fill form and click "AI Suggest" ✨

## 📡 API Reference

### POST `/api/wisata/recommend`

**Request:**
```json
{
  "location": "Baturaden",
  "numPeople": 3,
  "maxPrice": 20000
}
```

**Response:**
```json
{
  "success": true,
  "analysis": "Ditemukan 2 destinasi...",
  "recommendations": [
    {
      "namaWisata": "Air Terjun Pelangi",
      "score": 9,
      "reason": "Destinasi Alam dengan fasilitas lengkap...",
      "highlight": "Harga: Rp 15.000 per orang",
      "wisataData": { ... }
    }
  ],
  "tips": "Untuk kunjungan 3 orang...",
  "totalFound": 2
}
```

## 🎯 Use Cases

### Family Trip (4 people, budget-friendly)
```
Location: Baturaden
Jumlah: 4
Max Price: 20000

Result: AI recommends family-friendly places with 
kid facilities and affordable group pricing
```

### Budget Backpacker (2 people, cheap)
```
Location: (empty)
Jumlah: 2  
Max Price: 10000

Result: AI finds value-for-money destinations 
suitable for couples/friends
```

### Group Adventure (10 people, outdoor)
```
Location: Pegunungan
Jumlah: 10
Max Price: 50000

Result: AI suggests spacious outdoor destinations
with group facilities
```

## 🛡️ Error Handling

✅ **Fallback System**: Works even without AI
✅ **Graceful Degradation**: Falls back to simple filtering
✅ **User-Friendly Errors**: Clear error messages
✅ **Retry Options**: Easy to retry failed requests

## 📚 Documentation

- **QUICK_START_AI.md** - Get started in 5 minutes
- **AI_SMART_SEARCH_GUIDE.md** - Comprehensive setup guide
- **AI_IMPLEMENTATION_SUMMARY.md** - Complete technical overview

## 🎉 Features Showcase

### Before (Regular Search)
```
User: Search wisata with price < 20000
System: Shows all wisata under 20000 (basic filter)
```

### After (AI Recommendation)
```
User: 3 people, max 20000, Baturaden area
AI: Analyzes context + preferences
    Scores each destination (1-10)
    Recommends TOP 3 with detailed reasons
    Provides tips for 3-person group
    Highlights best features for you
```

## 💡 Why This is Cool

1. **Personalized** - Not just filtering, actual analysis
2. **Smart** - Considers group size, budget, preferences
3. **Helpful** - Gives reasons & tips, not just results
4. **Fast** - 2-3 seconds for AI analysis
5. **Free** - Uses free AI model, no recurring costs
6. **Beautiful** - Smooth animations & modern UI
7. **Reliable** - Fallback system if AI fails

## 🔮 Future Ideas

- Multi-language support
- Image-based preferences
- Chat with AI for details
- Save favorite recommendations
- Share results via link
- Compare destinations side-by-side
- Seasonal suggestions

---

**Model**: `tngtech/deepseek-r1t2-chimera:free`
**Cost**: FREE ✅
**Performance**: ~2-3s response
**Quality**: High-quality reasoning

Built with ❤️ for better wisata discovery!
