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
            ? `آنس سلیمان زاده (AnesPy) | برنامه نویس فول استک`
            : `${data.profile.name} (AnesPy) | Full Stack Developer`,
        description:
          locale === 'fa'
            ? 'پورتفولیو و خدمات توسعه وب آنس سلیمان زاده، توسعه دهنده Django و Next.js در ایران.'
            : `${data.profile.name} portfolio: Django Developer, SaaS Developer, Python Backend and Next.js Full Stack services from Iran.`,
        keywords: [
          'Anes Soleimanzadeh',
          'AnesPy',
          'Anes Full Stack Developer',
          'آنس سلیمان زاده',
          'آنس برنامه نویس فول استک',
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
      title: locale === 'fa' ? 'پورتفولیو AnesPy' : 'AnesPy Portfolio',
      description:
        locale === 'fa'
          ? 'پورتفولیو و خدمات توسعه فول استک آنس سلیمان زاده.'
          : 'Full stack portfolio and services by Anes Soleimanzadeh.',
    })
  }
}

export default async function Home({ params }: Props) {
  const { lang } = await params
  const locale = (lang === 'fa' ? 'fa' : 'en') as SupportedLang
  const dictionary = await getDictionary(lang as 'en' | 'fa')
  const dynamicData: APIResponse = await getPortfolioData(lang)

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
    name: locale === 'fa' ? 'خدمات AnesPy' : 'AnesPy Services',
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
    name: locale === 'fa' ? 'پروژه‌ها' : 'Projects',
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
    name: locale === 'fa' ? 'مقالات بلاگ' : 'Blog Posts',
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
