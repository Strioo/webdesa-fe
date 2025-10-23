/**
 * Smooth Scroll Utility
 * Based on CSS-Tricks smooth scrolling implementation
 * https://css-tricks.com/snippets/jquery/smooth-scrolling/
 */

export const smoothScrollTo = (targetId: string, offset: number = 0) => {
  const target = document.getElementById(targetId)
  if (!target) return

  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset
  const offsetPosition = targetPosition - offset

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  })
}

export const initSmoothScroll = (offset: number = 80) => {
  // Select all links with hashes
  const links = document.querySelectorAll('a[href*="#"]')
  
  links.forEach(link => {
    link.addEventListener('click', function(this: Element, e: Event) {
      const anchor = this as HTMLAnchorElement
      // Make sure this.hash has a value before overriding default behavior
      if (anchor.hash !== '') {
        const hash = anchor.hash

        // Check if the link is for the same page (not cross-page navigation)
        const currentPath = window.location.pathname
        const linkPath = anchor.pathname

        if (currentPath === linkPath) {
          // Prevent default anchor click behavior
          e.preventDefault()

          // Get the target element
          const target = document.querySelector(hash)
          
          if (target) {
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset
            const offsetPosition = targetPosition - offset

            // Using scrollTo with smooth behavior
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            })

            // Update URL hash (optional)
            if (history.pushState) {
              history.pushState(null, '', hash)
            } else {
              window.location.hash = hash
            }
          }
        }
      }
    })
  })
}

// Alternative: Custom easing smooth scroll (for more control)
export const smoothScrollToWithEasing = (
  targetId: string, 
  duration: number = 1000,
  offset: number = 0
) => {
  const target = document.getElementById(targetId)
  if (!target) return

  const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset
  const startPosition = window.pageYOffset
  const distance = targetPosition - startPosition
  let startTime: number | null = null

  // Easing function (easeInOutCubic)
  const easeInOutCubic = (t: number): number => {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  const animation = (currentTime: number) => {
    if (startTime === null) startTime = currentTime
    const timeElapsed = currentTime - startTime
    const progress = Math.min(timeElapsed / duration, 1)
    const ease = easeInOutCubic(progress)

    window.scrollTo(0, startPosition + distance * ease)

    if (timeElapsed < duration) {
      requestAnimationFrame(animation)
    }
  }

  requestAnimationFrame(animation)
}
