'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import JavesMark from './JavesMark'
import VideoLightbox from './VideoLightbox'
import type { Category, EnrichedCard, Provider, Aspect } from './portfolio-cards'

type Filter = '*' | Category

const FILTERS: { label: string; value: Filter }[] = [
  { label: 'Todos',       value: '*' },
  { label: 'Casamentos',  value: 'casamento' },
  { label: 'Corporativo', value: 'corporativo' },
  { label: 'Comercial',   value: 'comercial' },
]

interface OpenVideo {
  id: string
  provider: Provider
  aspect: Aspect
}

export default function PortfolioClient({ cards }: { cards: EnrichedCard[] }) {
  const [active, setActive] = useState<Filter>('*')
  const [open, setOpen] = useState<OpenVideo | null>(null)

  const visible = useMemo(
    () => cards.filter((c) => active === '*' || c.category === active),
    [active, cards],
  )
  const verticals   = visible.filter((c) => c.aspect === 'vertical')
  const horizontals = visible.filter((c) => c.aspect === 'horizontal')

  return (
    <section className="section-wrap" id="trabalhos" aria-labelledby="portfolio-title">
      <div className="inner">
        <p className="section-label grad-text">Portfólio</p>
        <h2 className="section-title" id="portfolio-title">
          Trabalhos em Destaque
        </h2>

        <div className="filters" role="group" aria-label="Filtrar por categoria">
          {FILTERS.map(({ label, value }) => (
            <button
              key={value}
              className={`filter-btn${active === value ? ' active' : ''}`}
              aria-pressed={active === value}
              onClick={() => setActive(value)}
            >
              {label}
            </button>
          ))}
        </div>

        {verticals.length > 0 && (
          <VerticalCarousel cards={verticals} onPlay={setOpen} />
        )}

        {horizontals.length > 0 && (
          <div className="portfolio-grid" id="portfolio-grid">
            {horizontals.map((card) => (
              <PortfolioCard key={card.title} card={card} onPlay={setOpen} />
            ))}
          </div>
        )}
      </div>

      <VideoLightbox video={open} onClose={() => setOpen(null)} />
    </section>
  )
}

/* ——— Card individual ——— */

function PortfolioCard({
  card,
  onPlay,
}: {
  card: EnrichedCard
  onPlay: (v: OpenVideo) => void
}) {
  return (
    <button
      type="button"
      className="portfolio-card"
      aria-label={`Assistir: ${card.title}`}
      data-category={card.category}
      data-aspect={card.aspect}
      onClick={() => onPlay({ id: card.id, provider: card.provider, aspect: card.aspect })}
    >
      <div className="card-thumb" data-aspect={card.aspect}>
        {card.thumbUrl ? (
          <img
            className="thumb-img"
            src={card.thumbUrl}
            alt=""
            loading="lazy"
            aria-hidden="true"
          />
        ) : (
          <div className="thumb-img thumb-fallback" aria-hidden="true" />
        )}
        <div className="thumb-grain" aria-hidden="true" />
        <div className="thumb-watermark" aria-hidden="true">
          <JavesMark />
        </div>
        <span className="thumb-pill">{card.pill}</span>
        <div className="play-btn" aria-hidden="true">
          <div className="play-icon" />
        </div>
      </div>
      <div className="card-info">
        <p className="card-cat grad-text">{card.pill}</p>
        <h3 className="card-title">{card.title}</h3>
      </div>
    </button>
  )
}

/* ——— Carrossel vertical com auto-scroll ——— */

function VerticalCarousel({
  cards,
  onPlay,
}: {
  cards: EnrichedCard[]
  onPlay: (v: OpenVideo) => void
}) {
  const scrollRef = useRef<HTMLDivElement>(null)
  // Duplicamos a lista pra permitir loop infinito sem "pulo" visível.
  const loopCards = [...cards, ...cards]

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    let paused = false
    let resumeTimer: number | undefined
    let raf = 0
    let lastTs = performance.now()
    const PIXELS_PER_SECOND = 32

    const pause = (ms = 2500) => {
      paused = true
      window.clearTimeout(resumeTimer)
      resumeTimer = window.setTimeout(() => { paused = false }, ms)
    }

    const tick = (ts: number) => {
      const dt = (ts - lastTs) / 1000
      lastTs = ts

      if (!paused && el.scrollWidth > el.clientWidth) {
        el.scrollLeft += PIXELS_PER_SECOND * dt
        const half = el.scrollWidth / 2
        if (el.scrollLeft >= half) el.scrollLeft -= half
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    const onEnter = () => { paused = true; window.clearTimeout(resumeTimer) }
    const onLeave = () => { paused = false }
    const onInteract = () => pause()

    el.addEventListener('mouseenter', onEnter)
    el.addEventListener('mouseleave', onLeave)
    el.addEventListener('focusin',    onEnter)
    el.addEventListener('focusout',   onLeave)
    el.addEventListener('pointerdown', onInteract)
    el.addEventListener('wheel',       onInteract, { passive: true })
    el.addEventListener('touchstart',  onInteract, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(resumeTimer)
      el.removeEventListener('mouseenter', onEnter)
      el.removeEventListener('mouseleave', onLeave)
      el.removeEventListener('focusin',    onEnter)
      el.removeEventListener('focusout',   onLeave)
      el.removeEventListener('pointerdown', onInteract)
      el.removeEventListener('wheel',       onInteract)
      el.removeEventListener('touchstart',  onInteract)
    }
  }, [cards.length])

  return (
    <div
      className="portfolio-carousel"
      ref={scrollRef}
      role="region"
      aria-label="Trabalhos verticais"
    >
      <div className="portfolio-carousel-track">
        {loopCards.map((card, i) => (
          <PortfolioCard key={`${card.title}-${i}`} card={card} onPlay={onPlay} />
        ))}
      </div>
    </div>
  )
}
