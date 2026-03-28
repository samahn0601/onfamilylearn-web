"use client";
import { useState, useEffect, useRef } from "react";

const COLORS = {
  cream: "#FBF8F3",
  warmWhite: "#FEFCF9",
  sage: "#4A6741",
  sageMuted: "#6B8C62",
  sageLight: "#E8F0E4",
  coral: "#D85A30",
  coralLight: "#FAECE7",
  navy: "#1A2332",
  navyMuted: "#2D3A4A",
  warmGray: "#6B6560",
  lightGray: "#F0EDE8",
  border: "#E0DBD4",
  gold: "#BA7517",
  goldLight: "#FAEEDA",
};

const FONTS = {
  display: `'Noto Serif KR', 'Georgia', serif`,
  body: `'Pretendard', -apple-system, 'Segoe UI', sans-serif`,
  mono: `'JetBrains Mono', 'Fira Code', monospace`,
};

const NAV_ITEMS = [
  { id: "hero", label: "홈" },
  { id: "mission", label: "미션" },
  { id: "services", label: "서비스" },
  { id: "team", label: "팀" },
  { id: "approach", label: "기술" },
  { id: "contact", label: "문의" },
];

const TEAM = [
  {
    name: "안상현",
    nameEn: "Sam Ahn",
    role: "Founder & 대표",
    badge: "가정의학과 전문의",
    color: COLORS.coral,
    colorLight: COLORS.coralLight,
    desc: "모바일닥터 CMO(최고의료책임자). '열나요' 앱 개발자. 200만+ 부모가 사용하는 소아 열관리 서비스를 만든 경험을 바탕으로, AI 기반 부모 교육 플랫폼을 창업합니다.",
    isHuman: true,
    img: "/team/sam.png",
  },
  {
    name: "레나",
    nameEn: "Lena",
    role: "CEO",
    badge: "AI Agent",
    color: "#534AB7",
    colorLight: "#EEEDFE",
    desc: "전략과 경영 총괄. 팀 조율과 사업 방향을 잡습니다.",
    img: "/team/lena.png",
  },
  {
    name: "하나",
    nameEn: "Hana",
    role: "COO",
    badge: "AI Agent",
    color: "#0F6E56",
    colorLight: "#E1F5EE",
    desc: "운영과 스프린트 관리. 꼼꼼하게 모든 태스크를 추적합니다.",
    img: "/team/hana.png",
  },
  {
    name: "유리",
    nameEn: "Yuri",
    role: "CMO",
    badge: "AI Agent",
    color: "#D4537E",
    colorLight: "#FBEAF0",
    desc: "마케팅과 콘텐츠 전략. 부모님들에게 신뢰를 전달합니다.",
    img: "/team/yuri.png",
  },
  {
    name: "서윤",
    nameEn: "Seoyun",
    role: "Medical Editor",
    badge: "AI Agent",
    color: "#185FA5",
    colorLight: "#E6F1FB",
    desc: "의료 콘텐츠 검증과 SSOT 관리. 정확성에 타협하지 않습니다.",
    img: "/team/seoyun.png",
  },
  {
    name: "지수",
    nameEn: "Jisu",
    role: "CTO",
    badge: "AI Agent",
    color: "#BA7517",
    colorLight: "#FAEEDA",
    desc: "기술 아키텍처와 인프라. 팩트 기반으로 기술을 설계합니다.",
    img: "/team/jisu.png",
  },
  {
    name: "민지",
    nameEn: "Minji",
    role: "CFO",
    badge: "AI Agent",
    color: "#3B6D11",
    colorLight: "#EAF3DE",
    desc: "예산과 사업비 관리. 숫자 앞에서 타협하지 않습니다.",
    img: "/team/minji.png",
  },
];

