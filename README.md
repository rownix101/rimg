# rimg

Lightweight static random image host for Cloudflare Pages.

Chinese: `README_zh_CN.md`

## What this is
- Pure static image hosting with a random entry page.
- No server-side randomness; clients select or redirect.

## Endpoints
- `/<image>`: static WebP images under `nature_images/`.
- `/list.json`: array of image paths.
- `/random/`: loads `random/random.js` and redirects to a random image.
- `/random/random.js`: helper script for random selection.

## Usage
Open in browser:
- `https://<your-domain>/random/`

Embed in HTML:
```html
<img id="hero" alt="">
<script src="/random/random.js" data-target="#hero"></script>
```

Call from JS:
```js
randomImage().then((url) => {
  console.log(url);
});
```

## Caching
- `/list.json` cached for 3 hours.
- `/nature_images/*` cached for 1 year (immutable).
- `/random/*` not cached.
