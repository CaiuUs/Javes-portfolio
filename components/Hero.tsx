import JavesMark from './JavesMark'
import HeroShowreel from './HeroShowreel'

export default function Hero() {
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

      <h1 id="hero-title" className="sr-only">JAVES Videomarketing</h1>

      <p className="hero-tagline">Histórias que conquistam mercado.</p>

      <HeroShowreel />
    </section>
  )
}
