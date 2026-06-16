import { asset } from '@/lib/asset'
import Link from 'next/link'
import AnimatedImage from '../components/AnimatedImage'
import AnimatedProcessStep from '../components/AnimatedProcessStep'
import PageHero from '../components/PageHero'
import SectionHeader from '../components/SectionHeader'

export default function ServicesPage() {
  const services = [
    {
      title: 'Special Purpose Machine (SPM) Design & Manufacturing',
      description: 'From concept to commissioning, we design and build custom SPMs like Pick and Place systems, Assembly lines, Testing machines, and more, tailored to optimize your specific manufacturing processes.',
      image: asset('/images/Semi Auto Duct Cutting Machine.png'),
      features: ['Concept to commissioning', 'Pick and Place systems', 'Assembly line automation', 'Testing machines', 'Custom SPM design', 'Process optimization'],
      icon: '⚙️'
    },
    {
      title: 'Fabrication Work',
      description: 'Our expertise spans Stainless Steel (SS), Mild Steel (MS), and Aluminium fabrication. We construct robust industrial structures, machine enclosures, precision components, and safety fencing & guarding solutions that meet stringent quality standards.',
      image: asset('/images/fabrication.jpg'),
      features: ['Stainless Steel fabrication', 'Mild Steel fabrication', 'Aluminium fabrication', 'Industrial structures', 'Machine enclosures', 'Precision components'],
      icon: '🏗️'
    },
    {
      title: 'In-house Design Services',
      description: 'Leveraging advanced CAD software, our skilled engineers provide specialized design services for Fixtures, Tooling, and complete machine layouts, ensuring optimal performance and cost-efficiency.',
      image: asset('/images/Jigs and Fixture and Tooling.png'),
      features: ['Advanced CAD software', 'Fixture design', 'Tooling design', 'Machine layouts', 'Performance optimization', 'Cost-efficiency analysis'],
      icon: '📐'
    },
    {
      title: 'Component Dealing (Industrial Spares & Equipment)',
      description: 'We facilitate the sourcing and supply of high-quality engineering bought-out items. Our extensive network includes leading brands for pneumatics, hydraulics, electrical components, motors, sensors, and bearings.',
      image: asset('/images/Pneumatic,-Make Festo-SMC-Janatic-Airmax-Marcury.png'),
      features: ['Pneumatic components', 'Hydraulic systems', 'Electrical components', 'Motors & gearboxes', 'Industrial sensors', 'Bearings & belts'],
      icon: '🔧'
    }
  ]

  const softwareServices = [
    { title: 'SolidWorks', description: 'Professional 3D CAD design and engineering software for assembly, sheet metal, 2D drafting, weldment, and bill of materials.', image: asset('/images/Software sevices/Solid Works.jpg'), features: ['Assembly design', 'Sheet metal design', '2D drafting', 'Weldment design', 'Bill of materials'], icon: '🔧' },
    { title: 'Solid Edge', description: 'Advanced 3D CAD software for assembly, sheet metal, 2D drafting, weldment, and bill of materials with superior modeling capabilities.', image: asset('/images/Software sevices/Solid Edge.png'), features: ['Assembly design', 'Sheet metal design', '2D drafting', 'Weldment design', 'Bill of materials'], icon: '⚙️' },
    { title: 'AutoCAD 2D', description: 'Industry-standard 2D CAD software for plant design, plan plotting, steel structure design, and civil building projects.', image: asset('/images/Software sevices/Autocad.jpg'), features: ['Plant design', 'Plan plotting', 'Steel structure design', 'Civil building design'], icon: '📐' },
    { title: 'AutoCAD Plant 3D', description: 'Specialized 3D plant design software for pipe routing, ducting, isometric drawings, MTO, BQ, equipment design, and structure design.', image: asset('/images/Software sevices/autocad 3d.png'), features: ['3D pipe routing', 'Ducting design', 'Isometric drawings', 'MTO & BQ', 'Equipment design', 'Structure design', 'Catalog creation', 'Spec editing'], icon: '🏭' },
    { title: 'Navis', description: 'Advanced 3D model coordination and collaboration software for model merging and usage in complex engineering projects.', image: asset('/images/Software sevices/navis.jpg'), features: ['Model merging', '3D coordination', 'Clash detection', 'Project collaboration', 'Model usage optimization'], icon: '🔗' }
  ]

  const componentBrands = [
    { category: 'Pneumatics', brands: ['Festo', 'SMC', 'Janatic', 'Airmax', 'Mercury'], image: asset('/images/Pneumatic,-Make Festo-SMC-Janatic-Airmax-Marcury.png') },
    { category: 'Hydraulics', brands: ['High-pressure systems', 'Hydraulic pumps', 'Valves & actuators'], image: asset('/images/Gemini_Generated_Image_rh6vvqrh6vvqrh6v.png') },
    { category: 'Electrical Components', brands: ['Mitsubishi PLCs', 'Siemens PLCs', 'Sensors', 'Drives', 'Control panels'], image: asset('/images/Gemini_Generated_Image_bbpu4nbbpu4nbbpu.png') },
    { category: 'Motors & Gear Boxes', brands: ['AC/DC Motors', 'Servo motors', 'Gear reducers', 'Variable frequency drives'], image: asset('/images/Gear Box- and eletric Motor.png') },
    { category: 'Sensors', brands: ['P&F', 'Baumer', 'Banner', 'Proximity sensors', 'Photoelectric sensors'], image: asset('/images/Sensors-Make P&F-Baumer-Banner.png') },
    { category: 'Bearings', brands: ['SKF', 'Hiwin', 'Linear bearings', 'Ball bearings', 'Roller bearings'], image: asset('/images/Belt-Timing and Bearing.png') }
  ]

  return (
    <div className="min-h-screen">
      <PageHero
        badge="Services"
        title="Our Engineering Services"
        subtitle="Driving Your Industrial Success"
      />

      <section className="section-padding">
        <div className="container-max">
          <p className="text-xl text-dark-500 max-w-4xl mx-auto text-center mb-16 leading-relaxed">
            We provide comprehensive engineering services from initial concept to final delivery,
            ensuring your automation projects are completed with precision, quality, and efficiency.
          </p>

          {services.map((service, index) => (
            <div key={index} className="mb-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                <div className={index % 2 === 0 ? 'order-1' : 'order-2'}>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="feature-icon !w-12 !h-12 text-xl">
                      <span>{service.icon}</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-display text-dark-900">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-dark-500 mb-6 leading-relaxed text-lg">
                    {service.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center text-sm text-dark-500">
                        <span className="w-1.5 h-1.5 bg-primary-500 rounded-full mr-3 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
                <div className={index % 2 === 0 ? 'order-2' : 'order-1'}>
                  <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-card-hover">
                    <AnimatedImage
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      animationType={index % 2 === 0 ? 'slideRight' : 'slideLeft'}
                      delay={index * 200}
                      hoverEffect="glow"
                    />
                  </div>
                </div>
              </div>
              {index < services.length - 1 && (
                <div className="divider-gradient max-w-md mx-auto mt-20" />
              )}
            </div>
          ))}

          <div className="mt-20">
            <SectionHeader
              badge="Software"
              title="Software Services"
              subtitle="We provide comprehensive software services using industry-leading CAD and engineering software to deliver precise designs and efficient project execution."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {softwareServices.map((service, index) => (
                <div key={index} className="modern-card p-6 group">
                  <div className="relative h-44 mb-5 bg-dark-50 rounded-xl overflow-hidden">
                    <AnimatedImage
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-contain p-3"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      animationType="rotateIn"
                      delay={index * 100}
                      hoverEffect="shimmer"
                    />
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xl">{service.icon}</span>
                    <h3 className="text-lg font-bold font-display text-dark-900 group-hover:text-primary-700 transition-colors">
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-dark-500 mb-4 text-sm leading-relaxed">{service.description}</p>
                  <ul className="space-y-1.5">
                    {service.features.map((feature, fi) => (
                      <li key={fi} className="flex items-center text-xs text-dark-500">
                        <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20 rounded-3xl bg-dark-50/80 p-8 sm:p-12 border border-dark-100">
            <SectionHeader
              badge="Partners"
              title="Component Brands & Suppliers"
              subtitle="We work with leading manufacturers and suppliers to provide you with the highest quality components and equipment for your automation projects."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {componentBrands.map((component, index) => (
                <div key={index} className="modern-card p-6 group">
                  <div className="relative h-28 mb-4 bg-white rounded-xl">
                    <AnimatedImage
                      src={component.image}
                      alt={component.category}
                      fill
                      className="object-contain p-2"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      animationType="blurIn"
                      delay={index * 80}
                      hoverEffect="scale"
                    />
                  </div>
                  <h3 className="text-lg font-bold font-display text-dark-900 mb-3 group-hover:text-primary-700 transition-colors">
                    {component.category}
                  </h3>
                  <ul className="space-y-1">
                    {component.brands.map((brand, bi) => (
                      <li key={bi} className="text-sm text-dark-500 flex items-center">
                        <span className="w-1 h-1 bg-primary-500 rounded-full mr-2 flex-shrink-0" />
                        {brand}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-20">
            <SectionHeader badge="Process" title="Our Service Process" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <AnimatedProcessStep stepNumber={1} title="Consultation" description="Understanding your requirements and project scope through detailed consultation." index={0} delay={200} />
              <AnimatedProcessStep stepNumber={2} title="Design" description="Creating detailed designs and engineering drawings using advanced CAD software." index={1} delay={200} />
              <AnimatedProcessStep stepNumber={3} title="Manufacturing" description="Precision manufacturing and assembly using state-of-the-art equipment and processes." index={2} delay={200} />
              <AnimatedProcessStep stepNumber={4} title="Delivery" description="Installation, commissioning, and training to ensure optimal performance." index={3} delay={200} />
            </div>
          </div>

          <div className="mt-20">
            <div className="cta-section p-10 sm:p-14 text-center">
              <div className="relative z-10">
                <h2 className="text-mobile-2xl font-bold mb-4">Ready to Start Your Project?</h2>
                <p className="text-lg mb-8 text-primary-100/90 max-w-2xl mx-auto">
                  Our experienced team is ready to help you design and implement the perfect automation solution
                  for your industrial needs. Contact us today for a consultation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact" className="btn-ghost">Get Quote</Link>
                  <Link href="/products" className="btn-outline">View Products</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
