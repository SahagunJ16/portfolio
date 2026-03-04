import type { Metadata } from "next";
import { getPortfolioData } from "@/lib/portfolio";
import { Navbar, Footer } from "@/components/layout";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const { seo, profile } = await getPortfolioData();
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    icons: { icon: [{ url: profile.avatar ?? "/favicon.ico" }] },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="dark" data-scroll-behavior="smooth">
      <head>
        {/* Icon is set in generateMetadata (profile.avatar or /favicon.ico) */}
        {/* App Router: root layout applies to all routes; rule targets Pages Router _document */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=menu&display=optional" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Rethink+Sans:ital,wght@0,400..800;1,400..800&display=swap" />
      </head>
      <body className="antialiased overflow-auto">
        <div className="w-full md:w-[700px] m-auto">
          <Navbar />
            {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
