import { asset } from '@/lib/asset'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative bg-dark-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-hero-mesh opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent" />

      <div className="container-max section-padding relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="relative w-11 h-11 rounded-xl overflow-hidden ring-2 ring-primary-500/30">
                <Image
                  src={asset('/images/LOGO.jpg')}
                  alt="TM Tech Solutions Logo"
                  fill
                  className="object-contain"
                  sizes="44px"
                />
              </div>
              <div>
                <span className="text-lg font-bold font-display">TM Tech Solutions</span>
                <p className="text-xs text-primary-400 font-medium tracking-wider uppercase">Est. 2021</p>
              </div>
            </div>
            <p className="text-dark-400 text-sm leading-relaxed max-w-xs">
              Innovative automation and fabrication solutions for industrial excellence. Precision engineering from Pune, India.
            </p>
            <div className="flex gap-3">
              <a
                href="tel:+917263940902"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-primary-600 border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Call us"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
              <a
                href="mailto:tmtechsolutions11@gmail.com"
                className="w-10 h-10 rounded-xl bg-white/5 hover:bg-primary-600 border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110"
                aria-label="Email us"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-sm font-bold font-display uppercase tracking-wider text-primary-400">Quick Links</h3>
            <div className="space-y-3">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Our Products', href: '/products' },
                { name: 'Services', href: '/services' },
                { name: 'Careers', href: '/careers' },
                { name: 'Contact Us', href: '/contact' },
              ].map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-dark-400 hover:text-white hover:translate-x-1 transition-all duration-200 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-sm font-bold font-display uppercase tracking-wider text-primary-400">Contact</h3>
            <div className="space-y-3 text-sm text-dark-400">
              <p className="flex items-center gap-2">
                <span className="text-primary-500">📞</span>
                +91 7263940902
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary-500 mt-0.5">✉️</span>
                tmtechsolutions11@gmail.com
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-sm font-bold font-display uppercase tracking-wider text-primary-400">Locations</h3>
            <div className="space-y-4 text-sm text-dark-400">
              <div>
                <p className="font-semibold text-white mb-1">Design Office</p>
                <p className="leading-relaxed">Flat 501, Royal C wing, Bhagyoday Nagar, Kondhwa-Pune-411048</p>
              </div>
              <div>
                <p className="font-semibold text-white mb-1">Assembly Hub</p>
                <p className="leading-relaxed">Shop No.5, lane No 02, Gulve Wasti-Shanti Nagar, Bhosari -PCMC 411026</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-dark-500 text-sm">
            &copy; {currentYear} TM Tech Solutions. All rights reserved.
          </p>
          <p className="text-dark-500 text-sm">
            Precision Engineering · Pune, Maharashtra
          </p>
        </div>
      </div>
    </footer>
  )
}
