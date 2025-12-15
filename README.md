# Rick & Morty Characters Explorer

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app), featuring a searchable, paginated list of Rick & Morty characters. It uses Apollo Client for GraphQL data fetching and Heroui for UI components.

## Features

- Search characters by name with debounce
- Paginated character list
- Click a character to open a detailed drawer with:
  - Image
  - Species
  - Status
  - Gender
  - Episode count
- Responsive layout with Tailwind CSS
- Fully tested with [Playwright](https://playwright.dev) for E2E coverage
- Deterministic tests using `data-testid` attributes

## Getting Started

First, install dependencies and run the development server:

```bash
npm install
npm run dev
# or
yarn
yarn dev
# or
pnpm install
pnpm dev
# or
bun install
bun dev
```

Open http://localhost:3000
 in your browser to see the app.

You can start editing the page by modifying app/page.tsx. Changes are hot-reloaded automatically.

## Testing
Playwright is configured as a dev dependency (`@playwright/test`). To run tests:
```
npm run build
npx playwright test
```
Tests expect the app to be available at `http://localhost:3000` and interact with the characters table and modal drawer.