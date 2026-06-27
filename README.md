# Neo Vertex Ventures LLP

**We build the intelligence infrastructure for the AI Enterprise.**

A premium, dark-first single-page website for Neo Vertex Ventures LLP — positioning the company as an enterprise deep-tech intelligence-infrastructure company (not a chatbot vendor, not an AI agency).

## Stack
- **Frontend** — React 19 + CRA + Tailwind + Shadcn UI, custom dark design tokens, Manrope + IBM Plex Sans/Mono. Hero canvas mesh, scroll-reveal, SVG architecture diagrams.
- **Backend** — FastAPI (`/api` prefix) + MongoDB (motor).
- **Briefing capture** — `POST /api/briefings` persists structured leads to the `briefing_requests` collection.

## Sections (13)
1. Hero — "We build the intelligence infrastructure for the AI Enterprise."
2. Continuously-Learning Enterprise thesis
3. Built for Privacy. Designed for Scale.
4. The Enterprise AI Stack — 7 modules (Foundation Models, Intelligence Platform, AI OS, Autonomous Agents, Research Platform, Voice Intelligence, Multilingual AI)
5. Autonomous Enterprise Agents (10 agents)
6. Research (11 long-horizon areas + 4 objectives)
7. Industries (14)
8. Why Neo Vertex (6 convictions)
9. The Future of Enterprise Intelligence
10. Build With Us
11. Footer
12. Briefing dialog
13. Sticky navigation

## Local development
```bash
# Backend
cd backend
pip install -r requirements.txt
# create backend/.env with MONGO_URL, DB_NAME, CORS_ORIGINS
uvicorn server:app --reload --host 0.0.0.0 --port 8001

# Frontend
cd frontend
yarn install
# create frontend/.env with REACT_APP_BACKEND_URL
yarn start
```

## Testing
- Backend: `pytest backend/tests/test_briefings.py -v`
- Latest results: 12/12 pytest + 68/68 Playwright assertions pass.

## License
© Neo Vertex Ventures LLP. All Rights Reserved.
