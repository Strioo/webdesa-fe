/**
 * Chatbot Service
 * 
 * Handles API communication with chatbot backend.
 * Currently using mock responses for development.
 */

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export interface SendMessageResponse {
  reply: string
}

/**
 * Mock responses for development
 * TODO: Replace with actual API call
 */
const mockResponses: Record<string, string> = {
  wisata: 'Baturaden memiliki banyak destinasi wisata menarik seperti Lokawisata Baturraden, Curug Cipendok, dan Telaga Sunyi. Apakah Anda ingin informasi lebih detail tentang salah satu destinasi?',
  umkm: 'Desa Baturaden memiliki berbagai UMKM lokal seperti kerajinan tangan, kuliner khas, dan produk oleh-oleh. Anda bisa melihat daftar lengkap UMKM di halaman UMKM kami.',
  'kontak desa': 'Anda dapat menghubungi kantor Desa Baturaden melalui:\n📧 Email: desabaturaden@example.com\n📞 Telp: (0281) 1234567\n📍 Alamat: Jl. Raya Baturaden No.1, Banyumas',
  'jadwal layanan': 'Kantor Desa Baturaden buka setiap hari Senin-Jumat pukul 08.00-15.00 WIB. Untuk layanan tertentu, silakan hubungi kami terlebih dahulu.',
  pembangunan: 'Kami berkomitmen untuk transparansi pembangunan desa. Anda dapat melihat progress dan laporan pembangunan di halaman Pembangunan Desa kami.',
  lapor: 'Untuk menyampaikan laporan atau aspirasi, Anda dapat menggunakan fitur Lapor Desa kami. Setiap laporan akan ditindaklanjuti dalam 1x24 jam.',
  default: 'Terima kasih atas pertanyaan Anda! Saya adalah AI Assistant Desa Baturaden. Saya dapat membantu Anda dengan informasi tentang:\n\n🏞️ Wisata\n🏪 UMKM\n🏗️ Pembangunan Desa\n📝 Laporan & Aspirasi\n📞 Kontak Desa\n\nAda yang bisa saya bantu?',
}

/**
 * Simulates API delay
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Get appropriate response based on user message
 */
const getResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase()
  
  // Check for keywords in message
  for (const [keyword, response] of Object.entries(mockResponses)) {
    if (lowerMessage.includes(keyword)) {
      return response
    }
  }
  
  return mockResponses.default
}

/**
 * Send message to chatbot API (currently mocked)
 * 
 * @param message - User message
 * @returns Bot response
 */
export async function sendMessage(message: string): Promise<SendMessageResponse> {
  // Simulate network delay (1-2 seconds)
  await delay(1000 + Math.random() * 1000)
  
  // TODO: Replace with actual API call
  // const response = await fetch('/api/chat', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify({ message }),
  // })
  // const data = await response.json()
  // return { reply: data.reply }
  
  // Mock response
  const reply = getResponse(message)
  
  return { reply }
}

/**
 * Save chat history to localStorage
 */
export function saveChatHistory(messages: ChatMessage[]): void {
  try {
    localStorage.setItem('chatbot_history', JSON.stringify(messages))
  } catch (error) {
    console.error('Failed to save chat history:', error)
  }
}

/**
 * Load chat history from localStorage
 */
export function loadChatHistory(): ChatMessage[] {
  try {
    const saved = localStorage.getItem('chatbot_history')
    if (saved) {
      const messages = JSON.parse(saved)
      // Convert timestamp strings back to Date objects
      return messages.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
      }))
    }
  } catch (error) {
    console.error('Failed to load chat history:', error)
  }
  return []
}

/**
 * Clear chat history from localStorage
 */
export function clearChatHistory(): void {
  try {
    localStorage.removeItem('chatbot_history')
  } catch (error) {
    console.error('Failed to clear chat history:', error)
  }
}
