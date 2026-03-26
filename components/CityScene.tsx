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
  section: string
  title: string
  subtitle: string
  summary: string
  period?: string
  href?: string
  metrics: { label: string; value: string }[]
  tags: SkillTag[]
}

const TAG = (label: string, icon: SkillIcon, color: string): SkillTag => ({ label, icon, color })

const CARDS: CarouselCard[] = [
  {
    id: 'profile',
    section: 'Profile',
    title: 'Dohyun Park',
    subtitle: 'Cloud, backend, and interactive web portfolio',
    summary:
      'Computer Engineering student focused on AWS, backend systems, and practical implementation. This portfolio now starts with a desktop-first carousel instead of towers.',
    period: '2020 - 2026',
    metrics: [
      { label: 'School', value: 'Kwangwoon' },
      { label: 'Major', value: 'CSE' },
      { label: 'Focus', value: 'Cloud' },
    ],
    tags: [
      TAG('AWS', 'aws', '#f3b15e'),
      TAG('Python', 'python', '#7aaef4'),
      TAG('FastAPI', 'fastapi', '#68d8be'),
      TAG('Docker', 'docker', '#75acf5'),
      TAG('Three.js', 'three', '#d8dce2'),
    ],
  },
  {
    id: 'education',
    section: 'Education',
    title: 'Kwangwoon University',
    subtitle: 'Department of Computer Engineering',
    summary:
      'Studied Computer Engineering from March 2020 to February 2026, building foundations in software, algorithms, systems, and databases.',
    period: 'Mar 2020 - Feb 2026',
    metrics: [
      { label: 'Track', value: 'B.S.' },
      { label: 'Duration', value: '6 yrs' },
      { label: 'Theme', value: 'Core CS' },
    ],
    tags: [
      TAG('Computer Eng.', 'school', '#bbc1cf'),
      TAG('Algorithms', 'backend', '#f2b067'),
      TAG('Database', 'postgres', '#6ea2f3'),
      TAG('Software', 'school', '#8ad3b8'),
    ],
  },
  {
    id: 'fin_spring',
    section: 'Project',
    title: 'Financial Event-Driven Market Impact System',
    subtitle: 'Explainable backend pipeline for finance signals',
    summary:
      'Backend-focused system that transforms financial events into structured and explainable market impact signals.',
    href: 'https://github.com/0206pdh/fin_spring',
    metrics: [
      { label: 'Stack', value: 'FastAPI' },
      { label: 'Store', value: 'Redis' },
      { label: 'Theme', value: 'Finance' },
    ],
    tags: [
      TAG('FastAPI', 'fastapi', '#68d8be'),
      TAG('PostgreSQL', 'postgres', '#6ea2f3'),
      TAG('Redis', 'redis', '#ed8686'),
      TAG('LangGraph', 'langgraph', '#9ad469'),
      TAG('Docker', 'docker', '#75acf5'),
    ],
  },
  {
    id: 'yt_filter',
    section: 'Project',
    title: 'YouTube Live Comment Filter',
    subtitle: 'Extension plus backend for toxic comment handling',
    summary:
      'Chrome extension and FastAPI backend for filtering harmful live chat with local inference and deployable infrastructure.',
    href: 'https://github.com/0206pdh/youtube_live_comment_filter',
    metrics: [
      { label: 'Client', value: 'Chrome' },
      { label: 'Model', value: 'Local' },
      { label: 'Deploy', value: 'AWS' },
    ],
    tags: [
      TAG('Python', 'python', '#7aaef4'),
      TAG('FastAPI', 'fastapi', '#68d8be'),
      TAG('Chrome Ext.', 'chrome', '#89a8ff'),
      TAG('Docker', 'docker', '#75acf5'),
      TAG('Backend', 'backend', '#d8dce2'),
    ],
  },
  {
    id: 'algonotion',
    section: 'Project',
    title: 'AlgoNotion Extension',
    subtitle: 'Baekjoon workflow automation into Notion',
    summary:
      'Extension workflow that captures solved problems and syncs metadata into a structured Notion database.',
    href: 'https://github.com/0206pdh/AlgoNotion_Extention',
    metrics: [
      { label: 'Mode', value: 'Auto' },
      { label: 'Source', value: 'BOJ' },
      { label: 'Target', value: 'Notion' },
    ],
    tags: [
      TAG('JavaScript', 'javascript', '#efd369'),
      TAG('Notion API', 'notion', '#d8dce2'),
      TAG('Chrome Ext.', 'chrome', '#89a8ff'),
      TAG('TypeScript', 'typescript', '#6ea2f3'),
      TAG('Backend', 'backend', '#d8dce2'),
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

function SkillChip({ tag }: { tag: SkillTag }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 12px',
        borderRadius: 18,
        border: '1px solid rgba(255,255,255,0.1)',
        background: 'rgba(160, 165, 176, 0.08)',
        color: '#eef1f5',
        fontSize: '0.8rem',
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
          width: 28,
          height: 28,
          borderRadius: 10,
          background: `${tag.color}22`,
          boxShadow: `inset 0 0 0 1px ${tag.color}18`,
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
        background: 'linear-gradient(180deg, rgba(171, 175, 184, 0.12), rgba(110, 114, 124, 0.05))',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 32,
        boxShadow: '0 30px 80px rgba(0,0,0,0.32)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        ...style,
      }}
    >
      {children}
    </div>
  )
}

