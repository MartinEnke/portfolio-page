// src/app/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const INCLUDE_PHOTO = true // set to false if you prefer no portrait

export default function OG() {
  return new ImageResponse(
    (
      // Outer area = black frame
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#000000',
          color: '#EAF2FF',
          padding: 56, // frame thickness
          letterSpacing: -0.5,
        }}
      >
        {/* Hero card (blue, glassy) */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            gap: 28,
            padding: 40,
            backgroundColor: '#0b1220',                 // deep blue base
            border: '1px solid rgba(255,255,255,0.14)', // subtle edge
            overflow: 'hidden',    
            borderRadius: 12,                      // clip overlays
          }}
        >
          {/* Blue glows on the card */}
          <div
            style={{
              position: 'absolute', inset: 0,
              background:
                'radial-gradient(900px 520px at 22% 12%, rgba(59,130,246,0.35), transparent 60%)',
            }}
          />
          <div
            style={{
              position: 'absolute', inset: 0,
              background:
                'radial-gradient(800px 480px at 78% 80%, rgba(29,78,216,0.28), transparent 60%)',
            }}
          />

          {/* Glassy overlays (simulate sheen & inner edges) */}
          {/* Top soft sheen */}
          <div
            style={{
              position: 'absolute', left: 0, right: 0, top: 0, height: 180,
              background: 'linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.00))',
            }}
          />
          {/* Diagonal subtle sheen */}
          <div
            style={{
              position: 'absolute', inset: 0,
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.00) 45%)',
              opacity: 0.6,
            }}
          />
          {/* Inner highlight edges */}
          <div
            style={{
              position: 'absolute', left: 0, right: 0, top: 0, height: 1,
              background: 'rgba(255,255,255,0.22)',
            }}
          />
          <div
            style={{
              position: 'absolute', left: 0, top: 0, bottom: 0, width: 1,
              background: 'rgba(255,255,255,0.18)',
            }}
          />
          {/* Inner shadow edges for depth */}
          <div
            style={{
              position: 'absolute', left: 0, right: 0, bottom: 0, height: 1,
              background: 'rgba(0,0,0,0.28)',
            }}
          />
          <div
            style={{
              position: 'absolute', right: 0, top: 0, bottom: 0, width: 1,
              background: 'rgba(0,0,0,0.25)',
            }}
          />

          {/* Left: text (above overlays) */}
          <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Name */}
            <div
              style={{
                fontSize: 90,
                fontWeight: 800,
                lineHeight: 1,
                background: 'linear-gradient(90deg,#c7d2fe,#a5f3fc)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Martin Enke
            </div>

            {/* Title */}
            <div
              style={{
                marginTop: 6,
                fontSize: 60,
                fontWeight: 700,
                lineHeight: 1.04,
                background: 'linear-gradient(90deg,#c7d2fe,#67e8f9)',
                backgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Full-Stack & GenAI Developer
            </div>

            {/* Skills strip */}
            <div style={{ marginTop: 18, fontSize: 32, opacity: 0.92 }}>
              Python · FastAPI/Flask · SQL/PostgreSQL · LLMs (RAG) · React · TypeScript
            </div>

            {/* One-liner */}
            <div style={{ marginTop: 14, fontSize: 22, opacity: 0.8 }}>
              I design clean, scalable APIs and integrate LLMs into real products.
            </div>
          </div>

          {/* Right: photo tile */}
          {INCLUDE_PHOTO && (
            <div
              style={{
                position: 'relative',
                width: 360, // ~3:4 area
                backgroundColor: 'rgba(255,255,255,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {/* Slight tile sheen */}
              <div
                style={{
                  position: 'absolute', left: 0, right: 0, top: 0, height: 90,
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.00))',
                  pointerEvents: 'none',
                }}
              />
              <img
                src={`${SITE_URL}/me.jpg`}
                width={360}
                height={480}
                alt="Martin Enke"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          )}
        </div>
      </div>
    ),
    { ...size }
  )
}
