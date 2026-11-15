'use client'

import { useEffect } from 'react'
import type { Provider, Aspect } from './portfolio-cards'

interface OpenVideo {
  id: string
  provider: Provider
  aspect: Aspect
}

interface Props {
  video: OpenVideo | null
  onClose: () => void
}

function embedUrl({ id, provider }: OpenVideo): string {
  if (provider === 'youtube') {
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`
  }
  return `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0`
}

/**
 * Lightbox para reprodução de vídeos do YouTube e Vimeo em modal fullscreen.
 * - Travado quando video === null (não renderiza nada).
 * - ESC ou clique fora do player fecha.
 * - Trava scroll do body enquanto aberto.
 */
export default function VideoLightbox({ video, onClose }: Props) {
  useEffect(() => {
    if (!video) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [video, onClose])

  if (!video) return null

  return (
    <div
      className="video-lightbox"
      role="dialog"
      aria-modal="true"
      aria-label="Reprodução de vídeo"
      onClick={onClose}
    >
      <button
        type="button"
        className="video-lightbox-close"
        aria-label="Fechar vídeo"
        onClick={onClose}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>

      <div
        className="video-lightbox-player"
        data-aspect={video.aspect}
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={embedUrl(video)}
          title="Vídeo JAVES Videomarketing"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    </div>
  )
}
