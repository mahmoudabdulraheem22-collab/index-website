import { validateEnquiry } from "@/lib/contact-validation";
import { rateLimit } from "@/lib/rate-limit";
import { siteUrl } from "@/data/company";
import { contactEnabled } from "@/lib/contact-config";
import { isAllowedOrigin } from "@/lib/contact-origin";
export const runtime = "nodejs";
const reply = (status: number, code: string) =>
  Response.json(
    { code },
    {
      status,
      headers: {
        "Cache-Control": "no-store",
        ...(status === 429 ? { "Retry-After": "900" } : {}),
      },
    },
  );
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (
    !isAllowedOrigin(
      origin,
      request.url,
      siteUrl,
      process.env.NODE_ENV === "development",
    )
  )
    return reply(403, "origin");
  if (!request.headers.get("content-type")?.startsWith("application/json"))
    return reply(415, "content-type");
  if (Number(request.headers.get("content-length") || 0) > 24000)
    return reply(413, "too-large");
  let body: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) return reply(400, "body");
    let size = 0;
    const chunks: Uint8Array[] = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 24000) {
        await reader.cancel();
        return reply(413, "too-large");
      }
      chunks.push(value);
    }
    body = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return reply(400, "invalid-json");
  }
  const checked = validateEnquiry(body);
  if (!checked.ok) return reply(400, "invalid-fields");
  if (checked.data.website) return reply(400, "invalid-request");
  if (!contactEnabled()) return reply(503, "not-configured");
  try {
    if (!(await rateLimit(checked.data.email))) return reply(429, "rate-limit");
    const target = new URL(process.env.CONTACT_WEBHOOK_URL!);
    if (target.protocol !== "https:") return reply(503, "configuration");
    const { website, ...enquiry } = checked.data;
    void website;
    const response = await fetch(target, {
      method: "POST",
      redirect: "error",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.CONTACT_WEBHOOK_TOKEN
          ? { Authorization: `Bearer ${process.env.CONTACT_WEBHOOK_TOKEN}` }
          : {}),
      },
      body: JSON.stringify(enquiry),
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    return response.ok
      ? reply(200, "delivered")
      : reply(502, "delivery-failed");
  } catch {
    return reply(503, "unavailable");
  }
}
