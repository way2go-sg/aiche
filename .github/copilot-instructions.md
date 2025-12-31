<!-- .github/copilot-instructions.md - guidance for AI coding agents -->
# Repository-specific Copilot instructions

Purpose: Help AI agents be productive in this React + TypeScript + Vite project by summarizing architecture, workflows, conventions, and concrete examples.

**Big Picture**:
- **App shell**: `src/App.tsx` implements a split-panel desktop layout and a standard router-based mobile layout. The app uses a panel model where panels expand to ~88% width on desktop and collapse to narrow bars that navigate on click.
- **Pages**: `src/pages/*` (e.g., `About.tsx`, `Events.tsx`, `Community.tsx`, `Menu.tsx`, `RetailMarket.tsx`) are thin containers that compose small pieces from `src/components`.
- **Components**: `src/components/*` hold presentational and small interactive pieces (examples: `aboutHeader.tsx`, `events.tsx`). Most components are default-exported React function components.

**Build / Dev / Lint** (explicit commands used by maintainers):
- Run dev server: `npm run dev` (starts Vite with HMR)
- Production build: `npm run build` (runs `tsc -b` then `vite build`)
- Lint: `npm run lint` (runs `eslint .`)
- Preview production build: `npm run preview` (Vite preview server)

**Important Files & Examples**:
- Routing & panels: `src/App.tsx` — maps `PANEL_ROUTES` and `ROUTE_PANELS`. When editing navigation or panel behavior, update both maps.
- Page composition: `src/pages/About.tsx` — uses `Header`, `Options`, `AboutEvents`, `Footer` in order; follow this pattern for new pages.
- Animation: components commonly use `framer-motion` (see `aboutHeader.tsx`) with `initial/animate/transition` props — keep animation props explicit and follow local timing/delay patterns.
- Styling: Tailwind CSS classes are used everywhere. Maintain class-based responsive breakpoints (`md:`, `lg:`) and utility-first patterns.

**Conventions & Patterns (do not change without cause)**:
- Default exports: components are exported with `export default Component` — continue this convention for consistency.
- Window navigation: several components call `window.location.href` or `window.open`. If refactoring to `react-router` navigation, be careful about server-side assumptions and preserve expected behavior on mobile vs desktop.
- Desktop vs Mobile modes: `AppContent` uses `window.innerWidth >= 1024` to toggle desktop layout. Adjustments to breakpoints should update the resize handler logic.
- Panel identifiers: `PANEL_ROUTES` keys (`home`, `one`, `two`, `three`) are used across code — avoid renaming keys without changing all references.

**Integration points & external deps**:
- Analytics: `@vercel/analytics` is imported in `src/App.tsx` — safe to keep as a top-level component.
- Plugins: Tailwind via `@tailwindcss/vite` in `vite.config.ts`. Vite allows `allowedHosts` customization (see `.trycloudflare.com` entry).
- Libraries to be mindful of: `framer-motion`, `gsap`, `ogl` — these are used for animations and visuals; changes may affect performance.

**Testing & CI**:
- There are no automated unit tests in the repo. The build step runs `tsc -b` before `vite build`; rely on TypeScript for shape-safety.

**Examples of concrete edits**:
- To add a new page:
  - Create `src/pages/NewPage.tsx` that composes `src/components/*` pieces.
  - Add route in `App.tsx` for mobile (`<Route path="/new" element={<NewPage/>}/>`) and update `PANEL_ROUTES` / `ROUTE_PANELS` if desktop panel behavior is desired.
- To change global styles: edit `src/index.css` and keep tailwind directives.

**AI-specific notes**:
- Prefer minimal, focused changes. This UI is animation-heavy; small CSS or timing tweaks can have outsized visual effects.
- Use file examples when suggesting code: reference `src/components/aboutHeader.tsx` for framer-motion usage and `src/components/events.tsx` for layout.
- Do not remove or rename panel keys or route maps without updating `App.tsx` mappings.
- When modifying navigation behavior, test both desktop and mobile flows because the app uses different render strategies per viewport width.

If anything here is unclear or you want more detail (examples of component props, animation timing conventions, or a checklist for adding a new page), tell me which area to expand.
