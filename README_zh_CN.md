# rimg

基于 Cloudflare Pages 的轻量静态随机图床。

[English](/README.md)

## 项目说明
- 静态图床 + 动态随机跳转。

## 可用地址
- `/<image>`: `nature_images/` 下的 WebP 图片。
- `/list.json`: 图片路径数组。
- `/random`: 动态随机跳转（服务端）。
- `/`: 302 跳转到 `/random`。

## 使用方式
浏览器直接访问：
- `https://rimg.rownix.dev/`

嵌入到 HTML：
```html
<img src="/random" alt="">
```

## 缓存策略
- `/list.json` 缓存 3 小时。
- `/nature_images/*` 缓存 1 年（immutable）。
- `/random/*` 不缓存。
