# Obsidia — Website Specification Sheet

*Version 5.0 — Rebranded to Obsidia. New color palette. Glassmorphism system added.*
*This document is the source of truth for the design system. It is not a cage.*

---

## HOW TO USE THIS SPEC

This spec has two jobs:

**Job 1 — Protect the design system.** Colors, fonts, and a few core rules are fixed. These are the grammar of the site. Breaking them breaks the brand.

**Job 2 — Inspire good decisions.** Everything else is a reference, not a constraint. When asked to fix, rework, or impress — act like a senior developer at a top agency. Look at what award-winning B2B and agency sites are doing (Linear, Vercel, Basement Studio, Awwwards winners). Take inspiration. Propose something unexpected but tasteful. The client can always revert if it doesn't land.

**When the brief says "impress me", "rework this", "fix this section", or "do something creative":**
- Treat it as creative license
- Look beyond what's already on the site for inspiration
- Propose the most premium version you can imagine within the design system
- Be a senior developer with taste, not a prompt executor

---

## 1. Brand Context

**Company:** Obsidia
**Category:** B2B Digital Services — Automation, Website Development, Application Development
**Positioning:** A single digital partner for SMBs that need things built properly — workflows automated, websites that convert, and applications that fit how the team actually works. Named after obsidian — formed under pressure, sharp by nature.
**Brand Personality:** Precise. Trustworthy. Forward-moving. Quietly confident — not loud.
**Decision filter:** *"Would a serious operations director at a mid-sized company trust this with their business?"*

**Three Core Services:**
1. **Workflow Automation** — replacing manual, slow processes with digital workflows
2. **Website Development** — corporate sites, landing pages, e-commerce, web apps
3. **Application Development** — mobile apps, internal tools, client portals, dashboards


---

## 2. Design Philosophy

Obsidia does not shout. It communicates through clarity, restraint, and weight. Think McKinsey Digital meets Linear — corporate enough to be trusted, refined enough to be remembered.

The site uses contrast rhythm — alternating white, off-white, and near-black sections. This creates breathing room and prevents monotony. Preserve this rhythm when adding sections.

**Creative ambition is welcome.** The constraint is taste, not imagination. If something would look at home on Awwwards, Lusion, or Basement Studio's site — and it passes the operations director test — build it.

---

## 3. Design System — FIXED

These rules are non-negotiable. Everything else in this document is reference.

### Colors — FIXED

| Variable | Value | Usage |
|----------|-------|-------|
| `--bg` | `#FAFAFA` | Primary white background |
| `--surface` | `#F2F2F4` | Cool off-white surfaces |
| `--text` | `#0A0B0F` | Primary text on light |
| `--dark-text` | `#E8EAF2` | Primary text on dark |
| `--text-secondary` | `#5C5C6E` | Supporting body copy |
| `--muted` | `#8A8FA8` | Labels, captions |
| `--accent` | `#3D52E6` | Electric Cobalt — primary accent |
| `--accent-hover` | `#2D40D4` | Cobalt on hover |
| `--accent-subtle` | `#EEF0FD` | Cobalt tint backgrounds |
| `--violet` | `#7B4FD4` | Violet — secondary accent, gradients |
| `--border` | `#E2E3EA` | Dividers, outlines |
| `--dark-bg` | `#0A0B0F` | Obsidian — primary dark background |
| `--dark-surface` | `#3D5A6B` | Moscow Midnight — card surfaces on dark |
| `--dark-border` | `#1E2130` | Dividers on dark |

**Gradient:** `linear-gradient(135deg, #3D52E6, #7B4FD4)` — used on
logo mark, hero visuals, and decorative elements only.

Always use CSS variables. Never hardcode color values.

### Typography — FIXED

Three fonts only. No exceptions.

- **Cormorant Garamond** — all headings, display text, pull quotes
- **DM Sans** — all body copy, UI labels, navigation, buttons
- **JetBrains Mono** — stat numbers, step counters, technical labels only

| Role | Font | Size |
|------|------|------|
| Hero H1 | Cormorant | clamp(48px, 6vw, 88px) |
| Section H2 | Cormorant | clamp(36px, 4vw, 56px) |
| Card H3 | Cormorant | clamp(22px, 2.5vw, 32px) |
| Stat numbers | JetBrains Mono | clamp(36px, 4vw, 76px) |
| Body | DM Sans | 14–16px |
| Labels | DM Sans | 9–12px uppercase |

### Crimson Rules — FIXED

Crimson is not decoration. It is signal. Use it where it earns attention — interactive elements, key data points, deliberate accents. Never dilute it with overuse.

Established uses: navigation active states, primary CTA buttons, stat suffixes, card hover accents, section label lines, diamond markers, quote marks, reading progress bar.

Before adding crimson anywhere new, ask: does this need to be noticed, or is it just decoration? If decoration — don't use crimson.

### Animation Rules — FIXED

- Scroll reveals: IntersectionObserver, opacity + translateY, 500–700ms ease-out, stagger 80–120ms
- Hover transitions: 200ms ease, always
- Count-up: requestAnimationFrame, cubic easing, 1500–1900ms
- Framer Motion: currently in Hero. Can be introduced to new sections if the effect justifies it.
- Always respect `prefers-reduced-motion`
- No bounce, no spring, no spin on content elements

### What Never Changes

- No new fonts
- No colors outside the palette
- No hardcoded values — use CSS variables
- No centered body copy blocks
- No stock photography

### Glassmorphism System

Glassmorphism is a core visual language for Obsidia. It is used 
on cards within dark sections to create depth, layering, and a 
sense of premium materiality consistent with the obsidian brand 
concept.

