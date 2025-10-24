'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import DockNavbar from '@/components/DockNavbar'

export function ConditionalNavbar() {
  const pathname = usePathname()
  
  // Hide navbar and dock navbar on chatbot page
  const shouldHideNav = pathname === '/chatbot' || pathname.startsWith('/dashboard') ||
                       pathname.startsWith('/login') || pathname.startsWith('/register')
  
  if (shouldHideNav) {
    return null
  }
  
  return (
    <>
      <Navbar />
      <DockNavbar />
    </>
  )
}
