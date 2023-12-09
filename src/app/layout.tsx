import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Header } from "@/components/ui/contents/Header";
import { AuthProvider } from "@/hooks/useAuth";
import { ModalProvider } from "@/hooks/useModal";
import { SlideInProvider } from "@/hooks/useSlideIn";
import "@/styles/globals.css";

const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";
const TITLE = "PayHistory";
const DESCRIPTION =
  "Keep your household finances in check with real-time budget tracking.";

export const metadata: Metadata = {
  metadataBase: new URL(NEXT_PUBLIC_URL),
  icons: { icon: "/favicon.svg", apple: "/icon-180.png" },
  title: {
    template: `%s | ${TITLE}`,
    default: TITLE,
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: NEXT_PUBLIC_URL,
    title: TITLE,
    description: DESCRIPTION,
    siteName: TITLE,
    images: [{ url: `${NEXT_PUBLIC_URL}/img/ogp.png` }],
  },
  twitter: {
    card: "summary_large_image",
  },
  applicationName: TITLE,
  appleWebApp: {
    capable: true,
    title: TITLE,
    statusBarStyle: "default",
  },
  formatDetection: { telephone: false },
  manifest: `${NEXT_PUBLIC_URL}/manifest.json`,
};

export const viewport: Viewport = {
  themeColor: "#fff",
  viewportFit: "cover",
  initialScale: 1.0,
  width: "device-width",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <Script
        id="logo"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            url: NEXT_PUBLIC_URL,
            logo: `${NEXT_PUBLIC_URL}/icon-512.png`,
          }),
        }}
      />
      <body className="dark:bg-gray-950 dark:text-gray-300">
        <AuthProvider>
          <ModalProvider>
            <SlideInProvider>
              <Header />
              <main className="mx-auto max-w-2xl font-light">{children}</main>
            </SlideInProvider>
          </ModalProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
