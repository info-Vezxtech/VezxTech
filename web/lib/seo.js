export const siteConfig = {
  name: 'VezxTech',
  description: 'Professional websites for local businesses - clinics, salons, electronics stores, and boutiques',
  url: 'https://vezxtech.com',
  ogImage: 'https://vezxtech.com/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/vezxtech',
    facebook: 'https://facebook.com/vezxtech',
    instagram: 'https://instagram.com/vezxtech',
  },
  keywords: [
    'website builder',
    'local business websites',
    'affordable web design',
    'clinic website',
    'salon website',
    'shop website',
    'professional websites',
    'Bengaluru web design',
    'small business websites',
    'freelance web developer',
    'responsive web design',
    'custom domain websites',
    'ecommerce websites',
    'SEO friendly websites',
    'mobile-friendly websites',
    'student web developers',
    'website maintenance',
    'website support',
    'VezxTech',
    'website packages',
    'website templates',
    'business growth online',
    'digital presence for local businesses',
    'website solutions India',
    'affordable website packages',
    'small business online presence',
    'professional web solutions',
    'local business digital solutions',
  ],
}

export const jsonLdWebsite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: siteConfig.name,
  description: siteConfig.description,
  url: siteConfig.url,
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteConfig.url}/search?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
}

export const jsonLdOrganization = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  description: siteConfig.description,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Mumbai',
    addressRegion: 'MH',
    addressCountry: 'IN',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+91-98765-43210',
    contactType: 'Customer Service',
    email: 'info@vezxtech.com',
  },
  sameAs: [
    siteConfig.links.twitter,
    siteConfig.links.facebook,
    siteConfig.links.instagram,
  ],
}

export const jsonLdService = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Website Development',
  provider: {
    '@type': 'Organization',
    name: siteConfig.name,
  },
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Website Packages',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Basic Website Package',
          description: 'One-page responsive website',
        },
        price: '2999',
        priceCurrency: 'INR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Standard Website Package',
          description: 'Multi-page website with advanced features',
        },
        price: '4999',
        priceCurrency: 'INR',
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Premium Website Package',
          description: 'Complete solution with custom domain',
        },
        price: '7999',
        priceCurrency: 'INR',
      },
    ],
  },
}
