import { content as c } from "@/data/content";
import { t, type Locale } from "@/i18n/config";
import { contactEnabled } from "@/lib/contact-config";
export const basePages = ["", "about", "services", "contact"];
export const allPaths = () =>
  contactEnabled() ? [...basePages, "privacy"] : basePages;
export function pageInfo(path: string, locale: Locale) {
  const pages: Record<string, { title: string; description: string }> = {
    "": {
      title: t(c.descriptor, locale),
      description: t(c.introduction, locale),
    },
    about: {
      title: t(c.aboutTitle, locale),
      description: t(c.aboutText, locale),
    },
    services: {
      title: t(c.nav[2], locale),
      description: t(c.servicesIntro, locale),
    },
    contact: {
      title: t(c.contactTitle, locale),
      description: t(c.contactIntro, locale),
    },
  };
  if (path === "privacy" && contactEnabled())
    return {
      title: locale === "ar" ? "سياسة الخصوصية" : "Privacy Policy",
      description:
        locale === "ar"
          ? "معالجة بيانات الاستفسارات التجارية."
          : "How business enquiry information is processed.",
    };
  return pages[path] ?? null;
}
