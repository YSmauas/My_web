import { useEffect, useRef, useState } from 'react'
import type { Product } from '../data/products'
import { CloseIcon, DownloadIcon, ExternalIcon } from './Icons'
import ProductMedia from './ProductMedia'

interface Props {
  product: Product | null
  onClose: () => void
}

export default function ProductDialog({ product, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = ref.current
    if (!d) return
    if (product && !d.open) d.showModal()
    if (!product && d.open) d.close()
  }, [product])

  return (
    <dialog
      ref={ref}
      className="dialog"
      aria-labelledby="dialog-title"
      onClose={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      {product && <DialogBody key={product.id} product={product} onClose={onClose} />}
    </dialog>
  )
}

function DialogBody({ product, onClose }: { product: Product; onClose: () => void }) {
  const variants = product.variants
  const [variantId, setVariantId] = useState(variants?.[0]?.id ?? '')
  const variant = variants?.find((v) => v.id === variantId)

  const preview: Product['media'] = variant
    ? { kind: 'image', src: variant.preview }
    : product.media

  const soon = product.status === 'soon'
  const external = product.action && !product.action.download

  return (
    <div className="dialog-panel glass">
      <button type="button" className="dialog-close" onClick={onClose} aria-label="סגירה">
        <CloseIcon />
      </button>

      <div className="dialog-media" key={variant?.id ?? 'single'}>
        <ProductMedia media={preview} alt={variant?.name ?? product.title} />
      </div>

      <div className="dialog-info">
        <h3 id="dialog-title">{product.title}</h3>
        <p>{product.description}</p>
        {product.meta && <span className="card-meta">{product.meta}</span>}

        {variants && (
          <div className="variants" role="group" aria-label="בחירת דגם">
            {variants.map((v) => (
              <button
                key={v.id}
                type="button"
                className="tab"
                aria-pressed={v.id === variantId}
                onClick={() => setVariantId(v.id)}
              >
                {v.name}
              </button>
            ))}
          </div>
        )}

        <div className="dialog-actions">
          {variant && (
            <a className="btn btn-primary" href={variant.file} target="_blank" rel="noopener noreferrer">
              <DownloadIcon /> הורדת הדגם
            </a>
          )}
          {product.action && (
            <a
              className="btn btn-primary"
              href={product.action.href}
              {...(product.action.download ? { download: true } : { target: '_blank', rel: 'noopener noreferrer' })}
            >
              {external ? <ExternalIcon /> : <DownloadIcon />} {product.action.label}
            </a>
          )}
          {soon && <span className="soon-note">בקרוב</span>}
        </div>
      </div>
    </div>
  )
}
