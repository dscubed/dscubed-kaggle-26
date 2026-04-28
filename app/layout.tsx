import type { Metadata } from "next";
import { Anton, Inter, JetBrains_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const anton = Anton({
  weight: "400",
  variable: "--font-anton",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

const SITE_URL = "https://kaggle.dscubed.org.au";
const OG_IMAGE = `${SITE_URL}/opengraph.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DSCubed Kaggle Competition 2026",
    template: "%s | DSCubed Kaggle 2026",
  },
  description:
    "DSCubed's flagship Kaggle competition — Sem 1 2026. Predict stock market movements, compete for prizes, and level up your data science skills. Open to all skill levels.",
  keywords: [
    "DSCubed",
    "Kaggle competition",
    "data science",
    "machine learning",
    "stock market prediction",
    "university competition",
    "Melbourne",
    "2026",
  ],
  authors: [{ name: "DSCubed", url: "https://dscubed.org.au" }],
  creator: "DSCubed",
  publisher: "DSCubed",
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "DSCubed Kaggle Competition 2026",
    title: "DSCubed Kaggle Competition 2026 — Stock Market Prediction",
    description:
      "Predict stock market movements and compete for prizes in DSCubed's Sem 1 2026 Kaggle competition. All skill levels welcome.",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "DSCubed Kaggle Competition 2026",
      },
    ],
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "DSCubed Kaggle Competition 2026 — Stock Market Prediction",
    description:
      "Predict stock market movements and compete for prizes in DSCubed's Sem 1 2026 Kaggle competition.",
    images: [OG_IMAGE],
    creator: "@dscubed",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  alternates: { canonical: SITE_URL },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${anton.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
