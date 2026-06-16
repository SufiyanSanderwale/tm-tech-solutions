import { asset } from '@/lib/asset'
import Link from 'next/link'
import AnimatedImage from '../components/AnimatedImage'
import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'

export default function ProductsPage() {
  const productCategories = [
    {
      id: 'conveyors',
      title: 'Conveyors',
      description: 'Efficient material handling solutions for various industrial applications',
      products: [
        {
          name: 'Flat Belt Conveyors (Angular, Vertical, Horizontal)',
          image: asset('/images/Conveyor.png'),
          description: 'Versatile solutions for efficient material movement across various orientations. Designed for smooth operation and easy maintenance.',
          features: ['Multiple orientations', 'Smooth operation', 'Easy maintenance', 'Customizable lengths']
        },
        {
          name: 'Knife Edge Conveyor',
          image: asset('/images/knife Edge converyer.png'),
          description: 'Ideal for transferring small or delicate items smoothly without gaps. Perfect for precision handling applications.',
          features: ['Gap-free transfer', 'Delicate item handling', 'Precision positioning', 'Compact design']
        },
        {
          name: 'Roller Conveyor',
          image: asset('/images/Roller convearor.png'),
          description: 'Robust systems for handling heavy loads with ease. Built for durability and high-capacity operations.',
          features: ['Heavy load capacity', 'Durable construction', 'High efficiency', 'Low maintenance']
        }
      ]
    },
    {
      id: 'spm',
      title: 'Special Purpose Machines (SPMs)',
      description: 'Custom automation solutions designed for specific manufacturing processes',
      products: [
        {
          name: 'Semi Auto Duct Cutting Machine',
          image: asset('/images/Semi Auto Duct Cutting Machine.png'),
          description: 'Precision cutting for ducts with enhanced safety and speed. Automated operation reduces manual intervention and improves accuracy.',
          features: ['Precision cutting', 'Enhanced safety', 'Automated operation', 'High accuracy']
        },
        {
          name: 'Auto Fabric Strip Feeding Machine',
          image: asset('/images/Auto Fabric Strip Feeding Machine.png'),
          description: 'Automated feeding for textiles and fabrics, ensuring consistent production. Maintains uniform tension and feed rate.',
          features: ['Automated feeding', 'Consistent production', 'Uniform tension', 'Textile handling']
        },
        {
          name: 'Auto De-burring Machine',
          image: asset('/images/Auto De-Burring Machine.png'),
          description: 'Automating the removal of burrs for smooth, finished components. Ensures consistent quality and reduces manual labor.',
          features: ['Automated deburring', 'Consistent quality', 'Reduced manual labor', 'Smooth finish']
        },
        {
          name: 'BORING Special Purpose Machine',
          image: asset('/images/BORING Special Purpose Machines.png'),
          description: 'Precision boring operations for complex manufacturing requirements. Designed for high-accuracy machining and production efficiency.',
          features: ['Precision boring', 'High accuracy', 'Production efficiency', 'Complex machining']
        }
      ]
    },
    {
      id: 'material-handling',
      title: 'Material Handling',
      description: 'Solutions for efficient movement and positioning of materials and components',
      products: [
        {
          name: 'Rotary Table (Turn Table)',
          image: asset('/images/Rotary Table (Turn Table).png'),
          description: 'Enabling easy orientation changes for assembly or inspection processes. Provides precise positioning and smooth rotation.',
          features: ['Precise positioning', 'Smooth rotation', 'Multiple orientations', 'Heavy duty']
        },
        {
          name: 'Industrial Trolley and Lifting Tackle',
          image: asset('/images/Trolley and Lifting Tackle 2.png'),
          description: 'Durable trolleys and tackles for safe and efficient internal logistics. Built for heavy-duty operations.',
          features: ['Heavy duty construction', 'Safe operation', 'Efficient logistics', 'Durable materials']
        },
        {
          name: 'Industrial Trolley',
          image: asset('/images/trolly.png'),
          description: 'Versatile material handling trolleys designed for efficient movement of goods and components in industrial environments.',
          features: ['Versatile design', 'Material handling', 'Industrial grade', 'Easy maneuverability']
        }
      ]
    },
    {
      id: 'feeders',
      title: 'Feeding Systems',
      description: 'Automated feeding solutions for consistent component supply',
      products: [
        {
          name: 'Bowl Feeder',
          image: asset('/images/Bowl Feeder.png'),
          description: 'Reliable vibratory systems for sorting and orienting small components. Ensures consistent feed rate and proper orientation.',
          features: ['Vibratory sorting', 'Component orientation', 'Consistent feed rate', 'Small parts handling']
        },
        {
          name: 'Linear Feeder',
          image: asset('/images/Linear Feeder.png'),
          description: 'Ensuring consistent and controlled feeding of parts in automated lines. Provides smooth linear motion.',
          features: ['Linear motion', 'Controlled feeding', 'Consistent operation', 'Automated lines']
        },
        {
          name: 'Vibro Feeder',
          image: asset('/images/Vibro Feeder.png'),
          description: 'Utilizing vibration to align and feed components for subsequent processes. Efficient and reliable operation.',
          features: ['Vibration technology', 'Component alignment', 'Efficient operation', 'Process integration']
        }
      ]
    },
    {
      id: 'tooling',
      title: 'Tooling & Fixtures',
      description: 'Precision tooling solutions for accurate manufacturing and assembly',
      products: [
        {
          name: 'Jigs and Fixtures',
          image: asset('/images/Jigs and Fixture and Tooling.png'),
          description: 'Precision tooling to hold and guide workpieces, ensuring accuracy and repeatability. Custom-designed for specific applications.',
          features: ['Precision holding', 'Workpiece guidance', 'High accuracy', 'Repeatability']
        },
        {
          name: 'Special Tooling',
          image: asset('/images/Special Tooling.jpg'),
          description: 'Custom-designed tools for unique manufacturing and assembly challenges. Tailored solutions for specific requirements.',
          features: ['Custom design', 'Unique applications', 'Tailored solutions', 'Manufacturing support']
        }
      ]
    }
  ]

  const additionalComponents = [
    { image: asset('/images/Pneumatic,-Make Festo-SMC-Janatic-Airmax-Marcury.png'), title: 'Pneumatic Components', desc: 'Festo, SMC, Janatic, Airmax, Mercury' },
    { image: asset('/images/Sensors-Make P&F-Baumer-Banner.png'), title: 'Industrial Sensors', desc: 'P&F, Baumer, Banner' },
    { image: asset('/images/Gear Box- and eletric Motor.png'), title: 'Motors & Gear Boxes', desc: 'High-quality power transmission solutions' },
    { image: asset('/images/Belt-Timing and Bearing.png'), title: 'Bearings & Timing Belts', desc: 'SKF, Hiwin bearings and precision timing belts' },
    { image: asset('/images/Gemini_Generated_Image_bbpu4nbbpu4nbbpu.png'), title: 'Electrical Components', desc: 'Mitsubishi, Siemens PLCs, drives, and controls' },
    { image: asset('/images/Gemini_Generated_Image_rh6vvqrh6vvqrh6v.png'), title: 'Hydraulic Components', desc: 'High-pressure hydraulic systems and components' },
  ]

  return (
    <div className="min-h-screen">
      <PageHero
        badge="Products"
        title="Our Industrial Products"
        subtitle="Engineered for Performance"
      />

      <section className="section-padding">
        <div className="container-max">
          <p className="text-xl text-dark-500 max-w-4xl mx-auto text-center mb-16 leading-relaxed">
            Discover our comprehensive range of industrial automation and fabrication products,
            each designed to enhance efficiency, precision, and reliability in your manufacturing processes.
          </p>

          {productCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} id={category.id} className="mb-20 scroll-mt-28">
              <SectionHeader
                badge={category.title}
                title={category.title}
                subtitle={category.description}
              />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {category.products.map((product, productIndex) => (
                  <div key={productIndex} className="modern-card group">
                    <div className="relative h-56 sm:h-64 overflow-hidden bg-dark-50">
                      <AnimatedImage
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-contain p-4"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        animationType="fadeIn"
                        delay={productIndex * 100}
                        hoverEffect="scale"
                      />
                    </div>
                    <div className="p-6 sm:p-8">
                      <h3 className="text-xl font-bold font-display text-dark-900 mb-3 group-hover:text-primary-700 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-dark-500 mb-5 leading-relaxed text-sm sm:text-base">
                        {product.description}
                      </p>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-dark-800 text-sm">Key Features:</h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {product.features.map((feature, featureIndex) => (
                            <li key={featureIndex} className="flex items-center text-sm text-dark-500">
                              <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-2.5 flex-shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-20 rounded-3xl bg-dark-50/80 p-8 sm:p-12 border border-dark-100">
            <SectionHeader
              badge="Components"
              title="Additional Components & Equipment"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalComponents.map((comp, index) => (
                <div key={index} className="modern-card p-6 group">
                  <div className="relative h-44 mb-4 bg-white rounded-xl">
                    <AnimatedImage
                      src={comp.image}
                      alt={comp.title}
                      fill
                      className="object-contain p-3"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      animationType="fadeIn"
                      delay={index * 100}
                      hoverEffect="scale"
                    />
                  </div>
                  <h3 className="text-lg font-bold font-display text-dark-900 mb-2 group-hover:text-primary-700 transition-colors">{comp.title}</h3>
                  <p className="text-dark-500 text-sm">{comp.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <div className="cta-section p-10 sm:p-14 text-center">
              <div className="relative z-10">
                <h2 className="text-mobile-2xl font-bold mb-4">Need Custom Solutions?</h2>
                <p className="text-lg mb-8 text-primary-100/90 max-w-2xl mx-auto">
                  Our team specializes in designing and manufacturing custom automation solutions
                  tailored to your specific requirements. Let&apos;s discuss your project needs.
                </p>
                <Link href="/contact" className="btn-ghost">
                  Contact Us Today
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
