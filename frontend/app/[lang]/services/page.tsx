import Link from 'next/link'
import type { Metadata } from 'next'
import { buildPageMetadata, type SupportedLang, withLang } from '@/lib/seo'
import { getServices } from '@/lib/services-seo'

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const locale = (lang === 'fa' ? 'fa' : 'en') as SupportedLang

  return buildPageMetadata({
    lang: locale,
    path: '/services',
    title: locale === 'fa' ? 'خدمات توسعه وب AnesPy' : 'AnesPy Web Development Services',
    description:
      locale === 'fa'
        ? 'خدمات توسعه Django، SaaS، فول استک و وب اپلیکیشن اختصاصی توسط آنس سلیمان زاده.'
        : 'Professional Django, SaaS, Full Stack, and custom web application development services by AnesPy.',
  })
}

export default async function ServicesPage({ params }: Props) {
  const { lang } = await params
  const locale = (lang === 'fa' ? 'fa' : 'en') as SupportedLang
  const services = getServices(locale)

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <section className="mx-auto max-w-5xl space-y-8">
        <header>
          <h1 className="text-3xl md:text-4xl font-bold">
            {locale === 'fa' ? 'خدمات توسعه وب AnesPy' : 'AnesPy Development Services'}
          </h1>
          <p className="mt-3 text-muted-foreground">
            {locale === 'fa'
              ? 'انتخاب سرویس مناسب برای رشد محصول دیجیتال شما.'
              : 'Choose the right service for your digital product growth.'}
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-5">
          {services.map((service) => (
            <article key={service.slug} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold">{service.title}</h2>
              <p className="mt-3 text-muted-foreground">{service.description}</p>
              <Link
                className="mt-5 inline-flex text-accent font-medium hover:underline"
                href={withLang(locale, `/services/${service.slug}`)}
              >
                {locale === 'fa' ? 'مشاهده جزئیات سرویس' : 'View service details'}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
