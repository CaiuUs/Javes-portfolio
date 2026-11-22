'use client'

import { useEffect, useRef } from 'react'

interface Partner {
  name: string
  file: string
}

const PARTNERS: Partner[] = [
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
]

export default function Partners() {
  // Lista duplicada para loop contínuo: quando o scroll passa da metade,
  // subtraímos metade da largura — sem pulo visível.
  const loopPartners = [...PARTNERS, ...PARTNERS]
  const scrollerRef = useRef<HTMLDivElement | null>(null)
  const pausedUntilRef = useRef(0)
  const rafRef = useRef<number | null>(null)
  const lastTsRef = useRef<number | null>(null)

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const SPEED = 50 // px por segundo
    const PAUSE_MS = 2000

    const pause = () => {
      pausedUntilRef.current = performance.now() + PAUSE_MS
    }

    const tick = (ts: number) => {
      const last = lastTsRef.current ?? ts
      const dt = ts - last
      lastTsRef.current = ts

      if (performance.now() >= pausedUntilRef.current) {
        const half = el.scrollWidth / 2
        let next = el.scrollLeft + (SPEED * dt) / 1000
        if (next >= half) next -= half
        el.scrollLeft = next
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    const onPointerDown = () => pause()
    const onWheel = () => pause()
    const onTouchStart = () => pause()
    const onScroll = () => {
      const half = el.scrollWidth / 2
      if (el.scrollLeft >= half) el.scrollLeft -= half
      else if (el.scrollLeft <= 0) el.scrollLeft += half
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
        role="region"
        aria-label="Logos dos parceiros"
        ref={scrollerRef}
      >
        <div className="partners-carousel-track">
          {loopPartners.map((p, i) => (
            <div
              className="partner-item"
              key={`${p.file}-${i}`}
              aria-hidden={i >= PARTNERS.length ? 'true' : undefined}
            >
              <img
                src={`/png/parceiros/${p.file}`}
                alt={i >= PARTNERS.length ? '' : p.name}
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
