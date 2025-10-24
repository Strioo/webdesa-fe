'use client'

import { useState, KeyboardEvent } from 'react'
import { Send } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ChatInputProps {
  input: string
  setInput: (value: string) => void
  onSend: (message: string) => void
  isLoading: boolean
  onQuickAction?: (message: string) => void
}

const quickActions = [
  { label: '🏞️ Info Wisata', message: 'Berikan informasi tentang wisata di Baturaden' },
  { label: '🏪 Daftar UMKM', message: 'Tampilkan daftar UMKM di desa' },
  { label: '📞 Kontak Desa', message: 'Bagaimana cara menghubungi kantor desa?' },
  { label: '🏗️ Pembangunan', message: 'Info pembangunan desa terbaru' },
]

export default function ChatInput({
  input,
  setInput,
  onSend,
  isLoading,
  onQuickAction,
}: ChatInputProps) {
  const [showQuickActions, setShowQuickActions] = useState(true)

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault()
    if (input.trim() && !isLoading) {
      onSend(input)
      setShowQuickActions(false)
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter to send, Shift+Enter for newline
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleQuickAction = (message: string) => {
    setInput(message)
    setShowQuickActions(false)
    if (onQuickAction) {
      onQuickAction(message)
    }
  }

  return (
    <div className="sticky bottom-0 bg-white border-t border-neutral-200 shadow-2xl">
      {/* Quick Actions */}
      <AnimatePresence>
        {showQuickActions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="px-4 py-3 overflow-x-auto sm:px-6"
          >
            <div className="flex gap-2 min-w-max">
              {quickActions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => handleQuickAction(action.message)}
                  className="px-4 py-2 text-sm font-medium text-[#5B903A] bg-green-50 rounded-full border border-green-200 hover:border-[#5B903A] hover:bg-green-100 hover:shadow-md active:scale-95 transition-all whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A]"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="px-4 py-3 sm:px-6">
        <div className="flex items-end gap-2">
          {/* Textarea */}
          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tanya seputar desa, wisata, UMKM..."
              rows={1}
              disabled={isLoading}
              className="w-full px-4 py-3 pr-12 text-sm sm:text-base rounded-full border-2 border-neutral-200 focus:border-[#5B903A] focus:ring-2 focus:ring-[#5B903A]/20 resize-none outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed max-h-32 overflow-hidden hover:border-neutral-300"
              style={{
                minHeight: '48px',
                maxHeight: '128px',
              }}
              onInput={(e) => {
                const target = e.target as HTMLTextAreaElement
                target.style.height = 'auto'
                target.style.height = `${Math.min(target.scrollHeight, 128)}px`
              }}
              aria-label="Tulis pesan"
            />
          </div>

          {/* Send Button */}
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#5B903A] to-[#4a7530] text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] focus-visible:ring-offset-2"
            aria-label="Kirim pesan"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>

        {/* Helper text */}
        <p className="mt-2 text-xs text-neutral-500 text-center">
          Tekan <kbd className="px-1.5 py-0.5 text-xs bg-neutral-100 border border-neutral-300 rounded">Enter</kbd> untuk kirim, 
          <kbd className="ml-1 px-1.5 py-0.5 text-xs bg-neutral-100 border border-neutral-300 rounded">Shift+Enter</kbd> untuk baris baru
        </p>
      </form>
    </div>
  )
}
