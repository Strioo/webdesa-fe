'use client'

import { motion } from 'framer-motion'

interface DescriptionProps {
  description: string
  className?: string
}

export default function Description({
  description,
  className = '',
}: DescriptionProps) {
  return (
    <motion.div
      className={`bg-white rounded-2xl shadow-lg ring-1 ring-neutral-200 p-6 md:p-8 ${className}`}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
    >
      <h2 className="text-2xl font-bold text-neutral-900 mb-6 flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6 text-[#5B903A]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
          />
        </svg>
        Deskripsi
      </h2>

      <motion.div
        className="prose prose-neutral max-w-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <p className="text-neutral-700 leading-relaxed whitespace-pre-line">
          {description}
        </p>
      </motion.div>
    </motion.div>
  )
}
