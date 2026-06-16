import { asset } from '@/lib/asset'

export default function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "TM Tech Solutions",
    "description": "Leading provider of innovative automation and fabrication solutions in Pune. Special Purpose Machines, Custom Automation, Fabrication Work, and Industrial Components.",
    "url": "https://tmtechsolutions.com",
    "logo": `https://tmtechsolutions.com${asset('/images/LOGO.jpg')}`,
    "foundingDate": "2021",
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "Flat 501, Royal C wing, Bhagyoday Nagar",
        "addressLocality": "Kondhwa",
        "addressRegion": "Pune",
        "postalCode": "411048",
        "addressCountry": "IN",
        "addressType": "Design Office"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Shop No.5, lane No 02, Gulve Wasti-Shanti Nagar",
        "addressLocality": "Bhosari",
        "addressRegion": "Pune",
        "postalCode": "411026",
        "addressCountry": "IN",
        "addressType": "Assembly Hub"
      }
    ],
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+91-7263940902",
        "contactType": "customer service",
        "availableLanguage": ["English", "Hindi"]
      },
      {
        "@type": "ContactPoint",
        "email": "tmtechsolutions11@gmail.com",
        "contactType": "customer service"
      }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/tm-tech-solutions",
      "https://www.facebook.com/tmtechsolutions"
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": 18.47484752491511,
        "longitude": 73.88702092774074
      },
      "geoRadius": "50000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Automation and Fabrication Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Special Purpose Machine Design",
            "description": "Custom SPM design and manufacturing for industrial automation"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Fabrication Work",
            "description": "Stainless Steel, Mild Steel, and Aluminium fabrication services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Industrial Components",
            "description": "Supply of pneumatics, hydraulics, electrical components, motors, sensors, and bearings"
          }
        }
      ]
    },
    "openingHours": "Mo-Sa 08:30-17:30",
    "priceRange": "$$"
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
