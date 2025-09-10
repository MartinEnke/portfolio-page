'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

/**
 * Portfolio — grid-aligned, full-viewport background
 * - Full-page light grid (fixed canvas)
 * - Random-direction sweep; speed = 0.09 · diag; band = 0.75 of previous
 * - Smooth loop transitions: fade-in + color cross-fade (no flash)
 * - Brighter crest at center of the sweep (sharper falloff)
 * - Ultra-transparent new tint color each sweep
 * - Cards align to grid via CSS var --cell; squared edges and compact
 * - Photo block + About + Contact form (POST /api/contact) with honeypot
 */

export default function PortfolioPage() {
  const isWip = process.env.NEXT_PUBLIC_WIP === 'true'
  const projects = [
    {
      title: 'ZoundZcope AI',
      desc: 'Audio analysis & AI feedback — backend-first. Coming soon.',
      tech: ['Python', 'FastAPI', 'SQLAlchemy', 'OpenAI API', 'FAISS'],
      hosted: 'WIP',
    },
    {
      title: 'Groovebox',
      desc: 'Mobile-first drum-loop groovebox — tap, record, and save sessions.',
      tech: ['React', 'Vite', 'TypeScript', 'Web Audio API', 'localStorage'],
      hosted: 'Vercel',
      href: 'https://groovebox-martin.vercel.app/',
    },
    {
      title: 'The Quiet Almanac',
      desc: 'Multilingual blog with auth, AI moderation, and AI features.',
      tech: ['Flask', 'OpenAI API', 'PostgreSQL', 'JWT', 'Tailwind CSS'],
      hosted: 'Render',
      href: 'https://the-quiet-almanac.onrender.com/',
    },
  ]

  // contact form state
  const [sending, setSending] = useState<false | 'sending' | 'ok' | 'error'>(false)
  const [errorMsg, setErrorMsg] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget // capture BEFORE any await
    const fd = new FormData(form)
    const name = String(fd.get('name') || '').trim()
    const email = String(fd.get('email') || '').trim()
    const message = String(fd.get('message') || '').trim()
    const company = String(fd.get('company') || '').trim() // honeypot

    if (company) { // likely bot
      setSending('ok')
      form.reset()
      return
    }
    if (!name || !email || !message) {
      setSending('error')
      setErrorMsg('Please fill out all fields.')
      return
    }

    setSending('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, company }),
      })
      if (!res.ok) throw new Error('Failed to send')
      setSending('ok')
      form.reset()
    } catch (err: any) {
      setSending('error')
      setErrorMsg(err?.message || 'Something went wrong.')
    } finally {
      setTimeout(() => setSending(false), 4000)
    }
  }

  return (
    <>
      {isWip && (
        <div className="fixed top-2 right-2 z-50 border border-white/15 bg-white/10 px-2 py-1 text-[11px] text-slate-200 tracking-wide">
          WIP
        </div>
      )}
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden">
      {/* Full-viewport background */}
      <div className="pointer-events-none fixed inset-0">
        <GridShimmer />
      </div>
      <div className="pointer-events-none fixed inset-0 mix-blend-screen opacity-60 [background:radial-gradient(60%_60%_at_50%_40%,rgba(139,92,246,0.10),transparent_70%),radial-gradient(40%_40%_at_80%_20%,rgba(34,211,238,0.08),transparent_70%)]" />

      {/* content */}
      <main
        className="relative z-10 mx-auto w-full max-w-6xl"
        style={{ padding: 'calc(var(--cell, 28px) * 0.9)' }}
      >
        {/* Hero + Photo */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-8"
        >
          <div className="grid grid-cols-12" style={{ gap: 'calc(var(--cell, 28px) * 0.5)' }}>
            {/* Hero card */}
<div
  className="col-span-12 md:col-span-8 border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg shadow-black/20"
  style={{ padding: 'calc(var(--cell, 28px) * 0.8)' }}
>
  <div className="flex flex-col gap-5 md:gap-6">
    <div>
    <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-cyan-200 text-[1.5em] leading-tight">
    Martin Enke
  </span>
  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-cyan-200">
    Full-Stack &amp; GenAI Developer
  </span>
</h1>

      {/* Skills strip */}
      <p className="mt-3 text-sm sm:text-base text-slate-300">
      Python · FastAPI/Flask · SQL/PostgreSQL · LLMs (RAG) · React · TypeScript
      </p>

      {/* What I do (keep this crisp, no background/shipped here) */}
      <p className="mt-3 text-sm sm:text-base text-slate-300/90">
        I design clean, scalable APIs and integrate LLMs into real products.
      </p>
    </div>

    {/* CTAs */}
    <div className="flex flex-wrap gap-3">
      <a
        href="#contact"
        className="border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 active:scale-[.99] transition"
      >
        Contact
      </a>
      <a
  href="https://github.com/MartinEnke"
  target="_blank"
  rel="noopener noreferrer"
  className="border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 active:scale-[.99] transition"
>
  GitHub
</a>
<a
  href="https://www.linkedin.com/in/martin-enke-/"
  target="_blank"
  rel="noopener noreferrer"
  className="border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 active:scale-[.99] transition"
>
  LinkedIn
</a>

    </div>

    {/* About (personal + shipped; avoids repeating the one-liner above) */}
    <div className="text-sm text-slate-300/90">
      <p>
        I’m a Python-first backend &amp; GenAI dev with roots in music. Studied full-time at
        Masterschool (Backend / AI Engineering). Built two LLM-powered full-stack apps and a playful React based Drum Computer app.
        Backend-led, frontend-curious.
      </p>
    </div>
  </div>
</div>

            {/* Photo: add /public/me.jpg */}
            <div
              className="col-span-12 md:col-span-4 border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg shadow-black/20 flex items-center justify-center"
              style={{ padding: 'calc(var(--cell, 28px) * 0.3)', aspectRatio: '3 / 4' }}
            >
              <Image
  src="/me.jpg"
  alt="Martin Enke"
  width={600}
  height={800}
  className="h-full w-full object-cover"
  style={{ filter: 'contrast(1.05) saturate(1.05)' }}
  priority
/>
            </div>
          </div>
        </motion.section>

        {/* Projects */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div
            className="flex items-center justify-between"
            style={{ marginBottom: 'calc(var(--cell, 28px) * 0.4)' }}
          >
            <h2 className="text-lg sm:text-xl md:text-2xl font-medium tracking-tight">Featured Projects</h2>
            <span className="hidden sm:inline text-xs text-slate-400">Vercel / Render / WIP</span>
          </div>

          <div className="grid grid-cols-12" style={{ gap: 'calc(var(--cell, 28px) * 0.5)' }}>
  {projects.map((p) =>
    p.href ? (
      <a
        key={p.title}
        href={p.href}
        target="_blank"
        rel="noopener noreferrer"
        className="col-span-12 md:col-span-6 lg:col-span-4 group relative border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg shadow-black/20"
        style={{ padding: 'calc(var(--cell, 28px) * 0.7)' }}
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base sm:text-lg font-semibold">{p.title}</h3>
            <span className="text-[10px] uppercase tracking-wider border border-white/15 bg-white/10 px-2 py-1 text-slate-300">
              {p.hosted}
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-300/90">{p.desc}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <span key={t} className="text-[11px] border border-white/10 bg-white/5 px-2 py-1 text-slate-300">
                {t}
              </span>
            ))}
          </div>
        </div>
      </a>
    ) : (
      <div
        key={p.title}
        className="col-span-12 md:col-span-6 lg:col-span-4 group relative border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg shadow-black/20"
        style={{ padding: 'calc(var(--cell, 28px) * 0.7)' }}
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-base sm:text-lg font-semibold">{p.title}</h3>
            <span className="text-[10px] uppercase tracking-wider border border-white/15 bg-white/10 px-2 py-1 text-slate-300">
              {p.hosted}
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-300/90">{p.desc}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <span key={t} className="text-[11px] border border-white/10 bg-white/5 px-2 py-1 text-slate-300">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    )
  )}
</div>

        </motion.section>

        {/* Contact */}
        <motion.section
          id="contact"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8"
        >
          <div className="grid grid-cols-12" style={{ gap: 'calc(var(--cell, 28px) * 0.5)' }}>
            <div
              className="col-span-12 md:col-span-8 border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg shadow-black/20"
              style={{ padding: 'calc(var(--cell, 28px) * 0.8)' }}
            >
              <h3 className="text-xl font-medium tracking-tight mb-3">Contact</h3>
              <p className="text-slate-300/90 text-sm mb-4">Open to work—please share a few details and I’ll respond promptly.</p>

              <form onSubmit={onSubmit} className="grid grid-cols-12 gap-3">
                {/* Honeypot (hidden from humans) */}
                <div className="hidden">
                  <label>
                    Company
                    <input name="company" autoComplete="off" />
                  </label>
                </div>

                <label className="col-span-12 md:col-span-6 text-xs text-slate-300/80">
                  Name
                  <input
                    name="name"
                    className="mt-1 w-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 outline-none focus:border-white/20"
                    placeholder="Your name"
                    required
                  />
                </label>
                <label className="col-span-12 md:col-span-6 text-xs text-slate-300/80">
                  Email
                  <input
                    name="email"
                    type="email"
                    className="mt-1 w-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 outline-none focus:border-white/20"
                    placeholder="you@example.com"
                    required
                  />
                </label>
                <label className="col-span-12 text-xs text-slate-300/80">
                  Message
                  <textarea
                    name="message"
                    rows={5}
                    className="mt-1 w-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 outline-none focus:border-white/20 resize-y"
                    placeholder="What can I help you with?"
                    required
                  />
                </label>
                <div className="col-span-12 flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={sending === 'sending'}
                    className="border border-white/15 bg-white/10 px-4 py-2 text-sm hover:bg-white/15 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending === 'sending' ? 'Sending…' : 'Send message'}
                  </button>
                  {sending === 'ok' && (
                    <span className="text-xs text-green-300">Thanks! Your message has been sent.</span>
                  )}
                  {sending === 'error' && (
                    <span className="text-xs text-rose-300">{errorMsg}</span>
                  )}
                </div>
              </form>

              {/* No direct email printed to avoid scraping */}
              <div className="mt-4 text-xs text-slate-400">
                Prefer socials?{' '}
                <a href="https://github.com/MartinEnke" target="_blank" className="underline">GitHub</a>
                {' · '}
                <a href="https://www.linkedin.com/in/martin-enke-/" target="_blank" className="underline">LinkedIn</a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <div className="text-center text-xs text-slate-500" style={{ marginTop: 'calc(var(--cell, 28px) * 0.9)' }}>
          © {new Date().getFullYear()} Martin Enke — Built with Next.js + Tailwind. Deployed on Vercel.
        </div>
      </main>
    </div>
    </>
  )
}

