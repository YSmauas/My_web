import { SITE } from '../data/site'

const LINKS = [
  { href: '#products', label: 'פיתוחים' },
  { href: '#about', label: 'עליי' },
  { href: '#contact', label: 'יצירת קשר' },
]

export default function Nav() {
  return (
    <header className="nav-wrap">
      <nav className="nav glass" aria-label="ניווט ראשי">
        <a className="brand" href="#top">
          <span className="brand-mark" aria-hidden="true" />
          {SITE.brand}
        </a>
        <ul className="nav-links">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href}>{l.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
