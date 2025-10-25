'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef, memo } from 'react'

const Footer = memo(function Footer() {
    const [isVisible, setIsVisible] = useState(false)
    const footerRef = useRef<HTMLElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting)
            },
            { threshold: 0.1 }
        )

        if (footerRef.current) {
            observer.observe(footerRef.current)
        }

        return () => {
            if (footerRef.current) {
                observer.unobserve(footerRef.current)
            }
        }
    }, [])

    return (
        <footer ref={footerRef} className="bg-[#F5F5F5] py-12 sm:py-16 pb-3 px-4 sm:px-6 lg:px-8">
            <div className="max-w-[1400px] mx-auto">
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 mb-8 sm:mb-12 animate-on-scroll ${isVisible ? 'animate-fade-in-up' : ''}`}>
                    {/* Brand Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <Image
                                src="/assets/icons/logo.png"
                                alt="Baturaden Logo"
                                width={48}
                                height={48}
                                className="w-12 h-12"
                            />
                            <h3 className="text-2xl font-bold text-gray-900">Batturaden</h3>
                        </div>
                        <p className="text-gray-600 text-base leading-relaxed">
                            Bergabunglah dengan kami untuk mendapatkan informasi terkini seputar wisata, UMKM lokal, pembangunan desa, dan layanan masyarakat Baturaden.
                        </p>
                        {/* Social Media Icons */}
                        <div className="flex gap-4 pt-2">
                            <Link
                                href="https://www.instagram.com/kecamatan_baturraden/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer"
                                aria-label="Instagram"
                            >
                                <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </Link>
                            <Link
                                href="https://www.facebook.com/groups/seputarbaturaden/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer"
                                aria-label="Facebook"
                            >
                                <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </Link>
                            <Link
                                href="https://twitter.com/banyumaskab"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer"
                                aria-label="Twitter"
                            >
                                <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </Link>
                            <Link
                                href="https://www.youtube.com/@BanyumasKab"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 flex items-center justify-center transition-all duration-300 shadow-sm cursor-pointer"
                                aria-label="YouTube"
                            >
                                <svg className="w-5 h-5 text-gray-900" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Jelajahi Lebih Lanjut */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Jelajahi Lebih Lanjut:</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/profile" className="text-gray-600 hover:text-gray-900 transition-colors duration-300 cursor-pointer">
                                    Profil Desa
                                </Link>
                            </li>
                            <li>
                                <Link href="/umkm" className="text-gray-600 hover:text-gray-900 transition-colors duration-300 cursor-pointer">
                                    UMKM
                                </Link>
                            </li>
                            <li>
                                <Link href="/wisata" className="text-gray-600 hover:text-gray-900 transition-colors duration-300 cursor-pointer">
                                    Wisata
                                </Link>
                            </li>
                            <li>
                                <Link href="/pembangunan" className="text-gray-600 hover:text-gray-900 transition-colors duration-300 cursor-pointer">
                                    Pembangunan
                                </Link>
                            </li>
                            <li>
                                <Link href="/laporan" className="text-gray-600 hover:text-gray-900 transition-colors duration-300 cursor-pointer">
                                    Laporan
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Kontak - Empty Column for spacing */}
                    <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-4">Kontak</h4>
                        {/* Empty space for layout balance */}
                        {/* Contact Information */}
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <div className="w-5 h-5 mt-1 flex-shrink-0">
                                    <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <p className="text-gray-600 text-base">
                                    Kantor Desa Baturaden, Banyumas, Jawa Tengah
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 flex-shrink-0">
                                    <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                </div>
                                <p className="text-gray-600 text-base">(0281) 681240</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="w-5 h-5 flex-shrink-0">
                                    <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <p className="text-gray-600 text-base">info@desabaturaden.id</p>
                            </div>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="pt-8">
                    <div className="flex flex-col md:flex-row justify-center items-center gap-2">
                        <div className="flex items-center gap-1 text-gray-600 text-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span>Kantor Desa Baturaden, Banyumas, Jawa Tengah</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
})

export default Footer
