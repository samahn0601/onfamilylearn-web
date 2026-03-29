import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://onfamilylearn-web.vercel.app"),
  title: "온패밀리런 | 의사가 만드는 부모 교육 플랫폼",
  description:
    "가정의학과 전문의가 직접 검증한 의료 정보로, 부모가 아이의 건강 문제를 이해하고 올바르게 대처할 수 있도록 돕습니다. 300만+ 아이의 부모가 선택한 열나요 앱을 만든 전문의가 AI와 함께 부모 교육의 새로운 기준을 세웁니다.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "온패밀리런(Onfamily Learn) | 의사가 만드는 부모 교육 플랫폼",
    description:
      "1980년 처음 보고된 열 공포(Fever Phobia) — 45년간 해결되지 않은 문제를, 의사가 직접, AI와 함께 풉니다.",
    url: "https://onfamilylearn-web.vercel.app",
    siteName: "Onfamily Learn",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "온패밀리런 - 의사가 만드는 부모 교육 플랫폼",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "온패밀리런 | 의사가 만드는 부모 교육 플랫폼",
    description:
      "가정의학과 전문의 + AI 에이전트 팀이 만드는 소아 건강 부모 교육 플랫폼",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
