require('dotenv').config();
const express = require('express');
const QRCode  = require('qrcode');
const axios   = require('axios');
const os      = require('os');
const SONGS   = require('./songs');
const SONGS2  = require('./songs2');
const SONGS3  = require('./songs3');
const SONGS4  = require('./songs4');

const app  = express();
const PORT = process.env.PORT || 3000;

function getLocalIP() {
  for (const ifaces of Object.values(os.networkInterfaces())) {
    for (const i of ifaces) {
      if (i.family === 'IPv4' && !i.internal) return i.address;
    }
  }
  return 'localhost';
}

// ── Deezer track lookup (no API key needed) ───────────────────────────────────

const trackCache = new Map(); // "title||artist" -> track object
const songIdMap  = new Map(); // "title||artist" -> deezer track id

async function findTrack(song) {
  const cacheKey = `${song.title}||${song.artist}`;
  if (trackCache.has(cacheKey)) return trackCache.get(cacheKey);

  // Try two query styles to maximise hit rate
  const queries = [
    `track:"${song.title}" artist:"${song.artist}"`,
    `${song.title} ${song.artist}`,
  ];

  let picked = null;
  for (const q of queries) {
    try {
      const url = `https://api.deezer.com/search?q=${encodeURIComponent(q)}&limit=10`;
      const { data } = await axios.get(url);
      const results = data.data || [];
      picked = results.find(t => t.preview) || results[0] || null;
      if (picked?.preview) break; // found one with preview, done
    } catch (e) {
      console.warn('Deezer query failed:', e.message);
    }
  }

  if (!picked) return null;

  // Always use the year from our curated list — Deezer often returns remaster/compilation dates
  const year = song.year;

  const result = {
    id:         String(picked.id),
    previewUrl: picked.preview || null,
    title:      picked.title,
    artist:     picked.artist?.name || song.artist,
    albumArt:   picked.album?.cover_xl || picked.album?.cover_big || null,
    year,
  };

  trackCache.set(cacheKey, result);
  songIdMap.set(cacheKey, result.id);
  return result;
}

// ── Shuffle deck ─────────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let deck1      = shuffle(SONGS);  // pre-shuffled deck 1
let deckIndex1 = 0;               // next song to serve from deck 1
let deck2      = shuffle(SONGS2); // pre-shuffled deck 2
let deckIndex2 = 0;               // next song to serve from deck 2
let deck3      = shuffle(SONGS3); // pre-shuffled deck 3
let deckIndex3 = 0;               // next song to serve from deck 3
let deck4      = shuffle(SONGS4); // pre-shuffled deck 4 (Hebrew)
let deckIndex4 = 0;               // next song to serve from deck 4

function nextFromDeck(excludeIds, deckNum) {
  const dn = String(deckNum);
  const source = dn === '4' ? SONGS4 : dn === '3' ? SONGS3 : dn === '2' ? SONGS2 : SONGS;
  let   deck   = dn === '4' ? deck4  : dn === '3' ? deck3  : dn === '2' ? deck2  : deck1;
  let   idx    = dn === '4' ? deckIndex4 : dn === '3' ? deckIndex3 : dn === '2' ? deckIndex2 : deckIndex1;

  const writeBack = () => {
    if (dn === '4')      { deck4 = deck; deckIndex4 = idx; }
    else if (dn === '3') { deck3 = deck; deckIndex3 = idx; }
    else if (dn === '2') { deck2 = deck; deckIndex2 = idx; }
    else                 { deck1 = deck; deckIndex1 = idx; }
  };

  // Walk the deck from current index; wrap around once if needed
  for (let pass = 0; pass < 2; pass++) {
    while (idx < deck.length) {
      const candidate = deck[idx++];
      const id = songIdMap.get(`${candidate.title}||${candidate.artist}`);
      if (!id || !excludeIds.has(id)) {
        writeBack();
        return candidate;
      }
    }
    // Exhausted — reshuffle and try again
    deck = shuffle(source);
    idx  = 0;
  }
  // Fallback (shouldn't happen)
  writeBack();
  return deck[0];
}

