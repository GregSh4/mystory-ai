import type { Metadata } from "next";
import { Inter, Nunito, Comic_Neue } from "next/font/google";
import "./globals.css";
import AppWrapper from "@/components/AppWrapper";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito" });
const comicNeue = Comic_Neue({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-comic"
});


export const metadata: Metadata = {
  title: "MyStory AI - Stories for Kids",
  description: "AI-powered story creator for kids aged 4-8",
  manifest: "/manifest.json",
  themeColor: "#7c3aed",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "MyStory AI",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <Script src="/sw-register.js" strategy="afterInteractive" />
      </head>
      <body className={`${inter.variable} ${nunito.variable} ${comicNeue.variable}`}>
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}
