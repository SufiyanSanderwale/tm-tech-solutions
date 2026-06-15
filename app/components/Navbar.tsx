'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Our Products', href: '/products' },
    { name: 'Services', href: '/services' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact Us', href: '/contact' },
  ]

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isMenuOpen])

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-glass border-b border-dark-100/50 py-2'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group">
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden ring-2 ring-primary-500/20 group-hover:ring-primary-500/50 transition-all duration-300">
                <Image
                  src="/images/LOGO.jpg"
                  alt="TM Tech Solutions Logo"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 640px) 40px, 44px"
                />
              </div>
              <div className="flex flex-col">
                <span className={`text-base sm:text-lg font-bold font-display tracking-tight transition-colors duration-300 ${
                  isScrolled ? 'text-dark-900' : 'text-white'
                }`}>
                  TM Tech Solutions
                </span>
                <span className={`text-[10px] sm:text-xs font-medium tracking-wider uppercase hidden sm:block transition-colors duration-300 ${
                  isScrolled ? 'text-primary-600' : 'text-primary-300'
                }`}>
                  Automation & Fabrication
                </span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`nav-link px-4 rounded-lg ${
                    isActive(item.href)
                      ? isScrolled
                        ? 'nav-link-active bg-primary-50'
                        : 'text-white font-semibold bg-white/10'
                      : isScrolled
                        ? ''
                        : 'text-white/80 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/contact"
                className="ml-4 btn-primary !py-2.5 !px-5 !text-sm !rounded-lg"
              >
                Get Quote
              </Link>
            </div>

            <button
              className={`lg:hidden p-2.5 rounded-xl transition-all duration-300 btn-mobile ${
                isScrolled
                  ? 'text-dark-700 hover:bg-dark-100'
                  : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={isMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-500 ${
          isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div
          className="absolute inset-0 bg-dark-950/60 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        <div
          className={`absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl transition-transform duration-500 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full pt-24 px-6 pb-8">
            <div className="flex flex-col gap-1 flex-1">
              {navigation.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-lg font-medium py-4 px-4 rounded-xl transition-all duration-300 animate-slide-down ${
                    isActive(item.href)
                      ? 'bg-primary-50 text-primary-700 font-semibold'
                      : 'text-dark-700 hover:bg-dark-50 hover:text-primary-600'
                  }`}
                  style={{ animationDelay: `${index * 50}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <Link
              href="/contact"
              className="btn-primary w-full text-center mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Quote
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