**Standard glass card recipe:**
```css
background: rgba(255, 255, 255, 0.05);
backdrop-filter: blur(16px);
-webkit-backdrop-filter: blur(16px);
border: 1px solid rgba(255, 255, 255, 0.08);
```

**Moscow Midnight glass card (elevated):**
```css
background: rgba(61, 90, 107, 0.45);
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 1px solid rgba(255, 255, 255, 0.10);
```

**Cobalt-tinted glass (accent cards):**
```css
background: rgba(61, 82, 230, 0.08);
backdrop-filter: blur(16px);
-webkit-backdrop-filter: blur(16px);
border: 1px solid rgba(61, 82, 230, 0.20);
```

**Rules for glassmorphism use:**
- Glass cards are used on dark backgrounds only (`--dark-bg`). 
  Never on white or off-white sections — glass needs dark depth 
  behind it to work.
- Always pair with an ambient background element (dot grid, 
  radial gradient glow, or gradient mesh) so the blur has 
  something to refract.
- The cobalt-to-violet gradient can be used as a 2px top border 
  on glass cards as a premium detail.
- On hover: increase background opacity slightly and shift border 
  to `rgba(61, 82, 230, 0.35)`. Duration 200ms ease.
- Never stack glass cards on top of each other — the blur 
  compounds and becomes muddy.
- `backdrop-filter` has Safari compatibility requirements — 
  always include `-webkit-backdrop-filter` alongside it.

---

## 4. Current Site Reference

Use as reference for patterns and consistency — not as a ceiling.

**Navigation:** Fixed. Frosted glass on scroll. Logo "Obsidia". "Start a Project" crimson pill CTA. Reading progress bar. Active link dot. Services link leads to /services.

**Hero:** Split white/dark. Animated headline with cycling crimson word. Triptych visual on dark panel (three service icons: automation nodes, browser wireframe, app skeleton). Live activity badge.

**StatsBand:** Dark `#111111`. Three stats in large monospace cream. Crimson suffixes and ticks. Count-up animation.

**ProblemStatement:** Dark with dot grid and ambient crimson glow. Four pain cards. Crimson hover accents.

**Marquee:** Near-black. Scrolling text strip. Every 4th item crimson.

**ServicesTeaser:** Dark with glass cards. 2×2 grid. GlareHover effect. Crimson accent bar on hover.

**ProcessSection:** Three-band layout. White header / dark stats / off-white step grid. Diamond markers. Deliverable labels in crimson.

**ValuePillars:** Off-white. Three columns. Lucide icons crimson stroke.

**TestimonialQuote:** White. Large italic serif quote centered. Crimson opening quote character.

**TrustBar:** White. Logo marquee. Grayscale → color on hover.

**CTABand:** Dark. Large serif headline. Magnetic CTA button.

**Footer:** Dark. Four columns. Cobalt column headers. Lists all three services.

**Approach page:** Dark hero with crimson drawing line. Philosophy statement. Phase rows with watermark numbers. Principles strip. 6-week timeline. Crimson CTA band.

**Contact page:** Split dark/white. Form with crimson focus states.

---

## 5. Page Structure

| Page | Route | Status |
|------|-------|--------|
| Homepage | `/` | Needs rebrand update |
| Services Hub | `/services` | To build |
| Workflow Automation | `/services/automation` | To build |
| Website Development | `/services/websites` | To build |
| Application Development | `/services/apps` | To build |
| Approach | `/approach` | Built |
| Contact | `/contact` | Built |
| About | `/about` | To build |

### Page Purposes

**Homepage `/`**
Positions Obsidia as a three-service digital partner. Introduces all three services at a high level. Routes visitors to /services or /contact. Does not go deep on any single service.

**Services Hub `/services`**
Three large service rows — one per service. Each row introduces the service, names key outcomes, and links to the dedicated sub-page. Not a detailed page — a routing hub.

**Automation `/services/automation`**
Inherits all automation-specific content from the old Seera homepage: WorkflowGraph hero visual, ProblemStatement cards, four automation service cards, StatsBand, ProcessSection, TestimonialQuote, TrustBar (integration logos). This is the deepest, most detailed service page.

**Websites `/services/websites`**
Same structural template as automation page. Website-development-specific problem statement, service types, stats, and process. Browser wireframe animated visual in hero.

**Apps `/services/apps`**
Same structural template. Application-development-specific content. App skeleton animated visual in hero.

**Approach `/approach`**
Already built. The Audit → Design → Build → Handoff process is universal across all three services. No changes needed unless copy requires minor updates to reflect broader scope.

**About `/about`**
To build. Company story, Obsidia founding, team, values. References all three service areas.

---

## 6. Copy Rules

- Direct. Specific. Outcomes not features.
- No exclamation marks in headlines.
- Banned: seamless, streamline, empower, unlock, revolutionize, transform, unlimited, excellence.
- Body paragraphs: 3 sentences max.
- CTAs say what happens next.
- Each service page copy should read like a specialist wrote it — not a generalist covering all bases.

---

## 7. Open Decisions

- Final service names and sub-service offerings
- Real team bios and photos
- Form backend (Supabase preferred)
- Pricing visibility per service
- Case studies / portfolio section (future)
- Blog / Resources (future)
- Analytics setup (future)

---

**Stack:** Next.js App Router + TypeScript.
Use `next/navigation` for all routing. Never use React Router.

*Version 4.0*
*File: OBSIDIA_SPEC.md*
*Start every Claude Code session with: "Read OBSIDIA_SPEC.md before starting."*