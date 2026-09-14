# AGENTS.md — IPA Media Research

## What is this project

A single **Next.js 15 (App Router) + React 19 + TypeScript** codebase organized into two route-group panels under `src/app/`:

1. **Site panel** (`src/app/(site)/`) — the public-facing website for IPA (Institute of Public Accountability), an independent media-research observatory. Supports English and Bangla. Route files are **server components** (with `metadata`/`generateMetadata`); page bodies live as **client sections** in `src/app/(site)/_components/`.

2. **Dashboard panel** (`src/app/(dashboard)/cms/`) — the CMS admin panel at `/cms`. Each CMS section is a **real route** served by a server page + a client shell (`CmsShell`/`CmsSectionView`). All CMS data is persisted in **MySQL** through **Prisma** and exposed to the client via `/api/cms/**` route handlers. Static `src/data/*` files remain the public site's default content; the database is the CMS's dynamic layer seeded from `INITIAL_CMS_STATE`.

## Build & dev commands

```bash
npm install          # install all dependencies
npm run dev          # dev server at localhost:3000 (both panels)
npm run build        # production build (checks types + builds all routes)
npm run start        # serve the production build locally
npm run lint         # TypeScript type-check (tsc --noEmit) — covers the whole repo

npm run db:migrate   # prisma migrate dev
npm run db:deploy    # prisma migrate deploy
npm run db:seed      # prisma db seed (re-seeds MySQL from INITIAL_CMS_STATE)
npm run db:studio    # prisma studio
```

**Always run `npm run lint` and `npm run build` after making changes.**

## Architecture

```text
ipa-media-research/
├── src/app/
│   ├── layout.tsx            ← Root layout: fonts, metadata, globals.css
│   ├── globals.css           ← Tailwind theme (site tokens + CMS shell scrollbars)
│   │
│   ├── (site)/               ← PANEL 1: Public website
│   │   ├── layout.tsx        ← SERVER component: LanguageProvider + Header + Footer
│   │   ├── page.tsx          ← Home (/), server page: metadata + <HomeView />
│   │   ├── about/page.tsx    ← About (/about)          → <AboutView />
│   │   ├── work/page.tsx     ← Work (/work)            → <WorkView />
│   │   ├── team/page.tsx     ← Team (/team)            → <TeamView />
│   │   ├── contact/page.tsx  ← Contact (/contact)      → <ContactView />
│   │   ├── investigation/[id]/page.tsx ← Research detail, generateMetadata → <InvestigationView id=… />
│   │   ├── _components/      ← CLIENT sections (HomeView, AboutView, WorkView, TeamView, ContactView, InvestigationView)
│   │   └── PageTransition.tsx← shared entry animation wrapper
│   │
│   ├── (dashboard)/cms/      ← PANEL 2: CMS dashboard (real routes under /cms)
│   │   ├── layout.tsx        ← SERVER: wraps children in client <CmsShell />
│   │   ├── page.tsx          ← /cms (overview) + home|about|research|teams|contact|branding|publications|monitoring|inquiries/page.tsx
│   │   └── _components/      ← CmsShell.tsx (provider + sidebar + header), CmsSectionView.tsx (editor switch)
│   │
│   └── api/cms/**            ← route handlers: state, settings, home, about, contact, monitoring,
│                               research, team, publications, inquiries, activity, reset, import
│
├── src/lib/                  ← server-only data layer
│   ├── db.ts                 ← Prisma singleton (globalThis)
│   └── cms-store.ts         ← CMS CRUD/snapshot/reset/import ('server-only')
│
├── prisma/                   ← schema.prisma, seed.ts (from INITIAL_CMS_STATE), migrations/
│
├── src/                      ← shared infrastructure (site + CMS dashboard)
│   ├── types.ts              ← site types + CMS data model (ResearchBeat, TeamMember, CmsState, …)
│   ├── components/           ← self-contained client UI (Header, Footer, CTASection, …) +
│   │                          CmsHeader, Sidebar, dashboard editors (components/dashboard/*),
│   │                          LiveSitePreview (components/frontend/)
│   ├── context/              ← LanguageContext (EN/BN, localStorage key: ipa-language)
│   │                          + CmsContext.tsx (useCms hook, loads /api/cms/state)
│   └── data/                 ← static content defaults (focusAreas, team, investigations, work, …)
│                              + CMS layers: initialData.ts (INITIAL_CMS_STATE), appGridDefinitions.ts
│
├── next.config.ts
├── postcss.config.mjs
├── package.json
└── tsconfig.json
```

## Key conventions

### Site panel (`src/app/(site)/`)

| Concern | File/location |
|---------|---------------|
| Route page | SERVER component in `src/app/(site)/**/page.tsx` — exports `metadata` (or `generateMetadata`) and renders a client section. No `'use client'`, no hooks |
| Page body | CLIENT component in `src/app/(site)/_components/*.tsx`, `'use client'`, default export |
| Navigation | `next/navigation` directly — `<Link>`/`useRouter`/`useParams`/`useSearchParams`. **No `useAppNavigation` shim** |
| Page-intrinsic data | Investigation id via server `generateMetadata` prop; team member modal via `useSearchParams` (wrapped in `<Suspense>`) |
| Content data | `src/data/*.ts` — defaults/seed content. Static data stays static; the DB is the CMS's dynamic layer |
| Localization | `src/context/LanguageContext.tsx` — `useLanguage()` hook, `t(enText, bnText)` helper, persisted under `ipa-language` |
| Layout | `layout.tsx` is a server component rendering client `LanguageProvider` (isolation: it must be a Client Component — keep `'use client'`) around client `Header`/`Footer`/`ScrollProgress` |

