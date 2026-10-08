import type { MetadataRoute } from "next";
import { siteUrl, indexable } from "@/data/company";
import { allPaths } from "@/lib/pages";
import { locales } from "@/i18n/config";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl || !indexable) return [];
  return allPaths().flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}/${locale}${path ? "/" + path : ""}`,
      alternates: {
        languages: {
          en: `${siteUrl}/en${path ? "/" + path : ""}`,
          ar: `${siteUrl}/ar${path ? "/" + path : ""}`,
        },
      },
    })),
  );
}
