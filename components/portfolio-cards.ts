export type Category = 'casamento' | 'corporativo' | 'comercial'
export type Aspect   = 'vertical' | 'horizontal'
export type Provider = 'youtube' | 'vimeo'

export interface Card {
  title: string
  category: Category
  pill: string
  provider: Provider
  /**
   * ID do vídeo.
   * - YouTube: parte depois de v= ou /shorts/ (ex: 'Ruz1OX7F3RE')
   * - Vimeo:   número no final da URL (ex: '987654321' para vimeo.com/987654321)
   */
  id: string
  aspect: Aspect
}

export interface EnrichedCard extends Card {
  thumbUrl: string
}

export const CARDS: Card[] = [
  { title: 'Fernanda & Rafael',     category: 'casamento',   pill: 'Casamento',   provider: 'youtube', id: 'Ruz1OX7F3RE', aspect: 'vertical' },
  { title: 'Ana & Pedro',           category: 'casamento',   pill: 'Casamento',   provider: 'youtube', id: 'dQw4w9WgXcQ', aspect: 'vertical' },
  { title: 'Lucas & Mariana',       category: 'casamento',   pill: 'Casamento',   provider: 'youtube', id: 'dQw4w9WgXcQ', aspect: 'vertical' },
  { title: 'Boutique Mar',          category: 'comercial',   pill: 'Comercial',   provider: 'youtube', id: 'dQw4w9WgXcQ', aspect: 'vertical' },
  { title: 'Clínica Prime',         category: 'comercial',   pill: 'Comercial',   provider: 'youtube', id: 'dQw4w9WgXcQ', aspect: 'vertical' },
  { title: 'Campanha Copa do Mundo', category: 'comercial',  pill: 'Comercial',   provider: 'vimeo',   id: '1246909161',  aspect: 'vertical' },
  { title: 'Mikael & Sara',         category: 'casamento',   pill: 'Casamento',   provider: 'youtube', id: 'CKByXAnNgX0', aspect: 'horizontal' },
  { title: 'Horizonte Construtora', category: 'corporativo', pill: 'Corporativo', provider: 'youtube', id: 'dQw4w9WgXcQ', aspect: 'horizontal' },
  { title: 'Nexus Tecnologia',      category: 'corporativo', pill: 'Corporativo', provider: 'youtube', id: 'dQw4w9WgXcQ', aspect: 'horizontal' },
]
