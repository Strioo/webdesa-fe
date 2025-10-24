'use client'

import { useState, useEffect, useRef, memo } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/lib/auth'

interface MenuItem {
  name: string
  path: string
}

interface NavbarProps {
  siteName?: string
  logoSrc?: string
  menuItems?: MenuItem[]
}

const Navbar = memo(function Navbar({ 
  siteName = 'Baturraden',
  logoSrc = '/assets/icons/logo.png',
  menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Profile', path: '/profile' },
    { name: 'UMKM', path: '/umkm' },
    { name: 'Wisata', path: '/wisata' },
    { name: 'Pembangunan', path: '/pembangunan' },
    { name: 'Lapor', path: '/lapor' }
  ]
}: NavbarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const userMenuRef = useRef<HTMLDivElement>(null)
  const userMenuButtonRef = useRef<HTMLButtonElement>(null)
  
  // Close menu on route change
  useEffect(() => {
    setIsUserMenuOpen(false)
  }, [pathname])
  
  // Handle Escape key and click outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isUserMenuOpen) {
        setIsUserMenuOpen(false)
        userMenuButtonRef.current?.focus()
      }
    }
    
    const handleClickOutside = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node) &&
          !userMenuButtonRef.current?.contains(e.target as Node)) {
        setIsUserMenuOpen(false)
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isUserMenuOpen])
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) => pathname === path

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen)
  }

  const closeUserMenu = () => {
    setIsUserMenuOpen(false)
  }
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const handleLogout = () => {
    closeUserMenu()
    logout()
  }

  const userMenuItems = [
    { 
      name: 'Akun Saya', 
      href: '/account', 
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      onClick: () => {}
    },
    { 
      name: 'Riwayat Transaksi', 
      href: '/transactions', 
      icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
      onClick: () => {}
    },
    { 
      name: 'Riwayat Laporan', 
      href: '/laporan', 
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      onClick: () => {}
    },
    { 
      name: 'Logout', 
      href: '#', 
      icon: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1',
      isDanger: true,
      onClick: handleLogout
    }
  ]

  return (
    <nav className="fixed inset-x-0 top-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 pt-4">
        <motion.div 
          className="navbar max-w-[1400px] mx-auto w-full rounded-full px-4 md:px-6 flex items-center justify-between will-change-transform"
          animate={{
            backgroundColor: isScrolled ? 'rgba(255, 255, 255, 0.7)' : 'rgba(255, 255, 255, 0.95)',
            boxShadow: isScrolled 
              ? '0 0 0 1px rgba(0, 0, 0, 0.05)' 
              : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
          transition={{ 
            duration: 0.18, 
            ease: 'easeOut'
          }}
          style={{ 
            paddingTop: isScrolled ? '0.5rem' : '0.75rem',
            paddingBottom: isScrolled ? '0.5rem' : '0.75rem',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src={logoSrc} alt="Logo" width={32} height={32} className="h-6 w-6 md:h-8 md:w-8" />
            <span className="font-semibold text-base md:text-lg text-[#5B903A]">{siteName}</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex flex-1 items-center justify-center">
            <ul className="flex gap-2 px-1">
              {menuItems.map((item) => (
                <li key={item.path} className="list-none">
                  <Link href={item.path} className="block">
                    <motion.span
                      className={`inline-flex items-center rounded-full px-4 py-2 cursor-pointer relative ${
                        isActive(item.path) 
                          ? 'font-medium text-[#5B903A]' 
                          : 'font-normal text-[#6B7280]'
                      }`}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      {item.name}
                      {isActive(item.path) && (
                        <motion.div
                          className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-6 bg-[#5B903A] rounded-full"
                          layoutId="navbar-indicator"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Desktop Actions (lg and above) */}
          {!user ? (
            <div className="hidden lg:flex items-center gap-3">
              <motion.button 
                onClick={() => router.push('/register')}
                className="text-sm rounded-full px-4 py-2 font-normal text-gray-600 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] focus-visible:ring-offset-2"
                whileHover={{ scale: 1.03, color: '#5B903A' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                Register
              </motion.button>
              <motion.button 
                onClick={() => router.push('/login')}
                className="btn btn-primary rounded-full py-2.5 px-4 pe-2 inline-flex items-center gap-2 text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] focus-visible:ring-offset-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <span>Login</span>
                <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center shrink-0">
                  <Image src="/assets/icons/arrow.svg" alt="Login Icon" width={12} height={12} className="w-3" />
                </div>
              </motion.button>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-3 relative">
              <motion.button
                ref={userMenuButtonRef}
                onClick={toggleUserMenu}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggleUserMenu()
                  }
                }}
                className="flex items-center gap-2 rounded-full p-1 pr-3 bg-gradient-to-br from-[#5B903A] to-[#4A7A2E] text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] focus-visible:ring-offset-2"
                aria-haspopup="true"
                aria-expanded={isUserMenuOpen}
                aria-controls="user-menu-dropdown"
                aria-label="User account menu"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-xs font-semibold">
                  {getInitials(user.name)}
                </div>
                <span className="text-sm font-medium">{user.name.split(' ')[0]}</span>
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.button>
              
              {/* User Dropdown Menu */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    id="user-menu-dropdown"
                    ref={userMenuRef}
                    className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl overflow-hidden z-50 border border-gray-100"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                  >
                    <div className="p-3 border-b border-gray-100 bg-gradient-to-br from-[#F0F7ED] to-white">
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
                      <p className="text-xs text-[#5B903A] font-medium mt-1">
                        {user.role === 'ADMIN' ? 'Administrator' : user.role === 'WARGA' ? 'Warga Desa' : 'Pengunjung'}
                      </p>
                    </div>
                    
                    <ul className="py-2" role="menu">
                      {userMenuItems.map((item) => (
                        <li key={item.name} role="none">
                          {item.href === '#' ? (
                            <button
                              onClick={item.onClick}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#5B903A] ${
                                item.isDanger 
                                  ? 'text-red-600 hover:bg-red-50' 
                                  : 'text-gray-700 hover:bg-[#F0F7ED] hover:text-[#5B903A]'
                              }`}
                              role="menuitem"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                              </svg>
                              <span className="font-medium">{item.name}</span>
                            </button>
                          ) : (
                            <Link
                              href={item.href}
                              onClick={() => {
                                closeUserMenu()
                                item.onClick()
                              }}
                              className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#5B903A] ${
                                item.isDanger 
                                  ? 'text-red-600 hover:bg-red-50' 
                                  : 'text-gray-700 hover:bg-[#F0F7ED] hover:text-[#5B903A]'
                              }`}
                              role="menuitem"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                              </svg>
                              <span className="font-medium">{item.name}</span>
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Mobile & Tablet Actions (below lg) */}
          {!user ? (
            <div className="flex lg:hidden items-center gap-2">
              <motion.button 
                onClick={() => router.push('/register')}
                className="text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 font-normal text-gray-600 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] focus-visible:ring-offset-2"
                whileHover={{ scale: 1.03, color: '#5B903A' }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                Register
              </motion.button>
              <motion.button 
                onClick={() => router.push('/login')}
                className="btn btn-primary rounded-full py-1.5 sm:py-2 px-3 sm:px-4 inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] focus-visible:ring-offset-2"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <span>Login</span>
                <div className="bg-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center shrink-0">
                  <Image src="/assets/icons/arrow.svg" alt="Login Icon" width={12} height={12} className="w-2.5 sm:w-3" />
                </div>
              </motion.button>
            </div>
          ) : (
            <div className="flex lg:hidden items-center relative">
              <motion.button
                ref={userMenuButtonRef}
                onClick={toggleUserMenu}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggleUserMenu()
                  }
                }}
                className="flex items-center gap-1.5 sm:gap-2 rounded-full p-1 pr-2 sm:pr-3 bg-gradient-to-br from-[#5B903A] to-[#4A7A2E] text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] focus-visible:ring-offset-2"
                aria-haspopup="true"
                aria-expanded={isUserMenuOpen}
                aria-controls="user-menu-dropdown-mobile"
                aria-label="User account menu"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-xs font-semibold">
                  {getInitials(user.name)}
                </div>
                <span className="text-xs sm:text-sm font-medium hidden xs:inline">{user.name.split(' ')[0]}</span>
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-3 w-3 sm:h-4 sm:w-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  animate={{ rotate: isUserMenuOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.button>
              
              {/* User Dropdown Menu for Mobile */}
              <AnimatePresence>
                {isUserMenuOpen && (
                  <motion.div
                    id="user-menu-dropdown-mobile"
                    ref={userMenuRef}
                    className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl overflow-hidden z-50 border border-gray-100"
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: 'easeOut' }}
                  >
                    <div className="p-3 border-b border-gray-100 bg-gradient-to-br from-[#F0F7ED] to-white">
                      <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
                      <p className="text-xs text-[#5B903A] font-medium mt-1">
                        {user.role === 'ADMIN' ? 'Administrator' : user.role === 'WARGA' ? 'Warga Desa' : 'Pengunjung'}
                      </p>
                    </div>
                    
                    <ul className="py-2" role="menu">
                      {userMenuItems.map((item) => (
                        <li key={item.name} role="none">
                          {item.href === '#' ? (
                            <button
                              onClick={item.onClick}
                              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#5B903A] ${
                                item.isDanger 
                                  ? 'text-red-600 hover:bg-red-50' 
                                  : 'text-gray-700 hover:bg-[#F0F7ED] hover:text-[#5B903A]'
                              }`}
                              role="menuitem"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                              </svg>
                              <span className="font-medium">{item.name}</span>
                            </button>
                          ) : (
                            <Link
                              href={item.href}
                              onClick={() => {
                                closeUserMenu()
                                item.onClick()
                              }}
                              className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors cursor-pointer min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#5B903A] ${
                                item.isDanger 
                                  ? 'text-red-600 hover:bg-red-50' 
                                  : 'text-gray-700 hover:bg-[#F0F7ED] hover:text-[#5B903A]'
                              }`}
                              role="menuitem"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                              </svg>
                              <span className="font-medium">{item.name}</span>
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </nav>
  )
})

export default Navbar
