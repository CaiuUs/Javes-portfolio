'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

type NavItem =
  | { kind: 'section'; id: string; label: string }
  | { kind: 'page'; href: string; label: string }

const NAV_ITEMS: NavItem[] = [
  { kind: 'section', id: 'trabalhos',  label: 'Trabalhos' },
  { kind: 'section', id: 'parceiros',  label: 'Parceiros' },
  { kind: 'page',    href: '/quem-somos', label: 'Quem Somos' },
]

const CTA = { id: 'contato', label: 'Contato' }

export default function Header() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === '/'

  useEffect(() => { setMounted(true) }, [])

  // Quando aterrisamos na home vindos de outra pagina com uma secao alvo,
  // rolamos pra la via sessionStorage (sem precisar sujar a URL com hash).
  useEffect(() => {
    if (!isHome) return
    const target = sessionStorage.getItem('scrollTo')
    if (!target) return
    sessionStorage.removeItem('scrollTo')
    const el = document.getElementById(target)
    if (!el) return
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [isHome])

  // Limpa qualquer #hash legado da URL (ex: visitantes com link antigo salvo).
  useEffect(() => {
    if (window.location.hash) {
      history.replaceState(null, '', window.location.pathname + window.location.search)
      window.scrollTo(0, 0)
    }
  }, [])

  // Trava o scroll do body enquanto o overlay do menu estiver aberto.
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

  const goToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setOpen(false)
    if (isHome) {
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
    } else {
      sessionStorage.setItem('scrollTo', id)
      router.push('/')
    }
  }

  const closeMenu = () => setOpen(false)

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
          <Link href="/" aria-label="JAVES — ir para o inicio" onClick={closeMenu}>
            <Image
              src="/svg/javes-logo-branco.svg"
              alt="JAVES Videomarketing"
              width={120}
              height={26}
              priority
            />
          </Link>

          <nav aria-label="Navegação principal">
            <button
              className="nav-toggle"
              style={{ display: 'none', position: 'relative', zIndex: 60 }}
              aria-expanded={open}
              aria-controls="main-nav"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              onClick={() => setOpen(!open)}
            >
              <span style={{ display: 'block', width: 18, height: 1.5, background: 'var(--fg)', borderRadius: 1, transition: 'transform 0.22s, opacity 0.22s', transform: open ? 'translateY(6.5px) rotate(45deg)' : undefined }} />
              <span style={{ display: 'block', width: 18, height: 1.5, background: 'var(--fg)', borderRadius: 1, transition: 'transform 0.22s, opacity 0.22s', opacity: open ? 0 : 1 }} />
              <span style={{ display: 'block', width: 18, height: 1.5, background: 'var(--fg)', borderRadius: 1, transition: 'transform 0.22s, opacity 0.22s', transform: open ? 'translateY(-6.5px) rotate(-45deg)' : undefined }} />
            </button>

            {/* Menu desktop */}
            <ul className="site-nav-desktop">
              {NAV_ITEMS.map((item) => (
                <li key={item.kind === 'section' ? item.id : item.href}>
                  {item.kind === 'section' ? (
                    <a href={`#${item.id}`} onClick={goToSection(item.id)} className="nav-link">
                      {item.label}
                    </a>
                  ) : (
                    <Link href={item.href} onClick={closeMenu} className="nav-link">
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
              <li className="nav-cta">
                <a href={`#${CTA.id}`} onClick={goToSection(CTA.id)} className="nav-cta-link">
                  {CTA.label}
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
            {NAV_ITEMS.map((item) => (
              <li key={item.kind === 'section' ? item.id : item.href}>
                {item.kind === 'section' ? (
                  <a href={`#${item.id}`} onClick={goToSection(item.id)} className="mobile-nav-link">
                    {item.label}
                  </a>
                ) : (
                  <Link href={item.href} onClick={closeMenu} className="mobile-nav-link">
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
          <a href={`#${CTA.id}`} onClick={goToSection(CTA.id)} className="mobile-nav-cta">
            {CTA.label}
          </a>
        </div>,
        document.body,
      )}
    </>
  )
}
