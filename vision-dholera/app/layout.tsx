import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";

import "./globals.css";
import { cn } from "@/lib/utils";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://visiondholera.com"),

  title: {
    default: "Vision Dholera | Dholera Smart City Real Estate",
    template: "%s | Vision Dholera",
  },

  description:
    "Explore premium residential and commercial properties, plots and investment opportunities in Dholera Smart City with Vision Dholera.",

  keywords: [
    "Dholera Smart City",
    "Dholera property",
    "Dholera plots",
    "Dholera real estate",
    "Dholera investment",
    "Dholera residential plots",
    "Dholera commercial property",
    "Dholera Smart City property",
    "Vision Dholera",
  ],

  authors: [
    {
      name: "Vision Dholera",
    },
  ],

  creator: "Vision Dholera",

  alternates: {
    canonical: "https://visiondholera.com",
  },

  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    type: "website",
    url: "https://visiondholera.com",
    siteName: "Vision Dholera",
    title: "Vision Dholera | Dholera Smart City Real Estate",
    description:
      "Discover premium properties, plots and investment opportunities in Dholera Smart City.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Vision Dholera - Dholera Smart City Real Estate",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Vision Dholera | Dholera Smart City Real Estate",
    description:
      "Premium real estate and investment opportunities in Dholera Smart City.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        inter.variable
      )}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}