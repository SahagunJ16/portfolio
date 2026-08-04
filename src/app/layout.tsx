import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

import { CommandPalette } from "@/components/command-palette";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteSidebar } from "@/components/layout/site-sidebar";
import { SocialLinks } from "@/components/social-links";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/data";
import { toExternalUrl } from "@/lib/format";
import { getFullName, getInitials, getPrimaryHeadline } from "@/lib/portfolio";
import {
  RESUME_PATH,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_LOCALE,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/seo";
import { cn } from "@/lib/utils";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: `%s — ${SITE_TITLE}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  applicationName: SITE_TITLE,
  authors: [{ name: SITE_TITLE, url: SITE_URL }],
  creator: SITE_TITLE,
  publisher: SITE_TITLE,
  alternates: { canonical: "/" },
  // Stops mobile Safari auto-linking numbers in the copy as phone links.
  formatDetection: { telephone: false, address: false, email: false },
  openGraph: {
    type: "profile",
    firstName: DATA.profile.first_name,
    lastName: DATA.profile.last_name,
    url: SITE_URL,
    siteName: SITE_TITLE,
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    locale: SITE_LOCALE,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // next-themes writes the theme class here before paint.
      suppressHydrationWarning
      className={cn("h-full", geistSans.variable, geistMono.variable, instrumentSans.variable)}
    >
      <body className="min-h-full antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-foreground focus:px-3 focus:py-2 focus:text-xs focus:text-background"
            >
              Skip to content
            </a>

            {/*
              SocialLinks is passed as a slot, not imported by the sidebar:
              it renders `DATA.socials[].icon` component references, which
              cannot be serialised across a client boundary.
            */}
            <SiteSidebar
              monogram={getInitials()}
              fullName={getFullName()}
              headline={getPrimaryHeadline()}
              socialLinks={<SocialLinks variant="icon" />}
            />

            {/* Clears the fixed rail, which is out of flow from `lg` up. */}
            <div className="flex min-h-dvh flex-col lg:pl-56">
              <main id="main" className="flex-1">
                {children}
              </main>

              <SiteFooter />
            </div>

            {/* Serializable props only — DATA.socials[].icon cannot cross this boundary. */}
            <CommandPalette
              email={DATA.contact.email}
              resumeHref={RESUME_PATH}
              socials={DATA.socials.map((social) => ({
                label: social.label,
                url: toExternalUrl(social.url),
              }))}
            />

            <Toaster position="bottom-right" />
          </TooltipProvider>
        </ThemeProvider>

        <Analytics />
      </body>
    </html>
  );
}
