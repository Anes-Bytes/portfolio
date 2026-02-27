import { APIResponse } from './types';
import { aboutData, blogData, portfolioData, profileData, resumeData } from './portfolio-data';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.aness.ir/api';
const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, '');
const SUPPORTED_LANGS = ['en', 'fa'] as const;
type GetPortfolioDataOptions = {
  fallbackToLocal?: boolean;
};

function resolveAssetUrl(value: string | null | undefined): string {
  if (!value) {
    return '/placeholder.svg';
  }
  if (value.startsWith('http://') || value.startsWith('https://')) {
    return value;
  }

  const normalized = value.replace(/^\/+/, '');
  const isBackendMediaPath =
    normalized.startsWith('media/') ||
    normalized.startsWith('profile/') ||
    normalized.startsWith('projects/') ||
    normalized.startsWith('blog/');

  if (value.startsWith('/')) {
    return isBackendMediaPath ? `${API_ORIGIN}/${normalized}` : value;
  }

  return isBackendMediaPath ? `${API_ORIGIN}/${normalized}` : `/${normalized}`;
}

function normalizeApiResponse(data: APIResponse): APIResponse {
  return {
    ...data,
    profile: {
      ...data.profile,
      avatar: resolveAssetUrl(data.profile.avatar),
    },
    portfolio: {
      ...data.portfolio,
      projects: data.portfolio.projects.map((project) => ({
        ...project,
        image: resolveAssetUrl(project.image),
      })),
    },
    blog: data.blog.map((post) => ({
      ...post,
      image: resolveAssetUrl(post.image),
    })),
  };
}

function buildFallbackPortfolioData(): APIResponse {
  return {
    profile: {
      name: profileData.name,
      title: profileData.title,
      email: profileData.email,
      phone: profileData.phone,
      avatar: profileData.avatar,
      birthday: profileData.birthday,
      location: profileData.location,
      github: profileData.social.github,
      telegram: (profileData.social as { telegram?: string }).telegram || '',
      linkedin: (profileData.social as { linkedin?: string }).linkedin || '',
      about_me: aboutData.description.join('\n\n'),
      services: aboutData.services.map((service, index) => ({
        icon: service.icon,
        title: service.title,
        description: service.description,
        order: index + 1,
      })),
    },
    resume: resumeData,
    portfolio: {
      categories: portfolioData.categories,
      projects: portfolioData.projects.map((project) => ({
        title: project.title,
        category_name: project.category,
        image: project.image,
        description: project.description,
        tech: project.tech,
        live_url: project.liveUrl,
        github_url: project.githubUrl,
      })),
    },
    blog: blogData.posts.map((post, index) => ({
      id: index + 1,
      title: post.title,
      slug: post.slug,
      image: post.image,
      content: post.excerpt,
      short_description: post.excerpt,
      language: post.language === 'fa' ? 'fa' : 'en',
      language_label: post.language === 'fa' ? 'فارسی' : 'English',
      category: {
        name: post.category,
        slug: post.category.toLowerCase().replace(/\s+/g, '-'),
      },
      tags: post.tags.map((tag) => ({
        name: tag,
        slug: tag.toLowerCase().replace(/\s+/g, '-'),
      })),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })),
    github: {
      user_stats: {
        public_repos: 0,
        followers: 0,
        following: 0,
        stars: 0,
      },
      recent_repos: [],
    },
  };
}

export async function getPortfolioData(
  lang: string = 'en',
  options: GetPortfolioDataOptions = {}
) {
  const { fallbackToLocal = true } = options;
  const fetchPortfolioByLang = async (targetLang: string) => {
    const res = await fetch(`${API_BASE_URL}/portfolio/`, {
      cache: 'force-cache',
      next: { revalidate: 86400, tags: [`portfolio-${targetLang}`] },
      headers: {
        'Accept-Language': targetLang,
      },
    });

    if (!res.ok) {
      throw new Error(`Portfolio API request failed (${res.status}) for ${targetLang}`);
    }

    const data: APIResponse = await res.json();
    return normalizeApiResponse(data);
  };

  try {
    const requestedLang = lang === 'fa' ? 'fa' : 'en';
    const alternateLang = requestedLang === 'fa' ? 'en' : 'fa';

    const [requestedResult, alternateResult] = await Promise.allSettled([
      fetchPortfolioByLang(requestedLang),
      fetchPortfolioByLang(alternateLang),
    ]);

    const requestedData =
      requestedResult.status === 'fulfilled' ? requestedResult.value : null;
    const alternateData =
      alternateResult.status === 'fulfilled' ? alternateResult.value : null;

    const baseData = requestedData || alternateData;
    if (!baseData) {
      if (!fallbackToLocal) {
        throw new Error('Portfolio API is unreachable for both languages.');
      }
      console.warn('Portfolio API is unreachable for both languages. Falling back to local data.');
      return buildFallbackPortfolioData();
    }

    const mergedBlogMap = new Map<number, APIResponse['blog'][number]>();
    const sourceBlogs = [
      ...(requestedData?.blog || []),
      ...(alternateData?.blog || []),
    ];

    for (const post of sourceBlogs) {
      const existing = mergedBlogMap.get(post.id);
      if (!existing) {
        mergedBlogMap.set(post.id, post);
        continue;
      }

      mergedBlogMap.set(post.id, {
        ...existing,
        ...post,
        slug: existing.slug || post.slug,
        image: existing.image || post.image,
        short_description: existing.short_description || post.short_description,
        content: existing.content || post.content,
      });
    }

    return {
      ...baseData,
      blog: Array.from(mergedBlogMap.values()).sort((a, b) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }),
    };
  } catch (error) {
    if (!fallbackToLocal) {
      throw error;
    }
    console.warn('Portfolio API is unreachable. Falling back to local data.', error);
    return buildFallbackPortfolioData();
  }
}

export async function getBlogPost(slug: string, lang: string = 'en') {
  const preferredLang = lang === 'fa' ? 'fa' : 'en';
  const languageOrder = [preferredLang, ...SUPPORTED_LANGS.filter((l) => l !== preferredLang)];
  let lastError: unknown = null;

  for (const targetLang of languageOrder) {
    try {
      const res = await fetch(`${API_BASE_URL}/blog/${slug}/`, {
        cache: 'force-cache',
        next: { revalidate: 86400, tags: [`blog-${targetLang}-${slug}`] },
        headers: {
          'Accept-Language': targetLang,
        },
      });

      if (!res.ok) {
        lastError = new Error(`Failed to fetch blog post (${res.status}) for ${targetLang}`);
        continue;
      }

      const post = await res.json();
      return {
        ...post,
        image: resolveAssetUrl(post.image),
      };
    } catch (error) {
      lastError = error;
    }
  }

  throw (lastError instanceof Error ? lastError : new Error('Failed to fetch blog post'));
}

export async function submitProjectRequest(data: {
  full_name: string;
  project_title: string;
  description: string;
  contact_info: string;
}) {
  const res = await fetch(`${API_BASE_URL}/project-request/`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.detail || 'Failed to submit project request');
  }
  return res.json();
}
