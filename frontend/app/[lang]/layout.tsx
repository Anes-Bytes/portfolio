import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Vazirmatn } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LanguageSwitcherFab } from '@/components/language-switcher-fab'
import { CodePreloader } from '@/components/code-preloader'
import { StructuredData } from '@/components/structured-data'
import { buildPageMetadata, personSchema, websiteSchema, type SupportedLang } from '@/lib/seo'
import '../globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-en',
})

const vazirmatn = Vazirmatn({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-fa',
})

type LayoutProps = Readonly<{
  children: React.ReactNode
  params: Promise<{ lang: string }>
}>

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { lang } = await params
  const locale = (lang === 'fa' ? 'fa' : 'en') as SupportedLang

  return buildPageMetadata({
    lang: locale,
    title:
      locale === 'fa'
        ? 'آنس سلیمان زاده | برنامه نویس فول استک (AnesPy)'
        : 'Anes Soleimanzadeh | Full Stack Developer (AnesPy)',
    description:
      locale === 'fa'
        ? 'رزومه و خدمات توسعه وب آنس سلیمان زاده (AnesPy) - توسعه Django، Next.js و SaaS.'
        : 'Portfolio and services of Anes Soleimanzadeh (AnesPy), Full Stack Developer focused on Django, Next.js, and SaaS.',
    keywords: [
      'Anes Soleimanzadeh',
      'AnesPy',
      'Anes Full Stack Developer',
      'آنس سلیمان زاده',
      'آنس برنامه نویس فول استک',
      'Django Developer',
      'Next.js Developer',
      'Python Backend Developer',
      'Remote Developer Iran',
    ],
  })
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps) {
  const { lang } = await params
  const locale = (lang === 'fa' ? 'fa' : 'en') as SupportedLang
  const isFa = locale === 'fa'

  return (
    <html lang={locale === 'fa' ? 'fa-IR' : 'en'} dir={isFa ? 'rtl' : 'ltr'}>
      <body className={`${plusJakarta.variable} ${vazirmatn.variable} font-sans antialiased`}>
        <CodePreloader lang={locale} />
        <StructuredData data={personSchema(locale)} />
        <StructuredData data={websiteSchema(locale)} />
        {children}
        <LanguageSwitcherFab />
        <Analytics />
      </body>
    </html>
  )
}
