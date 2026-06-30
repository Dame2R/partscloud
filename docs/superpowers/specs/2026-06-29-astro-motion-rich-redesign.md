# PartsCloud Website — Astro Motion Rich Redesign

**Date:** 2026-06-29
**Status:** Approved
**Context:** Studienarbeit — GitHub Pages hosting (Dame2R/partscloud)

---

## 1. Goal

Migrate the existing plain-HTML PartsCloud marketing site to Astro with a "Motion Rich" design (Framer/Stripe-style). The site is purely presentational — no backend, no auth, no CMS.

---

## 2. Design Direction: Motion Rich

**Reference mockup:** `.superpowers/brainstorm/87622-1782742466/content/design-full.html`

### Colors (locked — do not change)
```
--purple:   #8b5cf6   --purple-l: #a78bfa
--green:    #10b981   --green-l:  #34d399
--blue:     #3b82f6   --blue-l:   #60a5fa
--bg:       #07070f
```

### Typography (locked — do not change)
- **Display / Headings:** Syne 700, 800
- **Body / UI:** Inter 400, 500, 600
- Letter-spacing on H1: `-2px` (NOT `-3px`)

### Design tokens
- 8px spacing grid: `--s1` (8px) through `--s10` (120px)
- Text opacity scale: `.92` / `.55` / `.28` / `.16`
- Surface: `rgba(255,255,255,.028)` | Border: `rgba(255,255,255,.07)`

### Signature interactions
- Hero H1 gradient keyword animates with `background-position` pan
- Ambient orbs drift with `blur(120px)` — GPU only
- Nav: transparent → `backdrop-filter:blur(24px)` on scroll
- Bento cards: `translateY(-5px)` + shimmer `::after` on hover
- HIW step numbers: glow on hover
- All sections: `IntersectionObserver` scroll-reveal with staggered delay

---

## 3. Architecture

### Framework
**Astro 4.x** — static output (`output: 'static'`).

### GitHub Pages config
- No custom domain (no CNAME file) → `base: '/partscloud'` in `astro.config.mjs`
- All internal links use Astro's `import.meta.env.BASE_URL` prefix
- Deploy via GitHub Actions workflow: `pnpm build` → `dist/` → Pages

### Directory structure
```
partscloud-website/
├── src/
│   ├── components/
│   │   ├── Nav.astro          shared navbar (dropdowns, scroll-blur)
│   │   ├── Footer.astro       shared footer
│   │   ├── Chatbot.astro      floating chatbot (on every page)
│   │   └── HeroStats.astro    stats row (reused on hero)
│   ├── layouts/
│   │   └── Layout.astro       base layout (head, Nav, Chatbot, Footer, slot)
│   ├── pages/
│   │   ├── index.astro            Homepage — full Motion Rich
│   │   ├── service-after-sales.astro
│   │   ├── scm-procurement.astro
│   │   ├── ueber-uns.astro
│   │   ├── kontakt.astro
│   │   ├── referenzen.astro       Placeholder
│   │   ├── ressourcen.astro       Placeholder
│   │   └── impressum.astro
│   └── styles/
│       └── global.css             CSS custom properties, reset, base styles
├── public/
│   └── favicon.svg
├── astro.config.mjs
├── package.json
└── .github/workflows/deploy.yml
```

---

## 4. Navigation Structure

```
Logo | Lösungen▾ | Referenzen | Unternehmen▾ | Ressourcen | [Demo anfragen]
       ├─ Service & After-Sales → /service-after-sales
       └─ SCM & Procurement    → /scm-procurement
                                              ├─ Über uns → /ueber-uns
                                              └─ Kontakt  → /kontakt
```

Dropdown behavior: CSS hover (`:hover` on `.nav-item` wrapper). Chevron rotates 180° on open. On mobile: hamburger (out of scope for now).

---

## 5. Pages

### 5.1 Homepage (`/`)
Sections in order:
1. **Hero** — badge, H1 with gradient keyword, desc, kickers line, CTA buttons, stats band
2. **Logo ticker** — marquee of customer names (pause on hover)
3. **Features Bento** — 12-col grid, 5 cards (7+5 row, 4+4+4 row), scroll-reveal
4. **How It Works** — 3 steps with connecting line, step numbers glow on hover
5. **Social Proof** — featured quote (full width) + 2 smaller quotes
6. **CTA block** — gradient card, eyebrow + H2 + sub + two buttons
7. **Footer** — 4-col grid, bottom bar

### 5.2 Service & After-Sales (`/service-after-sales`)
Tailored hero (purple accent, service KPIs), feature highlights for service teams, testimonial, CTA. Uses Layout.astro.

### 5.3 SCM & Procurement (`/scm-procurement`)
Tailored hero (green accent, SCM KPIs), feature highlights for SCM teams, testimonial, CTA. Uses Layout.astro.

### 5.4 Über uns (`/ueber-uns`)
Team section: Benjamin Reichenecker (Co-Founder & CEO), Fabian Gemmecke (Co-Founder & CTO). Company mission, address. Uses Layout.astro.

### 5.5 Kontakt (`/kontakt`)
Contact persons with email/phone. Contact form (static — `mailto:` action or Formspree). Uses Layout.astro.

### 5.6 Referenzen & Ressourcen (placeholders)
Single centered message: **"Hier kommt bald etwas einzigartiges"** with subtle animated gradient text. Uses Layout.astro.

### 5.7 Impressum (`/impressum`)
Legal text, company info. Uses Layout.astro.

---

## 6. Chatbot

- Available on **every page** via Layout.astro inclusion
- Floating FAB, bottom-right, `position: fixed`
- Status: **"Bereit für dein Anliegen"** with green animated dot
- Keyword-based response matching (static JS, no backend)
- Close button in header — `[hidden]` attribute + `display:none !important` override
- Quick-reply pills: Was ist PartsCloud? / Integration? / Demo anfragen / Kontakt

---

## 7. Performance & Accessibility

- Fonts preconnected: `fonts.googleapis.com` + `fonts.gstatic.com`
- `font-display: swap` on Google Fonts URL
- Ambient orbs: `will-change: transform`, animate only `transform`
- `prefers-reduced-motion`: `@media (prefers-reduced-motion: reduce)` disables drift animations and scroll reveals
- All interactive elements keyboard-accessible
- WCAG AA contrast on all text/background combos

---

## 8. Out of Scope

- Mobile responsive / hamburger menu (separate task if needed)
- CMS / dynamic content
- Real chatbot backend
- Analytics / tracking
- Multi-language support
