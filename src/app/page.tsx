'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { createPortal } from 'react-dom'

type Project = {
  title: string
  desc: string
  tech: string[]
  hosted: string
  href?: string
  preview?: string       // static image preview (recommended)
  previewVideo?: string  // short muted loop (optional)
}

export default function PortfolioPage() {
  const isWip = process.env.NEXT_PUBLIC_WIP === 'true'

  const projects: Project[] = [
    {
      title: 'ZoundZcope AI',
      desc:
        'Audio analysis & AI feedback. Live free-tier demo: some metrics approximated; RAG temporarily disabled.',
      tech: ['Python', 'FastAPI', 'SQLAlchemy', 'OpenAI API', 'librosa', 'Tailwind'],
      hosted: 'Render',
      href: 'https://zoundzcope-ai.onrender.com/',
      preview: '/previews/zoundzcope.jpg',
      // previewVideo: '/previews/zoundzcope.webm', // optional micro-demo
    },
    {
      title: 'Groovebox',
      desc: 'Mobile-first drum-loop groovebox — tap, record, and save sessions.',
      tech: ['React', 'Vite', 'TypeScript', 'Web Audio API', 'localStorage'],
      hosted: 'Vercel',
      href: 'https://groovebox-martin.vercel.app/',
      preview: '/previews/groovebox.jpg',
    },
    {
      title: 'The Quiet Almanac',
      desc: 'Multilingual blog with auth, AI moderation, and AI features.',
      tech: ['Flask', 'OpenAI API', 'PostgreSQL', 'JWT', 'Tailwind CSS'],
      hosted: 'Render',
      href: 'https://the-quiet-almanac.onrender.com/',
      preview: '/previews/almanac.jpg',
    },
  ]

  // contact form state
  const [sending, setSending] = useState<false | 'sending' | 'ok' | 'error'>(false)
  const [errorMsg, setErrorMsg] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const name = String(fd.get('name') || '').trim()
    const email = String(fd.get('email') || '').trim()
    const message = String(fd.get('message') || '').trim()
    const company = String(fd.get('company') || '').trim() // honeypot

    if (company) {
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
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.'
      setSending('error')
      setErrorMsg(msg)
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

                    <p className="mt-3 text-sm sm:text-base text-slate-300">
                      Python · FastAPI/Flask · SQL/PostgreSQL · LLMs (RAG) · React · TypeScript
                    </p>

                    <p className="mt-3 text-sm sm:text-base text-slate-300/90">
                      I design clean, scalable APIs and integrate LLMs into real products.
                    </p>
                  </div>

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

                  <div className="text-sm text-slate-300/90">
                    <p>
                      I’m a Python-first backend &amp; GenAI dev with roots in music. Built two
                      LLM-powered full-stack apps and a playful React groovebox. Backend-led,
                      frontend-curious.
                    </p>
                  </div>
                </div>
              </div>

              {/* Photo */}
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
              <h2 className="text-lg sm:text-xl md:text-2xl font-medium tracking-tight">
                Featured Projects
              </h2>
              <span className="hidden sm:inline text-xs text-slate-400">Vercel / Render</span>
            </div>

            <div className="grid grid-cols-12" style={{ gap: 'calc(var(--cell, 28px) * 0.5)' }}>
              {projects.map((p) => (
                <ProjectCard key={p.title} project={p} />
              ))}
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
                <p className="text-slate-300/90 text-sm mb-4">
                  Open to work—please share a few details and I’ll respond promptly.
                </p>

                <form onSubmit={onSubmit} className="grid grid-cols-12 gap-3">
                  {/* Honeypot */}
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

                <div className="mt-4 text-xs text-slate-400">
                  Prefer socials?{' '}
                  <a href="https://github.com/MartinEnke" target="_blank" className="underline">
                    GitHub
                  </a>
                  {' · '}
                  <a
                    href="https://www.linkedin.com/in/martin-enke-/"
                    target="_blank"
                    className="underline"
                  >
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Footer */}
          <div
            className="text-center text-xs text-slate-500"
            style={{ marginTop: 'calc(var(--cell, 28px) * 0.9)' }}
          >
            © {new Date().getFullYear()} Martin Enke — Built with Next.js + Tailwind. Deployed on Vercel.
          </div>
        </main>
      </div>
    </>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const [isCoarse, setIsCoarse] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const [show, setShow] = React.useState(false)
  const [pos, setPos] = React.useState<{ left: number; top: number }>({ left: 0, top: 0 })
  const cardRef = React.useRef<HTMLDivElement | null>(null)

  React.useEffect(() => setMounted(true), [])

  React.useEffect(() => {
    const mq = window.matchMedia('(pointer: coarse)')
    const onChange = (e: MediaQueryListEvent) => setIsCoarse(e.matches)
    setIsCoarse(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const PREVIEW_BASE = 260
  const SCALE = 1.40 // +15%; tweak here
  const PREVIEW_WIDTH = Math.round(PREVIEW_BASE * SCALE)
  const GAP = 16
  const PAD = 12

  const updatePos = (): void => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    let left = r.right + GAP
    let top = r.top - 8

    // flip to the left if going off the right edge
    if (left + PREVIEW_WIDTH + PAD > window.innerWidth) {
      left = Math.max(PAD, r.left - PREVIEW_WIDTH - GAP)
    }
    if (top < PAD) top = PAD

    setPos({ left, top })
  }

  const onEnter = (): void => {
    updatePos()
    setShow(true)
  }
  const onLeave = (): void => setShow(false)

  const CardInner = (
    <div
      ref={cardRef}
      className="relative border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg shadow-black/20 h-full"
      style={{ padding: 'calc(var(--cell, 28px) * 0.7)' }}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base sm:text-lg font-semibold">{project.title}</h3>
          <span className="text-[10px] uppercase tracking-wider border border-white/15 bg-white/10 px-2 py-1 text-slate-300">
            {project.hosted}
          </span>
        </div>
        <p className="mt-2 text-sm text-slate-300/90">{project.desc}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="text-[11px] border border-white/10 bg-white/5 px-2 py-1 text-slate-300"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )

  // Render either <a> or <div> wrapper (typed, no `any`)
  const CardWrapper = project.href ? (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group col-span-12 md:col-span-6 lg:col-span-4 block"
      onMouseEnter={onEnter}
      onMouseMove={updatePos}
      onMouseLeave={onLeave}
    >
      {CardInner}
    </a>
  ) : (
    <div
      className="group col-span-12 md:col-span-6 lg:col-span-4"
      onMouseEnter={onEnter}
      onMouseMove={updatePos}
      onMouseLeave={onLeave}
    >
      {CardInner}
    </div>
  )

  return (
    <>
      {CardWrapper}

      {/* Portal preview (desktop only) */}
      {mounted && show && !isCoarse && (project.preview || project.previewVideo) &&
        createPortal(
          <div
            className="pointer-events-none fixed z-[9999] transition duration-150 ease-out"
            style={{ left: pos.left, top: pos.top, width: PREVIEW_WIDTH }}
          >
            <div className="rounded-lg overflow-visible border border-white/15 shadow-2xl shadow-black/40 bg-black/40">
              {project.previewVideo ? (
                <video
                  src={project.previewVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="block w-full h-auto"
                />
              ) : (
                // Plain <img> preserves full height (no crop)
                <img
                  src={project.preview!}
                  alt="" // decorative
                  className="block w-full h-auto"
                  decoding="async"
                />
              )}
            </div>
          </div>,
          document.body
        )}
    </>
  )
}

function GridShimmer() {
  const ref = useRef<HTMLCanvasElement | null>(null)
  const motionOK = useRef<boolean>(true)
  const coarse = useRef<boolean>(false)
  const running = useRef<boolean>(true)
  const pointer = useRef<{ x: number; y: number; active: boolean }>({ x: -9999, y: -9999, active: false })

  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onReduce = (e: MediaQueryListEvent) => (motionOK.current = !e.matches)
    motionOK.current = !m.matches
    m.addEventListener('change', onReduce)

    const pc = window.matchMedia('(pointer: coarse)')
    const onPC = (e: MediaQueryListEvent) => (coarse.current = e.matches)
    coarse.current = pc.matches
    pc.addEventListener('change', onPC)

    const onVis = () => (running.current = document.visibilityState === 'visible')
    document.addEventListener('visibilitychange', onVis)

    return () => {
      m.removeEventListener('change', onReduce)
      pc.removeEventListener('change', onPC)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  useEffect(() => {
    const canvasEl = ref.current
    if (!canvasEl) return
    const ctx = canvasEl.getContext('2d')
    if (!ctx) return

    const dpr = Math.min(2, window.devicePixelRatio || 1)

    const resizeToViewport = (c: HTMLCanvasElement, cx: CanvasRenderingContext2D): void => {
      const width = window.innerWidth
      const height = window.innerHeight
      c.width = Math.floor(width * dpr)
      c.height = Math.floor(height * dpr)
      cx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resizeToViewport(canvasEl, ctx)
    const onResize = () => resizeToViewport(canvasEl, ctx)
    window.addEventListener('resize', onResize)

    const setPointer = (clientX: number, clientY: number): void => {
      pointer.current.x = clientX
      pointer.current.y = clientY
      pointer.current.active = true
    }
    const onMove = (e: MouseEvent): void => setPointer(e.clientX, e.clientY)
    const onLeave = (): void => {
      pointer.current.active = false
      pointer.current.x = -9999
      pointer.current.y = -9999
    }
    const onTouch = (e: TouchEvent): void => {
      if (!e.touches?.length) return onLeave()
      const t = e.touches[0]
      setPointer(t.clientX, t.clientY)
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseleave', onLeave)
    window.addEventListener('touchstart', onTouch, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })
    window.addEventListener('touchend', onLeave)

    // ---------- sweep setup ----------
    const OVERLAP_SEC = 1.5

    type Pass = {
      angle: number
      pos: number
      hueFrom: number
      hueTo: number
      hueT: number
    }

    const passes: Pass[] = []

    const easeInOutCubic = (t: number): number =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

    const randomAngle = (): number => Math.random() * Math.PI * 2
    const randomBlueYellowHue = (): number =>
      Math.random() < 0.5 ? 48 + Math.random() * 12 : 200 + Math.random() * 35

    const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
      const a = s * Math.min(l, 1 - l)
      const f = (n: number) => {
        const k = (n + h * 12) % 12
        const col = l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)))
        return Math.round(col * 255)
      }
      return [f(0), f(8), f(4)]
    }

    const lerp = (a: number, b: number, t: number): number => a + (b - a) * t

    const spawnPass = (w: number, h: number, margin: number): Pass => {
      const angle = randomAngle()
      const ux = Math.cos(angle)
      const uy = Math.sin(angle)
      const projs = [0 * ux + 0 * uy, w * ux + 0 * uy, 0 * ux + h * uy, w * ux + h * uy]
      const minProj = Math.min(...projs)
      return { angle, pos: minProj - margin, hueFrom: randomBlueYellowHue(), hueTo: randomBlueYellowHue(), hueT: 0 }
    }

    passes.push({
      angle: randomAngle(),
      pos: Number.NEGATIVE_INFINITY,
      hueFrom: randomBlueYellowHue(),
      hueTo: randomBlueYellowHue(),
      hueT: 1,
    })

    let last = performance.now()

    const draw = (now: number): void => {
      if (!running.current) {
        requestAnimationFrame(draw)
        return
      }

      const dt = Math.max(0.001, (now - last) / 1000)
      last = now

      const w = canvasEl.width / dpr
      const h = canvasEl.height / dpr

      ctx.clearRect(0, 0, w, h)

      const base = Math.min(w, h)
      const coarseBoost = coarse.current ? 1.5 : 1
      const cell = Math.max(20 * coarseBoost, Math.min(42 * coarseBoost, Math.floor(base / 22)))
      document.documentElement.style.setProperty('--cell', `${cell}px`)

      const cols = Math.ceil(w / cell)
      const rows = Math.ceil(h / cell)

      const diag = Math.hypot(w, h)
      const speed = diag * 0.09
      const margin = cell * 4
      const band = Math.max(cell * 6, diag * 0.3)

      if (passes.length === 1 && !Number.isFinite(passes[0].pos)) {
        const p0 = passes[0]
        const ux0 = Math.cos(p0.angle)
        const uy0 = Math.sin(p0.angle)
        const projs = [0 * ux0 + 0 * uy0, w * ux0 + 0 * uy0, 0 * ux0 + h * uy0, w * ux0 + h * uy0]
        const minProj = Math.min(...projs)
        p0.pos = minProj - margin
      }

      let spawned = false
      for (let i = passes.length - 1; i >= 0; i--) {
        const p = passes[i]
        p.pos += speed * dt
        p.hueT = Math.min(1, p.hueT + dt / 0.6)

        const ux = Math.cos(p.angle)
        const uy = Math.sin(p.angle)
        const projs = [0 * ux + 0 * uy, w * ux + 0 * uy, 0 * ux + h * uy, w * ux + h * uy]
        const minProj = Math.min(...projs)
        const maxProj = Math.max(...projs)

        if (!spawned && passes.length < 2 && p.pos > maxProj + margin - speed * OVERLAP_SEC) {
          passes.push(spawnPass(w, h, margin))
          spawned = true
        }
        if (p.pos > maxProj + margin) {
          passes.splice(i, 1)
        }
      }

      const pointerActive = pointer.current.active && motionOK.current
      const px = pointer.current.x
      const py = pointer.current.y
      const sigma = Math.min(35, cell * 0.8)

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

      const tintAlphaScale = 0.42

      for (let rI = 0; rI < rows; rI++) {
        for (let cI = 0; cI < cols; cI++) {
          const x = cI * cell + cell / 2
          const y = rI * cell + cell / 2

          let glow = 0
          if (pointerActive) {
            const dx = x - px
            const dy = y - py
            const dist2 = dx * dx + dy * dy
            glow = Math.exp(-dist2 / (2 * sigma * sigma))
          }

          let sTotal = 0
          let rAcc = 0
          let gAcc = 0
          let bAcc = 0

          for (const { p, mixT, color, ux, uy } of passCache) {
            const proj = x * ux + y * uy
            const dxs = Math.abs(proj - p.pos)
            const crest = Math.max(0, 1 - dxs / band)
            const s = crest * crest * mixT
            if (s > 0.0001) {
              sTotal += s
              rAcc += color.r * s
              gAcc += color.g * s
              bAcc += color.b * s
            }
          }

          let r = 255
          let g = 255
          let b = 255
          if (sTotal > 0) {
            r = Math.round(rAcc / sTotal)
            g = Math.round(gAcc / sTotal)
            b = Math.round(bAcc / sTotal)
          }

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
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('touchstart', onTouch)
      window.removeEventListener('touchmove', onTouch)
      window.removeEventListener('touchend', onLeave)
    }
  }, [])

  return <canvas ref={ref} className="h-full w-full block" />
}
