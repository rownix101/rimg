# rimg

基于 Cloudflare Pages 的轻量静态随机图床。

## 项目说明
- 纯静态图床与随机入口页面。
- 服务端不做随机，由客户端选择或跳转。

## 可用地址
- `/<image>`: `nature_images/` 下的 WebP 图片。
- `/list.json`: 图片路径数组。
- `/random/`: 加载 `random/random.js` 并随机跳转。
- `/random/random.js`: 随机选择辅助脚本。

## 使用方式
浏览器直接访问：
- `https://<your-domain>/random/`

嵌入到 HTML：
```html
<img id="hero" alt="">
<script src="/random/random.js" data-target="#hero"></script>
```

在 JS 中调用：
```js
randomImage().then((url) => {
  console.log(url);
});
```

## 缓存策略
- `/list.json` 缓存 3 小时。
- `/nature_images/*` 缓存 1 年（immutable）。
- `/random/*` 不缓存。
