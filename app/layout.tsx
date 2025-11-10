import type { Metadata } from "next";
import "./globals.css";

import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import ThemeClientWrapper from "./ThemeWrapper";
import { ClerkProvider } from "@clerk/nextjs";

const playfair = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-playfair",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Poems Bits",
  description: "An app where you are the writer and poet of your own",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${playfair.variable} ${geistSans.variable} ${geistMono.variable}`}
      >
        <body>
          <ThemeClientWrapper>{children}

          
          </ThemeClientWrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
