import Image from "next/image";
import Link from "next/link";
import { company } from "@/data/company";
import { content as c } from "@/data/content";
import { t, type Locale } from "@/i18n/config";
import { LanguageSwitch } from "@/components/language-switch";
export function Footer({ locale }: { locale: Locale }) {
  const routes = ["", "about", "services", "contact"];
  return (
    <footer className="footer">
      <div className="container footer-grid new-footer">
        <div className="footer-brand">
          {company.logo && (
            <Image
              src={company.logo.src}
              alt="Index"
              width={company.logo.width}
              height={company.logo.height}
              sizes="220px"
            />
          )}
          <p>{t(c.descriptor, locale)}</p>
        </div>
        <div>
          <h2>{t(c.footerNav, locale)}</h2>
          {routes.map((route, i) => (
            <Link key={route} href={`/${locale}${route ? "/" + route : ""}`}>
              {t(c.nav[i], locale)}
            </Link>
          ))}
        </div>
        <div className="footer-identity">
          <h2>{t(c.business, locale)}</h2>
          <p lang="en" dir="ltr">
            {c.registeredNameEn}
          </p>
          <p>{t(c.legalForm, locale)}</p>
          <p>{t(c.location, locale)}</p>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>© Index. {t(c.rights, locale)}</p>
        <LanguageSwitch locale={locale} />
        <div className="social-links">
          {Object.entries(company.social)
            .filter(([, url]) => url)
            .map(([name, url]) => (
              <a
                href={url}
                key={name}
                rel="noopener noreferrer"
                target="_blank"
              >
                {name}
              </a>
            ))}
        </div>
        <a href="#top">{t(c.backTop, locale)}</a>
      </div>
    </footer>
  );
}
