'use client'

import React, { useState, useEffect } from 'react'
import { CARDS, SkillIcon, SkillTag } from '@/lib/data'

function SkillGlyph({ icon, color }: { icon: SkillIcon; color: string }) {
  const common = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }
  switch (icon) {
    case 'aws': return <svg {...common}><path d="M6 15.5c3.2 2 8.1 2 11.7-.1" stroke={color} strokeWidth="1.8" strokeLinecap="round" /><path d="M8.3 13.2l1.6-5.4h1.4l1.6 5.4m-2.4-1.4h1.7" stroke={color} strokeWidth="1.8" strokeLinejoin="round" /></svg>
    case 'python': return <svg {...common}><path d="M12 5.5c-3.4 0-3.2 1.5-3.2 1.5V9h6.4V7.3S15.4 5.5 12 5.5Z" stroke={color} strokeWidth="1.7" /><circle cx="10.2" cy="7.2" r="1" fill={color} /><path d="M12 18.5c3.4 0 3.2-1.5 3.2-1.5V15H8.8v1.7S8.6 18.5 12 18.5Z" stroke={color} strokeWidth="1.7" /><circle cx="13.8" cy="16.8" r="1" fill={color} /></svg>
    case 'fastapi': return <svg {...common}><path d="M18.5 5.5L9.2 18.5h4.2l1.4-4.4H11" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>
    case 'docker': return <svg {...common}><path d="M6 13.5h10.2c1 0 1.8-.3 2.3-.8.6-.6 1-1.5 1-2.8" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><path d="M7 10.3h2v2H7zm2.3 0h2v2h-2zm2.3 0h2v2h-2zm-2.3-2.3h2v2h-2z" fill={color} /></svg>
    case 'typescript': return <svg {...common}><rect x="5" y="5" width="14" height="14" rx="3" stroke={color} strokeWidth="1.7" /><path d="M8.5 9.2h7M12 9.2v7" stroke={color} strokeWidth="1.5" strokeLinecap="round" /></svg>
    case 'postgres': return <svg {...common}><path d="M9 17c-1.2 0-2-.8-2-2.1V9.1C7 6.9 8.5 5.5 10.5 5.5h1c3.6 0 5.5 2 5.5 5.1 0 2.8-1.6 4.4-4.1 4.4-.7 0-1.3-.1-1.9-.4V18c0 .6-.5 1-1 1" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
    case 'redis': return <svg {...common}><path d="M6 9.5l6-2 6 2-6 2-6-2Zm0 5l6 2 6-2M6 9.5v5M18 9.5v5" stroke={color} strokeWidth="1.7" strokeLinejoin="round" /></svg>
    case 'langgraph': return <svg {...common}><circle cx="8" cy="8" r="2.2" stroke={color} strokeWidth="1.7" /><circle cx="16.5" cy="7.5" r="2" stroke={color} strokeWidth="1.7" /><circle cx="12" cy="16" r="2.2" stroke={color} strokeWidth="1.7" /><path d="M9.8 9.1l4.7-1M9.3 9.8l1.8 4.1M14.8 9.3l-1.8 4" stroke={color} strokeWidth="1.6" strokeLinecap="round" /></svg>
    case 'javascript': return <svg {...common}><rect x="5" y="5" width="14" height="14" rx="3" stroke={color} strokeWidth="1.7" /><path d="M10.2 9v6c0 1-.5 1.7-1.8 1.7" stroke={color} strokeWidth="1.5" strokeLinecap="round" /></svg>
    case 'notion': return <svg {...common}><rect x="5" y="5" width="14" height="14" rx="2.2" stroke={color} strokeWidth="1.7" /><path d="M9 15V9l6 6V9" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
    case 'chrome': return <svg {...common}><circle cx="12" cy="12" r="7" stroke={color} strokeWidth="1.7" /><circle cx="12" cy="12" r="2.8" stroke={color} strokeWidth="1.7" /><path d="M12 5v4M6.2 8.3 9.7 14M17.8 8.3 14.3 14" stroke={color} strokeWidth="1.6" strokeLinecap="round" /></svg>
    case 'three': return <svg {...common}><path d="M12 5.5l6 3.5v7L12 19.5 6 16V9l6-3.5Zm0 0v14M6 9l6 3.5L18 9" stroke={color} strokeWidth="1.6" strokeLinejoin="round" /></svg>
    case 'backend': return <svg {...common}><path d="M7 8.5h10M7 12h10M7 15.5h6" stroke={color} strokeWidth="1.9" strokeLinecap="round" /><path d="M17 14.5 19 12l-2-2.5" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
    case 'school': return <svg {...common}><path d="M12 6 5.5 9.5 12 13l6.5-3.5L12 6Zm-4.5 5v3.5L12 18l4.5-3.5V11" stroke={color} strokeWidth="1.7" strokeLinejoin="round" /></svg>
    default: return null
  }
}

