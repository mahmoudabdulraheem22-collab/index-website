"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function NotFound() {
  const ar = usePathname().startsWith("/ar");
  return (
    <section className="section">
      <div className="container">
        <span className="eyebrow">Index / 404</span>
        <h1 className="error-title">
          {ar ? "الصفحة غير موجودة." : "Page not found."}
        </h1>
        <p>
          {ar
            ? "قد يكون العنوان غير صحيح أو تغيّر مسار الصفحة."
            : "The address may be incorrect or the page may have moved."}
        </p>
        <Link className="button" href={ar ? "/ar" : "/en"}>
          {ar ? "العودة للرئيسية" : "Return home"}
        </Link>
      </div>
    </section>
  );
}
