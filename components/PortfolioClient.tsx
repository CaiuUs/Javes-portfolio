'use client'

import { useMemo, useState } from 'react'
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

/* ——— Carrossel vertical com auto-scroll ——— */

function VerticalCarousel({
  cards,
  onPlay,
}: {
  cards: EnrichedCard[]
  onPlay: (v: OpenVideo) => void
}) {
  // Duplicamos a lista pra permitir loop CSS infinito sem "pulo" visivel.
  // A animacao translada de 0 a -50% da track, voltando ao inicio da copia
  // identica em perfeita sincronia com a primeira.
  // Mesma abordagem do Partners: CSS-only via keyframes em transform,
  // funciona em mobile sem depender de scrollLeft/requestAnimationFrame.
  const loopCards = [...cards, ...cards]

  return (
    <div
      className="portfolio-carousel"
      role="region"
      aria-label="Trabalhos verticais"
    >
      {/*
        key={cards.length} forca remount quando o filtro muda,
        reiniciando a animacao do CSS do zero (evita que a track
        fique em posicao estranha depois de trocar o filtro).
      */}
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
