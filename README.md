# Dynamic Portfolio (Frontend + Backend)

پروژه شامل دو بخش است:
- `frontend/`: Next.js 16 (App Router)
- `backend/`: Django + DRF

دامنه‌های هدف این پروژه:
- Frontend: `https://aness.ir`
- API: `https://api.aness.ir`

## Architecture

- Frontend روی دامنه اصلی (`aness.ir`) رندر می‌شود.
- Frontend داده‌ها را از API روی ساب‌دامین (`api.aness.ir`) می‌خواند.
- Backend endpointها زیر مسیر `/api/` سرو می‌شوند.

نمونه endpoint:
- `https://api.aness.ir/api/portfolio/`
- `https://api.aness.ir/api/blog/`
- `https://api.aness.ir/api/project-request/`

## Environment Files

مسیرهای اصلی فایل env:
- Frontend env path: `frontend/.env.local`
- Backend env path: `backend/.env`

فایل‌های نمونه:
- `frontend/.env.example`
- `backend/.env.example`

### Frontend `.env.local`

```env
NEXT_PUBLIC_SITE_URL=https://aness.ir
NEXT_PUBLIC_API_URL=https://api.aness.ir/api
```

### Backend `.env`

```env
DJANGO_SECRET_KEY=replace-with-a-strong-secret
DJANGO_DEBUG=false
DJANGO_ALLOWED_HOSTS=api.aness.ir,aness.ir,www.aness.ir
DJANGO_CORS_ALLOW_ALL_ORIGINS=false
DJANGO_CORS_ALLOWED_ORIGINS=https://aness.ir,https://www.aness.ir
DJANGO_CSRF_TRUSTED_ORIGINS=https://aness.ir,https://www.aness.ir,https://api.aness.ir
DJANGO_USE_X_FORWARDED_HOST=true
```

## SEO / Sitemap / Robots

Frontend برای دامنه `aness.ir` تنظیم شده است:
- Canonical base URL از `NEXT_PUBLIC_SITE_URL` خوانده می‌شود.
- `robots.txt` و `sitemap.xml` با base URL دامنه جدید ساخته می‌شوند.
- بلاگ و سرویس‌ها به‌صورت داینامیک در sitemap تولید می‌شوند.

مسیرها:
- `frontend/app/robots.ts`
- `frontend/app/sitemap.ts`
- `frontend/lib/seo.ts`

## Caching Strategy

در Frontend داده‌های محتوایی با ISR و fetch cache هر `86400` ثانیه (24 ساعت) revalidate می‌شوند:
- Home page: `frontend/app/[lang]/page.tsx`
- Blog detail: `frontend/app/[lang]/blog/[slug]/page.tsx`
- API fetches: `frontend/lib/api.ts`

## Local Development

### 1) Backend

```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install django djangorestframework django-cors-headers django-modeltranslation django-tinymce pillow requests
python manage.py migrate
python manage.py runserver 8000
```

### 2) Frontend

```powershell
cd frontend
pnpm install
pnpm dev --port 3000
```

## Production Deployment Checklist

1. DNS
- `aness.ir` -> frontend host
- `www.aness.ir` -> redirect به `aness.ir`
- `api.aness.ir` -> backend host

2. TLS
- برای هر دو دامنه SSL معتبر فعال باشد.

3. Backend
- `DJANGO_DEBUG=false`
- `DJANGO_SECRET_KEY` امن
- migration اجرا شود.
- static/media در production صحیح سرو شوند.

4. Frontend
- `NEXT_PUBLIC_SITE_URL=https://aness.ir`
- `NEXT_PUBLIC_API_URL=https://api.aness.ir/api`
- build و start:
```powershell
cd frontend
pnpm build
pnpm start
```

## Git Notes

`.gitignore` ریشه برای هر دو بخش تنظیم شده و موارد زیر را پوشش می‌دهد:
- env files
- build artifacts
- venv / node_modules
- sqlite/media/staticfiles

## Current Status

پروژه برای deploy آماده شده است:
- env-based configuration برای backend و frontend
- دامنه‌های جدید (`aness.ir` و `api.aness.ir`)
- SEO/robots/sitemap داینامیک
- gitignore سراسری و نمونه envها