const SERVICES = [
  {
    name: "열나요",
    tagline: "오늘 밤, 아이의 열을 해결합니다",
    desc: "2017년 출시 이후 200만 이상의 부모가 선택한 소아 발열 관리 앱. 체중 기반 해열제 용량 계산, 교차 복용 경고, 열 패턴 추적까지. 6,000만 건의 체온 데이터와 2,000만 건의 해열제 복용 데이터가 축적된 국내 최대 소아 열관리 플랫폼입니다.",
    features: ["체중 기반 해열제 용량 자동 계산", "교차 복용 경고 및 하루 허용량 관리", "열 패턴 추적 및 재진료 알림", "독감 스크리닝 AI 모델 (빅데이터 기반)"],
    color: COLORS.coral,
    colorLight: COLORS.coralLight,
    icon: "🌡️",
    status: "2017~ · 200만+ 다운로드 · 서비스 운영 중",
    note: "모바일닥터에서 운영 중인 서비스입니다. 온패밀리런과 시너지 파트너십을 구축합니다.",
  },
  {
    name: "OnFamily Learn",
    tagline: "다음 10년의 부모 역량을 만듭니다",
    desc: "의사가 직접 만든 부모 교육 플랫폼. 아이 건강 문제를 이해하고 대처하는 능력을 키우는 체계적인 학습 콘텐츠. 독감, 해열제, 예방접종부터 응급 상황까지. 열나요의 실시간 대응 경험을 교육으로 확장합니다.",
    features: ["전문의 검증 Wiki 콘텐츠", "상황별 의사결정 가이드", "SSOT 기반 AI 학습 — 환각 차단", "연령맞춤 건강 캘린더"],
    color: COLORS.sage,
    colorLight: COLORS.sageLight,
    icon: "📚",
    status: "콘텐츠 구축 중 · 창업 준비 단계",
    note: null,
  },
];

const RULES = [
  { icon: "🛡️", title: "SSOT 기반", desc: "모든 의료 정보는 전문의가 검증한 단일 진실 소스에서만 제공됩니다" },
  { icon: "🚫", title: "AI 환각 차단", desc: "SSOT에 없는 의료 정보는 AI가 절대 스스로 생성하지 못합니다" },
  { icon: "⚕️", title: "전문의 최종 승인", desc: "약물 용량, 금기, 응급 판단은 반드시 전문의 검증을 거칩니다" },
  { icon: "🔒", title: "의료 절대 규칙", desc: "8대 안전 규칙이 시스템 최상위에 하드코딩되어 있습니다" },
];

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(28px)",
      transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function Nav({ active }) {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(251,248,243,0.92)", backdropFilter: "blur(12px)",
      borderBottom: `1px solid ${COLORS.border}`,
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 clamp(16px, 4vw, 48px)", height: 56,
      fontFamily: FONTS.body,
    }}>
      <a href="#hero" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 20 }}>🏥</span>
        <span style={{ fontFamily: FONTS.display, fontWeight: 700, fontSize: 17, color: COLORS.navy, letterSpacing: -0.5 }}>온패밀리런</span>
      </a>
      <div style={{ display: "flex", gap: 4 }}>
        {NAV_ITEMS.map(n => (
          <a key={n.id} href={`#${n.id}`} style={{
            textDecoration: "none", padding: "6px 12px", borderRadius: 6,
            fontSize: 13, fontWeight: 500, letterSpacing: -0.2,
            color: active === n.id ? COLORS.sage : COLORS.warmGray,
            background: active === n.id ? COLORS.sageLight : "transparent",
            transition: "all 0.2s",
          }}>{n.label}</a>
        ))}
      </div>
    </nav>
  );
}

