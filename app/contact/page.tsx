'use client'

import { useState } from 'react'
import PageHero from '../components/PageHero'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const subject = encodeURIComponent(formData.subject)
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )
      const mailtoLink = `mailto:tmtechsolutions11@gmail.com?subject=${subject}&body=${body}`

      window.location.href = mailtoLink

      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Email sending failed:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactCards = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
        </svg>
      ),
      title: 'Phone',
      value: '+91 7263940902',
      href: 'tel:+917263940902',
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      title: 'Email',
      value: 'tmtechsolutions11@gmail.com',
      href: 'mailto:tmtechsolutions11@gmail.com',
    },
  ]

  const locations = [
    {
      title: 'Design Office',
      address: 'Flat 501, Royal C wing, Bhagyoday Nagar, Kondhwa-Pune-411048',
      mapUrl: 'https://maps.google.com/?q=18.47484752491511,73.88702092774074',
      tips: ['Near Bhagyoday Nagar, Kondhwa', 'Easily accessible by public transport', 'Parking available nearby'],
    },
    {
      title: 'Assembly Hub',
      address: 'Shop No.5, lane No 02, Gulve Wasti-Shanti Nagar, Bhosari -PCMC 411026',
      mapUrl: 'https://maps.google.com/?q=Shop+No.5+lane+No+02+Gulve+Wasti+Shanti+Nagar+Bhosari+PCMC+411026',
      tips: ['Located in Shanti Nagar, Bhosari', 'Industrial area with good connectivity', 'Ample parking space available'],
    },
  ]

  return (
    <div className="min-h-screen">
      <PageHero
        badge="Contact"
        title="Contact TM Tech Solutions"
        subtitle="Let's Build the Future Together"
      />

      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-3 modern-card p-6 sm:p-8 lg:p-10">
              <span className="section-badge mb-4 inline-flex">Send Message</span>
              <h2 className="text-2xl font-bold font-display text-dark-900 mb-6">
                Send Us a Message
              </h2>

              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl text-sm">
                  Thank you for your message! We&apos;ll get back to you soon.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-sm">
                  Sorry, there was an error sending your message. Please try again or contact us directly at tmtechsolutions11@gmail.com
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-dark-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input-modern"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-dark-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input-modern"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-dark-700 mb-2">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input-modern"
                    placeholder="What's this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-dark-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="input-modern resize-none"
                    placeholder="Tell us about your project requirements..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Contact Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <div className="modern-card p-6 sm:p-8">
                <h2 className="text-xl font-bold font-display text-dark-900 mb-6">Get In Touch</h2>
                <div className="space-y-5">
                  {contactCards.map((card, i) => (
                    <a
                      key={i}
                      href={card.href}
                      className="flex items-start gap-4 p-4 rounded-xl bg-dark-50/50 hover:bg-primary-50 border border-transparent hover:border-primary-100 transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                        {card.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-dark-900">{card.title}</h3>
                        <p className="text-dark-500 text-sm group-hover:text-primary-700 transition-colors">{card.value}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <div className="modern-card p-6 sm:p-8">
                <h2 className="text-xl font-bold font-display text-dark-900 mb-6">Business Hours</h2>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-dark-100">
                    <span className="text-dark-500 text-sm">Monday - Saturday</span>
                    <span className="font-semibold text-dark-900 text-sm">8:30 AM - 5:30 PM</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-dark-500 text-sm">Sunday</span>
                    <span className="font-semibold text-dark-900 text-sm">Closed</span>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-primary-600 to-primary-800 p-6 sm:p-8 text-white">
                <h3 className="font-bold font-display text-lg mb-2">Need Urgent Help?</h3>
                <p className="text-primary-100 text-sm mb-4">Call us directly for immediate assistance with your project.</p>
                <a href="tel:+917263940902" className="btn-ghost !text-sm !py-2.5 !px-5 w-full text-center">
                  Call Now
                </a>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-20">
            <span className="section-badge mb-4 inline-flex mx-auto block w-fit">Locations</span>
            <h2 className="text-mobile-2xl font-bold text-dark-900 mb-10 text-center">Find Us on Map</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {locations.map((loc, i) => (
                <div key={i} className="modern-card p-6 sm:p-8">
                  <h3 className="text-xl font-bold font-display text-dark-900 mb-3">{loc.title}</h3>
                  <p className="text-dark-500 mb-5 text-sm leading-relaxed">{loc.address}</p>
                  <div className="bg-gradient-to-br from-dark-50 to-primary-50/30 h-56 rounded-xl flex items-center justify-center border border-dark-100 mb-4">
                    <div className="text-center">
                      <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-glow-sm">
                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <a
                        href={loc.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold text-sm transition-colors"
                      >
                        View on Google Maps
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    </div>
                  </div>
                  <ul className="space-y-1.5">
                    {loc.tips.map((tip, ti) => (
                      <li key={ti} className="text-sm text-dark-500 flex items-center">
                        <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 flex-shrink-0" />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16">
            <div className="cta-section p-10 sm:p-14 text-center">
              <div className="relative z-10">
                <h2 className="text-mobile-2xl font-bold mb-4">Ready to Start Your Project?</h2>
                <p className="text-lg mb-8 text-primary-100/90 max-w-2xl mx-auto">
                  Whether you need a custom automation solution, fabrication work, or component sourcing,
                  our team is ready to help you achieve your industrial goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="tel:+917263940902" className="btn-ghost">Call Us Now</a>
                  <a href="mailto:tmtechsolutions11@gmail.com" className="btn-outline">Send Email</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
