export type ParsedMedia =
  | { platform: 'instagram'; kind: 'p' | 'reel' | 'tv'; code: string }
  | { platform: 'youtube'; id: string }

/** Detect an embeddable Instagram or YouTube URL. Returns null for anything else. */
export function parseMedia(url: string): ParsedMedia | null {
  if (!url) return null

  const ig = url.match(/instagram\.com\/(p|reel|tv)\/([A-Za-z0-9_-]+)/)
  if (ig) {
    return { platform: 'instagram', kind: ig[1] as 'p' | 'reel' | 'tv', code: ig[2] }
  }

  const yt =
    url.match(/youtu\.be\/([A-Za-z0-9_-]{6,})/) ||
    url.match(/youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/)([A-Za-z0-9_-]{6,})/)
  if (yt) {
    return { platform: 'youtube', id: yt[1] }
  }

  return null
}

/** Build the in-page iframe embed URL for a parsed media reference. */
export function mediaEmbedUrl(m: ParsedMedia): string {
  if (m.platform === 'instagram') {
    return `https://www.instagram.com/${m.kind}/${m.code}/embed`
  }
  return `https://www.youtube.com/embed/${m.id}?autoplay=1&rel=0`
}

/** Build a lightweight preview image URL supplied by the media platform. */
export function mediaThumbnailUrl(m: ParsedMedia): string {
  if (m.platform === 'instagram') {
    return `/images/media-thumbnails/instagram/${m.code}.jpg`
  }
  return `https://i.ytimg.com/vi/${m.id}/hqdefault.jpg`
}

export function isEmbeddable(url: string): boolean {
  return parseMedia(url) !== null
}