function SkillChip({ tag }: { tag: SkillTag }) {
  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      padding: '8px 14px',
      borderRadius: '24px',
      background: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      color: '#eef1f5',
      fontSize: '0.85rem',
      fontWeight: 500,
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.2s ease',
      cursor: 'default',
    }}
    onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.1)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.05)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0px)';
    }}
    >
      <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          borderRadius: 12,
          background: `${tag.color}15`,
          boxShadow: `inset 0 0 0 1px ${tag.color}30`,
        }}>
        <SkillGlyph icon={tag.icon} color={tag.color} />
      </span>
      {tag.label}
    </span>
  )
}

function SectionTitle({ index, title }: { index: string; title: string }) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 36, opacity: 0.9 }}>
        <span style={{ fontSize: '0.85rem', letterSpacing: '0.25em', fontWeight: 600, color: '#7aaef4' }}>
          {index}
        </span>
        <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, #7aaef4, transparent)' }} />
        <h2 style={{ fontSize: '1.8rem', letterSpacing: '-0.02em', fontWeight: 700, color: '#fff' }}>
          {title}
        </h2>
      </div>
    )
}

function GlassPanel({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
    return (
        <div style={{
            background: 'rgba(10, 15, 25, 0.45)', // Deep glass bg
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '24px',
            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            padding: '40px',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            ...style,
        }}
        onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 40px 80px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.15)';
        }}
        onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 30px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)';
        }}
        >
            {children}
        </div>
    )
}

