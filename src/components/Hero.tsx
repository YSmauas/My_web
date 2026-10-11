import type { CSSProperties } from 'react'
import { SITE } from '../data/site'

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1 className="rise" style={{ '--i': 0 } as CSSProperties}>
            {SITE.heroTitle}
          </h1>
          <p className="hero-text rise" style={{ '--i': 1 } as CSSProperties}>
            {SITE.heroText}
          </p>
          <div className="hero-actions rise" style={{ '--i': 2 } as CSSProperties}>
            <a className="btn btn-primary" href="#products">
              לפיתוחים
            </a>
            <a className="btn btn-ghost" href="#contact">
              יצירת קשר
            </a>
          </div>
        </div>

        <div className="hero-device rise" style={{ '--i': 3 } as CSSProperties}>
          <div className="device">
            <img
              src="/images/m36-logo-anim-preview.gif"
              alt="אנימציית אתחול של נגן M36"
              width={640}
              height={1136}
              fetchPriority="high"
            />
          </div>
          <span className="device-caption glass">אנימציית אתחול לנגן M36</span>
        </div>
      </div>
    </section>
  )
}
