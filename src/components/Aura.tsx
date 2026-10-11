import { useEffect, useRef } from 'react'

// רקע ההילה הירוקה. זז לאט מעצמו, ובמכשיר עם עכבר גם זז קלות אחריה.
export default function Aura() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (reduce || !fine) return
    let raf = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2
        const y = (e.clientY / window.innerHeight - 0.5) * 2
        el.style.setProperty('--px', `${x * 28}px`)
        el.style.setProperty('--py', `${y * 22}px`)
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      window.removeEventListener('pointermove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="aura" ref={ref} aria-hidden="true">
      <span className="aura-blob aura-a" />
      <span className="aura-blob aura-b" />
      <span className="aura-blob aura-c" />
    </div>
  )
}
