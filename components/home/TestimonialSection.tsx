'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface Testimonial {
  id: number
  name: string
  role: string
  image: string
  quote: string
}

const TestimonialSection = () => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const [isVisible, setIsVisible] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
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

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Dimas',
      role: 'Wisatawan Lokal',
      image: '/assets/images/testimonial-1.png',
      quote: 'Produk UMKM di sini luar biasa. Dari makanan tradisional sampai kerajinan tangan, semuanya berkualitas dan punya nilai budaya yang tinggi!'
    },
    {
      id: 2,
      name: 'Sarah',
      role: 'Wisatawan Jakarta',
      image: '/assets/images/testimonial-2.png',
      quote: 'Baturaden memberikan pengalaman wisata yang tak terlupakan. Udara sejuk, pemandangan indah, dan masyarakat yang ramah!'
    },
    {
      id: 3,
      name: 'Budi',
      role: 'Backpacker',
      image: '/assets/images/testimonial-3.png',
      quote: 'Destinasi wisata yang sempurna untuk liburan keluarga. Banyak spot foto menarik dan kuliner khas yang wajib dicoba!'
    },
    {
      id: 4,
      name: 'Rina',
      role: 'Travel Blogger',
      image: '/assets/images/testimonial-4.png',
      quote: 'Pesona alam Baturaden benar-benar memukau. Air terjun yang jernih dan suasana pegunungan yang menenangkan!'
    },
    {
      id: 5,
      name: 'Ahmad',
      role: 'Fotografer',
      image: '/assets/images/testimonial-5.png',
      quote: 'Tempat yang sangat indah untuk fotografi landscape. Setiap sudut memiliki keunikan tersendiri dan masyarakatnya sangat kooperatif!'
    }
  ]

  // Auto slide with pause on hover using RAF for smooth animation
  useEffect(() => {
    if (isPaused) return
    
    let rafId: number
    let lastTime = Date.now()
    const interval = 5000 // 5 seconds
    
    const animate = () => {
      if (isPaused) return
      
      const currentTime = Date.now()
      const elapsed = currentTime - lastTime
      
      if (elapsed >= interval && !isTransitioning) {
        handleNext()
        lastTime = currentTime
      }
      
      rafId = requestAnimationFrame(animate)
    }
    
    // Start animation only if not paused and not transitioning
    if (!isPaused && !isTransitioning) {
      rafId = requestAnimationFrame(animate)
    }
    
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isTransitioning, isPaused])

  const handleNext = () => {
    if (isTransitioning) return
    setDirection('next')
    setIsTransitioning(true)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const handlePrev = () => {
    if (isTransitioning) return
    setDirection('prev')
    setIsTransitioning(true)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  const handleThumbnailClick = (index: number) => {
    if (isTransitioning || index === activeIndex) return
    setDirection(index > activeIndex ? 'next' : 'prev')
    setIsTransitioning(true)
    setActiveIndex(index)
    setTimeout(() => setIsTransitioning(false), 500)
  }

  // Get thumbnails that exclude the active/main image
  const getVisibleThumbnails = () => {
    const visible = []
    for (let i = 1; i <= 4; i++) {
      const index = (activeIndex + i) % testimonials.length
      visible.push({ ...testimonials[index], originalIndex: index })
    }
    return visible
  }

  // Keyboard navigation support - after function definitions
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        handlePrev()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        handleNext()
      } else if (e.key === ' ') {
        e.preventDefault()
        setIsPaused(prev => !prev)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, isTransitioning])

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className={`flex flex-col lg:flex-row justify-between items-start gap-6 sm:gap-8 mb-12 sm:mb-16 animate-on-scroll ${isVisible ? 'animate-fade-in-up' : ''}`}>
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-gray-900 leading-tight">
              Cerita Nyata dari<br />Pengunjung Baturaden
            </h2>
          </div>
          <div className="text-gray-500 max-w-sm">
            <p className="text-sm sm:text-base leading-relaxed">
              Dengarkan pengalaman mereka yang telah merasakan keindahan alam dan kehangatan budaya lokal Baturaden.
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className={`flex flex-col lg:flex-row gap-6 sm:gap-8 animate-on-scroll ${isVisible ? 'animate-fade-in-up animation-delay-200' : ''}`}>
          {/* Left Side - Main Image (Person) with smooth drag interaction */}
          <motion.div 
            className="h-[400px] sm:h-[500px] lg:h-[552px] w-full lg:w-2/5 rounded-3xl overflow-hidden shadow-xl bg-[#F8F8F8] cursor-grab active:cursor-grabbing will-change-transform"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            dragTransition={{ 
              power: 0.3,
              timeConstant: 200,
              bounceStiffness: 400, 
              bounceDamping: 35,
              min: -100,
              max: 100
            }}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = offset.x * velocity.x
              const swipeThreshold = 800
              
              if (swipe > swipeThreshold || offset.x > 100) {
                handlePrev()
              } else if (swipe < -swipeThreshold || offset.x < -100) {
                handleNext()
              }
            }}
            whileHover={{ scale: 1.015 }}
            onHoverStart={() => setIsPaused(true)}
            onHoverEnd={() => setIsPaused(false)}
            transition={{ 
              type: 'spring',
              stiffness: 300,
              damping: 30,
              duration: 0.25
            }}
          >
            <div className="relative w-full h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{
                    opacity: 0,
                    x: direction === 'next' ? 60 : -60,
                    y: 12,
                    scale: 0.96
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    scale: 1
                  }}
                  exit={{
                    opacity: 0,
                    x: direction === 'next' ? -60 : 60,
                    y: 12,
                    scale: 0.96
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.32, 0.72, 0, 1]
                  }}
                  className="absolute inset-0"
                >
                  <Image
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].name}
                    fill
                    className="object-contain"
                    priority={activeIndex === 0}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Side - Testimonial Content */}
          <div className="space-y-14 w-full lg:w-3/5">
            {/* Quote Card - Reduced height */}
            <div className="flex gap-8">
              <div className="bg-[#5B903A] rounded-3xl p-8 relative shadow-xl h-[320px] flex flex-col justify-between flex-1">
                {/* Quote Icon Top */}
                <div className="absolute top-4 left-8">
                  <Image src="/assets/icons/quotesup.svg" alt="Quote" width={40} height={40} className="w-10 h-10" />
                </div>

                {/* Quote Text */}
                <div className="relative z-10 mt-8">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeIndex}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] as any }}
                      className="text-white text-lg md:text-2xl leading-relaxed"
                    >
                      "{testimonials[activeIndex].quote}"
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Author Info */}
                <div className="relative z-10 mt-6">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`author-${activeIndex}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] as any }}
                    >
                      <p className="text-white font-medium text-2xl">{testimonials[activeIndex].name}</p>
                      <p className="text-white/90 text-lg">{testimonials[activeIndex].role}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Quote Icon Bottom */}
                <div className="absolute bottom-20 right-10">
                  <Image src="/assets/icons/quotesdown.svg" alt="Quote" width={40} height={40} className="w-10 h-10" />
                </div>
              </div>

              {/* Desktop Navigation Arrows */}
              <div className="hidden lg:flex gap-4 justify-center items-center">
                <motion.button
                  onClick={handlePrev}
                  disabled={isTransitioning}
                  className="w-10 h-10 rounded-full bg-transparent border flex items-center justify-center disabled:opacity-50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] focus-visible:ring-offset-2"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Previous testimonial"
                  aria-controls="testimonial-carousel"
                >
                  <Image src="/assets/icons/arrowright.png" alt="" width={12} height={12} className="w-5 rotate-180" />
                </motion.button>

                <motion.button
                  onClick={handleNext}
                  disabled={isTransitioning}
                  className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center disabled:opacity-50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] focus-visible:ring-offset-2"
                  whileHover={{ scale: 1.1, backgroundColor: 'rgb(31, 41, 55)' }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Next testimonial"
                  aria-controls="testimonial-carousel"
                >
                  <Image src="/assets/icons/arrowright.png" alt="" width={12} height={12} className="w-5 invert" />
                </motion.button>
              </div>
            </div>

            {/* Thumbnails - Fixed clipping with overflow-visible and proper height */}
            <div className="flex gap-5 justify-between items-center overflow-visible min-h-[190px] pt-3 pb-3">
              {getVisibleThumbnails().map((testimonial, idx) => (
                <motion.button
                  key={`${testimonial.id}-${idx}`}
                  onClick={() => handleThumbnailClick(testimonial.originalIndex)}
                  disabled={isTransitioning}
                  className="relative rounded-2xl overflow-hidden flex-1 h-[166px] bg-[#F8F8F8] cursor-pointer will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5B903A] focus-visible:ring-offset-2 transition-shadow"
                  initial={{ opacity: 0.6 }}
                  whileHover={{ 
                    opacity: 1, 
                    scale: 1.08,
                    y: -8,
                    boxShadow: '0 16px 32px -8px rgba(0, 0, 0, 0.25)',
                  }}
                  whileTap={{ scale: 0.96 }}
                  animate={{
                    x: isTransitioning ? (direction === 'next' ? -24 : 24) : 0,
                  }}
                  transition={{ 
                    type: 'spring',
                    stiffness: 300,
                    damping: 25,
                    duration: 0.3
                  }}
                  aria-label={`View testimonial from ${testimonial.name}`}
                >
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-contain pointer-events-none"
                  />
                </motion.button>
              ))}
            </div>

            {/* Mobile Navigation Arrows - Same as Desktop */}
            <div className="flex lg:hidden gap-4 justify-center">
              <button
                onClick={handlePrev}
                disabled={isTransitioning}
                className="w-10 h-10 rounded-full bg-transparent border hover:bg-gray-100 flex items-center justify-center transition-all duration-300 disabled:opacity-50 cursor-pointer"
                aria-label="Previous testimonial"
              >
                <Image src="/assets/icons/arrowright.png" alt="Arrow" width={12} height={12} className="w-5 rotate-180" />
              </button>

              <button
                onClick={handleNext}
                disabled={isTransitioning}
                className="w-10 h-10 rounded-full bg-gray-900 hover:bg-gray-800 flex items-center justify-center transition-all duration-300 disabled:opacity-50 cursor-pointer"
                aria-label="Next testimonial"
              >
                <Image src="/assets/icons/arrowright.png" alt="Arrow" width={12} height={12} className="w-5 invert" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection