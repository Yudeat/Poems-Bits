
import type { Metadata } from "next";
import { Geist, Geist_Mono ,Playfair_Display} from "next/font/google";
import "./globals.css";
import ThemeClientWrapper from "./ThemeWrapper";
import {
  ClerkProvider,

} from '@clerk/nextjs'

const playfair = Playfair_Display({
  weight: "700",
  subsets: ["latin"],
  variable: "--font-playfair",
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
  title: "Poems Bits ",
  description: "A app where you are the writer and poet of your own",
    icons: {
    icon: "/logo.png",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
           <body>

        <ThemeClientWrapper>
            { children}
        </ThemeClientWrapper>
      </body>
    </html>
    </ClerkProvider>
  );
}
