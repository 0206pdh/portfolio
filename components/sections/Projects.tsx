'use client'

import { useEffect, useRef, useState } from 'react'

function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTimeout(() => setVisible(true), delay) },
      { threshold: 0.08 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [delay])
  return { ref, visible }
}

const PROJECTS = [
  {
    num: '01',
    name: 'Financial Event-Driven\nMarket Impact System',
    slug: 'fin_spring',
    href: 'https://github.com/0206pdh/fin_spring',
    desc: '실시간 금융 뉴스 → FX 방향성 편향 & 섹터 압력 분류 파이프라인. 가격 예측이 아닌 설명 가능한 시장 영향 점수 제공.',
    metrics: [
      { val: '−99.7%', label: 'Redis 캐싱 후 쿼리 시간' },
      { val: '−93%',   label: 'TimescaleDB 시계열 성능' },
      { val: '0%',     label: 'JSON 파싱 실패율' },
    ],
    tags: ['FastAPI', 'TimescaleDB', 'pgvector', 'Redis', 'LangGraph', 'GPT-4o-mini', 'Docker'],
    accent: '#4a7cff',
    align: 'left' as const,
  },
  {
    num: '02',
    name: 'YouTube Live\nComment Filter',
    slug: 'youtube_live_comment_filter',
    href: 'https://github.com/0206pdh/youtube_live_comment_filter',
    desc: 'YouTube 라이브 채팅 유해 댓글 실시간 감지. 로컬 ML 모델로 프라이버시 보장하며 Chrome Extension + FastAPI 아키텍처.',
    metrics: [
      { val: 'Local',  label: 'ML — 외부 API 불필요' },
      { val: 'Docker', label: '컨테이너화 배포' },
      { val: 'AWS',    label: 'ECS Fargate 마이그레이션 예정' },
    ],
    tags: ['Chrome Extension', 'FastAPI', 'Python', 'Docker', 'ML', 'AWS'],
    accent: '#a855f7',
    align: 'right' as const,
  },
  {
    num: '03',
    name: 'AlgoNotion\nExtension',
    slug: 'AlgoNotion_Extention',
    href: 'https://github.com/0206pdh/AlgoNotion_Extention',
    desc: '백준 정답 코드를 자동으로 캡처해 Notion DB에 동기화. solved.ac API로 문제 난이도까지 자동 태깅.',
    metrics: [
      { val: 'V3',      label: 'Chrome Manifest' },
      { val: 'Auto',    label: '제출 자동 감지' },
      { val: 'Notion',  label: 'DB 자동 동기화' },
    ],
    tags: ['JavaScript', 'Chrome Extension', 'Notion API', 'solved.ac API'],
    accent: '#22d3ee',
    align: 'left' as const,
  },
]

function ProjectCard({ p }: { p: typeof PROJECTS[0] }) {
  const { ref, visible } = useFadeIn(0)
  const [hovered, setHovered] = useState(false)

  const isRight = p.align === 'right'

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        justifyContent: isRight ? 'flex-end' : 'flex-start',
        paddingLeft: isRight ? 0 : 0,
        opacity: visible ? 1 : 0,
        transform: visible
          ? 'translateX(0)'
          : `translateX(${isRight ? '40px' : '-40px'})`,
        transition: 'opacity 0.9s ease, transform 0.9s ease',
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          maxWidth: 600,
          width: '100%',
          background: 'rgba(6,14,38,0.65)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: `1px solid ${hovered ? p.accent + '40' : 'rgba(60,100,180,0.18)'}`,
          borderRadius: 16,
          padding: '36px 40px',
          transition: 'all 0.35s ease',
          boxShadow: hovered ? `0 12px 50px ${p.accent}18` : '0 4px 24px rgba(0,0,0,0.35)',
          transform: hovered ? 'translateY(-3px)' : 'none',
          cursor: 'default',
        }}
      >
        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <span
              style={{
                fontSize: '0.62rem',
                letterSpacing: '0.18em',
                color: p.accent,
                opacity: 0.6,
                fontWeight: 600,
                textTransform: 'uppercase',
              }}
            >
              {p.num}
            </span>
            <div style={{ width: 24, height: 1, background: `${p.accent}40` }} />
          </div>
          <a
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontSize: '0.72rem',
              color: 'rgba(140,180,240,0.4)',
              textDecoration: 'none',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = p.accent }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(140,180,240,0.4)' }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
            </svg>
            View repo
          </a>
        </div>

        {/* Title */}
        <h3
          style={{
            fontSize: 'clamp(1.1rem, 2.5vw, 1.55rem)',
            fontWeight: 700,
            lineHeight: 1.25,
            whiteSpace: 'pre-line',
            color: '#cce0ff',
            letterSpacing: '-0.01em',
            marginBottom: 16,
          }}
        >
          {p.name}
        </h3>

        {/* Desc */}
        <p style={{ fontSize: '0.87rem', color: 'rgba(155,190,245,0.65)', lineHeight: 1.75, marginBottom: 28 }}>
          {p.desc}
        </p>

        {/* Metrics */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
            marginBottom: 28,
            paddingBottom: 28,
            borderBottom: `1px solid rgba(60,100,180,0.15)`,
          }}
        >
          {p.metrics.map((m) => (
            <div key={m.label}>
              <div style={{ fontSize: '1.15rem', fontWeight: 700, color: p.accent, marginBottom: 3 }}>{m.val}</div>
              <div style={{ fontSize: '0.68rem', color: 'rgba(120,160,220,0.5)', lineHeight: 1.4 }}>{m.label}</div>
            </div>
          ))}
        </div>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {p.tags.map((t) => (
            <span
              key={t}
              style={{
                fontSize: '0.68rem',
                padding: '3px 10px',
                borderRadius: 20,
                background: `${p.accent}14`,
                border: `1px solid ${p.accent}28`,
                color: `${p.accent}cc`,
                fontWeight: 500,
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Projects() {
  const headRef = useRef<HTMLDivElement>(null)
  const [headVisible, setHeadVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeadVisible(true) }, { threshold: 0.2 })
    if (headRef.current) obs.observe(headRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="projects"
      style={{ padding: '140px 56px', minHeight: '100vh' }}
    >
      {/* Header */}
      <div
        ref={headRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 80,
          opacity: headVisible ? 1 : 0,
          transform: headVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
        }}
      >
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#3a5898' }}>02</span>
        <div style={{ width: 60, height: 1, background: 'rgba(60,90,160,0.25)' }} />
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#3a5898' }}>Projects</span>
      </div>

      {/* Project list — staggered left/right */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 48, maxWidth: 1100, margin: '0 auto' }}>
        {PROJECTS.map((p) => <ProjectCard key={p.slug} p={p} />)}
      </div>
    </section>
  )
}
