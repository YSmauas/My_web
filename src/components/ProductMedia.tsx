import type { Product } from '../data/products'
import { BlocksIcon, VersionsIcon } from './Icons'

export default function ProductMedia({ media, alt }: { media: Product['media']; alt: string }) {
  if (media.kind === 'image') {
    return <img src={media.src} alt={alt} loading="lazy" decoding="async" />
  }
  const Icon = media.icon === 'blocks' ? BlocksIcon : VersionsIcon
  return (
    <span className="media-icon" role="img" aria-label={alt}>
      <Icon width={64} height={64} />
    </span>
  )
}
