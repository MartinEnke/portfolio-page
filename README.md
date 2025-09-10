# Martin Enke — Portfolio

Glassy, grid-shimmer portfolio to showcase projects and make it easy for recruiters to get in touch.

**Live:** https://<your-vercel-url>  
**Stack:** Next.js · React · TypeScript · Tailwind CSS · Framer Motion · Canvas 2D · Nodemailer (SMTP)

---

## ✨ Features
- Full-viewport **blue/yellow** grid background with **overlapped auto-swipes** + small pointer glow (Canvas).
- Clean, **grid-aligned** cards; no raw email shown on the site.
- Recruiter-friendly **Contact** form (`/api/contact`) with SMTP delivery + **honeypot** anti-spam.
- **Accessible & mobile-first** layout, glassy aesthetics, and subtle motion.

---

## 🚀 Getting started
```bash
# Node 18+ recommended
npm i
npm run dev
# open http://localhost:3000
```

---

## 🔐 Environment variables
Create **`.env.local`** in the project root:

```
# Site (used by the OG generator to fetch /me.jpg locally)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email (replace with your provider if not Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASS=<your_app_password>          # Gmail App Password or provider secret
MAIL_FROM="Martin Enke <your_email@gmail.com>"
MAIL_TO=your_email@gmail.com           # where the form should deliver
```

> **Gmail tip:** enable 2-Step Verification and create an **App Password**.  
> **Production:** add the same keys in **Vercel → Project → Settings → Environment Variables**.

---

## 🧩 Edit content
- **Headline / Skills / About:** `src/app/page.tsx` (hero card).
- **Projects list:** `projects` array in `src/app/page.tsx`.
- **Photo:** put a portrait at `public/me.jpg` (3:4 works well).
- **Background sweep:** `GridShimmer()` in `src/app/page.tsx`  
  – palette locked to **blue/yellow**, overlapped passes, small hover radius (tweak speed/band/overlap there).

---

## 🔎 SEO (App Router `metadata`)
`src/app/layout.tsx` includes Open Graph/Twitter metadata. It uses an env-based base URL so dev/prod both work.

```tsx
// src/app/layout.tsx (excerpt)
import type { Metadata } from 'next'
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: 'Martin Enke — Full-Stack & GenAI Developer', template: '%s — Martin Enke' },
  description: 'Backend & GenAI developer integrating LLMs into real products. Python · FastAPI/Flask · React · TypeScript · SQL/PostgreSQL.',
  openGraph: {
    url: '/',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Preview — Martin Enke Portfolio' }],
  },
  twitter: { card: 'summary_large_image', images: ['/og.png'] },
}
```

---

## 🖼️ Open Graph (link preview)
**Option A — Static file:** export a `1200×630` PNG as `public/og.png`.

**Option B — Generated image (keeps brand in sync):** `src/app/opengraph-image.tsx`  
This route renders the hero card (blue, glassy) with your photo:

