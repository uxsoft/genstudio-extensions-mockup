# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Package manager / runtime is **bun** (pinned in `mise.toml`).

- `bun install` — install dependencies
- `bun run dev` — Vite dev server at http://localhost:5173/
- `bun run build` — `tsc -b && vite build` (typecheck + production build; the type pass is the closest thing to a lint)
- `bun run preview` — serve the production build

There is **no test runner and no linter** configured.

Visual verification: there is no system Chrome, so the browser MCP tools fail. Use Brave headless instead, e.g.
`brave --headless=new --disable-gpu --hide-scrollbars --virtual-time-budget=4000 --window-size=1280,800 --screenshot=/tmp/out.png http://localhost:5173/`

## What this project is

High-fidelity **mockups** of two Adobe GenStudio "right panel add-on" extensions — **Compliance Assistant** and **Process Assistant**. It is *not* a real Adobe App Builder app (no SDK/host bridge/iframe); it locally simulates the GenStudio right sidepanel. Stack: Vite 8 + React 19 + TypeScript, **Spectrum 2** (`@react-spectrum/s2`), **Tailwind v4**.

`TODO.md` holds the product requirements for the extensions' (still-placeholder) content — read it before building out a panel.

## Architecture

**Registry-driven host.** `src/host/extensionRegistry.ts` is the single source of truth: an array of `ExtensionDef` (`{ id, label, description, Icon, Panel }`, see `src/host/types.ts`). Adding or refining an extension = edit the registry entry and its `Panel` component. Nothing else enumerates the extensions.

- `src/App.tsx` owns the light/dark `colorScheme` state and wraps everything in the Spectrum `<Provider>` (with `colorScheme` + full-height `styles`).
- `src/host/HostShell.tsx` composes the layout (neutral "canvas" + dark-mode `Switch` + active `SidePanel` + `RightRail`) and owns which add-on is selected.
- `RightRail` renders one quiet `ToggleButton` per registry entry; `SidePanel` renders the active entry's `Panel`.
- Extension UIs live in `src/extensions/<name>/<Name>Panel.tsx` and are currently placeholders.

## Spectrum 2 + Tailwind conventions (non-obvious)

- **Style macro:** styling uses `import { style } from '@react-spectrum/s2/style' with { type: 'macro' }`. This needs `unplugin-parcel-macros`, and `macros.vite()` **must be the first plugin** in `vite.config.ts` (before `react()`). It is a build-time transform: `style({...})` resolves to a class string only for **flat, static** objects. A nested object value is interpreted as conditional/runtime styles and makes `style()` return a *function* instead (a type error at the `className` site). Keep style objects flat — e.g. use `borderStartWidth` / `borderColor` / `borderStyle`, never a nested `border: { width, color }`.
- **Tailwind is imported without preflight** (`src/index.css` pulls only `tailwindcss/theme.css` + `tailwindcss/utilities.css` as layers) so its reset doesn't clobber Spectrum's cascade layers. Use Tailwind for layout only; all visible controls come from Spectrum components.
- **Icon tinting:** S2 icons take their color from the `--iconPrimary` CSS variable, not `color`/`currentColor`. Tint by setting it via `UNSAFE_style` (see `RightRail.tsx` + `MSD_GREEN` in `src/host/brand.ts`). The `IconComponent` type in `types.ts` is widened to allow `UNSAFE_style`.
- `ColorScheme` is defined locally in `src/host/types.ts` because `@react-spectrum/s2` does not re-export it.
- TS is configured with `verbatimModuleSyntax` + `allowImportingTsExtensions`, so **local imports include the explicit `.ts`/`.tsx` extension**.