function HeroSection() {
  return (
    <section id="hero" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", alignItems: "center", textAlign: "center",
      padding: "100px clamp(20px, 5vw, 80px) 60px",
      background: `linear-gradient(180deg, ${COLORS.cream} 0%, ${COLORS.warmWhite} 100%)`,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", top: "12%", right: "8%", width: 280, height: 280,
        borderRadius: "50%", background: COLORS.sageLight, opacity: 0.4, filter: "blur(60px)",
      }}/>
      <div style={{
        position: "absolute", bottom: "15%", left: "5%", width: 200, height: 200,
        borderRadius: "50%", background: COLORS.coralLight, opacity: 0.3, filter: "blur(50px)",
      }}/>
      <FadeIn>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "6px 16px", borderRadius: 20,
          background: COLORS.goldLight, border: `1px solid ${COLORS.gold}33`,
          fontSize: 13, fontFamily: FONTS.body, fontWeight: 500, color: COLORS.gold,
          marginBottom: 28,
        }}>
          MoDoc AI · 의사가 만드는 AI 헬스케어
        </div>
      </FadeIn>
      <FadeIn delay={0.1}>
        <h1 style={{
          fontFamily: FONTS.display, fontSize: "clamp(32px, 5vw, 56px)",
          fontWeight: 700, color: COLORS.navy, lineHeight: 1.25,
          letterSpacing: -1.5, margin: "0 0 24px",
          maxWidth: 700,
        }}>
          45년간 해결되지 않은<br/>문제를, 의사가 직접,<br/>AI와 함께 풉니다
        </h1>
      </FadeIn>
      <FadeIn delay={0.2}>
        <p style={{
          fontFamily: FONTS.body, fontSize: 17, lineHeight: 1.7,
          color: COLORS.warmGray, maxWidth: 540, margin: "0 0 40px",
        }}>
          200만 부모가 선택한 '열나요' 앱을 만든 가정의학과 전문의가<br/>
          AI 에이전트 팀과 함께 부모 교육의 새로운 기준을 세웁니다.
        </p>
      </FadeIn>
      <FadeIn delay={0.3}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <a href="#services" style={{
            padding: "14px 32px", borderRadius: 10,
            background: COLORS.sage, color: "#fff",
            fontFamily: FONTS.body, fontSize: 15, fontWeight: 600,
            textDecoration: "none", letterSpacing: -0.3,
            boxShadow: `0 4px 16px ${COLORS.sage}33`,
          }}>서비스 보기</a>
          <a href="#team" style={{
            padding: "14px 32px", borderRadius: 10,
            background: "transparent", color: COLORS.sage,
            fontFamily: FONTS.body, fontSize: 15, fontWeight: 600,
            textDecoration: "none", letterSpacing: -0.3,
            border: `1.5px solid ${COLORS.sage}44`,
          }}>팀 소개</a>
        </div>
      </FadeIn>
    </section>
  );
}

