import Image from 'next/image'
import Link from 'next/link'

const LINKS = [
  { href: 'https://instagram.com/javes.mov', label: 'Instagram', external: true },
  { href: 'https://youtube.com/@javesmov',             label: 'YouTube',   external: true },
  { href: '#quem-somos',                     label: 'Contato',   external: false },
]

export default function Footer() {
  return (
    <footer>
      <div className="inner">
        <Image
          src="/svg/javes-mov-films-branco.svg"
          alt="JAVES Mov Films"
          width={120}
          height={36}
          className="footer-logo"
        />

        <ul className="footer-links">
          {LINKS.map(({ href, label, external }) => (
            <li key={label}>
              {external ? (
                <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
              ) : (
                <Link href={href}>{label}</Link>
              )}
            </li>
          ))}
        </ul>

        <p className="footer-copy">© 2026 @JAVES MOV FILMS</p>
      </div>
    </footer>
  )
}
