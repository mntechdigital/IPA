# IPA — Institute of Public Accountability

A single **Next.js 15 (App Router) + React 19 + TypeScript** codebase with two route-group panels under `src/app/`: the **public media-research observatory website** (`/`) and the **CMS dashboard** (`/cms`). The CMS persists to **MySQL** via **Prisma**, exposed to the client through `/api/cms/**` route handlers.

---

## Project structure

```text
ipa-media-research/
├── src/app/
│   ├── layout.tsx          ← Root layout (fonts, metadata, globals.css)
│   ├── globals.css         ← Merged Tailwind theme + brand tokens
│   │
│   ├── (site)/             ← PANEL 1: public website
│   │   ├── layout.tsx      ← SERVER layout: LanguageProvider + Header + Footer
│   │   ├── page.tsx        ← Home (/), server page with metadata → <HomeView />
│   │   ├── about/page.tsx  ← About (/about)
│   │   ├── work/page.tsx   ← Work (/work)
│   │   ├── team/page.tsx   ← Team (/team?member=<id> opens modal)
│   │   ├── contact/page.tsx← Contact (/contact)
│   │   ├── investigation/[id]/page.tsx ← Research detail, generateMetadata
│   │   ├── _components/    ← CLIENT sections: HomeView, AboutView, WorkView, TeamView, ContactView, InvestigationView
│   │   └── PageTransition.tsx ← shared entry animation wrapper
│   │
│   ├── (dashboard)/cms/    ← PANEL 2: CMS dashboard (real routes)
│   │   ├── layout.tsx      ← SERVER layout → client <CmsShell />
│   │   ├── page.tsx        ← /cms Overview
│   │   ├── home|about|research|teams|contact|branding|publications|monitoring|inquiries/page.tsx
│   │   ├── _components/    ← CmsShell.tsx, CmsSectionView.tsx
│   │   ├── context/CmsContext.tsx ← API-backed CMS state (no localStorage)
│   │   ├── components/     ← Header, Sidebar, dashboard editors, frontend live preview
│   │   ├── data/           ← initialData.ts (INITIAL_CMS_STATE), appGridDefinitions.ts
│   │   └── types.ts        ← CMS data model types
│   │
│   └── api/cms/**          ← route handlers: state/settings/home/about/contact/monitoring/
│                               research/team/publications/inquiries/activity/reset/import
│
├── src/lib/                ← server-only data layer (db.ts, cms-store.ts)
├── prisma/                 ← schema.prisma, seed.ts, migrations/
│
├── src/                    ← shared site infrastructure
│   ├── types.ts            ← public website types
│   ├── components/         ← self-contained client UI + shared site components
│   ├── context/            ← LanguageContext (EN/Bangla)
│   └── data/               ← static content defaults (seeded into the CMS DB)
│
├── next.config.ts
├── postcss.config.mjs      ← Tailwind CSS v4 via @tailwindcss/postcss
├── package.json
└── tsconfig.json
```

## Two panels, one repo

| Panel | URL | Purpose |
|-------|-----|---------|
| **Site** (`src/app/(site)/`) | `/` | Public-facing IPA website — Home, About, Researches, Team, Contact, Investigation detail. Server pages + client sections |
| **Dashboard** (`src/app/(dashboard)/cms`) | `/cms` | Admin CMS panel managing research beats, team, publications, inquiries, site settings. Each section is a real route (`/cms/research`, `/cms/teams`, …) |

## Tech stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS 4 via `@tailwindcss/postcss`
- Motion for React animations
- Recharts (CMS dashboard charts)
- Lucide React icons
- Prisma 6 + MySQL (`@prisma/client@^6`)

## Getting started

### Requirements

- Node.js 18.18 or newer
- npm
- Local MySQL 8 running on port 3306

### Setup (first time)

1. `npm install`
2. Create `.env` from `.env.example` and set `DATABASE_URL` (password URL-encoded, e.g. `@` → `%40`, `#` → `%23`)
3. `npm run db:migrate` (creates the schema) then `npm run db:seed` (loads the website's default content into MySQL)

### Start the development server

```bash
npm run dev
```

- **Public website:** [http://localhost:3000](http://localhost:3000)
- **CMS dashboard:** [http://localhost:3000/cms](http://localhost:3000/cms)

### Run checks

```bash
npm run lint       # TypeScript check (covers both panels)
npm run build      # Production build
npm run start      # Serve the production build
```

## Public website — features

- Real App Router navigation: `/`, `/about`, `/work`, `/team`, `/contact`, `/investigation/<id>`
- **Server page components** with `metadata`/`generateMetadata`; page bodies are **client sections** under `src/app/(site)/_components/`
- Navigation uses `next/navigation` directly (`Link`, `useRouter`, `useParams`, `useSearchParams`) — no routing shim
- English / Bangla language switcher with `localStorage` persistence (`ipa-language`)
- Responsive editorial layout with Tailwind CSS, Motion page transitions, FAQ search, dataset-request modal, contact form
- Content is maintained in `src/data` (static defaults); the CMS DB is the dynamic layer

## CMS dashboard — features

- Real routes per section: Overview, Home, About, Research, Teams, Contact, Branding, Publications, Monitoring, Inquiries
- Sidebar/header CMS shell with page-level app grids and a frontend live preview (cms/frontend/split view modes)
- Full CRUD for research beats, team members, and publications via context actions backed by `/api/cms/**`
- Inquiries inbox with status management, monitoring telemetry view, JSON export/import, and reset-to-default
- **Persistence is MySQL (Prisma)** — the client loads state from `GET /api/cms/state` and every mutation persists through the API

## Data model

The CMS `CmsState` type (`src/app/(dashboard)/cms/types.ts`) holds all editable content:

- `homePage: HomePageData` — hero, counters, public-interest banner, what-we-do cards, investigation cards, how-we-work steps, featured team, bottom CTA
- `aboutPage: AboutPageData` — mission, hero banner, who-we-are, mission pillars, methodology, governance
- `contactPage?: ContactPageData` — hero, direct contact details, message settings, FAQs
- `researchBeats: Record<string, ResearchBeat>` — all research programs (keyed by beat ID)
- `team: TeamMember[]`, `publications: PublicationItem[]`, `monitoring: MonitoringTelemetry`
- `inquiries: InquirySubmission[]`, `settings: SiteSettings`

## Localization

The public website uses `LanguageContext` with the `useLanguage()` hook and `t(english, bangla)` helper. Language is stored in `localStorage` under `ipa-language`. The CMS dashboard has its own independent language switch (`previewLanguage` in `CmsContext`), used only in the live preview.

## Acknowledgements

This merged project originates from two separate apps (`ipa-media-research-main` — public website, and `ipa-media-research-cms-main` — CMS dashboard), first converted from a Vite multi-page setup to a single Next.js App Router application, then restructured into `src/app/` with a MySQL-backed CMS.