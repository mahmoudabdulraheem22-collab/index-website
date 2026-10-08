"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { company } from "@/data/company";
import { content as c } from "@/data/content";
import { t, type Locale } from "@/i18n/config";
export function Header({ locale }: { locale: Locale }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const ar = locale === "ar";
  const routes = ["", "about", "services", "contact"];
  const alternate = (lang: Locale) =>
    path.replace(/^\/(en|ar)(?=\/|$)/, `/${lang}`);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link
          className="brand"
          href={`/${locale}`}
          aria-label={ar ? "اندكس — الرئيسية" : "Index — home"}
          onClick={() => setOpen(false)}
        >
          {company.logo && (
            <Image
              src={company.logo.src}
              width={company.logo.width}
              height={company.logo.height}
              alt={ar ? "اندكس" : "Index"}
              sizes="190px"
              priority
            />
          )}
        </Link>
        <nav
          className="desktop-nav"
          aria-label={ar ? "التنقل الرئيسي" : "Main navigation"}
        >
          {routes.map((route, i) => (
            <Link
              key={route}
              href={`/${locale}${route ? "/" + route : ""}`}
              aria-current={
                path === `/${locale}${route ? "/" + route : ""}`
                  ? "page"
                  : undefined
              }
            >
              {t(c.nav[i], locale)}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <div className="language" aria-label={t(c.language, locale)}>
            <Link
              href={alternate("en")}
              hrefLang="en"
              lang="en"
              aria-label="English"
              aria-current={locale === "en" ? "true" : undefined}
              onClick={() => setOpen(false)}
            >
              EN
            </Link>
            <span aria-hidden="true">|</span>
            <Link
              href={alternate("ar")}
              hrefLang="ar"
              lang="ar"
              aria-label="العربية"
              aria-current={locale === "ar" ? "true" : undefined}
              onClick={() => setOpen(false)}
            >
              AR
            </Link>
          </div>
          <button
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={
              open
                ? ar
                  ? "إغلاق القائمة"
                  : "Close menu"
                : ar
                  ? "فتح القائمة"
                  : "Open menu"
            }
            onClick={() => setOpen(!open)}
          >
            <span aria-hidden="true">{open ? "×" : "☰"}</span>
          </button>
        </div>
      </div>
      <nav
        id="mobile-menu"
        className="mobile-nav"
        hidden={!open}
        aria-label={ar ? "التنقل على الهاتف" : "Mobile navigation"}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpen(false);
            document.querySelector<HTMLButtonElement>(".menu-toggle")?.focus();
          }
        }}
      >
        {routes.map((route, i) => (
          <Link
            key={route}
            href={`/${locale}${route ? "/" + route : ""}`}
            aria-current={
              path === `/${locale}${route ? "/" + route : ""}`
                ? "page"
                : undefined
            }
            onClick={() => setOpen(false)}
          >
            {t(c.nav[i], locale)}
          </Link>
        ))}
      </nav>
    </header>
  );
}
