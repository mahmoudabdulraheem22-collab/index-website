import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { isLocale, locales } from "@/i18n/config";
import { indexable, company } from "@/data/company";
import "../globals.css";
import "@fontsource-variable/inter";
import "@fontsource-variable/noto-sans-arabic";
import "@/styles/site.css";
export const metadata: Metadata = {
  title: { default: "Index", template: "%s | Index" },
  robots: { index: indexable, follow: indexable },
  ...(company.favicon
    ? {
        icons: {
          icon: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${company.favicon}`,
        },
      }
    : {}),
};
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} dir={locale === "ar" ? "rtl" : "ltr"}>
      <body id="top">
        <a className="skip-link" href="#main">
          {locale === "en" ? "Skip to content" : "انتقل إلى المحتوى"}
        </a>
        <Header locale={locale} />
        <main id="main">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
