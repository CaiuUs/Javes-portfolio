import type { Metadata } from 'next'
import { Montserrat, Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-montserrat',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'JAVES Mov Films',
  description: 'Produtora de vídeo marketing. Casamentos, corporativo e comercial. +500 projetos.',
}

type Props = { children: React.ReactNode }

export default function RootLayout({ children }: Props) {
  return (
    <html
      lang="pt-BR"
      className={`${montserrat.variable} ${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body>
        {/* Hidden SVG symbol — reutilizado via <use> em JavesMark */}
        <svg style={{ display: 'none' }} aria-hidden="true">
          <symbol id="javes-mark" viewBox="0 0 278 300">
            <path d="M2.1 231.2 43.5 204.5 44 26.4 39.5 22.4 1.3 0 0 1.3 0 229.9Z" />
            <path d="M206 110.5 74.8 47 73.2 47 71.9 50.3 72.1 89.6 73.5 91.8 111.8 110.9 113 112.8 54.2 145 53.5 150.5 54.1 197 56.5 197 201.7 115.2 206 112.5Z" />
            <path d="M0 300 3.4 300 212.5 182.7 278 145.7 278 143.5 223.7 119 221.5 119.1 0.5 247.6Z" />
          </symbol>
        </svg>

        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