function SectionTitle({ index, title }: { index: string; title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
      <span style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(230,234,240,0.42)' }}>
        {index}
      </span>
      <div style={{ width: 52, height: 1, background: 'rgba(255,255,255,0.12)' }} />
      <span style={{ fontSize: '0.72rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(230,234,240,0.42)' }}>
        {title}
      </span>
    </div>
  )
}

export default function CityScene() {
  const [selected, setSelected] = useState(0)
  const [dragging, setDragging] = useState(false)
  const targetRotationRef = useRef(0)
  const currentRotationRef = useRef(0)
  const dragStartRef = useRef(0)
  const dragBaseRef = useRef(0)
  const velocityRef = useRef(0.002)
  const [, tick] = useState(0)

  useEffect(() => {
    let frame = 0
    const animate = () => {
      frame = requestAnimationFrame(animate)
      if (!dragging) targetRotationRef.current += velocityRef.current
      currentRotationRef.current += (targetRotationRef.current - currentRotationRef.current) * 0.085
      velocityRef.current = dragging ? velocityRef.current * 0.9 : Math.max(0.0012, velocityRef.current * 0.996)
      tick((v) => (v + 1) % 100000)
    }
    animate()
    return () => cancelAnimationFrame(frame)
  }, [dragging])

  const items = useMemo(() => {
    const step = 360 / CARDS.length
    return CARDS.map((card, index) => {
      const angle = step * index + currentRotationRef.current * 57.2958
      const normalized = ((angle % 360) + 360) % 360
      const signed = normalized > 180 ? normalized - 360 : normalized
      const depth = 1 - Math.min(Math.abs(signed) / 180, 1)
      return { card, index, angle: signed, depth }
    })
  }, [tick])

  useEffect(() => {
    let best = 0
    let bestDepth = -1
    items.forEach((item) => {
      if (item.depth > bestDepth) {
        best = item.index
        bestDepth = item.depth
      }
    })
    if (!dragging && best !== selected) setSelected(best)
  }, [items, dragging, selected])

  const activeCard = CARDS[selected]

  const startDrag = (clientX: number) => {
    setDragging(true)
    dragStartRef.current = clientX
    dragBaseRef.current = targetRotationRef.current
  }

  const moveDrag = (clientX: number) => {
    if (!dragging) return
    const delta = (clientX - dragStartRef.current) / 520
    targetRotationRef.current = dragBaseRef.current + delta
    velocityRef.current = Math.max(-0.025, Math.min(0.025, delta * 0.018))
  }

  const stopDrag = () => setDragging(false)

  return (
    <div
      onMouseMove={(e) => moveDrag(e.clientX)}
      onMouseUp={stopDrag}
      onMouseLeave={stopDrag}
      onTouchMove={(e) => moveDrag(e.touches[0].clientX)}
      onTouchEnd={stopDrag}
      style={{
        minHeight: '100vh',
        background:
          'radial-gradient(circle at top left, rgba(160,165,176,0.12), transparent 26%), radial-gradient(circle at top right, rgba(131,142,165,0.12), transparent 20%), linear-gradient(180deg, #050608, #0b0d11 42%, #090b10)',
        color: '#f1f4f7',
      }}
    >
      <div
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at 50% 18%, rgba(255,255,255,0.06), transparent 24%), radial-gradient(circle at 50% 32%, rgba(143,155,180,0.08), transparent 30%)',
        }}
      />

      <main
        style={{
          position: 'relative',
          zIndex: 2,
          width: 'min(1440px, calc(100vw - 64px))',
          margin: '0 auto',
          padding: '32px 0 80px',
        }}
      >
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: '2.1rem', fontWeight: 800, letterSpacing: '-0.05em' }}>DP</div>
            <div style={{ marginTop: 6, color: 'rgba(241,244,247,0.56)', fontSize: '0.92rem' }}>
              Desktop-first portfolio carousel
            </div>
          </div>
          <GlassPanel style={{ padding: '10px 16px', borderRadius: 999 }}>
            <div style={{ color: '#edf1f6', fontSize: '0.86rem' }}>github.com/0206pdh</div>
          </GlassPanel>
        </header>

        <section style={{ minHeight: 'calc(100vh - 120px)', display: 'grid', placeItems: 'center', paddingBottom: 56 }}>
          <div style={{ width: '100%' }}>
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '8px 13px',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  marginBottom: 18,
                  fontSize: '0.8rem',
                  color: 'rgba(241,244,247,0.74)',
                }}
              >
                Main hero carousel
              </div>
              <h1 style={{ fontSize: 'clamp(4.4rem, 9vw, 8rem)', lineHeight: 0.9, letterSpacing: '-0.08em', marginBottom: 18 }}>
                Portfolio
                <br />
                Rotation
              </h1>
              <p style={{ maxWidth: 760, margin: '0 auto', color: 'rgba(241,244,247,0.68)', fontSize: '1.05rem', lineHeight: 1.8 }}>
                The rotating cards are now the first thing on screen. Explanations and details come after the hero,
                not beside it, and the motion has been rebuilt to feel less stiff.
              </p>
            </div>

            <div
              onMouseDown={(e) => startDrag(e.clientX)}
              onTouchStart={(e) => startDrag(e.touches[0].clientX)}
              style={{
                position: 'relative',
                height: 720,
                perspective: 2200,
                cursor: dragging ? 'grabbing' : 'grab',
                userSelect: 'none',
              }}
            >
              <div style={{ position: 'absolute', inset: 0, transformStyle: 'preserve-3d' }}>
                {items.map(({ card, index, angle, depth }) => {
                  const accent = card.tags[0]?.color ?? '#d8dce2'
                  const isFront = index === selected
                  return (
                    <button
                      key={card.id}
                      onClick={() => setSelected(index)}
                      style={{
                        position: 'absolute',
                        top: '49%',
                        left: '50%',
                        width: 380,
                        height: 500,
                        padding: 0,
                        border: 0,
                        background: 'transparent',
                        transform: `translate3d(-50%, -50%, 0) rotateY(${angle}deg) translateZ(430px) scale(${0.76 + depth * 0.28})`,
                        transformStyle: 'preserve-3d',
                        zIndex: Math.round(depth * 100),
                        cursor: 'pointer',
                        transition: dragging ? 'none' : 'transform 180ms ease-out',
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 36,
                          padding: '28px 26px 24px',
                          textAlign: 'left',
                          color: '#f1f4f7',
                          background:
                            `linear-gradient(180deg, rgba(176, 180, 190, 0.16), rgba(116, 121, 132, 0.05)), radial-gradient(circle at top right, ${accent}1f, transparent 32%)`,
                          border: `1px solid ${isFront ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.08)'}`,
                          boxShadow: isFront ? `0 40px 100px ${accent}22` : '0 24px 70px rgba(0,0,0,0.22)',
                          backdropFilter: 'blur(30px)',
                          WebkitBackdropFilter: 'blur(30px)',
                          opacity: 0.42 + depth * 0.58,
                        }}
                      >
                        <div
                          style={{
                            display: 'inline-flex',
                            padding: '8px 12px',
                            borderRadius: 999,
                            background: 'rgba(255,255,255,0.07)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            fontSize: '0.74rem',
                            color: 'rgba(241,244,247,0.68)',
                            marginBottom: 22,
                          }}
                        >
                          {card.section}
                        </div>
                        <h2 style={{ fontSize: '2.3rem', lineHeight: 0.98, letterSpacing: '-0.06em', marginBottom: 12 }}>
                          {card.title}
                        </h2>
                        <p style={{ fontSize: '0.98rem', lineHeight: 1.55, color: 'rgba(241,244,247,0.68)', marginBottom: 18 }}>
                          {card.subtitle}
                        </p>
                        <div style={{ width: 56, height: 4, borderRadius: 999, background: accent, marginBottom: 20 }} />
                        <p style={{ fontSize: '0.92rem', lineHeight: 1.78, color: 'rgba(241,244,247,0.82)', marginBottom: 24 }}>
                          {card.summary}
                        </p>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 18 }}>
                          {card.metrics.map((metric) => (
                            <div
                              key={metric.label}
                              style={{
                                padding: '11px 10px',
                                borderRadius: 16,
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.08)',
                              }}
                            >
                              <div style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: 3 }}>{metric.value}</div>
                              <div style={{ fontSize: '0.66rem', color: 'rgba(241,244,247,0.48)' }}>{metric.label}</div>
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

            <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: -24 }}>
              {CARDS.map((card, index) => (
                <button
                  key={card.id}
                  onClick={() => setSelected(index)}
                  style={{
                    width: index === selected ? 34 : 10,
                    height: 10,
                    borderRadius: 999,
                    border: 0,
                    background: index === selected ? '#f1f4f7' : 'rgba(255,255,255,0.18)',
                    cursor: 'pointer',
                    transition: 'all 180ms ease',
                  }}
                />
              ))}
            </div>
          </div>
        </section>

        <section style={{ paddingTop: 36, paddingBottom: 30 }}>
          <SectionTitle index="01" title="Overview" />
          <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 22 }}>
            <GlassPanel style={{ padding: '28px 30px' }}>
              <h2 style={{ fontSize: '2.4rem', lineHeight: 1, letterSpacing: '-0.05em', marginBottom: 16 }}>
                {activeCard.title}
              </h2>
              <p style={{ fontSize: '1rem', color: 'rgba(241,244,247,0.68)', lineHeight: 1.75, marginBottom: 18 }}>
                {activeCard.summary}
              </p>
              {activeCard.period && (
                <div style={{ marginBottom: 18, color: 'rgba(241,244,247,0.5)', fontSize: '0.86rem' }}>{activeCard.period}</div>
              )}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                {activeCard.tags.map((tag) => (
                  <SkillChip key={tag.label} tag={tag} />
                ))}
              </div>
            </GlassPanel>

            <GlassPanel style={{ padding: '26px 28px' }}>
              <div style={{ display: 'grid', gap: 12 }}>
                {activeCard.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '16px 18px',
                      borderRadius: 20,
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <span style={{ color: 'rgba(241,244,247,0.55)', fontSize: '0.82rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                      {metric.label}
                    </span>
                    <span style={{ fontSize: '1.15rem', fontWeight: 700 }}>{metric.value}</span>
                  </div>
                ))}
                {activeCard.href && (
                  <a
                    href={activeCard.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      marginTop: 6,
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 52,
                      borderRadius: 18,
                      textDecoration: 'none',
                      color: '#f1f4f7',
                      border: '1px solid rgba(255,255,255,0.12)',
                      background: 'rgba(255,255,255,0.08)',
                      fontWeight: 700,
                    }}
                  >
                    View GitHub
                  </a>
                )}
              </div>
            </GlassPanel>
          </div>
        </section>

        <section style={{ paddingTop: 26, paddingBottom: 30 }}>
          <SectionTitle index="02" title="Profile" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
            <GlassPanel style={{ padding: '24px 24px 22px' }}>
              <div style={{ fontSize: '0.74rem', color: 'rgba(241,244,247,0.44)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 12 }}>
                Academic
              </div>
              <h3 style={{ fontSize: '1.4rem', lineHeight: 1.05, marginBottom: 10 }}>Kwangwoon University</h3>
              <p style={{ color: 'rgba(241,244,247,0.68)', lineHeight: 1.7 }}>
                Department of Computer Engineering, attended from 2020 to 2026.
              </p>
            </GlassPanel>
            <GlassPanel style={{ padding: '24px 24px 22px' }}>
              <div style={{ fontSize: '0.74rem', color: 'rgba(241,244,247,0.44)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 12 }}>
                Interest
              </div>
              <h3 style={{ fontSize: '1.4rem', lineHeight: 1.05, marginBottom: 10 }}>Backend and Cloud</h3>
              <p style={{ color: 'rgba(241,244,247,0.68)', lineHeight: 1.7 }}>
                AWS, APIs, data stores, automation, deployment flow, and practical service structure.
              </p>
            </GlassPanel>
            <GlassPanel style={{ padding: '24px 24px 22px' }}>
              <div style={{ fontSize: '0.74rem', color: 'rgba(241,244,247,0.44)', textTransform: 'uppercase', letterSpacing: '0.18em', marginBottom: 12 }}>
                Direction
              </div>
              <h3 style={{ fontSize: '1.4rem', lineHeight: 1.05, marginBottom: 10 }}>Interactive Presentation</h3>
              <p style={{ color: 'rgba(241,244,247,0.68)', lineHeight: 1.7 }}>
                Using 3D and glass UI selectively to present work without drowning the content.
              </p>
            </GlassPanel>
          </div>
        </section>

        <section style={{ paddingTop: 26 }}>
          <SectionTitle index="03" title="Projects" />
          <div style={{ display: 'grid', gap: 16 }}>
            {CARDS.filter((card) => card.href).map((card) => (
              <GlassPanel key={card.id} style={{ padding: '24px 26px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 18, alignItems: 'center' }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: 'rgba(241,244,247,0.44)', letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10 }}>
                      {card.section}
                    </div>
                    <h3 style={{ fontSize: '1.5rem', lineHeight: 1.05, marginBottom: 10 }}>{card.title}</h3>
                    <p style={{ color: 'rgba(241,244,247,0.66)', lineHeight: 1.72, marginBottom: 14 }}>{card.summary}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                      {card.tags.map((tag) => (
                        <SkillChip key={tag.label} tag={tag} />
                      ))}
                    </div>
                  </div>
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      textDecoration: 'none',
                      color: '#f1f4f7',
                      padding: '12px 16px',
                      borderRadius: 16,
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      fontWeight: 700,
                      alignSelf: 'start',
                    }}
                  >
                    Open Repo
                  </a>
                </div>
              </GlassPanel>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
