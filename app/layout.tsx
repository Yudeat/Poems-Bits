
import type { Metadata } from "next";
import { Geist, Geist_Mono ,Playfair_Display} from "next/font/google";
import "./globals.css";
import ThemeClientWrapper from "./ThemeWrapper";


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
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeClientWrapper>
          { children}
        </ThemeClientWrapper>
      </body>
    </html>
  );
}
