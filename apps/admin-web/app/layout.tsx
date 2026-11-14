import type { Metadata, Viewport } from "next";
import "./globals.css";
import Commander from "@/components/commander/Commander";

export const metadata: Metadata = {
  title: {
    default: "RIQABAH Commander",
    template: "%s | RIQABAH Commander",
  },
  description:
    "RIQABAH Commander — Saudi Halal Slaughter Intelligence and Operations Command Center.",
  applicationName: "RIQABAH Commander",
  authors: [{ name: "RIQABAH" }],
  creator: "RIQABAH",
  publisher: "RIQABAH",
  keywords: [
    "RIQABAH",
    "Halal Slaughter Intelligence",
    "Halal Operations",
    "Halal Compliance",
    "Traceability",
    "Food Safety",
    "Saudi Arabia",
  ],
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/images/favicon.ico",
    shortcut: "/images/favicon.ico",
    apple: "/images/favicon.ico",
  },
  openGraph: {
    type: "website",
    title: "RIQABAH Commander",
    description:
      "RIQABAH Commander — Saudi Halal Slaughter Intelligence and Operations Command Center.",
    siteName: "RIQABAH Commander",
    locale: "ar_SA",
  },
  twitter: {
    card: "summary",
    title: "RIQABAH Commander",
    description:
      "RIQABAH Commander — Saudi Halal Slaughter Intelligence and Operations Command Center.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
  themeColor: "#07553A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <body>
        <Commander>
          {children}
        </Commander>
      </body>
    </html>
  );
}
