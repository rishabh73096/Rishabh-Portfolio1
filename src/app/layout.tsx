import Navbar from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiteStructuredData } from "@/components/structured-data";
import { ServiceWorkerRegistration } from "@/components/service-worker-registration";
import { OfflineBanner } from "@/components/offline-banner";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { Inter as FontSans, JetBrains_Mono as FontMono } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = FontMono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const SEO_TITLE = `${DATA.name} | Full Stack Developer (React, Next.js, Node.js)`;
const SEO_DESCRIPTION = `Full Stack Developer based in ${DATA.location} building React, Next.js, Node.js and MongoDB web apps, REST APIs and SaaS platforms. Available for freelance, contract and remote work.`;

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: SEO_TITLE,
    template: `%s | ${DATA.name}`,
  },
  description: SEO_DESCRIPTION,
  keywords: [
    "Full Stack Developer",
    "Full Stack Developer India",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "MERN Stack Developer",
    "Freelance Web Developer India",
    "Hire Full Stack Developer",
  ],
  authors: [{ name: DATA.name, url: DATA.url }],
  creator: DATA.name,
  publisher: DATA.name,
  category: "technology",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    url: DATA.url,
    siteName: DATA.name,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: SEO_TITLE,
    description: SEO_DESCRIPTION,
    card: "summary_large_image",
    creator: "@Rishabh__73",
  },
  verification: {
    google: "Rmz8wtgyC2LPy8m4wjL9nBt0Wry8kqBMM0VRMDFRUMc",
    yandex: "",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable
        )}
      >
        <SiteStructuredData />
        <ServiceWorkerRegistration />
        <ThemeProvider attribute="class" defaultTheme="dark">
          <TooltipProvider delayDuration={0}>
            <OfflineBanner />
            <div className="mx-auto w-full max-w-4xl px-6 py-8 sm:py-12">
              <Navbar />
              {children}
              <Footer />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
