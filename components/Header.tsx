'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

const NAV_ITEMS = [
  { id: 'trabalhos', label: 'Trabalhos' },
  { id: 'parceiros', label: 'Parceiros' },
  { id: 'quem-somos', label: 'Quem Somos' },
]

export default function Header() {
  const [open, setOpen] = useState(false)

  // Limpa qualquer #hash da URL no primeiro carregamento pra evitar que
  // recarregar a pagina role direto pra secao (ex: #contato).
  useEffect(() => {
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search)
      window.scrollTo(0, 0)
    }
  }, [])

  // Trava o scroll do body enquanto o overlay do menu estiver aberto.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    const target = document.getElementById(id)
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
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

        <nav aria-label="Navegação principal" style={{ position: 'relative' }}>
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

          <ul id="main-nav" className={`site-nav${open ? ' nav-open' : ''}`}>
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
  )
}
