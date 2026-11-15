import type { Aspect, Provider } from './portfolio-cards'

/**
 * YouTube retorna uma imagem placeholder (~1 KB) quando a variante pedida
 * nao existe (comum em maxresdefault quando o cliente troca a thumb). Nesses
 * casos caimos no sddefault, que sempre existe pra videos publicos.
 */
async function resolveYoutubeHorizontalThumb(id: string): Promise<string> {
  const maxres = `https://img.youtube.com/vi/${id}/maxresdefault.jpg`
  try {
    const res = await fetch(maxres, { method: 'HEAD', next: { revalidate: 300 } })
    const size = Number(res.headers.get('content-length') ?? 0)
    if (res.ok && size > 2000) return maxres
  } catch {
    // fall through
  }
  return `https://img.youtube.com/vi/${id}/sddefault.jpg`
}

export async function youtubeThumb(id: string, aspect: Aspect = 'horizontal'): Promise<string> {
  if (aspect === 'vertical') {
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
  }
  return resolveYoutubeHorizontalThumb(id)
}

export async function fetchVimeoThumb(id: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${id}&width=1280`,
      { next: { revalidate: 300 } },
    )
    if (!res.ok) return null
    const data = (await res.json()) as { thumbnail_url?: string }
    return data.thumbnail_url ?? null
  } catch {
    return null
  }
}

export async function resolveThumb(
  provider: Provider,
  id: string,
  aspect: Aspect = 'horizontal',
): Promise<string> {
  if (provider === 'youtube') return youtubeThumb(id, aspect)
  const thumb = await fetchVimeoThumb(id)
  return thumb ?? ''
}


export function embedUrl(provider: Provider, id: string): string {
  if (provider === 'youtube') {
    return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`
  }
  return `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0`
}
