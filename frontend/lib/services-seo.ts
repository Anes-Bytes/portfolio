import type { SupportedLang } from './seo'

export type ServiceSlug =
  | 'django-developer'
  | 'saas-platform-development'
  | 'full-stack-development'
  | 'custom-web-application-development'

type FAQItem = {
  q: string
  a: string
}

type ServiceContent = {
  slug: ServiceSlug
  title: string
  description: string
  hero: string
  details: string[]
  faq: FAQItem[]
}

const enServices: ServiceContent[] = [
  {
    slug: 'django-developer',
    title: 'Django Developer',
    description: 'Hire AnesPy for scalable Django backend development with secure APIs and fast delivery.',
    hero: 'Django backend architecture, REST APIs, and production deployment for fast-growing products.',
    details: [
      'Designing modular Django architectures for long-term maintainability.',
      'Building secure REST APIs with authentication, role access, and performance tuning.',
      'Integrating admin workflows, CMS features, and reporting for business teams.',
    ],
    faq: [
      { q: 'Do you work on existing Django projects?', a: 'Yes. I can audit, refactor, and scale existing Django codebases.' },
      { q: 'Can you build APIs for a Next.js frontend?', a: 'Yes. I specialize in Django REST Framework + Next.js integrations.' },
    ],
  },
  {
    slug: 'saas-platform-development',
    title: 'SaaS Platform Development',
    description: 'End-to-end SaaS development by Anes Soleimanzadeh, from MVP to scalable multi-tenant architecture.',
    hero: 'Build SaaS products with subscription logic, user management, and growth-ready infrastructure.',
    details: [
      'MVP planning, database design, and feature prioritization for faster validation.',
      'Subscription flows, billing integrations, and analytics-ready architecture.',
      'Multi-tenant data structures and role-based dashboard implementation.',
    ],
    faq: [
      { q: 'Can you build a SaaS MVP quickly?', a: 'Yes. I focus on iterative releases and clear technical milestones.' },
      { q: 'Do you support post-launch scaling?', a: 'Yes. I provide optimization plans for growth and reliability.' },
    ],
  },
  {
    slug: 'full-stack-development',
    title: 'Full Stack Development',
    description: 'Full stack web development with Django, Python, and Next.js by AnesPy for modern products.',
    hero: 'From backend APIs to polished frontend UX, delivered as one coherent product system.',
    details: [
      'Frontend implementation with Next.js App Router and SEO-first architecture.',
      'Backend development with Django and clean API contracts.',
      'Deployment, monitoring, and continuous improvements for production stability.',
    ],
    faq: [
      { q: 'What tech stack do you use most?', a: 'Django, Django REST Framework, Next.js, and TypeScript.' },
      { q: 'Can you handle both design and development?', a: 'Yes. I can deliver full product implementation end-to-end.' },
    ],
  },
  {
    slug: 'custom-web-application-development',
    title: 'Custom Web Application',
    description: 'Custom web app development tailored to business workflows, automation, and internal tools.',
    hero: 'Build custom web apps that automate operations and improve team productivity.',
    details: [
      'Custom dashboard and workflow systems aligned with your business model.',
      'Internal tools, reporting modules, and secure user permission systems.',
      'API integrations with third-party platforms and existing enterprise systems.',
    ],
    faq: [
      { q: 'Do you build internal business panels?', a: 'Yes. I build custom admin panels and internal dashboards.' },
      { q: 'Can you integrate external services?', a: 'Yes. I integrate payment, communication, CRM, and analytics services.' },
    ],
  },
]

