'use client'

import { useState, useRef, useEffect } from 'react'

interface AnimatedServiceCardProps {
  title: string
  description: string
  icon: string
  index: number
  delay?: number
}

export default function AnimatedServiceCard({
  title,
  description,
  icon,
  index,
  delay = 0
}: AnimatedServiceCardProps) {
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay + (index * 150))
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [delay, index])

  return (
    <div
      ref={cardRef}
      className={`modern-card group p-6 sm:p-8 transform transition-all duration-700 ${
        isVisible
          ? 'opacity-100 scale-100 translate-y-0'
          : 'opacity-0 scale-95 translate-y-8'
      } hover:-translate-y-2`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 via-transparent to-accent-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10">
        <div className={`feature-icon mb-5 transition-all duration-700 ${
          isVisible ? 'scale-100 rotate-0' : 'scale-75 rotate-12'
        }`}>
          <span className="filter drop-shadow-sm">{icon}</span>
        </div>
        <h3 className={`text-lg sm:text-xl font-bold font-display text-dark-900 mb-3 transition-all duration-600 group-hover:text-primary-700 ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}>
          {title}
        </h3>
        <p className={`text-sm sm:text-base text-dark-500 leading-relaxed transition-all duration-600 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          {description}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 to-accent-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
    </div>
  )
}
