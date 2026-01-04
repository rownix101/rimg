# rimg

Lightweight static random image host for Cloudflare Pages.

[简体中文](/README_zh_CN.md)

## What this is
- Static image hosting with a dynamic random redirect.

## Endpoints
- `/<image>`: static WebP images under `nature_images/`.
- `/list.json`: array of image paths.
- `/random`: dynamic redirect to a random image (server-side).
- `/`: 302 redirect to `/random`.

## Usage
Open in browser:
- `https://rimg.rownix.dev/`

Embed in HTML:
```html
<img src="/random" alt="">
```

## Caching
- `/list.json` cached for 3 hours.
- `/nature_images/*` cached for 1 year (immutable).
- `/random/*` not cached.
