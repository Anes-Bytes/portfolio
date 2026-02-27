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
    path: '/project-request',
    title: locale === 'fa' ? 'درخواست پروژه | AnesPy' : 'Project Request | AnesPy',
    description:
      locale === 'fa'
        ? 'ثبت درخواست پروژه توسعه وب و نرم‌افزار با AnesPy.'
        : 'Submit your web and software project request to AnesPy.',
  })
}

export default async function ProjectRequestPage({ params }: Props) {
  const { lang } = await params
  const locale = (lang === 'fa' ? 'fa' : 'en') as SupportedLang
  const dictionary = await getDictionary(locale)

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <StructuredData data={localBusinessSchema(locale)} />
      <section className="mx-auto max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">
          {locale === 'fa' ? 'فرم درخواست پروژه' : 'Project Request Form'}
        </h1>
        <ContactSection dictionary={dictionary.contact} />
      </section>
    </main>
  )
}
