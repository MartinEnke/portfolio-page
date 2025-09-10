# Martin Enke — Portfolio

Glassy, grid-shimmer portfolio to showcase projects and make it easy for recruiters to get in touch.

**Live:** https://<your-vercel-url>  
**Stack:** Next.js · React · TypeScript · Tailwind CSS · Framer Motion · Canvas 2D · Nodemailer (SMTP)

---

## Features
- Full-viewport **blue/yellow** grid background with **overlapped auto-swipes** + small pointer glow (Canvas).
- Clean, **grid-aligned** cards; no raw email shown on the site.
- Recruiter-friendly **Contact** form (`/api/contact`) with SMTP delivery + **honeypot** anti-spam.
- **Accessible & mobile-first** layout, glassy aesthetics, and subtle motion.

---

## Getting started
```bash
# Node 18+ recommended
npm i
npm run dev
# open http://localhost:3000
```

---

## Environment variables
Create **`.env.local`** in the project root:

```
# Site (used by the OG generator to fetch /me.jpg locally)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email (replace with your provider if not Gmail)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email@gmail.com
SMTP_PASS=<your_app_password>          # Gmail App Password or provider secret
MAIL_FROM="Your Name <your_email>"
MAIL_TO=your_email@gmail.com           # where the form should deliver
```

> **Gmail tip:** enable 2-Step Verification and create an **App Password**.  
> **Production:** add the same keys in **Vercel → Project → Settings → Environment Variables**.

---

## Edit content
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

## Open Graph (link preview)
**Option A — Static file:** export a `1200×630` PNG as `public/og.png`.

**Option B — Generated image (keeps brand in sync):** `src/app/opengraph-image.tsx`  
This route renders the hero card (blue, glassy) with your photo:



**Preview locally:**  
- Static: http://localhost:3000/og.png  
- Generated: http://localhost:3000/opengraph-image

---

## Favicon
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

## Security & privacy
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

## Deploy
1. Push to GitHub and **Import** on **Vercel** (framework: Next.js).
2. Add env vars in **Project → Settings → Environment Variables** (`NEXT_PUBLIC_SITE_URL`, SMTP keys).
3. Redeploy and test: form submit, favicon, and OG preview.

**OG validators:**  
- Twitter Card Validator, LinkedIn Post Inspector, Facebook Sharing Debugger.

---

## Structure
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

## Contact
**Open to work** and collaborations. If you’re interested, please get in touch.

---

## License

- **Code:** MIT © 2025 Martin Enke. You’re welcome to copy and adapt the code and design for your own site.
  Keeping the license header in source files is appreciated.

- **Content & assets:** © Martin Enke. All rights reserved.
  Please replace my text, photos/portrait, favicon/monogram (“ME”), and OG image with your own.

- **Attribution (optional):** If this template helped you, a note like
  “Based on Martin Enke’s portfolio” with a link back is appreciated.