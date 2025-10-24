'use client'

import { type ChatMessage } from '@/services/chatbotService'
import MessageBubble from './MessageBubble'
import ThinkingIndicator from './ThinkingIndicator'
import { Bot } from 'lucide-react'
import { motion } from 'framer-motion'

interface ChatMessagesProps {
  messages: ChatMessage[]
  isLoading: boolean
  messagesEndRef: React.RefObject<HTMLDivElement | null>
}

export default function ChatMessages({
  messages,
  isLoading,
  messagesEndRef,
}: ChatMessagesProps) {
  // Empty state
  if (messages.length === 0 && !isLoading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center text-center max-w-md"
        >
          {/* Robot icon */}
          <div className="flex items-center justify-center w-20 h-20 mb-6 rounded-full bg-gradient-to-br from-[#5B903A] to-[#4a7530] shadow-xl">
            <Bot className="w-10 h-10 text-white" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-3">
            Halo! Ada yang bisa saya bantu?
          </h2>

          {/* Subtitle */}
          <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
            Saya adalah AI Assistant Desa Baturaden. Tanyakan tentang wisata, UMKM, pembangunan,
            atau informasi desa lainnya.
          </p>

          {/* Quick info pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {['Wisata', 'UMKM', 'Pembangunan', 'Kontak'].map((topic) => (
              <span
                key={topic}
                className="px-3 py-1.5 text-xs font-medium text-[#5B903A] bg-green-50 rounded-full border border-green-200"
              >
                {topic}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div
      className="flex-1 overflow-y-auto px-4 py-6 space-y-4 sm:px-6"
      role="log"
      aria-live="polite"
      aria-label="Chat messages"
    >
      {/* Messages */}
      <div className="flex flex-col gap-4">
        {messages.map((message, index) => (
          <MessageBubble key={message.id} message={message} index={index} />
        ))}

        {/* Thinking indicator with advanced animation */}
        {isLoading && (
          <div className="self-start flex items-end gap-2">
            <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#5B903A] to-[#4a7530] mb-1 shadow-sm">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <ThinkingIndicator />
          </div>
        )}
      </div>

      {/* Scroll anchor */}
      <div ref={messagesEndRef} />
    </div>
  )
}
