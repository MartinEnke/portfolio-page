import type { Metadata } from 'next'
import PortfolioClient from './PortfolioClient'

export const metadata: Metadata = {
  title: 'Martin Enke – Full-stack & GenAI Engineer (Python, FastAPI, React)',
  description:
    'Portfolio of Martin Enke: Python-first backend & GenAI engineer. ZoundZcope AI, AI Promo Agent, Groovebox, and more. Open to junior/entry-level roles.',
  alternates: { canonical: 'https://martinenke.vercel.app/' },
  openGraph: {
    type: 'website',
    url: 'https://martinenke.vercel.app/',
    title: 'Martin Enke – Full-stack & GenAI Engineer',
    description:
      'Python-first backend & GenAI engineer. Building LLM features and clean APIs.',
    // No need to specify images here; your opengraph-image.tsx handles it.
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Martin Enke – Full-stack & GenAI Engineer',
    description:
      'Python-first backend & GenAI engineer. Building LLM features and clean APIs.',
    // Will fall back to the same OG image unless you set twitter-image.tsx.
  },
}

export default function Page() {
  return <PortfolioClient />
}
