import type { CSSProperties } from 'react'
import type { Product } from '../data/products'
import ProductMedia from './ProductMedia'

interface Props {
  product: Product
  index: number
  onOpen: () => void
}

export default function ProductCard({ product, index, onOpen }: Props) {
  const soon = product.status === 'soon'
  return (
    <article className="card glass" style={{ '--i': index } as CSSProperties}>
      <div className="card-media">
        <ProductMedia media={product.media} alt={product.title} />
        {product.badge && <span className={soon ? 'chip chip-soon' : 'chip'}>{product.badge}</span>}
      </div>
      <div className="card-body">
        <h3>{product.title}</h3>
        <p>{product.summary}</p>
        {product.meta && <span className="card-meta">{product.meta}</span>}
        <button type="button" className="btn btn-primary btn-block" onClick={onOpen}>
          {soon ? 'פרטים' : 'פרטים והורדה'}
        </button>
      </div>
    </article>
  )
}
