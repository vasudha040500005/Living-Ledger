import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "De`Sign | Premium Interior Design",
  description:
    "Transform your space with timeless elegance.Interior design services for residential and commercial spaces.",
  keywords: "interior design, home decor, furniture, space design, luxury interiors",
  openGraph: {
    title: "De`Sign | Premium Interior Design",
    description: "Transform your space with timeless elegance.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-cream-50 antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
