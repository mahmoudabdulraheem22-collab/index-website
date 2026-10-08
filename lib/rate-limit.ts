import { createHmac } from "node:crypto";
// Atomic, expiring distributed counter. No raw email or IP is stored.
export async function rateLimit(email: string): Promise<boolean> {
  const url = process.env.RATE_LIMIT_REST_URL;
  const token = process.env.RATE_LIMIT_REST_TOKEN;
  const salt = process.env.RATE_LIMIT_SALT;
  if (!url || !token || !salt) return false;
  const window = Math.floor(Date.now() / 900000);
  const digest = createHmac("sha256", salt)
    .update(email.toLowerCase())
    .digest("hex");
  const script =
    "local a=redis.call('INCR',KEYS[1]); if a==1 then redis.call('EXPIRE',KEYS[1],900) end; local b=redis.call('INCR',KEYS[2]); if b==1 then redis.call('EXPIRE',KEYS[2],900) end; if a>5 or b>100 then return 0 else return 1 end";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([
      "EVAL",
      script,
      "2",
      `index:contact:${window}:${digest}`,
      `index:contact:global:${window}`,
    ]),
    signal: AbortSignal.timeout(5000),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Rate limiter unavailable");
  const result = await response.json();
  if (result.error) throw new Error("Rate limiter unavailable");
  return result.result === 1;
}
