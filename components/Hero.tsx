import JavesMark from './JavesMark'
import HeroShowreel from './HeroShowreel'
import { resolveThumb } from './video-thumb'

const SHOWREEL = {
  provider: 'vimeo' as const,
  id: '1246909163', // Pré Wedding — Raquel & Vinícius
}

export default async function Hero() {
  const thumbUrl = await resolveThumb(SHOWREEL.provider, SHOWREEL.id, 'horizontal')

  return (
    <section className="hero-root" aria-labelledby="hero-title">
      {/* Background glow */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 55% 50% at 50% 50%, rgba(255,255,255,0.018) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Watermark mark */}
      <div className="hero-watermark" aria-hidden="true">
        <JavesMark />
      </div>

      <h1 id="hero-title" className="sr-only">JAVES Mov Films</h1>

      <p className="hero-tagline">Histórias que merecem ser lembradas.</p>

      <HeroShowreel
        provider={SHOWREEL.provider}
        id={SHOWREEL.id}
        thumbUrl={thumbUrl}
      />
    </section>
  )
}
