'use client'

import { Calendar, ArrowRight } from 'lucide-react'
import { BlogPostData } from '@/lib/types'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import Image from 'next/image'

interface BlogSectionProps {
  data: BlogPostData[]
  dictionary: {
    title: string
    noPosts: string
    readMore: string
  }
}

export function BlogSection({ data, dictionary }: BlogSectionProps) {
  const params = useParams()
  const lang = (params.lang as string) || 'en'
  const stripHtml = (value: string) => value.replace(/<[^>]*>/g, '').trim()
  const getReadingTime = (text: string) => {
    const words = stripHtml(text).split(/\s+/).filter(Boolean).length
    return Math.max(1, Math.ceil(words / 220))
  }

  if (!data || data.length === 0) {
    return (
      <div className="space-y-6 md:space-y-8">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{dictionary.title}</h2>
          <div className="w-10 h-1 bg-accent rounded-full mb-6" />
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">{dictionary.noPosts}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">{dictionary.title}</h2>
        <div className="w-10 h-1 bg-accent rounded-full mb-6" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {data.map((post) => (
          <article
            key={post.id}
            className="group bg-secondary rounded-xl md:rounded-2xl border border-border overflow-hidden hover:border-accent hover:shadow-lg hover:shadow-accent/10 transition-all duration-300"
          >
            <div className="relative aspect-video overflow-hidden bg-background">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4 md:p-5">
              <div className="flex items-center gap-2 flex-wrap text-xs text-muted-foreground mb-3">
                <span className="px-2.5 md:px-3 py-0.5 md:py-1 bg-secondary-foreground/10 text-secondary-foreground rounded-full font-medium">
                  {post.language_label}
                </span>
                {post.category && (
                  <span className="px-2.5 md:px-3 py-0.5 md:py-1 bg-accent/10 text-accent rounded-full font-medium">
                    {post.category.name}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  {new Date(post.created_at).toLocaleDateString(lang === 'fa' ? 'fa-IR' : 'en-US')}
                </span>
                <span>{getReadingTime(post.content)} min read</span>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-foreground mb-3 leading-tight group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                {stripHtml(post.short_description)}
              </p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 md:py-1 bg-background rounded text-muted-foreground"
                  >
                    #{tag.name}
                  </span>
                ))}
              </div>

              {/* Read More Link */}
              <Link
                href={`/${lang}/blog/${post.slug}`}
                className="flex items-center gap-2 text-xs md:text-sm text-accent hover:gap-3 transition-all font-medium"
              >
                {dictionary.readMore}
                <ArrowRight className={`w-3.5 h-3.5 md:w-4 md:h-4 ${lang === 'fa' ? 'rotate-180' : ''}`} />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}
