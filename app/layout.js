import localFont from "next/font/local";
import "./globals.css";
import { site } from "@/lib/content";

const font = localFont({ src: "./fonts/PlusJakartaSans-Variable.woff2", weight: "200 800", variable: "--font", display: "swap" });

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: `${site.name} — IT Engineer Portfolio`,
  description: site.tagline,
  openGraph: { title: `${site.name} — IT Engineer`, description: site.tagline, type: "website" },
};

export const viewport = { themeColor: "#050505" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={font.variable}>
      <body>
        {/* Shared gradient used by outlined icons */}
        <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
          <defs>
            <linearGradient id="grad-icon" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#8f8f8f" />
            </linearGradient>
          </defs>
        </svg>
        {children}
        <noscript><style>{"[data-reveal]{opacity:1!important;transform:none!important}"}</style></noscript>
      </body>
    </html>
  );
}
