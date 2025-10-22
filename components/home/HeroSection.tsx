'use client'

import Image from 'next/image'
import { useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import PopulationChart from '@/components/ui/PopulationChart'
import { useCountUp } from '@/hooks/useCountUp'
import { LayoutTextFlip } from '@/components/ui/TextFlip'

// Constants - moved outside component for better performance
const WEATHER_DATA = {
  location: 'Baturaden, Banyumas',
  temp: 22,
  tempHigh: 25,
  tempLow: 18,
  humidity: 65,
  rainfall: 2.3,
  pressure: 1012
} as const

const POPULATION_GROWTH = 1.25 as const

const POPULATION_DATA = [
  { month: 'Jan', value: 8500, date: '2024-01-01' },
  { month: 'Feb', value: 7520, date: '2024-02-01' },
  { month: 'Mar', value: 9545, date: '2024-03-01' },
  { month: 'Apr', value: 10580, date: '2024-04-01' },
  { month: 'May', value: 7610, date: '2024-05-01' },
  { month: 'Jun', value: 8650, date: '2024-06-01' },
  { month: 'Jul', value: 9685, date: '2024-07-01' },
  { month: 'Aug', value: 6720, date: '2024-08-01' },
  { month: 'Sep', value: 7760, date: '2024-09-01' },
  { month: 'Oct', value: 9795, date: '2024-10-01' },
  { month: 'Nov', value: 8830, date: '2024-11-01' },
  { month: 'Dec', value: 6870, date: '2024-12-01' }
] as const

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  // Count-up animations for numbers
  const tempCountUp = useCountUp({ end: WEATHER_DATA.temp, duration: 2000 })
  const tempHighCountUp = useCountUp({ end: WEATHER_DATA.tempHigh, duration: 2000 })
  const tempLowCountUp = useCountUp({ end: WEATHER_DATA.tempLow, duration: 2000 })
  const humidityCountUp = useCountUp({ end: WEATHER_DATA.humidity, duration: 2000, suffix: '%' })
  const rainfallCountUp = useCountUp({ end: WEATHER_DATA.rainfall, duration: 2000, decimals: 1 })
  const pressureCountUp = useCountUp({ end: WEATHER_DATA.pressure, duration: 2000 })
  const growthCountUp = useCountUp({ end: POPULATION_GROWTH, duration: 2000, decimals: 2, prefix: '+', suffix: '%' })
  
  const latestPopulationValue = useMemo(() => 
    POPULATION_DATA[POPULATION_DATA.length - 1].value,
    []
  )
  const populationCountUp = useCountUp({ 
    end: latestPopulationValue, 
    duration: 2500,
    separator: '.'
  })

  // Intersection Observer for animations
  useEffect(() => {
    const currentSection = sectionRef.current
    if (!currentSection) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    observer.observe(currentSection)

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection)
      }
    }
  }, [])

  return (
    <div ref={sectionRef}>
      <section className="relative bg-[url('/assets/images/bg-hero.png')] bg-cover bg-center min-h-screen w-full overflow-hidden">
        <div className="container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-screen flex items-end pb-10 sm:pb-16 lg:pb-20">
          <div className="flex flex-col lg:flex-row gap-6 w-full justify-between items-end">
            {/* Weather & Population Card */}
            <motion.div 
              className="bg-[rgba(0,0,0,0.215)] backdrop-blur-xs border border-gray-400 shadow-xl rounded-3xl w-full lg:w-[30%]"
              initial={{ x: -24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ 
                type: 'spring', 
                stiffness: 100, 
                damping: 15,
                duration: 0.8
              }}
              whileHover={{ 
                y: -2, 
                scale: 1.02,
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2)',
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="bg-gradient-to-t from-0% to-30% from-[#ffffff7b] to-transparent rounded-3xl space-y-4 p-5">
                <Image 
                  className="mx-auto" 
                  src="/assets/icons/top-widget.svg" 
                  alt="Widget Icon" 
                  width={100} 
                  height={100}
                  priority
                />

                <div className="flex items-center gap-2">
                  <Image 
                    src="/assets/icons/CalendarDots.svg" 
                    alt="Calendar" 
                    width={20} 
                    height={20} 
                    className="w-5 h-5" 
                  />
                  <p className="text-white text-sm">Agenda desa Baturaden</p>
                </div>

                {/* Weather Card */}
                <div className="bg-white rounded-3xl p-3">
                  <p className="text-black text-md opacity-90">{WEATHER_DATA.location}</p>
                  <div className="flex justify-between items-start">
                    <div className="flex mt-5 justify-center items-center">
                      <span className="text-black text-2xl font-light">+</span>
                      <span ref={tempCountUp.ref} className="text-black text-3xl font-light">{tempCountUp.count}</span>
                      <span className="text-black text-2xl">°C</span>
                    </div>
                    <div className="text-black text-left my-auto">
                      <p className="text-sm">H: <span ref={tempHighCountUp.ref}>{tempHighCountUp.count}</span>°C</p>
                      <p className="text-sm">L: <span ref={tempLowCountUp.ref}>{tempLowCountUp.count}</span>°C</p>
                    </div>
                    <Image 
                      src="/assets/icons/cloud.svg" 
                      alt="Weather" 
                      width={64} 
                      height={64} 
                      className="w-16 h-16" 
                    />
                  </div>

                  <hr className="border-[#A1A1A1] my-2" />

                  <div className="grid grid-cols-3 gap-4 mt-2 text-black text-center">
                    <div>
                      <p className="text-xs opacity-75">Kelembaban</p>
                      <p ref={humidityCountUp.ref} className="text-sm font-medium">{humidityCountUp.count}</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-75">Curah Hujan</p>
                      <p ref={rainfallCountUp.ref} className="text-sm font-medium">{rainfallCountUp.count} mm</p>
                    </div>
                    <div>
                      <p className="text-xs opacity-75">Tekanan Udara</p>
                      <p ref={pressureCountUp.ref} className="text-sm font-medium">{pressureCountUp.count} hPa</p>
                    </div>
                  </div>
                </div>

                {/* Population Growth Card */}
                <div className="bg-white rounded-3xl pb-6 pt-3 px-3">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-black font-medium text-sm">Pertumbuhan Penduduk</p>
                    <span ref={growthCountUp.ref} className="bg-[#5B903A] flex gap-1 items-center text-white text-xs px-3 py-1 rounded-full">
                      {growthCountUp.count}
                      <Image 
                        src="/assets/icons/arrowright.png" 
                        alt="Growth" 
                        width={16} 
                        height={16} 
                        className="w-4 h-4 invert" 
                        style={{ transform: 'rotate(-90deg)' }} 
                      />
                    </span>
                  </div>

                  <div className="mb-2">
                    <p ref={populationCountUp.ref} className="text-2xl font-bold text-[#5B903A]">{populationCountUp.count}</p>
                    <p className="text-xs text-gray-500">Total Penduduk (Des 2024)</p>
                  </div>

                  <div className="relative mt-2">
                    <PopulationChart 
                      data={[...POPULATION_DATA]} 
                      color="#5B903A" 
                      height={100} 
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Hero Content */}
            <motion.div 
              className="w-full lg:w-[48%] flex flex-col justify-end"
              initial={{ x: 24, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ 
                type: 'spring',
                stiffness: 80,
                damping: 15,
                delay: 0.3,
                duration: 0.8
              }}
            >
              <motion.div 
                className="mb-4"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                <motion.span 
                  className="inline-block bg-white/10 backdrop-blur-md border border-white/30 text-white px-4 py-2 sm:px-5 sm:py-3 rounded-full text-xs sm:text-sm font-medium shadow-lg cursor-default"
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    transition: { duration: 0.2 }
                  }}
                >
                  Pesona Alam Banyumas
                </motion.span>
              </motion.div>

              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-4 sm:mb-6">
                <LayoutTextFlip 
                  text="Baturaden, " 
                  words={['Harmoni', 'Keindahan', 'Nuansa', 'Kesejukan']} 
                  duration={3000}
                />
                <br />
                Alam dan Kehangatan
              </h1>

              <p className="text-[#A1A1A1] text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl opacity-90 leading-relaxed">
                Tempat terbaik untuk liburan keluarga, melepas penat, dan menikmati keindahan
                Banyumas yang menenangkan.
              </p>

              <motion.button
                className="inline-flex items-center justify-center w-max bg-white text-black font-medium pl-5 pr-2 py-2 rounded-full gap-3 cursor-pointer relative will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                aria-label="Kunjungi Sekarang"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: '0 12px 28px -8px rgba(0, 0, 0, 0.35)',
                }}
                whileTap={{ 
                  scale: 0.98,
                }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 400, 
                  damping: 25,
                  duration: 0.15
                }}
              >
                <span className="shrink-0 select-none">Kunjungi Sekarang</span>
                <motion.div 
                  className="bg-[#5B903A] rounded-full w-12 h-12 flex items-center justify-center shrink-0"
                  whileHover={{ rotate: 45, scale: 1.08 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <Image 
                    src="/assets/icons/arrow.svg" 
                    alt="Arrow" 
                    width={12} 
                    height={12} 
                    className="w-3 invert" 
                  />
                </motion.div>
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HeroSection
