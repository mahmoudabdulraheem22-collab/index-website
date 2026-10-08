import type { MetadataRoute } from "next";
import { siteUrl, indexable } from "@/data/company";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: indexable
      ? { userAgent: "*", allow: "/", disallow: "/api/" }
      : { userAgent: "*", disallow: "/" },
    ...(siteUrl && indexable ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}
