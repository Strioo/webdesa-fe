'use client'

import MenuCard from './MenuCard'
import type { MenuItem } from '@/types/umkm-detail'

interface UmkmMenuGridProps {
  menus: MenuItem[]
}

export default function UmkmMenuGrid({ menus }: UmkmMenuGridProps) {
  if (!menus || menus.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Belum ada menu tersedia</p>
      </div>
    )
  }

  return (
    <div>
      {/* Section Title */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 text-center md:text-left">
          Menu & Produk
        </h2>
        <p className="text-sm sm:text-base text-gray-600 text-center md:text-left">
          Berikut adalah daftar menu dan produk yang tersedia
        </p>
      </div>

      {/* Grid Container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {menus.map((menu) => (
          <MenuCard key={menu.id} menu={menu} />
        ))}
      </div>
    </div>
  )
}
