# Smooth Scroll Examples

## Complete implementation examples for various use cases

## 1. Basic Hero Section with Scroll Button

```tsx
'use client'

import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { motion } from 'framer-motion'

export default function Hero() {
  const { scrollTo } = useSmoothScroll({ 
    offset: 80, 
    duration: 1000, 
    easing: 'easeInOut' 
  })

  return (
    <section className="h-screen flex items-center justify-center">
      <div className="text-center">
        <h1>Welcome to Baturaden</h1>
        <p>Discover the beauty of nature</p>
        
        <motion.button
          onClick={() => scrollTo('content')}
          whileHover={{ scale: 1.05 }}
          className="mt-8 px-6 py-3 bg-primary text-white rounded-full"
        >
          Explore More ↓
        </motion.button>
      </div>
      
      {/* Animated scroll indicator */}
      <div 
        onClick={() => scrollTo('content')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 cursor-pointer"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          ↓
        </motion.div>
      </div>
    </section>
  )
}
```

## 2. Navigation with Active Section

```tsx
'use client'

import { useState, useEffect } from 'react'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import Link from 'next/link'

const sections = ['home', 'about', 'services', 'contact']

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home')
  const { scrollTo } = useSmoothScroll({ offset: 80 })

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className="fixed top-0 w-full bg-white shadow-md z-50">
      <ul className="flex gap-6 p-4 justify-center">
        {sections.map((section) => (
          <li key={section}>
            <button
              onClick={() => scrollTo(section)}
              className={`px-4 py-2 rounded transition-colors ${
                activeSection === section
                  ? 'bg-primary text-white'
                  : 'text-gray-600 hover:text-primary'
              }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

## 3. Table of Contents

```tsx
'use client'

import { useSmoothScroll } from '@/hooks/useSmoothScroll'

interface TOCItem {
  id: string
  title: string
  level: number
}

const tocItems: TOCItem[] = [
  { id: 'introduction', title: 'Introduction', level: 1 },
  { id: 'features', title: 'Features', level: 1 },
  { id: 'feature-1', title: 'Feature 1', level: 2 },
  { id: 'feature-2', title: 'Feature 2', level: 2 },
  { id: 'conclusion', title: 'Conclusion', level: 1 },
]

export default function TableOfContents() {
  const { scrollTo } = useSmoothScroll({ offset: 100 })

  return (
    <aside className="sticky top-20 w-64 p-4 bg-gray-50 rounded-lg">
      <h3 className="font-bold mb-4">Table of Contents</h3>
      <ul className="space-y-2">
        {tocItems.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 1) * 16}px` }}
          >
            <button
              onClick={() => scrollTo(item.id)}
              className="text-sm text-gray-700 hover:text-primary transition-colors text-left"
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  )
}
```

## 4. Scroll to Top Button

```tsx
'use client'

import { useState, useEffect } from 'react'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { motion, AnimatePresence } from 'framer-motion'

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false)
  const { scrollToTop } = useSmoothScroll()

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-4 bg-primary text-white rounded-full shadow-lg hover:shadow-xl transition-shadow z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Scroll to top"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  )
}
```

## 5. Search Results with Scroll

```tsx
'use client'

import { useState } from 'react'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

export default function SearchPage() {
  const [results, setResults] = useState([])
  const { scrollTo } = useSmoothScroll({ offset: 80 })

  const handleSearch = async (query: string) => {
    // Fetch search results
    const data = await fetchResults(query)
    setResults(data)
    
    // Scroll to results after a small delay
    setTimeout(() => {
      scrollTo('search-results')
    }, 100)
  }

  return (
    <div>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search..."
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSearch(e.currentTarget.value)
            }
          }}
        />
      </div>

      <div id="search-results" className="mt-8">
        {results.map((result) => (
          <div key={result.id} className="result-item">
            {result.title}
          </div>
        ))}
      </div>
    </div>
  )
}
```

## 6. FAQ Accordion

```tsx
'use client'

import { useState } from 'react'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import { motion, AnimatePresence } from 'framer-motion'

interface FAQ {
  id: string
  question: string
  answer: string
}

