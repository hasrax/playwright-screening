# Playwright Screening Task

End-to-end tests for the Playwright documentation site (playwright.dev) and the TodoMVC demo app (demo.playwright.dev/todomvc), written with Playwright Test and TypeScript.

## Prerequisites

- Node.js 18 or later
- npm

## Install

```
npm install
npx playwright install chromium
```

## Run the tests

```
npx playwright test
```

Open the HTML report after a run:

```
npx playwright show-report
```

Run with the interactive UI mode (useful for debugging):

```
npx playwright test --ui
```

## Project structure

```
pages/todo-page.ts        Page Object for the TodoMVC app
tests/docs.spec.ts        4 tests for playwright.dev
tests/todo.spec.ts        6 tests for the TodoMVC app
playwright.config.ts      Playwright configuration
```
## Bonus items

**Data-driven test**
The TodoMVC spec loops over an array of todo sets (one, three and five todos). For each set it adds the items, then checks both the item count and the item text. Adding a new case only needs a new entry in the array.

**GitHub Actions workflow**
`.github/workflows/playwright.yml` runs the tests on every push to `main` and `feature/**` branches, and on pull requests into `main`. It installs dependencies with `npm ci`, installs Chromium, runs the tests, and uploads the HTML report as an artifact (kept for 14 days).
