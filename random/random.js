(function () {
  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function normalizeUrl(path) {
    if (typeof path !== "string" || path.length === 0) {
      return null;
    }
    return path.charAt(0) === "/" ? path : "/" + path;
  }

  function getListUrl(script) {
    if (!script) return "/list.json";
    var custom = script.getAttribute("data-list");
    return custom || "/list.json";
  }

  function randomImage(opts) {
    opts = opts || {};
    var listUrl = opts.listUrl || "/list.json";
    return fetch(listUrl)
      .then(function (r) {
        return r.json();
      })
      .then(function (list) {
        if (!Array.isArray(list) || list.length === 0) {
          throw new Error("empty list");
        }
        return normalizeUrl(pick(list));
      });
  }

  function applyTarget(url, target) {
    if (!url) return;
    if (target === "redirect") {
      location.replace(url);
      return;
    }
    if (typeof target === "string" && target.length > 0) {
      var el = document.querySelector(target);
      if (el && el.tagName && el.tagName.toLowerCase() === "img") {
        el.src = url;
        return;
      }
    }
  }

  var script =
    document.currentScript ||
    document.querySelector('script[src$="/random/random.js"]');
  var listUrl = getListUrl(script);
  var auto = script && script.getAttribute("data-redirect") === "1";
  var target = script && script.getAttribute("data-target");

  window.randomImage = function (opts) {
    opts = opts || {};
    opts.listUrl = opts.listUrl || listUrl;
    return randomImage(opts).then(function (url) {
      if (opts.target) {
        applyTarget(url, opts.target);
      }
      return url;
    });
  };

  if (auto || target) {
    randomImage({ listUrl: listUrl })
      .then(function (url) {
        applyTarget(url, auto ? "redirect" : target);
      })
      .catch(function () {
        document.body.textContent = "no images";
      });
  }
})();
