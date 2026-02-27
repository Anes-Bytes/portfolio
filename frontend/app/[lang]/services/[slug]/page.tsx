import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { StructuredData } from '@/components/structured-data'
import { buildPageMetadata, type SupportedLang, absoluteUrl, withLang } from '@/lib/seo'
import { getServiceBySlug } from '@/lib/services-seo'

type Props = {
  params: Promise<{ lang: string; slug: string }>
}

function buildFaqSchema(faq: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a,
      },
    })),
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  const locale = (lang === 'fa' ? 'fa' : 'en') as SupportedLang
  const service = getServiceBySlug(locale, slug)

  if (!service) {
    return buildPageMetadata({
      lang: locale,
      path: `/services/${slug}`,
      title: locale === 'fa' ? 'سرویس پیدا نشد' : 'Service Not Found',
      description: locale === 'fa' ? 'این سرویس موجود نیست.' : 'This service does not exist.',
      noIndex: true,
    })
  }

  return buildPageMetadata({
    lang: locale,
    path: `/services/${slug}`,
    title: service.title.slice(0, 58),
    description: service.description.slice(0, 156),
  })
}

export default async function ServiceDetailPage({ params }: Props) {
  const { lang, slug } = await params
  const locale = (lang === 'fa' ? 'fa' : 'en') as SupportedLang
  const service = getServiceBySlug(locale, slug)

  if (!service) {
    notFound()
  }

  const faqSchema = buildFaqSchema(service.faq)
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    provider: {
      '@type': 'Person',
      name: 'Anes Soleimanzadeh',
      alternateName: 'AnesPy',
    },
    areaServed: 'IR',
    availableLanguage: ['en', 'fa'],
    url: absoluteUrl(withLang(locale, `/services/${service.slug}`)),
  }

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <StructuredData data={[serviceSchema, faqSchema]} />
      <section className="mx-auto max-w-4xl space-y-8">
        <header className="space-y-4">
          <Link href={withLang(locale, '/services')} className="text-sm text-accent hover:underline">
            {locale === 'fa' ? 'بازگشت به خدمات' : 'Back to services'}
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">{service.title}</h1>
          <p className="text-lg text-muted-foreground">{service.hero}</p>
        </header>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{locale === 'fa' ? 'آنچه دریافت می‌کنید' : 'What You Get'}</h2>
          <ul className="space-y-3 list-disc pl-6">
            {service.details.map((detail) => (
              <li key={detail} className="text-muted-foreground">
                {detail}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
          <div className="space-y-4">
            {service.faq.map((item) => (
              <article key={item.q} className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-semibold">{item.q}</h3>
                <p className="mt-2 text-muted-foreground">{item.a}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-accent/30 bg-accent/5 p-6">
          <h2 className="text-xl font-semibold">{locale === 'fa' ? 'شروع همکاری' : 'Start Your Project'}</h2>
          <p className="mt-2 text-muted-foreground">
            {locale === 'fa'
              ? 'برای دریافت پلن فنی و زمان‌بندی پروژه، درخواست خود را ثبت کنید.'
              : 'Submit your requirements to receive a technical plan and timeline.'}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link className="rounded-lg bg-accent px-4 py-2 text-accent-foreground font-medium" href={withLang(locale, '/project-request')}>
              {locale === 'fa' ? 'ثبت درخواست پروژه' : 'Request a Project'}
            </Link>
            <Link className="rounded-lg border border-border px-4 py-2 font-medium hover:border-accent" href={withLang(locale, '/contact')}>
              {locale === 'fa' ? 'تماس مستقیم' : 'Contact'}
            </Link>
          </div>
        </section>
      </section>
    </main>
  )
}
