import type { Metadata } from "next";
import { siteUrl, indexable } from "@/data/company";
import type { Locale } from "@/i18n/config";
export function pageMetadata(
  locale: Locale,
  path: string,
  title: string,
  description: string,
): Metadata {
  const route = `/${locale}${path ? "/" + path : ""}`;
  return {
    title,
    description,
    robots: { index: indexable, follow: indexable },
    ...(siteUrl
      ? {
          metadataBase: new URL(siteUrl),
          alternates: {
            canonical: siteUrl + route,
            languages: {
              en: `${siteUrl}/en${path ? "/" + path : ""}`,
              ar: `${siteUrl}/ar${path ? "/" + path : ""}`,
              "x-default": `${siteUrl}/en${path ? "/" + path : ""}`,
            },
          },
        }
      : {}),
    openGraph: {
      type: "website",
      siteName: "Index",
      title: `${title} | Index`,
      description,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_EG",
      ...(siteUrl
        ? {
            url: siteUrl + route,
            images: [
              {
                url: siteUrl + "/index-official-logo.jpg",
                width: 1600,
                height: 900,
                alt: locale === "ar" ? "شعار اندكس" : "Index official logo",
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Index`,
      description,
      ...(siteUrl ? { images: [siteUrl + "/index-official-logo.jpg"] } : {}),
    },
  };
}
