/**
 * ============================================
 * DATA SERVICE - PROFIL & HOME
 * ============================================
 * 
 * Service layer untuk data profil desa dan home.
 * Termasuk statistik, visi misi, dan content.
 */

import { DATA_SOURCE, simulateDelay, API_BASE_URL } from './config'
import { 
  villageProfile,
  villageOfficials,
  villageTimeline,
  villageStats,
  testimonials,
  homeStats,
  weatherData as dummyWeather,
  publicStats,
  umkmWisataStats,
  chatbotSuggestions,
  heroContent,
  visiMisiContent,
  getPopulationDataByTimeRange
} from '../dummy'
import type { 
  VillageProfile,
  VillageOfficial,
  TimelineEvent,
  VillageStats,
  TestimonialItem,
  HomeStats,
  WeatherData,
  QuickSuggestion,
  ApiResponse 
} from '../types'

// Helper untuk format response
const formatResponse = <T>(data: T, success = true): ApiResponse<T> => ({
  success,
  data,
  message: success ? 'Success' : 'Failed'
})

// ============================================
// PROFIL DESA SERVICES
// ============================================

/**
 * Get village profile
 */
export async function getVillageProfile(): Promise<ApiResponse<VillageProfile>> {
  if (DATA_SOURCE === 'dummy') {
    await simulateDelay()
    return formatResponse(villageProfile)
  }
  // API mode - sesuaikan jika ada endpoint
  return formatResponse(villageProfile)
}

/**
 * Get village officials
 */
export async function getVillageOfficials(): Promise<ApiResponse<VillageOfficial[]>> {
  if (DATA_SOURCE === 'dummy') {
    await simulateDelay()
    return formatResponse(villageOfficials)
  }
  return formatResponse(villageOfficials)
}

/**
 * Get village timeline/history
 */
export async function getVillageTimeline(): Promise<ApiResponse<TimelineEvent[]>> {
  if (DATA_SOURCE === 'dummy') {
    await simulateDelay()
    return formatResponse(villageTimeline)
  }
  return formatResponse(villageTimeline)
}

/**
 * Get village stats
 */
export async function getVillageStats(): Promise<ApiResponse<VillageStats>> {
  if (DATA_SOURCE === 'dummy') {
    await simulateDelay()
    return formatResponse(villageStats)
  }
  return formatResponse(villageStats)
}

// ============================================
// HOME PAGE SERVICES
// ============================================

/**
 * Get home page stats with optional timeRange for population data
 */
export async function getHomeStats(timeRange?: string): Promise<ApiResponse<HomeStats>> {
  try {
    if (DATA_SOURCE === 'dummy') {
      await simulateDelay()
      
      // Filter population monthlyData based on timeRange
      const filteredMonthlyData = getPopulationDataByTimeRange(timeRange || '3months')
      
      return formatResponse({
        ...homeStats,
        population: {
          ...homeStats.population,
          monthlyData: filteredMonthlyData
        }
      })
    }

    const url = timeRange 
      ? `${API_BASE_URL}/dashboard/home-stats?timeRange=${timeRange}`
      : `${API_BASE_URL}/dashboard/home-stats`
    
    const response = await fetch(url)
    const data = await response.json()
    
    if (!response.ok) throw new Error(data.message)
    
    return formatResponse(data.data?.population ? {
      population: data.data.population,
      umkmCount: data.data.umkmCount || homeStats.umkmCount,
      wisataCount: data.data.wisataCount || homeStats.wisataCount,
      proyekAktif: data.data.proyekAktif || homeStats.proyekAktif,
      laporanSelesai: data.data.laporanSelesai || homeStats.laporanSelesai
    } : homeStats)
  } catch (error) {
    // Return with filtered data based on timeRange even on error
    const filteredMonthlyData = getPopulationDataByTimeRange(timeRange || '3months')
    return formatResponse({
      ...homeStats,
      population: {
        ...homeStats.population,
        monthlyData: filteredMonthlyData
      }
    })
  }
}

/**
 * Get weather data
 */
export async function getWeatherData(): Promise<ApiResponse<WeatherData>> {
  try {
    if (DATA_SOURCE === 'dummy') {
      await simulateDelay()
      return formatResponse(dummyWeather)
    }

    // Bisa integrasikan dengan weather API
    // Untuk sekarang return dummy
    return formatResponse(dummyWeather)
  } catch (error) {
    return formatResponse(dummyWeather)
  }
}

/**
 * Get public stats for homepage
 */
export async function getPublicStats(timeRange?: string): Promise<ApiResponse<typeof publicStats>> {
  try {
    if (DATA_SOURCE === 'dummy') {
      await simulateDelay()
      return formatResponse(publicStats)
    }

    const url = timeRange 
      ? `${API_BASE_URL}/dashboard/public-stats?timeRange=${timeRange}`
      : `${API_BASE_URL}/dashboard/public-stats`
    
    const response = await fetch(url)
    const data = await response.json()
    
    if (!response.ok) throw new Error(data.message)
    
    return formatResponse(data.data || publicStats)
  } catch (error) {
    return formatResponse(publicStats)
  }
}

/**
 * Get UMKM & Wisata stats for homepage section
 */
export async function getUmkmWisataStats(): Promise<ApiResponse<typeof umkmWisataStats>> {
  try {
    if (DATA_SOURCE === 'dummy') {
      await simulateDelay()
      return formatResponse(umkmWisataStats)
    }

    const response = await fetch(`${API_BASE_URL}/dashboard/umkm-wisata-stats`)
    const data = await response.json()
    
    if (!response.ok) throw new Error(data.message)
    
    return formatResponse(data.data || umkmWisataStats)
  } catch (error) {
    return formatResponse(umkmWisataStats)
  }
}

