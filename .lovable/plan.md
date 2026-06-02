# Aditya Cyber — Personal Brand Website Plan

A premium, dark-themed personal brand site for adityacyber.in inspired by Linear / Stripe / Vercel. Built on the existing TanStack Start stack with Lovable Cloud powering the blog, learning roadmap progress, dashboard, contact form, and newsletter.

## Design system

- Palette: near-black background (`#0A0A0F`), dark navy surfaces (`#0F1629`), white foreground, subtle blue accent (`#3B82F6` / electric cyan-blue glow). All defined as `oklch` tokens in `src/styles.css`.
- Typography: Space Grotesk (display/headings) + Inter (body) via Google Fonts. Mono accents (JetBrains Mono) for code/terminal flourishes — restrained, not "hacker".
- Motion: Framer Motion for hero reveal, section fade-ins on scroll, hover lifts, page transitions. Subtle animated gradient + grid background on hero.
- Components: shadcn (Button, Card, Badge, Input, Textarea, Tabs, Progress, Sonner) restyled with custom tokens — no default purple/violet look.
- Light/Dark toggle (defaults to dark) using a `theme-provider` + `next-themes`-style class on `<html>`.
- Mobile-first, container max-w-6xl, generous whitespace.

## Routes (TanStack Start, file-based)

Shared layout via `__root.tsx` adds `<Header />` (logo "Aditya Cyber", nav, theme toggle) and `<Footer />` around `<Outlet />`. Each route gets its own `head()` with title, description, og:title, og:description, og:url, canonical (leaf only).

1. `src/routes/index.tsx` — Home
   - Hero: animated grid/gradient background, headline, sub, two CTAs (View Projects → `/projects`, LinkedIn external).
   - Stats strip (projects, posts, learning hours, days building).
   - Recent activity feed (latest blog posts + project updates pulled from Cloud).
   - Featured projects grid (3 cards).

2. `src/routes/about.tsx` — About
   - Intro (name, student, India, interests, mission).
   - Vertical timeline component (5 milestones, last = future goals).
   - Values / what I'm about cards.

3. `src/routes/projects.tsx` — Projects
   - Filter chips by tech.
   - Project cards (image, title, description, tech badges, GitHub + live links).
   - "Coming soon" placeholder cards.

4. `src/routes/learning.tsx` — Learning Journey
   - 6 roadmap tracks (Cybersecurity, Networking, Linux, Python, AI, Cloud).
   - Each: progress bar, current topic, completed sub-skills, next up.
   - Data stored in Cloud `learning_tracks` table so progress updates over time.

5. `src/routes/blog.tsx` — Blog index
   - Featured article hero.
   - Category filter (Cybersecurity, AI, Career, Learning, Technology).
   - Post grid with cover, title, excerpt, date, read time.
6. `src/routes/blog.$slug.tsx` — Blog post (markdown rendered).

7. `src/routes/contact.tsx` — Contact
   - LinkedIn / GitHub / Email cards.
   - Validated contact form (zod) → inserts into `contact_messages` via server function.

8. `src/routes/dashboard.tsx` — Personal Dashboard (public, read-only)
   - Current focus, books reading, skills learning, year goals — all editable rows in Cloud.

9. Newsletter signup component in footer → `newsletter_subscribers` table.

10. `src/routes/sitemap[.]xml.ts` + `public/robots.txt`.

## Lovable Cloud schema

Tables (all with RLS + GRANTs; public read where appropriate, insert-only for forms, no public write elsewhere):

- `projects` (id, title, slug, description, cover_url, tech text[], github_url, demo_url, featured bool, published bool, created_at)
- `blog_posts` (id, slug, title, excerpt, cover_url, category, content_md, read_minutes, published bool, published_at)
- `learning_tracks` (id, name, icon, progress int, current_topic, completed text[], next_up text[], updated_at)
- `dashboard_items` (id, kind enum: focus|book|skill|goal, title, detail, status, sort_order)
- `contact_messages` (id, name, email, message, created_at) — public INSERT only via server fn, no SELECT for anon
- `newsletter_subscribers` (id, email unique, created_at) — public INSERT only

Server functions (`src/lib/*.functions.ts`):
- `submitContactMessage` (zod validated)
- `subscribeNewsletter` (zod validated)
- Public reads (projects, posts, tracks, dashboard) fetched directly from the browser supabase client since they're public.

Seed data: a few sample projects, 2 blog posts, the 6 learning tracks, and starter dashboard items so the site looks alive on day one.

## Additional

- SEO: per-route meta + JSON-LD `Person` schema in `__root.tsx`, `Article` JSON-LD on blog posts, BreadcrumbList on deep routes.
- Social sharing buttons on blog posts.
- Smooth page transitions via Framer Motion `AnimatePresence` keyed on pathname.
- Analytics-ready: placeholder `<AnalyticsProvider>` reading `VITE_ANALYTICS_ID` (no-op if unset) so Plausible/GA can be wired later.
- Footer: nav, socials, newsletter, copyright.

## Technical details

- Stack: TanStack Start + React 19 + Tailwind v4 + shadcn + Framer Motion + Lovable Cloud (Supabase under the hood).
- Markdown: `react-markdown` + `remark-gfm` + `rehype-highlight` for blog posts.
- Theme: tiny custom `ThemeProvider` (no extra dep) toggling `dark` class on `<html>`, persisted to localStorage, defaults to dark.
- Hero background: CSS radial-gradient + animated SVG grid + soft blue glow; no heavy canvas.
- Images: generated via imagegen and imported from `src/assets/` for hero, project covers, blog covers.
- Build order: (1) enable Cloud + migrations + seed, (2) tokens & layout (header/footer/theme), (3) home + about, (4) projects + learning, (5) blog index + post, (6) contact + dashboard, (7) SEO, sitemap, polish.

## Open question

You mentioned "Allow progress updates over time" on the learning roadmap and a personal dashboard with current focus / books / goals. Do you want:

- **(a)** A simple admin route (`/admin`, protected by Cloud email auth — only your email) where you log in and edit these values from the live site, or
- **(b)** No admin UI — you (or I) just update the values directly in the Cloud database table editor when things change.

(a) is more work but means you never touch the database. (b) ships faster. Reply with a or b and I'll build accordingly.