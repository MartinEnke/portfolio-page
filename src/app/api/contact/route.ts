// src/app/api/contact/route.ts
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export const runtime = 'nodejs' // nodemailer needs the Node runtime

type Body = {
  name?: string
  email?: string
  message?: string
  company?: string // honeypot — must be empty
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body

    // Honeypot: if bots fill this hidden field, silently accept and drop
    if (body.company) {
      await new Promise(r => setTimeout(r, 300)) // tiny delay to look normal
      return NextResponse.json({ ok: true })
    }

    const { name, email, message } = body
    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const from = process.env.MAIL_FROM || process.env.SMTP_USER || 'no-reply@example.com'
    const to = process.env.MAIL_TO || 'martinenke.info@gmail.com'

    await transporter.sendMail({
      from,
      to,
      subject: `Portfolio contact — ${name}`,
      replyTo: email,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `<p><strong>From:</strong> ${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p><p>${escapeHtml(message).replace(/\n/g,'<br/>')}</p>`,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Contact error:', err)
    return NextResponse.json({ error: 'Email failed to send' }, { status: 500 })
  }
}

// simple sanitizer
function escapeHtml(str = '') {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')
}
