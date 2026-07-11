import { Geist, Geist_Mono } from "next/font/google";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SiteShell from "@/components/SiteShell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  // og:image 등 상대 경로 메타데이터를 절대 URL로 만들 때 기준이 되는 값.
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "테스트할개 - MBTI 궁합부터 감정심리까지",
  description: "MBTI 궁합, 테토-에겐, HSP, 애착유형, 감다살까지 나를 알아가는 테스트 모음",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <div className="appFrame">
          <SiteHeader />
          <SiteShell>{children}</SiteShell>
          <SiteFooter />
        </div>
        <GoogleAnalytics />
      </body>
    </html>
  );
}
