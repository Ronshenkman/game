# 🎵 Hitster Game

A Hitster-style music timeline party game. Players hear a song preview (scanned via a QR code on their phone) and place it on their team's timeline by guessing its release year. Closest correct placements win.

Track previews are fetched from **Deezer** — no API key required.

## Features

- 4 curated song decks:
  - **Deck 1** — well-known hits across all decades (577 songs)
  - **Deck 2** — soul, Motown & more (364 songs)
  - **Rock Deck** — classic → modern rock (641 songs)
  - **Hebrew Deck** — Israeli / Hebrew songs, 1967→2023 (102 songs)
- Per-team timelines and scoring
- QR codes so each player plays the preview on their own phone
- Played-song memory persisted per deck in the browser (survives restarts)

## Requirements

- [Node.js](https://nodejs.org/) 18+

## Setup

```bash
git clone <your-repo-url>
cd hitster-game
npm install
cp .env.example .env   # then edit .env if you want to change PORT / HOST_URL
```

> The app uses Deezer for previews, which needs no key. The `SPOTIFY_*`
> variables in `.env.example` are optional legacy fields and can be left blank.

## Run

```bash
npm start        # production
npm run dev      # auto-reload with nodemon
```

Then open **http://localhost:3000**. QR codes use your machine's LAN IP, so
players' phones must be on the same Wi-Fi.

## How to play

1. Add teams on the setup screen.
2. Choose a song deck.
3. Start the game — a QR code appears. A player scans it and plays the preview.
4. The team places the song on their timeline by guessed year. Reveal to score.

## Project structure

| File | Purpose |
|------|---------|
| `server.js` | Express server, Deezer lookup, deck shuffling & serving |
| `songs.js` … `songs4.js` | The four decks (`{ title, artist, year }` arrays) |
| `public/index.html` | Game UI (setup, deck picker, timeline, scoring) |
| `public/play.html` | Phone page that plays the track preview |

### Adding a song

Append `{ title, artist, year }` to the relevant `songs*.js` array. Titles/artists
are matched against Deezer by name — use the spelling most likely to match the
catalog (Hebrew script for the Hebrew deck).