const faServices: ServiceContent[] = [
  {
    slug: 'django-developer',
    title: 'توسعه دهنده Django',
    description: 'توسعه بک‌اند جنگو توسط AnesPy برای API امن، مقیاس‌پذیر و آماده رشد.',
    hero: 'طراحی بک‌اند جنگو، API حرفه‌ای و استقرار پروداکشن برای محصول‌های در حال رشد.',
    details: [
      'طراحی معماری ماژولار جنگو برای نگهداری بلندمدت پروژه.',
      'پیاده‌سازی API امن با دسترسی سطح‌بندی شده و بهینه‌سازی عملکرد.',
      'ساخت پنل ادمین، گردش‌کار داخلی و ماژول‌های گزارش‌گیری.',
    ],
    faq: [
      { q: 'روی پروژه جنگوی موجود هم کار می‌کنید؟', a: 'بله، بازبینی، ریفکتور و بهینه‌سازی پروژه‌های موجود انجام می‌دهم.' },
      { q: 'API برای Next.js هم پیاده‌سازی می‌کنید؟', a: 'بله، تخصص اصلی من ترکیب DRF و Next.js است.' },
    ],
  },
  {
    slug: 'saas-platform-development',
    title: 'توسعه پلتفرم SaaS',
    description: 'توسعه SaaS از MVP تا معماری چندمستاجری مقیاس‌پذیر توسط آنس سلیمان زاده.',
    hero: 'ساخت SaaS با سیستم اشتراک، مدیریت کاربران و زیرساخت آماده رشد.',
    details: [
      'طراحی MVP، مدل داده و اولویت‌بندی قابلیت‌ها برای ورود سریع به بازار.',
      'پیاده‌سازی اشتراک، پرداخت و زیرساخت تحلیلی.',
      'معماری چندمستاجری و پنل‌های نقش‌محور.',
    ],
    faq: [
      { q: 'MVP را سریع تحویل می‌دهید؟', a: 'بله، با انتشار مرحله‌ای و برنامه فنی شفاف.' },
      { q: 'بعد از لانچ هم پشتیبانی دارید؟', a: 'بله، برای مقیاس‌پذیری و پایداری برنامه توسعه می‌دهم.' },
    ],
  },
  {
    slug: 'full-stack-development',
    title: 'توسعه فول استک',
    description: 'توسعه فول استک با Django و Next.js توسط AnesPy برای وب‌سایت و اپلیکیشن حرفه‌ای.',
    hero: 'از بک‌اند تا فرانت‌اند، یک محصول یکپارچه با کیفیت تولید.',
    details: [
      'پیاده‌سازی فرانت‌اند با Next.js و ساختار SEO-First.',
      'توسعه بک‌اند با Django و API استاندارد.',
      'استقرار، مانیتورینگ و بهبود مداوم برای پایداری پروداکشن.',
    ],
    faq: [
      { q: 'استک اصلی شما چیست؟', a: 'Django، DRF، Next.js و TypeScript.' },
      { q: 'طراحی و توسعه را با هم انجام می‌دهید؟', a: 'بله، تحویل End-to-End انجام می‌دهم.' },
    ],
  },
  {
    slug: 'custom-web-application-development',
    title: 'توسعه وب اپلیکیشن اختصاصی',
    description: 'ساخت وب اپلیکیشن اختصاصی بر اساس نیاز کسب‌وکار، اتوماسیون و پنل داخلی.',
    hero: 'پیاده‌سازی وب اپلیکیشن سفارشی برای بهینه‌سازی فرایندهای سازمانی.',
    details: [
      'ساخت داشبورد اختصاصی و سیستم‌های گردش‌کار.',
      'پیاده‌سازی ابزار داخلی، گزارش‌گیری و دسترسی چندسطحی.',
      'اتصال به سرویس‌های بیرونی و سیستم‌های فعلی سازمان.',
    ],
    faq: [
      { q: 'پنل داخلی سازمانی هم می‌سازید؟', a: 'بله، پنل مدیریت و داشبورد داخلی کاملا اختصاصی می‌سازم.' },
      { q: 'امکان اتصال به سرویس‌های خارجی هست؟', a: 'بله، انواع سرویس پرداخت، CRM، پیام‌رسان و تحلیل را ادغام می‌کنم.' },
    ],
  },
]

export function getServices(lang: SupportedLang): ServiceContent[] {
  return lang === 'fa' ? faServices : enServices
}

export function getServiceBySlug(lang: SupportedLang, slug: string): ServiceContent | undefined {
  return getServices(lang).find((item) => item.slug === slug)
}
