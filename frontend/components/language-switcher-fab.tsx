'use client'

import Link from 'next/link'
import { Languages } from 'lucide-react'
import { usePathname } from 'next/navigation'

export function LanguageSwitcherFab() {
  const pathname = usePathname()
  const currentLang = pathname.startsWith('/fa') ? 'fa' : 'en'
  const nextLang = currentLang === 'en' ? 'fa' : 'en'

  const targetPath =
    pathname.replace(/^\/(en|fa)(?=\/|$)/, `/${nextLang}`) || `/${nextLang}`

  return (
    <Link
      href={targetPath}
      className="fixed bottom-5 left-5 z-50 inline-flex items-center gap-2 rounded-full border border-border bg-card/90 px-4 py-2 text-sm font-medium text-foreground shadow-lg backdrop-blur hover:border-accent hover:text-accent transition-colors"
      aria-label={nextLang === 'fa' ? 'Switch to Persian' : 'Switch to English'}
    >
      <Languages className="h-4 w-4" />
      {nextLang === 'fa' ? 'فارسی' : 'English'}
    </Link>
  )
}
