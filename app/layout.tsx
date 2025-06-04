import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SNU DISASTER",
  description: "서울대 재난",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <main className="w-full flex items-center justify-center h-screen">
          <div className="w-full max-w-md bg-zinc-100 h-full">{children}</div>
        </main>
      </body>
    </html>
  );
}
