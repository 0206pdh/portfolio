'use client'

import { useEffect, useRef, useState } from 'react'

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.2 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      id="contact"
      style={{ padding: '140px 56px 100px', minHeight: '80vh', display: 'flex', alignItems: 'flex-end' }}
    >
      <div
        ref={ref}
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(40px)',
          transition: 'opacity 1s ease, transform 1s ease',
        }}
      >
        {/* Index */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 48 }}>
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#3a5898' }}>04</span>
          <div style={{ width: 60, height: 1, background: 'rgba(60,90,160,0.25)' }} />
          <span style={{ fontSize: '0.65rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#3a5898' }}>Contact</span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: 32,
            background: 'linear-gradient(120deg, #c8d8ff 0%, #8ab4ff 50%, #b080ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Let&apos;s build<br />something together.
        </h2>

        <p style={{ fontSize: '0.9rem', color: 'rgba(150,185,255,0.55)', lineHeight: 1.8, maxWidth: 420, marginBottom: 48 }}>
          클라우드 엔지니어링, DevOps, 백엔드 관련 이야기라면<br />언제든 환영합니다.
        </p>

        {/* Links */}
        <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap' }}>
          {[
            {
              label: 'GitHub',
              value: 'github.com/0206pdh',
              href: 'https://github.com/0206pdh',
              color: '#7ab0ff',
            },
            {
              label: 'Email',
              value: '0206pdh@naver.com',
              href: 'mailto:0206pdh@naver.com',
              color: '#c0a8ff',
            },
          ].map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.label === 'GitHub' ? '_blank' : undefined}
              rel={l.label === 'GitHub' ? 'noopener noreferrer' : undefined}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                textDecoration: 'none',
                transition: 'opacity 0.25s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.8' }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1' }}
            >
              <span style={{ fontSize: '0.62rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(100,140,210,0.45)' }}>
                {l.label}
              </span>
              <span
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: l.color,
                  borderBottom: `1px solid ${l.color}30`,
                  paddingBottom: 2,
                }}
              >
                {l.value}
              </span>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 80,
            paddingTop: 28,
            borderTop: '1px solid rgba(50,80,160,0.18)',
            fontSize: '0.7rem',
            color: 'rgba(80,110,170,0.4)',
            letterSpacing: '0.06em',
          }}
        >
          © 2026 Dohyun Park · Next.js + Three.js · Vercel
        </div>
      </div>
    </section>
  )
}
