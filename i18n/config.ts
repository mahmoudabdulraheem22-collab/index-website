export const locales = ["en", "ar"] as const;
export type Locale = (typeof locales)[number];
export type Copy = { en: string; ar: string };
export const t = (value: Copy, locale: Locale) => value[locale];
export const isLocale = (value: string): value is Locale =>
  locales.includes(value as Locale);