function MissionSection() {
  return (
    <section id="mission" style={{
      padding: "100px clamp(20px, 5vw, 80px)",
      background: COLORS.warmWhite,
    }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <FadeIn>
          <p style={{
            fontFamily: FONTS.body, fontSize: 12, fontWeight: 600,
            textTransform: "uppercase", letterSpacing: 2,
            color: COLORS.sage, marginBottom: 16,
          }}>Our Mission</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{
            fontFamily: FONTS.display, fontSize: "clamp(26px, 3.5vw, 40px)",
            fontWeight: 700, color: COLORS.navy, lineHeight: 1.35,
            letterSpacing: -1, marginBottom: 32,
          }}>
            부모가 겪는 소아 건강 정보의<br/>비대칭을 해소합니다
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{
            fontFamily: FONTS.body, fontSize: 16, lineHeight: 1.8,
            color: COLORS.warmGray, marginBottom: 20,
          }}>
            한밤중 아이가 열이 날 때, 부모는 검색 결과와 커뮤니티 글 사이에서 불안합니다.
            검증되지 않은 정보가 넘치고, 정작 필요한 정확한 의료 지식은 찾기 어렵습니다.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <p style={{
            fontFamily: FONTS.body, fontSize: 16, lineHeight: 1.8,
            color: COLORS.warmGray, marginBottom: 40,
          }}>
            온패밀리런은 가정의학과 전문의가 직접 검증한 의료 정보만을 기반으로,
            부모가 아이의 건강 문제를 이해하고 올바르게 대처할 수 있도록 돕습니다.
            '열나요' 앱으로 10년간 쌓은 실전 경험과 데이터를 교육으로 확장합니다.
          </p>
        </FadeIn>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {RULES.map((r, i) => (
            <FadeIn key={i} delay={0.1 * i}>
              <div style={{
                padding: "24px 20px", borderRadius: 12,
                background: COLORS.cream, border: `1px solid ${COLORS.border}`,
              }}>
                <div style={{ fontSize: 24, marginBottom: 12 }}>{r.icon}</div>
                <p style={{ fontFamily: FONTS.body, fontWeight: 600, fontSize: 14, color: COLORS.navy, marginBottom: 6 }}>{r.title}</p>
                <p style={{ fontFamily: FONTS.body, fontSize: 13, color: COLORS.warmGray, lineHeight: 1.6 }}>{r.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" style={{
      padding: "100px clamp(20px, 5vw, 80px)",
      background: COLORS.cream,
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <p style={{
            fontFamily: FONTS.body, fontSize: 12, fontWeight: 600,
            textTransform: "uppercase", letterSpacing: 2,
            color: COLORS.sage, marginBottom: 16,
          }}>Services</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{
            fontFamily: FONTS.display, fontSize: "clamp(26px, 3.5vw, 40px)",
            fontWeight: 700, color: COLORS.navy, lineHeight: 1.35,
            letterSpacing: -1, marginBottom: 48,
          }}>
            실시간 대응에서 장기 교육까지<br/>소아 건강의 모든 순간을 커버합니다
          </h2>
        </FadeIn>
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {SERVICES.map((s, i) => (
            <FadeIn key={i} delay={0.1 * i}>
              <div style={{
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0,
                borderRadius: 16, overflow: "hidden",
                border: `1px solid ${COLORS.border}`,
                background: COLORS.warmWhite,
              }}>
                <div style={{ padding: "36px 32px" }}>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 8,
                    padding: "4px 12px", borderRadius: 6,
                    background: s.colorLight, fontSize: 12,
                    fontFamily: FONTS.body, fontWeight: 600, color: s.color,
                    marginBottom: 16,
                  }}>
                    {s.icon} {s.status}
                  </div>
                  <h3 style={{
                    fontFamily: FONTS.display, fontSize: 26, fontWeight: 700,
                    color: COLORS.navy, marginBottom: 6, letterSpacing: -0.5,
                  }}>{s.name}</h3>
                  <p style={{
                    fontFamily: FONTS.body, fontSize: 15, fontWeight: 500,
                    color: s.color, marginBottom: 16,
                  }}>{s.tagline}</p>
                  <p style={{
                    fontFamily: FONTS.body, fontSize: 14, lineHeight: 1.7,
                    color: COLORS.warmGray, marginBottom: s.note ? 12 : 0,
                  }}>{s.desc}</p>
                  {s.note && (
                    <p style={{
                      fontFamily: FONTS.body, fontSize: 12, lineHeight: 1.5,
                      color: COLORS.sageMuted, fontStyle: "italic",
                      padding: "8px 12px", borderRadius: 6,
                      background: COLORS.sageLight,
                    }}>{s.note}</p>
                  )}
                </div>
                <div style={{
                  padding: "36px 28px",
                  background: s.colorLight,
                  display: "flex", flexDirection: "column", justifyContent: "center",
                }}>
                  {s.features.map((f, j) => (
                    <div key={j} style={{
                      display: "flex", alignItems: "flex-start", gap: 10,
                      marginBottom: j < s.features.length - 1 ? 14 : 0,
                    }}>
                      <span style={{
                        width: 20, height: 20, borderRadius: "50%",
                        background: s.color, color: "#fff",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1,
                      }}>{j + 1}</span>
                      <span style={{
                        fontFamily: FONTS.body, fontSize: 14, fontWeight: 500,
                        color: COLORS.navyMuted, lineHeight: 1.5,
                      }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function TeamSection() {
  const [selected, setSelected] = useState(null);
  return (
    <section id="team" style={{
      padding: "100px clamp(20px, 5vw, 80px)",
      background: COLORS.warmWhite,
    }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <FadeIn>
          <p style={{
            fontFamily: FONTS.body, fontSize: 12, fontWeight: 600,
            textTransform: "uppercase", letterSpacing: 2,
            color: COLORS.sage, marginBottom: 16,
          }}>Team</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{
            fontFamily: FONTS.display, fontSize: "clamp(26px, 3.5vw, 40px)",
            fontWeight: 700, color: COLORS.navy, lineHeight: 1.35,
            letterSpacing: -1, marginBottom: 12,
          }}>
            전문의 1명 + AI 에이전트 6명
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{
            fontFamily: FONTS.body, fontSize: 16, lineHeight: 1.7,
            color: COLORS.warmGray, marginBottom: 48, maxWidth: 560,
          }}>
            의료 전문성은 사람이, 실행은 AI가. 각 에이전트는 고유한 역할과 성격을 가지고 협업합니다.
          </p>
        </FadeIn>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 16,
        }}>
          {TEAM.map((m, i) => (
            <FadeIn key={i} delay={0.05 * i}>
              <div
                onClick={() => setSelected(selected === i ? null : i)}
                style={{
                  padding: 24, borderRadius: 14,
                  background: selected === i ? m.colorLight : COLORS.cream,
                  border: `1.5px solid ${selected === i ? m.color + "44" : COLORS.border}`,
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  transform: selected === i ? "translateY(-2px)" : "none",
                  boxShadow: selected === i ? `0 8px 24px ${m.color}15` : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <img
                    src={m.img}
                    alt={m.name}
                    style={{
                      width: 56, height: 56, borderRadius: 14,
                      objectFit: "cover",
                      border: `2px solid ${m.color}22`,
                    }}
                  />
                  <div>
                    <p style={{
                      fontFamily: FONTS.body, fontWeight: 700, fontSize: 15,
                      color: COLORS.navy, marginBottom: 2,
                    }}>{m.name}</p>
                    <p style={{
                      fontFamily: FONTS.body, fontSize: 12, color: COLORS.warmGray,
                    }}>{m.nameEn} · {m.role}</p>
                  </div>
                </div>
                <div style={{
                  display: "inline-block", padding: "3px 10px", borderRadius: 5,
                  background: m.isHuman ? m.color : m.color + "18",
                  fontSize: 11, fontWeight: 600,
                  fontFamily: FONTS.body,
                  color: m.isHuman ? "#fff" : m.color,
                  marginBottom: 12,
                }}>{m.badge}</div>
                <p style={{
                  fontFamily: FONTS.body, fontSize: 13, lineHeight: 1.6,
                  color: COLORS.warmGray,
                }}>{m.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ApproachSection() {
  return (
    <section id="approach" style={{
      padding: "100px clamp(20px, 5vw, 80px)",
      background: COLORS.navy,
    }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <FadeIn>
          <p style={{
            fontFamily: FONTS.body, fontSize: 12, fontWeight: 600,
            textTransform: "uppercase", letterSpacing: 2,
            color: COLORS.sageMuted, marginBottom: 16,
          }}>Technical Approach</p>
        </FadeIn>
        <FadeIn delay={0.1}>
          <h2 style={{
            fontFamily: FONTS.display, fontSize: "clamp(26px, 3.5vw, 40px)",
            fontWeight: 700, color: "#fff", lineHeight: 1.35,
            letterSpacing: -1, marginBottom: 36,
          }}>
            AI가 '모르는 것'을 아는 것이<br/>의료 AI의 핵심입니다
          </h2>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p style={{
            fontFamily: FONTS.body, fontSize: 16, lineHeight: 1.8,
            color: "#9BA3AE", marginBottom: 48,
          }}>
            일반 AI 챗봇은 없는 정보도 그럴듯하게 만들어냅니다.
            의료 정보에서 이것은 치명적입니다.
            온패밀리런은 SSOT 기반 하이브리드 RAG 아키텍처로
            AI가 검증되지 않은 의료 정보를 생성하는 것을 원천 차단합니다.
          </p>
        </FadeIn>
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {[
            { step: "01", title: "의료 절대 규칙 하드코딩", desc: "약물 금기, 용량 한계, 응급 판단 등은 AI 추론을 거치지 않고 시스템 최상위에서 강제 적용됩니다." },
            { step: "02", title: "SSOT 벡터 검색", desc: "전문의가 검증한 의료 정보만 벡터 DB에 저장. 질문과 관련된 근거만 정확히 추출합니다." },
            { step: "03", title: "Fallback 안전장치", desc: "SSOT에서 충분한 근거를 찾지 못하면, AI가 답을 만들지 않고 '전문의 상담'을 안내합니다." },
            { step: "04", title: "용량 계산 분리", desc: "약물 용량은 LLM이 계산하지 않습니다. 별도 계산기 함수가 체중 기반으로 정확히 산출합니다." },
          ].map((s, i) => (
            <FadeIn key={i} delay={0.08 * i}>
              <div style={{
                display: "flex", gap: 20, padding: "28px 24px",
                borderRadius: 12,
                background: i % 2 === 0 ? "#1F2D3D" : "transparent",
              }}>
                <span style={{
                  fontFamily: FONTS.mono, fontSize: 13, fontWeight: 600,
                  color: COLORS.sage, flexShrink: 0, paddingTop: 2,
                }}>{s.step}</span>
                <div>
                  <p style={{
                    fontFamily: FONTS.body, fontWeight: 600, fontSize: 15,
                    color: "#E8E6E1", marginBottom: 6,
                  }}>{s.title}</p>
                  <p style={{
                    fontFamily: FONTS.body, fontSize: 14, lineHeight: 1.6,
                    color: "#7A8290",
                  }}>{s.desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" style={{
      padding: "80px clamp(20px, 5vw, 80px) 48px",
      background: COLORS.cream,
      textAlign: "center",
    }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <FadeIn>
          <h2 style={{
            fontFamily: FONTS.display, fontSize: 28, fontWeight: 700,
            color: COLORS.navy, marginBottom: 16, letterSpacing: -0.5,
          }}>함께 만들어갈 동료를 찾습니다</h2>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p style={{
            fontFamily: FONTS.body, fontSize: 15, lineHeight: 1.7,
            color: COLORS.warmGray, marginBottom: 32,
          }}>
            Founding CTO를 채용 중입니다.<br/>
            의료 AI의 정확성과 안전성에 진심인 엔지니어를 기다립니다.
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <a href="mailto:sam.ahn@modoc-ai.com" style={{
            display: "inline-block", padding: "14px 36px", borderRadius: 10,
            background: COLORS.sage, color: "#fff",
            fontFamily: FONTS.body, fontSize: 15, fontWeight: 600,
            textDecoration: "none",
            boxShadow: `0 4px 16px ${COLORS.sage}33`,
          }}>sam.ahn@modoc-ai.com</a>
        </FadeIn>
      </div>
      <div style={{
        marginTop: 64, paddingTop: 32,
        borderTop: `1px solid ${COLORS.border}`,
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12,
        fontFamily: FONTS.body, fontSize: 12, color: COLORS.warmGray,
      }}>
        <span>© 2026 MoDoc AI (온패밀리런). All rights reserved.</span>
        <span>열나요 서비스는 (주)모바일닥터에서 운영합니다.</span>
      </div>
    </section>
  );
}

export default function OnFamilyLearnHome() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const handler = () => {
      const sections = NAV_ITEMS.map(n => document.getElementById(n.id)).filter(Boolean);
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].getBoundingClientRect().top < 200) {
          setActive(NAV_ITEMS[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div style={{ background: COLORS.cream, minHeight: "100vh" }}>
      <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;700&display=swap" rel="stylesheet" />
      <Nav active={active} />
      <HeroSection />
      <MissionSection />
      <ServicesSection />
      <TeamSection />
      <ApproachSection />
      <ContactSection />
    </div>
  );
}
