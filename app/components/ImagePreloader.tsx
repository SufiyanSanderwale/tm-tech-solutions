'use client'

import { useEffect } from 'react'

interface ImagePreloaderProps {
  images: string[]
}

export default function ImagePreloader({ images }: ImagePreloaderProps) {
  useEffect(() => {
    const preloadImages = () => {
      images.forEach((src) => {
        const link = document.createElement('link')
        link.rel = 'preload'
        link.as = 'image'
        link.href = src
        link.crossOrigin = 'anonymous'
        document.head.appendChild(link)
      })
    }

    // Preload images after a short delay to not block initial page load
    const timer = setTimeout(preloadImages, 100)
    
    return () => {
      clearTimeout(timer)
      // Clean up preload links
      const preloadLinks = document.querySelectorAll('link[rel="preload"][as="image"]')
      preloadLinks.forEach(link => link.remove())
    }
  }, [images])

  return null
}

