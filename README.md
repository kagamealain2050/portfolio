# IRADUKUNDA Kagame Alain — Portfolio

Black & white, live and responsive portfolio. Next.js (App Router, JavaScript) · React · Neon Postgres · Vercel.

## What is "live" on the site
- Typing role animation, animated counters, scroll-reveal, cursor spotlight, scroll-progress bar, scroll-spy menu
- **Live status card** (Contact section): your local time (ticks every second), "Available now / Away" from your working hours, **visitors online now** and **total visits** (heartbeat every 12 s → `/api/live` → Neon)
- **Stories, projects and testimonials update in real time**: edit rows in Neon and open pages refresh within ~20–30 s, no redeploy
- Testimonials auto-rotate when you add more than one

## WhatsApp
Set your number (digits only, with country code, e.g. `250788123456`) in `.env.local` and on Vercel:
```
NEXT_PUBLIC_WHATSAPP_NUMBER=250788123456
```
It enables: floating WhatsApp button, "WhatsApp me" hero button, WhatsApp card in Contact, "Send via WhatsApp" on the form (pre-fills the typed message), and a footer icon. Without a number these are hidden. Edit the default message in `lib/content.js` (`site.whatsapp.message`).

## Your profile photo
Option A (no code): open `/admin`, enter `ADMIN_PASSWORD`, choose a photo, Upload. It is stored in Neon and shown within ~30 s.
Option B: replace `public/profile.jpg`. Portrait 4:5 works best; tune the focus point with `site.photo.position` in `lib/content.js`.

## Setup
```bash
npm install
cp .env.example .env.local     # DATABASE_URL, NEXT_PUBLIC_WHATSAPP_NUMBER, ADMIN_PASSWORD
npm run db:setup               # creates tables + seeds starter content
npm run dev                    # http://localhost:3000
```
Without `DATABASE_URL` the site still renders from `lib/content.js`; contact form, live stats and photo upload need the database.

## Personalise
`lib/content.js`: tagline, roles, time zone + working hours, social links, about text, numbers, skills, services, and the sample stories/projects/testimonial (replace with your own).

## Deploy on Vercel
1. Push to GitHub → Vercel → New Project → import.
2. Add env vars: `DATABASE_URL`, `NEXT_PUBLIC_WHATSAPP_NUMBER`, `ADMIN_PASSWORD`, optionally `NEXT_PUBLIC_SITE_URL`.
3. Deploy. Run `npm run db:setup` once against the same Neon DB.

## API
`POST /api/contact` · `POST /api/newsletter` · `GET|POST /api/live` · `GET /api/projects|stories|testimonials` · `GET /api/photo` · `POST|DELETE /api/admin/photo`
