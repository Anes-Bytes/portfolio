import type { Metadata } from 'next'

export type SupportedLang = 'en' | 'fa'

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://aness.ir').replace(/\/$/, '')
export const SITE_NAME = 'AnesPy'
export const PERSON_NAME = 'Anes Soleimanzadeh'

const DEFAULT_OG = '/professional-developer-avatar.png'

export function absoluteUrl(path: string): string {
  if (!path.startsWith('/')) {
    return `${SITE_URL}/${path}`
  }
  return `${SITE_URL}${path}`
}

export function withLang(lang: SupportedLang, path = ''): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `/${lang}${normalized === '/' ? '' : normalized}`
}

export function buildAlternates(pathWithoutLang = '') {
  return {
    canonical: absoluteUrl(withLang('en', pathWithoutLang)),
    languages: {
      'en': absoluteUrl(withLang('en', pathWithoutLang)),
      'fa-IR': absoluteUrl(withLang('fa', pathWithoutLang)),
      'x-default': absoluteUrl(withLang('en', pathWithoutLang)),
    },
  }
}

type PageSeoInput = {
  lang: SupportedLang
  path?: string
  title: string
  description: string
  keywords?: string[]
  image?: string
  noIndex?: boolean
}

export function buildPageMetadata({
  lang,
  path = '',
  title,
  description,
  keywords = [],
  image = DEFAULT_OG,
  noIndex = false,
}: PageSeoInput): Metadata {
  const route = withLang(lang, path)
  const url = absoluteUrl(route)
  const ogImage = image.startsWith('http') ? image : absoluteUrl(image)

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
      languages: {
        en: absoluteUrl(withLang('en', path)),
        'fa-IR': absoluteUrl(withLang('fa', path)),
        'x-default': absoluteUrl(withLang('en', path)),
      },
    },
    openGraph: {
      type: 'website',
      locale: lang === 'fa' ? 'fa_IR' : 'en_US',
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      creator: '@AnesPy',
    },
    robots: noIndex
      ? { index: false, follow: false, nocache: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' } },
  }
}

export function personSchema(lang: SupportedLang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PERSON_NAME,
    alternateName: 'AnesPy',
    url: absoluteUrl(withLang(lang)),
    jobTitle: lang === 'fa' ? 'برنامه نویس فول استک' : 'Full Stack Developer',
    nationality: 'Iran',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IR',
    },
    sameAs: ['https://t.me/AnesPy'],
  }
}

export function websiteSchema(lang: SupportedLang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    alternateName: PERSON_NAME,
    url: absoluteUrl(withLang(lang)),
    inLanguage: lang === 'fa' ? 'fa-IR' : 'en',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/${lang}/blog/{search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }
}

export function localBusinessSchema(lang: SupportedLang) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    alternateName: PERSON_NAME,
    url: absoluteUrl(withLang(lang)),
    areaServed: 'IR',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IR',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      availableLanguage: ['en', 'fa'],
      url: 'https://t.me/AnesPy',
    },
  }
}