/**
 * Get testimonials
 */
export async function getTestimonials(): Promise<ApiResponse<TestimonialItem[]>> {
  if (DATA_SOURCE === 'dummy') {
    await simulateDelay()
    return formatResponse(testimonials)
  }
  return formatResponse(testimonials)
}

/**
 * Get hero content
 */
export async function getHeroContent(): Promise<ApiResponse<typeof heroContent>> {
  if (DATA_SOURCE === 'dummy') {
    await simulateDelay()
    return formatResponse(heroContent)
  }
  return formatResponse(heroContent)
}

/**
 * Get visi misi content
 */
export async function getVisiMisiContent(): Promise<ApiResponse<typeof visiMisiContent>> {
  if (DATA_SOURCE === 'dummy') {
    await simulateDelay()
    return formatResponse(visiMisiContent)
  }
  return formatResponse(visiMisiContent)
}

// ============================================
// CHATBOT SERVICES
// ============================================

/**
 * Get chatbot suggestions
 */
export async function getChatbotSuggestions(): Promise<ApiResponse<QuickSuggestion[]>> {
  try {
    if (DATA_SOURCE === 'dummy') {
      await simulateDelay()
      return formatResponse(chatbotSuggestions)
    }

    const response = await fetch(`${API_BASE_URL}/chatbot/suggestions`)
    const data = await response.json()
    
    if (!response.ok) throw new Error(data.message)
    
    return formatResponse(data.suggestions || chatbotSuggestions)
  } catch (error) {
    return formatResponse(chatbotSuggestions)
  }
}

/**
 * Send message to chatbot (dummy mode returns canned responses)
 */
export async function sendChatbotMessage(
  message: string,
  conversationHistory: { role: string; content: string }[] = []
): Promise<ApiResponse<{ reply: string; fallback?: boolean }>> {
  try {
    if (DATA_SOURCE === 'dummy') {
      await simulateDelay()
      // Return contextual dummy response
      const reply = getDummyBotResponse(message)
      return formatResponse({ reply, fallback: false })
    }

    const response = await fetch(`${API_BASE_URL}/chatbot/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, conversationHistory })
    })
    const data = await response.json()
    
    if (!response.ok) throw new Error(data.message)
    
    return formatResponse({
      reply: data.reply,
      fallback: data.fallback
    })
  } catch (error) {
    return formatResponse({
      reply: 'Maaf, saya sedang mengalami gangguan. Silakan coba lagi.',
      fallback: true
    })
  }
}

// Helper untuk dummy chatbot response
function getDummyBotResponse(message: string): string {
  const lowerMsg = message.toLowerCase()
  
  if (lowerMsg.includes('wisata') || lowerMsg.includes('destinasi')) {
    return 'Di Baturaden ada banyak wisata menarik! Yang paling populer adalah Lokawisata Baturaden dengan air terjun dan kolam air panas, Bukit Bintang untuk sunrise, dan Bhumi Bambu untuk wisata edukasi. Tiket masuk mulai dari Rp 10.000 - Rp 30.000.'
  }
  
  if (lowerMsg.includes('umkm') || lowerMsg.includes('kuliner') || lowerMsg.includes('makan')) {
    return 'Baturaden punya banyak UMKM dan kuliner lezat! Coba kunjungi Warung Mendoan Mbok Darmi untuk mendoan legendaris, atau Kopi Lereng Slamet untuk ngopi dengan view pegunungan. Jangan lupa beli oleh-oleh batik dan kerajinan bambu khas Baturaden!'
  }
  
  if (lowerMsg.includes('lapor') || lowerMsg.includes('aduan') || lowerMsg.includes('keluhan')) {
    return 'Untuk membuat laporan ke desa, Anda bisa menggunakan menu "Lapor" di website ini. Pilih kategori laporan, jelaskan permasalahan dengan detail, dan lampirkan foto jika ada. Laporan akan diproses dalam 1x24 jam kerja.'
  }
  
  if (lowerMsg.includes('pembangunan') || lowerMsg.includes('proyek')) {
    return 'Saat ini ada 6 proyek pembangunan aktif di Baturaden, termasuk perbaikan jalan desa, instalasi air bersih, dan pembangunan posyandu. Anda bisa melihat detail dan progress di menu "Pembangunan".'
  }
  
  if (lowerMsg.includes('tiket') || lowerMsg.includes('beli')) {
    return 'Untuk membeli tiket wisata online, kunjungi halaman detail wisata yang ingin dikunjungi, pilih tanggal dan jumlah tiket, lalu lakukan pembayaran. E-ticket akan dikirim ke email Anda.'
  }
  
  return 'Halo! Saya asisten virtual Desa Baturaden. Saya bisa membantu Anda dengan informasi wisata, UMKM, pembangunan desa, dan layanan administrasi. Silakan tanyakan apa yang ingin Anda ketahui!'
}

export default {
  // Profil
  getVillageProfile,
  getVillageOfficials,
  getVillageTimeline,
  getVillageStats,
  // Home
  getHomeStats,
  getWeatherData,
  getPublicStats,
  getUmkmWisataStats,
  getTestimonials,
  getHeroContent,
  getVisiMisiContent,
  // Chatbot
  getChatbotSuggestions,
  sendChatbotMessage
}
