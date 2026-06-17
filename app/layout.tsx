import { asset } from '@/lib/asset'
import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import './globals.css'
import SiteShell from './components/SiteShell'
import GoogleAnalytics from './components/GoogleAnalytics'
import StructuredData from './components/StructuredData'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
})

export const metadata: Metadata = {
  title: 'TM Tech Solutions - Innovative Automation and Fabrication Solutions',
  description: 'Leading provider of innovative automation and fabrication solutions in Pune. Special Purpose Machines, Custom Automation, Fabrication Work, and Industrial Components. Established 2021.',
  keywords: 'automation solutions, fabrication, SPM design, industrial automation, Pune, Maharashtra, custom machines, automation equipment, industrial components, TM Tech Solutions',
  authors: [{ name: 'TM Tech Solutions' }],
  creator: 'TM Tech Solutions',
  publisher: 'TM Tech Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.tmtechsolutions.in'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/favicon.png', type: 'image/png', sizes: '192x192' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    title: 'TM Tech Solutions - Innovative Automation and Fabrication Solutions',
    description: 'Leading provider of innovative automation and fabrication solutions in Pune. Special Purpose Machines, Custom Automation, Fabrication Work, and Industrial Components.',
    url: 'https://www.tmtechsolutions.in',
    siteName: 'TM Tech Solutions',
    images: [
      {
        url: asset('/images/LOGO.jpg'),
        width: 1200,
        height: 630,
        alt: 'TM Tech Solutions Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TM Tech Solutions - Innovative Automation and Fabrication Solutions',
    description: 'Leading provider of innovative automation and fabrication solutions in Pune.',
    images: [asset('/images/LOGO.jpg')],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'TM Tech Solutions',
    'theme-color': '#0891b2',
    'msapplication-TileColor': '#0891b2',
    'msapplication-config': '/browserconfig.xml',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <head>
        <StructuredData />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="//localhost:3000" />
        <link rel="preload" as="image" href={asset('/images/In House Machine Setup.png')} />
        <link rel="preload" as="image" href={asset('/images/LOGO.jpg')} />
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <GoogleAnalytics />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  )
}
