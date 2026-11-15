'use client'

import { useState } from 'react'
import JavesMark from './JavesMark'
import VideoLightbox from './VideoLightbox'

type Category = '*' | 'casamento' | 'corporativo' | 'comercial'

const FILTERS: { label: string; value: Category }[] = [
  { label: 'Todos',       value: '*' },
  { label: 'Casamentos',  value: 'casamento' },
  { label: 'Corporativo', value: 'corporativo' },
  { label: 'Comercial',   value: 'comercial' },
]

/**
 * Para Shorts do YouTube: a URL youtube.com/shorts/ABC123 usa o mesmo ID
 * ABC123 que seria usado em youtube.com/watch?v=ABC123. Basta colar o ID.
 */
interface Card {
  title: string
  category: Exclude<Category, '*'>
  pill: string
  youtubeId: string
}

const CARDS: Card[] = [
  { title: 'Fernanda & Rafael',     category: 'casamento',   pill: 'Casamento',   youtubeId: 'dQw4w9WgXcQ' },
  { title: 'Horizonte Construtora', category: 'corporativo', pill: 'Corporativo', youtubeId: 'dQw4w9WgXcQ' },
  { title: 'Boutique Mar',          category: 'comercial',   pill: 'Comercial',   youtubeId: 'dQw4w9WgXcQ' },
]

export default function Portfolio() {
  const [active, setActive] = useState<Category>('*')
  const [videoId, setVideoId] = useState<string | null>(null)
  const visible = CARDS.filter((c) => active === '*' || c.category === active)

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

        <div className="portfolio-grid" id="portfolio-grid">
          {visible.map((card) => (
            <button
              type="button"
              key={card.title}
              className="portfolio-card"
              aria-label={`Assistir: ${card.title}`}
              data-category={card.category}
              onClick={() => setVideoId(card.youtubeId)}
            >
              <div className="card-thumb">
                <img
                  className="thumb-img"
                  src={`https://img.youtube.com/vi/${card.youtubeId}/hqdefault.jpg`}
                  alt=""
                  loading="lazy"
                  aria-hidden="true"
                />
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
          ))}
        </div>
      </div>

      <VideoLightbox videoId={videoId} onClose={() => setVideoId(null)} />
    </section>
  )
}
