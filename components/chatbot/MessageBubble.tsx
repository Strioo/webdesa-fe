'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import Image from 'next/image'
import { type ChatMessage } from '@/services/chatbotService'

interface MessageBubbleProps {
  message: ChatMessage
  index: number
}

function MessageBubbleComponent({ message, index }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const isBot = message.role === 'assistant'

  // Format timestamp
  const timeString = new Date(message.timestamp).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.2,
        delay: index * 0.03,
      }}
      className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse self-end' : 'self-start'}`}
    >
      {/* Avatar (only for bot) */}
      {isBot && (
        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#5B903A] to-[#4a7530] mb-1 shadow-sm">
          <Image
            src="/assets/icons/chatbot-icon.svg"
            alt="Bot"
            width={18}
            height={18}
            className="w-[18px] h-[18px]"
          />
        </div>
      )}

      {/* Message content */}
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[75%] sm:max-w-[60%]`}>
        {/* Bubble */}
        <div
          className={`px-4 py-3 rounded-2xl whitespace-pre-wrap break-words transition-shadow hover:shadow-lg ${
            isUser
              ? 'bg-gradient-to-br from-[#5B903A] to-[#4a7530] text-white rounded-br-sm shadow-md'
              : 'bg-white text-neutral-900 shadow-sm rounded-bl-sm border border-neutral-100'
          }`}
        >
          <p className="text-sm sm:text-base leading-relaxed">
            {message.content}
          </p>
        </div>

        {/* Timestamp */}
        <span className="mt-1 px-2 text-xs text-neutral-500">
          {timeString}
        </span>
      </div>

      {/* Avatar (only for user) */}
      {isUser && (
        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-neutral-300 mb-1 shadow-sm">
          <User className="w-[18px] h-[18px] text-neutral-600" />
        </div>
      )}
    </motion.div>
  )
}

// Memoize to prevent unnecessary re-renders
export default memo(MessageBubbleComponent)
