'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useCountUp } from '@/hooks/useCountUp'
import { useState, useEffect } from 'react'
import { dashboardApi } from '@/lib/api'

interface UmkmWisataStatsData {
  umkm: {
    total: number
    thisYear: number
    growthRate: number
  }
  wisata: {
    total: number
    visitorsThisYear: number
    visitorGrowthRate: number
  }
}

const UmkmDanWisata = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation(0.1)
  const { ref: umkmRef, isVisible: umkmVisible } = useScrollAnimation(0.1)   
  const { ref: wisataRef, isVisible: wisataVisible } = useScrollAnimation(0.1)

  // State untuk data real-time
  const [statsData, setStatsData] = useState<UmkmWisataStatsData>({
    umkm: {
      total: 120,
      thisYear: 0,
      growthRate: 12
    },
    wisata: {
      total: 8,
      visitorsThisYear: 0,
      visitorGrowthRate: 20
    }
  })

  const [isLoading, setIsLoading] = useState(true)
  const [dataLoaded, setDataLoaded] = useState(false)

  // Fetch data real-time
  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true)
        
        const response = await dashboardApi.getUmkmWisataStats()
        
        if (response.success && response.data) {
          setStatsData(response.data as UmkmWisataStatsData)
          setDataLoaded(true)
        }
      } catch (error) {
        console.error('Error fetching UMKM & Wisata stats:', error)
        // Keep using fallback data if error
        setDataLoaded(true)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()

    // Refresh data every 5 minutes
    const interval = setInterval(fetchStats, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [])

  // Count-up animations with real data
  const umkmCountUp = useCountUp({ 
    end: statsData.umkm.total, 
    duration: 2500, 
    suffix: '+',
    enabled: dataLoaded 
  })
  
  const umkmGrowthCountUp = useCountUp({ 
    end: statsData.umkm.growthRate, 
    duration: 2000, 
    prefix: statsData.umkm.growthRate >= 0 ? '+' : '', 
    suffix: '%',
    enabled: dataLoaded 
  })
  
  const wisataCountUp = useCountUp({ 
    end: statsData.wisata.total, 
    duration: 2000,
    enabled: dataLoaded 
  })
  
  const wisataGrowthCountUp = useCountUp({ 
    end: statsData.wisata.visitorGrowthRate, 
    duration: 2000, 
    prefix: statsData.wisata.visitorGrowthRate >= 0 ? '+' : '', 
    suffix: '%',
    enabled: dataLoaded 
  })

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-[1400px] mx-auto w-full">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`flex flex-col lg:flex-row justify-between items-start gap-6 sm:gap-8 mb-12 sm:mb-16 animate-on-scroll ${
            headerVisible ? 'animate-fade-in-up' : ''
          }`}
        >
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 mb-2">
              UMKM dan Wisata<br />Baturaden
            </h2>
          </div>
          <div className="text-gray-500 max-w-sm">
            <p className="text-sm sm:text-base leading-relaxed">
              Mengenal lebih dekat keindahan alam dan produk lokal unggulan Baturaden, dari kuliner khas hingga destinasi wisata penuh pesona.
            </p>
          </div>
        </div>

        {/* UMKM Section - Top Row */}
        <div 
          ref={umkmRef}
          className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-6 sm:mb-8 w-full animate-on-scroll ${
            umkmVisible ? 'animate-fade-in-left animation-delay-200' : ''
          }`}
        >
          {/* UMKM Image - Left (Lebih lebar) */}
          <motion.div 
            className="lg:col-span-7 relative rounded-3xl overflow-hidden h-[400px] sm:h-[450px] lg:h-[500px] shadow-xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: umkmVisible ? 1 : 0, y: umkmVisible ? 0 : 40 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ 
              scale: 1.02, 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
              transition: { duration: 0.3 }
            }}
          >
            <Image
              src="/assets/images/umkm-showcase.png"
              alt="UMKM Baturaden"
              fill
              className="object-cover object-[center_30%]"
            />

            {/* UMKM Glass Badge */}
            <motion.div 
              className="absolute top-12 right-14 bg-gray-300/10 backdrop-blur-xs border border-gray-300/50 rounded-lg p-4 pt-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: umkmVisible ? 1 : 0, scale: umkmVisible ? 1 : 0.8 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Image className="mx-auto" src="/assets/icons/top-widget.svg" alt="" width={45} height={45} />
              <div className="flex items-center gap-2 my-2">
                <span className="text-md font-medium text-white">UMKM Aktif</span>
                <div className={`text-xs px-2 py-1 rounded-full flex items-center gap-2 ${
                  statsData.umkm.growthRate >= 0 
                    ? 'bg-white text-[#5B903A]' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  <Image 
                    src="/assets/icons/trend-up.svg" 
                    alt="Trend" 
                    width={12} 
                    height={12} 
                    className={`w-3 ${statsData.umkm.growthRate < 0 ? 'rotate-180' : ''}`}
                  />
                  <span ref={umkmGrowthCountUp.ref}>{umkmGrowthCountUp.count}</span>
                </div>
              </div>
              {/* ✅ Changed from <p> to <span> with display block */}
              <span ref={umkmCountUp.ref} className="text-5xl font-medium text-white mb-2 block">{umkmCountUp.count}</span>
              <p className="text-sm text-white">Terdaftar & aktif</p>
            </motion.div>
          </motion.div>

          {/* UMKM Content - Right (Lebih sempit) */}
          <motion.div 
            className="lg:col-span-5 bg-[#F5F5F5] rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between h-[400px] sm:h-[450px] lg:h-[500px]"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: umkmVisible ? 1 : 0, x: umkmVisible ? 0 : 40 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <div className="relative z-10">
              <p className="text-lg sm:text-xl lg:text-[28px] font-medium text-gray-900 leading-snug mb-4">
                Dari tangan kreatif warga Baturaden lahir produk unggulan yang penuh nilai budaya dan kualitas. Temukan beragam kuliner khas, kerajinan, hingga inovasi lokal yang siap menemani aktivitas Anda. Mari dukung UMKM desa dan tumbuh bersama!
              </p>
            </div>

            {/* Button - Mepet Bawah */}
            <div className="relative z-10">
              <Link href="/umkm">
                <motion.button 
                  className="inline-flex items-center whitespace-nowrap bg-gradient-to-r from-[#5B903A] to-[#4a7a2f] text-white font-medium ps-4 pe-2 py-2 rounded-full gap-3 cursor-pointer will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] focus-visible:ring-offset-2"
                  style={{ boxShadow: '0 8px 20px -8px rgba(91, 144, 58, 0.5)' }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 12px 24px -8px rgba(91, 144, 58, 0.6)',
                    filter: 'brightness(1.05)',
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    y: 1,
                    transition: { duration: 0.1 }
                  }}
                >
                  <span className="shrink-0">Belanja Sekarang</span>
                  <motion.div 
                    className="bg-white rounded-full w-12 h-12 flex items-center justify-center shrink-0"
                    whileHover={{ rotate: 45, scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Image src="/assets/icons/arrow.svg" alt="Arrow" width={12} height={12} className="w-3" />
                  </motion.div>
                </motion.button>
              </Link>
            </div>

            {/* Decorative Icon Box - Bottom Right (Hidden on mobile & tablet) */}
            <div className="absolute -right-6 top-3/4 -translate-y-1/2 w-[300px] h-[300px] hidden xl:block">
              <div className="grid grid-cols-3 grid-rows-3 gap-3 w-full h-full">
                {/* Row 1 */}
                <div className="bg-gradient-to-br from-50% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>
                <div className="bg-gradient-to-b from-20% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>
                <div className="bg-gradient-to-bl from-50% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>

                {/* Row 2 - Center main card */}
                <div className="bg-gradient-to-r from-40% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>
                <div className="bg-[#91B57B] rounded-lg flex items-center justify-center shadow-2xl relative z-20 scale-110">
                  <div className="bg-[#5B903A] p-3 rounded-lg">
                    <Image
                      src="/assets/icons/cube.svg"
                      alt="Cube Icon"
                      width={52}
                      height={52}
                      className="w-13 h-13"
                    />
                  </div>
                </div>
                <div className="bg-gradient-to-l from-30% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>

                {/* Row 3 */}
                <div className="bg-gradient-to-tr from-50% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>
                <div className="bg-gradient-to-t from-20% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>
                <div className="bg-gradient-to-tl from-50% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Wisata Section - Bottom Row */}
        <div 
          ref={wisataRef}
          className={`grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 animate-on-scroll ${
            wisataVisible ? 'animate-fade-in-right animation-delay-400' : ''
          }`}
        >
          {/* Wisata Content - Left (Lebih sempit) */}
          <div className="order-2 lg:order-1 lg:col-span-5 bg-[#f5f5f5] rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col justify-between h-[400px] sm:h-[450px] lg:h-[500px]">
            <div className="relative z-10">
              <h3 className="text-2xl sm:text-3xl font-semibold text-gray-900 leading-snug mb-4">
                Nikmati keindahan alam, kesejukan udara pegunungan, dan keramahan warga.
              </h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                Dari air terjun menawan, pemandian air panas, hingga panorama hijau yang memanjakan, Baturaden selalu punya cerita indah untuk setiap pengunjung.
              </p>
            </div>

            {/* Button - Mepet Kanan Bawah */}
            <div className="relative z-10 flex justify-end">
              <Link href="/wisata">
                <motion.button 
                  className="inline-flex items-center whitespace-nowrap bg-gradient-to-r from-[#5B903A] to-[#4a7a2f] text-white font-medium ps-4 pe-2 py-2 rounded-full gap-3 cursor-pointer will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] focus-visible:ring-offset-2"
                  style={{ boxShadow: '0 8px 20px -8px rgba(91, 144, 58, 0.5)' }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 12px 24px -8px rgba(91, 144, 58, 0.6)',
                    filter: 'brightness(1.05)',
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    y: 1,
                    transition: { duration: 0.1 }
                  }}
                >
                  <span className="shrink-0">Jelajahi Sekarang</span>
                  <motion.div 
                    className="bg-white rounded-full w-12 h-12 flex items-center justify-center shrink-0"
                    whileHover={{ rotate: 45, scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <Image src="/assets/icons/arrow.svg" alt="Arrow" width={12} height={12} className="w-3" />
                  </motion.div>
                </motion.button>
              </Link>
            </div>

            {/* Decorative Icon Box - Bottom Left (Hidden on mobile & tablet) */}
            <div className="absolute -left-2 top-3/4 -translate-y-1/2 w-[300px] h-[300px] hidden xl:block">
              <div className="grid grid-cols-3 grid-rows-3 gap-3 w-full h-full">
                {/* Row 1 */}
                <div className="bg-gradient-to-br from-50% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>
                <div className="bg-gradient-to-b from-20% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>
                <div className="bg-gradient-to-bl from-50% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>

                {/* Row 2 - Center main card */}
                <div className="bg-gradient-to-r from-40% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>
                <div className="bg-[#91B57B] rounded-lg flex items-center justify-center shadow-2xl relative z-20 scale-110">
                  <div className="bg-[#5B903A] p-3 rounded-lg">
                    <Image
                      src="/assets/icons/mountain.svg"
                      alt="Mountain Icon"
                      width={52}
                      height={52}
                      className="w-13 h-13"
                    />
                  </div>
                </div>
                <div className="bg-gradient-to-l from-30% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>

                {/* Row 3 */}
                <div className="bg-gradient-to-tr from-50% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>
                <div className="bg-gradient-to-t from-20% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>
                <div className="bg-gradient-to-tl from-50% to-100% from-[#F5F5F5] to-[#CCDDC2] rounded-lg"></div>
              </div>
            </div>
          </div>

          {/* Wisata Image - Right (Lebih lebar) */}
          <motion.div 
            className="order-1 lg:order-2 lg:col-span-7 relative rounded-3xl overflow-hidden h-[500px] shadow-xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: wisataVisible ? 1 : 0, y: wisataVisible ? 0 : 40 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ 
              scale: 1.02, 
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
              transition: { duration: 0.3 }
            }}
          >
            <Image
              src="/assets/images/wisata-showcase.jpg"
              alt="Wisata Baturaden"
              fill
              className="object-cover"
            />

            {/* Wisata Glass Badge */}
            <motion.div 
              className="absolute top-8 left-8 bg-gray-300/10 backdrop-blur-xs border border-gray-300/50 rounded-lg p-4 pt-2"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: wisataVisible ? 1 : 0, 
                scale: wisataVisible ? 1 : 0.8 
              }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <Image className="mx-auto" src="/assets/icons/top-widget.svg" alt="" width={45} height={45} />
              <div className="flex items-center gap-2 my-2">
                <span className="text-md font-medium text-white">Destinasi</span>
                <div className={`text-xs px-2 py-1 rounded-full flex items-center gap-2 ${
                  statsData.wisata.visitorGrowthRate >= 0 
                    ? 'bg-white text-[#5B903A]' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  <Image 
                    src="/assets/icons/trend-up.svg" 
                    alt="Trend" 
                    width={12} 
                    height={12} 
                    className={`w-3 ${statsData.wisata.visitorGrowthRate < 0 ? 'rotate-180' : ''}`}
                  />
                  <span ref={wisataGrowthCountUp.ref}>{wisataGrowthCountUp.count}</span>
                </div>
              </div>
              {/* ✅ Changed from <p> to <span> with display block */}
              <span ref={wisataCountUp.ref} className="text-5xl font-medium text-white mb-2 block">{wisataCountUp.count}</span>
              <p className="text-sm text-white">Destinasi tersedia</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default UmkmDanWisata
