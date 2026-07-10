# Portfolio Architecture Overview — Onboarding Report

## 1. Build Setup & Infrastructure

| Aspect | Detail |
|---|---|
| **Framework** | React 19 + Vite 7 (SPA, no SSR) |
| **Language** | TypeScript 5.6 (strict mode) |
| **Styling** | Tailwind CSS v4 + `tw-animate-css` + `tailwindcss-animate` |
| **UI Component Library** | shadcn/ui (New York style, CSS variables, `@radix-ui/*`) |
| **Routing** | `wouter` v3 (client-side, patched via `patches/wouter@3.7.1.patch`) |
| **Package Manager** | pnpm 10 |
| **Deployment** | Vercel (static SPA with catch-all rewrite to `/index.html`) |
| **Analytics** | Umami (consent-gated, lazy-loaded script injection) |
| **PDF Viewer** | `pdfjs-dist` + custom `PdfFlipbookModal` (react-pageflip) |
| **Animations** | Framer Motion (`framer-motion` v12) |
| **i18n** | Custom `useSyncExternalStore`-based system (EN/NL) |
| **Theme** | Custom `ThemeContext` (light/dark/system, localStorage-persisted) |

---

## 2. Directory Layout

> [!IMPORTANT]
> The project root is `omar-portfolio/client/public/`. All paths below are relative to this root.

```
omar-portfolio/client/public/
├── client/
│   ├── public/                    # Static assets served at /
│   │   └── images/                # Project media (galleries, logos, thumbnails)
│   │       ├── theraneck-gallery/
│   │       ├── moes-tuinen gallery/
│   │       ├── amstelhof-connect gallery/
│   │       ├── patronapp gallery/
│   │       ├── pphe-hotel-group gallery/
│   │       ├── hallencity gallery/
│   │       ├── burningman gallery/
│   │       ├── jacobdrescher gallery/
│   │       ├── beex gallery/
│   │       └── pro-detailing gallery/
│   └── src/
│       ├── App.tsx                # Route definitions & provider tree
│       ├── main.tsx               # React 19 createRoot entry
│       ├── const.ts               # Re-exports shared constants
│       ├── index.css              # Tailwind + theme tokens + custom components
│       ├── components/
│       │   ├── Layout.tsx         # Shell: Navigation + main + Footer
│       │   ├── Navigation.tsx     # Top navbar
│       │   ├── Footer.tsx
│       │   ├── ProjectCard.tsx    # Portfolio grid card component
│       │   ├── ProjectGallery.tsx # Media gallery (video/image/PDF)
│       │   ├── DeviceMockup.tsx   # iPhone/iPad/Desktop prototype viewer
│       │   ├── PdfFlipbookModal.tsx
│       │   ├── ErrorBoundary.tsx
│       │   ├── Map.tsx
│       │   ├── ManusDialog.tsx
│       │   └── ui/               # 40+ shadcn/ui primitives
│       ├── contexts/
│       │   ├── ThemeContext.tsx    # Light/Dark mode
│       │   └── CookieConsentContext.tsx
│       ├── hooks/
│       │   ├── useComposition.ts
│       │   ├── useMobile.tsx
│       │   └── usePersistFn.ts
│       ├── lib/
│       │   ├── analytics.ts       # Umami integration
│       │   ├── cookie-consent.ts
│       │   ├── i18n.ts            # Language store
│       │   └── utils.ts           # cn() helper
│       ├── locales/
│       │   ├── types.ts           # LocaleMessages interface
│       │   ├── en.ts              # English translations
│       │   └── nl.ts              # Dutch translations
│       └── pages/
│           ├── Home.tsx           # Hero + featured projects
│           ├── About.tsx
│           ├── Portfolio.tsx      # Grid listing with filters
│           ├── ProjectDetail.tsx  # Case study view (⚠️ MONOLITH — 1310 lines)
│           ├── Skills.tsx
│           ├── Contact.tsx
│           ├── CookiePolicy.tsx
│           └── NotFound.tsx
├── server/
│   └── index.ts                   # Express server (production only)
├── shared/
│   └── const.ts                   # Shared constants
├── patches/
│   └── wouter@3.7.1.patch
├── scripts/
│   └── generate-video-posters.mjs
├── package.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.node.json
├── vercel.json
├── components.json                # shadcn/ui config
└── .env.production
```

