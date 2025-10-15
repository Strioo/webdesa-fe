'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

const VisiMisiSection = () => {
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
        <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-[1400px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
                    {/* Left Side - Visi & Misi Cards */}
                    <div className={`space-y-6 animate-on-scroll ${isVisible ? 'animate-fade-in-left' : ''}`}>
                        {/* Visi Card */}
                        <div className="bg-[#F5F5F5] rounded-3xl p-6 sm:p-8">
                            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-gray-900 mb-4 sm:mb-6">VISI</h2>
                            <p className="text-gray-700 text-lg sm:text-xl lg:text-2xl leading-relaxed">
                                Terwujudnya Pemerintahan Kecamatan Baturraden yang Profesional, Bersih, Adil dan Inovatif untuk mewujudkan masyarakat Baturraden yang Sejahtera, Mandiri, dan Berdaya saing.
                            </p>
                        </div>

                        {/* Misi Card */}
                        <div className="bg-[#F5F5F5] rounded-3xl p-6 sm:p-8">
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
                        </div>
                    </div>

                    {/* Right Side - Image Card with Overlay Text */}
                    <div className={`relative rounded-3xl overflow-hidden h-[500px] sm:h-[600px] lg:h-auto shadow-xl animate-on-scroll ${isVisible ? 'animate-fade-in-right animation-delay-200' : ''}`}>
                        <Image
                            src="/assets/images/desa-aerial.jpg"
                            alt="Desa Baturaden"
                            fill
                            className="object-cover"
                        />

                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                        {/* Content Overlay */}
                        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-tight mb-3 sm:mb-4">
                                Kenal Lebih Dekat<br />dengan Desa Baturraden
                            </h2>
                            <p className="text-white/90 text-lg sm:text-xl lg:text-2xl mb-4 sm:mb-6 max-w-md leading-relaxed">
                                @mukaansejarah visi-misi dan potensi unggulan Desa Baturraden yang menjadi kebanggaan masyarakat Banyumas.
                            </p>

                            <Link href="/profile" className="cursor-pointer">
                                <button className="bg-white hover:bg-gray-100 text-gray-900 font-medium ps-4 pe-2 py-2 rounded-full flex items-center gap-3 transition-all duration-300 hover:gap-5 shadow-lg cursor-pointer">
                                    Lihat Profil Desa
                                    <div className="bg-[#5B903A] rounded-full w-12 h-12 flex items-center justify-center">
                                        <Image src="/assets/icons/arrow.svg" alt="Arrow" width={12} height={12} className="w-3 invert" />
                                    </div>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default VisiMisiSection
