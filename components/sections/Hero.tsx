'use client'

import { useEffect, useState } from 'react'

export default function Hero() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 400)
    return () => clearTimeout(t)
  }, [])

  return (
    <section
      id="hero"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '0 0 56px 56px',
      }}
    >
      {/* Top-right: small label */}
      <div
        style={{
          position: 'absolute',
          top: 100,
          right: 48,
          opacity: visible ? 0.45 : 0,
          transition: 'opacity 1.5s ease 1.2s',
          textAlign: 'right',
          pointerEvents: 'none',
        }}
      >
        <p style={{ fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: '#5070a0', lineHeight: 2 }}>
          Move mouse<br />to explore
        </p>
      </div>

      {/* Bottom-left: identity */}
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'opacity 1.2s ease 0.5s, transform 1.2s ease 0.5s',
        }}
      >
        {/* Name block */}
        <div style={{ marginBottom: 18 }}>
          <h1
            style={{
              fontSize: 'clamp(2rem, 4.5vw, 3.8rem)',
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: '-0.03em',
              background: 'linear-gradient(120deg, #d0e2ff 0%, #8ab4ff 55%, #a880ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 4,
            }}
          >
            Dohyun Park
          </h1>
          <span
            style={{
              fontSize: '0.85rem',
              color: 'rgba(130,165,255,0.45)',
              letterSpacing: '0.1em',
              fontWeight: 400,
            }}
          >
            박도현
          </span>
        </div>

        {/* Divider + title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
          <div style={{ width: 28, height: 1, background: 'rgba(80,120,220,0.5)' }} />
          <span
            style={{
              fontSize: '0.78rem',
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'rgba(130,165,240,0.65)',
              fontWeight: 500,
            }}
          >
            Cloud &amp; Backend Engineer
          </span>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <a
            href="https://github.com/0206pdh"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: '0.78rem',
              color: 'rgba(140,180,255,0.6)',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              transition: 'color 0.25s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#7ab0ff' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(140,180,255,0.6)' }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            github.com/0206pdh
          </a>
          <span style={{ width: 3, height: 3, borderRadius: '50%', background: 'rgba(80,120,200,0.4)' }} />
          <a
            href="mailto:0206pdh@naver.com"
            style={{
              fontSize: '0.78rem',
              color: 'rgba(140,180,255,0.6)',
              textDecoration: 'none',
              letterSpacing: '0.04em',
              transition: 'color 0.25s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.color = '#c0a8ff' }}
            onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(140,180,255,0.6)' }}
          >
            0206pdh@naver.com
          </a>
        </div>
      </div>

      {/* Scroll cue — bottom-right */}
      <div
        style={{
          position: 'absolute',
          bottom: 52,
          right: 48,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          opacity: visible ? 0.4 : 0,
          transition: 'opacity 1.5s ease 1.5s',
        }}
      >
        <div
          style={{
            width: 1,
            height: 60,
            background: 'linear-gradient(to bottom, rgba(80,120,220,0), rgba(80,120,220,0.6))',
            animation: 'bounce-down 1.8s ease-in-out infinite',
          }}
        />
        <span style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#5070a0' }}>
          scroll
        </span>
      </div>
    </section>
  )
}
