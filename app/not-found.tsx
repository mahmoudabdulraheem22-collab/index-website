import Link from "next/link";
export default function NotFound() {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "Arial,sans-serif",
          padding: "8vw",
          color: "#17191e",
        }}
      >
        <p>INDEX / 404</p>
        <h1>This page could not be found.</h1>
        <p>The address may be incorrect or the page may have moved.</p>
        <Link href="/en">Return to INDEX</Link>
        <p dir="rtl" lang="ar">
          <Link href="/ar">العودة إلى الرئيسية</Link>
        </p>
      </body>
    </html>
  );
}
