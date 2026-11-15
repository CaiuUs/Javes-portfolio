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
  // ——— Verticais (Shorts / Reels) ———
  { title: 'Jantar de Noivado — K & W',  category: 'casamento',   pill: 'Casamento',   provider: 'vimeo',   id: '1246985919', aspect: 'vertical' },
  { title: 'Campanha Copa do Mundo',     category: 'comercial',   pill: 'Comercial',   provider: 'vimeo',   id: '1246909161', aspect: 'vertical' },
  { title: 'Jantar de Negócios — OULAB', category: 'corporativo', pill: 'Corporativo', provider: 'vimeo',   id: '1246909162', aspect: 'vertical' },
  { title: 'Adriana — 42 Anos',          category: 'comercial',   pill: 'Comercial',   provider: 'vimeo',   id: '1246910112', aspect: 'vertical' },
  { title: 'Isabella Vasconcellos — 50%', category: 'comercial',  pill: 'Comercial',   provider: 'vimeo',   id: '1246909886', aspect: 'vertical' },

  // ——— Horizontais (16:9) ———
  { title: 'Mikael & Sara',              category: 'casamento',   pill: 'Casamento',   provider: 'youtube', id: 'CKByXAnNgX0', aspect: 'horizontal' },
  { title: 'Formatura — Ana Clara',      category: 'comercial',   pill: 'Comercial',   provider: 'youtube', id: 'tKN6UkhNW0E', aspect: 'horizontal' },
]
