import PortfolioClient from './PortfolioClient'
import { CARDS, type Card, type EnrichedCard } from './portfolio-cards'
import { resolveThumb } from './video-thumb'

async function enrichCard(card: Card): Promise<EnrichedCard> {
  const thumbUrl = await resolveThumb(card.provider, card.id, card.aspect)
  return { ...card, thumbUrl }
}

export default async function Portfolio() {
  const cards = await Promise.all(CARDS.map(enrichCard))
  return <PortfolioClient cards={cards} />
}
