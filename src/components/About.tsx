import { SITE } from '../data/site'

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <div className="about glass">
          <h2>{SITE.about.title}</h2>
          <p>{SITE.about.text}</p>
        </div>
      </div>
    </section>
  )
}
