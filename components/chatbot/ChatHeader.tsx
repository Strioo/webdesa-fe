'use client'

import { useRouter } from 'next/navigation'
import { ArrowLeft, RotateCcw } from 'lucide-react'
import { motion } from 'framer-motion'
import Image from 'next/image'

interface ChatHeaderProps {
  onReset?: () => void
}

export default function ChatHeader({ onReset }: ChatHeaderProps) {
  const router = useRouter()

  const handleBack = () => {
    router.push('/')
  }

  const handleReset = () => {
    if (confirm('Apakah Anda yakin ingin menghapus semua pesan?')) {
      onReset?.()
    }
  }

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-neutral-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        {/* Left: Back button */}
        <button
          onClick={handleBack}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-neutral-100 active:scale-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A]"
          aria-label="Kembali ke homepage"
        >
          <ArrowLeft className="w-5 h-5 text-neutral-700" />
        </button>

        {/* Center: Title with icon */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#5B903A] to-[#4a7530] shadow-sm">
            <Image
              src="/assets/icons/chatbot-icon.svg"
              alt="Chatbot"
              width={24}
              height={24}
              className="w-6 h-6 drop-shadow-sm"
            />
          </div>
          <div className="flex flex-col">
            <p className="text-sm sm:text-base md:text-lg font-semibold text-neutral-900 leading-tight">
              Chat AI Desa
            </p>
            <p className="text-xs text-neutral-500 hidden sm:block">
              Baturaden
            </p>
          </div>
        </div>

        {/* Right: Reset button */}
        <button
          onClick={handleReset}
          className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-neutral-100 hover:rotate-180 active:scale-95 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A]"
          aria-label="Reset chat"
          title="Hapus semua pesan"
        >
          <RotateCcw className="w-5 h-5 text-neutral-700" />
        </button>
      </div>
    </header>
  )
}
