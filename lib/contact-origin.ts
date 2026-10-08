export function isAllowedOrigin(
  origin: string | null,
  requestUrl: string,
  configuredOrigin: string | undefined,
  development: boolean,
): boolean {
  if (!origin) return false;
  if (configuredOrigin) return origin === configuredOrigin;
  try {
    const sent = new URL(origin);
    const received = new URL(requestUrl);
    if (sent.origin === received.origin) return true;
    const loopback = ["localhost", "127.0.0.1", "[::1]"];
    return (
      development &&
      sent.protocol === received.protocol &&
      sent.port === received.port &&
      loopback.includes(sent.hostname) &&
      loopback.includes(received.hostname)
    );
  } catch {
    return false;
  }
}
