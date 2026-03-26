'use client'

import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'hero',     label: 'Home' },
  { id: 'about',   label: 'About' },
  { id: 'projects',label: 'Projects' },
  { id: 'skills',  label: 'Skills' },
  { id: 'contact', label: 'Contact' },
]

export default function Navigation() {
  const [active, setActive] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const observers = SECTIONS.map(({ id }, i) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([e]) => { if (e.isIntersecting) setActive(i) },
        { threshold: 0.3 }
      )
      obs.observe(el)
      return obs
    })
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observers.forEach((o) => o?.disconnect())
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  const goto = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      {/* Logo — top left */}
      <div
        style={{
          position: 'fixed',
          top: 32,
          left: 48,
          zIndex: 100,
          opacity: scrolled ? 1 : 0.6,
          transition: 'opacity 0.4s ease',
          cursor: 'pointer',
        }}
        onClick={() => goto('hero')}
      >
        <span
          style={{
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '0.12em',
            color: 'rgba(140,180,255,0.7)',
            textTransform: 'uppercase',
          }}
        >
          PDH<span style={{ color: '#8060e0', opacity: 0.8 }}>.</span>dev
        </span>
      </div>

      {/* Side dots — right */}
      <div
        style={{
          position: 'fixed',
          right: 28,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
          alignItems: 'center',
        }}
      >
        {SECTIONS.map(({ id, label }, i) => (
          <button
            key={id}
            onClick={() => goto(id)}
            title={label}
            style={{
              width: active === i ? 6 : 4,
              height: active === i ? 6 : 4,
              borderRadius: '50%',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              background: active === i ? '#7ab0ff' : 'rgba(100,140,220,0.28)',
              boxShadow: active === i ? '0 0 7px rgba(120,170,255,0.7)' : 'none',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </div>
    </>
  )
}
