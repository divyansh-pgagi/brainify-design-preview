# brAInify Landing Page — Project Guide

## Stack
- **Framework**: Next.js 16 (App Router) with TypeScript
- **Styling**: Tailwind CSS v4
- **Font**: Inter (via `next/font/google`)
- **Language**: TypeScript (strict)

## Project Structure
```
app/
  components/
    sections/      # Full-page sections (Navbar, Hero, etc.)
    ui/            # Reusable primitives (Button, Logo, etc.)
  lib/
    constants.ts   # All text copy, nav links, static data
  globals.css      # Design tokens (@theme), base styles, animations
  layout.tsx       # Root layout with metadata + Inter font
  page.tsx         # Page composition — imports sections only
public/
  images/          # Static image assets
```

## Design System

### Colors (from Figma — Ed-app file: XDmPxXeFT9VTVWHIcKjXDq)
| Token | Value | Usage |
|---|---|---|
| `bg-[#050d1a]` | Deep navy black | Page background |
| `bg-[#071022]` | Navy | Card/navbar backgrounds |
| `bg-[#0a1628]` | Mid navy | Card fills |
| `blue-500` / `#3b6fff` | Brand blue | CTAs, highlights |
| `cyan-400` / `#00c2ff` | Accent cyan | Gradient accents |
| `white/60` | Muted white | Body text |
| `white/40` | Dim white | Labels, captions |

### Typography
- Font: **Inter** — loaded via `next/font/google`
- H1: `text-[3.75rem] font-extrabold leading-[1.1] tracking-tight`
- Body: `text-base sm:text-lg text-white/60 leading-relaxed`
- Labels: `text-xs font-medium tracking-wide uppercase text-white/40`

### Spacing / Layout
- Max content width: `max-w-[1280px] mx-auto`
- Horizontal padding: `px-6 md:px-10`
- Section padding: `pt-[100px] pb-16 md:pt-[120px]`
- Content column (from Figma): 1192px wide, 124px from left on 1440px canvas

### Breakpoints (Tailwind defaults)
- `sm`: 640px — adjust font sizes
- `md`: 768px — switch hero layout to row, show desktop nav
- `lg`: 1024px — show floating phone badges

## Conventions

### Components
- All section components are in `app/components/sections/`
- All UI primitives are in `app/components/ui/`
- Client components explicitly marked `"use client"` at top
- Static/server components have no directive (default server)
- No default exports from `lib/` — named exports only

### Styling
- Use Tailwind utility classes first; avoid custom CSS unless animations or complex gradients
- Background atmosphere blobs: use `.gradient-blob` class from `globals.css`
- Marquee animation: `.animate-marquee` class (28s linear infinite)
- Glow text: `.text-glow-blue` class

### Copy & Content
- All static text lives in `app/lib/constants.ts` — never hardcode strings in JSX
- Section IDs for anchor nav: `#paths`, `#features`, `#certification`, `#roadmap`, `#faq`, `#hero`

### Images
- Use `next/image` for all images with explicit `width`/`height`
- Place static assets in `public/images/`
- Educator photos: `Ryan`, `Sarah`, `Adam`, `Daniel`, `Steve`, `Luke`, `Carol`
- Tool logos: Claude, Descript, Perplexity, Relevance AI, n8n

## Sections Roadmap (build order)
1. ✅ Navbar
2. ✅ Hero
3. ⬜ Marquee/Banner strip (inline in Hero)
4. ⬜ Educators (`#features`) — 7 cards, avatar + name + specialty
5. ⬜ Learning Paths (`#paths`) — 6 paths, left selector + right detail panel
6. ⬜ Inside the App — phone mockup + 6 feature pills
7. ⬜ Languages — 9-language pill row, "175 countries"
8. ⬜ Real Tools — 5 tool cards (Claude, Descript, Perplexity, Relevance AI, n8n)
9. ⬜ Certification (`#certification`) — left copy + right certificate image
10. ⬜ Stats — 4 stat boxes (175 countries, 9 languages, 6 paths, 6 features)
11. ⬜ Product Roadmap (`#roadmap`) — 5 phase timeline
12. ⬜ FAQ (`#faq`) — 7 accordion items
13. ⬜ Footer CTA — "Stop watching. Start shipping."

## Figma Source
- **File**: Ed-app
- **File key**: `XDmPxXeFT9VTVWHIcKjXDq`
- **Canvas**: 1440 × 7690 px (dark theme, light-mode toggle available)
- **Node 5253:2** — full page view
- **Node 5253:6** — hero section

## Mobile Responsiveness
- Design is desktop-first (1440px canvas) but must be pixel-perfect on mobile
- Hero: `flex-col-reverse` on mobile → `flex-row` on md+
- Phone mockup: full-width centered on mobile, fixed-width right-aligned on md+
- Navbar: hamburger menu on mobile, full nav on md+
- Font sizes scale down at `sm:` breakpoint
- Floating phone badges (`.hidden lg:flex`) only visible at lg+
