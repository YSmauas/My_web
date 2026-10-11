import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement>
const base = (p: P): P => ({
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
  ...p,
})

export const DownloadIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 19h14" />
  </svg>
)
export const ExternalIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M14 5h5v5M19 5l-8 8M18 14v4a1 1 0 01-1 1H6a1 1 0 01-1-1V7a1 1 0 011-1h4" />
  </svg>
)
export const CloseIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
)
export const MailIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
    <path d="M4 7.5l8 6 8-6" />
  </svg>
)
export const PhoneIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M6.5 4h3l1.5 4-2 1.5a11 11 0 005.5 5.5L16 13l4 1.5v3a2 2 0 01-2 2A14 14 0 014.500 6a2 2 0 012-2z" />
  </svg>
)
export const SendIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M20 4L10 14M20 4l-6 16-4-6-6-4 16-6z" />
  </svg>
)
export const BlocksIcon = (p: P) => (
  <svg {...base({ strokeWidth: 1.4, ...p })}>
    <rect x="3.500" y="3.500" width="7" height="7" rx="1.800" />
    <rect x="13.500" y="3.500" width="7" height="7" rx="1.800" />
    <rect x="3.500" y="13.500" width="7" height="7" rx="1.800" />
    <path d="M17 13.500v7M13.500 17h7" />
  </svg>
)
export const VersionsIcon = (p: P) => (
  <svg {...base({ strokeWidth: 1.4, ...p })}>
    <circle cx="6.500" cy="6" r="2.200" />
    <circle cx="6.500" cy="18" r="2.200" />
    <circle cx="17.500" cy="9" r="2.200" />
    <path d="M6.500 8.200v7.600M17.500 11.200c0 3-5 2.400-9.500 5" />
  </svg>
)
export const GithubIcon = (p: P) => (
  <svg {...base({ fill: 'currentColor', stroke: 'none', ...p })}>
    <path d="M12 0C5.370 0 0 5.370 0 12c0 5.310 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.230-.015-2.235-3.015.555-3.795-.735-4.035-1.410-.135-.345-.72-1.410-1.230-1.695-.42-.225-1.020-.78-.015-.795.945-.015 1.620.87 1.845 1.230 1.080 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.670-.3-5.460-1.335-5.460-5.925 0-1.305.465-2.385 1.230-3.225-.12-.3-.54-1.530.12-3.180 0 0 1.005-.315 3.300 1.230.96-.27 1.980-.405 3-.405s2.040.135 3 .405c2.295-1.560 3.300-1.230 3.300-1.230.66 1.650.24 2.880.12 3.180.765.84 1.230 1.905 1.230 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.220 0 1.605-.015 2.895-.015 3.300 0 .315.225.69.825.57A12.020 12.020 0 0024 12c0-6.630-5.370-12-12-12z" />
  </svg>
)
export const ForumIcon = (p: P) => (
  <svg {...base({ strokeWidth: 1.6, ...p })}>
    <path d="M4 6.500A2.500 2.500 0 016.500 4h11A2.500 2.500 0 0120 6.500v7a2.500 2.500 0 01-2.500 2.500H11l-4.500 4v-4h0A2.500 2.500 0 014 13.500z" />
    <path d="M8.500 9h7M8.500 12h4" />
  </svg>
)
