'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInViewStagger, useScrollParallax } from '@/lib/animation'

const VisiMisiSection = () => {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef<HTMLDivElement>(null)
    
    // Stagger animation for cards
    const { ref: cardsRef, isInView: cardsInView, containerVariants, itemVariants, animate } = useInViewStagger({
        staggerChildren: 0.2,
        once: true
    })
    
    // Parallax effect for image
    const { ref: imageRef, y: imageY } = useScrollParallax({ speed: 0.3 })

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
        <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
                    {/* Left Side - Visi & Misi Cards */}
                    <motion.div 
                        ref={cardsRef}
                        className="space-y-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate={animate}
                    >
                        {/* Visi Card */}
                        <motion.div 
                            className="bg-[#F5F5F5] rounded-3xl p-6 sm:p-8"
                            variants={itemVariants}
                            whileHover={{ 
                                y: -4, 
                                boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.2)',
                                transition: { duration: 0.3 }
                            }}
                        >
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4 sm:mb-6">VISI</h2>
                            <p className="text-gray-700 text-lg sm:text-xl lg:text-2xl leading-relaxed">
                                Terwujudnya Pemerintahan Kecamatan Baturraden yang Profesional, Bersih, Adil dan Inovatif untuk mewujudkan masyarakat Baturraden yang Sejahtera, Mandiri, dan Berdaya saing.
                            </p>
                        </motion.div>

                        {/* Misi Card */}
                        <motion.div 
                            className="bg-[#F5F5F5] rounded-3xl p-6 sm:p-8"
                            variants={itemVariants}
                            whileHover={{ 
                                y: -4, 
                                boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.2)',
                                transition: { duration: 0.3 }
                            }}
                        >
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4 sm:mb-6">MISI</h2>
                            <ul className="list-disc list-outside marker:text-black ms-6">
                                <li className="text-gray-700 text-lg sm:text-xl lg:text-2xl leading-relaxed">
                                    Meningkatkan Kualitas Sumber Daya Manusia Pemerintahan Kecamatan Baturraden menuju Aparatur yang profesional, kreatif, Inovatif dan Beretos kerja yang tinggi;
                                </li>
                                <li className="text-gray-700 text-2xl leading-relaxed">
                                    Meningkatkan Pelayanan Prima kepada Masyarakat secara Profesional, adil dan Transparan;
                                </li>
                                <li className="text-gray-700 text-2xl leading-relaxed">
                                    Meningkatkan pastisipasi di Desa dalam penyelenggaraan pemerintah, pembangunan dan Kemasyarakat;
                                </li>
                                <li className="text-gray-700 text-2xl leading-relaxed">
                                    Meningkatkan upaya peningkatan pendapatan asli daerah dengan penggalian potensi potendi lokasl unggulan khususunya disektor pariwisata yang didukung oleh sektor pertanian, perikanan dan peternakan.
                                </li>
                            </ul>
                        </motion.div>
                    </motion.div>

                    {/* Right Side - Image Card with Overlay Text */}
                    <motion.div 
                        ref={imageRef as any}
                        className="relative rounded-3xl overflow-hidden h-[500px] sm:h-[600px] lg:h-auto shadow-xl"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 40 }}
                        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] as any }}
                        whileHover={{ 
                            scale: 1.02, 
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.3)',
                            transition: { duration: 0.3 }
                        }}
                    >
                        <motion.div style={{ y: imageY }} className="w-full h-full">
                            <Image
                                src="/assets/images/desa-aerial.jpg"
                                alt="Desa Baturaden"
                                fill
                                className="object-cover"
                            />
                        </motion.div>

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                        {/* Content Overlay */}
                        <motion.div 
                            className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
                            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] as any }}
                        >
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-tight mb-3 sm:mb-4">
                                Kenal Lebih Dekat<br />dengan Desa Baturraden
                            </h2>
                            <p className="text-white/90 text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6 max-w-md leading-relaxed">
                                @mukaansejarah visi-misi dan potensi unggulan Desa Baturraden yang menjadi kebanggaan masyarakat Banyumas.
                            </p>

                            <Link href="/profile">
                                <motion.button 
                                    className="inline-flex items-center whitespace-nowrap bg-white/10 backdrop-blur-md text-white font-medium ps-4 pe-2 py-2 rounded-full gap-3 cursor-pointer will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent border border-white/20"
                                    style={{ boxShadow: '0 8px 20px -8px rgba(0, 0, 0, 0.3)' }}
                                    whileHover={{ 
                                        scale: 1.02,
                                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                        borderColor: 'rgba(255, 255, 255, 0.3)',
                                        boxShadow: '0 12px 24px -8px rgba(0, 0, 0, 0.4)',
                                        transition: { duration: 0.2 }
                                    }}
                                    whileTap={{ 
                                        scale: 0.98,
                                        y: 1,
                                        transition: { duration: 0.1 }
                                    }}
                                >
                                    <span className="shrink-0">Lihat Profil Desa</span>
                                    <motion.div 
                                        className="bg-[#5B903A] rounded-full w-12 h-12 flex items-center justify-center shrink-0"
                                        whileHover={{ rotate: 45, scale: 1.05 }}
                                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                    >
                                        <Image src="/assets/icons/arrow.svg" alt="Arrow" width={12} height={12} className="w-3 invert" />
                                    </motion.div>
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default VisiMisiSection