```tsx
// src/app/opengraph-image.tsx
import { ImageResponse } from 'next/og'
export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
const INCLUDE_PHOTO = true

export default function OG() {
  return new ImageResponse(
    (
      <div style={{
        width:'100%', height:'100%', display:'flex', gap:28, padding:40,
        backgroundColor:'#0b1220', color:'#EAF2FF', letterSpacing:-0.5, position:'relative'
      }}>
        {/* blue glows + glassy overlays */}
        <div style={{position:'absolute',inset:0,background:'radial-gradient(900px 520px at 22% 12%, rgba(59,130,246,0.35), transparent 60%)'}} />
        <div style={{position:'absolute',inset:0,background:'radial-gradient(800px 480px at 78% 80%, rgba(29,78,216,0.28), transparent 60%)'}} />
        <div style={{position:'absolute',left:0,right:0,top:0,height:180,background:'linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.00))'}} />
        <div style={{position:'absolute',inset:0,background:'linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.00) 45%)',opacity:.6}} />
        <div style={{position:'absolute',left:0,right:0,top:0,height:1,background:'rgba(255,255,255,0.22)'}} />
        <div style={{position:'absolute',left:0,top:0,bottom:0,width:1,background:'rgba(255,255,255,0.18)'}} />
        <div style={{position:'absolute',left:0,right:0,bottom:0,height:1,background:'rgba(0,0,0,0.28)'}} />
        <div style={{position:'absolute',right:0,top:0,bottom:0,width:1,background:'rgba(0,0,0,0.25)'}} />

        {/* text */}
        <div style={{ position:'relative', flex:1, display:'flex', flexDirection:'column' }}>
          <div style={{ fontSize:90, fontWeight:800, lineHeight:1,
            background:'linear-gradient(90deg,#c7d2fe,#a5f3fc)', backgroundClip:'text', color:'transparent' }}>
            Martin Enke
          </div>
          <div style={{ marginTop:6, fontSize:60, fontWeight:700, lineHeight:1.04,
            background:'linear-gradient(90deg,#c7d2fe,#67e8f9)', backgroundClip:'text', color:'transparent' }}>
            Full-Stack & GenAI Developer
          </div>
          <div style={{ marginTop:18, fontSize:32, opacity:.92 }}>
            Python · FastAPI/Flask · SQL/PostgreSQL · LLMs (RAG) · React · TypeScript
          </div>
          <div style={{ marginTop:14, fontSize:22, opacity:.8 }}>
            I design clean, scalable APIs and integrate LLMs into real products.
          </div>
        </div>

        {/* portrait */}
        {INCLUDE_PHOTO && (
          <div style={{ width:360, backgroundColor:'rgba(255,255,255,0.06)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <img src={`${SITE_URL}/me.jpg`} width={360} height={480} alt="Martin Enke" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
          </div>
        )}
      </div>
    ), size
  )
}
```

**Preview locally:**  
- Static: http://localhost:3000/og.png  
- Generated: http://localhost:3000/opengraph-image

---

## 🌟 Favicon
**Option A (auto):** put a square icon at **`src/app/icon.png`** (256–512px). Next.js will auto-link it.  
**Option B (public):** place **`public/favicon.png`** and reference in `metadata.icons`.

```tsx
// layout.tsx (if using public/favicon.png)
export const metadata = {
  icons: { icon: [{ url: '/favicon.png?v=2', type: 'image/png' }] },
}
```

**Tip:** remove any old `public/favicon.ico` to avoid the default icon winning. Hard-refresh or use a private window to bypass caching.

---

## 🔒 Security & privacy
- External links opened in a new tab include `rel="noopener noreferrer"` to prevent tab-hijacking and referrer leakage:
```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">Link</a>
```
- Contact form uses a **honeypot** (`company`) to silently drop bots—no Captcha required.
- Email is never rendered publicly; delivery uses server-side SMTP with secrets in env vars.

---

## 📬 API route (email)
`src/app/api/contact/route.ts` (Node runtime, `nodemailer`). Honeypot example:

```ts
// Inside POST handler
if (body.company) {
  // bot likely filled the hidden field; pretend it succeeded but drop it
  return NextResponse.json({ ok: true })
}
```

---

## ☁️ Deploy
1. Push to GitHub and **Import** on **Vercel** (framework: Next.js).
2. Add env vars in **Project → Settings → Environment Variables** (`NEXT_PUBLIC_SITE_URL`, SMTP keys).
3. Redeploy and test: form submit, favicon, and OG preview.

**OG validators:**  
- Twitter Card Validator, LinkedIn Post Inspector, Facebook Sharing Debugger.

---

## 📁 Structure
```
src/
  app/
    api/
      contact/
        route.ts        # SMTP email handler (Node)
    opengraph-image.tsx # OG generator (optional)
    page.tsx            # main page (hero, projects, contact) + GridShimmer
    icon.png            # favicon (auto) — optional if using public/favicon.png
public/
  me.jpg                # portrait for hero & OG
  og.png                # static OG (if not using generator)
```

---

## 🤝 Contact
**Open to work** and collaborations — please share a few details and I’ll respond promptly.

---

## 📄 License
Personal portfolio. Unless stated otherwise, all rights reserved.
