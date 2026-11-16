'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'

const NAV_ITEMS = [
  { id: 'trabalhos', label: 'Trabalhos' },
  { id: 'parceiros', label: 'Parceiros' },
  { id: 'quem-somos', label: 'Quem Somos' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Limpa qualquer #hash da URL no primeiro carregamento pra evitar que
  // recarregar a pagina role direto pra secao (ex: #contato).
  useEffect(() => {
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search)
      window.scrollTo(0, 0)
    }
  }, [])

  // Trava o scroll do body enquanto o overlay do menu estiver aberto.
  // iOS Safari ignora overflow:hidden em muitos casos — tecnica mais robusta
  // eh fixar o body e compensar a posicao de scroll.
  useEffect(() => {
    if (!open) return
    const scrollY = window.scrollY
    const body = document.body
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
      overflow: body.style.overflow,
    }
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'
    body.style.overflow = 'hidden'
    return () => {
      body.style.position = prev.position
      body.style.top = prev.top
      body.style.width = prev.width
      body.style.overflow = prev.overflow
      window.scrollTo(0, scrollY)
    }
  }, [open])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    // Da um tick pro overlay fechar e o body desbloquear antes de rolar
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  return (
    <>
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: 'rgba(5,5,5,0.82)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderColor: 'var(--border)',
        }}
      >
        <div className="inner site-header-inner" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Image
            src="/svg/javes-logo-branco.svg"
            alt="JAVES Videomarketing"
            width={120}
            height={26}
            priority
          />

          <nav aria-label="Navegação principal">
            <button
              className="nav-toggle"
              style={{ display: 'none', position: 'relative', zIndex: 60 }}
              aria-expanded={open}
              aria-controls="main-nav"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setOpen(!open)}
            >
              <span
                style={{
                  display: 'block', width: 18, height: 1.5,
                  background: 'var(--fg)', borderRadius: 1,
                  transition: 'transform 0.22s, opacity 0.22s',
                  transform: open ? 'translateY(6.5px) rotate(45deg)' : undefined,
                }}
              />
              <span
                style={{
                  display: 'block', width: 18, height: 1.5,
                  background: 'var(--fg)', borderRadius: 1,
                  transition: 'transform 0.22s, opacity 0.22s',
                  opacity: open ? 0 : 1,
                }}
              />
              <span
                style={{
                  display: 'block', width: 18, height: 1.5,
                  background: 'var(--fg)', borderRadius: 1,
                  transition: 'transform 0.22s, opacity 0.22s',
                  transform: open ? 'translateY(-6.5px) rotate(-45deg)' : undefined,
                }}
              />
            </button>

            {/* Menu desktop (inline) — oculto no mobile via CSS */}
            <ul className="site-nav-desktop">
              {NAV_ITEMS.map(({ id, label }) => (
                <li key={id}>
                  <a href={`#${id}`} onClick={go(id)} className="nav-link">
                    {label}
                  </a>
                </li>
              ))}
              <li className="nav-cta">
                <a href="#contato" onClick={go('contato')} className="nav-cta-link">
                  Contato
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Menu mobile — renderizado no body via Portal pra escapar
          do stacking context do header (backdrop-filter quebra fixed no iOS) */}
      {mounted && open && createPortal(
        <div id="main-nav" className="mobile-nav-overlay" role="dialog" aria-modal="true">
          <ul className="mobile-nav-list">
            {NAV_ITEMS.map(({ id, label }) => (
              <li key={id}>
                <a href={`#${id}`} onClick={go(id)} className="mobile-nav-link">
                  {label}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contato" onClick={go('contato')} className="mobile-nav-cta">
            Contato
          </a>
        </div>,
        document.body,
      )}
    </>
  )
}
