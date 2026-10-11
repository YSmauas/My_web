import { useState } from 'react'
import { CATEGORIES, PRODUCTS, type Category, type Product } from '../data/products'
import ProductCard from './ProductCard'
import ProductDialog from './ProductDialog'

export default function Products() {
  const [filter, setFilter] = useState<Category | 'all'>('all')
  const [open, setOpen] = useState<Product | null>(null)

  const list = filter === 'all' ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter)

  return (
    <section className="section" id="products">
      <div className="container">
        <div className="section-head">
          <h2>הפיתוחים</h2>
          <div className="tabs" role="group" aria-label="סינון לפי קטגוריה">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                className="tab"
                aria-pressed={filter === c.id}
                onClick={() => setFilter(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid" key={filter}>
          {list.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} onOpen={() => setOpen(p)} />
          ))}
        </div>
      </div>

      <ProductDialog product={open} onClose={() => setOpen(null)} />
    </section>
  )
}
