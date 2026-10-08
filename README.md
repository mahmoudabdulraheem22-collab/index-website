# Index corporate website

A complete local implementation with English (`/en`) and Arabic (`/ar`) versions of Home, About, Services and Contact. English is the initial default. No public deployment has been made.

## Run locally

Use Node.js 24 LTS (Node.js 20.9 or newer is required by Next.js), then open a terminal in this folder:

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:3000/en` or `http://127.0.0.1:3000/ar`.

For a production build:

```sh
npm run lint
npm run typecheck
npm test
npm run build
npm start
```

The server binds to the local computer only. Stop it with Ctrl+C. Deployment requires an explicit owner instruction and a real production domain.

## Structure

- `app/[locale]/`: document language/direction, localized routes, metadata and error states.
- `components/layout/`: responsive navigation, original logo, footer.
- `components/sections/site-pages.tsx`: four page implementations.
- `data/content.ts`: the centralized English/Arabic company copy and service areas.
- `data/company.ts`: optional verified contact/social fields and original-logo configuration.
- `i18n/config.ts`: supported locales and translation types.
- `app/globals.css`, `styles/site.css`: responsive design, focus states, reduced motion and brand styling.
- `lib/contact-*`, `lib/rate-limit.ts`, `app/api/contact/route.ts`: inactive-by-default validated enquiry infrastructure.
- `tests/`: input validation and origin-boundary tests.
- `public/index-official-logo.jpg`: the unchanged user-supplied logo.

Next.js, React, TypeScript and Tailwind versions are pinned in `package.json` and the lockfile. Inter and Noto Sans Arabic are self-hosted; no Google Fonts requests, tracking scripts or third-party embeds are used at runtime.

## Verified foundation

The four registration pages and supplied logo were visually inspected. Page 2 was rotated for inspection. The legal-name column on page 1 was enlarged to verify transcription.

| Website fact | Source |
|---|---|
| Index artwork and business descriptor | Supplied logo JPG |
| `INDEX FOR SOFTWARE AND ADVERTISING CONSULTING` | Registration page 1 |
| `اندكس للبرمجيات و الاستشارات الاعلانيه` | Registration page 1; scan spelling preserved |
| Egyptian limited liability company; registered location in Cairo | Registration page 1 |
| Software/application analysis, design, development, databases and information systems; related operation/training | Registration page 1 |
| Electronic content and electronic data entry | Registration pages 1 and 3 |
| Digitization, online marketing and advertising consultancy | Registration page 4 |

Sources: `سجل شركه اندكس للبرمجيات ( مصدقة قنصلية ).pdf` and `codex-clipboard-77749f26-4a6f-4096-8f54-941318833e3a.jpg`. The complete private source notes are delivered separately, outside the site. The registration PDF is not copied into this project.

The English marketing descriptor is an editorial rendering, not the registered English name. Activities are described as the company's documented scope; no completed work, scale, licenses or performance is inferred. No Saudi branch, endorsement, clients, achievements, personal IDs, signatures or capital information appear on the site.

The full street address is deliberately omitted; only the clearly readable Cairo location is used. It is labeled as a registered location, not a walk-in office. There is no material unreadable detail in the names and activities used. Licensed telecommunications and other specialist activities are omitted.

## Brand handling

The logo is preserved byte-for-byte, with its proportions and white background. Colors were sampled from the image: approximate red `#DD0707` and blue `#0061BF`. These are implementation samples, not claimed official brand specifications. The accessible business description does not depend on reading the small tagline in the image.

## Missing configuration and inactive features

- No phone, email, WhatsApp, social account, full public-address approval or real production domain was supplied. Optional contact fields remain empty in `data/company.ts`, and missing fields do not appear as placeholders on the site.
- The Contact page honestly states that online enquiries are unavailable. It displays no inactive form.
- No portfolio, testimonials, blog, careers, client logos or invented project examples are present.
- Indexing is disabled by default. Canonicals, hreflang, Organization JSON-LD and absolute social-preview URLs are omitted until `NEXT_PUBLIC_SITE_URL` is set to the verified production origin. The real logo is the configured social image. Sitemap entries require both the domain and `NEXT_PUBLIC_CONTENT_APPROVED=true`.
- No live enquiry recipient was supplied; delivery has not been tested against an external recipient.

## Optional enquiry activation

Do not activate until the owner provides a real recipient and approves an accurate privacy notice. Copy `.env.example` to `.env.local`, configure the verified domain and all required fields, then rebuild/restart:

1. `NEXT_PUBLIC_SITE_URL`: real production HTTPS origin, without a trailing slash or path.
2. `NEXT_PUBLIC_CONTENT_APPROVED=true`: owner-approved publication configuration.
3. `CONTACT_WEBHOOK_URL`: trusted HTTPS endpoint accepting the JSON fields below. The endpoint must durably accept the enquiry before returning a 2xx response.
4. `CONTACT_WEBHOOK_TOKEN`: bearer token, if required by the endpoint.
5. `RATE_LIMIT_REST_URL`, `RATE_LIMIT_REST_TOKEN`, `RATE_LIMIT_SALT`: an Upstash-compatible Redis REST endpoint and a long random salt. Atomic counters limit to five requests per email and 100 globally per 15-minute window. HMAC identifiers expire; raw emails are not stored in the limiter.
6. `PRIVACY_NOTICE_EN`, `PRIVACY_NOTICE_AR`: approved plain-text notices covering the actual controller, processors, retention, processing locations and privacy contact. The localized privacy route becomes available when enquiries are enabled.

Payload: `name`, `company`, `email`, `phone`, `country`, `service`, `description`, `locale`. Company and phone are optional. The honeypot is not forwarded. Secrets stay server-side and `.env*` is ignored by Git. No submission is reported successful unless the receiving endpoint returns success. Failed or unavailable configuration fails closed. Review the endpoint's own storage and spam controls before activation.

Baseline protections include server-side field validation, request-size limits, origin checks, a honeypot, a distributed limiter, timeouts, HTTPS-only delivery and security headers. Security is implementation infrastructure, not an advertised company service.

## Verification and known tooling advisory

See the accompanying `HANDOVER.md` and `verification.json` for the completed checks. Responsive/browser verification covers both languages, all four pages, navigation, language switching, assets, keyboard access and form absence.

Runtime dependency audit: no known vulnerabilities at the time checked. The full audit reports five high-severity entries in the development-only chain `eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces` (one underlying advisory, GHSA-vfj7-8cjw-p6xm). The registry's latest braces release was still 3.0.3. The suggested automatic fix would downgrade the Next lint config to an incompatible major, so it was not applied. ESLint 9.39.5 is pinned because the current Next lint plugins do not support ESLint 10. This does not affect the shipped browser/server runtime; revisit the lint tooling when compatible fixes are published.

The site is ready for local review, not a claim of legal review, live registry verification, a certified accessibility audit or field-measured Core Web Vitals.
