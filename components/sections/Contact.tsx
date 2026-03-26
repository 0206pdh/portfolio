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

  const LINKS = [
    {
      label: 'GitHub',
      value: '@0206pdh',
      href: 'https://github.com/0206pdh',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
      color: '#7ab0ff',
    },
    {
      label: 'Email',
      value: '0206pdh@naver.com',
      href: 'mailto:0206pdh@naver.com',
      icon: (
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="2" y="4" width="20" height="16" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      ),
      color: '#c0a8ff',
    },
  ]

  return (
    <section
      id="contact"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '100px 24px',
      }}
    >
      <div
        ref={ref}
        style={{
          maxWidth: 700,
          width: '100%',
          textAlign: 'center',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(50px)',
          transition: 'opacity 1s ease, transform 1s ease',
        }}
      >
        {/* Glow orb */}
        <div
          style={{
            position: 'absolute',
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(80,60,200,0.08) 0%, transparent 70%)',
            transform: 'translate(-50%, -50%)',
            left: '50%',
            pointerEvents: 'none',
          }}
        />

        <p style={{ fontSize: '0.75rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#5080c0', marginBottom: 16 }}>
          Get In Touch
        </p>

        <h2
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: 20,
            background: 'linear-gradient(135deg, #c8d8ff 0%, #7ab0ff 50%, #a080ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Let&apos;s Connect
        </h2>

        <p
          style={{
            fontSize: '1.05rem',
            color: 'rgba(170,200,255,0.7)',
            lineHeight: 1.7,
            maxWidth: 480,
            margin: '0 auto 56px',
          }}
        >
          클라우드 엔지니어링, DevOps, 또는 백엔드 개발 관련해서 이야기 나누고 싶으시면 언제든지 연락주세요.
        </p>

        {/* Contact cards */}
        <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 64 }}>
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.label === 'GitHub' ? '_blank' : undefined}
              rel={link.label === 'GitHub' ? 'noopener noreferrer' : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '20px 28px',
                borderRadius: 14,
                background: 'rgba(8,18,45,0.65)',
                backdropFilter: 'blur(12px)',
                border: `1px solid rgba(80,130,220,0.2)`,
                color: link.color,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                minWidth: 220,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = `${link.color}55`
                e.currentTarget.style.boxShadow = `0 8px 30px ${link.color}25`
                e.currentTarget.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(80,130,220,0.2)'
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <span style={{ opacity: 0.85 }}>{link.icon}</span>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(160,190,240,0.5)', marginBottom: 2 }}>
                  {link.label}
                </div>
                <div style={{ fontSize: '0.9rem', fontWeight: 600 }}>{link.value}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            borderTop: '1px solid rgba(60,100,180,0.2)',
            paddingTop: 32,
            color: 'rgba(120,160,220,0.4)',
            fontSize: '0.8rem',
            letterSpacing: '0.05em',
          }}
        >
          <p>© 2026 Dohyun Park · Built with Next.js & Three.js · Deployed on Vercel</p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: 8,
              marginTop: 12,
              flexWrap: 'wrap',
            }}
          >
            {['AWS', 'DevOps', 'Cloud Engineering', 'Backend', 'Python', 'FastAPI'].map((t) => (
              <span key={t} style={{ padding: '2px 8px', borderRadius: 20, border: '1px solid rgba(60,100,180,0.25)', fontSize: '0.68rem' }}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
