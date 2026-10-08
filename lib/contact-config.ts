import { approved, siteUrl } from "@/data/company";
export const contactEnabled = () =>
  approved &&
  !!process.env.CONTACT_WEBHOOK_URL &&
  !!process.env.RATE_LIMIT_REST_URL &&
  !!process.env.RATE_LIMIT_REST_TOKEN &&
  !!process.env.RATE_LIMIT_SALT &&
  !!siteUrl &&
  !!process.env.PRIVACY_NOTICE_EN &&
  !!process.env.PRIVACY_NOTICE_AR;
