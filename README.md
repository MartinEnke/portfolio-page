# Martin Enke — Portfolio

Glassy, grid-shimmer portfolio to showcase projects and make it easy for recruiters to get in touch.

**Live:** https://<your-vercel-url>  
**Stack:** Next.js · React · TypeScript · Tailwind CSS · Framer Motion · Canvas 2D · Nodemailer (SMTP)

---

## ✨ Features
- Responsive, grid-aligned layout with a subtle **blue/yellow** sweep background (mouse-reactive, overlapped passes).
- Project cards linking to Vercel / Render deployments.
- Recruiter-friendly **Contact** form → `/api/contact` (SMTP), with a hidden **honeypot** anti-spam field.
- No email exposed on the page; environment variables handle delivery.

---

## 🚀 Getting started

```bash
# Node 18+ recommended
npm i
npm run dev
# open http://localhost:3000
´´´


## Environment variables

Create .env.local in the project root:

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your_email
SMTP_PASS=<your_app_password>       # Gmail App Password or provider secret
MAIL_FROM="Your Name <your_email>"
MAIL_TO=your_email   # where the form should deliver


For Gmail, enable 2-Step Verification and use an App Password.
For other providers (Fastmail/Zoho/Outlook, etc.), use their SMTP host/port and mailbox creds.
In production, add the same keys in Vercel → Project → Settings → Environment Variables.


## Edit content

Headline / Skills / About: src/app/page.tsx (hero card).

Projects list: projects array in src/app/page.tsx.

Photo: add public/me.jpg (3:4 aspect looks great).

Background sweep: GridShimmer() in src/app/page.tsx

Colors: locked to blue/yellow bands.

Speed/width/overlap: tweak speed, band, OVERLAP_SEC.


Optional polish:

Add SEO in src/app/layout.tsx (metadata), plus an OG image in public/og.png.

External links: add rel="noopener noreferrer" for security/perf.


## API route (contact form)

File: src/app/api/contact/route.ts

Runtime: Node (for nodemailer).

Honeypot: drops submissions that fill the hidden company field.

Minimal error handling included.


´´´
// Honeypot check (inside POST):
if (body.company) {
  return NextResponse.json({ ok: true })
}
´´´

## Deploy

Push to GitHub and Import on Vercel (framework: Next.js).

Add env vars in Project → Settings → Environment Variables.

Redeploy; verify the form works from the live URL.


## Structure

´´´
src/
  app/
    api/
      contact/
        route.ts      # email handler (SMTP)
    page.tsx          # main page (hero, projects, contact) + GridShimmer
public/
  me.jpg              # optional portrait
  og.png  



  ## Contact


Open to work and collaborations. If you’re interested, please get in touch via the form.


## License

Personal portfolio. Unless stated otherwise, all rights reserved.

´´´
::contentReference[oaicite:0]{index=0}
´´´