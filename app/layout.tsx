import "./globals.css";
export const metadata = {
  title: "온패밀리런 | 의사가 만드는 AI 소아 건강 플랫폼",
  description: "가정의학과 전문의가 설계하고, AI 팀이 실행합니다. 부모가 아이의 건강을 이해하고 올바르게 대처하는 세상.",
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
