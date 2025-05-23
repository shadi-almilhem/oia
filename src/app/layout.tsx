import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/header";
import WhatsAppButton from "./components/WhatsAppButton";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Oia Properties - Real Estate Agency in Abu Dhabi and Dubai",
  description:
    "OIA Properties is a leading and award-winning real estate agency in Abu Dhabi and Dubai, offering premium homes across the UAE. Get your free consultation today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} antialiased`}>
        <Header />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
