'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import PopulationChart from '@/components/ui/PopulationChart'
import { useCountUp } from '@/hooks/useCountUp'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { fetchWeatherData } from '@/lib/weatherApi'
import { dashboardApi } from '@/lib/api'

interface WeatherData {
  location: string
  temp: number
  tempHigh: number
  tempLow: number
  humidity: number
  rainfall: number
  pressure: number
}

interface PopulationDataPoint {
  month: string
  value: number
  date: string
}

interface PopulationData {
  total: number
  growthRate: number
  monthlyData: PopulationDataPoint[]
}

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollTo } = useSmoothScroll({ offset: 80, duration: 1000, easing: 'easeInOut' })
  
  const [weatherData, setWeatherData] = useState<WeatherData>({
    location: 'Baturaden, Banyumas',
    temp: 22,
    tempHigh: 25,
    tempLow: 18,
    humidity: 65,
    rainfall: 0,
    pressure: 1012
  })

  const [populationData, setPopulationData] = useState<PopulationData>({
    total: 0,
    growthRate: 0,
    monthlyData: []
  })

  const [isLoading, setIsLoading] = useState(true)
  const [dataLoaded, setDataLoaded] = useState(false)

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        
        // Fetch both data in parallel
        const [weather, statsResponse] = await Promise.allSettled([
          fetchWeatherData(),
          dashboardApi.getHomeStats()
        ])

        // Handle weather data
        if (weather.status === 'fulfilled') {
          setWeatherData(weather.value)
        } else {
          console.warn('Weather data unavailable, using fallback')
        }

        // Handle population data
        if (statsResponse.status === 'fulfilled' && statsResponse.value.success && statsResponse.value.data) {
          const popData = statsResponse.value.data as { population: PopulationData }
          setPopulationData(popData.population)
        } else {
          console.warn('Population data unavailable')
        }

        setDataLoaded(true)
      } catch (error) {
        console.error('Error fetching home data:', error)
        setDataLoaded(true) // Still set to true to show fallback data
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    // Refresh data every 30 minutes
    const interval = setInterval(fetchData, 30 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // Count-up animations
  const tempCountUp = useCountUp({ end: weatherData.temp, duration: 2000, enabled: dataLoaded })
  const tempHighCountUp = useCountUp({ end: weatherData.tempHigh, duration: 2000, enabled: dataLoaded })
  const tempLowCountUp = useCountUp({ end: weatherData.tempLow, duration: 2000, enabled: dataLoaded })
  const humidityCountUp = useCountUp({ end: weatherData.humidity, duration: 2000, suffix: '%', enabled: dataLoaded })
  const rainfallCountUp = useCountUp({ end: weatherData.rainfall, duration: 2000, decimals: 1, enabled: dataLoaded })
  const pressureCountUp = useCountUp({ end: weatherData.pressure, duration: 2000, enabled: dataLoaded })
  const growthCountUp = useCountUp({ 
    end: populationData.growthRate, 
    duration: 2000, 
    decimals: 2, 
    prefix: populationData.growthRate >= 0 ? '+' : '', 
    suffix: '%',
    enabled: dataLoaded
  })
  const populationCountUp = useCountUp({
    end: populationData.total,
    duration: 2500,
    separator: '.',
    enabled: dataLoaded
  })

  // Intersection Observer
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
      <section className="relative bg-[url('/assets/images/bg-hero.png')] bg-cover bg-center min-h-screen w-full overflow-hidden -mt-[120px] pt-[140px]">
        <div className="container max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-screen flex items-end pb-10 sm:pb-16 lg:pb-20">
          {/* Responsive Layout: 
              Mobile/Tablet: flex-col-reverse (Hero Content on top, Weather Card on bottom)
              Desktop: flex-row (Weather Card left, Hero Content right) 
          */}
          <div className="flex flex-col-reverse lg:flex-row gap-6 w-full justify-between items-end lg:items-end">
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
                  <p className="text-black text-md opacity-90">{weatherData.location}</p>
                  <div className="flex justify-between items-start">
                    <div className="flex mt-5 justify-center items-center">
                      <span className="text-black text-2xl font-light">+</span>
                      <span ref={tempCountUp.ref} className="text-black text-3xl font-light">{tempCountUp.count}</span>
                      <span className="text-black text-2xl">°C</span>
                    </div>
                    <div className="text-black text-left my-auto">
                      {/* ✅ Changed from <p> to <span> with display block */}
                      <p className="text-sm">H: <span ref={tempHighCountUp.ref} className="inline">{tempHighCountUp.count}</span>°C</p>
                      <p className="text-sm">L: <span ref={tempLowCountUp.ref} className="inline">{tempLowCountUp.count}</span>°C</p>
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
                      {/* ✅ Changed from <p> to <span> with display block */}
                      <span ref={humidityCountUp.ref} className="text-sm font-medium block">{humidityCountUp.count}</span>
                    </div>
                    <div>
                      <p className="text-xs opacity-75">Curah Hujan</p>
                      {/* ✅ Changed to use inline span */}
                      <span className="text-sm font-medium block">
                        <span ref={rainfallCountUp.ref} className="inline">{rainfallCountUp.count}</span> mm
                      </span>
                    </div>
                    <div>
                      <p className="text-xs opacity-75">Tekanan Udara</p>
                      {/* ✅ Changed to use inline span */}
                      <span className="text-sm font-medium block">
                        <span ref={pressureCountUp.ref} className="inline">{pressureCountUp.count}</span> hPa
                      </span>
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
                    {/* ✅ Changed from <p> to <span> with display block */}
                    <span ref={populationCountUp.ref} className="text-2xl font-bold text-[#5B903A] block">{populationCountUp.count}</span>
                    <p className="text-xs text-gray-500">Total Warga Terdaftar</p>
                  </div>

                  <div className="relative mt-2">
                    {populationData.monthlyData.length > 0 ? (
                      <PopulationChart
                        data={populationData.monthlyData}
                        color="#5B903A"
                        height={100}
                      />
                    ) : (
                      <div className="h-[100px] flex items-center justify-center text-gray-400 text-xs">
                        Loading data...
                      </div>
                    )}
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
                className="mb-4 flex justify-center lg:justify-start"
                initial={{ opacity: 0, filter: 'blur(4px)' }}
                animate={{ opacity: 1, filter: 'blur(0px)' }}
                transition={{
                  delay: 0.5,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1]
                }}
              >
                <motion.span
                  className="inline-block bg-white/10 backdrop-blur-sm border border-white/15 text-white px-4 py-2 sm:px-5 sm:py-3 rounded-full text-xs sm:text-sm font-medium shadow-lg cursor-default"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    transition: { duration: 0.2 }
                  }}
                >
                  Pesona Alam Banyumas
                </motion.span>
              </motion.div>

              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-4 sm:mb-6 text-center lg:text-left">
                Baturaden, Harmoni<br />
                Alam dan Kehangatan
              </h1>

              <p className="text-[#A1A1A1] text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl opacity-90 leading-relaxed text-center lg:text-left mx-auto lg:mx-0">
                Tempat terbaik untuk liburan keluarga, melepas penat, dan menikmati keindahan
                Banyumas yang menenangkan.
              </p>

              <div className="flex justify-center lg:justify-start">
                <motion.button
                  onClick={() => scrollTo('statistik-section')}
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
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HeroSection