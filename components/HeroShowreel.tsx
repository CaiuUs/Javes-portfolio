'use client'

import { useState } from 'react'
import type { Provider } from './portfolio-cards'
import { embedUrl } from './video-thumb'

interface Props {
  provider: Provider
  id: string
  thumbUrl: string
  label?: string
}

export default function HeroShowreel({ provider, id, thumbUrl, label = 'Showreel · 2026' }: Props) {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <div className="hero-video hero-video-playing">
        <iframe
          src={embedUrl(provider, id)}
          title="Showreel JAVES Videomarketing"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 0,
            display: 'block',
          }}
        />
      </div>
    )
  }

  return (
    <button
      type="button"
      className="hero-video"
      aria-label="Assistir showreel"
      onClick={() => setPlaying(true)}
    >
      {thumbUrl && (
        <img
          className="hero-video-thumb"
          src={thumbUrl}
          alt=""
          loading="lazy"
          aria-hidden="true"
        />
      )}
      <div className="hero-video-vignette" aria-hidden="true" />

      <span className="hv-play" aria-hidden="true">
        <svg viewBox="0 0 18 22" fill="currentColor" aria-hidden="true">
          <path d="M0 0L18 11L0 22V0Z" />
        </svg>
      </span>

      <span className="hv-label" aria-hidden="true">{label}</span>
    </button>
  )
}