// ── Routes ────────────────────────────────────────────────────────────────────

app.use(express.static('public'));

app.post('/api/reset-deck', (req, res) => {
  const deckNum = req.query.deck;
  if (!deckNum || deckNum === '1') {
    deck1      = shuffle(SONGS);
    deckIndex1 = 0;
    console.log('🔀 Deck 1 reshuffled');
  }
  if (!deckNum || deckNum === '2') {
    deck2      = shuffle(SONGS2);
    deckIndex2 = 0;
    console.log('🔀 Deck 2 reshuffled');
  }
  if (!deckNum || deckNum === '3') {
    deck3      = shuffle(SONGS3);
    deckIndex3 = 0;
    console.log('🔀 Deck 3 reshuffled');
  }
  if (!deckNum || deckNum === '4') {
    deck4      = shuffle(SONGS4);
    deckIndex4 = 0;
    console.log('🔀 Deck 4 reshuffled');
  }
  const total = deckNum === '4' ? deck4.length
              : deckNum === '3' ? deck3.length
              : deckNum === '2' ? deck2.length
              : deck1.length;
  res.json({ ok: true, deck: deckNum || 'both', total });
});

app.get('/play', (req, res) => {
  res.sendFile('play.html', { root: __dirname + '/public' });
});

app.get('/api/song', async (req, res) => {
  const HOST       = process.env.HOST_URL || `http://${getLocalIP()}:${PORT}`;
  const excludeIds = new Set(req.query.exclude ? req.query.exclude.split(',') : []);
  const deckNum    = req.query.deck || '1';

  // Try up to 5 consecutive deck positions to find a Deezer-available song
  let track = null;
  for (let attempt = 0; attempt < 5; attempt++) {
    const candidate = nextFromDeck(excludeIds, deckNum);
    track = await findTrack(candidate).catch(() => null);
    if (track) break;
    console.warn(`Not found on Deezer, skipping… (${candidate.title})`);
  }

  try {
    if (!track) return res.status(404).json({ error: 'Could not find any available track. Try again.' });

    const playUrl   = `${HOST}/play?id=${track.id}`;
    const qrDataUrl = await QRCode.toDataURL(playUrl, {
      width: 400, margin: 2, errorCorrectionLevel: 'M',
      color: { dark: '#000000', light: '#ffffff' },
    });

    res.json({
      qrCode:     qrDataUrl,
      trackId:    track.id,
      title:      track.title,
      artist:     track.artist,
      year:       track.year,
      albumArt:   track.albumArt,
      hasPreview: !!track.previewUrl,
    });
  } catch (err) {
    console.error('Song fetch error:', err.message);
    res.status(500).json({ error: 'Failed to load song' });
  }
});

// Called by the play page on the phone
app.get('/api/preview/:trackId', async (req, res) => {
  try {
    const { data } = await axios.get(`https://api.deezer.com/track/${req.params.trackId}`);
    res.json({
      previewUrl: data.preview || null,
      title:      data.title,
      artist:     data.artist?.name,
      albumArt:   data.album?.cover_xl || data.album?.cover_big || null,
      year:       data.release_date ? parseInt(data.release_date.split('-')[0]) : null,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load track' });
  }
});

// ── Start ─────────────────────────────────────────────────────────────────────

app.listen(PORT, '0.0.0.0', () => {
  const ip = getLocalIP();
  console.log(`
🎵  HITSTER GAME  (powered by Deezer — no API key needed)
───────────────────────────────
   Local:   http://localhost:${PORT}
   Network: http://${ip}:${PORT}

   Open Local URL in your browser.
   QR codes use the Network URL — phone must be on same WiFi.
───────────────────────────────
`);
});
