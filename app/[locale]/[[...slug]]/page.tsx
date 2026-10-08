import { notFound } from "next/navigation";
import { isLocale, locales } from "@/i18n/config";
import { company, siteUrl } from "@/data/company";
import { content } from "@/data/content";
import { allPaths, pageInfo } from "@/lib/pages";
import { pageMetadata } from "@/lib/metadata";
import {
  Home,
  About,
  ServicesPage,
  ContactPage,
} from "@/components/sections/site-pages";
type Params = { locale: string; slug?: string[] };
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    allPaths().map((path) => ({ locale, slug: path ? [path] : [] })),
  );
}
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { locale, slug = [] } = await params;
  if (!isLocale(locale)) return {};
  const path = slug.join("/");
  const info = pageInfo(path, locale);
  return info ? pageMetadata(locale, path, info.title, info.description) : {};
}
export default async function Page({ params }: { params: Promise<Params> }) {
  const { locale, slug = [] } = await params;
  if (!isLocale(locale)) notFound();
  const path = slug.join("/");
  if (!pageInfo(path, locale)) notFound();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Index",
    legalName: content.registeredNameEn,
    url: siteUrl,
    ...(company.logo && siteUrl ? { logo: siteUrl + company.logo.src } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cairo",
      addressCountry: "EG",
    },
    sameAs: Object.values(company.social).filter(Boolean),
  };
  return (
    <>
      {siteUrl && !path && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      )}
      {!path ? (
        <Home locale={locale} />
      ) : path === "about" ? (
        <About locale={locale} />
      ) : path === "services" ? (
        <ServicesPage locale={locale} />
      ) : path === "privacy" ? (
        <section className="section">
          <div className="container policy">
            <h1>{locale === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}</h1>
            <p style={{ whiteSpace: "pre-line" }}>
              {locale === "ar"
                ? process.env.PRIVACY_NOTICE_AR
                : process.env.PRIVACY_NOTICE_EN}
            </p>
          </div>
        </section>
      ) : (
        <ContactPage locale={locale} />
      )}
    </>
  );
}
