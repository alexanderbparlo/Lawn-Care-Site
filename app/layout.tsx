import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GreenCut Lawn Services",
  description: "Professional residential lawn care — mowing, edging, and leaf blowing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
