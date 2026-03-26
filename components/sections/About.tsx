'use client'

import { useEffect, useRef, useState } from 'react'

function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

const STACK = [
  { label: 'AWS',       cat: 'cloud' },
  { label: 'Docker',    cat: 'cloud' },
  { label: 'Linux',     cat: 'cloud' },
  { label: 'CI/CD',     cat: 'cloud' },
  { label: 'Python',    cat: 'lang' },
  { label: 'FastAPI',   cat: 'back' },
  { label: 'Node.js',   cat: 'back' },
  { label: 'Spring',    cat: 'back' },
  { label: 'PostgreSQL',cat: 'db' },
  { label: 'Redis',     cat: 'db' },
  { label: 'MySQL',     cat: 'db' },
  { label: 'LangGraph', cat: 'ai' },
  { label: 'OpenAI API',cat: 'ai' },
  { label: 'pgvector',  cat: 'ai' },
  { label: 'TypeScript',cat: 'lang' },
  { label: 'Java',      cat: 'lang' },
]

const CAT: Record<string, string> = {
  cloud: '#5090ff',
  back:  '#a060ff',
  db:    '#30d8e8',
  ai:    '#f060c8',
  lang:  '#60e890',
}

export default function About() {
  const { ref, visible } = useFadeIn()

  return (
    <section
      id="about"
      style={{ padding: '140px 56px', minHeight: '100vh', display: 'flex', alignItems: 'center' }}
    >
      <div
        ref={ref}
        style={{
          maxWidth: 860,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(45px)',
          transition: 'opacity 1s ease, transform 1s ease',
        }}
      >
        {/* Section index */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#3a5898' }}>
            01
          </span>
          <div style={{ flex: 1, height: 1, background: 'rgba(60,90,160,0.25)', maxWidth: 60 }} />
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#3a5898' }}>
            About
          </span>
        </div>

        {/* Two-column */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px 72px', alignItems: 'start' }}>
          {/* Left: text */}
          <div>
            <h2
              style={{
                fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                fontWeight: 700,
                lineHeight: 1.25,
                letterSpacing: '-0.01em',
                color: '#c0d4ff',
                marginBottom: 24,
              }}
            >
              AWS 기반 클라우드와<br />백엔드를 학습 중인<br />개발자입니다.
            </h2>

            <p style={{ fontSize: '0.9rem', color: 'rgba(160,195,255,0.6)', lineHeight: 1.85, marginBottom: 16 }}>
              클라우드 인프라(AWS), DevOps 파이프라인, 분산 시스템 설계를 공부하고 있습니다.
              실제로 동작하는 시스템을 만드는 것을 좋아하며, 금융 데이터 분석 파이프라인부터
              AI 기반 콘텐츠 필터링까지 다양한 프로젝트를 진행했습니다.
            </p>
            <p style={{ fontSize: '0.9rem', color: 'rgba(160,195,255,0.55)', lineHeight: 1.85 }}>
              성능 최적화에 관심이 많고, Redis 캐싱으로 쿼리 속도를 99.7% 단축하거나
              TimescaleDB로 시계열 처리를 93% 개선한 경험이 있습니다.
            </p>

            <div style={{ display: 'flex', gap: 12, marginTop: 28 }}>
              {['☁️ South Korea', '🔧 DevOps', '⚡ Backend'].map((t) => (
                <span
                  key={t}
                  style={{
                    fontSize: '0.72rem',
                    padding: '4px 12px',
                    borderRadius: 20,
                    background: 'rgba(40,70,140,0.2)',
                    border: '1px solid rgba(70,110,200,0.25)',
                    color: 'rgba(140,175,240,0.7)',
                    letterSpacing: '0.04em',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right: stack cloud */}
          <div>
            <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3a5898', marginBottom: 20 }}>
              Tech Stack
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {STACK.map(({ label, cat }, i) => (
                <span
                  key={label}
                  style={{
                    fontSize: '0.78rem',
                    padding: '5px 13px',
                    borderRadius: 20,
                    background: `${CAT[cat]}14`,
                    border: `1px solid ${CAT[cat]}30`,
                    color: CAT[cat],
                    letterSpacing: '0.02em',
                    fontWeight: 500,
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(10px)',
                    transition: `opacity 0.5s ease ${i * 40}ms, transform 0.5s ease ${i * 40}ms`,
                  }}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
