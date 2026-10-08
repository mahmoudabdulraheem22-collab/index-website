export default function githubImageLoader({
  src,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  if (src.startsWith("http://") || src.startsWith("https://")) return src;
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return `${base}${src.startsWith("/") ? src : `/${src}`}`;
}
