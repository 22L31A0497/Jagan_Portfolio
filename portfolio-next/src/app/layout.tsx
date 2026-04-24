import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import { bio } from "@content/bio";
import { LenisProvider } from "@/components/shell/LenisProvider";
import { Navbar } from "@/components/shell/Navbar";
import { Footer } from "@/components/shell/Footer";
import { Cursor } from "@/components/shell/Cursor";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { LoaderGate } from "@/components/shell/LoaderGate";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jagan-portfolio.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${bio.name} — Full-stack Engineer`,
    template: `%s — ${bio.name}`,
  },
  description: bio.about,
  keywords: [
    "Jaganmohan Rao Kuna",
    "Full-stack Developer",
    "ML Engineer",
    "Computer Vision",
    "React",
    "Next.js",
    "Portfolio",
  ],
  authors: [{ name: bio.name, url: bio.github }],
  creator: bio.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: `${bio.name} — Full-stack Engineer`,
    description: bio.about,
    siteName: `${bio.name} · Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${bio.name} — Full-stack Engineer`,
    description: bio.about,
    creator: "@JaganMo88789011",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#09090B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} ${mono.variable}`}>
      <body className="min-h-screen antialiased">
        {/* Skip link for keyboard users */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-full focus:border focus:border-[color:var(--color-accent)] focus:bg-[color:var(--color-bg)] focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>

        <LenisProvider>
          <ScrollProgress />
          <Navbar />
          <main id="main" className="relative">
            {children}
          </main>
          <Footer />
        </LenisProvider>

        <Cursor />
        <NoiseOverlay />
        <LoaderGate />
      </body>
    </html>
  );
}
