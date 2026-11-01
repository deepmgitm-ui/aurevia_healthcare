import type { Metadata } from "next";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://aureviahealthcare.com").replace(/\/$/, "");

function withSlash(path: string) {
  if (!path || path === "/") return "/";
  const clean = `/${path.replace(/^\/+|\/+$/g, "")}`;
  return `${clean}/`;
}

export function pageMetadata({
  title,
  description,
  path,
  locale = "en",
  languages,
}: {
  title: string;
  description: string;
  path: string;
  locale?: "en" | "hi";
  languages?: { en: string; hi: string };
}): Metadata {
  const canonicalPath = withSlash(path);
  const url = new URL(canonicalPath, SITE_URL).toString();
  const image = "/opengraph-image.png";
  return {
    title,
    description,
    alternates: {
      canonical: url,
      ...(languages ? {
        languages: {
          "en-IN": withSlash(languages.en),
          "hi-IN": withSlash(languages.hi),
          "x-default": withSlash(languages.en),
        },
      } : {}),
    },
    openGraph: {
      type: "website",
      siteName: "Aurevia Healthcare",
      locale: locale === "hi" ? "hi_IN" : "en_IN",
      url,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: "Aurevia Healthcare" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
