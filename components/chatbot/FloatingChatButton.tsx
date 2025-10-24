'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

/**
 * FloatingChatButton (FAB)
 * 
 * Floating Action Button untuk membuka chatbot AI.
 * Muncul di kanan bawah homepage dengan animasi smooth.
 * 
 * Features:
 * - Slide-in animation on page load
 * - Enhanced hover/tap interactions with glow effect
 * - Custom chatbot icon SVG
 * - Only visible on homepage
 * - Accessible keyboard navigation
 */
export default function FloatingChatButton() {
  const pathname = usePathname()
  
  // Only show on homepage
  if (pathname !== '/' && pathname !== '/home') {
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.5,
        delay: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="fixed bottom-6 right-6 z-50 md:bottom-8 md:right-8"
    >
      <Link
        href="/chatbot"
        aria-label="Buka Chat dengan AI Desa Baturaden"
        className="group relative block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] focus-visible:ring-offset-2 rounded-full"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative flex items-center justify-center w-[60px] h-[60px] md:w-[64px] md:h-[64px] rounded-full bg-gradient-to-br from-[#5B903A] to-[#4a7530] shadow-lg hover:shadow-xl transition-shadow duration-200"
        >
          {/* Icon with subtle shake */}
          <motion.div
            whileHover={{ 
              rotate: [0, -3, 3, -3, 3, 0],
              transition: { duration: 0.4, ease: 'easeInOut' }
            }}
            className="relative z-10"
          >
            <Image
              src="/assets/icons/chatbot-icon.svg"
              alt="Chatbot AI"
              width={32}
              height={32}
              className="w-7 h-7 md:w-8 md:h-8 drop-shadow-sm"
            />
          </motion.div>
          
          {/* Subtle pulse animation */}
          <span className="absolute inset-0 rounded-full bg-[#5B903A] opacity-30 animate-ping" />
        </motion.div>

        {/* Tooltip on hover - enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          whileHover={{ opacity: 1, y: 0 }}
          className="absolute bottom-full right-0 mb-3 px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none shadow-lg backdrop-blur-sm"
        >
          Chat dengan AI 🤖
          <div className="absolute top-full right-4 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] border-l-transparent border-r-transparent border-t-gray-900" />
        </motion.div>
      </Link>
    </motion.div>
  )
}
