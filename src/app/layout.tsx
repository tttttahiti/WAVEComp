import type { Metadata } from "next";
import { DM_Sans, DM_Mono, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { MenuProvider } from "@/components/MenuContext";
import { SoundProvider } from "@/components/SoundContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PageWrapper } from "@/components/PageWrapper";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "WA/VE",
  description: "音のある時間を豊かに、緻密に、そして大胆に。心に響く音や体験をつくりだします。",
  icons: {
    icon: [
      { url: "/icon_light.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon_dark.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${dmSans.variable} ${dmMono.variable} ${notoSansJP.variable} antialiased bg-white`}>
        <MenuProvider>
          <SoundProvider>
            {/* Side Menu */}
            <Header />

            {/* Main Content - Shrinks when menu opens */}
            <PageWrapper>
              <main>{children}</main>
              <Footer />
            </PageWrapper>
          </SoundProvider>
        </MenuProvider>
      </body>
    </html>
  );
}
