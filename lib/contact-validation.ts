export const serviceIds = [
  "software-development",
  "database-systems",
  "systems-operation",
  "digital-content-marketing",
  "advertising-consultancy",
] as const;
export type Enquiry = {
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  service: string;
  description: string;
  website: string;
  locale: "en" | "ar";
};
export function validateEnquiry(
  input: unknown,
): { ok: true; data: Enquiry } | { ok: false; fields: string[] } {
  if (!input || typeof input !== "object" || Array.isArray(input))
    return { ok: false, fields: ["form"] };
  const value = input as Record<string, unknown>;
  const fields: string[] = [];
  const limits: Record<string, [number, number]> = {
    name: [2, 100],
    company: [0, 160],
    email: [3, 254],
    phone: [0, 40],
    country: [2, 100],
    service: [2, 80],
    description: [20, 5000],
    website: [0, 200],
  };
  const clean: Record<string, string> = {};
  for (const [key, [min, max]] of Object.entries(limits)) {
    const raw = value[key] ?? "";
    if (typeof raw !== "string") {
      fields.push(key);
      continue;
    }
    const val = raw.trim();
    clean[key] = val;
    if (
      val.length < min ||
      val.length > max ||
      /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/.test(val)
    )
      fields.push(key);
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clean.email ?? ""))
    fields.push("email");
  if (clean.phone && !/^[+\d\s().-]{5,40}$/.test(clean.phone))
    fields.push("phone");
  if (!serviceIds.includes(clean.service as (typeof serviceIds)[number]))
    fields.push("service");
  if (value.locale !== "en" && value.locale !== "ar") fields.push("locale");
  return fields.length
    ? { ok: false, fields: [...new Set(fields)] }
    : { ok: true, data: { ...clean, locale: value.locale } as Enquiry };
}
