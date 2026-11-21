'use client'

import { useEffect, useRef } from 'react'

interface Partner {
  name: string
  file: string
}

const PARTNERS: Partner[] = [
<<<<<<< Updated upstream
  { name: 'Real Latas',                  file: 'real-latas.jpg' },
  { name: 'Universal Auto Center',       file: 'universal-auto-center.jpg' },
  { name: 'Lucas Gyn — Personal Trainer', file: 'lucas-gyn.jpg' },
  { name: 'OralFace',                    file: 'oral-face.jpg' },
  { name: 'ZH — Casa de Carnes e Conveniência', file: 'zh-carnes.jpg' },
  { name: 'WFIT Academia',               file: 'wfit.jpg' },
  { name: 'Activo Contabilidade',        file: 'activo-contabilidade.jpg' },
  { name: 'Nós & O Empresário Podcast',  file: 'nos-e-o-empresario.jpg' },
  { name: 'Mia Bella Beauty',            file: 'mia-bella.jpg' },
  { name: 'Nexus Studio',                file: 'nexus-studio.jpg' },
  { name: 'Vereador Fernando Henrique',  file: 'vereador-fernando-henrique.jpg' },
=======
  { name: 'Gazin',                              file: 'gazin.png' },
  { name: 'Real Latas',                         file: 'real-latas.png' },
  { name: 'Universal Auto Center',              file: 'universal-auto-center.png' },
  { name: 'OULAB',                              file: 'oulab.png' },
  { name: 'Lucas Gyn — Personal Trainer',       file: 'lucas-gyn.png' },
  { name: 'OralFace',                           file: 'oral-face.png' },
  { name: 'Predileta',                          file: 'predileta.png' },
  { name: 'WFIT Academia',                      file: 'wfit.png' },
  { name: 'Zero Hora',                          file: 'zero-hora.png' },
  { name: 'Vanelli',                            file: 'vanelli.png' },
  { name: 'Activo Contabilidade',               file: 'activo-contabilidade.png' },
  { name: 'Arlete Sampaio',                     file: 'arlete-sampaio.png' },
  { name: 'Nós & O Empresário Podcast',         file: 'nos-e-o-empresario.png' },
  { name: 'Nanda Rocha',                        file: 'nanda-rocha.png' },
  { name: 'Mia Bella Beauty',                   file: 'mia-bella.png' },
  { name: 'Nexus Studio',                       file: 'nexus-studio.png' },
  { name: 'Vereador Fernando Henrique',         file: 'vereador-fernando-henrique.png' },
>>>>>>> Stashed changes
]

export default function Partners() {
  const scrollRef = useRef<HTMLDivElement>(null)
  // Duplicamos a lista pra permitir loop infinito sem "pulo" visivel.
  const loopPartners = [...PARTNERS, ...PARTNERS]

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let paused = false
    let resumeTimer: number | undefined
    let raf = 0
    let lastTs = performance.now()
    const PIXELS_PER_SECOND = 28

    const pause = (ms = 2500) => {
      paused = true
      window.clearTimeout(resumeTimer)
      resumeTimer = window.setTimeout(() => { paused = false }, ms)
    }

    const tick = (ts: number) => {
      const dt = Math.min((ts - lastTs) / 1000, 0.1)
      lastTs = ts
      if (!paused && el.scrollWidth > el.clientWidth) {
        el.scrollLeft += PIXELS_PER_SECOND * dt
        const half = el.scrollWidth / 2
        if (el.scrollLeft >= half) el.scrollLeft -= half
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    // Hover-pause so em devices com mouse real (no touch mouseleave nao dispara).
    const hasHover = window.matchMedia('(hover: hover)').matches

    const onEnter = () => { paused = true; window.clearTimeout(resumeTimer) }
    const onLeave = () => { paused = false }
    const onInteract = () => pause()

    if (hasHover) {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    }
    el.addEventListener('pointerdown', onInteract)
    el.addEventListener('wheel',       onInteract, { passive: true })
    el.addEventListener('touchstart',  onInteract, { passive: true })

    return () => {
      cancelAnimationFrame(raf)
      window.clearTimeout(resumeTimer)
      if (hasHover) {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      }
      el.removeEventListener('pointerdown', onInteract)
      el.removeEventListener('wheel',       onInteract)
      el.removeEventListener('touchstart',  onInteract)
    }
  }, [])

  return (
    <section className="partners-wrap" id="parceiros" aria-labelledby="parceiros-title">
      <div className="inner">
        <p className="section-label grad-text">Parceiros</p>
        <h2 className="section-title" id="parceiros-title">
          Marcas que Já Confiaram na JAVES
        </h2>
      </div>

      <div
        className="partners-carousel"
        ref={scrollRef}
        role="region"
        aria-label="Logos dos parceiros"
      >
        <div className="partners-carousel-track">
          {loopPartners.map((p, i) => (
            <div className="partner-item" key={`${p.file}-${i}`}>
              <img
                src={`/png/parceiros/${p.file}`}
                alt={p.name}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
