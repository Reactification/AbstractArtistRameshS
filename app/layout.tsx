import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ramesh Sun | Cinematic Portfolio",
  description: "Cinematic portfolio showcasing photography and visual storytelling",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${space.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-black text-white">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
