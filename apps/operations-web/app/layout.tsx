import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "RIQABAH Operations",
    template: "%s | RIQABAH Operations",
  },
  description:
    "RIQABAH Operations — RPH and halal slaughter operational command center.",
  applicationName: "RIQABAH Operations",
  authors: [{ name: "RIQABAH" }],
  creator: "RIQABAH",
  publisher: "RIQABAH",
  robots: {
    index: false,
    follow: false,
  },
  icons: {
    icon: "/logo.png",
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}


