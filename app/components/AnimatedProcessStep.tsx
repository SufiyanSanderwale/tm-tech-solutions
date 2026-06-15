'use client'

import { useState, useRef, useEffect } from 'react'

interface AnimatedProcessStepProps {
  stepNumber: number
  title: string
  description: string
  index: number
  delay?: number
}

export default function AnimatedProcessStep({
  stepNumber,
  title,
  description,
  index,
  delay = 0
}: AnimatedProcessStepProps) {
  const [isVisible, setIsVisible] = useState(false)
  const stepRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, delay + (index * 200))
        }
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    if (stepRef.current) {
      observer.observe(stepRef.current)
    }

    return () => {
      if (stepRef.current) {
        observer.unobserve(stepRef.current)
      }
    }
  }, [delay, index])

  return (
    <div
      ref={stepRef}
      className={`modern-card group text-center p-6 sm:p-8 transform transition-all duration-700 relative ${
        isVisible
          ? 'opacity-100 scale-100 translate-y-0'
          : 'opacity-0 scale-95 translate-y-8'
      } hover:-translate-y-2`}
    >
      <div className="relative z-10">
        <div className={`w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-glow-sm transition-all duration-700 ${
          isVisible ? 'scale-100 rotate-0' : 'scale-75 rotate-180'
        }`}>
          <span className={`text-2xl font-bold text-white font-display transition-all duration-600 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}>
            {stepNumber}
          </span>
        </div>
        <h3 className={`text-lg font-bold font-display text-dark-900 mb-2 transition-all duration-600 group-hover:text-primary-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}>
          {title}
        </h3>
        <p className={`text-dark-500 text-sm leading-relaxed transition-all duration-600 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          {description}
        </p>
      </div>

      {index < 3 && (
        <div className={`hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 transition-all duration-1000 ${
          isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
        }`}>
          <div className="w-full h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full" />
        </div>
      )}
    </div>
  )
}
