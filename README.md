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
npm start
```

The application will open in your browser at:

```text
http://localhost:3000
```

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

The app currently fetches quotes from RapidAPI using the `famous-quotes4` endpoint in `src/App.js`.

If the API key expires or the service requires a different configuration, update the following values in `App.js`:

```js
headers: {
  'X-RapidAPI-Key': 'YOUR_API_KEY',
  'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com',
}
```

Important: use your own valid RapidAPI credentials to avoid disruption.

## User Experience

The application is intentionally simple and focused:

- Home page: quote display, category selection, and quote refresh controls
- Favorites page: a saved collection of quotes to revisit later
- Feedback states: loading screen while the app initializes and user-friendly fallbacks when a quote fails to load

## Notes

- Favorites are stored on the client side using the browser's `localStorage`.
- There is currently no backend or database layer.
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
