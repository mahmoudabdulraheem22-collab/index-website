// The locale layout owns <html lang dir> for correct server-rendered RTL.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
