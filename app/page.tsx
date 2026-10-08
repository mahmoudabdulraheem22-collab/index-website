import { redirect } from "next/navigation";
export default function Root() {
  if (process.env.GITHUB_PAGES === "true") {
    return (
      <html lang="en">
        <head>
          <meta httpEquiv="refresh" content="0; url=/index-website/en/" />
          <link rel="canonical" href="/index-website/en/" />
        </head>
        <body>
          <a href="/index-website/en/">Index</a>
        </body>
      </html>
    );
  }
  redirect("/en");
}
