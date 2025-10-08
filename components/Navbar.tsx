'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

interface MenuItem {
  name: string
  path: string
}

interface NavbarProps {
  siteName?: string
  logoSrc?: string
  menuItems?: MenuItem[]
}

export default function Navbar({ 
  siteName = 'Baturraden',
  logoSrc = '/assets/icons/logo.png',
  menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Profile', path: '/profile' },
    { name: 'UMKM', path: '/umkm' },
    { name: 'Wisata', path: '/wisata' },
    { name: 'Lapor', path: '/lapor' }
  ]
}: NavbarProps) {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isActive = (path: string) => {
    return pathname === path
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className="navbar-container">
      <div className="navbar mt-3 rounded-full shadow-md bg-white px-4 md:px-6 py-2 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image src={logoSrc} alt="Logo" width={32} height={32} className="h-6 w-6 md:h-8 md:w-8" />
          <span className="font-semibold text-base md:text-lg text-[#5B903A]">{siteName}</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex flex-1 items-center justify-center">
          <ul className="flex gap-2 px-1">
            {menuItems.map((item) => (
              <li key={item.path} className="list-none">
                <Link
                  href={item.path}
                  className={`inline-block rounded-full px-4 py-2 font-medium transition-all duration-200 ${
                    isActive(item.path) 
                      ? 'border border-[#C0C0C0] text-[#5B903A] bg-transparent hover:text-[#5B903A] hover:bg-transparent' 
                      : 'text-[#6B7280] bg-transparent hover:text-[#5B903A] hover:bg-transparent'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button className="btn btn-ghost btn-sm text-sm rounded-full font-normal text-gray-600 hover:text-[#5B903A] transition-colors">
            Register
          </button>
          <button className="btn btn-primary btn-sm rounded-full py-5 pe-1 flex items-center gap-2 text-sm hover:opacity-90 transition-opacity">
            Login
            <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
              <Image src="/assets/icons/arrow.svg" alt="Login Icon" width={12} height={12} className="w-3" />
            </div>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="lg:hidden p-2 rounded-md text-gray-600 hover:text-[#5B903A] transition-colors"
        >
          {!isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="mobile-menu lg:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-white rounded-2xl shadow-lg overflow-hidden z-40 animate-slide-down">
          <ul className="py-2">
            {menuItems.map((item) => (
              <li key={item.path} className="border-b border-gray-100 last:border-b-0 list-none">
                <Link
                  href={item.path}
                  onClick={closeMobileMenu}
                  className={`block px-6 py-3 font-medium transition-all duration-200 ${
                    isActive(item.path) 
                      ? 'text-[#5B903A] bg-[#F0F7ED]' 
                      : 'text-[#6B7280] hover:text-[#5B903A] hover:bg-[#F9FAFB]'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Actions */}
          <div className="flex flex-col gap-2 p-4 border-t border-gray-100">
            <button className="btn btn-ghost btn-sm w-full rounded-full font-normal text-gray-600 hover:text-[#5B903A] hover:bg-amber-500 transition-colors">
              Register
            </button>
            <button className="btn btn-primary btn-sm w-full rounded-full py-3 flex items-center justify-center gap-2 text-sm hover:opacity-90 transition-opacity">
              Login
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <style jsx>{`
  .navbar-container {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    z-index: 50;
    width: 95%;
    max-width: 1400px;
    margin: 0 auto;
  }

  /* Responsive adjustments */
  @media (max-width: 1440px) {
    .navbar-container {
      width: 95%;
    }
  }

  @media (max-width: 1024px) {
    .navbar-container {
      width: 96%;
    }
  }

  @media (max-width: 768px) {
    .navbar-container {
      width: 90%;
    }
  }
      `}</style>
    </nav>
  )
}
