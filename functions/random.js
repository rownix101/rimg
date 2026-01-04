export async function onRequest({ request }) {
  if (request.method !== "GET" && request.method !== "HEAD") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: {
        Allow: "GET, HEAD",
      },
    });
  }

  const url = new URL(request.url);
  const listUrl = new URL("/list.json", url);

  let list;
  try {
    const res = await fetch(listUrl.toString(), {
      cf: { cacheTtl: 10800, cacheEverything: true },
    });
    if (!res.ok) {
      return new Response("list unavailable", {
        status: 502,
        headers: { "Cache-Control": "no-store" },
      });
    }
    list = await res.json();
  } catch (err) {
    return new Response("list unavailable", {
      status: 502,
      headers: { "Cache-Control": "no-store" },
    });
  }

  if (!Array.isArray(list) || list.length === 0) {
    return new Response("no images", {
      status: 404,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const picked = list[Math.floor(Math.random() * list.length)];
  const path =
    typeof picked === "string"
      ? picked.charAt(0) === "/"
        ? picked
        : "/" + picked
      : null;

  if (!path) {
    return new Response("bad list entry", {
      status: 500,
      headers: { "Cache-Control": "no-store" },
    });
  }

  if (url.searchParams.get("format") === "json") {
    return new Response(JSON.stringify({ url: path }), {
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  }

  return new Response(null, {
    status: 302,
    headers: {
      Location: path,
      "Cache-Control": "no-store",
    },
  });
}
