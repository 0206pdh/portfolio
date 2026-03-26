'use client'

import { useEffect, useState } from 'react'

export default function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        position: 'relative',
        padding: '0 24px',
      }}
    >
      {/* Subtle glow orb behind text */}
      <div
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(60,100,220,0.12) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'opacity 1s ease, transform 1s ease',
        }}
      >
        {/* Eyebrow */}
        <p
          style={{
            fontSize: '0.8rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#6090e0',
            marginBottom: 20,
            fontWeight: 500,
          }}
        >
          Cloud &amp; Backend Engineer
        </p>

        {/* Name */}
        <h1
          style={{
            fontSize: 'clamp(2.8rem, 8vw, 6.5rem)',
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: 8,
            background: 'linear-gradient(135deg, #c8d8ff 0%, #7ab0ff 40%, #9070ff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Dohyun Park
        </h1>
        <h1
          style={{
            fontSize: 'clamp(1.8rem, 5vw, 3.8rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.01em',
            marginBottom: 28,
            color: 'rgba(160,190,255,0.7)',
          }}
        >
          박도현
        </h1>

        {/* Divider */}
        <div
          style={{
            width: 60,
            height: 2,
            background: 'linear-gradient(90deg, #4060c0, #8060e0)',
            margin: '0 auto 28px',
            borderRadius: 2,
          }}
        />

        {/* Tagline */}
        <p
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: 'rgba(180,210,255,0.75)',
            maxWidth: 540,
            lineHeight: 1.7,
            marginBottom: 48,
          }}
        >
          AWS 기반 클라우드 인프라와 DevOps를 학습 중인 백엔드 엔지니어.
          <br />
          Building reliable systems in the cloud.
        </p>

        {/* CTA buttons */}
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="https://github.com/0206pdh"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '12px 28px',
              borderRadius: 8,
              background: 'rgba(60,100,220,0.25)',
              border: '1px solid rgba(80,130,240,0.4)',
              color: '#a0c8ff',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              letterSpacing: '0.04em',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
            onMouseEnter={(e) => {
              const t = e.currentTarget
              t.style.background = 'rgba(70,120,240,0.4)'
              t.style.boxShadow = '0 0 20px rgba(80,130,240,0.3)'
            }}
            onMouseLeave={(e) => {
              const t = e.currentTarget
              t.style.background = 'rgba(60,100,220,0.25)'
              t.style.boxShadow = 'none'
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub
          </a>
          <a
            href="mailto:0206pdh@naver.com"
            style={{
              padding: '12px 28px',
              borderRadius: 8,
              background: 'rgba(100,60,200,0.2)',
              border: '1px solid rgba(130,80,220,0.35)',
              color: '#c0a8ff',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.9rem',
              letterSpacing: '0.04em',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              const t = e.currentTarget
              t.style.background = 'rgba(120,70,220,0.35)'
              t.style.boxShadow = '0 0 20px rgba(120,80,220,0.3)'
            }}
            onMouseLeave={(e) => {
              const t = e.currentTarget
              t.style.background = 'rgba(100,60,200,0.2)'
              t.style.boxShadow = 'none'
            }}
          >
            Contact Me
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: 40,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
          opacity: visible ? 0.6 : 0,
          transition: 'opacity 1.5s ease 1s',
        }}
      >
        <span style={{ fontSize: '0.7rem', letterSpacing: '0.15em', color: '#6080b8', textTransform: 'uppercase' }}>
          Scroll
        </span>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#5070b8"
          strokeWidth="2"
          style={{ animation: 'bounce-down 1.5s ease-in-out infinite' }}
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}
