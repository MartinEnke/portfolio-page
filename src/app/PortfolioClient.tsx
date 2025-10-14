'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { createPortal } from 'react-dom'

type Project = {
  title: string
  desc: string
  tech: string[]
  hosted?: string
  href?: string
  github?: string
  githubFrontend?: string
  githubBackend?: string
  preview?: string
  previewVideo?: string
}

type BlogEntry = {
  date: string
  title: string
  body: string
  tags?: string[]
  link?: string
}

// Stable blog date formatter (same on SSR & client)
const BLOG_DTF = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: '2-digit',
  timeZone: 'UTC',
})
function formatBlogDate(isoDate: string) {
  // Force midnight UTC so there's no TZ drift
  return BLOG_DTF.format(new Date(isoDate + 'T00:00:00Z'))
}

export default function PortfolioClient() {
  const isWip = process.env.NEXT_PUBLIC_WIP === 'true'

  const projects: Project[] = [
    // Existing projects
    {
      title: 'ZoundZcope AI',
      desc:
        'Audio analysis & AI feedback for producers: spectral metrics, structured critique, follow-ups, A/B AI compare, and RAG docs.',
      tech: ['Python', 'FastAPI', 'SQLAlchemy', 'OpenAI API', 'FAISS', 'Tailwind'],
      hosted: 'Render',
      href: 'https://zoundzcope-ai.onrender.com/',
      github: 'https://github.com/MartinEnke/ZoundZcope_AI',
      preview: '/previews/zoundzcope.jpg',
    },
    {
      title: 'AI Music Promo Agent',
      desc:
        'Shape a creative direction, generate platform-aware content, get image prompts for cover artworks, and export a tidy PDF — in minutes.',
      tech: ['Next.js', 'TypeScript', 'OpenAI API', 'Tailwind', 'jsPDF'],
      hosted: 'Vercel',
      href: 'https://ai-promo-agent.vercel.app/',
      github: 'https://github.com/MartinEnke/creative-promo-agent',
      preview: '/previews/promo_agent.jpg',
    },
    {
      title: 'Groovebox',
      desc: 'Mobile-first drum loop sequencer — tap, record, tune, sidechain, swing, fx, compression, and save sessions.',
      tech: ['React', 'Vite', 'TypeScript', 'Web Audio API', 'localStorage'],
      hosted: 'Vercel',
      href: 'https://groovebox-martin.vercel.app/',
      github: 'https://github.com/MartinEnke/groovebox2',
      preview: '/previews/groovebox.jpg',
    },
    {
      title: 'The Quiet Almanac',
      desc:
        'Multilingual blog with auth, AI moderation, AI translation & read-aloud. Posts, comments, likes, notifications, feedback.',
      tech: ['Python', 'Flask', 'OpenAI API', 'PostgreSQL', 'JWT', 'Tailwind CSS'],
      hosted: 'Render',
      href: 'https://the-quiet-almanac.onrender.com/',
      github: 'https://github.com/MartinEnke/Masterblog_API',
      preview: '/previews/almanac.jpg',
    },
    // NEW: Orbital RL + Solar System (no live URL, two GitHub buttons, preview image)
    {
      title: 'Orbital - Reinforcement Learning',
      desc:
        'Interactive 3D viz of an RL spacecraft flying in a Sun-centered field with Keplerian planets. A/B compare Random vs PPO, split view, analytics, and GPT explanations.',
      tech: ['Python', 'Gymnasium', 'Stable-Baselines3', 'React', 'Three.js', '@react-three/fiber', 'Tailwind', 'Node/Express', 'OpenAI API'],
      hosted: 'Local',
      // no href (not deployed)
      githubFrontend: 'https://github.com/MartinEnke/orbital-frontend',
      githubBackend: 'https://github.com/MartinEnke/orbital-rl',
      preview: '/previews/orbital.png', // place orbital.png in /public
    },
    
    {
      title: 'Hirethics AI — Fair Scoring & Audit',
      desc:
        'Evidence-bound scoring and bias audit for recruiting: LLM + heuristic fallback, rubric-based scores with quoted spans, blinding & prestige-proxy detection, and an evaluation dashboard (Spearman ρ, Top-K overlap, mean |Δ|). Includes recruiter/ethics/dev viewer modes and exportable audit trail.',
      tech: ['Python', 'FastAPI', 'Pydantic', 'OpenAI API', 'React', 'Vite', 'TypeScript', 'Tailwind', 'Framer Motion'],
      hosted: 'Local',
      // no href (not deployed)
      github: 'https://github.com/MartinEnke/hirethics_ai',
      preview: '/previews/hirethics.png', // place hirethics.png in /public/previews
    },
  ]

  const blog: BlogEntry[] = [
    { date: '2025-10-12', title: 'Hirethics AI — Fair Scoring & Audit', body: 'Local evidence-bound scoring and bias audit for recruiting: LLM + heuristic fallback, rubric-based scores with quoted spans, blinding & prestige-proxy detection, and an evaluation dashboard (Spearman ρ, Top-K overlap, mean |Δ|). Added recruiter/ethics/dev viewer modes and exportable audit trail.\n\nPython · FastAPI · Pydantic · OpenAI API · React · Tailwind · Framer Motion · GitHub' },
    { date: '2025-10-05', title: 'Maestro_Lessons — Pattern Grammar', body: 'Refined data schema for phrase patterns and progression trees. Added tempo-linked notation syntax to test how lesson content could adapt dynamically. Feels like composing meets coding — bridging intuition and structure before diving into full CS algorithm drills.' },
    { date: '2025-10-03', title: 'Maestro_Lessons — Study Notes', body: 'Started notation experiments for musical logic and rhythm training. Built minimal Python tools to map rhythmic ratios and interval structures for lesson scaffolding. Aim: mix ear training with computational reasoning.' },
    { date: '2025-09-30', title: 'Hirethics AI — Kickoff & Scoring Prototype', body: 'Started local project on fair, explainable candidate evaluation. Built FastAPI + Pydantic backend with rubric templates, anonymized inputs, and first LLM scoring loop. Added fallback heuristics for edge cases and JSON audit exports. Frontend scaffolding in React/Vite with clean viewer modes.\n\nPython · FastAPI · Pydantic · React · Vite · TypeScript · Tailwind' },
    { date: '2025-09-25', title: 'Orbital RL — Split View, Sparklines, Explain', body: 'Frontend now has A|B split view with a single synced timeline, colored event markers, and sparklines (reward, fuel, radial error, v-tan error). Added “Explain last 10s” summary to the LLM panel, polished UI (scientific cards)' },
    { date: '2025-09-17', title: 'Orbital RL — Kickoff & Baselines', body: 'Split the project into two repos (orbital-rl / orbital-frontend). Wrote a clean Gymnasium env, random-policy rollout script, and a PPO training/eval path. Generated first JSON rollouts and a tiny Node/Express LLM proxy for explanations. Baseline achieved: Random vs PPO shows early separation.' },
    { date: '2025-09-15', title: 'Integrated Portfolio', body: 'Added AI Promo Agent to my site with hover previews + a scrollable blog section.' },
    { date: '2025-09-08', title: 'Polish & Deploy', body: 'Mobile header fixes, disclaimer overlay, favicon, and Vercel deployment.' },
    { date: '2025-09-01', title: 'New Project — AI Promo Agent', body: 'Brief → palette → content pipeline. Prompt composer. Clean PDF export. Solid UX & guardrails (e.g., no emojis in PDFs).' },
    { date: '2025-08-25', title: 'Groovebox Iteration', body: 'Added swing, metronome, and haptics. Sessions persist in localStorage.' },
    { date: '2025-08-18', title: 'React Sprint — Groovebox', body: 'Built a Web Audio step-sequencer. Mobile-first UI, timing accuracy, and a friendly save flow.' },
    { date: '2025-08-11', title: 'ZoundZcope Presentation — ✅', body: 'Presented live; great feedback on A/B compare and RAG usefulness.' },
    { date: '2025-08-04', title: 'Presentation Prep', body: 'Storyline, demo scripts, README and short screen-captures. Dry-runs with peers.' },
    { date: '2025-07-28', title: 'Observability & Prod Hardening', body: 'Better logging, rate limiting, and cold-start tweaks on Render.' },
    { date: '2025-07-21', title: 'Frontend Polish & UX', body: 'Loading states, error boundaries, tighter layout. Reduced time-to-first-insight for users.' },
    { date: '2025-07-14', title: 'RAG for Docs & Tutorials', body: 'Chunked docs, built retrieval pipeline, grounded critiques with relevant snippets (less hallucination, more helpfulness).' },
    { date: '2025-07-07', title: 'Multi-Track AI Compare', body: 'Side-by-side AI feedback across versions; session save/restore for producers.' },
    { date: '2025-06-30', title: 'Follow-up Chat (ZoundZcope)', body: 'Context-aware follow-ups per upload, token management, and safe truncation logic.' },
    { date: '2025-06-23', title: 'Deployed: The Quiet Almanac', body: 'Made the blog multilingual; added AI moderation, translation, and read-aloud. First successful production deploy.' },
    { date: '2025-06-16', title: 'Structured AI Critique', body: 'Hooked up OpenAI—structured JSON critique + caching. Added issue tagging and actionable tips format.' },
    { date: '2025-06-09', title: 'Audio Features & UI', body: 'Implemented librosa feature extraction (tempo, spectral stats). Added waveform previews and responsive UI in React.' },
    { date: '2025-06-02', title: 'Kickoff — ZoundZcope AI', body: 'Bootstrapped FastAPI backend and audio pipeline. Planned data model for uploads and per-session analysis.' },
    { date: '2025-05-26', title: 'Prompting & Evals', body: 'Designed prompt patterns for structure/precision. Sketched a light eval harness to sanity-check LLM outputs for schema compliance.' },
    { date: '2025-05-19', title: 'GenAI Eng — LLM Theory Deep-Dive', body: 'Covered tokenization, context windows, embeddings, vector search, grounding, and safety. Set up baseline eval notions.' },
    { date: '2025-05-12', title: 'Masterschool — Core Complete', body: 'Wrapped the core curriculum. Built several small apps (auth, REST, CRUD) and sharpened Python + SQL fundamentals.' },
];


  const [sending, setSending] = useState<false | 'sending' | 'ok' | 'error'>(false)
  const [errorMsg, setErrorMsg] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const name = String(fd.get('name') || '').trim()
    const email = String(fd.get('email') || '').trim()
    const message = String(fd.get('message') || '').trim()
    const company = String(fd.get('company') || '').trim()

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
        <div className="fixed top-2 right-2 z-50 border border-white/20 bg-white/15 px-2 py-1 text-[11px] text-slate-100 tracking-wide">
          WIP
        </div>
      )}

      {/* brighter page bg */}
      <div className="relative min-h-screen bg-slate-900 text-slate-100 overflow-hidden">
        {/* BG layers */}
        <div className="pointer-events-none fixed inset-0">
          <GridShimmer />
        </div>
        {/* stronger overlay tint */}
        <div
          className="pointer-events-none fixed inset-0 mix-blend-multiply opacity-70
            [background:
              radial-gradient(120%_120%_at_50%_30%,rgba(0,0,0,0.55),transparent_68%),
              radial-gradient(120%_130%_at_10%_90%,rgba(0,0,0,0.35),transparent_70%)
            ]"
        />

        {/* content */}
        <main className="relative z-10 mx-auto w-full max-w-6xl" style={{ padding: 'calc(var(--cell, 28px) * 0.9)' }}>
          {/* Hero */}
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-6 sm:mb-8">
            <div className="grid grid-cols-12" style={{ gap: 'calc(var(--cell, 28px) * 0.5)' }}>
              {/* card (brighter) */}
              <div className="col-span-12 md:col-span-8 border border-white/15 bg-white/10 backdrop-blur-xl shadow-lg shadow-black/30" style={{ padding: 'calc(var(--cell, 28px) * 0.8)' }}>
                <div className="flex flex-col gap-5 md:gap-6">
                  <div>
                    <h1 className="font-semibold tracking-tight leading-[1.15]">
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-cyan-200
                                       text-3xl sm:text-5xl md:text-6xl">
                        Martin Enke
                      </span>
                      <span className="block text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-cyan-200
                                     text-2xl sm:text-3xl md:text-5xl leading-[1.25] pb-[3px]">
                        Full-stack & GenAI Engineer
                      </span>
                    </h1>

                    <p className="mt-3 text-sm sm:text-base text-slate-200">
                      Python · FastAPI/Flask · SQL/PostgreSQL · LLMs (RAG) · React · TypeScript
                    </p>
                    <p className="mt-3 text-sm sm:text-base text-slate-200/95">
                      I design clean, scalable APIs and integrate LLM features into real products.
                    </p>
                    <br />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <a href="#contact" className="border border-white/20 bg-white/15 px-4 py-2 text-sm hover:bg-white/20 active:scale-[.99] transition">
                      Contact
                    </a>
                    <a href="https://github.com/MartinEnke" target="_blank" rel="noopener noreferrer" className="border border-white/20 bg-white/15 px-4 py-2 text-sm hover:bg-white/20 active:scale-[.99] transition">
                      GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/martin-enke-/" target="_blank" rel="noopener noreferrer" className="border border-white/20 bg-white/15 px-4 py-2 text-sm hover:bg-white/20 active:scale-[.99] transition">
                      LinkedIn
                    </a>
                  </div>

                  <div className="text-sm text-slate-200/95">
                    <div className="text-sm text-slate-200/95" />
                    <p>
                      Python-first backend & GenAI engineer with roots in music. <br />Built five LLM-powered apps
                      and a playful React groovebox. Backend-led, frontend-curious.
                    </p>
                    <br />
                    <p className="mt-3 text-s s:text-base text-slate-200/95">
                      Open to <b>junior/entry-level</b> roles — onsite, hybrid, or remote.
                    </p>
                  </div>
                </div>
              </div>

              {/* Photo */}
              <div className="col-span-12 md:col-span-4 border border-white/15 bg-white/10 backdrop-blur-xl shadow-lg shadow-black/30 flex items-center justify-center" style={{ padding: 'calc(var(--cell, 28px) * 0.3)', aspectRatio: '3 / 4' }}>
                <Image
                  src="/me.jpg"
                  alt="Martin Enke"
                  width={600}
                  height={800}
                  className="h-full w-full object-cover"
                  style={{ filter: 'contrast(1.08) saturate(1.08)' }}
                  priority
                />
              </div>
            </div>
          </motion.section>

          {/* Projects */}
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="flex items-center justify-between" style={{ marginBottom: 'calc(var(--cell, 28px) * 0.4)' }}>
              <h2 className="text-lg sm:text-xl md:text-2xl font-medium tracking-tight">Featured Projects</h2>
              <span className="hidden sm:inline text-xs text-slate-300">Vercel / Render / Local</span>
            </div>

            <div className="grid grid-cols-12" style={{ gap: 'calc(var(--cell, 28px) * 0.5)' }}>
              {projects.map((p) => (
                <ProjectCard key={p.title} project={p} />
              ))}
            </div>
          </motion.section>

          {/* Contact + Blog */}
          <motion.section id="contact" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="mt-8">
            <div className="grid grid-cols-12" style={{ gap: 'calc(var(--cell, 28px) * 0.5)' }}>
              {/* Contact */}
              <div className="col-span-12 md:col-span-8 border border-white/15 bg-white/10 backdrop-blur-xl shadow-lg shadow-black/30" style={{ padding: 'calc(var(--cell, 28px) * 0.8)' }}>
                <h3 className="text-xl font-medium tracking-tight mb-3">Contact</h3>
                <p className="text-slate-200/95 text-sm mb-4">
                  Open to work—please share a few details and I’ll respond promptly.
                </p>

                <form onSubmit={onSubmit} className="grid grid-cols-12 gap-3">
                  <div className="hidden">
                    <label>
                      Company
                      <input name="company" autoComplete="off" />
                    </label>
                  </div>

                  <label className="col-span-12 md:col-span-6 text-xs text-slate-200/90">
                    Name
                    <input
                      name="name"
                      className="mt-1 w-full border border-white/15 bg-white/10 px-3 py-2 text-sm text-slate-50 outline-none focus:border-white/25"
                      placeholder="Your name"
                      required
                    />
                  </label>
                  <label className="col-span-12 md:col-span-6 text-xs text-slate-200/90">
                    Email
                    <input
                      name="email"
                      type="email"
                      className="mt-1 w-full border border-white/15 bg-white/10 px-3 py-2 text-sm text-slate-50 outline-none focus:border-white/25"
                      placeholder="you@example.com"
                      required
                    />
                  </label>
                  <label className="col-span-12 text-xs text-slate-200/90">
                    Message
                    <textarea
                      name="message"
                      rows={5}
                      className="mt-1 w-full border border-white/15 bg-white/10 px-3 py-2 text-sm text-slate-50 outline-none focus:border-white/25 resize-y"
                      placeholder="What can I help you with?"
                      required
                    />
                  </label>
                  <div className="col-span-12 flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={sending === 'sending'}
                      className="border border-white/20 bg-white/15 px-4 py-2 text-sm hover:bg-white/20 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {sending === 'sending' ? 'Sending…' : 'Send message'}
                    </button>
                    {sending === 'ok' && (
                      <span className="text-xs text-emerald-300">Thanks! Your message has been sent.</span>
                    )}
                    {sending === 'error' && (
                      <span className="text-xs text-rose-300">{errorMsg}</span>
                    )}
                  </div>
                </form>

                <div className="mt-4 text-xs text-slate-300">
                  Prefer socials?{' '}
                  <a href="https://github.com/MartinEnke" target="_blank" className="underline">
                    GitHub
                  </a>
                  {' · '}
                  <a href="https://www.linkedin.com/in/martin-enke-/" target="_blank" className="underline">
                    LinkedIn
                  </a>
                </div>
              </div>

              {/* Blog */}
              <div className="col-span-12 md:col-span-4 border border-white/15 bg-white/10 backdrop-blur-xl shadow-lg shadow-black/30" style={{ padding: 'calc(var(--cell, 28px) * 0.8)' }}>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <h3 className="text-xl font-medium tracking-tight">Blog</h3>
                  <span className="text-[11px] text-slate-300">Weekly notes</span>
                </div>

                <div className="max-h-[520px] overflow-y-auto pr-1 custom-scroll">
                  <ul className="flex flex-col gap-3">
                    {blog.map((b) => (
                      <li key={b.date} className="border border-white/15 bg-white/10 px-3 py-3">
                        <div className="text-[11px] uppercase tracking-wide text-slate-300">
                          {formatBlogDate(b.date)}
                        </div>
                        <div className="mt-1 text-sm font-semibold text-slate-50">
                          {b.title}
                        </div>
                        <p className="mt-1 text-sm text-slate-200/95">
                          {b.body}
                        </p>
                        {b.tags?.length ? (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {b.tags.map((t) => (
                              <span key={t} className="text-[10px] border border-white/15 bg-white/10 px-1.5 py-0.5 text-slate-200">
                                #{t}
                              </span>
                            ))}
                          </div>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.section>

          {/* Footer */}
          <div className="text-center text-xs text-slate-300" style={{ marginTop: 'calc(var(--cell, 28px) * 0.9)' }}>
            © {new Date().getFullYear()} Martin Enke — Built with Next.js + Tailwind. Deployed on Vercel.
          </div>
        </main>
      </div>
    </>
  )
}

/* ---------------- ProjectCard ---------------- */
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
  const SCALE = 1.8
  const PREVIEW_WIDTH = Math.round(PREVIEW_BASE * SCALE)
  const GAP = 16
  const PAD = 12

  const updatePos = (): void => {
    const el = cardRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    let left = r.right + GAP
    let top = r.top - 8

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
      className="relative border border-white/15 bg-white/10 backdrop-blur-xl shadow-lg shadow-black/30 h-full"
      style={{ padding: 'calc(var(--cell, 28px) * 0.7)' }}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-base sm:text-lg font-semibold text-slate-50">{project.title}</h3>
          {project.hosted ? (
            <span className="text-[10px] uppercase tracking-wider border border-white/20 bg-white/15 px-2 py-1 text-slate-100">
              {project.hosted}
            </span>
          ) : null}
        </div>
        <p className="mt-2 text-sm text-slate-200/95">{project.desc}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span key={t} className="text-[11px] border border-white/15 bg-white/10 px-2 py-1 text-slate-100">
              {t}
            </span>
          ))}
        </div>

        {(project.href || project.github || project.githubFrontend || project.githubBackend) && (
          <div className="mt-4 flex flex-wrap gap-2">
            {project.href && (
              <button
                className="border border-white/20 bg-white/15 px-3 py-1.5 text-xs hover:bg-white/20"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  window.open(project.href!, '_blank', 'noopener,noreferrer')
                }}
              >
                Live
              </button>
            )}
            {project.github && (
              <button
                className="border border-white/20 bg-white/15 px-3 py-1.5 text-xs hover:bg-white/20"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  window.open(project.github!, '_blank', 'noopener,noreferrer')
                }}
              >
                GitHub
              </button>
            )}
            {project.githubFrontend && (
              <button
                className="border border-white/20 bg-white/15 px-3 py-1.5 text-xs hover:bg-white/20"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  window.open(project.githubFrontend!, '_blank', 'noopener,noreferrer')
                }}
              >
                GitHub (Frontend)
              </button>
            )}
            {project.githubBackend && (
              <button
                className="border border-white/20 bg-white/15 px-3 py-1.5 text-xs hover:bg-white/20"
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  window.open(project.githubBackend!, '_blank', 'noopener,noreferrer')
                }}
              >
                GitHub (Backend)
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )

  const CardWrapper = project.href ? (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group col-span-12 md:col-span-6 lg:col-span-6 block"
      onMouseEnter={onEnter}
      onMouseMove={updatePos}
      onMouseLeave={onLeave}
    >
      {CardInner}
    </a>
  ) : (
    <div
      className="group col-span-12 md:col-span-6 lg:col-span-6"
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
      {mounted && show && !isCoarse && (project.preview || project.previewVideo) &&
        createPortal(
          <div
            className="pointer-events-none fixed z-[9999] transition duration-150 ease-out"
            style={{ left: pos.left, top: pos.top, width: PREVIEW_WIDTH }}
          >
            <div className="preview-glow rounded-xl overflow-visible border border-white/20 shadow-2xl shadow-black/50 bg-black/30">
              {project.previewVideo ? (
                <video src={project.previewVideo} autoPlay loop muted playsInline className="block w-full h-auto" />
              ) : (
                <img src={project.preview!} alt="" className="block w-full h-auto" decoding="async" />
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

    // shader-ish grid
    const OVERLAP_SEC = 1.5
    type Pass = { angle: number; pos: number; hueFrom: number; hueTo: number; hueT: number }
    const passes: Pass[] = []

    const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
    const randomAngle = () => Math.random() * Math.PI * 2
    const randomBlueYellowHue = () => (Math.random() < 0.5 ? 48 + Math.random() * 12 : 200 + Math.random() * 35)
    const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
      const a = s * Math.min(l, 1 - l)
      const f = (n: number) => {
        const k = (n + h * 12) % 12
        const col = l - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)))
        return Math.round(col * 255)
      }
      return [f(0), f(8), f(4)]
    }
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

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
      if (document.visibilityState !== 'visible') {
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

      const tintAlphaScale = 0.55

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

          let sTotal = 0, rAcc = 0, gAcc = 0, bAcc = 0
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

          let r = 255, g = 255, b = 255
          if (sTotal > 0) {
            r = Math.round(rAcc / sTotal)
            g = Math.round(gAcc / sTotal)
            b = Math.round(bAcc / sTotal)
          }

          const noise = (Math.sin((x + y) * 0.05 + now * 0.0018) + 1) * 0.02
          let alpha = 0.035 + Math.min(1, sTotal) * 0.36 + glow * 0.48 + noise
          alpha = Math.max(0.03, Math.min(0.7, alpha))

          const a = alpha * tintAlphaScale
          ctx.fillStyle = `rgba(${r},${g},${b},${a})`
          ctx.fillRect(x - cell / 2 + 0.5, y - cell / 2 + 0.5, cell - 1, cell - 1)

          ctx.strokeStyle = 'rgba(255,255,255,0.06)'
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
