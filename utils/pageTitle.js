import { useEffect } from "react";

const upsertMeta = (attribute, key, content) => {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
};

const upsertCanonical = (url) => {
  let element = document.head.querySelector("link[rel='canonical']");

  if (!element) {
    element = document.createElement("link");
    element.rel = "canonical";
    document.head.appendChild(element);
  }

  element.href = url;
};

const toAbsoluteUrl = (value, fallback) => {
  try {
    return new URL(value || fallback, window.location.origin).href;
  } catch {
    return fallback;
  }
};

const PageTitle = ({ title, description, image, url, type = "website" }) => {
  useEffect(() => {
    const brandName = "উবায়দুল্লাহ তাসনিম";
    const pageTitle = title === brandName ? brandName : `${title} | ${brandName}`;
    const pageUrl = url || window.location.href;
    const pageDescription = description || "উবায়দুল্লাহ তাসনিম এর অফিসিয়াল ওয়েবসাইট।";
    const pageImage = toAbsoluteUrl(image, `${window.location.origin}/logo.webp`);

    document.title = pageTitle;

    upsertMeta("name", "description", pageDescription);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:title", pageTitle);
    upsertMeta("property", "og:description", pageDescription);
    upsertMeta("property", "og:url", pageUrl);
    upsertMeta("property", "og:image", pageImage);
    upsertMeta("property", "og:image:alt", pageTitle);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", pageTitle);
    upsertMeta("name", "twitter:description", pageDescription);
    upsertMeta("name", "twitter:image", pageImage);
    upsertCanonical(pageUrl);
  }, [title, description, image, url, type]);

  return null;
};

export default PageTitle;