export default function PortfolioUI() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const profileData = CARDS.find(c => c.id === 'profile')!
    const educationData = CARDS.find(c => c.id === 'education')!
    const projectCards = CARDS.filter(c => c.section === 'Project')

    return (
        <main style={{ position: 'relative', zIndex: 10, minHeight: '100vh', color: '#f1f4f7' }}>
            
            {/* Header */}
            <header style={{
                position: 'fixed',
                top: 0,
                width: '100%',
                padding: scrolled ? '16px 40px' : '32px 40px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                zIndex: 100,
                transition: 'all 0.3s ease',
                background: scrolled ? 'rgba(0, 2, 5, 0.7)' : 'transparent',
                backdropFilter: scrolled ? 'blur(20px)' : 'none',
                WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.05)' : '1px solid transparent'
            }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.05em' }}>
                    <span style={{ color: '#7aaef4' }}>D</span>.P
                </div>
                <a href="https://github.com/0206pdh" target="_blank" rel="noreferrer" style={{
                    padding: '8px 20px',
                    borderRadius: '999px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.15)'}
                onMouseLeave={(e) => (e.target as HTMLElement).style.background = 'rgba(255, 255, 255, 0.08)'}
                >
                    GitHub
                </a>
            </header>

            {/* Container */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 32px',
                display: 'flex',
                flexDirection: 'column',
                gap: '120px',
                paddingBottom: '120px'
            }}>
                
                {/* Hero Section */}
                <section style={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    paddingTop: '60px'
                }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '8px 16px',
                        borderRadius: '999px',
                        background: 'rgba(122, 174, 244, 0.1)',
                        border: '1px solid rgba(122, 174, 244, 0.2)',
                        color: '#7aaef4',
                        fontSize: '0.85rem',
                        fontWeight: 600,
                        letterSpacing: '0.05em',
                        marginBottom: '24px',
                        alignSelf: 'flex-start'
                    }}>
                        Portfolio 2026
                    </div>
                    
                    <h1 style={{
                        fontSize: 'clamp(4rem, 8vw, 6.5rem)',
                        fontWeight: 800,
                        lineHeight: 1.05,
                        letterSpacing: '-0.04em',
                        marginBottom: '24px',
                        background: 'linear-gradient(180deg, #fff 0%, rgba(255,255,255,0.6) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                    }}>
                        Abstract &amp; <br/>
                        <span style={{ color: '#7aaef4', background: 'none', WebkitTextFillColor: '#7aaef4' }}>Backend</span>
                    </h1>
                    
                    <p style={{
                        maxWidth: '600px',
                        fontSize: '1.25rem',
                        lineHeight: 1.6,
                        color: 'rgba(255, 255, 255, 0.6)',
                        marginBottom: '48px'
                    }}>
                        {profileData.subtitle}. Computer Engineering student focused on AWS, scalable systems, and building interactive, high-performance web experiences.
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                        {profileData.tags.map(tag => <SkillChip key={tag.label} tag={tag} />)}
                    </div>
                </section>

                {/* Info / About Section */}
                <section>
                    <SectionTitle index="01" title="Background" />
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                        <GlassPanel>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px', color: '#fff' }}>
                                {educationData.title}
                            </h3>
                            <h4 style={{ fontSize: '1.05rem', color: '#7aaef4', marginBottom: '16px' }}>{educationData.subtitle}</h4>
                            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, marginBottom: '24px' }}>
                                {educationData.summary}
                            </p>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                {educationData.metrics.map(m => (
                                    <div key={m.label}>
                                        <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{m.value}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>{m.label}</div>
                                    </div>
                                ))}
                            </div>
                        </GlassPanel>

                        <GlassPanel>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px', color: '#fff' }}>
                                Core Competencies
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div>
                                    <div style={{ fontSize: '1.05rem', color: '#7aaef4', marginBottom: '8px' }}>Cloud & Architecture</div>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                                        Experience with AWS infrastructure (ECS, ECR, Load Balancers) and backend deployments ensuring high availability.
                                    </p>
                                </div>
                                <div>
                                    <div style={{ fontSize: '1.05rem', color: '#7aaef4', marginBottom: '8px' }}>Backend & Data</div>
                                    <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                                        Building performant APIs utilizing Python (FastAPI), Redis for caching, and PostgreSQL for robust data management.
                                    </p>
                                </div>
                            </div>
                        </GlassPanel>
                    </div>
                </section>

                {/* Projects Section */}
                <section>
                    <SectionTitle index="02" title="Selected Works" />
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                        {projectCards.map((project, idx) => (
                            <GlassPanel key={project.id} style={{ 
                                padding: '48px',
                                display: 'grid',
                                gridTemplateColumns: idx % 2 === 0 ? '1.2fr 0.8fr' : '0.8fr 1.2fr',
                                gap: '48px',
                                alignItems: 'center'
                            }}>
                                <div style={{ order: idx % 2 === 0 ? 1 : 2 }}>
                                    <div style={{ fontSize: '0.85rem', color: '#7aaef4', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 600 }}>
                                        {project.metrics[2]?.value || project.section}
                                    </div>
                                    <h3 style={{ fontSize: '2.2rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '20px', letterSpacing: '-0.02em' }}>
                                        {project.title}
                                    </h3>
                                    <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '32px' }}>
                                        {project.summary}
                                    </p>
                                    
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '40px' }}>
                                        {project.tags.map(tag => <SkillChip key={tag.label} tag={tag} />)}
                                    </div>

                                    {project.href && (
                                        <a href={project.href} target="_blank" rel="noreferrer" style={{
                                            display: 'inline-flex',
                                            padding: '12px 28px',
                                            borderRadius: '12px',
                                            background: '#fff',
                                            color: '#000',
                                            textDecoration: 'none',
                                            fontWeight: 700,
                                            fontSize: '0.95rem',
                                            transition: 'transform 0.2s',
                                        }}
                                        onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'}
                                        onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}
                                        >
                                            View Source Code
                                        </a>
                                    )}
                                </div>

                                <div style={{ 
                                    order: idx % 2 === 0 ? 2 : 1, 
                                    background: 'rgba(0,0,0,0.2)', 
                                    borderRadius: '20px', 
                                    padding: '32px',
                                    border: '1px solid rgba(255,255,255,0.05)',
                                    display: 'grid',
                                    gridTemplateColumns: '1fr',
                                    gap: '24px'
                                }}>
                                    {project.metrics.map(metric => (
                                        <div key={metric.label} style={{
                                            padding: '20px',
                                            background: 'rgba(255,255,255,0.03)',
                                            borderRadius: '16px',
                                            border: '1px solid rgba(255,255,255,0.02)'
                                        }}>
                                            <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                                                {metric.label}
                                            </div>
                                            <div style={{ fontSize: '1.4rem', fontWeight: 600, color: '#fff' }}>
                                                {metric.value}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </GlassPanel>
                        ))}
                    </div>
                </section>

                {/* Footer */}
                <footer style={{ 
                    textAlign: 'center', 
                    padding: '60px 0 20px', 
                    borderTop: '1px solid rgba(255,255,255,0.05)',
                    color: 'rgba(255,255,255,0.4)',
                    fontSize: '0.9rem'
                }}>
                    <p>© {new Date().getFullYear()} Dohyun Park. Crafted with Next.js & Three.js.</p>
                </footer>
            </div>
        </main>
    )
}
