import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// פלט סטטי בלבד (dist/) – Vercel מגיש אותו כאתר סטטי, בלי פונקציות שרת.
export default defineConfig({
  plugins: [react()],
})
