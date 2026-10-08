"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/i18n/config";
export function LanguageSwitch({ locale }: { locale: Locale }) {
  const path = usePathname();
  return (
    <div
      className="language footer-language"
      aria-label={locale === "en" ? "Language" : "اللغة"}
    >
      {(["en", "ar"] as const).map((lang) => (
        <Link
          key={lang}
          href={path.replace(/^\/(en|ar)(?=\/|$)/, `/${lang}`)}
          hrefLang={lang}
          lang={lang}
          aria-current={locale === lang ? "true" : undefined}
        >
          {lang === "en" ? "English" : "العربية"}
        </Link>
      ))}
    </div>
  );
}
