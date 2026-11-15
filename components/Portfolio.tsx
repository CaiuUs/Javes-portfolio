import PortfolioClient from './PortfolioClient'
import { CARDS, type Card, type EnrichedCard } from './portfolio-cards'

function youtubeThumb(id: string, aspect: Card['aspect']): string {
  return aspect === 'vertical'
    ? `https://img.youtube.com/vi/${id}/hqdefault.jpg`
    : `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
}

async function fetchVimeoThumb(id: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${id}&width=1280`,
      { next: { revalidate: 86400 } },
    )
    if (!res.ok) return null
    const data = (await res.json()) as { thumbnail_url?: string }
    return data.thumbnail_url ?? null
  } catch {
    return null
  }
}

async function enrichCard(card: Card): Promise<EnrichedCard> {
  if (card.provider === 'youtube') {
    return { ...card, thumbUrl: youtubeThumb(card.id, card.aspect) }
  }
  const thumb = await fetchVimeoThumb(card.id)
  return { ...card, thumbUrl: thumb ?? '' }
}

export default async function Portfolio() {
  const cards = await Promise.all(CARDS.map(enrichCard))
  return <PortfolioClient cards={cards} />
}
