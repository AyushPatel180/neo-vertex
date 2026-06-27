# Neo Vertex Ventures LLP — Website PRD

## Original Problem Statement
Premium, high-trust, deeply differentiated single-page website for Neo Vertex Ventures LLP — an enterprise deep-tech intelligence-infrastructure company. Dark-first, architectural, anti-AI-cliché. After MVP, expanded per a detailed client copy brief covering: positioning ("We build the intelligence infrastructure for the AI Enterprise"), thesis of the continuously-learning enterprise, privacy/scale differentiation, the full 7-module Enterprise AI Stack (Foundation Models, Intelligence Platform, AI OS, Autonomous Agents, Research Platform, Voice Intelligence, Multilingual AI), 10 autonomous enterprise agents, long-horizon research (11 areas + 4 objectives), 14 industries, 6 convictions, "Future of Enterprise Intelligence", and "Build With Us" CTA.

## Architecture
- **Frontend**: React 19 + CRA + Tailwind + Shadcn (Dialog, sonner). Single `/` route.
- **Backend**: FastAPI with `/api` prefix, MongoDB via motor.
- **Design system**: Custom dark-first tokens in `index.css` under `--nv-*` / `.nv-*`. Fonts: Manrope (display) + IBM Plex Sans (body) + IBM Plex Mono (eyebrows). Hero canvas mesh.
- **Sections (13)**: Nav, Hero, ContinuousLearning, PrivacyScale, EnterpriseStack (7 modules), AgentsGrid (10 agents), Research, Industries, WhyNeoVertex (6 pillars), FutureManifesto, BuildWithUs, Footer, BriefingDialog.

## What's Been Implemented
**MVP — 2026-06-27**
- Backend: `POST /api/briefings`, `GET /api/briefings?limit=`, `GET /api/`. Mongo `briefing_requests`.
- Frontend: dark-first single-page with canvas mesh hero, briefing dialog, sonner toast.

**Content expansion — 2026-06-27**
- Restructured to 13 sections matching the full client brief verbatim.
- New components: `ContinuousLearning`, `PrivacyScale`, `EnterpriseStack` (7 modules with custom SVG diagrams: Foundation Models, Intelligence Platform, AI OS, Autonomous Agents, Research Platform, Voice Intelligence, Multilingual AI), `AgentsGrid` (10 agents), `Research` (11 areas + 4 objectives), `Industries` (9 primary + 5 secondary), `BuildWithUs`.
- Refreshed: Hero headline + copy, `WhyNeoVertex` (6 convictions), `Manifesto` → "Future of Enterprise Intelligence" with era triplet, Footer columns (Stack/Company/Trust), Nav (5 links).
- Removed: legacy `PlatformStack.jsx`, `Capabilities.jsx`, `TrustStrip.jsx`.
- Registry: `NV.navLinkResearch`, `NV.navLinkIndustries`, `NV.footerCtaBriefing`, `NV.stackModule()`, `NV.agentCard()`, `NV.industryItem()`, `NV.researchSection`, `NV.futureSection`, `NV.buildSection`, `NV.buildCta`.
- Hero `aria-label` for accessibility of multi-line headline.

**Testing**
- Iteration 1: 12/12 backend, full E2E pass.
- Iteration 2: 12/12 backend regression, 68/68 Playwright assertions pass across all new sections.

## Prioritized Backlog
**P1 — Production hardening**
- Add rate-limit + honeypot (or HCaptcha) on public `POST /api/briefings`.
- Add a DELETE / TTL cleanup for accumulated TEST_-prefixed seed rows.

**P2 — Content & polish**
- Long-form "Architecture Notes" / research papers section.
- Real customer logos when available.
- Email notification on new briefing (Resend / SendGrid).
- Small admin view to read submitted briefings.

**P3 — SEO / performance**
- Pre-render via Next.js for SEO if priority rises.
- Meta tags + OG image.

## Files of Note
- `/app/backend/server.py` — API.
- `/app/frontend/src/App.js` — landing composition.
- `/app/frontend/src/components/neovertex/*` — all section components.
- `/app/frontend/src/constants/testIds/neoVertex.js` — testid registry.
- `/app/frontend/src/index.css` — design tokens & utilities.
- `/app/design_guidelines.json` — generated design system.
- `/app/backend/tests/test_briefings.py` — backend tests.
- `/app/test_reports/iteration_1.json`, `/app/test_reports/iteration_2.json` — test reports.
