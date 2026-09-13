const brandName = "উবায়দুল্লাহ তাসনিম";

const escapeHtml = (value = "") =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");

const absoluteUrl = (value, origin) => {
  try {
    return new URL(value || "/logo.webp", origin).href;
  } catch {
    return new URL("/logo.webp", origin).href;
  }
};

const getPreviewData = (contentType, item) => {
  if (contentType === "book") {
    return {
      title: item?.bookTitle || "বইয়ের বিস্তারিত",
      description: item?.bookDescription || "উবায়দুল্লাহ তাসনিমের বই পরিচিতি।",
      image: item?.bookImage,
      type: "book",
    };
  }

  return {
    title: item?.articlesEssaysName || "প্রবন্ধের বিস্তারিত",
    description:
      item?.articlesEssaysDescription || "উবায়দুল্লাহ তাসনিমের প্রবন্ধ-নিবন্ধ।",
    image: item?.articlesEssaysImg,
    type: "article",
  };
};

const html = ({ title, description, image, url, type }) => {
  const pageTitle = `${title} | ${brandName}`;
  const safeDescription = description.replace(/\s+/g, " ").trim().slice(0, 300);

  return `<!doctype html>
<html lang="bn">
  <head>
    <meta charset="UTF-8" />
    <title>${escapeHtml(pageTitle)}</title>
    <meta name="description" content="${escapeHtml(safeDescription)}" />
    <link rel="canonical" href="${escapeHtml(url)}" />
    <meta property="og:type" content="${escapeHtml(type)}" />
    <meta property="og:title" content="${escapeHtml(pageTitle)}" />
    <meta property="og:description" content="${escapeHtml(safeDescription)}" />
    <meta property="og:url" content="${escapeHtml(url)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:image:alt" content="${escapeHtml(title)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(pageTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(safeDescription)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />
  </head>
  <body>${escapeHtml(title)}</body>
</html>`;
};

const isSocialCrawler = (userAgent = "") =>
  /facebookexternalhit|facebot|twitterbot|whatsapp|telegrambot/i.test(userAgent);

export default async function handler(request, response) {
  const { contentType, id } = request.query;
  const apiBaseUrl =
    globalThis.process?.env?.VITE_API_BASE_URL ||
    globalThis.process?.env?.API_BASE_URL;
  const protocol = request.headers["x-forwarded-proto"] || "https";
  const host = request.headers["x-forwarded-host"] || request.headers.host;
  const origin = `${protocol}://${host}`;

  if (!isSocialCrawler(request.headers["user-agent"])) {
    try {
      const appResponse = await fetch(`${origin}/`);
      response.setHeader("Content-Type", "text/html; charset=utf-8");
      response.status(appResponse.status).send(await appResponse.text());
    } catch {
      response.status(502).send("Unable to load application");
    }
    return;
  }

  if (!apiBaseUrl || !id || !["book", "article"].includes(contentType)) {
    response.status(400).send("Invalid share preview request");
    return;
  }

  const endpoint = contentType === "book"
    ? `${apiBaseUrl}/book/${encodeURIComponent(id)}/`
    : `${apiBaseUrl}/articles_essays/${encodeURIComponent(id)}`;

  try {
    const apiResponse = await fetch(endpoint);
    if (!apiResponse.ok) {
      response.status(apiResponse.status).send("Share preview content not found");
      return;
    }

    const item = await apiResponse.json();
    const preview = getPreviewData(contentType, item);
    const path = contentType === "book" ? `/books/${id}` : `/articles/${id}`;

    response.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=600");
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.setHeader("X-Robots-Tag", "noindex, nofollow");
    response.status(200).send(
      html({
        ...preview,
        image: absoluteUrl(preview.image, origin),
        url: `${origin}${path}`,
      }),
    );
  } catch {
    response.status(502).send("Unable to load share preview");
  }
}
