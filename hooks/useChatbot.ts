'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { 
  sendMessage as sendMessageAPI, 
  saveChatHistory, 
  loadChatHistory,
  clearChatHistory as clearChatHistoryAPI,
  type ChatMessage 
} from '@/services/chatbotService'

/**
 * Custom hook for chatbot functionality
 * 
 * Manages chat state, messages, and API interactions
 */
export function useChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load chat history on mount
  useEffect(() => {
    const history = loadChatHistory()
    if (history.length > 0) {
      setMessages(history)
    } else {
      // Add welcome message if no history
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        role: 'assistant',
        content: 'Halo! Selamat datang di Chat AI Desa Baturaden. 👋\n\nSaya siap membantu Anda dengan informasi tentang desa kami. Ada yang bisa saya bantu?',
        timestamp: new Date(),
      }
      setMessages([welcomeMessage])
    }
  }, [])

  // Save chat history whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      saveChatHistory(messages)
    }
  }, [messages])

  // Auto-scroll to bottom when new message arrives
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'end' 
    })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  /**
   * Send a message to the chatbot
   */
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    }

    // Add user message immediately
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Call API (currently mocked)
      const response = await sendMessageAPI(content)

      // Add bot response
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: response.reply,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Failed to send message:', error)
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Maaf, terjadi kesalahan. Silakan coba lagi.',
        timestamp: new Date(),
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [isLoading])

  /**
   * Clear all chat messages
   */
  const clearChat = useCallback(() => {
    setMessages([])
    clearChatHistoryAPI()
    
    // Add welcome message after clear
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      role: 'assistant',
      content: 'Chat telah direset. Ada yang bisa saya bantu?',
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
  }, [])

  /**
   * Quick action: send predefined message
   */
  const sendQuickAction = useCallback((message: string) => {
    sendMessage(message)
  }, [sendMessage])

  return {
    messages,
    isLoading,
    input,
    setInput,
    sendMessage,
    clearChat,
    sendQuickAction,
    messagesEndRef,
  }
}