function GridShimmer() {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const motionOK = useRef(true)
  const coarse = useRef(false)
  const running = useRef(true)
  const pointer = useRef<{ x: number; y: number; active: boolean }>({ x: -9999, y: -9999, active: false })

  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    motionOK.current = !m.matches
    const onChange = () => (motionOK.current = !m.matches)
    m.addEventListener?.('change', onChange)

    const pc = window.matchMedia('(pointer: coarse)')
    coarse.current = pc.matches
    const onPC = () => (coarse.current = pc.matches)
    pc.addEventListener?.('change', onPC)

    const onVis = () => (running.current = document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', onVis)

    return () => {
      m.removeEventListener?.('change', onChange)
      pc.removeEventListener?.('change', onPC)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    const dpr = Math.min(2, window.devicePixelRatio || 1)

    function resizeToViewport() {
      const width = window.innerWidth
      const height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resizeToViewport()
    window.addEventListener('resize', resizeToViewport)

    function setPointer(clientX: number, clientY: number) {
      pointer.current.x = clientX
      pointer.current.y = clientY
      pointer.current.active = true
    }
    function onMove(e: MouseEvent) { setPointer(e.clientX, e.clientY) }
    function onLeave() { pointer.current.active = false; pointer.current.x = -9999; pointer.current.y = -9999 }
    function onTouch(e: TouchEvent) {
      if (!e.touches?.length) return onLeave()
      const t = e.touches[0]
      setPointer(t.clientX, t.clientY)
    }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('touchstart', onTouch, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('touchend', onLeave)

    // ---------- Overlapped sweeps (up to 2 active) ----------
    const OVERLAP_SEC = 1.5

    type Pass = {
      angle: number
      pos: number
      hueFrom: number
      hueTo: number
      hueT: number // 0..1 (fade/color progress)
    }

    const passes: Pass[] = []

    // helpers
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

    function randomAngle() { return Math.random() * Math.PI * 2 }

    // Only BLUE or YELLOW hues (no pinks):
    function randomBlueYellowHue() {
      // Yellow ~48–60°, Blue ~200–235°
      return Math.random() < 0.5
        ? 48 + Math.random() * 12    // yellow band
        : 200 + Math.random() * 35   // blue band
    }

    function hslToRgb(h: number, s: number, l: number) {
      // h,s,l in [0..1]
      const a = s * Math.min(l, 1 - l)
      const f = (n: number) => {
        const k = (n + h * 12) % 12
        const col = l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)))
        return Math.round(col * 255)
      }
      return [f(0), f(8), f(4)] as const
    }
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    function spawnPass(w: number, h: number, margin: number): Pass {
      const angle = randomAngle()
      const ux = Math.cos(angle)
      const uy = Math.sin(angle)
      const projs = [0 * ux + 0 * uy, w * ux + 0 * uy, 0 * ux + h * uy, w * ux + h * uy]
      const minProj = Math.min(...projs)
      return {
        angle,
        pos: minProj - margin,
        hueFrom: randomBlueYellowHue(),
        hueTo: randomBlueYellowHue(),
        hueT: 0,
      }
    }

    // start with one pass; pos set once dims known
    passes.push({
      angle: randomAngle(),
      pos: Number.NEGATIVE_INFINITY,
      hueFrom: randomBlueYellowHue(),
      hueTo: randomBlueYellowHue(),
      hueT: 1,
    })

    let last = performance.now()

    function draw(now: number) {
      if (!running.current) { requestAnimationFrame(draw); return }

      const dt = Math.max(0.001, (now - last) / 1000)
      last = now

      const w = canvas.width / dpr
      const h = canvas.height / dpr

      ctx.clearRect(0, 0, w, h)

      const base = Math.min(w, h)
      const coarseBoost = coarse.current ? 1.5 : 1
      const cell = Math.max(20 * coarseBoost, Math.min(42 * coarseBoost, Math.floor(base / 22)))
      document.documentElement.style.setProperty('--cell', `${cell}px`)

      const cols = Math.ceil(w / cell)
      const rows = Math.ceil(h / cell)

      const diag = Math.hypot(w, h)
      const speed = diag * 0.09 // requested factor
      const margin = cell * 4
      const band = Math.max(cell * 6, diag * 0.3) // narrower band

      // Initialize first pass position once we know w/h
      if (passes.length === 1 && !Number.isFinite(passes[0].pos)) {
        const p = passes[0]
        const ux = Math.cos(p.angle), uy = Math.sin(p.angle)
        const projs = [0 * ux + 0 * uy, w * ux + 0 * uy, 0 * ux + h * uy, w * ux + h * uy]
        const minProj = Math.min(...projs)
        p.pos = minProj - margin
      }

      // Advance passes; spawn & cleanup with overlap
      let spawned = false
      for (let i = passes.length - 1; i >= 0; i--) {
        const p = passes[i]
        p.pos += speed * dt
        p.hueT = Math.min(1, p.hueT + dt / 0.6) // smooth fade/color progress

        const ux = Math.cos(p.angle), uy = Math.sin(p.angle)
        const projs = [0 * ux + 0 * uy, w * ux + 0 * uy, 0 * ux + h * uy, w * ux + h * uy]
        const minProj = Math.min(...projs)
        const maxProj = Math.max(...projs)

        // Spawn next pass before this one exits (overlap window)
        if (!spawned && passes.length < 2 && p.pos > maxProj + margin - speed * OVERLAP_SEC) {
          passes.push(spawnPass(w, h, margin))
          spawned = true
        }

        // Remove finished pass
        if (p.pos > maxProj + margin) {
          passes.splice(i, 1)
        }
      }

      // Pointer glow (smaller radius)
      const hasPointer = pointer.current.active && motionOK.current
      const px = pointer.current.x
      const py = pointer.current.y
      const sigma = Math.min(35, cell * 0.8)

      // Precompute per-pass color & direction
      const passCache = passes.map((p) => {
        const mixT = easeInOutCubic(p.hueT)
        const [r1, g1, b1] = hslToRgb((p.hueFrom % 360) / 360, 0.75, 0.65)
        const [r2, g2, b2] = hslToRgb((p.hueTo % 360) / 360, 0.75, 0.65)
        return {
          p,
          mixT,
          color: {
            r: Math.round(lerp(r1, r2, mixT)),
            g: Math.round(lerp(g1, g2, mixT)),
            b: Math.round(lerp(b1, b2, mixT)),
          },
          ux: Math.cos(p.angle),
          uy: Math.sin(p.angle),
        }
      })

      const tintAlphaScale = 0.42 // hyper transparent

      for (let rI = 0; rI < rows; rI++) {
        for (let cI = 0; cI < cols; cI++) {
          const x = cI * cell + cell / 2
          const y = rI * cell + cell / 2

          // pointer glow
          let glow = 0
          if (hasPointer) {
            const dx = x - px
            const dy = y - py
            const dist2 = dx * dx + dy * dy
            glow = Math.exp(-dist2 / (2 * sigma * sigma))
          }

          // combine active passes
          let sTotal = 0
          let rAcc = 0, gAcc = 0, bAcc = 0

          for (const { p, mixT, color, ux, uy } of passCache) {
            const proj = x * ux + y * uy
            const dxs = Math.abs(proj - p.pos)
            // Brighter crest in the middle
            const crest = Math.max(0, 1 - dxs / band)
            const s = (crest * crest) * mixT
            if (s > 0.0001) {
              sTotal += s
              rAcc += color.r * s
              gAcc += color.g * s
              bAcc += color.b * s
            }
          }

          // normalized color (if any pass contributes)
          let r = 255, g = 255, b = 255
          if (sTotal > 0) {
            r = Math.round(rAcc / sTotal)
            g = Math.round(gAcc / sTotal)
            b = Math.round(bAcc / sTotal)
          }

          // base + combined sweep + glow + subtle noise
          const noise = (Math.sin((x + y) * 0.05 + now * 0.0018) + 1) * 0.02
          let alpha = 0.026 + Math.min(1, sTotal) * 0.33 + glow * 0.45 + noise
          alpha = Math.max(0.02, Math.min(0.65, alpha))

          ctx.fillStyle = `rgba(${r},${g},${b},${alpha * tintAlphaScale})`
          ctx.fillRect(x - cell / 2 + 0.5, y - cell / 2 + 0.5, cell - 1, cell - 1)

          ctx.strokeStyle = 'rgba(255,255,255,0.04)'
          ctx.strokeRect(x - cell / 2 + 0.5, y - cell / 2 + 0.5, cell - 1, cell - 1)
        }
      }

      requestAnimationFrame(draw)
    }

    requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resizeToViewport)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('touchstart', onTouch)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('touchend', onLeave)
    }
  }, [])

  return <canvas ref={ref} className="h-full w-full block" />
}
