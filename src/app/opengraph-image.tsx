// src/app/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          gap: 28,
          padding: 40,
          backgroundColor: '#0b1220', // deep blue card
          color: '#EAF2FF',
          letterSpacing: -0.5,
          overflow: 'hidden',
          // no outer frame here; this whole image IS the hero card
        }}
      >
        {/* Blue glows (safe radial-gradients) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(900px 520px at 22% 12%, rgba(59,130,246,0.35), rgba(59,130,246,0) 60%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(800px 480px at 78% 80%, rgba(29,78,216,0.28), rgba(29,78,216,0) 60%)',
          }}
        />

        {/* Glassy overlays (no backdrop-filter; just soft gradients + hairlines) */}
        <div
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 180,
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.00))',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.00) 45%)',
            opacity: 0.6,
          }}
        />
        {/* inner highlight/shadow edges */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1, background: 'rgba(255,255,255,0.22)' }} />
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 1, background: 'rgba(255,255,255,0.18)' }} />
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 1, background: 'rgba(0,0,0,0.28)' }} />
        <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 1, background: 'rgba(0,0,0,0.25)' }} />

        {/* Text (solid color, no background-clip) */}
        <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 90, fontWeight: 800, lineHeight: 1 }}>
            Martin Enke
          </div>

          <div style={{ marginTop: 6, fontSize: 60, fontWeight: 700, lineHeight: 1.04 }}>
            Full-Stack & GenAI Developer
          </div>

          <div style={{ marginTop: 18, fontSize: 32, opacity: 0.92 }}>
            Python · FastAPI/Flask · SQL/PostgreSQL · LLMs (RAG) · React · TypeScript
          </div>

          <div style={{ marginTop: 14, fontSize: 22, opacity: 0.8 }}>
            I design clean, scalable APIs and integrate LLMs into real products.
          </div>
        </div>

        {/* Right-side tile (no remote <img> to keep it safe) */}
        <div
          style={{
            position: 'relative',
            width: 360,
            backgroundColor: 'rgba(255,255,255,0.06)',
          }}
        />
      </div>
    ),
    size
  )
}
