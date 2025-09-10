import './globals.css'
import type { Metadata } from 'next'

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Martin Enke — Full-Stack & GenAI Developer', template: '%s — Martin Enke' },
  description:
    'Backend & GenAI developer integrating LLMs into real products. Python · FastAPI/Flask · React · TypeScript · SQL/PostgreSQL.',
  alternates: { canonical: siteUrl }, // absolute canonical
  openGraph: {
    type: 'website',
    url: siteUrl,                     // absolute page URL
    siteName: 'Martin Enke — Portfolio',
    title: 'Martin Enke — Full-Stack & GenAI Developer',
    description:
      'Backend & GenAI developer integrating LLMs into real products. Python · FastAPI/Flask · React · TypeScript · SQL/PostgreSQL.',
    images: [
      { url: `${siteUrl}/og.png`, width: 1200, height: 630, alt: 'Martin Enke — Portfolio' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Martin Enke — Full-Stack & GenAI Developer',
    description:
      'Backend & GenAI developer integrating LLMs into real products. Python · FastAPI/Flask · React · TypeScript · SQL/PostgreSQL.',
    images: [`${siteUrl}/og.png`],
  },
  icons: { icon: [{ url: '/favicon.png?v=3', type: 'image/png' }] },
}
