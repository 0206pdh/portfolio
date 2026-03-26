'use client'

import { useEffect, useState } from 'react'

const SECTIONS = ['Home', 'About', 'Projects', 'Skills', 'Contact']

export default function Navigation() {
  const [active, setActive] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const ids = ['hero', 'about', 'projects', 'skills', 'contact']

    const observers = ids.map((id, i) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(i) },
        { threshold: 0.4 }
      )
      obs.observe(el)
      return obs
    })

    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      observers.forEach((o) => o?.disconnect())
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const ids = ['hero', 'about', 'projects', 'skills', 'contact']

  return (
    <>
      {/* Top bar */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '16px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
          background: scrolled ? 'rgba(2,8,16,0.7)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(80,130,220,0.12)' : '1px solid transparent',
        }}
      >
        <span
          onClick={() => scrollTo('hero')}
          style={{
            fontWeight: 700,
            fontSize: '1.1rem',
            color: '#7ab0ff',
            cursor: 'pointer',
            letterSpacing: '0.08em',
          }}
        >
          PDH<span style={{ color: '#a080ff' }}>.</span>
        </span>

        <div style={{ display: 'flex', gap: 32 }}>
          {SECTIONS.slice(1).map((s, i) => (
            <button
              key={s}
              onClick={() => scrollTo(ids[i + 1])}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 500,
                letterSpacing: '0.06em',
                color: active === i + 1 ? '#7ab0ff' : 'rgba(180,200,240,0.65)',
                transition: 'color 0.3s',
                textTransform: 'uppercase',
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </nav>

      {/* Side dots */}
      <div
        style={{
          position: 'fixed',
          right: 24,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          alignItems: 'center',
        }}
      >
        {SECTIONS.map((s, i) => (
          <button
            key={s}
            onClick={() => scrollTo(ids[i])}
            title={s}
            style={{
              width: active === i ? 8 : 5,
              height: active === i ? 8 : 5,
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              background: active === i ? '#7ab0ff' : 'rgba(120,160,240,0.35)',
              transition: 'all 0.3s ease',
              padding: 0,
              boxShadow: active === i ? '0 0 8px rgba(120,170,255,0.8)' : 'none',
            }}
          />
        ))}
      </div>
    </>
  )
}
