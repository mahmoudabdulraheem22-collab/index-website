// Add only owner-verified information. Never commit the commercial registration itself.
export const company = {
  name: "Index",
  descriptor: "Software, Marketing & Advertising Consultancy",
  logo: {
    src: "/index-official-logo.jpg",
    width: 1600,
    height: 900,
  } as null | { src: string; width: number; height: number },
  favicon: "/index-official-logo.jpg" as string | null,
  phone: "",
  whatsapp: "",
  email: "",
  address: { en: "", ar: "" },
  social: { facebook: "", linkedin: "", instagram: "" },
};
export const approved = process.env.NEXT_PUBLIC_CONTENT_APPROVED === "true";
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
export const indexable = approved && !!siteUrl;
