import { useState, type FormEvent } from 'react'
import { SITE } from '../data/site'
import { MailIcon, PhoneIcon, SendIcon } from './Icons'

type State = 'idle' | 'sending' | 'ok' | 'error'

export default function Contact() {
  const [state, setState] = useState<State>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    setState('sending')
    try {
      const res = await fetch(SITE.formspree, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })
      if (res.ok) {
        form.reset()
        setState('ok')
      } else {
        setState('error')
      }
    } catch {
      setState('error')
    }
  }

  return (
    <section className="section" id="contact">
      <div className="container">
        <div className="section-head">
          <h2>יצירת קשר</h2>
        </div>

        <div className="contact-grid">
          <div className="contact-info glass">
            <a className="contact-row" href={`mailto:${SITE.email}`}>
              <span className="contact-icon"><MailIcon /></span>
              <span>
                <small>דוא״ל</small>
                <bdi>{SITE.email}</bdi>
              </span>
            </a>
            <a className="contact-row" href={`tel:${SITE.phone}`}>
              <span className="contact-icon"><PhoneIcon /></span>
              <span>
                <small>טלפון</small>
                <bdi>{SITE.phone}</bdi>
              </span>
            </a>
          </div>

          <form className="contact-form glass" onSubmit={onSubmit}>
            <label>
              <span>שם מלא</span>
              <input type="text" name="name" required autoComplete="name" />
            </label>
            <label>
              <span>כתובת דוא״ל</span>
              <input type="email" name="email" required autoComplete="email" dir="ltr" />
            </label>
            <label>
              <span>הודעה</span>
              <textarea name="message" rows={5} required />
            </label>
            <input type="text" name="_gotcha" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
            <button type="submit" className="btn btn-primary" disabled={state === 'sending'}>
              <SendIcon /> {state === 'sending' ? 'שולח…' : 'שליחת הודעה'}
            </button>
            <p className="form-status" role="status" aria-live="polite">
              {state === 'ok' && 'ההודעה נשלחה. אחזור אליך בהקדם.'}
              {state === 'error' && 'השליחה נכשלה. אפשר לנסות שוב או לכתוב ישירות בדוא״ל.'}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}
