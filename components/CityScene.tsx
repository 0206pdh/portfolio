'use client'

import { useEffect, useMemo, useRef, useState } from 'react'

type SkillIcon =
  | 'aws'
  | 'python'
  | 'fastapi'
  | 'docker'
  | 'typescript'
  | 'postgres'
  | 'redis'
  | 'langgraph'
  | 'javascript'
  | 'notion'
  | 'chrome'
  | 'three'
  | 'backend'
  | 'school'

interface SkillTag {
  label: string
  icon: SkillIcon
  color: string
}

interface CarouselCard {
  id: string
  eyebrow: string
  title: string
  subtitle: string
  summary: string
  period?: string
  metrics: { label: string; value: string }[]
  tags: SkillTag[]
  href?: string
}

const TAG = (label: string, icon: SkillIcon, color: string): SkillTag => ({ label, icon, color })

const CARDS: CarouselCard[] = [
  {
    id: 'profile',
    eyebrow: 'Portfolio Profile',
    title: 'Dohyun Park',
    subtitle: 'Cloud, backend, and interactive web portfolio',
    summary:
      'Computer Engineering student building practical systems around AWS, backend APIs, data flow, and product-minded implementation.',
    period: '2020 - 2026',
    metrics: [
      { label: 'School', value: 'Kwangwoon' },
      { label: 'Major', value: 'CSE' },
      { label: 'Focus', value: 'Cloud' },
    ],
    tags: [
      TAG('AWS', 'aws', '#f3b15e'),
      TAG('Python', 'python', '#78aef6'),
      TAG('FastAPI', 'fastapi', '#68d8be'),
      TAG('Docker', 'docker', '#72aaf6'),
      TAG('Three.js', 'three', '#cfd4dd'),
    ],
  },
  {
    id: 'education',
    eyebrow: 'Education',
    title: 'Kwangwoon University',
    subtitle: 'Department of Computer Engineering',
    summary:
      'Bachelor track from 2020 to 2026, grounding this portfolio in algorithms, software, databases, and implementation-heavy coursework.',
    period: 'Mar 2020 - Feb 2026',
    metrics: [
      { label: 'Track', value: 'B.S.' },
      { label: 'Duration', value: '6 yrs' },
      { label: 'Theme', value: 'Core CS' },
    ],
    tags: [
      TAG('Computer Eng.', 'school', '#b0b6c8'),
      TAG('Algorithms', 'backend', '#e7a45d'),
      TAG('Database', 'postgres', '#77abff'),
      TAG('Software', 'school', '#8ed5bf'),
    ],
  },
  {
    id: 'fin_spring',
    eyebrow: 'Pinned Project',
    title: 'Financial Event-Driven Market Impact System',
    subtitle: 'Explainable backend pipeline for finance signals',
    summary:
      'Reads financial events, classifies impact, and produces structured market signals with a backend-first architecture.',
    metrics: [
      { label: 'Stack', value: 'FastAPI' },
      { label: 'Store', value: 'Redis' },
      { label: 'Theme', value: 'Finance' },
    ],
    tags: [
      TAG('FastAPI', 'fastapi', '#68d8be'),
      TAG('PostgreSQL', 'postgres', '#77abff'),
      TAG('Redis', 'redis', '#f48787'),
      TAG('LangGraph', 'langgraph', '#98d56e'),
      TAG('Docker', 'docker', '#72aaf6'),
    ],
    href: 'https://github.com/0206pdh/fin_spring',
  },
  {
    id: 'yt_filter',
    eyebrow: 'Pinned Project',
    title: 'YouTube Live Comment Filter',
    subtitle: 'Extension plus backend for toxic comment handling',
    summary:
      'Chrome extension and FastAPI service for filtering harmful live chat with local inference and deployable backend structure.',
    metrics: [
      { label: 'Client', value: 'Chrome' },
      { label: 'Model', value: 'Local' },
      { label: 'Deploy', value: 'AWS' },
    ],
    tags: [
      TAG('Python', 'python', '#78aef6'),
      TAG('FastAPI', 'fastapi', '#68d8be'),
      TAG('Chrome Ext.', 'chrome', '#88a7ff'),
      TAG('Docker', 'docker', '#72aaf6'),
      TAG('Backend', 'backend', '#d5d8df'),
    ],
    href: 'https://github.com/0206pdh/youtube_live_comment_filter',
  },
  {
    id: 'algonotion',
    eyebrow: 'Pinned Project',
    title: 'AlgoNotion Extension',
    subtitle: 'Baekjoon workflow automation into Notion',
    summary:
      'Automates accepted problem capture and syncs metadata into a structured Notion setup using a browser extension workflow.',
    metrics: [
      { label: 'Mode', value: 'Auto' },
      { label: 'Source', value: 'BOJ' },
      { label: 'Target', value: 'Notion' },
    ],
    tags: [
      TAG('JavaScript', 'javascript', '#efcc64'),
      TAG('Notion API', 'notion', '#cfd4dd'),
      TAG('Chrome Ext.', 'chrome', '#88a7ff'),
      TAG('TypeScript', 'typescript', '#6da6f7'),
      TAG('Backend', 'backend', '#d5d8df'),
    ],
    href: 'https://github.com/0206pdh/AlgoNotion_Extention',
  },
  {
    id: 'skills',
    eyebrow: 'Tech Stack',
    title: 'Gray Glass Stack Board',
    subtitle: 'Tools used across cloud, backend, automation, and 3D web',
    summary:
      'Core stack centered on AWS deployment, backend APIs, data stores, automation workflows, and interactive front-end presentation.',
    metrics: [
      { label: 'Cloud', value: 'AWS' },
      { label: 'Backend', value: 'API' },
      { label: 'Visual', value: '3D UI' },
    ],
    tags: [
      TAG('AWS', 'aws', '#f3b15e'),
      TAG('Docker', 'docker', '#72aaf6'),
      TAG('FastAPI', 'fastapi', '#68d8be'),
      TAG('PostgreSQL', 'postgres', '#77abff'),
      TAG('Redis', 'redis', '#f48787'),
      TAG('Three.js', 'three', '#cfd4dd'),
    ],
  },
]

