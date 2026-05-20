# NESE Platform

**New East Strategic Edge** — Geopolitical Intelligence & Risk Advisory

A modern, full-stack web platform for the NESE NGO, built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4, and Supabase.

---

## Architecture

```
nese/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout (fonts, metadata)
│   │   ├── page.tsx            # Landing page (composes sections)
│   │   └── globals.css         # Global styles, Tailwind v4 theme
│   ├── components/             # React Server Components
│   │   ├── Navigation.tsx      # Fixed header with scroll behaviour
│   │   ├── Hero.tsx            # Full-viewport hero section
│   │   ├── Services.tsx        # 4-service grid
│   │   ├── Mission.tsx         # About + stats + pull quote
│   │   ├── Approach.tsx        # 3-pillar methodology
│   │   ├── Contact.tsx         # Enquiry form + contact info
│   │   └── Footer.tsx          # Minimal footer
│   └── lib/
│       └── supabase/
│           ├── client.ts       # Browser client (CSR / Client Components)
│           └── server.ts       # Server client (SSR / Server Components)
├── .env.local.example          # Environment variable template
└── README.md
```

### Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database / Auth | Supabase |
| Fonts | Inter + DM Serif Display (Google Fonts) |
| Deployment | Vercel |

---

## Local Development

### 1. Clone and install

```bash
git clone https://github.com/terra007-max/nese-platform.git
cd nese-platform
npm install
```

### 2. Configure environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and add your Supabase project URL and anon key (found under **Project Settings → API** in the Supabase dashboard).

### 3. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Supabase Setup

1. Create a new project at [supabase.com](https://supabase.com).
2. Copy the **Project URL** and **anon public key** from **Settings → API** into `.env.local`.
3. Enable **Row Level Security (RLS)** on any tables you create.
4. Use `src/lib/supabase/server.ts` for data fetching in Server Components and API routes.
5. Use `src/lib/supabase/client.ts` for client-side interactivity.

---

## Deployment (Vercel)

1. Push to GitHub (the repo is already configured).
2. Import the repository at [vercel.com/new](https://vercel.com/new).
3. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy — Vercel auto-detects Next.js and applies optimal build settings.

Subsequent pushes to `main` trigger automatic redeployments.

---

## Design System

- **Background**: `#09090b` (zinc-950)
- **Surface**: `#18181b` (zinc-900)
- **Accent**: `#c9a84c` (refined gold)
- **Text primary**: `#fafafa` (zinc-50)
- **Text secondary**: `#a1a1aa` (zinc-400)
- **Heading font**: DM Serif Display
- **Body font**: Inter
