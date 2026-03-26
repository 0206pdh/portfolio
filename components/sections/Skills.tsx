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

const SKILL_GROUPS = [
  {
    title: 'Cloud & DevOps',
    icon: '☁️',
    color: '#4a90ff',
    items: [
      { name: 'AWS (EC2, S3, RDS, IAM)', level: 72 },
      { name: 'Docker & Container', level: 80 },
      { name: 'Linux / Shell', level: 75 },
      { name: 'CI/CD (GitHub Actions)', level: 68 },
    ],
  },
  {
    title: 'Backend',
    icon: '⚙️',
    color: '#a855f7',
    items: [
      { name: 'Python / FastAPI', level: 85 },
      { name: 'Node.js / Express', level: 72 },
      { name: 'Java / Spring', level: 65 },
      { name: 'REST API Design', level: 80 },
    ],
  },
  {
    title: 'Database',
    icon: '🗄️',
    color: '#22d3ee',
    items: [
      { name: 'PostgreSQL', level: 78 },
      { name: 'Redis', level: 72 },
      { name: 'MySQL', level: 70 },
      { name: 'TimescaleDB / pgvector', level: 60 },
    ],
  },
  {
    title: 'AI / ML Integration',
    icon: '🤖',
    color: '#f97316',
    items: [
      { name: 'OpenAI API / LLM', level: 70 },
      { name: 'LangGraph', level: 62 },
      { name: 'ML Model Inference', level: 58 },
      { name: 'Semantic Search', level: 65 },
    ],
  },
]

function SkillBar({ name, level, color, visible }: { name: string; level: number; color: string; visible: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', color: 'rgba(190,210,255,0.85)', fontWeight: 500 }}>{name}</span>
        <span style={{ fontSize: '0.72rem', color: color, fontWeight: 600 }}>{level}%</span>
      </div>
      <div
        style={{
          height: 4,
          borderRadius: 4,
          background: 'rgba(40,70,140,0.4)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            borderRadius: 4,
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            width: visible ? `${level}%` : '0%',
            transition: 'width 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            boxShadow: `0 0 8px ${color}66`,
          }}
        />
      </div>
    </div>
  )
}

function SkillCard({ group, index }: { group: typeof SKILL_GROUPS[0]; index: number }) {
  const { ref, visible } = useFadeIn(index * 120)

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(50px)',
        transition: 'opacity 0.8s ease, transform 0.8s ease',
      }}
    >
      <div
        style={{
          background: 'rgba(8,18,45,0.6)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: `1px solid ${group.color}25`,
          borderRadius: 16,
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          boxShadow: `0 4px 30px rgba(0,0,0,0.3), inset 0 1px 0 ${group.color}18`,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: '1.4rem' }}>{group.icon}</span>
          <h3 style={{ fontWeight: 600, fontSize: '1rem', color: group.color }}>{group.title}</h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {group.items.map((item) => (
            <SkillBar key={item.name} name={item.name} level={item.level} color={group.color} visible={visible} />
          ))}
        </div>
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
          Capabilities
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
          Skills & Expertise
        </h2>
      </div>

      <div
        style={{
          maxWidth: 900,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}
      >
        {SKILL_GROUPS.map((g, i) => (
          <SkillCard key={g.title} group={g} index={i} />
        ))}
      </div>
    </section>
  )
}
