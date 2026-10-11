# הפיתוחים שלי

אתר סטטי: Vite + React + TypeScript. נפרס ב-Vercel כאתר סטטי (התיקייה `dist`), בלי פונקציות שרת.

## הרצה מקומית
```bash
npm install
npm run dev
```

## בנייה ובדיקה
```bash
npm run build     # בדיקת טיפוסים + בנייה ל-dist/
npm run preview   # תצוגה מקדימה של הבנייה
```

## פריסה ב-Vercel
מעלים את הפרויקט ל-GitHub ומייבאים ב-Vercel. ההגדרות מזוהות אוטומטית (Vite, פלט `dist`).

## איך עורכים
- `src/data/site.ts` – טקסטים, אימייל, טלפון וקישורים.
- `src/data/products.ts` – רשימת המוצרים. מוסיפים מוצר חדש בהוספת אובייקט לרשימה.
- `public/images` ו-`public/downloads` – תמונות וקבצים להורדה.
- `src/styles.css` – כל העיצוב. צבע ההילה: `--aura`.
