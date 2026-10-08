"use client";
import { usePathname } from "next/navigation";
export default function ErrorPage({
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const ar = usePathname().startsWith("/ar");
  return (
    <section className="section">
      <div className="container">
        <h1 className="error-title">
          {ar ? "تعذر تحميل الصفحة." : "This page could not be loaded."}
        </h1>
        <button className="button" onClick={() => reset()}>
          {ar ? "حاول مرة أخرى" : "Try again"}
        </button>
      </div>
    </section>
  );
}
