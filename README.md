# Stepovers

A Premier League entertainment factor calculator that helps fans find the most watchable matches of the week.

## Overview

Stepovers ranks Premier League fixtures by a custom entertainment score, then gives signed-in users a personalized weekly dashboard based on their favorite team.

I built this to turn match data into a product experience instead of a static stats page. The app combines a public gameweek view, user onboarding, authenticated dashboard routes, database-backed preferences, and score calculation logic.

## Live App

[stepovers.vercel.app](https://stepovers.vercel.app/)

## Features

- Public Premier League gameweek schedule
- Entertainment score calculation for each matchup
- Featured match of the week
- Clerk authentication
- Onboarding flow for favorite team and fan style
- Personalized dashboard with favorite-team verdicts
- PostgreSQL-backed user preferences and team data
- Football-Data API integration with cached schedule fetches
- Responsive UI built around a sports-media visual style

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Clerk
- Drizzle ORM
- PostgreSQL
- Football-Data API
- Vercel

## Project Structure

```txt
src/app                 App Router pages and layouts
src/app/dashboard       Personalized match dashboard
src/app/onboarding      User onboarding flow
src/app/_components     Shared app UI
src/server/db           Drizzle schema, queries, and mutations
src/server/football-data-api  Premier League API and scoring helpers
src/server/auth         Auth and onboarding guards
```

## What This Project Shows

- Product thinking around a real fan problem: deciding which matches are worth watching
- API integration, caching, and transformation of third-party sports data
- Authenticated user flows with protected routes
- Database-backed onboarding and user preferences
- Score calculation logic that turns raw fixtures into ranked recommendations
- Responsive frontend execution with a distinct visual direction

## Running Locally

Install dependencies:

```bash
npm install
```

Create an environment file:

```bash
cp .env.example .env
```

Fill in the required environment variables in `.env`, then run the development server:

```bash
npm run dev
```

Run checks before committing:

```bash
npm run typecheck
npm run build
```

## Environment Variables

See [.env.example](./.env.example) for the required variables.

## Future Improvements

- Expand the entertainment model beyond static team scores
- Add historical results, form, rivalry, and table-position signals
- Improve dashboard explanations for why a match receives its score
- Add automated tests around scoring and onboarding logic
