# FourFour Weather App

A weather web app built with React and TypeScript, powered by Cloudflare Workers.
(Test assignment app for Senior TS Developer at Manta).
Bootstrapped using [create-cloudflare](https://www.npmjs.com/package/create-cloudflare).

## Features

- Search cities to check the weather.
- See weather details for the selected city.
- See a 5-day weather forecast for the selected city.
- See persisted recent searches
- Clear recent searches.
- Remove a single recent search item.
- Switch temperature units.
- Show background based on weather and time conditions.
- Show a simple gradient based on the weather.

## Technologies used

- React 19
- TypeScript
- Vite
- Cloudflare Workers + Wrangler
- TanStack Query
- Tailwind CSS v4
- Vitest + Testing Library
- Playwright (E2E)

## Prerequisites

- Node.js 20+ (recommended)
- npm

## How to start the project

1. Install dependencies:

```bash
npm install
```

2. Create your local variables file from the example:

```bash
cp .dev.vars.example .dev.vars
```

3. Open `.dev.vars` and set your keys:

```env
OPENWEATHER_API_KEY=your_openweather_api_key
# Optional:
# UNSPLASH_ACCESS_KEY=your_unsplash_access_key
```

## Custom keys setup

- `OPENWEATHER_API_KEY` is required for weather data.
- `UNSPLASH_ACCESS_KEY` is optional and used for city background images.
- Do not commit `.dev.vars` (it is gitignored).

## How to run the app

### Development

```bash
npm run dev
```

Open `http://localhost:5173`.

### Production preview locally

```bash
npm run preview
```

## How to run tests

### Unit/integration tests (Vitest)

- Watch mode:

```bash
npm test
```

- Single run:

```bash
npm run test:run
```

### End-to-end tests (Playwright)

```bash
npm run test:e2e
```

### End-to-end tests UI mode

```bash
npm run test:e2e:ui
```

## Helpful scripts

- `npm run build` - Type-check + production build
- `npm run lint` - Lint codebase
- `npm run lint:fix` - Auto-fix lint issues
- `npm run format` - Format with Prettier

## Notes for code reviewers

- Start from `src/features/weather/views/weather.tsx` to see the main user flow.
- API handlers live in `worker/handlers` and are wired in `worker/index.ts`.
- Query hooks are under `src/features/weather/lib/hooks`.
- Run `npm run lint`, `npm run test:run`, and `npm run test:e2e` for a quick quality check.
- If weather data is missing when running locally, verify `OPENWEATHER_API_KEY` in `.dev.vars`.

### Live App

https://fourfour-weather-app.gentrithalili11.workers.dev/
