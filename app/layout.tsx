import type { Metadata } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import { auth } from "@/auth";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "MeditationAstro – Vedic Astrology, Meditation & Spiritual Retreats in Nepal",
    template: "%s | MeditationAstro",
  },
  description: "Discover Vedic astrology consultations, Nishruti meditation courses, spiritual retreats in Nepal, and mantra practices with Niaadim. Serving seekers from Germany, France, Italy, Switzerland & USA.",
  keywords: ["Vedic astrology", "meditation Nepal", "Nishruti meditation", "Jyotish", "spiritual retreats Nepal", "mantra practice", "Niaadim", "astrology consultation", "meditation online course"],
  authors: [{ name: "Niaadim", url: "https://meditationastro.com" }],
  creator: "Niaadim – MeditationAstro",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://meditationastro.com",
    siteName: "MeditationAstro",
    title: "MeditationAstro – Vedic Astrology, Meditation & Spiritual Retreats",
    description: "Ancient Vedic wisdom for modern seekers. Astrology readings, Nishruti meditation, Nepal retreats.",
  },
  twitter: {
    card: "summary_large_image",
    title: "MeditationAstro – Sacred Wisdom for Self-Discovery",
    description: "Vedic astrology, Nishruti meditation, sacred Nepal retreats. Guided by Niaadim.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-17965073851"
          strategy="afterInteractive"
        />
        <Script id="google-ads" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17965073851');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
        <Providers session={session}>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
