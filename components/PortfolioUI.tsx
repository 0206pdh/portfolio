'use client'

import React from 'react'
import { CARDS, SkillIcon, SkillTag } from '@/lib/data'

interface PortfolioUIProps {
  activeCardId: string | null
  onClose: () => void
}

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
    }}>
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

export default function PortfolioUI({ activeCardId, onClose }: PortfolioUIProps) {
    const activeCard = CARDS.find(c => c.id === activeCardId)

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            pointerEvents: 'none', // Allow clicking through to the 3D scene
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#f1f4f7',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif'
        }}>
            {/* Header HUD */}
            <header style={{
                position: 'absolute',
                top: 0,
                width: '100%',
                padding: '32px 40px',
                display: 'flex',
                justifyContent: 'space-between',
                pointerEvents: 'auto',
            }}>
                <div style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.05em' }}>
                    <span style={{ color: '#7aaef4' }}>D</span>.P
                </div>
                {!activeCardId && (
                    <div style={{
                        padding: '10px 24px',
                        borderRadius: '999px',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        backdropFilter: 'blur(10px)',
                        fontSize: '0.9rem',
                        fontWeight: 600,
                        WebkitBackdropFilter: 'blur(10px)',
                        animation: 'pulse 3s infinite'
                    }}>
                        모델 내의 블록을 클릭해 보세요
                    </div>
                )}
            </header>

            {/* Main Modal Overlay */}
            {activeCard && (
                <div style={{
                    pointerEvents: 'auto',
                    background: 'rgba(10, 15, 25, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '24px',
                    boxShadow: '0 40px 100px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(40px)',
                    WebkitBackdropFilter: 'blur(40px)',
                    padding: '48px',
                    width: 'min(90vw, 800px)',
                    animation: 'fadeInUp 0.4s ease-out forwards',
                    position: 'relative'
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '24px',
                            right: '24px',
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#fff',
                            fontSize: '1.2rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                        }}
                    >
                        ✕
                    </button>

                    <div style={{ fontSize: '0.85rem', color: '#7aaef4', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 600 }}>
                        {activeCard.metrics[2]?.value || activeCard.section}
                    </div>
                    
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.1, marginBottom: '20px', letterSpacing: '-0.02em' }}>
                        {activeCard.title}
                    </h2>
                    
                    <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: '32px' }}>
                        {activeCard.summary}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(100px, 1fr))', gap: '16px', marginBottom: '32px' }}>
                        {activeCard.metrics.map(metric => (
                             <div key={metric.label} style={{
                                padding: '16px',
                                background: 'rgba(255,255,255,0.03)',
                                borderRadius: '16px',
                                border: '1px solid rgba(255,255,255,0.05)'
                            }}>
                                <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                                    {metric.label}
                                </div>
                                <div style={{ fontSize: '1.2rem', fontWeight: 600, color: '#fff' }}>
                                    {metric.value}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {activeCard.tags.map(tag => <SkillChip key={tag.label} tag={tag} />)}
                    </div>

                    {activeCard.href && (
                        <div style={{ marginTop: '32px' }}>
                            <a href={activeCard.href} target="_blank" rel="noreferrer" style={{
                                display: 'inline-block',
                                padding: '14px 32px',
                                borderRadius: '12px',
                                background: '#7aaef4',
                                color: '#000',
                                textDecoration: 'none',
                                fontWeight: 700,
                                fontSize: '0.95rem',
                                transition: 'transform 0.2s',
                            }}>
                                View Source Code
                            </a>
                        </div>
                    )}
                </div>
            )}
            
            <style dangerouslySetInnerHTML={{__html: `
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulse {
                    0% { opacity: 0.6; }
                    50% { opacity: 1; }
                    100% { opacity: 0.6; }
                }
            `}} />
        </div>
    )
}
