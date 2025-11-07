
import type { Metadata } from "next";
import { Geist, Geist_Mono ,Playfair_Display} from "next/font/google";
import "./globals.css";
import ThemeClientWrapper from "./ThemeWrapper";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <head>
      <title>Poems Bits
         </title>
 <link rel="icon" href="/logo.png" type="image/png" />      </head>
      <body>
        <ThemeClientWrapper>
          { children}
        </ThemeClientWrapper>
      </body>
    </html>
    </ClerkProvider>
  );
}
