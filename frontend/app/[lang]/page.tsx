import { getPortfolioData } from '@/lib/api'
import { APIResponse } from '@/lib/types'
import { HomeClient } from '@/components/home-client'
import { Metadata } from 'next'
import { getDictionary } from '@/get-dictionary'
import { StructuredData } from '@/components/structured-data'
import { buildPageMetadata, type SupportedLang, withLang, absoluteUrl } from '@/lib/seo'

type Props = {
  params: Promise<{ lang: string }>
}

export const revalidate = 86400

function BackendUnavailableState({ locale }: { locale: SupportedLang }) {
  const isFa = locale === 'fa'
  return (
    <div className="min-h-screen bg-[#070b12] p-3 sm:p-4 md:p-6 lg:p-12 flex items-center justify-center text-slate-100">
      <div className="preload-shell w-[min(92vw,560px)] rounded-2xl border border-slate-700/80 bg-[#0b111b]/95 p-5 shadow-2xl shadow-black/60">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="font-mono text-[10px] tracking-widest text-slate-400">BACKEND:OFFLINE</span>
        </div>
        <div className="preload-noise mb-3 h-px w-full bg-slate-700/70" />
        <div className="font-mono text-xs sm:text-sm text-slate-200 space-y-1">
          <p className="preload-line preload-line-1">{`> connect api.aness.ir`}</p>
          <p className="preload-line preload-line-2">{`> fetch /api/portfolio/`}</p>
          <p className="preload-line preload-line-3 text-destructive">{`> status :: unavailable`}</p>
          <p className="mt-3 text-slate-400">
            {isFa
              ? 'Ø§Ø±ØªØ¨Ø§Ø· Ø¨Ø§ Ø¨Ú©â€ŒØ§Ù†Ø¯ Ø¨Ø±Ù‚Ø±Ø§Ø± Ù†Ø´Ø¯. Ù„Ø·ÙØ§ Ú†Ù†Ø¯ Ù„Ø­Ø¸Ù‡ Ø¨Ø¹Ø¯ Ø¯ÙˆØ¨Ø§Ø±Ù‡ ØªÙ„Ø§Ø´ Ú©Ù†ÛŒØ¯.'
              : 'Backend is currently unavailable. Please try again shortly.'}
          </p>
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span className="h-3.5 w-3.5 animate-spin rounded-full border border-accent/35 border-t-accent" />
          <span className="font-mono text-[10px] tracking-wider text-accent/90">
            {isFa ? 'RETRYING' : 'RETRYING'}
          </span>
        </div>
      </div>
    </div>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params
  const locale = (lang === 'fa' ? 'fa' : 'en') as SupportedLang
  try {
    const data: APIResponse = await getPortfolioData(lang)
    const dynamicKeywords = Array.from(
      new Set(
        [
          ...data.portfolio.projects.flatMap((project) => [project.title, ...project.tech]),
          ...data.blog.flatMap((post) => [post.title, ...(post.tags?.map((tag) => tag.name) || [])]),
        ]
          .map((value) => value.trim())
          .filter(Boolean)
      )
    ).slice(0, 20)

    return {
      ...buildPageMetadata({
        lang: locale,
        title:
          locale === 'fa'
            ? `Ø¢Ù†Ø³ Ø³Ù„ÛŒÙ…Ø§Ù† Ø²Ø§Ø¯Ù‡ (AnesPy) | Ø¨Ø±Ù†Ø§Ù…Ù‡ Ù†ÙˆÛŒØ³ ÙÙˆÙ„ Ø§Ø³ØªÚ©`
            : `${data.profile.name} (AnesPy) | Full Stack Developer`,
        description:
          locale === 'fa'
            ? 'Ù¾ÙˆØ±ØªÙÙˆÙ„ÛŒÙˆ Ùˆ Ø®Ø¯Ù…Ø§Øª ØªÙˆØ³Ø¹Ù‡ ÙˆØ¨ Ø¢Ù†Ø³ Ø³Ù„ÛŒÙ…Ø§Ù† Ø²Ø§Ø¯Ù‡ØŒ ØªÙˆØ³Ø¹Ù‡ Ø¯Ù‡Ù†Ø¯Ù‡ Django Ùˆ Next.js Ø¯Ø± Ø§ÛŒØ±Ø§Ù†.'
            : `${data.profile.name} portfolio: Django Developer, SaaS Developer, Python Backend and Next.js Full Stack services from Iran.`,
        keywords: [
          'Anes Soleimanzadeh',
          'AnesPy',
          'Anes Full Stack Developer',
          'Ø¢Ù†Ø³ Ø³Ù„ÛŒÙ…Ø§Ù† Ø²Ø§Ø¯Ù‡',
          'Ø¢Ù†Ø³ Ø¨Ø±Ù†Ø§Ù…Ù‡ Ù†ÙˆÛŒØ³ ÙÙˆÙ„ Ø§Ø³ØªÚ©',
          'Django Developer',
          'SaaS Developer',
          'Python Backend Developer',
          'Next.js Developer',
          'Remote Developer Iran',
          ...dynamicKeywords,
        ],
        image: data.profile.avatar,
      }),
      icons: { icon: data.profile.avatar, apple: data.profile.avatar },
    }
  } catch (e) {
    return buildPageMetadata({
      lang: locale,
      title: locale === 'fa' ? 'Ù¾ÙˆØ±ØªÙÙˆÙ„ÛŒÙˆ AnesPy' : 'AnesPy Portfolio',
      description:
        locale === 'fa'
          ? 'Ù¾ÙˆØ±ØªÙÙˆÙ„ÛŒÙˆ Ùˆ Ø®Ø¯Ù…Ø§Øª ØªÙˆØ³Ø¹Ù‡ ÙÙˆÙ„ Ø§Ø³ØªÚ© Ø¢Ù†Ø³ Ø³Ù„ÛŒÙ…Ø§Ù† Ø²Ø§Ø¯Ù‡.'
          : 'Full stack portfolio and services by Anes Soleimanzadeh.',
      noIndex: true,
    })
  }
}

export default async function Home({ params }: Props) {
  const { lang } = await params
  const locale = (lang === 'fa' ? 'fa' : 'en') as SupportedLang
  const dictionary = await getDictionary(lang as 'en' | 'fa')
  let dynamicData: APIResponse
  try {
    dynamicData = await getPortfolioData(lang)
  } catch {
    return <BackendUnavailableState locale={locale} />
  }

  // Prepare data for components
  const profile = dynamicData.profile
  const profileData = {
    name: profile.name,
    title: profile.title,
    email: profile.email,
    phone: profile.phone || '',
    avatar: profile.avatar,
    birthday: profile.birthday,
    location: profile.location,
    social: {
      github: profile.github,
      telegram: profile.telegram,
      linkedin: profile.linkedin,
    }
  }

  const aboutData = {
    description: profile.about_me.split('\n\n'),
    services: profile.services.map(s => ({
      icon: s.icon,
      title: s.title,
      description: s.description
    })),
  }

  const resume = dynamicData.resume
  const finalResumeData = {
    education: resume.education,
    experience: resume.experience,
    skills: resume.skills
  }

  const portfolio = dynamicData.portfolio
  const finalPortfolioData = {
    categories: portfolio.categories,
    projects: portfolio.projects.map(p => ({
      title: p.title,
      category: p.category_name,
      image: p.image,
      description: p.description,
      tech: p.tech,
      liveUrl: p.live_url,
      githubUrl: p.github_url
    }))
  }

  const blogPosts = dynamicData.blog || []
  const projectItems = dynamicData.portfolio.projects || []

  const servicesSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: locale === 'fa' ? 'Ø®Ø¯Ù…Ø§Øª AnesPy' : 'AnesPy Services',
    itemListElement: [
      {
        '@type': 'Service',
        name: 'Django Developer',
        url: absoluteUrl(withLang(locale, '/services/django-developer')),
      },
      {
        '@type': 'Service',
        name: 'SaaS Platform Development',
        url: absoluteUrl(withLang(locale, '/services/saas-platform-development')),
      },
      {
        '@type': 'Service',
        name: 'Full Stack Development',
        url: absoluteUrl(withLang(locale, '/services/full-stack-development')),
      },
      {
        '@type': 'Service',
        name: 'Custom Web Application Development',
        url: absoluteUrl(withLang(locale, '/services/custom-web-application-development')),
      },
    ],
  }

  const projectsSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: locale === 'fa' ? 'Ù¾Ø±ÙˆÚ˜Ù‡â€ŒÙ‡Ø§' : 'Projects',
    itemListElement: projectItems.map((project, index) => ({
      '@type': 'CreativeWork',
      position: index + 1,
      name: project.title,
      description: project.description,
      image: project.image.startsWith('http') ? project.image : absoluteUrl(project.image),
      keywords: project.tech.join(', '),
      url: project.live_url || project.github_url || absoluteUrl(withLang(locale)),
    })),
  }

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: locale === 'fa' ? 'Ù…Ù‚Ø§Ù„Ø§Øª Ø¨Ù„Ø§Ú¯' : 'Blog Posts',
    itemListElement: blogPosts.map((post, index) => ({
      '@type': 'BlogPosting',
      position: index + 1,
      headline: post.title,
      description: post.short_description,
      image: post.image.startsWith('http') ? post.image : absoluteUrl(post.image),
      datePublished: post.created_at,
      dateModified: post.updated_at,
      inLanguage: locale === 'fa' ? 'fa-IR' : 'en',
      url: absoluteUrl(withLang(locale, `/blog/${post.slug}`)),
    })),
  }

  return (
    <>
      <StructuredData data={[servicesSchema, projectsSchema, blogSchema]} />
      <HomeClient
      profileData={profileData}
      aboutData={aboutData}
      resumeData={finalResumeData}
      portfolioData={finalPortfolioData}
      blogPosts={blogPosts}
      githubData={dynamicData.github}
      lang={lang}
      dictionary={dictionary}
    />
    </>
  )
}

