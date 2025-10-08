'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

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

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext()
    }, 5000)

    return () => clearInterval(interval)
  }, [activeIndex])

  const handleNext = () => {
    if (isTransitioning) return
    setDirection('next')
    setIsTransitioning(true)
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
    setTimeout(() => setIsTransitioning(false), 700)
  }

  const handlePrev = () => {
    if (isTransitioning) return
    setDirection('prev')
    setIsTransitioning(true)
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setTimeout(() => setIsTransitioning(false), 700)
  }

  const handleThumbnailClick = (index: number) => {
    if (isTransitioning || index === activeIndex) return
    setDirection(index > activeIndex ? 'next' : 'prev')
    setIsTransitioning(true)
    setActiveIndex(index)
    setTimeout(() => setIsTransitioning(false), 700)
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

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 mb-16">
          <div>
            <h2 className="text-5xl md:text-6xl font-semibold text-gray-900 leading-tight">
              Cerita Nyata dari<br />Pengunjung Baturaden
            </h2>
          </div>
          <div className="text-gray-500 max-w-sm">
            <p className="text-base leading-relaxed">
              Dengarkan pengalaman mereka yang telah merasakan keindahan alam dan kehangatan budaya lokal Baturaden.
            </p>
          </div>
        </div>

        {/* Content Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Main Image (Person) with slide animation */}
          <div className="h-[552px] w-full lg:w-2/5 rounded-3xl overflow-hidden shadow-xl bg-[#F8F8F8]">
            <div className="relative w-full h-full">
              {testimonials.map((testimonial, index) => {
                const isActive = index === activeIndex
                const isPrev = direction === 'prev'

                return (
                  <div
                    key={testimonial.id}
                    className={`absolute inset-0 transition-all duration-700 ease-out bg-transparent ${isActive
                      ? 'opacity-100 translate-x-0 scale-100 z-10'
                      : isPrev
                        ? 'opacity-0 translate-x-full scale-95 z-0'
                        : 'opacity-0 -translate-x-full scale-95 z-0'
                      }`}
                  >
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-contain"
                      priority={index === 0}
                    />
                  </div>
                )
              })}
            </div>
          </div>

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
                  {testimonials.map((testimonial, index) => (
                    <p
                      key={testimonial.id}
                      className={`text-white text-lg md:text-2xl leading-relaxed transition-opacity duration-500 ${index === activeIndex ? 'opacity-100' : 'opacity-0 absolute inset-0'
                        }`}
                    >
                      "{testimonial.quote}"
                    </p>
                  ))}
                </div>

                {/* Author Info */}
                <div className="relative z-10 mt-6">
                  {testimonials.map((testimonial, index) => (
                    <div
                      key={testimonial.id}
                      className={`transition-opacity duration-500 ${index === activeIndex ? 'opacity-100' : 'opacity-0 absolute bottom-0'
                        }`}
                    >
                      <p className="text-white font-medium text-2xl">{testimonial.name}</p>
                      <p className="text-white/90 text-lg">{testimonial.role}</p>
                    </div>
                  ))}
                </div>

                {/* Quote Icon Bottom */}
                <div className="absolute bottom-20 right-10">
                  <Image src="/assets/icons/quotesdown.svg" alt="Quote" width={40} height={40} className="w-10 h-10" />
                </div>
              </div>

              {/* Desktop Navigation Arrows */}
              <div className="hidden lg:flex gap-4 justify-center items-center">
                <button
                  onClick={handlePrev}
                  disabled={isTransitioning}
                  className="w-10 h-10 rounded-full bg-transparent border hover:bg-gray-100 flex items-center justify-center transition-all duration-300 disabled:opacity-50"
                  aria-label="Previous testimonial"
                >
                  <Image src="/assets/icons/ArrowRight.png" alt="Arrow" width={12} height={12} className="w-5 rotate-180" />
                </button>

                <button
                  onClick={handleNext}
                  disabled={isTransitioning}
                  className="w-10 h-10 rounded-full bg-gray-900 hover:bg-gray-800 flex items-center justify-center transition-all duration-300 disabled:opacity-50"
                  aria-label="Next testimonial"
                >
                  <Image src="/assets/icons/ArrowRight.png" alt="Arrow" width={12} height={12} className="w-5 invert" />
                </button>
              </div>
            </div>

            {/* Thumbnails - Larger size to fill space (266px height = 552 - 280 - 6px gap) */}
            <div className="flex gap-5 justify-between items-center overflow-hidden h-[166px]">
              {getVisibleThumbnails().map((testimonial, idx) => (
                <button
                  key={`${testimonial.id}-${idx}`}
                  onClick={() => handleThumbnailClick(testimonial.originalIndex)}
                  disabled={isTransitioning}
                  className="relative rounded-2xl overflow-hidden flex-1 h-full transition-all duration-700 ease-out bg-[#F8F8F8] opacity-60 hover:opacity-100 hover:scale-105"
                  style={{
                    transform: `translateX(${isTransitioning ? (direction === 'next' ? '-24px' : '24px') : '0'})`
                  }}
                >
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-contain"
                  />
                </button>
              ))}
            </div>

            {/* Mobile Navigation Arrows - Same as Desktop */}
            <div className="flex lg:hidden gap-4 justify-center">
              <button
                onClick={handlePrev}
                disabled={isTransitioning}
                className="w-10 h-10 rounded-full bg-transparent border hover:bg-gray-100 flex items-center justify-center transition-all duration-300 disabled:opacity-50"
                aria-label="Previous testimonial"
              >
                <Image src="/assets/icons/ArrowRight.png" alt="Arrow" width={12} height={12} className="w-5 rotate-180" />
              </button>

              <button
                onClick={handleNext}
                disabled={isTransitioning}
                className="w-10 h-10 rounded-full bg-gray-900 hover:bg-gray-800 flex items-center justify-center transition-all duration-300 disabled:opacity-50"
                aria-label="Next testimonial"
              >
                <Image src="/assets/icons/ArrowRight.png" alt="Arrow" width={12} height={12} className="w-5 invert" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialSection