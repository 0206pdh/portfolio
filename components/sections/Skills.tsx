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

const GROUPS = [
  {
    icon: '☁️', title: 'Cloud & DevOps', color: '#4a90ff',
    items: [
      { name: 'AWS (EC2, S3, RDS, IAM)', level: 72 },
      { name: 'Docker',                  level: 80 },
      { name: 'Linux / Shell',           level: 75 },
      { name: 'GitHub Actions CI/CD',    level: 68 },
    ],
  },
  {
    icon: '⚙️', title: 'Backend', color: '#a060ff',
    items: [
      { name: 'Python / FastAPI', level: 85 },
      { name: 'Node.js / Express', level: 72 },
      { name: 'Java / Spring',    level: 65 },
      { name: 'REST API Design',  level: 80 },
    ],
  },
  {
    icon: '🗄️', title: 'Database', color: '#22d3ee',
    items: [
      { name: 'PostgreSQL',          level: 78 },
      { name: 'Redis',               level: 72 },
      { name: 'MySQL',               level: 70 },
      { name: 'TimescaleDB/pgvector',level: 60 },
    ],
  },
  {
    icon: '🤖', title: 'AI / LLM', color: '#f060c8',
    items: [
      { name: 'OpenAI API / Function Calling', level: 70 },
      { name: 'LangGraph',                     level: 62 },
      { name: 'Local ML Inference',            level: 58 },
      { name: 'Semantic Search (pgvector)',     level: 65 },
    ],
  },
]

function Bar({ name, level, color, visible }: { name: string; level: number; color: string; visible: boolean }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: '0.82rem', color: 'rgba(185,210,255,0.8)', fontWeight: 500 }}>{name}</span>
        <span style={{ fontSize: '0.68rem', color, fontWeight: 600 }}>{level}%</span>
      </div>
      <div style={{ height: 3, borderRadius: 3, background: 'rgba(40,70,140,0.35)', overflow: 'hidden' }}>
        <div
          style={{
            height: '100%',
            borderRadius: 3,
            background: `linear-gradient(90deg, ${color}70, ${color})`,
            width: visible ? `${level}%` : '0%',
            transition: 'width 1.3s cubic-bezier(.25,.46,.45,.94)',
            boxShadow: `0 0 6px ${color}50`,
          }}
        />
      </div>
    </div>
  )
}

function Card({ g, i }: { g: typeof GROUPS[0]; i: number }) {
  const { ref, visible } = useFadeIn(i * 100)
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
        background: 'rgba(6,14,38,0.65)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
        border: `1px solid ${g.color}20`,
        borderRadius: 14,
        padding: '28px 30px',
        display: 'flex',
        flexDirection: 'column',
        gap: 18,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: '1.25rem' }}>{g.icon}</span>
        <span style={{ fontSize: '0.88rem', fontWeight: 600, color: g.color }}>{g.title}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {g.items.map((it) => <Bar key={it.name} name={it.name} level={it.level} color={g.color} visible={visible} />)}
      </div>
    </div>
  )
}

export default function Skills() {
  const headRef = useRef<HTMLDivElement>(null)
  const [headVisible, setHeadVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeadVisible(true) }, { threshold: 0.2 })
    if (headRef.current) obs.observe(headRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="skills"
      style={{ padding: '140px 56px', minHeight: '100vh' }}
    >
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
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#3a5898' }}>03</span>
        <div style={{ width: 60, height: 1, background: 'rgba(60,90,160,0.25)' }} />
        <span style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#3a5898' }}>Skills</span>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
          gap: 22,
          maxWidth: 1100,
        }}
      >
        {GROUPS.map((g, i) => <Card key={g.title} g={g} i={i} />)}
      </div>
    </section>
  )
}
