# WEC Pitwall

**Fan-made companion app for the FIA World Endurance Championship.**

Track races, standings, drivers, teams, and circuits across the 2024, 2025 and 2026 WEC seasons — all in one place.

🌐 **Live:** [wec-pitwall.vercel.app](https://wec-pitwall.vercel.app)

> Not affiliated with or endorsed by the FIA, ACO, or WEC. All data is manually curated. 

---

## Features

- **Race Countdown** — Live countdown to the next WEC round with full session schedule
- **Standings** — Hypercar, LMGT3 driver and team championship standings
- **Schedule** — Full season calendar for 2024, 2025 and 2026
- **Drivers** — Complete driver profiles and career stats
- **Teams** — Team entries, car numbers, and manufacturer info
- **Circuits** — Circuit details, lap records, and race history
- **Manufacturers** — Championship standings and 2026 hypercar grid
- **Season Timeline** — Round-by-round race winners and manufacturer dominance
- **Championship Battle** — Point progression charts across the season
- **Le Mans Hub** — Dedicated 24 Hours of Le Mans page
- **Favourites** — Save your favourite teams and drivers
- **Notifications** — Race weekend alerts
- **User Accounts** — Sign up with email, set a username and display name

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS + shadcn/ui |
| Auth & Database | Supabase |
| Deployment | Vercel |
| Fonts | Orbitron (numbers/times), Inter (UI) |

---

## Local Development

### Prerequisites

- Node.js 18+ and npm
- A Supabase project (free tier works)

### Setup

```sh
# 1. Clone the repo
git clone https://github.com/SpiffyNyanXD/wec-pitwall.git
cd wec-pitwall

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env
```

Fill in your `.env`:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

```sh
# 4. Start the dev server
npm run dev
```

Open [http://localhost:8080](http://localhost:8080).

### Build

```sh
npm run build
```

---

## Supabase Setup

The app uses three tables in Supabase:

| Table | Purpose |
|---|---|
| `profiles` | Username, display name, avatar per user |
| `favorite_teams` | User-saved favourite teams |
| `notification_subscriptions` | Race alert preferences |

RLS is enabled on all tables. Migrations are tracked in the repo. The `handle_new_user` trigger auto-creates a profile row on every new signup.

---

## Deployment

The project auto-deploys to Vercel on every push to `main`. No manual steps needed.

Environment variables required in Vercel project settings:

```
VITE_SUPABASE_URL
VITE_SUPABASE_PUBLISHABLE_KEY
```

---

## Project Structure

```
src/
├── components/       # Reusable UI components and widgets
│   ├── ui/           # shadcn/ui base components
│   └── widgets/      # Dashboard widgets (countdown, standings, etc.)
├── contexts/         # React context (AuthContext)
├── data/             # Static WEC data (wecData.ts — races, drivers, teams)
├── hooks/            # Custom hooks (useTimezone, useTimeFormat, etc.)
├── integrations/     # Supabase client
└── pages/            # Route-level page components
```

---

## Contributing

This is a personal fan project. Issues and suggestions welcome via GitHub Issues.

If you find data errors (wrong race results, points, driver info), please open an issue with a source link.

---

## Disclaimer

WEC Pitwall is an independent fan project. It is not affiliated with, endorsed by, or connected to the FIA, ACO, WEC, or any team or manufacturer featured. All championship data is manually curated and may not be 100% accurate. For official results, visit [fiawec.com](https://www.fiawec.com).
