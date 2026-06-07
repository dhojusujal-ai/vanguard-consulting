import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vanguardconsulting.com.np"),
  title: {
    default: "Vanguard Consulting Nepal | Study Abroad Consultancy in Kathmandu",
    template: "%s | Vanguard Consulting Nepal",
  },
  description:
    "Vanguard Consulting is Kathmandu's trusted study abroad consultancy. We help Nepali students get admitted to universities in Australia, Canada, UK, USA, India, and Bangladesh — with honest counseling, complete documentation support, and strong visa guidance.",
  keywords: [
    "study abroad consultancy Nepal",
    "study abroad Kathmandu",
    "Australia student visa Nepal",
    "Canada study permit Nepal",
    "UK student visa Nepal",
    "USA F1 visa Nepal",
    "IELTS preparation Kathmandu",
    "PTE classes Nepal",
    "MBBS Bangladesh Nepal",
    "education consultancy Kamaladi",
    "best consultancy Nepal",
    "abroad study Nepal 2026",
  ],
  openGraph: {
    title: "Vanguard Consulting Nepal — Study Abroad Guidance from Kathmandu",
    description:
      "Helping Nepali students find the right university, prepare strong applications, and secure their visas for Australia, Canada, UK, USA, India, and Bangladesh.",
    url: "https://vanguardconsulting.com.np",
    siteName: "Vanguard Consulting Nepal",
    locale: "en_NP",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
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