const faqs: FAQ[] = [
  { id: 'faq-1', question: 'What is Baturaden?', answer: '...' },
  { id: 'faq-2', question: 'How to visit?', answer: '...' },
  // ... more FAQs
]

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null)
  const { scrollTo } = useSmoothScroll({ offset: 100 })

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id)
    if (openId !== id) {
      setTimeout(() => scrollTo(id), 300)
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {faqs.map((faq) => (
        <div key={faq.id} id={faq.id} className="border rounded-lg">
          <button
            onClick={() => handleToggle(faq.id)}
            className="w-full p-4 text-left font-semibold flex justify-between items-center"
          >
            {faq.question}
            <span>{openId === faq.id ? '−' : '+'}</span>
          </button>
          
          <AnimatePresence>
            {openId === faq.id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 text-gray-600">
                  {faq.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}
```

## 7. Multi-Step Form

```tsx
'use client'

import { useState } from 'react'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

const steps = ['personal', 'contact', 'preferences', 'review']

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const { scrollTo } = useSmoothScroll({ offset: 80 })

  const goToStep = (index: number) => {
    setCurrentStep(index)
    scrollTo(steps[index])
  }

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      goToStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      goToStep(currentStep - 1)
    }
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress indicator */}
      <div className="flex justify-between mb-8">
        {steps.map((step, index) => (
          <button
            key={step}
            onClick={() => goToStep(index)}
            className={`px-4 py-2 rounded ${
              index === currentStep
                ? 'bg-primary text-white'
                : index < currentStep
                ? 'bg-green-500 text-white'
                : 'bg-gray-200'
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {/* Form steps */}
      {steps.map((step, index) => (
        <div
          key={step}
          id={step}
          className={`mb-8 p-6 border rounded-lg ${
            index === currentStep ? 'block' : 'hidden'
          }`}
        >
          <h2 className="text-2xl font-bold mb-4 capitalize">{step}</h2>
          {/* Form fields here */}
          
          <div className="flex justify-between mt-6">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="px-6 py-2 bg-gray-300 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              className="px-6 py-2 bg-primary text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
```

## 8. Image Gallery with Navigation

```tsx
'use client'

import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import Image from 'next/image'

const images = [
  { id: 'gallery-1', src: '/img1.jpg', title: 'Image 1' },
  { id: 'gallery-2', src: '/img2.jpg', title: 'Image 2' },
  { id: 'gallery-3', src: '/img3.jpg', title: 'Image 3' },
  // ... more images
]

export default function ImageGallery() {
  const { scrollTo } = useSmoothScroll({ offset: 100 })

  return (
    <div>
      {/* Thumbnail navigation */}
      <div className="fixed top-20 right-4 space-y-2">
        {images.map((img, index) => (
          <button
            key={img.id}
            onClick={() => scrollTo(img.id)}
            className="block w-16 h-16 rounded border-2 border-transparent hover:border-primary transition-colors"
          >
            <Image
              src={img.src}
              alt={img.title}
              width={64}
              height={64}
              className="object-cover rounded"
            />
          </button>
        ))}
      </div>

      {/* Full images */}
      <div className="space-y-8">
        {images.map((img) => (
          <div
            key={img.id}
            id={img.id}
            className="h-screen flex items-center justify-center"
          >
            <div>
              <Image
                src={img.src}
                alt={img.title}
                width={1200}
                height={800}
                className="rounded-lg shadow-xl"
              />
              <h3 className="text-2xl font-bold mt-4 text-center">
                {img.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

## 9. Timeline Navigation

```tsx
'use client'

import { useSmoothScroll } from '@/hooks/useSmoothScroll'

const timelineEvents = [
  { id: 'event-1990', year: 1990, title: 'Founded' },
  { id: 'event-2000', year: 2000, title: 'First Milestone' },
  { id: 'event-2010', year: 2010, title: 'Expansion' },
  { id: 'event-2020', year: 2020, title: 'Modern Era' },
]

export default function Timeline() {
  const { scrollTo } = useSmoothScroll({ offset: 100 })

  return (
    <div>
      {/* Year navigation */}
      <div className="sticky top-20 bg-white shadow-md p-4 z-10">
        <div className="flex gap-4 justify-center">
          {timelineEvents.map((event) => (
            <button
              key={event.id}
              onClick={() => scrollTo(event.id)}
              className="px-4 py-2 bg-gray-100 hover:bg-primary hover:text-white rounded transition-colors"
            >
              {event.year}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline events */}
      <div className="max-w-4xl mx-auto py-12">
        {timelineEvents.map((event, index) => (
          <div
            key={event.id}
            id={event.id}
            className="mb-24 scroll-mt-32"
          >
            <div className={`flex gap-8 ${index % 2 === 0 ? '' : 'flex-row-reverse'}`}>
              <div className="flex-1">
                <div className="text-6xl font-bold text-primary mb-4">
                  {event.year}
                </div>
                <h3 className="text-3xl font-bold mb-4">{event.title}</h3>
                <p className="text-gray-600">
                  Event description goes here...
                </p>
              </div>
              <div className="flex-1">
                <div className="aspect-video bg-gray-200 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
```

## 10. Product Showcase

```tsx
'use client'

import { useState } from 'react'
import { useSmoothScroll } from '@/hooks/useSmoothScroll'
import Image from 'next/image'

const products = [
  { id: 'product-1', name: 'Product 1', price: 100 },
  { id: 'product-2', name: 'Product 2', price: 200 },
  { id: 'product-3', name: 'Product 3', price: 300 },
]

export default function ProductShowcase() {
  const { scrollTo } = useSmoothScroll({ offset: 80, duration: 800 })
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null)

  const handleProductClick = (id: string) => {
    setSelectedProduct(id)
    scrollTo(id)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Sidebar navigation */}
      <aside className="lg:sticky lg:top-20 h-fit">
        <h3 className="font-bold mb-4">Products</h3>
        <ul className="space-y-2">
          {products.map((product) => (
            <li key={product.id}>
              <button
                onClick={() => handleProductClick(product.id)}
                className={`w-full text-left px-4 py-2 rounded transition-colors ${
                  selectedProduct === product.id
                    ? 'bg-primary text-white'
                    : 'hover:bg-gray-100'
                }`}
              >
                {product.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* Product details */}
      <div className="lg:col-span-3 space-y-16">
        {products.map((product) => (
          <div
            key={product.id}
            id={product.id}
            className="p-8 border rounded-lg"
          >
            <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
            <div className="aspect-video bg-gray-200 rounded-lg mb-4" />
            <p className="text-2xl font-bold text-primary mb-4">
              ${product.price}
            </p>
            <button className="px-6 py-3 bg-primary text-white rounded-lg">
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
```

---

## Tips for Best Results

1. **Always add IDs to scroll targets**
2. **Adjust offset based on header height**
3. **Consider adding a small delay after data loading**
4. **Use appropriate easing for your design**
5. **Test on different screen sizes**
6. **Respect user's motion preferences**

All examples are ready to use and fully typed with TypeScript! 🚀
