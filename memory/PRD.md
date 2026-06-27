# Neo Vertex Ventures LLP — Website PRD

## Original Problem Statement
Design and build a premium, high-trust, deeply differentiated single-page website for Neo Vertex Ventures LLP — an enterprise deep-tech intelligence-infrastructure company. The site must feel like the public face of an enterprise platform (mood references: Anthropic, Databricks, Palantir, NVIDIA Enterprise AI, Apple) — calm, architectural, expensive, technically credible — while avoiding generic AI-startup clichés, neon, robots, glassmorphism, and template aesthetics.

## Architecture
- **Frontend**: React 19 + CRA + Tailwind + Shadcn UI (Dialog, sonner). React Router with single `/` route.
- **Backend**: FastAPI with `/api` prefix, MongoDB via motor.
- **Design system**: Custom dark-first tokens in `index.css` under `--nv-*` and `.nv-*` utilities. Fonts: Manrope (display) + IBM Plex Sans (body) + IBM Plex Mono (eyebrows).
- **Hero visual**: Custom canvas-based animated intelligence mesh (`HeroMesh.jsx`) — nodes drift, connections render below distance threshold, data packets traverse in azure, mouse halo.
- **Scroll reveal**: IntersectionObserver-based `useReveal` hook applied to `.nv-reveal` elements.

## User Personas
- **Enterprise architect / CTO** at a regulated institution evaluating intelligence infrastructure.
- **Procurement / risk lead** scanning for governance posture (SOC 2, residency).
- **Investor / partner** validating brand seriousness and long-term vision.

## Core Requirements (Static)
- Dark-first premium aesthetic; no purple/violet gradients on white; no AI clichés.
- Sections: Nav, Hero, Trust Strip, The Vertex Platform (5 layers), Capabilities (4 blocks with SVG diagrams), Why Neo Vertex (3 pillars), Vision/Manifesto, Footer.
- Single primary CTA "Request a Briefing" available from nav, hero, vision, footer.
- All interactive elements carry `data-testid` (registry: `/app/frontend/src/constants/testIds/neoVertex.js`).
- Mobile-responsive with simplified nav drawer.

## What's Been Implemented (2026-06-27)
- ✅ Backend: `POST /api/briefings`, `GET /api/briefings?limit=`, `GET /api/`. Pydantic v2 models (`BriefingRequestCreate`, `BriefingRequest`). Mongo collection `briefing_requests`. Datetime stored as ISO string.
- ✅ Frontend: full single-page experience with animated canvas mesh hero, layered platform stack, 4 capability blocks with original SVG line diagrams, 3 conviction pillars, manifesto, footer.
- ✅ Briefing dialog (Shadcn `Dialog`) — name, work_email, company, role, intent select, optional message → POST to `/api/briefings`, success state, sonner toast.
- ✅ Custom design tokens & utilities (Manrope + IBM Plex Sans/Mono), grid lines, hairline borders, line-draw animations, mesh canvas.
- ✅ Testing: 12/12 pytest cases pass, full Playwright E2E pass (hero, nav, all CTAs, form submission, validation, mobile menu).

## Prioritized Backlog
**P1 — Hardening / Production**
- Add basic abuse protection on `POST /api/briefings` (rate limiting + honeypot or HCaptcha) before going public.
- Add a dedicated `nv-footer-cta-briefing` testid key (currently reuses hero key).
- Add `aria-label` / structured spacing on hero headline for accessibility/SEO copy.

**P2 — Content & polish**
- Insight / writing section (long-form architecture notes).
- Customer logo / case study marks once available (replace text trust strip).
- Pre-render or SSR via Next.js if SEO becomes a priority.

**P3 — Admin**
- Tiny admin view for the team to read submitted briefings.
- Email notification on new briefing submission (Resend/SendGrid).

## Files of Note
- `/app/backend/server.py` — API
- `/app/frontend/src/App.js` — landing composition
- `/app/frontend/src/components/neovertex/*` — all section components
- `/app/frontend/src/index.css` — design tokens & utilities
- `/app/design_guidelines.json` — generated design system
- `/app/backend/tests/test_briefings.py` — backend tests
