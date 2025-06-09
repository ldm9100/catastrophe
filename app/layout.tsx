import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import Script from "next/script";

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
      <head>
        <Script
            type="text/javascript"
            src="https://openapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=24j9jye1x1"
            strategy={'beforeInteractive'}
        />
      </head>
      <body>
        <main className="w-full flex items-center justify-center h-screen">
          <div className="w-full max-w-md bg-zinc-100 h-full">{children}</div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
