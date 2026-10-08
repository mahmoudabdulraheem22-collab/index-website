import Image from "next/image";
import Link from "next/link";
import { content as c, groups, serviceAreas } from "@/data/content";
import { company } from "@/data/company";
import { t, type Locale } from "@/i18n/config";
import { contactEnabled } from "@/lib/contact-config";
import { ContactForm } from "@/components/contact-form";
export function LegalIdentity({
  locale,
  compact = false,
}: {
  locale: Locale;
  compact?: boolean;
}) {
  return (
    <dl className={`identity-list ${compact ? "compact-identity" : ""}`}>
      <div>
        <dt>{t(c.legalEnglishLabel, locale)}</dt>
        <dd lang="en" dir="ltr">
          {c.registeredNameEn}
        </dd>
      </div>
      {!compact && (
        <div>
          <dt>{t(c.legalArabicLabel, locale)}</dt>
          <dd lang="ar" dir="rtl">
            {c.registeredNameAr}
          </dd>
        </div>
      )}
      <div>
        <dt>{t(c.legalFormLabel, locale)}</dt>
        <dd>{t(c.legalForm, locale)}</dd>
      </div>
      <div>
        <dt>{t(c.locationLabel, locale)}</dt>
        <dd>{t(c.location, locale)}</dd>
      </div>
    </dl>
  );
}
export function GroupCards({ locale }: { locale: Locale }) {
  return (
    <div className="service-grid">
      {groups.map((g, i) => (
        <Link
          className="service-card"
          href={`/${locale}/services#${g.id}`}
          key={g.id}
        >
          <div className="card-top">
            <span className="number">0{i + 1}</span>
            <span className="service-symbol" aria-hidden="true">
              {["{ }", "[ / ]", "◎"][i]}
            </span>
          </div>
          <h3>{t(g.title, locale)}</h3>
          <p>{t(g.text, locale)}</p>
          <span className="card-link">
            {t(c.exploreGroup, locale)}
            <span aria-hidden="true">+</span>
          </span>
        </Link>
      ))}
    </div>
  );
}
export function PageHero({
  locale,
  title,
  text,
  label,
}: {
  locale: Locale;
  title: string;
  text: string;
  label: string;
}) {
  return (
    <section className="page-hero">
      <div className="container">
        <div className="breadcrumb">
          <Link href={`/${locale}`}>{t(c.nav[0], locale)}</Link>
          <span aria-hidden="true">/</span>
          <span>{label}</span>
        </div>
        <span className="eyebrow">Index / {label}</span>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}
export function Home({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="red-line" />
              {ar ? "اندكس · القاهرة، مصر" : "INDEX · CAIRO, EGYPT"}
            </div>
            <h1>
              {t(c.hero, locale)
                .split("\n")
                .map((line, i) => (
                  <span key={i} className={i === 3 ? "red-text" : undefined}>
                    {line}
                  </span>
                ))}
            </h1>
            <p>{t(c.introduction, locale)}</p>
            <div className="hero-actions">
              <Link href={`/${locale}/services`} className="button">
                {t(c.explore, locale)}
              </Link>
              <Link href={`/${locale}/about`} className="text-link">
                {t(c.aboutLink, locale)}
              </Link>
            </div>
          </div>
          <div className="ecosystem">
            <div className="diagram-label">
              <span>{t(c.sourceScope, locale)}</span>
              <span>01 — 03</span>
            </div>
            <div className="brand-visual">
              {company.logo && (
                <Image
                  src={company.logo.src}
                  alt={
                    ar
                      ? "شعار اندكس للبرمجيات والاستشارات التسويقية والإعلانية"
                      : "Index — Software, Marketing & Advertising Consultancy"
                  }
                  width={company.logo.width}
                  height={company.logo.height}
                  sizes="(max-width: 850px) 90vw, 560px"
                  priority
                />
              )}
            </div>
            <div className="diagram-cells three-cells">
              {groups.map((g, i) => (
                <div key={g.id} className={`diagram-cell cell-${i}`}>
                  <span className="number">0{i + 1}</span>
                  <span>{t(g.title, locale)}</span>
                </div>
              ))}
            </div>
            <div className="diagram-bottom">
              <span>
                {ar
                  ? "برمجيات / محتوى / تواصل"
                  : "SOFTWARE / CONTENT / COMMUNICATION"}
              </span>
              <span aria-hidden="true">{} / +</span>
            </div>
          </div>
        </div>
        <div className="container hero-bottom">
          <span>{t(c.note, locale)}</span>
          <span>
            {ar
              ? "هوية مصرية · اهتمام بالمجال الرقمي"
              : "EGYPTIAN IDENTITY · DIGITAL FOCUS"}
          </span>
        </div>
      </section>
      <section className="section intro">
        <div className="container intro-grid">
          <span className="eyebrow">{t(c.aboutLink, locale)}</span>
          <div>
            <h2>{t(c.introTitle, locale)}</h2>
            <p className="large-copy">{t(c.introText, locale)}</p>
            <Link className="text-link" href={`/${locale}/about`}>
              {t(c.aboutLink, locale)}
            </Link>
          </div>
        </div>
      </section>
      <section className="section services-section">
        <div className="container">
          <div className="section-heading horizontal">
            <div>
              <span className="eyebrow">{t(c.sourceScope, locale)}</span>
              <h2>{t(c.scopeTitle, locale)}</h2>
            </div>
            <p>{t(c.scopeText, locale)}</p>
          </div>
          <GroupCards locale={locale} />
        </div>
      </section>
      <section className="section company-section">
        <div className="container content-grid">
          <div>
            <span className="eyebrow">{t(c.companyLabel, locale)}</span>
            <h2>{t(c.companyTitle, locale)}</h2>
            <p>{t(c.companyText, locale)}</p>
            <Link className="text-link" href={`/${locale}/about`}>
              {t(c.aboutLink, locale)}
            </Link>
          </div>
          <LegalIdentity locale={locale} compact />
        </div>
      </section>
    </>
  );
}
export function About({ locale }: { locale: Locale }) {
  return (
    <>
      <PageHero
        locale={locale}
        title={t(c.aboutTitle, locale)}
        text={t(c.aboutText, locale)}
        label={t(c.nav[1], locale)}
      />
      <section className="section">
        <div className="container content-grid">
          <div className="prose">
            <h2>{t(c.brandTitle, locale)}</h2>
            <p>{t(c.brandText, locale)}</p>
            <p>{t(c.introText, locale)}</p>
            {company.logo && (
              <div className="about-logo">
                <Image
                  src={company.logo.src}
                  alt={t(c.descriptor, locale)}
                  width={company.logo.width}
                  height={company.logo.height}
                  sizes="(max-width: 850px) 90vw, 560px"
                />
              </div>
            )}
          </div>
          <div>
            <span className="eyebrow">{t(c.companyLabel, locale)}</span>
            <LegalIdentity locale={locale} />
            <p className="identity-source">{t(c.legalNote, locale)}</p>
          </div>
        </div>
      </section>
      <section className="section services-section">
        <div className="container">
          <div className="section-heading">
            <h2>{t(c.scopeTitle, locale)}</h2>
          </div>
          <GroupCards locale={locale} />
        </div>
      </section>
    </>
  );
}
export function ServicesPage({ locale }: { locale: Locale }) {
  return (
    <>
      <PageHero
        locale={locale}
        title={t(c.servicesTitle, locale)}
        text={t(c.servicesIntro, locale)}
        label={t(c.nav[2], locale)}
      />
      <section className="section">
        <div className="container services-layout">
          <nav
            className="service-index"
            aria-label={locale === "en" ? "Service areas" : "مجالات الخدمات"}
          >
            {groups.map((g, i) => (
              <a key={g.id} href={`#${g.id}`}>
                <span className="number">0{i + 1}</span>
                {t(g.title, locale)}
              </a>
            ))}
          </nav>
          <div>
            {groups.map((g, i) => (
              <section id={g.id} className="service-group" key={g.id}>
                <span className="eyebrow">
                  0{i + 1} / {t(c.sourceScope, locale)}
                </span>
                <h2>{t(g.title, locale)}</h2>
                {g.items.map((index) => {
                  const s = serviceAreas[index];
                  return (
                    <div className="service-detail" key={s.slug}>
                      <h3>{t(s.title, locale)}</h3>
                      <p>{t(s.text, locale)}</p>
                    </div>
                  );
                })}
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
export function ContactPage({ locale }: { locale: Locale }) {
  const ar = locale === "ar";
  const enabled = contactEnabled();
  const hasContact = company.email || company.phone || company.whatsapp;
  return (
    <>
      <PageHero
        locale={locale}
        title={t(c.contactTitle, locale)}
        text={t(c.contactIntro, locale)}
        label={t(c.nav[3], locale)}
      />
      <section className="section">
        <div className="container contact-grid">
          <div>
            {enabled ? (
              <ContactForm locale={locale} enabled />
            ) : (
              <div className="contact-message">
                <span className="contact-symbol" aria-hidden="true">
                  [ / ]
                </span>
                <h2>{t(c.contactClosedTitle, locale)}</h2>
                <p>
                  {hasContact
                    ? ar
                      ? "يمكنك التواصل باستخدام القنوات الموضحة في هذه الصفحة."
                      : "You can contact the company through the channels listed on this page."
                    : t(c.contactClosed, locale)}
                </p>
                <Link className="text-link" href={`/${locale}/services`}>
                  {t(c.servicesLink, locale)}
                </Link>
              </div>
            )}
          </div>
          <aside className="contact-aside">
            <span className="eyebrow">{t(c.companyLabel, locale)}</span>
            <h2 style={{ marginTop: 20 }}>{t(c.location, locale)}</h2>
            <dl className="contact-info">
              <div>
                <dt>{t(c.locationLabel, locale)}</dt>
                <dd>{company.address[locale] || t(c.location, locale)}</dd>
              </div>
              {company.email && (
                <div>
                  <dt>{ar ? "البريد الإلكتروني" : "Email"}</dt>
                  <dd>
                    <a href={`mailto:${company.email}`} dir="ltr">
                      {company.email}
                    </a>
                  </dd>
                </div>
              )}
              {company.phone && (
                <div>
                  <dt>{ar ? "الهاتف" : "Phone"}</dt>
                  <dd>
                    <a href={`tel:${company.phone}`} dir="ltr">
                      {company.phone}
                    </a>
                  </dd>
                </div>
              )}
              {company.whatsapp && (
                <div>
                  <dt>WhatsApp</dt>
                  <dd>
                    <a
                      href={`https://wa.me/${company.whatsapp.replace(/\D/g, "")}`}
                      dir="ltr"
                    >
                      {company.whatsapp}
                    </a>
                  </dd>
                </div>
              )}
            </dl>
            <p className="identity-source">{t(c.addressNote, locale)}</p>
          </aside>
        </div>
      </section>
    </>
  );
}
