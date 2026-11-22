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
  ariaHidden = false,
}: {
  card: EnrichedCard
  onPlay: (v: OpenVideo) => void
  ariaHidden?: boolean
}) {
  return (
    <button
      type="button"
      className="portfolio-card"
      aria-label={ariaHidden ? undefined : `Assistir: ${card.title}`}
      aria-hidden={ariaHidden ? 'true' : undefined}
      tabIndex={ariaHidden ? -1 : undefined}
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

/* ——— Carrossel vertical com auto-scroll + navegação manual ——— */

function VerticalCarousel({
  cards,
  onPlay,
}: {
  cards: EnrichedCard[]
  onPlay: (v: OpenVideo) => void
}) {
  // Lista duplicada para loop contínuo: quando o scroll passa da metade,
  // "voltamos" subtraindo metade da largura — sem pulo visível.
  const loopCards = [...cards, ...cards]
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const pausedUntilRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const lastTsRef = useRef<number | null>(null)
  const positionRef = useRef(0)

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const SPEED = 40
    const PAUSE_MS = 2000

    // Reset ao trocar filtro
    positionRef.current = 0
    el.scrollLeft = 0

    const pause = () => {
      pausedUntilRef.current = performance.now() + PAUSE_MS
    }

    const tick = (ts: number) => {
      const last = lastTsRef.current ?? ts
      const dt = ts - last
      lastTsRef.current = ts

      const half = el.scrollWidth / 2
      if (half > 0 && performance.now() >= pausedUntilRef.current) {
        // Acumulador float: scrollLeft arredonda em mobile Safari e perde sub-px.
        positionRef.current += (SPEED * dt) / 1000
        if (positionRef.current >= half) positionRef.current -= half
        if (positionRef.current < 0) positionRef.current += half
        el.scrollLeft = positionRef.current
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    const pauseAndSync = () => {
      pause()
      positionRef.current = el.scrollLeft
    }

    const onPointerDown = () => pauseAndSync()
    const onWheel = () => pauseAndSync()
    const onTouchStart = () => pauseAndSync()
    const onScroll = () => {
      if (performance.now() >= pausedUntilRef.current) return
      const half = el.scrollWidth / 2
      if (half <= 0) return
      if (el.scrollLeft >= half) {
        el.scrollLeft -= half
      } else if (el.scrollLeft <= 0) {
        el.scrollLeft += half
      }
      positionRef.current = el.scrollLeft
    }

    el.addEventListener('pointerdown', onPointerDown)
    el.addEventListener('wheel', onWheel, { passive: true })
    el.addEventListener('touchstart', onTouchStart, { passive: true })
    el.addEventListener('scroll', onScroll, { passive: true })

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      lastTsRef.current = null
      el.removeEventListener('pointerdown', onPointerDown)
      el.removeEventListener('wheel', onWheel)
      el.removeEventListener('touchstart', onTouchStart)
      el.removeEventListener('scroll', onScroll)
    }
  }, [cards.length])

  return (
    <div
      className="portfolio-carousel"
      role="region"
      aria-label="Trabalhos verticais"
      ref={scrollerRef}
    >
      <div className="portfolio-carousel-track" key={cards.length}>
        {loopCards.map((card, i) => (
          <PortfolioCard
            key={`${card.title}-${i}`}
            card={card}
            onPlay={onPlay}
            ariaHidden={i >= cards.length}
          />
        ))}
      </div>
    </div>
  )
}
