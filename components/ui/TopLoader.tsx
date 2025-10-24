'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

export interface TopLoaderProps {
  /**
   * Color for the TopLoader.
   * @default "#5B903A"
   */
  color?: string
  /**
   * The initial position for the TopLoader in percentage, 0.08 is 8%.
   * @default 0.08
   */
  initialPosition?: number
  /**
   * The increament delay speed in milliseconds.
   * @default 200
   */
  crawlSpeed?: number
  /**
   * The height for the TopLoader in pixels (px).
   * @default 3
   */
  height?: number
  /**
   * Auto increment the TopLoader.
   * @default true
   */
  crawl?: boolean
  /**
   * Show the spinner on the right side.
   * @default false
   */
  showSpinner?: boolean
  /**
   * The animation easing for the TopLoader.
   * @default "ease"
   */
  easing?: string
  /**
   * The animation speed in milliseconds for the TopLoader.
   * @default 200
   */
  speed?: number
  /**
   * The shadow for the TopLoader.
   * @default "0 0 10px {color},0 0 5px {color}"
   */
  shadow?: string | false
  /**
   * The z-index for the TopLoader.
   * @default 9999
   */
  zIndex?: number
  /**
   * Custom styles for the TopLoader.
   */
  style?: string
}

const TopLoader = ({
  color = '#5B903A',
  initialPosition = 0.08,
  crawlSpeed = 200,
  height = 3,
  crawl = true,
  showSpinner = false,
  easing = 'ease',
  speed = 200,
  shadow = '0 0 10px ' + color + ',0 0 5px ' + color,
  zIndex = 9999,
  style,
}: TopLoaderProps) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    NProgress.configure({
      showSpinner: showSpinner,
      trickle: crawl,
      trickleSpeed: crawlSpeed,
      minimum: initialPosition,
      easing: easing,
      speed: speed,
    })

    const handleAnchorClick = (event: Event) => {
      const targetUrl = (event.currentTarget as HTMLAnchorElement).href
      const currentUrl = window.location.href
      if (targetUrl !== currentUrl) {
        // Small delay to feel more natural
        setTimeout(() => {
          NProgress.start()
        }, 50)
      }
    }

    const handleMutation: MutationCallback = () => {
      const anchorElements = document.querySelectorAll('a[href]')
      anchorElements.forEach((anchor) => {
        anchor.removeEventListener('click', handleAnchorClick)
        anchor.addEventListener('click', handleAnchorClick)
      })
    }

    const mutationObserver = new MutationObserver(handleMutation)
    mutationObserver.observe(document, { childList: true, subtree: true })

    // Initial setup
    handleMutation([], mutationObserver)

    return () => mutationObserver.disconnect()
  }, [crawl, crawlSpeed, initialPosition, easing, speed, showSpinner])

  useEffect(() => {
    // Smooth completion with delay
    const timer = setTimeout(() => {
      NProgress.done()
    }, 100)
    
    return () => clearTimeout(timer)
  }, [pathname, searchParams])

  return (
    <style>
      {style ||
        `
        #nprogress {
          pointer-events: none;
        }
        
        #nprogress .bar {
          background: ${color};
          position: fixed;
          z-index: ${zIndex};
          top: 0;
          left: 0;
          width: 100%;
          height: ${height}px;
        }
        
        #nprogress .peg {
          display: block;
          position: absolute;
          right: 0px;
          width: 100px;
          height: 100%;
          box-shadow: ${shadow};
          opacity: 1;
          transform: rotate(3deg) translate(0px, -4px);
        }
        
        #nprogress .spinner {
          display: ${showSpinner ? 'block' : 'none'};
          position: fixed;
          z-index: ${zIndex};
          top: 15px;
          right: 15px;
        }
        
        #nprogress .spinner-icon {
          width: 18px;
          height: 18px;
          box-sizing: border-box;
          border: solid 2px transparent;
          border-top-color: ${color};
          border-left-color: ${color};
          border-radius: 50%;
          animation: nprogress-spinner 400ms linear infinite;
        }
        
        .nprogress-custom-parent {
          overflow: hidden;
          position: relative;
        }
        
        .nprogress-custom-parent #nprogress .spinner,
        .nprogress-custom-parent #nprogress .bar {
          position: absolute;
        }
        
        @keyframes nprogress-spinner {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  )
}

export default TopLoader
