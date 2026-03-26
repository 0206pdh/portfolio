'use client'

import { useEffect, useRef, useState } from 'react'

function useFadeIn() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

const SKILLS = [
  { label: 'AWS (EC2, S3, RDS, IAM)', category: 'Cloud' },
  { label: 'Docker', category: 'Cloud' },
  { label: 'Linux', category: 'Cloud' },
  { label: 'CI/CD', category: 'Cloud' },
  { label: 'Python', category: 'Backend' },
  { label: 'FastAPI', category: 'Backend' },
  { label: 'Node.js', category: 'Backend' },
  { label: 'Spring', category: 'Backend' },
  { label: 'PostgreSQL', category: 'Database' },
  { label: 'MySQL', category: 'Database' },
  { label: 'Redis', category: 'Database' },
  { label: 'TimescaleDB', category: 'Database' },
  { label: 'JavaScript', category: 'Language' },
  { label: 'TypeScript', category: 'Language' },
  { label: 'Java', category: 'Language' },
  { label: 'SQL', category: 'Language' },
  { label: 'LangGraph', category: 'AI/ML' },
  { label: 'OpenAI API', category: 'AI/ML' },
  { label: 'pgvector', category: 'AI/ML' },
]

const CAT_COLORS: Record<string, { bg: string; border: string; text: string }> = {
  Cloud:    { bg: 'rgba(40,100,200,0.18)',  border: 'rgba(80,150,240,0.35)',  text: '#90c0ff' },
  Backend:  { bg: 'rgba(80,50,200,0.18)',   border: 'rgba(120,90,240,0.35)', text: '#b090ff' },
  Database: { bg: 'rgba(20,130,150,0.18)',  border: 'rgba(40,180,200,0.35)', text: '#70d8e8' },
  Language: { bg: 'rgba(50,140,80,0.18)',   border: 'rgba(80,190,110,0.35)', text: '#80e0a0' },
  'AI/ML':  { bg: 'rgba(160,60,160,0.18)', border: 'rgba(200,90,200,0.35)', text: '#f090f0' },
}

export default function About() {
  const { ref, visible } = useFadeIn()

  return (
    <section
      id="about"
      ref={ref}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 24px',
      }}
    >
      <div
        style={{
          maxWidth: 900,
          width: '100%',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'opacity 0.9s ease, transform 0.9s ease',
        }}
      >
        {/* Section label */}
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#5080c0', marginBottom: 12 }}>
          About Me
        </p>
        <h2
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700,
            marginBottom: 48,
            background: 'linear-gradient(135deg, #c0d8ff, #7090e8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Building the cloud, one service at a time.
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32 }}>
          {/* Bio card */}
          <div
            className="glass glow-border"
            style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: 18 }}
          >
            <div style={{ fontSize: '1.8rem' }}>☁️</div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#a0c0ff' }}>Who I Am</h3>
            <p style={{ color: 'rgba(180,210,255,0.75)', lineHeight: 1.75, fontSize: '0.92rem' }}>
              South Korea 기반의 Cloud &amp; Backend 엔지니어 지망생입니다. AWS 클라우드 인프라, DevOps 파이프라인,
              그리고 분산 시스템 설계를 공부하고 있습니다.
            </p>
            <p style={{ color: 'rgba(180,210,255,0.75)', lineHeight: 1.75, fontSize: '0.92rem' }}>
              금융 데이터 분석 시스템부터 AI 기반 콘텐츠 필터링까지, 실제로 동작하는 시스템을 만드는 것을 좋아합니다.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 4 }}>
              <span className="tag">📍 South Korea</span>
              <span className="tag">🎓 AWS Learner</span>
              <span className="tag">⚡ Open Source</span>
            </div>
          </div>

          {/* Focus areas */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              {
                icon: '🌩️',
                title: 'Cloud Infrastructure',
                desc: 'AWS (EC2, S3, RDS, IAM)를 활용한 클라우드 아키텍처 설계 및 운영 학습 중',
              },
              {
                icon: '🔧',
                title: 'DevOps & CI/CD',
                desc: 'Docker 컨테이너화, GitHub Actions 기반 자동화 파이프라인 구축 경험',
              },
              {
                icon: '⚡',
                title: 'Backend Systems',
                desc: 'FastAPI, Node.js, Spring으로 고성능 API 서버 개발. PostgreSQL + Redis 최적화',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="glass"
                style={{ padding: '20px 24px', display: 'flex', gap: 16, alignItems: 'flex-start' }}
              >
                <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{item.icon}</span>
                <div>
                  <h4 style={{ fontWeight: 600, color: '#a0c0ff', marginBottom: 6, fontSize: '0.95rem' }}>{item.title}</h4>
                  <p style={{ color: 'rgba(160,190,240,0.7)', fontSize: '0.85rem', lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div style={{ marginTop: 48 }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#7090c0', marginBottom: 20, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Tech Stack
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {SKILLS.map(({ label, category }) => {
              const c = CAT_COLORS[category]
              return (
                <span
                  key={label}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '5px 12px',
                    borderRadius: 20,
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    letterSpacing: '0.03em',
                    background: c.bg,
                    border: `1px solid ${c.border}`,
                    color: c.text,
                    transition: 'all 0.2s ease',
                    cursor: 'default',
                  }}
                >
                  {label}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
