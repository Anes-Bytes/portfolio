import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

const locales = ['en', 'fa']
const defaultLocale = 'en'

function getPreferredLocale(request: NextRequest) {
  const headers: Record<string, string> = {}
  request.headers.forEach((value, key) => {
    headers[key] = value
  })
  const languages = new Negotiator({ headers }).languages()
  const validLanguages = languages.filter((language) => {
    if (!language || language === '*') return false
    try {
      Intl.getCanonicalLocales(language)
      return true
    } catch {
      return false
    }
  })

  if (validLanguages.length === 0) {
    return defaultLocale
  }

  return matchLocale(validLanguages, locales, defaultLocale)
}

export function proxy(request: NextRequest) {
  const { pathname, host, protocol } = request.nextUrl

  if (pathname !== '/' && pathname.endsWith('/')) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.slice(0, -1)
    return NextResponse.redirect(url, 308)
  }

  if (host.startsWith('www.')) {
    const url = request.nextUrl.clone()
    url.host = host.replace(/^www\./, '')
    return NextResponse.redirect(url, 308)
  }

  if (process.env.NODE_ENV === 'production' && protocol === 'http:') {
    const url = request.nextUrl.clone()
    url.protocol = 'https:'
    return NextResponse.redirect(url, 308)
  }

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    const locale = getPreferredLocale(request)
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    )
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|public|.*\\.(?:png|jpg|jpeg|svg|webp|ico|xml|txt|js|css)$).*)',
  ],
}
