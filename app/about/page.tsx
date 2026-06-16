import { asset } from '@/lib/asset'
import AnimatedImage from '../components/AnimatedImage'
import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'

export default function AboutPage() {
  const whyChooseUs = [
    { icon: '🎯', title: 'Custom Solutions', desc: 'Custom-built machines tailored to specific needs and requirements.' },
    { icon: '🔧', title: 'Material Expertise', desc: 'Expertise in diverse fabrication materials (SS, MS, Aluminium).' },
    { icon: '📐', title: 'In-house Design', desc: 'In-house design capabilities for fixtures and tooling.' },
    { icon: '⭐', title: 'Quality Commitment', desc: 'Commitment to quality and timely delivery.' },
  ]

  const coreValues = [
    {
      color: 'red',
      title: 'Safety First',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      description: 'Safety is not just a priority—it\'s our foundation. We implement comprehensive safety protocols, provide proper training, and ensure all our equipment meets the highest safety standards.',
      items: ['Comprehensive safety training for all team members', 'Regular safety audits and equipment inspections', 'Safety fencing and guarding solutions', 'Zero-accident workplace commitment'],
    },
    {
      color: 'blue',
      title: 'Uncompromising Quality',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: 'Quality is the cornerstone of our reputation. We use premium materials, advanced manufacturing techniques, and rigorous quality control processes to ensure every product meets or exceeds industry standards.',
      items: ['ISO-certified quality management systems', 'Precision engineering with advanced CAD/CAM', 'Multi-stage quality inspection processes', 'Premium materials and components only'],
    },
    {
      color: 'green',
      title: 'Unwavering Commitment',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      description: 'Our commitment extends beyond project delivery. We are dedicated to building lasting relationships, providing ongoing support, and continuously improving our services.',
      items: ['On-time project delivery guarantee', 'Comprehensive after-sales support', 'Continuous improvement and innovation', 'Long-term partnership approach'],
    },
  ]

  const colorMap: Record<string, { bg: string; icon: string; dot: string; border: string }> = {
    red: { bg: 'bg-red-50', icon: 'text-red-600', dot: 'bg-red-500', border: 'border-red-500' },
    blue: { bg: 'bg-blue-50', icon: 'text-blue-600', dot: 'bg-blue-500', border: 'border-blue-500' },
    green: { bg: 'bg-green-50', icon: 'text-green-600', dot: 'bg-green-500', border: 'border-green-500' },
  }

  return (
    <div className="min-h-screen">
      <PageHero
        badge="About Us"
        title="About TM Tech Solutions"
        subtitle="Engineering Excellence Since 2021"
      />

      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-20">
            <div>
              <span className="section-badge mb-4 inline-flex">Our Story</span>
              <h2 className="section-title mb-6">Building the Future of Industrial Automation</h2>
              <p className="text-dark-500 mb-5 leading-relaxed text-lg">
                We, TM Tech Solutions, are a leading provider of innovative automation and fabrication solutions,
                dedicated to transforming industrial operations. Established in 2021, we have grown to be a trusted
                partner for businesses seeking efficiency, precision, and reliability.
              </p>
              <p className="text-dark-500 leading-relaxed text-lg">
                Our journey began with a vision to revolutionize industrial automation through cutting-edge technology
                and engineering excellence. Over the years, we have successfully delivered hundreds of custom solutions
                across various industries, earning the trust of our clients through consistent quality and innovation.
              </p>
            </div>
            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-card-hover">
              <AnimatedImage
                src={asset('/images/Our Story.png')}
                alt="Our Story - TM Tech Solutions Journey"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                animationType="slideLeft"
                delay={200}
                hoverEffect="glow"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-20">
            <div className="modern-card p-8 border-t-4 border-t-primary-500">
              <h3 className="text-2xl font-bold font-display text-dark-900 mb-4">Our Mission</h3>
              <p className="text-dark-500 leading-relaxed">
                Our mission is to empower industries by designing and manufacturing cutting-edge automation solutions
                that simplify complex tasks, improve productivity, and ensure smooth, uninterrupted work processes.
                We strive to be the catalyst for industrial transformation through innovation and excellence.
              </p>
            </div>
            <div className="modern-card p-8 border-t-4 border-t-accent-500">
              <h3 className="text-2xl font-bold font-display text-dark-900 mb-4">Our Vision</h3>
              <p className="text-dark-500 leading-relaxed">
                To be the preferred choice for industrial automation and fabrication, recognized for our engineering
                prowess, customer-centric approach, and commitment to quality. We envision a future where every
                industrial process is optimized through intelligent automation.
              </p>
            </div>
          </div>

          <SectionHeader
            badge="Why Choose Us"
            title="Why Choose TM Tech Solutions?"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="modern-card p-6 text-center hover:-translate-y-2">
                <div className="feature-icon mx-auto mb-4">
                  <span>{item.icon}</span>
                </div>
                <h3 className="text-lg font-bold font-display text-dark-900 mb-2">{item.title}</h3>
                <p className="text-dark-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <SectionHeader
            badge="Core Values"
            title="Safety, Quality, Commitment"
            subtitle="At TM Tech Solutions, we operate on three fundamental pillars that define our approach to every project and relationship."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-20">
            {coreValues.map((value, index) => {
              const colors = colorMap[value.color]
              return (
                <div key={index} className={`modern-card p-8 border-t-4 ${colors.border}`}>
                  <div className="text-center mb-6">
                    <div className={`w-16 h-16 ${colors.bg} rounded-2xl flex items-center justify-center mx-auto mb-4 ${colors.icon}`}>
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold font-display text-dark-900">{value.title}</h3>
                  </div>
                  <p className="text-dark-500 mb-6 leading-relaxed text-sm">{value.description}</p>
                  <ul className="space-y-3">
                    {value.items.map((item, i) => (
                      <li key={i} className="flex items-start text-sm">
                        <span className={`w-1.5 h-1.5 ${colors.dot} rounded-full mr-3 mt-2 flex-shrink-0`} />
                        <span className="text-dark-500">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <span className="section-badge mb-4 inline-flex">Our Team</span>
              <h2 className="section-title mb-6">Our Team & Facilities</h2>
              <p className="text-dark-500 mb-6 leading-relaxed text-lg">
                Our team consists of highly skilled engineers, designers, and technicians who bring years of
                experience in industrial automation and fabrication. We maintain state-of-the-art facilities
                equipped with modern machinery and tools to ensure precision in every project.
              </p>
              <div className="space-y-4">
                {[
                  'Advanced CAD/CAM software for precise design and modeling',
                  'Modern fabrication equipment for various materials',
                  'Quality control systems ensuring highest standards',
                  'Testing and commissioning facilities',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-white text-xs font-bold">✓</span>
                    </div>
                    <p className="text-dark-500">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-80 sm:h-96 rounded-2xl overflow-hidden shadow-card-hover">
              <AnimatedImage
                src={asset('/images/our team.png')}
                alt="Our Team - TM Tech Solutions"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                animationType="slideRight"
                delay={300}
                hoverEffect="shimmer"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
