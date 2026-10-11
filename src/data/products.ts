export type Category = 'm36' | 'web'

export interface Variant {
  id: string
  name: string
  preview: string
  file: string
}

export interface ProductAction {
  label: string
  href: string
  download?: boolean
}

export interface Product {
  id: string
  title: string
  summary: string
  description: string
  category: Category
  status: 'available' | 'soon'
  badge?: string
  meta?: string
  media: { kind: 'image'; src: string } | { kind: 'icon'; icon: 'blocks' | 'versions' }
  action?: ProductAction
  variants?: Variant[]
}

export const CATEGORIES: { id: Category | 'all'; label: string }[] = [
  { id: 'all', label: 'הכל' },
  { id: 'm36', label: 'נגן M36' },
  { id: 'web', label: 'אתרים וכלים' },
]

export const PRODUCTS: Product[] = [
  {
    id: 'm36-logo-partition',
    title: 'מחיצת לוגו לנגן M36',
    summary: 'בוחרים דגם לוגו ומורידים אותו לנגן.',
    description:
      'דגמי לוגו מוכנים לנגן M36. בוחרים את הדגם, רואים תצוגה מקדימה ומורידים את הקובץ.',
    category: 'm36',
    status: 'available',
    badge: 'מומלץ',
    meta: '5 דגמים',
    media: { kind: 'image', src: '/images/kosher-dark.png' },
    variants: [
      { id: 'top', name: 'דגם מתמחים טופ', preview: '/images/top.png', file: 'https://mitmachim.top/assets/uploads/files/1770730588683-logo.bin' },
      { id: 'q6-dark', name: 'דגם Q6 כהה', preview: '/images/q6-dark.png', file: 'https://mitmachim.top/assets/uploads/files/1770976270691-logo.bin' },
      { id: 'kosher-dark', name: 'דגם כשר כהה', preview: '/images/kosher-dark.png', file: 'https://mitmachim.top/assets/uploads/files/1770976371167-logo.bin' },
      { id: 'kosher-light', name: 'דגם כשר בהיר', preview: '/images/kosher-light.png', file: 'https://mitmachim.top/assets/uploads/files/1770976497337-logo.bin' },
      { id: 'q6-light', name: 'דגם Q6 בהיר', preview: '/images/q6-light.png', file: 'https://mitmachim.top/assets/uploads/files/1771171178216-logo.bin' },
    ],
  },
  {
    id: 'm36-logo-anim',
    title: 'לוגו ואנימציה לנגן M36',
    summary: 'מודול Magisk ללוגו ואנימציית אתחול חדשים.',
    description:
      'מודול Magisk שמחליף את הלוגו ואת אנימציית האתחול בנגן. כולל גיבוי אוטומטי של הקבצים המקוריים.',
    category: 'm36',
    status: 'available',
    badge: 'חדש',
    meta: 'גרסה 2.0 · Magisk',
    media: { kind: 'image', src: '/images/m36-logo-anim-preview.gif' },
    action: { label: 'הורדת המודול (ZIP)', href: '/downloads/m36-logo-anim-v2.0.zip', download: true },
  },
  {
    id: 'weblok',
    title: 'WEblok',
    summary: 'בלוקים מוכנים לאתר: צ׳אט, טפסים, פופאפים ועוד.',
    description:
      'מחולל בלוקים לאתרים. מעצבים בלוק מוכן, כמו עוזר צ׳אט, טופס יצירת קשר או פופאפ, ומעתיקים אותו לאתר. הבלוק עובד באתר שלכם בלי תלות בשרת חיצוני.',
    category: 'web',
    status: 'available',
    meta: 'כלי רשת',
    media: { kind: 'icon', icon: 'blocks' },
    action: { label: 'פתיחת WEblok', href: 'https://weblok-alpha.vercel.app' },
  },
  {
    id: 'm36-version-manager',
    title: 'ניהול גרסאות לנגן M36',
    summary: 'אפליקציה מתקדמת לניהול גרסאות בנגן.',
    description:
      'אפליקציית אנדרואיד לניהול גרסאות בנגן M36. נמצאת כרגע בפיתוח, והפרטים המלאים יתפרסמו כאן בהמשך.',
    category: 'm36',
    status: 'soon',
    badge: 'בפיתוח',
    meta: 'אנדרואיד',
    media: { kind: 'icon', icon: 'versions' },
  },
]
