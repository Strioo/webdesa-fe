'use client'

import { memo } from 'react'
import { motion } from 'framer-motion'
import { User, Check, Brain } from 'lucide-react'
import Image from 'next/image'
import { type ChatMessage } from '@/services/chatbotService'

interface MessageBubbleProps {
  message: ChatMessage
  index: number
}

/**
 * Parse structured wisata/place responses from AI
 * Handles multiple places in one response with proper card layout
 */
function renderMessageContent(content: string) {
  const raw = (content || '').trim()

  // Check if this looks like structured place data
  if (!/(Harga Tiket|Fasilitas|Jam Operasi|Lokasi|Kategori)/i.test(raw)) {
    return <p className="text-sm sm:text-base leading-relaxed whitespace-pre-line">{raw}</p>
  }

  // Split into multiple places if numbered (e.g., "1. ", "2. ", etc.)
  const placeBlocks = raw.split(/(?=\d+\.\s+)/g).filter(Boolean)
  
  if (placeBlocks.length > 1) {
    // Multiple places - render as list of cards
    return (
      <div className="space-y-4">
        {placeBlocks.map((block, idx) => (
          <div key={idx}>
            {parsePlaceBlock(block)}
          </div>
        ))}
      </div>
    )
  }

  // Single place
  return parsePlaceBlock(raw)
}

function parsePlaceBlock(block: string) {
  const lines = block.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
  if (lines.length === 0) return null

  // Extract title (first line, remove numbering and markdown)
  let title = lines[0]
    .replace(/^\d+\.\s*/, '') // remove numbering
    .replace(/\*\*/g, '') // remove bold
    .replace(/[*_]/g, '') // remove other markdown
    .trim()

  const fields: Record<string, string> = {}
  const facilities: string[] = []
  let tagline = ''
  let category = ''

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i]
    
    // Category in parentheses like "(Wisata Kesehatan)"
    if (/^\(.*\)$/.test(line)) {
      category = line.replace(/[()]/g, '').trim()
      continue
    }

    // Tagline in italic (surrounded by *)
    if (/^\*[^*]+\*$/.test(line)) {
      tagline = line.replace(/\*/g, '').trim()
      continue
    }

    // Field lines with colon (Kategori: xxx, Harga Tiket: xxx, etc.)
    if (line.includes(':')) {
      const colonIdx = line.indexOf(':')
      const key = line.substring(0, colonIdx).replace(/^[-*•]\s*/, '').replace(/\*\*/g, '').trim()
      const value = line.substring(colonIdx + 1).replace(/\*\*/g, '').trim()
      
      if (key && value) {
        fields[key] = value
      }
      continue
    }

    // Facility lines (start with ✓, -, *, or •)
    if (/^[✓*\-•]\s*/.test(line)) {
      const facility = line.replace(/^[✓*\-•]\s*/, '').replace(/\*\*/g, '').trim()
      if (facility) {
        facilities.push(facility)
      }
    }
  }

  // Use category from parentheses if found, otherwise from fields
  if (category) {
    fields['Kategori'] = category
  }

  return (
    <div className="space-y-3 p-4 bg-gradient-to-br from-white to-neutral-50 rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h3 className="text-base sm:text-lg font-bold text-neutral-900">{title}</h3>
          {fields['Kategori'] && (
            <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium text-[#5B903A] bg-green-50 rounded-full border border-green-200">
              {fields['Kategori']}
            </span>
          )}
        </div>

        {(fields['Harga Tiket'] || fields['Harga']) && (
          <div className="text-sm font-bold text-white bg-gradient-to-br from-[#5B903A] to-[#4a7530] px-3 py-1.5 rounded-lg shadow-sm">
            {fields['Harga Tiket'] || fields['Harga']}
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3 text-xs text-neutral-600">
        {fields['Lokasi'] && (
          <div className="flex items-center gap-1.5">
            <span className="text-base">📍</span>
            <span>{fields['Lokasi']}</span>
          </div>
        )}
        {fields['Jam Operasi'] && (
          <div className="flex items-center gap-1.5">
            <span className="text-base">⏰</span>
            <span>{fields['Jam Operasi']}</span>
          </div>
        )}
      </div>

      {facilities.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-neutral-700 mb-2">Fasilitas:</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {facilities.map((f, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-neutral-700">
                <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                <span className="flex-1">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {tagline && (
        <p className="text-xs italic text-neutral-600 border-t border-neutral-200 pt-2 mt-2">
          {tagline}
        </p>
      )}
    </div>
  )
}

function MessageBubbleComponent({ message, index }: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const isBot = message.role === 'assistant'

  // Format timestamp
  const timeString = new Date(message.timestamp).toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  })

  // Format thinking time
  const formatThinkingTime = (seconds?: number) => {
    if (!seconds || seconds === 0) return null
    if (seconds < 60) return `${seconds}s`
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return s > 0 ? `${m}m ${s}s` : `${m}m`
  }

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
      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[85%] sm:max-w-[70%]`}>
        {/* Thinking time indicator (bot only, show before message) */}
        {isBot && message.thinkingTime && (
          <div className="mb-1 px-2 py-0.5 text-[10px] text-neutral-500 bg-neutral-100 rounded-full flex items-center gap-1">
            <Brain className="w-3 h-3" />
            <span>Berpikir {formatThinkingTime(message.thinkingTime)}</span>
          </div>
        )}

        {/* Bubble */}
        <div
          className={`px-4 py-3 rounded-2xl whitespace-pre-wrap break-words transition-shadow hover:shadow-lg ${
            isUser
              ? 'bg-gradient-to-br from-[#5B903A] to-[#4a7530] text-white rounded-br-sm shadow-md'
              : 'bg-white text-neutral-900 shadow-sm rounded-bl-sm border border-neutral-100'
          }`}
        >
          {renderMessageContent(message.content)}
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
