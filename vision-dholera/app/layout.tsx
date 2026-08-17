"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import { usePathname } from "next/navigation";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isAdmin = pathname.startsWith("/admin");

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
        {!isAdmin && <Navbar />}
<div className="pt-10">

        {children}

</div>
        {!isAdmin && <Footer />}
      </body>
    </html>
  );
}