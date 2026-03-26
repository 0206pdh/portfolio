'use client'

import { useEffect, useRef, useState } from 'react'

function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setTimeout(() => setVisible(true), delay) },
      { threshold: 0.1 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [delay])
  return { ref, visible }
}

const PROJECTS = [
  {
    name: 'Financial Event-Driven\nMarket Impact System',
    short: 'fin_spring',
    href: 'https://github.com/0206pdh/fin_spring',
    description:
      '실시간 금융 뉴스를 분석해 FX 방향성 편향과 섹터별 시장 압력을 분류하는 인텔리전스 파이프라인. 가격 예측이 아닌 이벤트 분류와 설명 가능한 시장 영향 점수를 실시간 대시보드로 제공.',
    highlights: [
      'Redis 캐싱으로 히트맵 쿼리 2,340ms → 8ms (-99.7%)',
      'TimescaleDB로 시계열 쿼리 93% 단축',
      'pgvector 코사인 유사도로 의미론적 중복 감지 (임계값 0.92)',
      'LangGraph 3단계 체인: 이벤트 분류 → FX 채널 식별 → 키워드 생성',
    ],
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'TimescaleDB', 'pgvector', 'Redis', 'LangGraph', 'GPT-4o-mini', 'Docker'],
    color: '#4a7cff',
    glow: 'rgba(74,124,255,0.2)',
  },
  {
    name: 'YouTube Live\nComment Filter',
    short: 'youtube_live_comment_filter',
    href: 'https://github.com/0206pdh/youtube_live_comment_filter',
    description:
      'YouTube 라이브 채팅의 유해 댓글을 실시간으로 감지하는 Chrome 확장 프로그램. 로컬 ML 모델과 FastAPI 백엔드를 결합해 프라이버시를 보장하면서 악성 댓글을 필터링.',
    highlights: [
      'Chrome Extension + FastAPI 백엔드 아키텍처',
      '로컬 ML 모델로 프라이버시 보장 (외부 API 불필요)',
      'Docker 컨테이너화 및 Windows EXE 옵션 지원',
      'AWS ECS Fargate + ECR + CloudWatch 마이그레이션 로드맵',
    ],
    tags: ['Python', 'FastAPI', 'JavaScript', 'Chrome Extension', 'Docker', 'ML', 'AWS'],
    color: '#a855f7',
    glow: 'rgba(168,85,247,0.2)',
  },
  {
    name: 'AlgoNotion\nExtension',
    short: 'AlgoNotion_Extention',
    href: 'https://github.com/0206pdh/AlgoNotion_Extention',
    description:
      '백준 온라인 저지에서 정답 처리된 알고리즘 코드를 자동으로 캡처해 Notion 데이터베이스에 저장하는 Chrome 확장 프로그램. solved.ac API로 문제 정보를 풍부화.',
    highlights: [
      'Chrome Manifest V3 기반 확장 프로그램',
      'solved.ac API 연동으로 문제 난이도 자동 태깅',
      'Notion Integration API로 DB 자동 동기화',
      '백준 상태 페이지 실시간 모니터링',
    ],
    tags: ['JavaScript', 'Chrome Extension', 'Notion API', 'solved.ac API', 'Manifest V3'],
    color: '#22d3ee',
    glow: 'rgba(34,211,238,0.2)',
  },
]

function ProjectCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const { ref, visible } = useFadeIn(index * 150)
  const [hovered, setHovered] = useState(false)

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(60px)',
        transition: `opacity 0.8s ease, transform 0.8s ease`,
      }}
    >
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: 'rgba(8,18,45,0.6)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: `1px solid ${hovered ? project.color + '55' : 'rgba(80,130,220,0.18)'}`,
          borderRadius: 16,
          padding: '32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          height: '100%',
          transition: 'all 0.35s ease',
          boxShadow: hovered
            ? `0 8px 40px ${project.glow}, 0 0 0 1px ${project.color}22`
            : '0 4px 20px rgba(0,0,0,0.3)',
          transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
          cursor: 'default',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 10,
              background: `linear-gradient(135deg, ${project.color}33, ${project.color}11)`,
              border: `1px solid ${project.color}44`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.3rem',
            }}
          >
            {['📊', '🛡️', '📝'][PROJECTS.indexOf(project)]}
          </div>
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'rgba(160,190,240,0.5)',
              transition: 'color 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontSize: '0.8rem',
              textDecoration: 'none',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = project.color)}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(160,190,240,0.5)')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            View
          </a>
        </div>

        {/* Title */}
        <div>
          <h3
            style={{
              fontSize: '1.15rem',
              fontWeight: 700,
              lineHeight: 1.3,
              color: '#d0e4ff',
              marginBottom: 4,
              whiteSpace: 'pre-line',
            }}
          >
            {project.name}
          </h3>
          <span
            style={{
              fontSize: '0.72rem',
              color: project.color,
              fontFamily: 'monospace',
              opacity: 0.7,
            }}
          >
            {project.short}
          </span>
        </div>

        {/* Description */}
        <p style={{ color: 'rgba(170,200,245,0.7)', fontSize: '0.87rem', lineHeight: 1.7 }}>
          {project.description}
        </p>

        {/* Highlights */}
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {project.highlights.map((h) => (
            <li
              key={h}
              style={{
                display: 'flex',
                gap: 10,
                fontSize: '0.82rem',
                color: 'rgba(150,185,240,0.7)',
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: project.color, flexShrink: 0, marginTop: 1 }}>▸</span>
              {h}
            </li>
          ))}
        </ul>

        {/* Tags */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 'auto', paddingTop: 8 }}>
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                padding: '3px 10px',
                borderRadius: 20,
                fontSize: '0.7rem',
                fontWeight: 500,
                background: `${project.color}18`,
                border: `1px solid ${project.color}35`,
                color: project.color,
                letterSpacing: '0.02em',
              }}
            >
              {tag}
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
      style={{ padding: '120px 24px', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <div
        ref={headRef}
        style={{
          maxWidth: 900,
          width: '100%',
          opacity: headVisible ? 1 : 0,
          transform: headVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 0.8s ease, transform 0.8s ease',
          marginBottom: 56,
        }}
      >
        <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#5080c0', marginBottom: 12 }}>
          Projects
        </p>
        <h2
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 700,
            background: 'linear-gradient(135deg, #c0d8ff, #7090e8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          What I&apos;ve Built
        </h2>
      </div>

      <div
        style={{
          maxWidth: 900,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 24,
        }}
      >
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.short} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
