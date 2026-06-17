import { Metadata } from 'next'
import Link from 'next/link'
import { asset } from '@/lib/asset'
import AnimatedImage from './components/AnimatedImage'
import AnimatedServiceCard from './components/AnimatedServiceCard'
import ImagePreloader from './components/ImagePreloader'
import SectionHeader from './components/SectionHeader'

export const metadata: Metadata = {
  title: 'TM Tech Solutions | Industrial Automation & Fabrication Solutions in Pune',
  description:
    'TM Tech Solutions provides industrial automation, fabrication, conveyors, rotary tables, special purpose machines, safety fencing, and custom engineering solutions in Pune.',
}

export default function HomePage() {
  const products = [
    {
      name: 'Conveyors',
      image: asset('/images/Conveyor.png'),
      description: 'Efficient material handling solutions',
      href: '/products#conveyors'
    },
    {
      name: 'Rotary Tables',
      image: asset('/images/Rotary Table (Turn Table).png'),
      description: 'Precision positioning systems',
      href: '/products#material-handling'
    },
    {
      name: 'Special Purpose Machines',
      image: asset('/images/Semi Auto Duct Cutting Machine.png'),
      description: 'Custom automation solutions',
      href: '/products#spm'
    },
    {
      name: 'Bowl & Vibratory Feeders',
      image: asset('/images/Auto Fabric Strip Feeding Machine.png'),
      description: 'Automated feeding systems',
      href: '/products#feeders'
    },
    {
      name: 'Jigs and Fixtures',
      image: asset('/images/Jigs and Fixture and Tooling.png'),
      description: 'Precision tooling solutions',
      href: '/products#tooling'
    },
    {
      name: 'Industrial Trolleys',
      image: asset('/images/Trolley and Lifting Tackle 2.png'),
      description: 'Material handling equipment',
      href: '/products#material-handling'
    }
  ]

  const services = [
    {
      title: 'Special Purpose Machine (SPM) Design',
      description: 'Tailored automation for unique industrial requirements, from concept to commissioning.',
      icon: '⚙️'
    },
    {
      title: 'Custom Build Automation',
      description: 'Developing bespoke automated systems to streamline your production processes and enhance efficiency.',
      icon: '🔧'
    },
    {
      title: 'Fabrication Work (SS, MS, Aluminium)',
      description: 'High-quality fabrication of industrial structures, machine parts, and enclosures in various metals.',
      icon: '🏗️'
    },
    {
      title: 'Safety Fencing & Guarding',
      description: 'Ensuring workplace safety with custom-designed and fabricated protective barriers and guarding solutions.',
      icon: '🛡️'
    },
    {
      title: 'In-house Design Services (Fixtures, Tooling)',
      description: 'Expert design and engineering support for precision fixtures and specialized tooling.',
      icon: '📐'
    }
  ]

  const stats = [
    { value: '2021', label: 'Established' },
    { value: '100+', label: 'Projects Delivered' },
    { value: '5+', label: 'Core Services' },
    { value: '24/7', label: 'Support Available' },
  ]

  const criticalImages = [
    asset('/images/In House Machine Setup.png'),
    asset('/images/Conveyor.png'),
    asset('/images/Rotary Table (Turn Table).png'),
    asset('/images/Semi Auto Duct Cutting Machine.png'),
  ]

  return (
    <div className="min-h-screen">
      <ImagePreloader images={criticalImages} />

      {/* Hero Section */}
      <section className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="hero-video-container absolute inset-0 z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="hero-video"
          >
            <source src="/Banner Video/Banner video.mp4" type="video/mp4" />
          </video>
          <div className="hero-gradient-overlay" />
          <div className="absolute inset-0 bg-hero-mesh opacity-50" />
        </div>

        <div className="absolute top-1/4 left-10 w-64 h-64 bg-primary-500/20 rounded-full blur-3xl animate-float hidden lg:block" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-accent-500/10 rounded-full blur-3xl animate-float hidden lg:block" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 text-center text-white px-4 sm:px-6 max-w-5xl mx-auto pt-24 pb-16">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-sm font-medium mb-6 sm:mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
            Pune&apos;s Trusted Automation Partner Since 2021
          </span>

          <h1 className="text-mobile-4xl font-bold mb-5 sm:mb-6 leading-[1.1] tracking-tight text-balance font-display animate-fade-in">
            Innovative{' '}
            <span className="gradient-text bg-gradient-to-r from-primary-300 via-cyan-300 to-accent-400 bg-clip-text text-transparent">
              Automation
            </span>
            {' '}& Fabrication Solutions
          </h1>

          <p className="text-mobile-lg mb-8 sm:mb-10 text-dark-200 leading-relaxed max-w-3xl mx-auto animate-fade-in">
            Designing and manufacturing custom automation solutions for smooth and efficient industrial operations.
            We empower industries with precision engineering and advanced technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Link href="/products" className="btn-primary btn-mobile text-mobile-base px-8 py-4 w-full sm:w-auto">
              Explore Our Solutions
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
            <Link href="/contact" className="btn-outline btn-mobile text-mobile-base px-8 py-4 w-full sm:w-auto">
              Get Free Consultation
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mt-16 sm:mt-20 max-w-3xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="text-2xl sm:text-3xl font-bold font-display text-white mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-primary-200/80 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-white/50 animate-bounce">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Products Section */}
      <section className="section-padding bg-dark-50/50 bg-grid-pattern">
        <div className="container-max">
          <SectionHeader
            badge="Our Products"
            title="Engineered for Performance"
            subtitle="Comprehensive range of industrial automation and fabrication solutions designed for maximum efficiency and reliability."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {products.map((product, index) => (
              <Link
                key={index}
                href={product.href}
                className="modern-card group"
              >
                <div className="relative h-52 sm:h-56 overflow-hidden">
                  <AnimatedImage
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    animationType="fadeIn"
                    delay={index * 100}
                    hoverEffect="scale"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                <div className="p-5 sm:p-6">
                  <h3 className="text-lg font-bold font-display text-dark-900 mb-2 group-hover:text-primary-700 transition-colors duration-300">
                    {product.name}
                  </h3>
                  <p className="text-sm text-dark-500 mb-3">
                    {product.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-600 group-hover:gap-2 transition-all duration-300">
                    Learn more
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products" className="btn-secondary">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/40 rounded-full blur-3xl" />
        <div className="container-max relative z-10">
          <SectionHeader
            badge="Our Services"
            title="End-to-End Engineering Excellence"
            subtitle="From design to delivery, ensuring your automation needs are met with precision and excellence."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service, index) => (
              <AnimatedServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                index={index}
                delay={200}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn-primary">
              Learn More About Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Strip */}
      <section className="py-12 sm:py-16 bg-dark-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-mesh opacity-30" />
        <div className="container-max relative z-10 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {[
              { icon: '🎯', title: 'Custom Solutions', desc: 'Tailored to your needs' },
              { icon: '🔧', title: 'Expert Fabrication', desc: 'SS, MS & Aluminium' },
              { icon: '📐', title: 'In-house Design', desc: 'CAD & engineering' },
              { icon: '⭐', title: 'Quality First', desc: 'Timely delivery' },
            ].map((item, i) => (
              <div key={i} className="text-center group">
                <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 className="text-white font-bold font-display text-sm sm:text-base mb-1">{item.title}</h3>
                <p className="text-dark-400 text-xs sm:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-max">
          <div className="cta-section p-10 sm:p-14 lg:p-16 text-center">
            <div className="relative z-10">
              <h2 className="text-mobile-2xl font-bold mb-5 text-balance">
                Ready to Transform Your Industrial Operations?
              </h2>
              <p className="text-mobile-base mb-8 text-primary-100/90 max-w-2xl mx-auto">
                Let our expert team design and build custom automation solutions tailored to your specific needs.
                Contact us today for a consultation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact" className="btn-ghost">
                  Get In Touch
                </Link>
                <Link href="/about" className="btn-outline">
                  Learn About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
