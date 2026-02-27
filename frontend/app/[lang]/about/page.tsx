import type { Metadata } from 'next'
import { getPortfolioData } from '@/lib/api'
import { buildPageMetadata, type SupportedLang } from '@/lib/seo'

type Props = {
  params: Promise<{ lang: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const locale = (lang === 'fa' ? 'fa' : 'en') as SupportedLang
  return buildPageMetadata({
    lang: locale,
    path: '/about',
    title: locale === 'fa' ? 'درباره آنس سلیمان زاده | AnesPy' : 'About Anes Soleimanzadeh | AnesPy',
    description:
      locale === 'fa'
        ? 'آنس سلیمان زاده (AnesPy)، برنامه نویس فول استک و توسعه دهنده Django و Next.js.'
        : 'About Anes Soleimanzadeh (AnesPy), Full Stack Developer, Django Developer, and Next.js specialist.',
  })
}

export default async function AboutPage({ params }: Props) {
  const { lang } = await params
  const locale = (lang === 'fa' ? 'fa' : 'en') as SupportedLang
  const data = await getPortfolioData(locale)

  return (
    <main className="min-h-screen bg-background p-4 md:p-8">
      <article className="mx-auto max-w-4xl space-y-8">
        <header>
          <h1 className="text-3xl md:text-4xl font-bold">
            {locale === 'fa'
              ? 'آنس سلیمان زاده (AnesPy) - برنامه نویس فول استک'
              : 'Anes Soleimanzadeh (AnesPy) - Full Stack Developer'}
          </h1>
          <p className="mt-3 text-muted-foreground">{data.profile.title}</p>
        </header>

        <section className="space-y-4 text-muted-foreground leading-8">
          {data.profile.about_me.split('\n\n').map((paragraph: string, idx: number) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">{locale === 'fa' ? 'تخصص‌ها' : 'Core Expertise'}</h2>
          <ul className="grid sm:grid-cols-2 gap-3 list-disc pl-6">
            <li>Django Developer</li>
            <li>Python Backend Developer</li>
            <li>Next.js Developer</li>
            <li>SaaS Developer</li>
            <li>Remote Developer Iran</li>
            <li>{locale === 'fa' ? 'توسعه فول استک' : 'Full Stack Development'}</li>
          </ul>
        </section>
      </article>
    </main>
  )
}
