/**
 * Chatbot Service
 * 
 * Handles API communication with chatbot backend.
 * Integrated with real backend API and AI.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://192.168.18.3:5000/api';

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  thinkingTime?: number // in seconds
}

export interface SendMessageResponse {
  reply: string
  fallback?: boolean
  thinkingTime?: number // in seconds
}

export interface QuickSuggestion {
  id: string
  text: string
  message: string
}

/**
 * Send message to chatbot API with conversation history
 * 
 * @param message - User message
 * @param conversationHistory - Previous messages for context
 * @returns Bot response
 */
export async function sendMessage(
  message: string,
  conversationHistory: ChatMessage[] = []
): Promise<SendMessageResponse> {
  try {
    console.log('📤 Sending message to chatbot API:', message);

    const response = await fetch(`${API_BASE_URL}/chatbot/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        conversationHistory: conversationHistory.map(msg => ({
          role: msg.role,
          content: msg.content
        }))
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data.success) {
      throw new Error(data.message || 'Failed to get response');
    }

    console.log('✅ Received response from chatbot API');
    
    return { 
      reply: data.reply,
      fallback: data.fallback
    };

  } catch (error) {
    console.error('❌ Chatbot API error:', error);
    
    // Fallback response
    return {
      reply: 'Maaf, saya sedang mengalami gangguan. Silakan coba lagi dalam beberapa saat atau hubungi kantor desa untuk bantuan langsung.',
      fallback: true
    };
  }
}

/**
 * Get quick action suggestions
 */
export async function getSuggestions(): Promise<QuickSuggestion[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/chatbot/suggestions`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch suggestions');
    }

    const data = await response.json();
    
    if (data.success && data.suggestions) {
      return data.suggestions;
    }

    throw new Error('Invalid response format');
  } catch (error) {
    console.error('Error fetching suggestions:', error);
    
    // Default suggestions as fallback
    return [
      {
        id: 'wisata',
        text: '🏞️ Rekomendasi wisata',
        message: 'Rekomendasi wisata terbaik di desa apa saja?'
      },
      {
        id: 'program',
        text: '🏗️ Program desa',
        message: 'Apa saja program pembangunan desa yang sedang berjalan?'
      },
      {
        id: 'umkm',
        text: '🏪 UMKM lokal',
        message: 'UMKM apa saja yang ada di desa?'
      },
      {
        id: 'stats',
        text: '📊 Statistik desa',
        message: 'Berapa jumlah wisata, UMKM, dan program di desa?'
      }
    ];
  }
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
