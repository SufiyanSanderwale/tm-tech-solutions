'use client'

import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'

interface AnimatedImageProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  sizes?: string
  priority?: boolean
  quality?: number
  animationType?: 'fadeIn' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scaleIn' | 'rotateIn' | 'blurIn' | 'flipIn'
  delay?: number
  duration?: number
  hoverEffect?: 'scale' | 'rotate' | 'glow' | 'shimmer' | 'none'
  intersectionThreshold?: number
  children?: React.ReactNode
}

export default function AnimatedImage({
  src,
  alt,
  fill = false,
  width,
  height,
  className = '',
  sizes,
  priority = false,
  quality = 85,
  animationType = 'fadeIn',
  delay = 0,
  duration = 600,
  hoverEffect = 'scale',
  intersectionThreshold = 0.1,
  children
}: AnimatedImageProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay)
        }
      },
      {
        threshold: intersectionThreshold,
        rootMargin: '100px' // Increased margin for earlier loading
      }
    )

    if (imageRef.current) {
      observer.observe(imageRef.current)
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current)
      }
    }
  }, [delay, intersectionThreshold])

  const getAnimationClasses = () => {
    const baseClasses = 'transition-all ease-out'
    const durationClass = `duration-${Math.min(Math.max(duration / 100, 3), 10)}`
    
    if (!isVisible) {
      switch (animationType) {
        case 'fadeIn':
          return `${baseClasses} ${durationClass} opacity-0`
        case 'slideUp':
          return `${baseClasses} ${durationClass} opacity-0 translate-y-8`
        case 'slideLeft':
          return `${baseClasses} ${durationClass} opacity-0 translate-x-8`
        case 'slideRight':
          return `${baseClasses} ${durationClass} opacity-0 -translate-x-8`
        case 'scaleIn':
          return `${baseClasses} ${durationClass} opacity-0 scale-95`
        case 'rotateIn':
          return `${baseClasses} ${durationClass} opacity-0 rotate-12 scale-95`
        case 'blurIn':
          return `${baseClasses} ${durationClass} opacity-0 blur-sm`
        case 'flipIn':
          return `${baseClasses} ${durationClass} opacity-0 rotate-y-90`
        default:
          return `${baseClasses} ${durationClass} opacity-0`
      }
    }

    const visibleClasses = isLoaded ? 'opacity-100 translate-y-0 translate-x-0 scale-100 rotate-0 blur-0 rotate-y-0' : ''
    
    return `${baseClasses} ${durationClass} ${visibleClasses}`
  }

  const getHoverClasses = () => {
    if (hoverEffect === 'none') return ''
    
    const baseHover = 'hover:transition-all hover:duration-300 hover:ease-out'
    
    switch (hoverEffect) {
      case 'scale':
        return `${baseHover} hover:scale-105`
      case 'rotate':
        return `${baseHover} hover:rotate-2 hover:scale-105`
      case 'glow':
        return `${baseHover} hover:shadow-2xl hover:shadow-primary-500/25`
      case 'shimmer':
        return `${baseHover} hover:scale-105 relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700`
      default:
        return baseHover
    }
  }

  const handleImageLoad = () => {
    setIsLoaded(true)
  }

  const imageProps = {
    src,
    alt,
    className: `object-cover ${getAnimationClasses()} ${getHoverClasses()} ${className}`,
    onLoad: handleImageLoad,
    priority,
    quality,
    placeholder: 'blur' as const,
    blurDataURL: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q==',
    ...(fill ? { fill: true } : { width, height }),
    ...(sizes && { sizes })
  }

  return (
    <div 
      ref={imageRef}
      className={`relative overflow-hidden ${fill ? 'w-full h-full' : ''}`}
    >
      <Image {...imageProps} />
      {children && (
        <div className={`absolute inset-0 flex items-center justify-center ${getAnimationClasses()}`}>
          {children}
        </div>
      )}
      
      {/* Loading shimmer effect */}
      {!isLoaded && (
        <div className="absolute inset-0 image-loading rounded-lg">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
      )}
    </div>
  )
}