function SkillGlyph({ icon, color }: { icon: SkillIcon; color: string }) {
  const common = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }
  switch (icon) {
    case 'aws':
      return <svg {...common}><path d="M6 15.5c3.2 2 8.1 2 11.7-.1" stroke={color} strokeWidth="1.8" strokeLinecap="round" /><path d="M8.3 13.2l1.6-5.4h1.4l1.6 5.4m-2.4-1.4h1.7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
    case 'python':
      return <svg {...common}><path d="M12 5.5c-3.4 0-3.2 1.5-3.2 1.5V9h6.4V7.3S15.4 5.5 12 5.5Z" stroke={color} strokeWidth="1.7" /><circle cx="10.2" cy="7.2" r="1" fill={color} /><path d="M12 18.5c3.4 0 3.2-1.5 3.2-1.5V15H8.8v1.7S8.6 18.5 12 18.5Z" stroke={color} strokeWidth="1.7" /><circle cx="13.8" cy="16.8" r="1" fill={color} /></svg>
    case 'fastapi':
      return <svg {...common}><path d="M18.5 5.5L9.2 18.5h4.2l1.4-4.4H11" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>
    case 'docker':
      return <svg {...common}><path d="M6 13.5h10.2c1 0 1.8-.3 2.3-.8.6-.6 1-1.5 1-2.8" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><path d="M7 10.3h2v2H7zm2.3 0h2v2h-2zm2.3 0h2v2h-2zm-2.3-2.3h2v2h-2z" fill={color} /></svg>
    case 'typescript':
      return <svg {...common}><rect x="5" y="5" width="14" height="14" rx="3" stroke={color} strokeWidth="1.7" /><path d="M8.5 9.2h7M12 9.2v7" stroke={color} strokeWidth="1.5" strokeLinecap="round" /></svg>
    case 'postgres':
      return <svg {...common}><path d="M9 17c-1.2 0-2-.8-2-2.1V9.1C7 6.9 8.5 5.5 10.5 5.5h1c3.6 0 5.5 2 5.5 5.1 0 2.8-1.6 4.4-4.1 4.4-.7 0-1.3-.1-1.9-.4V18c0 .6-.5 1-1 1" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
    case 'redis':
      return <svg {...common}><path d="M6 9.5l6-2 6 2-6 2-6-2Zm0 5l6 2 6-2M6 9.5v5M18 9.5v5" stroke={color} strokeWidth="1.7" strokeLinejoin="round" /></svg>
    case 'langgraph':
      return <svg {...common}><circle cx="8" cy="8" r="2.2" stroke={color} strokeWidth="1.7" /><circle cx="16.5" cy="7.5" r="2" stroke={color} strokeWidth="1.7" /><circle cx="12" cy="16" r="2.2" stroke={color} strokeWidth="1.7" /><path d="M9.8 9.1l4.7-1M9.3 9.8l1.8 4.1M14.8 9.3l-1.8 4" stroke={color} strokeWidth="1.6" strokeLinecap="round" /></svg>
    case 'javascript':
      return <svg {...common}><rect x="5" y="5" width="14" height="14" rx="3" stroke={color} strokeWidth="1.7" /><path d="M10.2 9v6c0 1-.5 1.7-1.8 1.7" stroke={color} strokeWidth="1.5" strokeLinecap="round" /></svg>
    case 'notion':
      return <svg {...common}><rect x="5" y="5" width="14" height="14" rx="2.2" stroke={color} strokeWidth="1.7" /><path d="M9 15V9l6 6V9" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
    case 'chrome':
      return <svg {...common}><circle cx="12" cy="12" r="7" stroke={color} strokeWidth="1.7" /><circle cx="12" cy="12" r="2.8" stroke={color} strokeWidth="1.7" /><path d="M12 5v4M6.2 8.3 9.7 14M17.8 8.3 14.3 14" stroke={color} strokeWidth="1.6" strokeLinecap="round" /></svg>
    case 'three':
      return <svg {...common}><path d="M12 5.5l6 3.5v7L12 19.5 6 16V9l6-3.5Zm0 0v14M6 9l6 3.5L18 9" stroke={color} strokeWidth="1.6" strokeLinejoin="round" /></svg>
    case 'backend':
      return <svg {...common}><path d="M7 8.5h10M7 12h10M7 15.5h6" stroke={color} strokeWidth="1.9" strokeLinecap="round" /><path d="M17 14.5 19 12l-2-2.5" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
    case 'school':
      return <svg {...common}><path d="M12 6 5.5 9.5 12 13l6.5-3.5L12 6Zm-4.5 5v3.5L12 18l4.5-3.5V11" stroke={color} strokeWidth="1.7" strokeLinejoin="round" /></svg>
  }
}

