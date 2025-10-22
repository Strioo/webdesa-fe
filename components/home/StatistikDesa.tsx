'use client'

import React from 'react'
import PopulationChart from '@/components/ui/PopulationChart'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useCountUp } from '@/hooks/useCountUp'
import { useInViewStagger } from '@/lib/animation'

const StatistikDesa = () => {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)

    // Stagger animations for cards
    const { ref: cardsRef, animate, containerVariants, itemVariants } = useInViewStagger({
        staggerChildren: 0.2,
        once: true,
        amount: 0.2
    })

    // Count-up animations
    const destinationCountUp = useCountUp({ end: 20, duration: 2000 })
    const umkmCountUp = useCountUp({ end: 150, duration: 2000, suffix: '+' })
    const touristCountUp = useCountUp({ end: 50000, duration: 2500, separator: '.' })

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

    // Dataset showcase dengan variasi naik-turun jelas (12 bulan penuh)
    const [populationData] = useState([
        { month: 'Jan', value: 7200, date: '2024-01-01' },
        { month: 'Feb', value: 7850, date: '2024-02-01' },
        { month: 'Mar', value: 7450, date: '2024-03-01' },
        { month: 'Apr', value: 8300, date: '2024-04-01' },
        { month: 'May', value: 7900, date: '2024-05-01' },
        { month: 'Jun', value: 8650, date: '2024-06-01' },
        { month: 'Jul', value: 8200, date: '2024-07-01' },
        { month: 'Aug', value: 9100, date: '2024-08-01' },
        { month: 'Sep', value: 8500, date: '2024-09-01' },
        { month: 'Oct', value: 9400, date: '2024-10-01' },
        { month: 'Nov', value: 8800, date: '2024-11-01' },
        { month: 'Dec', value: 9650, date: '2024-12-01' }
    ])

    // Data tahunan dengan pola pertumbuhan bertahap (6 tahun)
    const [yearlyPopulationData] = useState([
        { year: '2020', value: 6500, date: '2020-01-01' },
        { year: '2021', value: 7100, date: '2021-01-01' },
        { year: '2022', value: 7600, date: '2022-01-01' },
        { year: '2023', value: 8200, date: '2023-01-01' },
        { year: '2024', value: 8700, date: '2024-01-01' },
        { year: '2025', value: 9200, date: '2025-01-01' }
    ])

    const [timeRange, setTimeRange] = useState('3months')

    // Dataset per periode dengan pola showcase lebih dramatis
    const get3MonthsData = () => [
        { month: 'Okt', value: 9400, date: '2024-10-01' },
        { month: 'Nov', value: 8800, date: '2024-11-01' },
        { month: 'Des', value: 9650, date: '2024-12-01' },
    ]

    const get6MonthsData = () => [
        { month: 'Jul', value: 8200, date: '2024-07-01' },
        { month: 'Agu', value: 9100, date: '2024-08-01' },
        { month: 'Sep', value: 8500, date: '2024-09-01' },
        { month: 'Okt', value: 9400, date: '2024-10-01' },
        { month: 'Nov', value: 8800, date: '2024-11-01' },
        { month: 'Des', value: 9650, date: '2024-12-01' },
    ]

    const get1YearData = () => populationData

    const getCurrentData = () => {
        switch (timeRange) {
            case '3months':
                return get3MonthsData()
            case '6months':
                return get6MonthsData()
            case '1year':
                return get1YearData()
            default:
                return get3MonthsData()
        }
    }

    return (
        <div ref={sectionRef}>
            <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
                <div className="max-w-[1400px] mx-auto">
                    {/* Header Section */}
                    <div className={`flex flex-col lg:flex-row justify-between items-start gap-6 sm:gap-8 mb-8 sm:mb-12 animate-on-scroll ${isVisible ? 'animate-fade-in-up' : ''}`}>
                        <div>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-2">
                                Statistik Desa<br />Baturaden
                            </h1>
                        </div>
                        <div className="text-gray-500 max-w-xs">
                            <p className='text-sm sm:text-base lg:text-lg'>Sekilas data desa untuk melihat potensi, perkembangan, dan daya tarik Baturaden.</p>
                        </div>
                    </div>

                    {/* Stats Grid - Wisata & UMKM Cards */}
                    <motion.div 
                        ref={cardsRef}
                        variants={containerVariants}
                        initial="hidden"
                        animate={animate}
                        className="flex flex-col lg:flex-row gap-4 sm:gap-6 mb-4 sm:mb-6"
                    >
                        {/* Wisata Card */}
                        <motion.div 
                            variants={itemVariants}
                            className="card bg-[#F5F5F5] border-2 border-gray-300 rounded-3xl w-full lg:w-2/5 overflow-hidden relative"
                            whileHover={{ 
                                y: -4, 
                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                                transition: { duration: 0.2 }
                            }}
                        >
                            <div className="card-body p-6 sm:p-8">
                                <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6">
                                    {/* Left Content */}
                                    <div className="flex-1 relative z-10">
                                        <div className="inline-block border-[#CCDDC2] bg-white text-[#5B903A] text-xs sm:text-sm font-medium px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-4 border">
                                            Wisata
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2 sm:mb-3 leading-tight">
                                            <span ref={destinationCountUp.ref}>{destinationCountUp.count}</span> Destinasi<br />Alam & Budaya
                                        </h2>
                                        <p className="text-xs sm:text-sm max-w-[200px] text-gray-500 leading-relaxed">
                                            Menikmati keindahan pegunungan, air terjun, dan budaya khas Baturaden.
                                        </p>
                                    </div>

                                    {/* Right Grid - 3x3 with consistent gradient pattern */}
                                    <div className="absolute -right-6 top-1/2 -translate-y-1/2 w-[300px] h-[300px]">
                                        <div className="grid grid-cols-3 grid-rows-3 gap-3 w-full h-full">
                                            {/* Row 1 - Subtle gradient pattern */}
                                            <div className="bg-gradient-to-br from-[#F5F5F5] via-[#E8F0E1]/60 to-[#CCDDC2]/80 rounded-lg"></div>
                                            <div className="bg-gradient-to-b from-[#F5F5F5] via-[#E8F0E1]/60 to-[#CCDDC2]/80 rounded-lg"></div>
                                            <div className="bg-gradient-to-bl from-[#F5F5F5] via-[#E8F0E1]/60 to-[#CCDDC2]/80 rounded-lg"></div>

                                            {/* Row 2 - Center main card with consistent gradient */}
                                            <div className="bg-gradient-to-r from-[#F5F5F5] via-[#E8F0E1]/60 to-[#CCDDC2]/80 rounded-lg"></div>
                                            <motion.div 
                                                className="bg-gradient-to-br from-[#91B57B] to-[#7A9C68] rounded-lg flex items-center justify-center shadow-2xl relative z-20 scale-110"
                                                initial={{ scale: 1 }}
                                                animate={{ scale: [1, 1.05, 1] }}
                                                transition={{ 
                                                    duration: 2, 
                                                    repeat: Infinity, 
                                                    ease: "easeInOut" 
                                                }}
                                            >
                                                <div className="bg-[#5B903A] p-3 rounded-lg">
                                                    <Image
                                                        src="/assets/images/statistik-wisata.png"
                                                        alt="Tourism Icon"
                                                        width={52}
                                                        height={52}
                                                        className="w-13 h-13"
                                                    />
                                                </div>
                                            </motion.div>
                                            <div className="bg-gradient-to-l from-[#F5F5F5] via-[#E8F0E1]/60 to-[#CCDDC2]/80 rounded-lg"></div>

                                            {/* Row 3 - Consistent gradient */}
                                            <div className="bg-gradient-to-tr from-[#F5F5F5] via-[#E8F0E1]/60 to-[#CCDDC2]/80 rounded-lg"></div>
                                            <div className="bg-gradient-to-t from-[#F5F5F5] via-[#E8F0E1]/60 to-[#CCDDC2]/80 rounded-lg"></div>
                                            <div className="bg-gradient-to-tl from-[#F5F5F5] via-[#E8F0E1]/60 to-[#CCDDC2]/80 rounded-lg"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* UMKM Card */}
                        <motion.div 
                            variants={itemVariants}
                            className="card w-full lg:w-3/5 bg-[#F5F5F5] border-2 border-gray-300 rounded-3xl overflow-hidden relative shadow-sm"
                            whileHover={{ 
                                y: -4, 
                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                                transition: { duration: 0.2 }
                            }}
                        >
                            <div className="card-body p-6 sm:p-8 lg:p-10">
                                <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6">
                                    {/* Left Content */}
                                    <div className="flex-1 relative z-10">
                                        <div className="inline-block bg-white text-[#5B903A] text-xs sm:text-sm font-medium px-3 sm:px-4 py-1 sm:py-1.5 rounded-full mb-3 sm:mb-4 border border-[#CCDDC2]">
                                            UMKM
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-2 sm:mb-3 leading-tight">
                                            <span ref={umkmCountUp.ref}>{umkmCountUp.count}</span> Usaha Lokal
                                        </h2>
                                        <p className="text-sm sm:text-md max-w-[180px] text-gray-500 leading-relaxed">
                                            Dukung produk asli desa, dari kerajinan tangan hingga kuliner khas.
                                        </p>
                                    </div>

                                    {/* Right Grid - 3 rows with consistent gradient pattern */}
                                    <div className="absolute -right-2 -top-16 w-[360px] h-[400px]">
                                        <div className="grid grid-rows-3 gap-6 w-full h-full">
                                            {/* Top Row - subtle gradient (terpotong atas) */}
                                            <div className="bg-gradient-to-l from-[#F5F5F5] via-[#E8F0E1]/60 to-[#CCDDC2]/80 rounded-lg flex items-center gap-3 px-6">
                                                {/* Icon box placeholder */}
                                                <div className="w-16 h-16 bg-gradient-to-br from-[#B8DDA4] to-[#91B57B]/80 rounded-lg flex-shrink-0"></div>

                                                {/* Horizontal bars with consistent gradient */}
                                                <div className="flex-1 flex flex-col gap-2">
                                                    <div className="bg-gradient-to-l from-[#F5F5F5] via-[#D5E5CC]/70 to-[#B4CCA4]/80 h-4 rounded-md"></div>
                                                    <div className="bg-gradient-to-l from-[#F5F5F5] via-[#D5E5CC]/70 to-[#B4CCA4]/80 h-4 rounded-md"></div>
                                                    <div className="bg-gradient-to-l from-[#F5F5F5] via-[#D5E5CC]/70 to-[#B4CCA4]/80 h-4 rounded-md"></div>
                                                </div>
                                            </div>

                                            {/* Middle Row - Main card with icon and consistent gradient */}
                                            <div className="bg-gradient-to-l from-[#F5F5F5] via-[#E8F0E1]/60 to-[#CCDDC2]/80 rounded-lg flex items-center gap-3 px-6 relative z-20 scale-115 shadow-lg">
                                                {/* Icon Box with subtle gradient */}
                                                <motion.div 
                                                    className="rounded-lg bg-gradient-to-br from-[#91B57B] to-[#7A9C68] p-2 flex-shrink-0"
                                                    initial={{ scale: 1 }}
                                                    animate={{ scale: [1, 1.05, 1] }}
                                                    transition={{ 
                                                        duration: 2, 
                                                        repeat: Infinity, 
                                                        ease: "easeInOut" 
                                                    }}
                                                >
                                                    <div className="bg-[#5B903A] p-3 rounded-lg">
                                                        <Image
                                                            src="/assets/images/statistik-umkm.png"
                                                            alt="UMKM Icon"
                                                            width={44}
                                                            height={44}
                                                            className="w-11 h-11"
                                                        />
                                                    </div>
                                                </motion.div>

                                                {/* Horizontal bars with consistent gradient */}
                                                <div className="flex-1 flex flex-col gap-2">
                                                    <div className="bg-gradient-to-l from-[#F5F5F5] via-[#D5E5CC]/70 to-[#B4CCA4]/80 h-4 rounded-md"></div>
                                                    <div className="bg-gradient-to-l from-[#F5F5F5] via-[#D5E5CC]/70 to-[#B4CCA4]/80 h-4 rounded-md"></div>
                                                    <div className="bg-gradient-to-l from-[#F5F5F5] via-[#D5E5CC]/70 to-[#B4CCA4]/80 h-4 rounded-md"></div>
                                                </div>
                                            </div>

                                            {/* Bottom Row - consistent gradient (terpotong bawah) */}
                                            <div className="bg-gradient-to-l from-[#F5F5F5] via-[#E8F0E1]/60 to-[#CCDDC2]/80 rounded-lg flex items-center gap-3 px-6">
                                                {/* Icon box placeholder */}
                                                <div className="w-16 h-16 bg-gradient-to-br from-[#B8DDA4] to-[#91B57B]/80 rounded-lg flex-shrink-0"></div>

                                                {/* Horizontal bars with consistent gradient */}
                                                <div className="flex-1 flex flex-col gap-2">
                                                    <div className="bg-gradient-to-l from-[#F5F5F5] via-[#D5E5CC]/70 to-[#B4CCA4]/80 h-4 rounded-md"></div>
                                                    <div className="bg-gradient-to-l from-[#F5F5F5] via-[#D5E5CC]/70 to-[#B4CCA4]/80 h-4 rounded-md"></div>
                                                    <div className="bg-gradient-to-l from-[#F5F5F5] via-[#D5E5CC]/70 to-[#B4CCA4]/80 h-4 rounded-md"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Bottom Section - Population Chart & Tourism Stats */}
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="flex flex-col lg:flex-row gap-4 sm:gap-6"
                    >
                        {/* Population Growth Chart */}
                        <motion.div 
                            className="card w-full lg:w-3/5 border-2 bg-[#F5F5F5] border-gray-300 rounded-3xl shadow-sm will-change-transform cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] focus-visible:ring-offset-2"
                            whileHover={{ 
                                y: -4, 
                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                                transition: { duration: 0.2 }
                            }}
                            tabIndex={0}
                            role="button"
                            aria-label="Population Growth Statistics"
                        >
                            <div className="card-body p-6 sm:p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="text-2xl font-semibold text-gray-900 leading-tight">
                                        Pertumbuhan<br />Penduduk
                                    </h3>

                                    {/* Time Range Filter */}
                                    <div className="dropdown dropdown-end">
                                        <label
                                            tabIndex={0}
                                            className="btn btn-sm bg-[#5B903A] hover:bg-[#4a7a2f] text-white border-none rounded-full gap-2 px-4 normal-case font-normal"
                                        >
                                            {timeRange === '3months' && 'Last 3 Months'}
                                            {timeRange === '6months' && 'Last 6 Months'}
                                            {timeRange === '1year' && 'Last 1 Year'}
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </label>
                                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow-lg bg-white rounded-2xl w-48 mt-2 border border-gray-100">
                                            <li>
                                                <a
                                                    onClick={() => setTimeRange('3months')}
                                                    className={`rounded-lg cursor-pointer ${timeRange === '3months' ? 'bg-[#5B903A]/10 text-[#5B903A]' : ''}`}
                                                >
                                                    Last 3 Months
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    onClick={() => setTimeRange('6months')}
                                                    className={`rounded-lg cursor-pointer ${timeRange === '6months' ? 'bg-[#5B903A]/10 text-[#5B903A]' : ''}`}
                                                >
                                                    Last 6 Months
                                                </a>
                                            </li>
                                            <li>
                                                <a
                                                    onClick={() => setTimeRange('1year')}
                                                    className={`rounded-lg cursor-pointer ${timeRange === '1year' ? 'bg-[#5B903A]/10 text-[#5B903A]' : ''}`}
                                                >
                                                    Last 1 Year
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                {/* Area Chart */}
                                <div className="relative -mx-2">
                                    <PopulationChart
                                        data={getCurrentData()}
                                        color="#5B903A"
                                        showGrid={true}
                                        height={200}
                                    />

                                </div>
                            </div>
                        </motion.div>

                        {/* Tourism Stats Card - UPDATED */}
                        <motion.div 
                            className="card w-full lg:w-2/5 bg-[#F5F5F5] border-2 border-gray-300 rounded-3xl shadow-sm overflow-hidden relative will-change-transform cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] focus-visible:ring-offset-2"
                            whileHover={{ 
                                y: -4, 
                                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                                transition: { duration: 0.2 }
                            }}
                            tabIndex={0}
                            role="button"
                            aria-label="Tourism Statistics"
                        >
                            <div className="card-body p-6 sm:p-8 lg:p-10">
                                {/* Decorative cards grid - with consistent gradient (di atas) */}
                                <div className="absolute -right-4 -top-24 left-6 w-[90%] h-max">
                                    <div className="grid grid-rows-2 gap-3 w-full h-full bg-gradient-to-br from-[#CCDDC2] to-[#B8D4A8]/80 border-2 border-[#C0C0C0] px-2 py-5 rounded-xl">
                                        {/* Top Row - Large card with subtle gradient (terpotong atas) */}
                                        <div className="bg-gradient-to-b from-[#F5F5F5] via-[#E8F0E1]/60 to-[#F5F5F5]/40 rounded-2xl flex gap-3 px-4 py-3">
                                            {/* Icon Box placeholder */}
                                            <div className="w-23 h-23 bg-gradient-to-br from-[#91B57B] to-[#7A9C68]/60 rounded-xl flex items-center justify-center flex-shrink-0">
                                                <div className="bg-[#5B903A] p-3 rounded-lg">

                                                </div>
                                            </div>

                                            {/* Gradient bars with consistent pattern */}
                                            <div className="flex-1 flex flex-col gap-2">
                                                <div className="bg-gradient-to-b from-[#91B57B] via-[#A4BF8E]/70 to-[#F5F5F5]/50 h-10 rounded-lg"></div>
                                                <div className="bg-gradient-to-b from-[#91B57B] via-[#A4BF8E]/70 to-[#F5F5F5]/50 h-10 rounded-lg"></div>
                                            </div>
                                        </div>

                                        {/* Bottom Row - Main card with icon */}
                                        <div className="bg-gradient-to-br from-[#B4CCA4] to-[#A4BC94] rounded-2xl flex gap-3 px-4 py-3">
                                            {/* Icon Box with consistent gradient */}
                                            <div className="w-23 h-23 bg-gradient-to-br from-[#91B57B] to-[#7A9C68] rounded-xl flex items-center justify-center flex-shrink-0">
                                                <div className="bg-[#5B903A] p-3 rounded-lg">
                                                    <Image
                                                        src="/assets/images/statistik-wisatawan.png"
                                                        alt="Tourism Icon"
                                                        width={40}
                                                        height={40}
                                                        className="w-13 h-13"
                                                    />
                                                </div>
                                            </div>

                                            {/* Gradient bars with consistent pattern */}
                                            <div className="flex-1 flex flex-col gap-2">
                                                <div className="bg-gradient-to-r from-[#91B57B] via-[#A4BF8E]/80 to-[#B4CCA4]/60 h-10 rounded-lg"></div>
                                                <div className="bg-gradient-to-r from-[#91B57B] via-[#A4BF8E]/80 to-[#B4CCA4]/60 h-10 rounded-lg"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content Section (di bawah) - mepet ke bawah */}
                                <div className="relative z-10 mt-auto">
                                    <div className="flex justify-between items-start gap-6">
                                        <div className="flex-1">
                                            <h2 ref={touristCountUp.ref} className="text-4xl font-bold text-gray-900 mb-0 leading-tight">
                                                {touristCountUp.count}+
                                            </h2>
                                            <p className="text-2xl font-semibold text-gray-900">
                                                Wisatawan/Tahun
                                            </p>
                                        </div>
                                        <p className="text-sm text-gray-600 leading-relaxed max-w-[180px]">
                                            Baturaden selalu jadi tujuan favorit untuk liburan dan rekreasi keluarga.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default StatistikDesa