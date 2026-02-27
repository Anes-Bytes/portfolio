import type { Metadata } from 'next'
import { ContactSection } from '@/components/contact-section-new'
import { StructuredData } from '@/components/structured-data'
import { getDictionary } from '@/get-dictionary'
import { buildPageMetadata, localBusinessSchema, type SupportedLang } from '@/lib/seo'

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const locale = (lang === 'fa' ? 'fa' : 'en') as SupportedLang
  return buildPageMetadata({
    lang: locale,
    path: '/contact',
    title: locale === 'fa' ? 'تماس با AnesPy' : 'Contact AnesPy',
    description:
      locale === 'fa'
        ? 'تماس با آنس سلیمان زاده برای مشاوره و همکاری توسعه نرم‌افزار.'
        : 'Contact Anes Soleimanzadeh for software consulting and development collaboration.',
  })
}

export default async function ContactPage({ params }: Props) {
  const { lang } = await params
  const locale = (lang === 'fa' ? 'fa' : 'en') as SupportedLang
  const dictionary = await getDictionary(locale)

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <StructuredData data={localBusinessSchema(locale)} />
      <section className="mx-auto max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          {locale === 'fa' ? 'تماس با آنس سلیمان زاده (AnesPy)' : 'Contact Anes Soleimanzadeh (AnesPy)'}
        </h1>
        <ContactSection dictionary={dictionary.contact} />
      </section>
    </main>
  )
}