function SkillChip({ tag, large = false }: { tag: SkillTag; large?: boolean }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: large ? '10px 14px' : '8px 12px',
        borderRadius: 18,
        border: '1px solid rgba(255,255,255,0.11)',
        background: 'rgba(165, 170, 182, 0.08)',
        color: '#eef1f5',
        fontSize: large ? '0.88rem' : '0.78rem',
        fontWeight: 600,
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: large ? 30 : 26,
          height: large ? 30 : 26,
          borderRadius: 10,
          background: `${tag.color}22`,
          boxShadow: `inset 0 0 0 1px ${tag.color}1c`,
        }}
      >
        <SkillGlyph icon={tag.icon} color={tag.color} />
      </span>
      {tag.label}
    </span>
  )
}

function GlassPanel({
  children,
  style,
}: {
  children: React.ReactNode
  style?: React.CSSProperties
}) {
  return (
    <div
      style={{
        background: 'linear-gradient(180deg, rgba(170, 173, 182, 0.11), rgba(130, 133, 142, 0.05))',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 30,
        boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function WireBackdrop() {
  return (
    <>
      <svg
        aria-hidden
        viewBox="0 0 800 800"
        style={{ position: 'absolute', top: -120, right: -140, width: 760, opacity: 0.46 }}
      >
        {Array.from({ length: 28 }).map((_, i) => (
          <path
            key={i}
            d={`M ${420 + i * 14} -40 C ${300 + i * 10} 180, ${720 - i * 5} 230, ${520 + i * 12} 760`}
            stroke="rgba(150, 190, 255, 0.35)"
            strokeWidth="1.6"
            fill="none"
          />
        ))}
      </svg>
      <svg
        aria-hidden
        viewBox="0 0 800 400"
        style={{ position: 'absolute', bottom: -100, left: -120, width: 680, opacity: 0.26 }}
      >
        {Array.from({ length: 18 }).map((_, i) => (
          <path
            key={i}
            d={`M -40 ${40 + i * 16} C 180 ${-20 + i * 5}, 420 ${120 + i * 8}, 760 ${40 + i * 6}`}
            stroke="rgba(210, 216, 228, 0.22)"
            strokeWidth="1.4"
            fill="none"
          />
        ))}
      </svg>
    </>
  )
}

export default function CityScene() {
  const [selected, setSelected] = useState(0)
  const [dragging, setDragging] = useState(false)
  const rotationRef = useRef(0)
  const velocityRef = useRef(0.0045)
  const dragStartRef = useRef(0)
  const dragRotationRef = useRef(0)
  const [, forceFrame] = useState(0)

  useEffect(() => {
    let frame = 0
    const animate = () => {
      frame = requestAnimationFrame(animate)
      if (!dragging) rotationRef.current += velocityRef.current
      velocityRef.current *= dragging ? 0.92 : 0.988
      forceFrame((v) => (v + 1) % 10000)
    }
    animate()
    return () => cancelAnimationFrame(frame)
  }, [dragging])

  const activeCard = CARDS[selected]
  const carouselCards = useMemo(() => {
    return CARDS.map((card, index) => {
      const step = 360 / CARDS.length
      const angle = step * index + rotationRef.current * 57.2958
      const normalized = ((((angle % 360) + 360) % 360) + 360) % 360
      const delta = Math.abs(((normalized + 180) % 360) - 180)
      const isFront = delta < step / 2
      return { card, index, angle, isFront, depth: 1 - Math.min(delta / 180, 1) }
    })
  }, [selected, dragging, forceFrame])

  useEffect(() => {
    let bestIndex = 0
    let bestDepth = -1
    carouselCards.forEach((item) => {
      if (item.depth > bestDepth) {
        bestDepth = item.depth
        bestIndex = item.index
      }
    })
    if (bestIndex !== selected && !dragging) setSelected(bestIndex)
  }, [carouselCards, dragging, selected])

  const beginDrag = (clientX: number) => {
    setDragging(true)
    dragStartRef.current = clientX
    dragRotationRef.current = rotationRef.current
  }

  const moveDrag = (clientX: number) => {
    if (!dragging) return
    const delta = (clientX - dragStartRef.current) / 320
    rotationRef.current = dragRotationRef.current + delta
    velocityRef.current = delta * 0.04
  }

  const codeLeft = `.carousel-card {\n  width: 320px;\n  height: 430px;\n  border-radius: 28px;\n  background: rgba(175, 178, 186, 0.08);\n  backdrop-filter: blur(24px);\n  border: 1px solid rgba(255,255,255,0.12);\n  transform-style: preserve-3d;\n}`
  const codeRight = `const profile = {\n  school: 'Kwangwoon University',\n  major: 'Computer Engineering',\n  period: '2020 - 2026',\n  focus: ['AWS', 'Backend', 'Automation'],\n  style: 'Gray transparent glass UI'\n}`

  return (
    <div
      onMouseMove={(e) => moveDrag(e.clientX)}
      onMouseUp={() => setDragging(false)}
      onMouseLeave={() => setDragging(false)}
      onTouchMove={(e) => moveDrag(e.touches[0].clientX)}
      onTouchEnd={() => setDragging(false)}
      style={{
        position: 'relative',
        minHeight: '100vh',
        overflow: 'hidden',
        background:
          'radial-gradient(circle at top left, rgba(154,160,174,0.14), transparent 28%), radial-gradient(circle at 82% 14%, rgba(114,144,190,0.18), transparent 24%), linear-gradient(180deg, #050608, #0d1015 48%, #090b10)',
        color: '#f2f4f7',
      }}
    >
      <WireBackdrop />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          width: 'min(1480px, calc(100vw - 64px))',
          margin: '0 auto',
          padding: '36px 0 28px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 28,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.05em' }}>DP</div>
            <div style={{ color: 'rgba(242,244,247,0.62)', fontSize: '0.95rem' }}>
              Gray transparent portfolio concept
            </div>
          </div>
          <GlassPanel style={{ padding: '10px 16px', borderRadius: 999 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.88rem', color: '#e8ecf3' }}>
              <span style={{ width: 9, height: 9, borderRadius: 999, background: '#bfc6d4' }} />
              github.com/0206pdh
            </div>
          </GlassPanel>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '0.95fr 1.05fr',
            gap: 28,
            alignItems: 'stretch',
            minHeight: 'calc(100vh - 130px)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateRows: 'auto auto 1fr', gap: 22 }}>
            <GlassPanel style={{ padding: '28px 30px' }}>
              <div
                style={{
                  display: 'inline-flex',
                  gap: 10,
                  alignItems: 'center',
                  marginBottom: 18,
                  padding: '8px 12px',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  fontSize: '0.8rem',
                  color: 'rgba(242,244,247,0.8)',
                }}
              >
                <span style={{ width: 7, height: 7, borderRadius: 999, background: '#cfd4dd' }} />
                Web-first 3D carousel portfolio
              </div>

              <h1
                style={{
                  fontSize: 'clamp(3.8rem, 7vw, 6.8rem)',
                  lineHeight: 0.92,
                  letterSpacing: '-0.07em',
                  marginBottom: 18,
                  fontWeight: 800,
                }}
              >
                Gray Glass
                <br />
                Portfolio
              </h1>

              <p
                style={{
                  maxWidth: 620,
                  color: 'rgba(235, 239, 245, 0.72)',
                  fontSize: '1.02rem',
                  lineHeight: 1.7,
                  marginBottom: 22,
                }}
              >
                Towers are removed. This version is built as a desktop-first portfolio with a 3D carousel,
                gray transparent panels, and interactive project cards.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {activeCard.tags.slice(0, 4).map((tag) => (
                  <SkillChip key={tag.label} tag={tag} large />
                ))}
              </div>
            </GlassPanel>

            <GlassPanel style={{ padding: '24px 26px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 18, marginBottom: 16 }}>
                <div>
                  <div style={{ fontSize: '0.76rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(242,244,247,0.48)', marginBottom: 10 }}>
                    Active Card
                  </div>
                  <h2 style={{ fontSize: '1.72rem', lineHeight: 1.08, marginBottom: 8 }}>{activeCard.title}</h2>
                  <p style={{ color: 'rgba(235, 239, 245, 0.65)', fontSize: '0.96rem', lineHeight: 1.55 }}>
                    {activeCard.subtitle}
                  </p>
                  {activeCard.period && (
                    <div style={{ marginTop: 10, fontSize: '0.85rem', color: 'rgba(235, 239, 245, 0.52)' }}>
                      {activeCard.period}
                    </div>
                  )}
                </div>
                {activeCard.href && (
                  <a
                    href={activeCard.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      alignSelf: 'flex-start',
                      textDecoration: 'none',
                      padding: '10px 14px',
                      borderRadius: 999,
                      color: '#f2f4f7',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.12)',
                      fontSize: '0.84rem',
                    }}
                  >
                    View GitHub
                  </a>
                )}
              </div>

              <p style={{ color: 'rgba(235, 239, 245, 0.74)', lineHeight: 1.7, marginBottom: 18 }}>
                {activeCard.summary}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                {activeCard.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    style={{
                      padding: '14px 14px 12px',
                      borderRadius: 20,
                      background: 'rgba(255,255,255,0.06)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}
                  >
                    <div style={{ fontSize: '1.02rem', fontWeight: 700, marginBottom: 4 }}>{metric.value}</div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(235,239,245,0.55)' }}>{metric.label}</div>
                  </div>
                ))}
              </div>
            </GlassPanel>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
              <GlassPanel style={{ padding: '18px 20px 20px' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                  {[0, 1, 2].map((dot) => (
                    <span key={dot} style={{ width: 10, height: 10, borderRadius: 999, background: 'rgba(255,255,255,0.72)' }} />
                  ))}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'rgba(235,239,245,0.48)', marginBottom: 10 }}>*CSS</div>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#b9d0f8', lineHeight: 1.65, fontSize: '0.9rem' }}>{codeLeft}</pre>
              </GlassPanel>

              <GlassPanel style={{ padding: '18px 20px 20px' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                  {[0, 1, 2].map((dot) => (
                    <span key={dot} style={{ width: 10, height: 10, borderRadius: 999, background: 'rgba(255,255,255,0.72)' }} />
                  ))}
                </div>
                <div style={{ fontSize: '0.74rem', color: 'rgba(235,239,245,0.48)', marginBottom: 10 }}>*DATA</div>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#d4d7df', lineHeight: 1.65, fontSize: '0.9rem' }}>{codeRight}</pre>
              </GlassPanel>
            </div>
          </div>

          <GlassPanel style={{ position: 'relative', overflow: 'hidden', padding: '26px 30px 30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 26 }}>
              <div>
                <div style={{ fontSize: '0.76rem', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(242,244,247,0.48)', marginBottom: 10 }}>
                  3D Carousel
                </div>
                <h2 style={{ fontSize: '2.5rem', lineHeight: 1, letterSpacing: '-0.05em', marginBottom: 8 }}>Project Rotation</h2>
                <p style={{ color: 'rgba(235,239,245,0.62)', lineHeight: 1.65, maxWidth: 420 }}>
                  Drag horizontally or click a card. The layout is tuned for web, not phone UI.
                </p>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {CARDS.map((card, index) => (
                  <button
                    key={card.id}
                    onClick={() => setSelected(index)}
                    style={{
                      width: 11,
                      height: 11,
                      borderRadius: 999,
                      border: 0,
                      cursor: 'pointer',
                      background: index === selected ? '#f2f4f7' : 'rgba(255,255,255,0.2)',
                    }}
                  />
                ))}
              </div>
            </div>

            <div
              onMouseDown={(e) => beginDrag(e.clientX)}
              onTouchStart={(e) => beginDrag(e.touches[0].clientX)}
              style={{
                position: 'relative',
                height: 'calc(100% - 88px)',
                minHeight: 720,
                perspective: 1800,
                cursor: dragging ? 'grabbing' : 'grab',
                userSelect: 'none',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  transformStyle: 'preserve-3d',
                }}
              >
                {carouselCards.map(({ card, angle, depth, index, isFront }) => {
                  const accent = card.tags[0]?.color ?? '#d2d6de'
                  return (
                    <button
                      key={card.id}
                      onClick={() => setSelected(index)}
                      style={{
                        position: 'absolute',
                        top: '47%',
                        left: '50%',
                        width: 340,
                        height: 460,
                        padding: 0,
                        border: 0,
                        background: 'transparent',
                        transform: `translate3d(-50%, -50%, 0) rotateY(${angle}deg) translateZ(360px) scale(${0.82 + depth * 0.24})`,
                        transformStyle: 'preserve-3d',
                        zIndex: Math.round(depth * 100),
                        cursor: 'pointer',
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 34,
                          padding: '24px 22px 22px',
                          textAlign: 'left',
                          color: '#f2f4f7',
                          background:
                            `linear-gradient(180deg, rgba(178, 181, 190, 0.16), rgba(122, 126, 138, 0.07)), radial-gradient(circle at top right, ${accent}22, transparent 32%)`,
                          border: `1px solid ${isFront ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'}`,
                          boxShadow: isFront ? `0 30px 80px ${accent}22` : '0 25px 60px rgba(0,0,0,0.28)',
                          backdropFilter: 'blur(24px)',
                          WebkitBackdropFilter: 'blur(24px)',
                          opacity: 0.45 + depth * 0.55,
                        }}
                      >
                        <div
                          style={{
                            display: 'inline-flex',
                            padding: '8px 11px',
                            borderRadius: 999,
                            background: 'rgba(255,255,255,0.08)',
                            border: '1px solid rgba(255,255,255,0.12)',
                            fontSize: '0.74rem',
                            color: 'rgba(242,244,247,0.72)',
                            marginBottom: 20,
                          }}
                        >
                          {card.eyebrow}
                        </div>

                        <h3 style={{ fontSize: '2.05rem', lineHeight: 1.02, letterSpacing: '-0.05em', marginBottom: 12 }}>
                          {card.title}
                        </h3>
                        <p style={{ fontSize: '0.95rem', lineHeight: 1.55, color: 'rgba(240,243,247,0.66)', marginBottom: 18 }}>
                          {card.subtitle}
                        </p>
                        <div style={{ width: 42, height: 4, borderRadius: 999, background: accent, marginBottom: 18 }} />
                        <p style={{ fontSize: '0.9rem', lineHeight: 1.68, color: 'rgba(240,243,247,0.82)', marginBottom: 24 }}>
                          {card.summary}
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 18 }}>
                          {card.metrics.map((metric) => (
                            <div
                              key={metric.label}
                              style={{
                                padding: '10px 10px 9px',
                                borderRadius: 16,
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.08)',
                              }}
                            >
                              <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{metric.value}</div>
                              <div style={{ fontSize: '0.66rem', color: 'rgba(235,239,245,0.5)' }}>{metric.label}</div>
                            </div>
                          ))}
                        </div>

                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                          {card.tags.slice(0, 3).map((tag) => (
                            <SkillChip key={tag.label} tag={tag} />
                          ))}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </GlassPanel>
        </div>
      </div>
    </div>
  )
}
