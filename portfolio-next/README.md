# Jagan · Portfolio

A flagship, 3D-immersive personal portfolio.

Dark, editorial, cinematic. Built for senior-developer signal — not template vibes.

## Stack

- **Next.js 15** (App Router, React 19)
- **TypeScript** (strict)
- **Tailwind CSS v4** — CSS-first `@theme` tokens, no `tailwind.config.js` needed
- **Framer Motion** — UI + scroll animations
- **React Three Fiber 9 + Drei 10 + Three.js** — hero shader sphere
- **Lenis** — smooth scroll
- **EmailJS** — contact form
- **Instrument Serif + Inter + JetBrains Mono** via `next/font/google`
- **pnpm** as the package manager

## Design

| Token | Value |
|---|---|
| Background | `#09090B` (onyx) |
| Elevated | `#0E0E11` |
| Surface | `#131317` |
| Foreground | `#EDEDED` |
| Muted | `#8A8A8E` |
| **Accent** | **`#D4A373`** (warm sand — editorial gold) |

All tokens live in [`src/app/globals.css`](src/app/globals.css) under `@theme`. Change one variable to re-skin the site.

Typography mix:
- **Display** — Instrument Serif (regular + italic for emphasis)
- **UI** — Inter
- **Mono** — JetBrains Mono (eyebrows, labels, tabular numbers)

## Features

- **First-visit loader** — real asset decoding, percentage counter, kinetic name mask-reveal, bisected exit
- **Custom cursor** — dot (instant) + spring ring, mix-blend-difference, contextual states via `data-cursor="link|view|drag|text"`
- **Magnetic buttons** — `<Magnetic>` wrapper using Framer Motion springs
- **Lenis smooth scroll** — exposed on `window.__lenis` for programmatic control
- **Scroll progress** — thin accent line at top of viewport
- **3D hero** — R3F `MeshDistortMaterial` icosahedron, cursor-reactive distortion & rotation
- **Kinetic typography** — letter stagger with blur-to-clear on hero
- **Dual-row marquees** — "I BUILD" / "I SHIP", pause on hover
- **Sticky-pinned projects showcase** — Robin Noguier pattern, parallax images
- **Case-study modal** — keyboard-close, scroll-lock, full-width cover image
- **Animated timeline** — scroll-driven accent rail
- **Floating-label form** — EmailJS-wired, animated success checkmark, magnetic submit
- **Copy-email-to-clipboard** button with animated state swap
- **Outlined giant signature** in the footer
- **`prefers-reduced-motion`** respected — Lenis + custom cursor disabled gracefully
- **Touch detection** — cursor auto-hides on touch, skip link for keyboard users
- **Skip-to-content** link for a11y

## Structure

```
portfolio-next/
├── content/                 ← EDIT THESE to update the site
│   ├── bio.ts
│   ├── skills.ts
│   ├── projects.ts
│   ├── experiences.ts
│   └── education.ts
├── public/images/           ← All imagery, organized by use
└── src/
    ├── app/                 Next App Router: layout, page, sitemap, robots
    ├── components/
    │   ├── motion/          TextReveal, ClipReveal, Magnetic, Marquee
    │   ├── sections/        Hero, HeroScene (R3F), About, Skills, Projects, Experience, Contact
    │   ├── shell/           Navbar, Footer, LenisProvider, Loader, LoaderGate, Cursor
    │   └── ui/              NoiseOverlay, ScrollProgress, StatCounter
    ├── hooks/               useMediaQuery
    ├── lib/                 utils (cn)
    └── types/               R3F JSX augmentation
```

## Quick start

```bash
cd portfolio-next
corepack enable pnpm        # first time only
pnpm install
cp .env.example .env.local   # EmailJS keys for contact form
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Customizing

All content lives in [`content/`](content/). Nothing else to touch to update the site.

**Bio** — [`content/bio.ts`](content/bio.ts)
- `bio` object: name, roles, tagline, about, location, email, socials, resume link
- `stats`: the four-up numbers in the About band
- `achievements`: bullets under About

**Skills** — [`content/skills.ts`](content/skills.ts)
- `skillGroups`: the four-column grid
- `marqueeRowOne` / `marqueeRowTwo`: infinite-scroll tech rows

**Projects** — [`content/projects.ts`](content/projects.ts)
- Each project has `featured: true/false`. Featured ones get the sticky-pinned showcase; the rest go in the Archive grid.
- `number`, `role`, `year`, `description[]`, `highlights[]`, `tags[]`, `github`, `webapp`

**Experience & Education** — [`content/experiences.ts`](content/experiences.ts), [`content/education.ts`](content/education.ts)

**Nav order & coding profiles** live at the bottom of [`content/education.ts`](content/education.ts).

### Design tokens

Change the palette in [`src/app/globals.css`](src/app/globals.css). Swap `--color-accent` to re-skin the site instantly.

### Fonts

Configured in [`src/app/layout.tsx`](src/app/layout.tsx) via `next/font/google`. To swap the display face, replace `Instrument_Serif` with another Google Font.

## Environment variables

| Name | Purpose |
|---|---|
| `NEXT_PUBLIC_EMAILJS_SERVICE_ID` | EmailJS service |
| `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID` | EmailJS template |
| `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY` | EmailJS public key |
| `NEXT_PUBLIC_SITE_URL` | Production site URL (used for OG / sitemap) |

Without the three EmailJS vars the contact form renders a graceful fallback pointing the visitor at your email.

## Performance

- **Production build**: 178 KB first-load JS for `/`
- **R3F canvas**: lazy-loaded via `next/dynamic` with `ssr: false` so it never hits the critical path
- **Images**: all through `next/image`, lazy by default
- **Prerender**: all routes static
- **Font loading**: `display: swap` on all three faces to prevent FOIT

## Deployment

Vercel, zero-config:

```bash
pnpm dlx vercel
```

Set the four env vars in the Vercel dashboard. Push to connect the repo for auto-deploys.

## Accessibility

- Skip-to-content link (keyboard-focusable)
- `:focus-visible` accent outline everywhere
- Semantic HTML (`<main>`, `<section>`, `<nav>`, `<footer>`, `<article>`)
- ARIA labels on icon-only buttons
- `prefers-reduced-motion` disables Lenis and the custom cursor
- Custom cursor auto-hides on touch devices

## License

MIT.
