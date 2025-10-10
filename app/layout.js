import { Inter } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import AnalyticsWrapper from "./components/Analytics";
import StructuredData from "./components/StructuredData";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Mohammed Mesoud | Full Stack Developer",
  description:
    "Personal portfolio of Mohammed Mesoud, a passionate Full Stack Developer building modern web experiences",
  keywords:
    "Full Stack Developer, Web Developer, React, Next.js, Portfolio, JavaScript, TypeScript, Mohammed Mesoud",
  authors: [{ name: "Mohammed Mesoud" }],
  creator: "Mohammed Mesoud",
  publisher: "Mohammed Mesoud",
  openGraph: {
    title: "Mohammed Mesoud | Full Stack Developer",
    description:
      "Personal portfolio of Mohammed Mesoud, a passionate Full Stack Developer building modern web experiences",
    type: "website",
    locale: "en_US",
    url: "https://your-portfolio-url.com",
    siteName: "Mohammed Mesoud Portfolio",
    images: [
      {
        url: "https://your-portfolio-url.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mohammed Mesoud Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Mesoud | Full Stack Developer",
    description:
      "Personal portfolio of Mohammed Mesoud, a passionate Full Stack Developer building modern web experiences",
    creator: "@yourtwitterhandle",
    images: ["https://your-portfolio-url.com/twitter-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://your-portfolio-url.com",
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetBrainsMono.variable} antialiased transition-colors duration-300 font-sans`}
      >
        <StructuredData />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          storageKey="theme-preference"
        >
          {children}
          <AnalyticsWrapper />
        </ThemeProvider>
      </body>
    </html>
  );
}
