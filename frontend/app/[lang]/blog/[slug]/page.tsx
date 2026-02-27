import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, Tag as TagIcon } from 'lucide-react'
import Image from 'next/image'
import type { Metadata } from 'next'
import { ThemeToggle } from '@/components/theme-toggle'
import { StructuredData } from '@/components/structured-data'
import { getBlogPost } from '@/lib/api'
import { getDictionary } from '@/get-dictionary'
import { buildPageMetadata, type SupportedLang, absoluteUrl, withLang } from '@/lib/seo'

type Props = {
  params: Promise<{ lang: string; slug: string }>
}

type HeadingItem = {
  id: string
  text: string
  level: 2 | 3
}

export const revalidate = 86400

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06FF\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

function enrichHeadings(html: string) {
  const toc: HeadingItem[] = []
  const seen = new Map<string, number>()

  const content = html.replace(/<h([23])([^>]*)>(.*?)<\/h\1>/gi, (match, levelStr, attrs, inner) => {
    const text = stripHtml(inner)
    if (!text) {
      return match
    }

    const level = Number(levelStr) as 2 | 3
    const base = slugify(text) || `section-${toc.length + 1}`
    const count = seen.get(base) || 0
    seen.set(base, count + 1)
    const id = count === 0 ? base : `${base}-${count + 1}`

    toc.push({ id, text, level })

    if (/id\s*=\s*["'][^"']+["']/i.test(attrs)) {
      return `<h${level}${attrs}>${inner}</h${level}>`
    }
    return `<h${level}${attrs} id="${id}">${inner}</h${level}>`
  })

  return { content, toc }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params
  const locale = (lang === 'fa' ? 'fa' : 'en') as SupportedLang

  try {
    const post = await getBlogPost(slug, locale)
    return {
      ...buildPageMetadata({
        lang: locale,
        path: `/blog/${slug}`,
        title: post.title,
        description: stripHtml(post.short_description).slice(0, 155),
        image: post.image,
      }),
      openGraph: {
        type: 'article',
        locale: locale === 'fa' ? 'fa_IR' : 'en_US',
        url: absoluteUrl(withLang(locale, `/blog/${slug}`)),
        siteName: 'AnesPy',
        title: post.title,
        description: stripHtml(post.short_description).slice(0, 155),
        images: [{ url: post.image.startsWith('http') ? post.image : absoluteUrl(post.image), width: 1200, height: 630 }],
      },
    }
  } catch {
    return buildPageMetadata({
      lang: locale,
      path: `/blog/${slug}`,
      title: locale === 'fa' ? 'مقاله بلاگ' : 'Blog Post',
      description: locale === 'fa' ? 'صفحه مقاله بلاگ.' : 'Blog post page.',
      noIndex: true,
    })
  }
}

export default async function BlogDetailPage({ params }: Props) {
  const { lang, slug } = await params
  const locale = (lang === 'fa' ? 'fa' : 'en') as SupportedLang
  const dictionary = await getDictionary(locale)

  let post
  try {
    post = await getBlogPost(slug, locale)
  } catch {
    notFound()
  }

  if (!post) {
    notFound()
  }

  const readingTime = Math.max(1, Math.ceil(stripHtml(post.content).split(/\s+/).filter(Boolean).length / 220))
  const enriched = enrichHeadings(post.content)
  const publishedISO = new Date(post.created_at).toISOString()
  const modifiedISO = new Date(post.updated_at).toISOString()

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: stripHtml(post.short_description),
    image: post.image.startsWith('http') ? post.image : absoluteUrl(post.image),
    author: {
      '@type': 'Person',
      name: 'Anes Soleimanzadeh',
      alternateName: 'AnesPy',
    },
    publisher: {
      '@type': 'Organization',
      name: 'AnesPy',
      logo: {
        '@type': 'ImageObject',
        url: absoluteUrl('/icon-light-32x32.png'),
      },
    },
    datePublished: publishedISO,
    dateModified: modifiedISO,
    inLanguage: locale === 'fa' ? 'fa-IR' : 'en',
    mainEntityOfPage: absoluteUrl(withLang(locale, `/blog/${slug}`)),
    keywords: post.tags.map((tag: { name: string }) => tag.name).join(', '),
  }

  return (
    <div className="min-h-screen bg-background p-3 sm:p-4 md:p-6 lg:p-12">
      <StructuredData data={blogSchema} />
      <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="mx-auto max-w-5xl w-full">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className={`w-4 h-4 ${locale === 'fa' ? 'rotate-180' : ''}`} />
          {dictionary.blog.backToPortfolio}
        </Link>

        <article className="bg-card rounded-xl md:rounded-3xl border border-border overflow-hidden">
          <div className="relative aspect-video w-full overflow-hidden bg-secondary">
            <Image src={post.image} alt={post.title} fill className="w-full h-full object-cover" sizes="100vw" priority />
          </div>

          <div className="p-6 md:p-10 lg:p-12">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
              <span className="px-3 py-1 bg-secondary-foreground/10 text-secondary-foreground rounded-full font-medium">
                {post.language_label}
              </span>
              {post.category && (
                <span className="px-3 py-1 bg-accent/10 text-accent rounded-full font-medium">
                  {post.category.name}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {new Date(post.created_at).toLocaleDateString(locale === 'fa' ? 'fa-IR' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span>{readingTime} min read</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed font-medium italic">
              {stripHtml(post.short_description)}
            </p>

            {enriched.toc.length > 0 && (
              <nav aria-label="Table of contents" className="mb-8 rounded-2xl border border-border bg-secondary p-5">
                <h2 className="text-base font-semibold text-foreground mb-3">Table of Contents</h2>
                <ul className="space-y-2 text-sm">
                  {enriched.toc.map((item) => (
                    <li key={item.id} className={item.level === 3 ? 'ml-4' : ''}>
                      <a href={`#${item.id}`} className="text-muted-foreground hover:text-accent transition-colors">
                        {item.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            <div
              className="max-w-none mb-10 text-foreground/90 leading-loose prose prose-neutral dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: enriched.content }}
            />

            <div className="pt-8 border-t border-border">
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <TagIcon className="w-4 h-4" />
                <span className="text-sm font-medium">{dictionary.blog.tags}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: { slug: string; name: string }) => (
                  <span
                    key={tag.slug}
                    className="px-3 py-1 bg-secondary text-secondary-foreground rounded-lg text-xs font-medium"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}
