# Quick Reference: Smooth Scrolling

## 🚀 Quick Start

### Option 1: Use the Hook (Easiest)

```tsx
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

export default function MyComponent() {
  const { scrollTo } = useSmoothScroll()
  
  return (
    <button onClick={() => scrollTo('section-id')}>
      Scroll Down
    </button>
  )
}
```

### Option 2: Use Anchor Links (Automatic)

```tsx
// This automatically scrolls smoothly!
<a href="#features">Go to Features</a>

// Also works with Next.js Link
<Link href="#about">About</Link>
```

### Option 3: Use Utility Function

```tsx
import { smoothScrollTo } from '@/lib/utils/smoothScroll'

const handleClick = () => {
  smoothScrollTo('target-id', 80) // 80px offset
}
```

## ⚙️ Configuration

### Basic Setup

```tsx
const { scrollTo } = useSmoothScroll({
  offset: 80,          // Space from top (for fixed headers)
  duration: 1000,      // Animation duration (ms)
  easing: 'easeInOut'  // Animation style
})
```

### Easing Options

- `'linear'` - Constant speed
- `'easeInOut'` - Smooth start and end (recommended)
- `'easeIn'` - Slow start
- `'easeOut'` - Slow end

## 📋 Common Use Cases

### 1. Hero Button Scroll

```tsx
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

export default function Hero() {
  const { scrollTo } = useSmoothScroll({ offset: 80 })
  
  return (
    <button onClick={() => scrollTo('content')}>
      Explore More ↓
    </button>
  )
}
```

### 2. Navigation Menu

```tsx
export default function Navigation() {
  return (
    <nav>
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#contact">Contact</a>
    </nav>
  )
}
// Automatically smooth scrolls! ✨
```

### 3. Scroll to Top

```tsx
const { scrollToTop } = useSmoothScroll()

return (
  <button onClick={scrollToTop}>
    Back to Top ↑
  </button>
)
```

### 4. Form Submission Scroll

```tsx
const handleSubmit = async (e) => {
  e.preventDefault()
  await submitForm()
  scrollTo('success-message')
}
```

## 🎯 Target Elements

Make sure your scroll targets have IDs:

```tsx
// Button
<button onClick={() => scrollTo('my-section')}>
  Go to Section
</button>

// Target (must have matching ID!)
<section id="my-section">
  <h2>My Section</h2>
</section>
```

## 🔧 Customization Examples

### Slow, Smooth Scroll

```tsx
const { scrollTo } = useSmoothScroll({
  duration: 2000,      // 2 seconds
  easing: 'easeInOut'
})
```

### Fast Scroll

```tsx
const { scrollTo } = useSmoothScroll({
  duration: 500,       // 0.5 seconds
  easing: 'easeOut'
})
```

### No Offset (Full Page)

```tsx
const { scrollTo } = useSmoothScroll({
  offset: 0           // No space from top
})
```

### Large Offset (Tall Header)

```tsx
const { scrollTo } = useSmoothScroll({
  offset: 120         // 120px space
})
```

## 📱 Responsive Offsets

```tsx
const [offset, setOffset] = useState(80)

useEffect(() => {
  const updateOffset = () => {
    // Mobile: 60px, Desktop: 80px
    setOffset(window.innerWidth < 768 ? 60 : 80)
  }
  
  updateOffset()
  window.addEventListener('resize', updateOffset)
  return () => window.removeEventListener('resize', updateOffset)
}, [])

const { scrollTo } = useSmoothScroll({ offset })
```

## ✅ Tips

### 1. Use Descriptive IDs
```tsx
// ✅ Good
<section id="features-section">

// ❌ Bad
<section id="s1">
```

### 2. Check Element Exists
```tsx
const handleScroll = () => {
  const element = document.getElementById('target')
  if (element) {
    scrollTo('target')
  } else {
    console.warn('Target not found!')
  }
}
```

### 3. Delay After Load
```tsx
useEffect(() => {
  // Wait for content to load
  setTimeout(() => {
    scrollTo('initial-section')
  }, 500)
}, [])
```

## 🐛 Troubleshooting

### Scroll Not Working?

**Check 1**: Does target have an ID?
```tsx
<section id="target-id">...</section>
```

**Check 2**: Is offset too large?
```tsx
// Try reducing offset
useSmoothScroll({ offset: 0 })
```

**Check 3**: Is target visible?
```tsx
// Target might be hidden (display: none)
```

### Scroll Too Fast/Slow?

```tsx
// Adjust duration
useSmoothScroll({ duration: 1500 }) // Slower
useSmoothScroll({ duration: 500 })  // Faster
```

### Wrong Position?

```tsx
// Adjust offset to match your header
useSmoothScroll({ offset: 64 }) // Match header height
```

## 📦 What Was Added?

### Files Created:
1. `lib/utils/smoothScroll.ts` - Utility functions
2. `hooks/useSmoothScroll.ts` - React hooks
3. `components/providers/SmoothScrollProvider.tsx` - Global provider

### Files Updated:
1. `app/globals.css` - Added CSS smooth scroll
2. `app/layout.tsx` - Added SmoothScrollProvider
3. `components/profile/HeroProfile.tsx` - Using hook
4. `components/wisata/SearchGlassCard.tsx` - Using hook

### CSS Added:
```css
html {
  scroll-behavior: smooth;
}
```

## 🎉 That's It!

Your smooth scrolling is ready to use! Just import the hook and start scrolling smoothly.

```tsx
import { useSmoothScroll } from '@/hooks/useSmoothScroll'

const { scrollTo } = useSmoothScroll()

// Use it anywhere!
scrollTo('any-section-id')
```

---

**Based on**: [CSS-Tricks Smooth Scrolling](https://css-tricks.com/snippets/jquery/smooth-scrolling/)  
**Status**: ✅ Production Ready
