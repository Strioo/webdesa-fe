'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { memo } from 'react'
import { 
  HomeIcon, 
  UserIcon, 
  ShoppingBagIcon, 
  MapIcon,
  WrenchScrewdriverIcon,
  DocumentTextIcon 
} from '@heroicons/react/24/outline'

const DOCK_ITEMS = [
  { 
    href: '/', 
    label: 'Home', 
    icon: HomeIcon,
    ariaLabel: 'Navigate to Home' 
  },
  { 
    href: '/profile', 
    label: 'Profile', 
    icon: UserIcon,
    ariaLabel: 'Navigate to Profile' 
  },
  { 
    href: '/umkm', 
    label: 'UMKM', 
    icon: ShoppingBagIcon,
    ariaLabel: 'Navigate to UMKM' 
  },
  { 
    href: '/wisata', 
    label: 'Wisata', 
    icon: MapIcon,
    ariaLabel: 'Navigate to Wisata' 
  },
  { 
    href: '/pembangunan', 
    label: 'Pembangunan', 
    icon: WrenchScrewdriverIcon,
    ariaLabel: 'Navigate to Pembangunan' 
  },
  { 
    href: '/lapor', 
    label: 'Lapor', 
    icon: DocumentTextIcon,
    ariaLabel: 'Navigate to Lapor' 
  },
]

const DockNavbar = memo(function DockNavbar() {
  const pathname = usePathname()

  return (
    <>
      {/* Safe Area Bottom Padding with env() */}
      <div className="h-20 lg:hidden" style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} aria-hidden="true" />
      
      {/* Mobile Dock - Dark Theme with Safe Area */}
      <motion.nav
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        role="tablist"
        aria-label="Main navigation"
      >
        <div className="mx-auto max-w-md px-4 pb-4">
          <div className="backdrop-blur-md bg-neutral-900/55 ring-1 ring-white/15 rounded-2xl shadow-2xl">
            <div className="flex items-center justify-around px-2 py-3">
              {DOCK_ITEMS.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    role="tab"
                    aria-label={item.ariaLabel}
                    aria-selected={isActive}
                    aria-current={isActive ? 'page' : undefined}
                    className="relative flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
                  >
                    {/* Icon with Animation */}
                    <motion.div
                      className="relative"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <motion.div
                        animate={isActive ? { 
                          y: [0, -4, 0],
                          scale: [1, 1.15, 1]
                        } : {}}
                        transition={isActive ? {
                          duration: 0.5,
                          repeat: Infinity,
                          repeatDelay: 2,
                          ease: 'easeInOut'
                        } : {}}
                      >
                        <Icon 
                          className={`w-6 h-6 transition-colors ${
                            isActive 
                              ? 'text-[#5B903A]' 
                              : 'text-white/70 hover:text-white'
                          }`}
                          strokeWidth={isActive ? 2.5 : 2}
                        />
                      </motion.div>

                      {/* Active Indicator Dot */}
                      {isActive && (
                        <motion.div
                          className="absolute -top-1 -right-1 w-2 h-2 bg-[#5B903A] rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                        />
                      )}
                    </motion.div>

                    {/* Label - Show only when active */}
                    {isActive && (
                      <motion.span
                        className="text-[10px] font-medium text-[#5B903A]"
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </motion.nav>
    </>
  )
})

export default DockNavbar
