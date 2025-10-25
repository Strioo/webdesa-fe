'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

export default function DestinationsIntro() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting)
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <div ref={sectionRef} id="destinations">
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-[1400px] mx-auto">
          {/* Header Section - Layout Kiri-Kanan seperti Statistik */}
          <div className={`flex flex-col lg:flex-row justify-between items-center lg:items-start text-center lg:text-left gap-6 sm:gap-8 mb-8 sm:mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-2">
                Destinasi Wisata
                <br />
                Baturaden
              </h2>
            </div>
            <div className="text-gray-500 max-w-xs">
              <p className="text-sm sm:text-base lg:text-lg">
                Temukan tempat terbaik untuk menikmati alam, bersantai, dan
                berpetualang di Baturaden.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
