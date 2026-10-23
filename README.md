# OneMoreEpoch

Static site for the OneMoreEpoch YouTube show (onemoreepoch.com). No backend,
no build step — plain HTML/CSS/JS you can open directly or drop on any static
host.

## Structure

```
index.html             Home page
episodes.html          Full episode archive — topic filter + search
topics.html            Browse-by-topic page (counts computed live from data)
about.html             About the show + host
contact.html           Contact / links
privacy.html           Placeholder privacy policy
terms.html             Placeholder terms of use
404.html               Not-found page
css/style.css          All styles (brand colors, type, layout, dark mode)
js/episodes-data.js    <-- Edit this to publish real episodes & topics
js/render-episodes.js  Renders episode cards, topic cards, and filters
js/main.js             Mobile nav toggle, footer year
assets/                Logo, favicons, social share image
```

Design: headlines in Plus Jakarta Sans, body/UI text in JetBrains Mono,
flat rectangular buttons, color-coded topic tags, brand green (#4e7a57)
and ink (#1f1e19) sampled from the logo.

## Before you launch: replace the placeholders

Everything below is marked with an `<!-- PLACEHOLDER -->` comment in the
HTML, so you can find them with your editor's search:

| Placeholder | Appears in | Replace with |
|---|---|---|
| `https://www.youtube.com/@onemoreepoch` | every page (footer + CTAs) | your real YouTube channel URL |
| `hello@onemoreepoch.com` | contact.html | your real contact email |
| `https://x.com/onemoreepoch` | contact.html | your real X/Twitter URL |
| `https://open.spotify.com/show/onemoreepoch` | footer, hero, contact.html | your real Spotify show URL |
| `https://podcasts.apple.com/podcast/onemoreepoch` | footer, hero, contact.html | your real Apple Podcasts URL |
| `Host Name` / bio paragraph | about.html | the real host name and bio |

Fastest way: find-and-replace each placeholder string across all `.html`
files in your editor. `privacy.html` and `terms.html` are intentionally
bare-bones placeholders — replace their copy with your real policies
before launch, especially if you add analytics later.

## Adding real episodes & topics

Open `js/episodes-data.js` — two things live there:

- **`TOPICS`**: the four topic categories (`models`, `agents`, `research`,
  `tools`) with their label and description. Rename, reword, or add more —
  just give each a unique key and update the color tokens
  (`--c-models` etc. and the matching `.t-*` / `.bar-*` rules) in
  `css/style.css` if you add one.
- **`EPISODES`**: one array. For each episode, fill in the title,
  description, date, duration, `topic` (must match a `TOPICS` key), and the
  YouTube video ID (the part after `v=` in the video's URL). Episodes with
  `featured: true` (newest 3) show up on the homepage; everything shows on
  the Episodes page, newest first, and episode counts on the Topics page
  update automatically. Leave `youtubeId: null` and a card still renders
  with a placeholder thumbnail instead of a broken image.

The Episodes page reads a `?topic=` query param on load (e.g.
`episodes.html?topic=models`), so the "Browse →" links from the Topics page
land with that filter already applied.

## Running locally

No build step needed — just serve the folder:

```
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploying to onemoreepoch.com

Any static host works. Two easy options:

**GitHub Pages**
1. Push this folder to a GitHub repo.
2. In the repo settings, enable Pages for the `main` branch, root folder.
3. The included `CNAME` file already points Pages at `onemoreepoch.com` —
   at your domain registrar, add a `CNAME` record for `www` pointing to
   `<your-username>.github.io`, and `A` records for the apex domain to
   GitHub's Pages IPs (listed in GitHub's custom domain docs).

**Netlify / Cloudflare Pages**
1. Drag-and-drop this folder (or connect the repo) in their dashboard.
2. Add `onemoreepoch.com` as a custom domain in the site settings and follow
   their DNS instructions.

No environment variables, database, or server config required anywhere —
it's static files end to end.
