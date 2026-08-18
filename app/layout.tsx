import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";

import { CommandTerminal } from "@/components/terminal/command-terminal";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { SmoothScroll } from "@/components/site/smooth-scroll";
import { TooltipProvider } from "@/components/ui/tooltip";

import "./globals.css";

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

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://thealphacubicle.dev"),
  title: {
    default: "Srihari Raman",
    template: "%s | Srihari Raman",
  },
  description:
    "Srihari Raman — SWE @ JP Morgan. Engineer in Wilmington.",
  icons: {
    icon: [{ url: "/logo.png", type: "image/png" }],
    apple: "/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0A",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${manrope.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        <SmoothScroll>
          <TooltipProvider>
            <SiteHeader />
            <div className="flex-1">{children}</div>
            <SiteFooter />
            <CommandTerminal />
          </TooltipProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
