# patterns.md

## Repository Standards and Patterns

### 1. UI Styling & Theme System
- **Framework**: Tailwind CSS is used for utility class styling.
- **Theme Mode**: Defaults to `'light'`. Uses dynamic class `.light-mode` on the `body` tag and class `light`/`dark` on the `html` tag to switch between themes. The active theme is persisted in `localStorage` under the key `'theme'`.
- **Glassmorphism**: Custom utility classes like `.glass-premium` and `.glass-nav` (defined in `index.css`) handle dark/light transitions automatically. Custom light-mode overrides in `index.css` handle text contrast for Tailwind color classes (e.g. text-white, text-gray-400) automatically when inside `.light-mode`.

### 2. Service Detail Navigation
- **Routing**: Users navigate to `/solutions/:slug` which maps to `ServiceDetail.tsx`.
- **Database Fallback**: When fetching from `/api/v1/services/:slug` fails (e.g. offline API), `ServiceDetail.tsx` falls back to its local `MOCK_SERVICES` list.
- **Slug Mapping**: Ensure frontend card URLs match the database slugs exactly. The current mapping:
  - Website AI: `website-ai`
  - Studio AI: `studio-ai`
  - Agency Marketing: `agency-marketing`
  - Trợ lý AI: `tro-ly-ai`

### 3. Database Seeding
- **Backend Seeder**: The `seedServices` function in `backend/src/app.ts` executes on server start.
- **Upsert Seeding**: Instead of early-return if DB has entries, the seeder uses a loop to check and create missing items, or update existing items to populate them with default features and text descriptions.
- **Mongoose pre-save hook**: Watch out for `.pre('save')` hooks on models that modify slugs when the title is set or changed.

### 4. News Articles & Offline Fallback System
- **Offline Fallback**: Both `News.tsx` and `ArticleDetail.tsx` maintain independent `MOCK_ARTICLES` fallback arrays. These lists must remain in sync so that offline navigation from the news index (`/news`) to the detail views (`/news/:slug`) resolves successfully using the offline fallback cache.
- **Article Database Seeder**: Implemented the `seedArticles` function inside `backend/src/app.ts` utilizing an upsert check based on `slug` to safely synchronize core marketing articles on backend startup.
