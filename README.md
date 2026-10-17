# Motiv8

Motiv8 is a lightweight React application that delivers inspirational and motivational quotes in a clean, user-friendly interface. Users can browse quotes by category, generate a new random quote, save favorites, and share quotes across social channels.

## Overview

This project is designed to provide a simple, fast, and enjoyable quote-discovery experience. It uses a public quote API and a client-side favorites system powered by browser `localStorage`, which keeps saved quotes available on the same device without requiring a backend.

## Features

- Random motivational quote generation
- Category-based filtering across a wide range of topics
- Favorites system with persistent browser storage
- Delete individual saved quotes
- Social sharing via Facebook, WhatsApp, and email
- Responsive layout for desktop and mobile viewing
- Loading screen for a polished first-load experience

## Tech Stack

- React
- Create React App
- React Router DOM
- FontAwesome / React Icons
- RapidAPI quote service
- Local browser storage (`localStorage`)

## Project Structure

```text
motiv8-random-quotes/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   ├── mylogo.jpg
│   └── robots.txt
├── src/
│   ├── App.css
│   ├── App.js
│   ├── Favorites.js
│   ├── LoadingScreen.css
│   ├── LoadingScreen.js
│   ├── index.js
│   ├── logo.svg
│   ├── reportWebVitals.js
│   └── setupTests.js
├── build/
│   └── ... generated production output
├── package.json
├── README.md
└── .gitignore
```

## How It Works

The main application logic is in `src/App.js`:

- It initializes the app and fetches a quote from the RapidAPI endpoint.
- A category dropdown lets users filter quotes by topic.
- The app stores favorite quotes in `localStorage`.
- The `Favorites` view displays saved quotes and lets users remove them.
- Social share buttons encode the selected quote and author into share URLs.

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm

### Installation

```bash
npm install
```

### Run the app locally

```bash
npx vercel dev
```

Link the project to Vercel and pull its Development environment variables before running the command:

```bash
npx vercel link
npx vercel env pull .env.local
```

The local app URL is printed by the Vercel CLI. `npm start` starts only the React development server and does not run the `/api/quote` serverless function.

### Production build

```bash
npm run build
```

This creates a production-ready bundle in the `build/` directory.

### Run tests

```bash
npm test
```

## API Configuration

The browser requests quotes from the Vercel serverless function at `/api/quote`. The function reads the RapidAPI credentials on the server and forwards the request to `famous-quotes4`, so the credentials are not included in the React bundle.

In the Vercel project settings, add these environment variables for each deployment environment you use:

```dotenv
X_RAPIDAPI_KEY=your_rapidapi_key
X_RAPIDAPI_HOST=famous-quotes4.p.rapidapi.com
```

For local development, link the project and run `npx vercel env pull .env.local` to retrieve the Development variables. Restart `vercel dev` after changing environment variables. Keep `.env.local` out of version control and do not add the `REACT_APP_` prefix: the credentials are used by the serverless function, not by the browser.

## User Experience

The application is intentionally simple and focused:

- Home page: quote display, category selection, and quote refresh controls
- Favorites page: a saved collection of quotes to revisit later
- Feedback states: loading screen while the app initializes and user-friendly fallbacks when a quote fails to load

## Notes

- Favorites are stored on the client side using the browser's `localStorage`.
- Quote requests are proxied through a Vercel serverless function; the app does not currently have a database or user account system.
- The app is built as a front-end demonstration and can be extended with authentication, cloud storage, or a custom quote database.

## License

This project does not currently specify a license. If you plan to publish or distribute it publicly, add an appropriate open-source license before release.

## Contributing

Contributions are welcome. If you would like to improve the app, consider adding features such as:

- quote search by keyword
- dark mode
- user accounts and cloud-backed favorites
- quote categories with improved UX
- expanded social sharing options
- improved error handling and API fallback logic

## Project Status

This is a functional portfolio-style React app for generating and saving motivational quotes. It is suitable as a learning project, prototype, or simple daily inspiration tool.
