import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/Header/Header";
import "./globals.css";
import { Container } from "@/components/Container/Container";

const inter = Inter({
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TravelTrucks",
  description: "TravelTrucks - your reliable camper rental service.",

  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',

    other: [
      {
        rel: 'icon',
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
      },
      {
        rel: 'icon',
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
      },
    ],
  },

  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable}`}>
          <Container>
            <Header />
            <main>{children}</main>
          </Container>
      </body>
    </html>
  );
}