---

## 3. Routing Architecture

| Route | Component | Purpose |
|---|---|---|
| `/` | `Home` | Landing page with hero + 3 featured projects |
| `/about` | `About` | Bio, education, experience |
| `/portfolio` | `Portfolio` | Full project grid with category filters |
| `/portfolio/:id` | `ProjectDetail` | Individual case study page |
| `/skills` | `Skills` | Core competencies |
| `/contact` | `Contact` | Contact form |
| `/cookie-policy` | `CookiePolicy` | Legal |
| `*` | `NotFound` | 404 fallback |

**Provider tree** (wrapping order):
```
ErrorBoundary → ThemeProvider → CookieConsentProvider → TooltipProvider → Toaster + AnalyticsRouteTracker + Router
```

---

## 4. Project Data Schema

> [!IMPORTANT]
> **All project data is stored inline** in [ProjectDetail.tsx](file:///c:/Users/oabd3/OneDrive/Desktop/VibeCoding-Projects/My%20Portfolio/omar-portfolio/client/public/client/src/pages/ProjectDetail.tsx#L17-L558) as a `Record<string, any>` named `projectsData`. There is no separate data file, JSON, or API.

### 4a. Project Detail Data Schema (per `projectsData[id]`)

| Field | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | ✅ | Project name |
| `subtitle` | `string` | ✅ | Tagline / secondary title |
| `year` | `string` | ✅ | Year(s) of work |
| `client` | `string` | ✅ | Client name |
| `clientLogo` | `string` | ✅ | Light-mode logo path |
| `clientLogoDark` | `string` | ❌ | Dark-mode logo path |
| `clientLogoClass` | `string` | ❌ | Custom Tailwind classes for logo sizing |
| `clientLogos` | `Array<{src, href?, alt}>` | ❌ | Multiple logos (PPHE uses this) |
| `clientWebsite` | `string` | ❌ | External URL |
| `role` | `string` | ✅ | Your role description |
| `description` | `string` | ✅ | Overview text (supports `**bold**` markdown) |
| `challenge` | `string` | ✅ | The Challenge (supports `**bold**`, bullet lists) |
| `solution` | `string` | ✅ | The Solution (supports `**bold**`, bullet lists) |
| `impact` | `string` | ✅ | Impact & Results (supports `**bold**`, bullet lists) |
| `tags` | `string[]` | ✅ | Category badges shown in hero |
| `tools` | `string[]` | ✅ | Tools displayed in sidebar |
| `image` | `string` | ✅ | Hero banner / thumbnail image |
| `gallery` | `ProjectGalleryMedia[]` | ✅ | Gallery items (see below) |
| `solutionSections` | `Array<{title, body}>` | ❌ | Extended solution breakdown (only TheraNeck uses this) |
| `solutionAsideImage` | `string` | ❌ | Image beside solution card |
| `primaryActionLabel` | `string` | ❌ | CTA button text |
| `primaryActionHref` | `string` | ❌ | CTA button URL or PDF path |
| `primaryActionDownload` | `boolean` | ❌ | If true, triggers download |
| `demoVideoSrc` | `string` | ❌ | Secondary CTA (video/PDF) |
| `demoVideoPoster` | `string` | ❌ | Poster image for demo video |
| `demoVideoLabel` | `string` | ❌ | Label for demo button |
| `overviewLinkHref` | `string` | ❌ | External link below overview |
| `overviewLinkLabel` | `string` | ❌ | Label for overview link |
| `deviceMockup` | `DeviceMockupConfig` | ❌ | Prototype viewer config |

### 4b. Gallery Item Schema (`ProjectGalleryMedia`)

```typescript
type ProjectGalleryMedia =
  | string                    // Just a src URL (type inferred from extension)
  | {
      type?: "image" | "video" | "document";
      src: string;
      alt?: string;
      poster?: string;       // For video thumbnails
      title?: string;
    };
```

### 4c. Device Mockup Schema

```typescript
{
  type: "ipad" | "iphone" | "desktop";
  orientation: "portrait" | "landscape";
  mode: "static" | "interactive";
  images?: string[];            // For static slideshow
  iframeSrc?: string;           // For interactive prototypes
  iframeTitle?: string;
  showArrows?: boolean;
  deferIframeUntilPlay?: boolean;
  backClosesPrototype?: boolean;
  allowFullscreen?: boolean;
}
```

### 4d. Portfolio Card Data Schema (in `Portfolio.tsx`)

| Field | Type | Required | Description |
|---|---|---|---|
| `id` | `string` | ✅ | Route slug (must match `projectsData` key) |
| `title` | `string` | ✅ | Card title |
| `categoryValue` | `string` | ✅ | Filter category slug |
| `category` | `string` | ✅ | Human-readable category label (localized) |
| `image` | `string` | ✅ | Card thumbnail |
| `imageClassName` | `string` | ❌ | Custom image positioning |
| `description` | `string` | ✅ | Card description (localized) |
| `tags` | `string[]` | ✅ | Card tags (localized) |
| `tagValues` | `string[]` | ✅ | Machine-readable tag slugs for filtering |

---

## 5. Localization (i18n) System

> [!WARNING]
> **Every new project requires matching localization entries** in three places:
> 1. `locales/types.ts` — TypeScript interface (`projectDetails.{camelCaseId}`)
> 2. `locales/en.ts` — English strings
> 3. `locales/nl.ts` — Dutch strings
> 4. `ProjectDetail.tsx` — Localization mapping block (ternary chain at ~line 669–947)

The localization system:
- Uses `useSyncExternalStore` (not React context) for reactivity
- Stores preference in `localStorage` as `portfolio_language`
- Defaults to English
- Each project has a dedicated block in the `localizedProject` ternary chain
- Gallery titles are individually mapped via `translatedTitles` records

---

## 6. Styling & Theme Assessment

### Color System (OKLCH-based)
- **Primary**: `oklch(0.58 0.19 264)` — Saturated blue (`#4B78D8`)
- **Dark background**: `oklch(0.12 0.01 260)` — Near-black with blue tint
- **Dark card**: `oklch(0.18 0.02 260)` — Charcoal
- **Light/dark mode**: Controlled via `.dark` CSS class + `ThemeContext`

### Typography
- **Body**: "Plus Jakarta Sans" (sans-serif)
- **Headings**: "Outfit" (sans-serif)
- Both loaded via CSS `--font-sans` / `--font-heading` tokens

### Layout System
- **Container**: Custom `.container` class (max-width: 1280px, `clamp(1rem, 2.5vw, 2rem)` padding)
- **Grid**: Responsive grid patterns (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`)
- **Layout shell**: Fixed nav (64px mobile / 80px desktop) → main with padding-top → footer

### Key Visual Patterns
- **Glassmorphism**: `bg-card/50`, `bg-background/70 backdrop-blur-md`
- **Subtle borders**: `border-white/10`, `border-white/5`
- **Hover effects**: `-translate-y-2`, `scale-105`, `shadow-[0_0_30px_-10px_...]`
- **Gradient overlays**: `bg-gradient-to-t from-background/80 to-transparent`

---

## 7. Fragile Zones — DO NOT ALTER

> [!CAUTION]
> The following areas are architecturally sensitive. Any modification risks cascading visual or functional breakage.

### 7a. ProjectDetail.tsx Monolith (1310 lines)
- **Data + rendering in one file**. The `projectsData` object (lines 17–558), the localization ternary chain (lines 669–947), and the rendering JSX (lines 949–1309) are all in the same file.
- The **localization ternary chain** is a long `condition ? {...} : condition ? {...} : project` expression. Each new project must be appended to this chain with a `boolean` flag and matching locale block.
- The **`hasLocalizedProjectCopy`** boolean (line 640–650) is an OR of all project-specific booleans — new projects must be added here.

### 7b. Markdown Rendering Helpers
- `renderRichText()` and `renderInlineWithBold()` (lines 560–611) are custom parsers that handle `**bold**` and `- bullet` syntax in project descriptions. They are fragile — changes can break all project text rendering.

### 7c. ProjectGallery Media Pipeline
- Auto-poster discovery: tries `{videoName}-poster.(webp|jpg|jpeg|png)`
- PDF thumbnail: uses pdfjs-dist to render first page to canvas
- Video thumbnail: captures frame at `duration/4` via hidden video element
- All three pipelines run async with cancellation tokens — state logic is tightly coupled.

### 7d. DeviceMockup State Machine
- Complex `mode` switching (`static` ↔ `interactive`), deferred iframe loading, fullscreen toggling, and browser-back interception.
- 725-line component with many coupled states.

### 7e. Theme System
- CSS variables in `:root` / `.dark` blocks in `index.css`
- `dark:` variant usage throughout all components
- `clientLogo` / `clientLogoDark` pattern with `dark:hidden` / `hidden dark:block` swap

### 7f. Gallery Section Labels
- The `sectionLabels` prop threads through to `ProjectGallery` for localized "Videos" / "Images" / "Documents" headings.

### 7g. Analytics Tracking
- `trackEvent()` calls are embedded throughout `ProjectDetail.tsx`, `ProjectCard.tsx`, and sidebar CTAs. New projects automatically benefit from the existing `project_view` tracking.

---

## 8. Existing Projects (10 total)

| # | Slug / Route ID | Title |
|---|---|---|
| 1 | `theraneck-ecommerce` | TheraNeck E-commerce |
| 2 | `moes-tuinen` | MOES Tuinen |
| 3 | `amstelhof-connect` | Amstelhof Connect |
| 4 | `patronapp` | PatronApp |
| 5 | `hallencity` | HallenCity+ |
| 6 | `pro-detailing` | Pro Detailing |
| 7 | `pphe-hotel` | PPHE Hotel Group |
| 8 | `burning-man-campaign` | Burning Man Campaign |
| 9 | `streaming-emotions-value-plan` | Jacob Drescher Value Plan |
| 10 | `beex-export-strategy` | BEEX Export Strategy |

---

## 9. Injection Checklist — Adding a New Project

To cleanly add "Job Scout" and "Moonlit Firefly Bloom", each project requires changes in **exactly 6 locations**:

### Step-by-step per new project:

| # | File | Action |
|---|---|---|
| 1 | `ProjectDetail.tsx` → `projectsData` | Add data object with all required fields |
| 2 | `ProjectDetail.tsx` → boolean flags | Add `const isNewProject = projectId === "slug"` |
| 3 | `ProjectDetail.tsx` → `hasLocalizedProjectCopy` | Add boolean to OR chain |
| 4 | `ProjectDetail.tsx` → localization ternary | Add ternary branch with locale mapping |
| 5 | `Portfolio.tsx` → `projects` array | Add card data entry |
| 6 | `Portfolio.tsx` → `categories` array | Add filter category if new |
| 7 | `locales/types.ts` | Add TypeScript interface for new project |
| 8 | `locales/en.ts` | Add English translation strings |
| 9 | `locales/nl.ts` | Add Dutch translation strings |
| 10 | `client/public/images/{slug} gallery/` | Add all media assets |
| 11 | *(Optional)* `Home.tsx` → `featuredProjects` | Add to homepage if featured |

---

## 10. Readiness Confirmation

✅ **I am fully onboarded and ready** to inject "Job Scout" and "Moonlit Firefly Bloom" into the portfolio using the exact schema, file structure, localization pattern, and design patterns established by the existing 10 projects.

I will:
- Duplicate the precise `projectsData` field structure
- Follow the `clientLogo` / `clientLogoDark` pattern for theme support
- Add localization entries in all three locale files + the ternary chain
- Place gallery assets in `client/public/images/{slug} gallery/`
- Add portfolio card entries with proper `categoryValue`, `tagValues`, and localized tags
- Preserve all existing rendering logic, markdown syntax conventions, and visual patterns unchanged
