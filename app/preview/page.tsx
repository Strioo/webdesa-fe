'use client'

import { useState } from 'react'
import HeroSection from '@/components/home/HeroSection'
import StatistikDesa from '@/components/home/StatistikDesa'
import TestimonialSection from '@/components/home/TestimonialSection'
import { motion, AnimatePresence } from 'framer-motion'

type Section = 'hero' | 'statistik' | 'testimonial'
type Breakpoint = 'sm' | 'md' | 'lg'

export default function PreviewPage() {
  const [activeSection, setActiveSection] = useState<Section>('hero')
  const [activeBreakpoint, setActiveBreakpoint] = useState<Breakpoint>('lg')
  const [showGrid, setShowGrid] = useState(false)

  const breakpointWidths = {
    sm: '640px',
    md: '768px',
    lg: '100%'
  }

  const sections = [
    { id: 'hero' as Section, label: 'Hero CTA', component: HeroSection },
    { id: 'statistik' as Section, label: 'Area Chart & Gradients', component: StatistikDesa },
    { id: 'testimonial' as Section, label: 'Carousel Testimonial', component: TestimonialSection }
  ]

  const breakpoints = [
    { id: 'sm' as Breakpoint, label: 'Small (640px)', icon: '📱' },
    { id: 'md' as Breakpoint, label: 'Medium (768px)', icon: '📱' },
    { id: 'lg' as Breakpoint, label: 'Large (100%)', icon: '💻' }
  ]

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Controls */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm">
        <div className="max-w-[1600px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between gap-6 flex-wrap">
            {/* Title */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Preview Testing</h1>
              <p className="text-sm text-gray-500">Test hover, focus, dan switching di berbagai breakpoint</p>
            </div>

            {/* Section Selector */}
            <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeSection === section.id
                      ? 'bg-white text-[#5B903A] shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {section.label}
                </button>
              ))}
            </div>

            {/* Breakpoint Selector */}
            <div className="flex gap-2 bg-gray-100 p-1 rounded-xl">
              {breakpoints.map((bp) => (
                <button
                  key={bp.id}
                  onClick={() => setActiveBreakpoint(bp.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    activeBreakpoint === bp.id
                      ? 'bg-white text-[#5B903A] shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <span>{bp.icon}</span>
                  <span>{bp.label}</span>
                </button>
              ))}
            </div>

            {/* Grid Toggle */}
            <button
              onClick={() => setShowGrid(!showGrid)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                showGrid
                  ? 'bg-[#5B903A] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {showGrid ? '✓ Grid Aktif' : 'Show Grid'}
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Banner */}
      <div className="bg-blue-50 border-b border-blue-200">
        <div className="max-w-[1600px] mx-auto px-6 py-3">
          <div className="flex items-center gap-8 text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-gray-700">
                <strong>Target:</strong> 60fps transform-only
              </span>
            </div>
            <div className="text-gray-700">
              <strong>Keyboard:</strong> ← → (navigate), Space (pause)
            </div>
            <div className="text-gray-700">
              <strong>Hover:</strong> CTA scale 1.03, Carousel pause
            </div>
            <div className="text-gray-700">
              <strong>Focus:</strong> Ring visible pada Tab
            </div>
          </div>
        </div>
      </div>

      {/* Preview Container */}
      <div className="p-6 max-w-[1600px] mx-auto">
        <div className="relative">
          {/* Grid Overlay */}
          {showGrid && (
            <div className="absolute inset-0 pointer-events-none z-50">
              <div className="h-full w-full" style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                `,
                backgroundSize: '20px 20px'
              }} />
            </div>
          )}

          {/* Responsive Container */}
          <motion.div
            key={activeBreakpoint}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden"
            style={{ 
              maxWidth: breakpointWidths[activeBreakpoint],
              transition: 'max-width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {/* Component Render */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {ActiveComponent && <ActiveComponent />}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Testing Checklist */}
      <div className="max-w-[1600px] mx-auto px-6 pb-8">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Acceptance Criteria Checklist</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* CTA Hero */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <span className="text-xl">✓</span> CTA Hero Button
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 pl-7">
                <li>✓ Tidak berubah panjang saat hover/focus</li>
                <li>✓ Scale 1.03 hover, 0.98 tap</li>
                <li>✓ Shadow ringan dan smooth</li>
                <li>✓ Focus ring visible</li>
                <li>✓ Konsisten di sm/md/lg</li>
              </ul>
            </div>

            {/* Area Chart */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <span className="text-xl">✓</span> Area Chart
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 pl-7">
                <li>✓ Transisi mulus saat ganti range</li>
                <li>✓ Tanpa lag atau remount</li>
                <li>✓ Dataset naik-turun jelas</li>
                <li>✓ Kurva monotone smooth</li>
                <li>✓ Memoization aktif</li>
              </ul>
            </div>

            {/* Gradients */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <span className="text-xl">✓</span> Gradient UMKM & Wisatawan
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 pl-7">
                <li>✓ Arah dan intensitas konsisten</li>
                <li>✓ Opasitas moderat (60-80%)</li>
                <li>✓ Konten tetap terbaca</li>
                <li>✓ Via color smooth transition</li>
                <li>✓ Menyatu dengan background</li>
              </ul>
            </div>

            {/* Carousel */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <span className="text-xl">✓</span> Carousel Testimonial
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 pl-7">
                <li>✓ Thumbnail tidak terpotong saat hover</li>
                <li>✓ Smooth drag dengan snap</li>
                <li>✓ Pause on hover aktif</li>
                <li>✓ Keyboard navigation (← →)</li>
                <li>✓ RAF autoplay smooth</li>
              </ul>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Performance & Accessibility</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-green-700 font-medium">Transform Only</div>
                <div className="text-green-600 text-xs mt-1">No layout shift</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-green-700 font-medium">60fps Target</div>
                <div className="text-green-600 text-xs mt-1">GPU accelerated</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-green-700 font-medium">Keyboard Nav</div>
                <div className="text-green-600 text-xs mt-1">Full support</div>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <div className="text-green-700 font-medium">Focus Visible</div>
                <div className="text-green-600 text-xs mt-1">Accessible</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