Tips:
- To add a new site page: create `src/app/(site)/<name>/page.tsx` (server, metadata, renders a client view) and `src/app/(site)/_components/<Name>View.tsx` (client). Add the page id to `PageId` in `src/types.ts` and a nav entry in `src/data/navigation.ts`. Add Bangla strings in `src/data/translations.ts`.

### Dashboard panel (`src/app/(dashboard)/cms/`)

| Concern | File/location |
|---------|---------------|
| Routes | Server page per section (`page.tsx`, `home/`, `about/`, `research/`, `teams/`, `contact/`, `branding/`, `publications/`, `monitoring/`, `inquiries/`) each rendering `<CmsSectionView tab="…"/>` |
| Shell | `_components/CmsShell.tsx` (client): `CmsProvider` > `Sidebar` + `CmsHeader` + `<main>{children}</main>`; wired by server `layout.tsx` |
| Editor switch | `_components/CmsSectionView.tsx` (client): ResearchManagerView / SectionFormEditor via `selectedSectionAppId`, else switches on the `tab` prop; honours `viewMode` (cms/frontend/split) |
| State | `src/context/CmsContext.tsx` — `useCms()` hook. Loads snapshot from `GET /api/cms/state` on mount; every mutation calls the matching API endpoint and optimistically updates local state. Tab is derived from the pathname |
| Persistence | **MySQL (Prisma)** — NOT localStorage. Mutations persist through `/api/cms/**` handlers backed by `src/lib/cms-store.ts` |
| Default/seed data | `src/data/initialData.ts` — `INITIAL_CMS_STATE`; seeded to MySQL via `npm run db:seed` |
| App grids | `src/data/appGridDefinitions.ts` — which "apps" (section editors) exist for each page |
| Content update pattern | Always use context actions (`updateHomePage`, `updateResearchBeat`, …) — never call `setState` directly |
| Adding an editor | Create `src/components/dashboard/YourEditor.tsx`, add a case in `CmsSectionView.tsx` (`renderEditor`, keyed by `selectedSectionAppId` or `tab`), optionally add an app grid tile in `src/data/appGridDefinitions.ts` |

### Data layer

- DB: local MySQL 8 (`ipa_cms`). `DATABASE_URL` in `.env` (URL-encoded password), template in `.env.example`. `.env` is gitignored.
- Prisma `@prisma/client` **v6** (`prisma@^6`). Do NOT upgrade to Prisma 7 — the datasource `url` handling moved to `prisma.config.ts` / driver adapters and breaks this setup.
- Schema uses singleton rows (`id = 1`, `Json data`) for `SiteSettings`, `HomePageData`, `AboutPageData`, `ContactPageData`, `MonitoringTelemetry`, plus CRUD tables `ResearchBeat`, `TeamMember`, `Publication`, `Inquiry`, `ActivityLog`. MySQL `Json` fields are non-nullable — always store arrays/`{}` rather than `null` for JSON columns.
- `recordResearchView` is local-only (client state); activity logs are appended client-side and may be replaced on a later `/api/cms/state` refetch.

### Shared rules

- **No `@/` alias imports** — all imports are relative (`../types`, `./components/Header`)
- **No comments in code** — do not add comments to source files unless explicitly asked
- **NEVER create a `src/pages/` directory** — `pages/` is reserved by Next.js for the Pages Router. Page code lives in `src/app/` route files; there is no `src/views/`
- Both panels use **Instrument Serif** (headings) and **Plus Jakarta Sans** (body) fonts
- Site brand: `#0B2A20` dark green / `#D2F843` lime accent. CMS accent: `#6E56CF` purple / `#BEF024` lime
- The CMS shell is wrapped in `.cms-shell` (`src/app/(dashboard)/cms/layout.tsx`) which scopes its dark scrollbar styling
- TypeScript is NOT strict (`strict: false`, `strictNullChecks: false`) — intentional loose baseline
- Private folders (`_components`, `_…`) are never routed

## Common tasks

### Add a new research beat
Edit `src/data/initialData.ts` (add the beat to `INITIAL_CMS_STATE.researchBeats`) and run `npm run db:seed` to reload MySQL. Also add matching investigation data in `src/data/investigationsDetail.ts` (and `_BN` translation in `src/data/translations.ts`) for the public site detail page.

### Add a new team member
Add to `INITIAL_CMS_STATE.team[]` in `src/data/initialData.ts` and `TEAM_MEMBERS` in `src/data/team.ts`, then `npm run db:seed`. Each member needs: id, name, role, category, image, bio, email.

### Edit public site content
Content data lives in `src/data/*.ts`. Edit there, not in the page section components, then no DB change is needed (those remain static defaults).

## Testing & verification

After any code change, always run:

```bash
npm run lint     # TypeScript type-check (catches errors in BOTH panels)
npm run build    # Production build (catches import/build errors)
```

There is no automated test suite. Verify changes visually by running `npm run dev` and checking both panels:
- Public site: http://localhost:3000
- CMS dashboard: http://localhost:3000/cms (each section has its own route, e.g. /cms/research)