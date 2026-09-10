import type { Metadata } from "next";
import { Poppins, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SITE_NAME, SITE_URL } from "./lib/constants";

const poppins = Poppins({
  variable: "--font-geist-sans",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: "Gráfica Viva — soluções gráficas em impressão, branding, digital e promocionais.",
  openGraph: {
    title: SITE_NAME,
    description: "Soluções gráficas em impressão, branding, digital e promocionais.",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "pt_PT",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-PT"
      className={`${poppins.variable} ${geistMono.variable} bg-amber-50`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
