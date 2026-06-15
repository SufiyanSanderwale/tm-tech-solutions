'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

export default function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const links = [
    { href: '/admin/jobs', label: 'Jobs' },
    { href: '/admin/applications', label: 'Applications' },
  ]

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  return (
    <>
      <header className="bg-white border-b border-dark-200 sticky top-0 z-40">
        <div className="container-max px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link href="/admin/jobs" className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-2 ring-primary-500/20">
                  <Image src="/images/AdminLogo.png" alt="TM Tech Admin" fill className="object-cover" />
                </div>
                <span className="font-bold font-display text-dark-900">TM Tech HR</span>
              </Link>
              <nav className="hidden sm:flex items-center gap-1">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      pathname.startsWith(link.href)
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-dark-600 hover:bg-dark-50'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/careers"
                className="text-sm text-primary-600 hover:text-primary-700 font-medium hidden sm:inline"
              >
                View Careers
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="text-sm px-4 py-2 rounded-lg border border-dark-200 text-dark-700 hover:bg-dark-50 hidden sm:inline"
              >
                Logout
              </button>
              <button
                type="button"
                onClick={() => setIsMenuOpen((open) => !open)}
                className="lg:hidden p-2.5 rounded-xl border border-dark-200 text-dark-700 hover:bg-dark-50"
                aria-label="Toggle admin mobile menu"
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
        </div>
      </header>

      <div className={`fixed inset-0 z-50 transition-all duration-300 ${isMenuOpen ? 'visible opacity-100' : 'invisible opacity-0'}`}>
        <div
          className="absolute inset-0 bg-dark-950/60 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />
        <div className={`absolute top-0 right-0 h-full w-full max-w-xs bg-white shadow-2xl transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full pt-20 px-5 pb-6 gap-5">
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`block rounded-2xl px-4 py-4 text-base font-medium transition-colors ${
                    pathname.startsWith(link.href)
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-dark-700 hover:bg-dark-50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/careers"
                className="block rounded-2xl px-4 py-4 text-base font-medium text-primary-700 hover:bg-primary-50"
                onClick={() => setIsMenuOpen(false)}
              >
                View Careers
              </Link>
            </div>

            <div className="mt-auto space-y-3">
              <button
                type="button"
                onClick={() => {
                  setIsMenuOpen(false)
                  handleLogout()
                }}
                className="w-full rounded-2xl border border-dark-200 px-4 py-3 text-base font-medium text-dark-700 hover:bg-dark-50"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
