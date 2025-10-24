'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { sendMessage as sendMessageAPI, type ChatMessage } from '@/services/chatbotService'

/**
 * Custom hook for chatbot functionality
 * 
 * Manages chat state, messages, and API interactions
 * Memory clears on refresh/close (no localStorage persistence)
 */
export function useChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Show welcome message on mount (no persistence)
  useEffect(() => {
    const welcomeMessage: ChatMessage = {
      id: 'welcome',
      role: 'assistant',
      content: 'Halo! 👋 Selamat datang di Chat AI Desa Baturaden.\n\nSaya dapat membantu Anda dengan:\n🏞️ Informasi wisata desa\n🏪 UMKM lokal\n🏗️ Program pembangunan\n📊 Statistik desa\n📝 Cara menyampaikan laporan\n\nAda yang bisa saya bantu?',
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
  }, [])

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
   * Send a message to the chatbot with conversation history
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

    const startTime = Date.now()

    try {
      // Call API with conversation history for context
      const response = await sendMessageAPI(content, messages)

      const elapsedSeconds = Math.round((Date.now() - startTime) / 1000)

      // Add bot response
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: response.reply,
        timestamp: new Date(),
        thinkingTime: elapsedSeconds,
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Failed to send message:', error)
      
      // Add error message
      const errorMessage: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: 'Maaf, terjadi kesalahan. Silakan coba lagi dalam beberapa saat atau hubungi kantor desa untuk bantuan.',
        timestamp: new Date(),
      }
      
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }, [isLoading, messages])

  /**
   * Clear chat history (reset conversation)
   */
  const clearChat = useCallback(() => {
    const welcomeMessage: ChatMessage = {
      id: 'welcome-reset',
      role: 'assistant',
      content: 'Chat telah direset. 👋\n\nSaya siap membantu Anda dengan informasi tentang wisata, UMKM, program desa, dan lainnya. Ada yang bisa saya bantu?',
      timestamp: new Date(),
    }
    setMessages([welcomeMessage])
  }, [])

  /**
   * Handle quick action buttons
   */
  const sendQuickAction = useCallback(async (message: string) => {
    if (isLoading) return

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: message,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    const startTime = Date.now()

    try {
      const response = await sendMessageAPI(message, messages)

      const elapsedSeconds = Math.round((Date.now() - startTime) / 1000)

      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        role: 'assistant',
        content: response.reply,
        timestamp: new Date(),
        thinkingTime: elapsedSeconds,
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      console.error('Failed to send quick action:', error)
      
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
  }, [isLoading, messages])

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
