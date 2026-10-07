import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";
import { getSiteConfig } from "@/lib/content";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const site = getSiteConfig();

export const metadata: Metadata = {
    metadataBase: new URL(site.url),
    title: { default: site.name, template: `%s | ${site.name}` },
    description: site.slogan,
    openGraph: {
        type: "website",
        siteName: site.name,
        title: site.name,
        description: site.slogan,
        images: [{ url: site.ogImage, width: 1200, height: 630 }],
    },
    twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning is required by next-themes
      <html
          lang="en"
          suppressHydrationWarning
          className={`${geistSans.variable} ${geistMono.variable}`}
      >
      <body className="font-sans antialiased">
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
              <SmoothScroll>
                  <div className="flex min-h-screen flex-col">
                      <SiteHeader />
                      <main className="flex-1">{children}</main>
                      <SiteFooter />
                  </div>
              </SmoothScroll>
              <Toaster />
          </ThemeProvider>
      </body>
    </html>
  );
}