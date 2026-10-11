import { SITE } from '../data/site'
import { ForumIcon, GithubIcon } from './Icons'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>{SITE.brand} · {new Date().getFullYear()}</span>
        <div className="social">
          <a className="glass" href={SITE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <GithubIcon />
          </a>
          <a className="glass" href={SITE.forum} target="_blank" rel="noopener noreferrer" aria-label="הפרופיל שלי במתמחים טופ">
            <ForumIcon />
          </a>
        </div>
      </div>
    </footer>
  )
}
