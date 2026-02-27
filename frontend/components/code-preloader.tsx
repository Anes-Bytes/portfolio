'use client'

import { useEffect, useRef, useState } from 'react'

type CodePreloaderProps = {
  lang: 'en' | 'fa'
}

export function CodePreloader({ lang }: CodePreloaderProps) {
  const [phase, setPhase] = useState<'show' | 'hide'>('show')
  const [mounted, setMounted] = useState(true)
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const minVisibleMs = reduceMotion ? 180 : 520
    const hardStopMs = reduceMotion ? 420 : 1200

    let contentReady = document.readyState === 'complete'
    let minElapsed = false

    const startHide = () => {
      setPhase('hide')
      fadeTimerRef.current = setTimeout(() => setMounted(false), 180)
    }

    const maybeHide = () => {
      if (minElapsed && contentReady) {
        startHide()
      }
    }

    const onLoad = () => {
      contentReady = true
      maybeHide()
    }

    window.addEventListener('load', onLoad, { once: true })

    const minTimer = setTimeout(() => {
      minElapsed = true
      maybeHide()
    }, minVisibleMs)

    const hardStop = setTimeout(startHide, hardStopMs)

    return () => {
      clearTimeout(minTimer)
      clearTimeout(hardStop)
      window.removeEventListener('load', onLoad)
      if (fadeTimerRef.current) clearTimeout(fadeTimerRef.current)
    }
  }, [])

  if (!mounted) return null

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-background/96 transition-opacity duration-200 ${phase === 'hide' ? 'opacity-0' : 'opacity-100'}`}
    >
      <div className="preload-shell w-[min(92vw,560px)] rounded-2xl border border-border bg-card/95 p-5 shadow-2xl">
        <div className="mb-3 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </div>
          <span className="font-mono text-[10px] tracking-widest text-muted-foreground">NODE:SECURE</span>
        </div>

        <div className="preload-noise mb-3 h-px w-full bg-border/70" />

        <div className="font-mono text-xs sm:text-sm text-foreground/90">
          <p className="preload-line preload-line-1">{`> boot :: kernel.aness`}</p>
          <p className="preload-line preload-line-2">{`> sync payload.projects[*]`}</p>
          <p className="preload-line preload-line-3">{`> hydrate feed.blog[*]`}</p>
          <p className="preload-line preload-line-4">{`> checksum 9f:3a:c1 :: ok`}</p>
          <p className="mt-3 text-accent preload-glitch">
            {lang === 'fa' ? 'در حال رمزگشایی نما...' : 'decrypting interface...'}
            <span className="preload-cursor">|</span>
          </p>
        </div>

        <div className="mt-3 font-mono text-[10px] text-muted-foreground/80">
          <span className="preload-hex">0x7f 0x2a 0x91 0xcd 0x04</span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <span className="h-3.5 w-3.5 animate-spin rounded-full border border-accent/35 border-t-accent" />
          <span className="font-mono text-[10px] tracking-wider text-accent/90">LOADING</span>
        </div>
      </div>
    </div>
  )
}
