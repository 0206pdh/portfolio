'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

type TowerKind = 'hero' | 'project' | 'skills' | 'education'
type SkillIcon =
  | 'aws'
  | 'python'
  | 'fastapi'
  | 'docker'
  | 'typescript'
  | 'database'
  | 'algorithm'
  | 'software'
  | 'postgres'
  | 'redis'
  | 'langgraph'
  | 'ml'
  | 'extension'
  | 'javascript'
  | 'notion'
  | 'boj'
  | 'three'
  | 'backend'

interface SkillTag {
  label: string
  icon: SkillIcon
  color: string
}

interface TowerData {
  id: string
  kind: TowerKind
  name: string
  subtitle: string
  period?: string
  summary: string
  link?: string
  tags: SkillTag[]
  stats?: { label: string; value: string }[]
  details?: string[]
  x: number
  z: number
  w: number
  d: number
  h: number
  base: number
  glow: number
  wire: number
}

const BG = 0x07111f
const FLOOR_HEIGHT = 1.32

const TAG = (label: string, icon: SkillIcon, color: string): SkillTag => ({ label, icon, color })

const TOWERS: TowerData[] = [
  {
    id: 'hero',
    kind: 'hero',
    name: 'Dohyun Park',
    subtitle: 'Cloud, backend, and interactive web portfolio',
    period: '2020 - 2026',
    summary:
      'Computer Engineering student focused on AWS, backend systems, and practical product building.',
    details: [
      'Kwangwoon University, Department of Computer Engineering',
      'Built projects across finance, browser extensions, automation, and AI-assisted systems',
      'Interested in infrastructure, APIs, data flow, and maintainable service design',
    ],
    tags: [
      TAG('AWS', 'aws', '#ffb14a'),
      TAG('Python', 'python', '#69a8ff'),
      TAG('FastAPI', 'fastapi', '#3dd7b2'),
      TAG('Docker', 'docker', '#4ea1ff'),
      TAG('TypeScript', 'typescript', '#5b9dff'),
    ],
    stats: [
      { label: 'School', value: 'Kwangwoon' },
      { label: 'Major', value: 'CSE' },
      { label: 'Focus', value: 'Cloud' },
    ],
    x: 0,
    z: 0,
    w: 3.2,
    d: 3.2,
    h: 15,
    base: 0x102746,
    glow: 0x67a9ff,
    wire: 0x8ac2ff,
  },
  {
    id: 'education',
    kind: 'education',
    name: 'Kwangwoon University',
    subtitle: 'Department of Computer Engineering',
    period: 'Mar 2020 - Feb 2026',
    summary:
      'Academic foundation in software, algorithms, databases, systems, and engineering practice.',
    details: [
      'Bachelor track in Computer Engineering',
      'Coursework reflected in database and algorithm projects',
      'Portfolio direction shaped around real implementation, not only theory',
    ],
    tags: [
      TAG('Computer Eng.', 'software', '#94a3ff'),
      TAG('Algorithms', 'algorithm', '#f6aa3a'),
      TAG('Database', 'database', '#65d4ff'),
      TAG('Software', 'software', '#8ae0c3'),
    ],
    stats: [
      { label: 'Duration', value: '6 yrs' },
      { label: 'Track', value: 'B.S.' },
      { label: 'Base', value: 'Core CS' },
    ],
    x: -7,
    z: -1.8,
    w: 2.2,
    d: 2.2,
    h: 10,
    base: 0x112033,
    glow: 0x7ee0c3,
    wire: 0xa1f2db,
  },
  {
    id: 'skills',
    kind: 'skills',
    name: 'Tech Stack Tower',
    subtitle: 'Core tools used across projects',
    summary:
      'Hands-on stack centered on cloud deployment, backend APIs, data stores, and applied AI.',
    details: [
      'Cloud: AWS, Docker, Linux, CI/CD',
      'Backend: FastAPI, Node.js, Spring',
      'Data: PostgreSQL, Redis, MySQL, TimescaleDB',
      'AI: OpenAI API, LangGraph, local inference, pgvector',
    ],
    tags: [
      TAG('AWS', 'aws', '#ffb14a'),
      TAG('Docker', 'docker', '#4ea1ff'),
      TAG('FastAPI', 'fastapi', '#3dd7b2'),
      TAG('PostgreSQL', 'postgres', '#648dff'),
      TAG('Redis', 'redis', '#ff6c64'),
      TAG('LangGraph', 'langgraph', '#9ce26b'),
    ],
    stats: [
      { label: 'Cloud', value: 'AWS' },
      { label: 'Backend', value: 'API' },
      { label: 'Data', value: 'SQL' },
    ],
    x: 6.8,
    z: -1.6,
    w: 2.4,
    d: 2.4,
    h: 11.4,
    base: 0x131d31,
    glow: 0xb38cff,
    wire: 0xcfb3ff,
  },
  {
    id: 'fin_spring',
    kind: 'project',
    name: 'Financial Event-Driven Market Impact System',
    subtitle: 'Pinned project',
    summary:
      'Pipeline that reads financial events and turns them into explainable market-impact signals.',
    details: [
      'FastAPI service with TimescaleDB, Redis, and pgvector',
      'Focused on structured reasoning over speculative output',
      'Optimized query and time-series access around real use patterns',
    ],
    link: 'https://github.com/0206pdh/fin_spring',
    tags: [
      TAG('FastAPI', 'fastapi', '#3dd7b2'),
      TAG('TimescaleDB', 'database', '#65d4ff'),
      TAG('Redis', 'redis', '#ff6c64'),
      TAG('pgvector', 'database', '#7bd3ff'),
      TAG('Docker', 'docker', '#4ea1ff'),
    ],
    stats: [
      { label: 'Type', value: 'Backend' },
      { label: 'Infra', value: 'Docker' },
      { label: 'Theme', value: 'Finance' },
    ],
    x: -4.2,
    z: 5.7,
    w: 1.8,
    d: 1.8,
    h: 8.8,
    base: 0x10213a,
    glow: 0x4f8dff,
    wire: 0x83b8ff,
  },
  {
    id: 'yt_filter',
    kind: 'project',
    name: 'YouTube Live Comment Filter',
    subtitle: 'Pinned project',
    summary:
      'Chrome extension and FastAPI backend for filtering harmful live chat with local inference.',
    details: [
      'Privacy-conscious setup without depending on third-party moderation APIs',
      'Containerized architecture prepared for AWS deployment',
      'Designed around real-time handling and practical extension workflow',
    ],
    link: 'https://github.com/0206pdh/youtube_live_comment_filter',
    tags: [
      TAG('Python', 'python', '#69a8ff'),
      TAG('FastAPI', 'fastapi', '#3dd7b2'),
      TAG('Chrome Ext.', 'extension', '#5b8dff'),
      TAG('Docker', 'docker', '#4ea1ff'),
      TAG('ML', 'ml', '#78d68f'),
    ],
    stats: [
      { label: 'Inference', value: 'Local' },
      { label: 'Client', value: 'Chrome' },
      { label: 'Deploy', value: 'AWS' },
    ],
    x: 4.5,
    z: 5.4,
    w: 1.7,
    d: 1.7,
    h: 7.4,
    base: 0x191f3e,
    glow: 0xf08ad8,
    wire: 0xffb6eb,
  },
  {
    id: 'algonotion',
    kind: 'project',
    name: 'AlgoNotion Extension',
    subtitle: 'Pinned project',
    summary:
      'Browser workflow that captures solved problems and syncs them into a structured Notion database.',
    details: [
      'Built on Chrome Manifest V3',
      'Connects accepted Baekjoon history with solved.ac metadata',
      'Automates a repetitive developer workflow into a usable product',
    ],
    link: 'https://github.com/0206pdh/AlgoNotion_Extention',
    tags: [
      TAG('JavaScript', 'javascript', '#ffd54d'),
      TAG('Notion API', 'notion', '#a0adba'),
      TAG('Manifest V3', 'extension', '#5b8dff'),
      TAG('solved.ac', 'boj', '#59d0ff'),
    ],
    stats: [
      { label: 'Mode', value: 'Auto' },
      { label: 'Source', value: 'BOJ' },
      { label: 'Target', value: 'Notion' },
    ],
    x: 0.4,
    z: 7.1,
    w: 1.55,
    d: 1.55,
    h: 6.1,
    base: 0x11243b,
    glow: 0x70dfff,
    wire: 0xacf0ff,
  },
]

const STREAMS: Array<[string, string]> = [
  ['hero', 'education'],
  ['hero', 'skills'],
  ['hero', 'fin_spring'],
  ['hero', 'yt_filter'],
  ['hero', 'algonotion'],
]

function SkillGlyph({ icon, color }: { icon: SkillIcon; color: string }) {
  const common = { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', xmlns: 'http://www.w3.org/2000/svg' }
  switch (icon) {
    case 'aws':
      return <svg {...common}><path d="M6 15.5c3.2 2 8.1 2 11.7-.1" stroke={color} strokeWidth="1.8" strokeLinecap="round" /><path d="M8.3 13.2l1.6-5.4h1.4l1.6 5.4m-2.4-1.4h1.7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M15.3 8.4h2.2c.9 0 1.5.5 1.5 1.3 0 .8-.6 1.3-1.5 1.3h-2.2V8.4Zm0 2.6h2.4c1 0 1.6.5 1.6 1.4 0 .8-.6 1.4-1.6 1.4h-2.4V11Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round" /></svg>
    case 'docker':
      return <svg {...common}><path d="M6 13.5h10.2c1 0 1.8-.3 2.3-.8.6-.6 1-1.5 1-2.8-.5.2-1.2.2-1.8 0-.3-1.2-1.1-1.9-2.3-2.2-.3 1-.2 1.7.2 2.3H6v3.5Zm0 0c0 2 1.3 3.5 3.6 3.5 3.6 0 6.4-1.2 8.3-3.5" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><path d="M7 10.3h2v2H7zm2.3 0h2v2h-2zm2.3 0h2v2h-2zm-2.3-2.3h2v2h-2zm2.3 0h2v2h-2z" fill={color} /></svg>
    case 'python':
      return <svg {...common}><path d="M12 5.5c-3.4 0-3.2 1.5-3.2 1.5V9h6.4V7.3S15.4 5.5 12 5.5Z" stroke={color} strokeWidth="1.7" /><circle cx="10.2" cy="7.2" r="1" fill={color} /><path d="M12 18.5c3.4 0 3.2-1.5 3.2-1.5V15H8.8v1.7S8.6 18.5 12 18.5Z" stroke={color} strokeWidth="1.7" /><circle cx="13.8" cy="16.8" r="1" fill={color} /><path d="M8.8 9v6M15.2 9c2 0 3.3.8 3.3 3s-1.3 3-3.3 3M8.8 15c-2 0-3.3-.8-3.3-3s1.3-3 3.3-3" stroke={color} strokeWidth="1.7" strokeLinecap="round" /></svg>
    case 'fastapi':
      return <svg {...common}><path d="M18.5 5.5L9.2 18.5h4.2l1.4-4.4H11" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg>
    case 'typescript':
      return <svg {...common}><rect x="4.5" y="4.5" width="15" height="15" rx="3" stroke={color} strokeWidth="1.7" /><path d="M8.5 9.2h7M12 9.2v7M14.4 12.2c.2-.4.7-.8 1.5-.8 1 0 1.7.5 1.7 1.3 0 2-3.3 1-3.3 2.9 0 .7.7 1.4 1.9 1.4.8 0 1.5-.2 2-.6" stroke={color} strokeWidth="1.5" strokeLinecap="round" /></svg>
    case 'database':
      return <svg {...common}><ellipse cx="12" cy="7" rx="5.5" ry="2.5" stroke={color} strokeWidth="1.7" /><path d="M6.5 7v5c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5V7M6.5 12v5c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5v-5" stroke={color} strokeWidth="1.7" /></svg>
    case 'algorithm':
      return <svg {...common}><path d="M8 6.5h8M8 12h8M8 17.5h8M6.2 6.5h.1M6.2 12h.1M6.2 17.5h.1" stroke={color} strokeWidth="1.9" strokeLinecap="round" /><path d="M15.5 6.5l2.5 5.5-2.5 5.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
    case 'software':
      return <svg {...common}><rect x="5" y="6" width="14" height="10" rx="2.2" stroke={color} strokeWidth="1.7" /><path d="M9 19h6M12 16v3" stroke={color} strokeWidth="1.7" strokeLinecap="round" /><path d="M9 10l2 2-2 2M13 14h2.5" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
    case 'postgres':
      return <svg {...common}><path d="M9 17c-1.2 0-2-.8-2-2.1V9.1C7 6.9 8.5 5.5 10.5 5.5h1c3.6 0 5.5 2 5.5 5.1 0 2.8-1.6 4.4-4.1 4.4-.7 0-1.3-.1-1.9-.4V18c0 .6-.5 1-1 1" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /><path d="M10.7 9.5c.7.8 1.3 1.7 1.8 2.8" stroke={color} strokeWidth="1.5" strokeLinecap="round" /></svg>
    case 'redis':
      return <svg {...common}><path d="M6 9.5l6-2 6 2-6 2-6-2Zm0 5l6 2 6-2M6 9.5v5M18 9.5v5" stroke={color} strokeWidth="1.7" strokeLinejoin="round" /><path d="M9.5 8.3h5" stroke={color} strokeWidth="1.5" strokeLinecap="round" /></svg>
    case 'langgraph':
      return <svg {...common}><circle cx="8" cy="8" r="2.2" stroke={color} strokeWidth="1.7" /><circle cx="16.5" cy="7.5" r="2" stroke={color} strokeWidth="1.7" /><circle cx="12" cy="16" r="2.2" stroke={color} strokeWidth="1.7" /><path d="M9.8 9.1l4.7-1M9.3 9.8l1.8 4.1M14.8 9.3l-1.8 4" stroke={color} strokeWidth="1.6" strokeLinecap="round" /></svg>
    case 'ml':
      return <svg {...common}><path d="M6.5 17.5V7.5l4 5 4-5v10" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /><path d="M16.5 16h2M18.5 14v4" stroke={color} strokeWidth="1.8" strokeLinecap="round" /></svg>
    case 'extension':
      return <svg {...common}><path d="M8 6.5h4.5a2 2 0 0 1 0 4H11a2 2 0 1 0 0 4h1.5a2 2 0 0 1 0 4H8" stroke={color} strokeWidth="1.8" strokeLinecap="round" /><path d="M12 8.5h4M14 6.5v4M12 15.5h4M14 13.5v4" stroke={color} strokeWidth="1.8" strokeLinecap="round" /></svg>
    case 'javascript':
      return <svg {...common}><rect x="5" y="5" width="14" height="14" rx="3" stroke={color} strokeWidth="1.7" /><path d="M10.2 9v6c0 1-.5 1.7-1.8 1.7-.7 0-1.2-.1-1.7-.5M13.6 15.8c.4.5 1 .9 1.9.9.9 0 1.5-.4 1.5-1.1 0-.7-.4-1-1.6-1.5-1.2-.5-2-.9-2-2.3 0-1.2.9-2.1 2.4-2.1 1 0 1.8.3 2.3 1" stroke={color} strokeWidth="1.5" strokeLinecap="round" /></svg>
    case 'notion':
      return <svg {...common}><rect x="5" y="5" width="14" height="14" rx="2.2" stroke={color} strokeWidth="1.7" /><path d="M9 15V9l6 6V9" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
    case 'boj':
      return <svg {...common}><path d="M7 12a5 5 0 0 1 10 0c0 2.7-2.3 5-5 5" stroke={color} strokeWidth="1.8" strokeLinecap="round" /><path d="M12 8.2v4l2.8 1.6M8 18h8" stroke={color} strokeWidth="1.8" strokeLinecap="round" /></svg>
    case 'three':
      return <svg {...common}><path d="M12 5.5l6 3.5v7L12 19.5 6 16V9l6-3.5Zm0 0v14" stroke={color} strokeWidth="1.6" strokeLinejoin="round" /><path d="M6 9l6 3.5L18 9" stroke={color} strokeWidth="1.6" strokeLinejoin="round" /></svg>
    case 'backend':
      return <svg {...common}><path d="M7 8.5h10M7 12h10M7 15.5h6" stroke={color} strokeWidth="1.9" strokeLinecap="round" /><path d="M17 14.5 19 12l-2-2.5" stroke={color} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
  }
}

function SkillChip({ tag, dark = false }: { tag: SkillTag; dark?: boolean }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        padding: '8px 12px',
        borderRadius: 16,
        border: `1px solid ${dark ? `${tag.color}2a` : 'rgba(20, 35, 58, 0.08)'}`,
        background: dark ? 'rgba(12, 25, 43, 0.68)' : 'rgba(255,255,255,0.84)',
        color: dark ? '#dcecff' : '#2c4666',
        fontSize: '0.8rem',
        fontWeight: 600,
        letterSpacing: '0.01em',
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 28,
          height: 28,
          borderRadius: 10,
          background: `${tag.color}20`,
          boxShadow: dark ? `inset 0 0 0 1px ${tag.color}1a` : 'none',
        }}
      >
        <SkillGlyph icon={tag.icon} color={tag.color} />
      </span>
      {tag.label}
    </span>
  )
}

function Panel({ tower, onClose }: { tower: TowerData; onClose: () => void }) {
  const accent = `#${tower.glow.toString(16).padStart(6, '0')}`
  const label =
    tower.kind === 'hero'
      ? 'Profile'
      : tower.kind === 'education'
        ? 'Education'
        : tower.kind === 'skills'
          ? 'Stack'
          : 'Project'

  return (
    <div
      style={{
        position: 'fixed',
        top: 22,
        right: 22,
        bottom: 22,
        width: 'min(420px, calc(100vw - 44px))',
        borderRadius: 28,
        background: 'rgba(247, 250, 255, 0.94)',
        border: `1px solid ${accent}40`,
        boxShadow: '0 28px 80px rgba(0, 0, 0, 0.32)',
        color: '#14233a',
        zIndex: 220,
        overflowY: 'auto',
        backdropFilter: 'blur(18px)',
        animation: 'panelIn 220ms ease',
      }}
    >
      <style>{`
        @keyframes panelIn {
          from { transform: translateX(18px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
      <div style={{ padding: '28px 28px 18px', borderBottom: '1px solid rgba(20, 35, 58, 0.08)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
          <div>
            <div
              style={{
                fontSize: '0.68rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: accent,
                fontWeight: 700,
                marginBottom: 10,
              }}
            >
              {label}
            </div>
            <h2 style={{ fontSize: '1.45rem', lineHeight: 1.15, marginBottom: 6 }}>{tower.name}</h2>
            <p style={{ fontSize: '0.92rem', color: '#4a617f', lineHeight: 1.5 }}>{tower.subtitle}</p>
            {tower.period && (
              <p style={{ marginTop: 8, fontSize: '0.8rem', color: '#627795', fontWeight: 600 }}>{tower.period}</p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close panel"
            style={{
              width: 38,
              height: 38,
              borderRadius: 12,
              border: '1px solid rgba(20, 35, 58, 0.12)',
              background: 'rgba(255,255,255,0.72)',
              color: '#243854',
              cursor: 'pointer',
              fontSize: '1rem',
            }}
          >
            ×
          </button>
        </div>
      </div>

      <div style={{ padding: 28 }}>
        {tower.stats && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 20 }}>
            {tower.stats.map((stat) => (
              <div
                key={stat.label}
                style={{
                  padding: '12px 12px 10px',
                  borderRadius: 16,
                  background: `${accent}12`,
                  border: `1px solid ${accent}26`,
                }}
              >
                <div style={{ fontSize: '1rem', fontWeight: 700, color: '#11253f', marginBottom: 4 }}>{stat.value}</div>
                <div style={{ fontSize: '0.68rem', color: '#5f7390' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        <p style={{ fontSize: '0.95rem', lineHeight: 1.72, color: '#243854', marginBottom: 18 }}>{tower.summary}</p>

        {tower.details && (
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontSize: '0.68rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#7185a0',
                fontWeight: 700,
                marginBottom: 10,
              }}
            >
              Highlights
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {tower.details.map((detail) => (
                <div
                  key={detail}
                  style={{
                    padding: '11px 13px',
                    borderRadius: 14,
                    background: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(20, 35, 58, 0.08)',
                    color: '#304661',
                    fontSize: '0.86rem',
                    lineHeight: 1.55,
                  }}
                >
                  {detail}
                </div>
              ))}
            </div>
          </div>
        )}

        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontSize: '0.68rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: '#7185a0',
              fontWeight: 700,
              marginBottom: 10,
            }}
          >
            Stack
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {tower.tags.map((tag) => (
              <SkillChip key={tag.label} tag={tag} />
            ))}
          </div>
        </div>

        {tower.link && (
          <a
            href={tower.link}
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              height: 48,
              borderRadius: 16,
              textDecoration: 'none',
              background: `linear-gradient(135deg, ${accent}, #ffffff)`,
              color: '#0d1f36',
              fontWeight: 800,
            }}
          >
            View GitHub
          </a>
        )}
      </div>
    </div>
  )
}

function Overlay() {
  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 24,
          left: 24,
          zIndex: 120,
          width: 'min(420px, calc(100vw - 48px))',
          padding: '22px 22px 20px',
          borderRadius: 24,
          background: 'linear-gradient(180deg, rgba(8,18,33,0.8), rgba(8,18,33,0.5))',
          border: '1px solid rgba(145, 190, 255, 0.16)',
          backdropFilter: 'blur(16px)',
          color: '#dfeeff',
          pointerEvents: 'none',
        }}
      >
        <div style={{ fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#7ec8ff', marginBottom: 10 }}>
          Portfolio City
        </div>
        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1.02, marginBottom: 10 }}>Dohyun Park</h1>
        <p style={{ color: 'rgba(223, 238, 255, 0.82)', lineHeight: 1.65, fontSize: '0.95rem', marginBottom: 14 }}>
          Kwangwoon University Computer Engineering student, 2020 to 2026.
          Building cloud, backend, and automation-focused projects.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {[
            TAG('AWS', 'aws', '#ffb14a'),
            TAG('Backend', 'backend', '#6baeff'),
            TAG('Three.js', 'three', '#d8e0ea'),
            TAG('Docker', 'docker', '#4ea1ff'),
          ].map((tag) => (
            <SkillChip key={tag.label} tag={tag} dark />
          ))}
        </div>
      </div>

      <div
        style={{
          position: 'fixed',
          right: 24,
          left: 24,
          bottom: 20,
          zIndex: 120,
          display: 'flex',
          justifyContent: 'center',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            padding: '10px 14px',
            borderRadius: 999,
            background: 'rgba(8,18,33,0.62)',
            border: '1px solid rgba(145, 190, 255, 0.12)',
            color: 'rgba(223, 238, 255, 0.78)',
            fontSize: '0.8rem',
            letterSpacing: '0.03em',
          }}
        >
          Drag to rotate · Scroll to zoom · Click a tower
        </div>
      </div>
    </>
  )
}

export default function CityScene() {
  const mountRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<(() => void) | null>(null)
  const [selected, setSelected] = useState<TowerData | null>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.1
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(BG)
    scene.fog = new THREE.FogExp2(BG, 0.028)

    const camera = new THREE.PerspectiveCamera(28, window.innerWidth / window.innerHeight, 0.1, 200)
    const baseCamera = new THREE.Vector3(0, 10, 24)
    const camTarget = baseCamera.clone()
    const lookCurrent = new THREE.Vector3(0, 3, 0)
    const lookTarget = new THREE.Vector3(0, 3, 0)
    camera.position.copy(baseCamera)

    const composer = new EffectComposer(renderer)
    composer.addPass(new RenderPass(scene, camera))
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.9, 0.7, 0.55))

    const ambient = new THREE.AmbientLight(0xd6e8ff, 1.8)
    scene.add(ambient)

    const moon = new THREE.DirectionalLight(0xbcd7ff, 2.8)
    moon.position.set(12, 20, 9)
    moon.castShadow = true
    moon.shadow.mapSize.set(2048, 2048)
    moon.shadow.camera.near = 1
    moon.shadow.camera.far = 80
    scene.add(moon)

    const fill = new THREE.PointLight(0x63b2ff, 40, 80, 2)
    fill.position.set(-10, 8, -8)
    scene.add(fill)

    const city = new THREE.Group()
    scene.add(city)

    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(32, 80),
      new THREE.MeshStandardMaterial({
        color: 0x0b1628,
        roughness: 0.9,
        metalness: 0.2,
      })
    )
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    city.add(ground)

    const ring = new THREE.Mesh(
      new THREE.RingGeometry(12, 12.5, 96),
      new THREE.MeshBasicMaterial({ color: 0x4a8fff, transparent: true, opacity: 0.26, side: THREE.DoubleSide })
    )
    ring.rotation.x = -Math.PI / 2
    ring.position.y = 0.02
    city.add(ring)

    const grid = new THREE.GridHelper(40, 40, 0x2d5da2, 0x173152)
    ;(grid.material as THREE.Material).transparent = true
    ;(grid.material as THREE.Material).opacity = 0.2
    city.add(grid)

    const stars = new THREE.BufferGeometry()
    const starCount = 3200
    const starPoints = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      const radius = 55 + Math.random() * 45
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      starPoints[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      starPoints[i * 3 + 1] = radius * Math.cos(phi)
      starPoints[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta)
    }
    stars.setAttribute('position', new THREE.BufferAttribute(starPoints, 3))
    scene.add(
      new THREE.Points(
        stars,
        new THREE.PointsMaterial({
          color: 0xd8ecff,
          size: 0.16,
          transparent: true,
          opacity: 0.8,
          sizeAttenuation: true,
        })
      )
    )

    const clickables: THREE.Mesh[] = []
    const towerMap = Object.fromEntries(TOWERS.map((tower) => [tower.id, tower]))

    function addWindowStrips(tower: TowerData) {
      const levels = Math.max(2, Math.floor(tower.h / FLOOR_HEIGHT))
      for (let i = 1; i < levels; i++) {
        const y = i * FLOOR_HEIGHT
        const strip = new THREE.Mesh(
          new THREE.BoxGeometry(tower.w + 0.06, 0.04, tower.d + 0.06),
          new THREE.MeshBasicMaterial({
            color: tower.glow,
            transparent: true,
            opacity: tower.kind === 'hero' ? 0.48 : 0.22,
          })
        )
        strip.position.set(tower.x, y, tower.z)
        city.add(strip)
      }
    }

    function addBeacon(tower: TowerData) {
      const beacon = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.12, 2.6, 8),
        new THREE.MeshBasicMaterial({ color: tower.glow, transparent: true, opacity: 0.9 })
      )
      beacon.position.set(tower.x, tower.h + 1.3, tower.z)
      city.add(beacon)

      const halo = new THREE.Mesh(
        new THREE.TorusGeometry(0.5, 0.04, 12, 48),
        new THREE.MeshBasicMaterial({ color: tower.glow, transparent: true, opacity: 0.75 })
      )
      halo.position.set(tower.x, tower.h + 2.5, tower.z)
      halo.rotation.x = Math.PI / 2
      halo.userData.spin = 0.01
      city.add(halo)
      animatedHalos.push(halo)
    }

    const animatedHalos: THREE.Mesh[] = []

    TOWERS.forEach((tower) => {
      const body = new THREE.Mesh(
        new THREE.BoxGeometry(tower.w, tower.h, tower.d),
        new THREE.MeshStandardMaterial({
          color: tower.base,
          roughness: 0.22,
          metalness: 0.78,
          emissive: new THREE.Color(tower.glow),
          emissiveIntensity: tower.kind === 'hero' ? 0.44 : 0.24,
        })
      )
      body.castShadow = true
      body.position.set(tower.x, tower.h / 2, tower.z)
      body.userData = {
        tower,
        material: body.material,
        baseGlow: tower.kind === 'hero' ? 0.44 : 0.24,
      }
      city.add(body)
      clickables.push(body)

      const outline = new THREE.Mesh(
        new THREE.BoxGeometry(tower.w + 0.06, tower.h + 0.04, tower.d + 0.06),
        new THREE.MeshBasicMaterial({
          color: tower.wire,
          wireframe: true,
          transparent: true,
          opacity: tower.kind === 'hero' ? 0.18 : 0.1,
        })
      )
      outline.position.copy(body.position)
      city.add(outline)

      const pad = new THREE.Mesh(
        new THREE.CylinderGeometry(Math.max(tower.w, tower.d) * 0.78, Math.max(tower.w, tower.d) * 0.92, 0.18, 8),
        new THREE.MeshBasicMaterial({
          color: tower.glow,
          transparent: true,
          opacity: 0.25,
        })
      )
      pad.position.set(tower.x, 0.08, tower.z)
      city.add(pad)

      addWindowStrips(tower)
      addBeacon(tower)
    })

    interface Stream {
      mesh: THREE.Mesh
      start: THREE.Vector3
      end: THREE.Vector3
      t: number
      speed: number
      direction: 1 | -1
    }

    const streams: Stream[] = []
    STREAMS.forEach(([from, to], index) => {
      const source = towerMap[from]
      const target = towerMap[to]
      if (!source || !target) return

      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(0.7, 0.06, 0.12),
        new THREE.MeshBasicMaterial({ color: index % 2 === 0 ? 0x7bc8ff : 0xa78bff, transparent: true, opacity: 0.9 })
      )
      const start = new THREE.Vector3(source.x, 0.12, source.z)
      const end = new THREE.Vector3(target.x, 0.12, target.z)
      streams.push({
        mesh,
        start,
        end,
        t: Math.random(),
        speed: 0.003 + Math.random() * 0.004,
        direction: 1,
      })
      city.add(mesh)
    })

    const raycaster = new THREE.Raycaster()
    let hovered: THREE.Mesh | null = null
    let selectedTower: TowerData | null = null
    let dragging = false
    let previousX = 0
    let previousY = 0
    let velocityY = 0
    let velocityX = 0
    let targetRotationY = 0
    let targetRotationX = 0.12
    let zoom = 1
    let touchMoved = false

    function setHover(mesh: THREE.Mesh | null) {
      if (hovered && hovered !== mesh) {
        const material = hovered.userData.material as THREE.MeshStandardMaterial
        material.emissiveIntensity = hovered.userData.baseGlow as number
      }
      hovered = mesh
      if (hovered) {
        const material = hovered.userData.material as THREE.MeshStandardMaterial
        material.emissiveIntensity = 0.75
      }
      renderer.domElement.style.cursor = hovered ? 'pointer' : dragging ? 'grabbing' : 'grab'
    }

    function selectTower(tower: TowerData) {
      selectedTower = tower
      setSelected(tower)
      camTarget.set(tower.x * 0.55, Math.max(5.5, tower.h * 0.42 + 1.8), tower.z + 11)
      lookTarget.set(tower.x, tower.h * 0.34, tower.z)
      renderer.domElement.style.cursor = 'default'
    }

    function clearSelection() {
      selectedTower = null
      setSelected(null)
      camTarget.copy(baseCamera).multiplyScalar(zoom)
      lookTarget.set(0, 3, 0)
      renderer.domElement.style.cursor = 'grab'
    }

    closeRef.current = clearSelection

    function getPointer(clientX: number, clientY: number) {
      const rect = renderer.domElement.getBoundingClientRect()
      return new THREE.Vector2(((clientX - rect.left) / rect.width) * 2 - 1, -((clientY - rect.top) / rect.height) * 2 + 1)
    }

    const onMouseDown = (event: MouseEvent) => {
      if (selectedTower) return
      dragging = true
      previousX = event.clientX
      previousY = event.clientY
      velocityX = 0
      velocityY = 0
      renderer.domElement.style.cursor = 'grabbing'
    }

    const onMouseMove = (event: MouseEvent) => {
      if (!selectedTower) {
        raycaster.setFromCamera(getPointer(event.clientX, event.clientY), camera)
        const hits = raycaster.intersectObjects(clickables, false)
        setHover(hits.length ? (hits[0].object as THREE.Mesh) : null)
      }

      if (!dragging || selectedTower) return
      const deltaX = (event.clientX - previousX) * 0.006
      const deltaY = (event.clientY - previousY) * 0.005
      velocityY = deltaX
      velocityX = deltaY
      targetRotationY += deltaX
      targetRotationX += deltaY
      previousX = event.clientX
      previousY = event.clientY
    }

    const onMouseUp = () => {
      dragging = false
      renderer.domElement.style.cursor = hovered ? 'pointer' : selectedTower ? 'default' : 'grab'
    }

    const onClick = (event: MouseEvent) => {
      if (selectedTower || Math.abs(velocityY) > 0.012) return
      raycaster.setFromCamera(getPointer(event.clientX, event.clientY), camera)
      const hits = raycaster.intersectObjects(clickables, false)
      if (!hits.length) return
      const tower = hits[0].object.userData.tower as TowerData
      selectTower(tower)
    }

    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      zoom = Math.max(0.48, Math.min(2.2, zoom * (event.deltaY > 0 ? 1.08 : 0.92)))
      if (!selectedTower) {
        camTarget.copy(baseCamera).multiplyScalar(zoom)
      }
    }

    let lastPinch = 0

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      composer.setSize(window.innerWidth, window.innerHeight)
    }

    const onTouchStart = (event: TouchEvent) => {
      if (selectedTower) return
      if (event.touches.length === 1) {
        dragging = true
        touchMoved = false
        previousX = event.touches[0].clientX
        previousY = event.touches[0].clientY
        velocityX = 0
        velocityY = 0
      }
      if (event.touches.length === 2) {
        lastPinch = Math.hypot(
          event.touches[0].clientX - event.touches[1].clientX,
          event.touches[0].clientY - event.touches[1].clientY
        )
      }
    }

    const onTouchMove = (event: TouchEvent) => {
      event.preventDefault()
      if (selectedTower) return

      if (event.touches.length === 1 && dragging) {
        const deltaX = (event.touches[0].clientX - previousX) * 0.006
        const deltaY = (event.touches[0].clientY - previousY) * 0.005
        if (Math.abs(deltaX) > 0.002 || Math.abs(deltaY) > 0.002) touchMoved = true
        velocityY = deltaX
        velocityX = deltaY
        targetRotationY += deltaX
        targetRotationX += deltaY
        previousX = event.touches[0].clientX
        previousY = event.touches[0].clientY
      }

      if (event.touches.length === 2) {
        const pinch = Math.hypot(
          event.touches[0].clientX - event.touches[1].clientX,
          event.touches[0].clientY - event.touches[1].clientY
        )
        if (lastPinch > 0) {
          zoom = Math.max(0.48, Math.min(2.2, zoom * (lastPinch / pinch)))
          camTarget.copy(baseCamera).multiplyScalar(zoom)
        }
        lastPinch = pinch
      }
    }

    const onTouchEnd = (event: TouchEvent) => {
      if (event.touches.length === 0) {
        dragging = false
        lastPinch = 0
      }
      if (event.touches.length === 1) {
        previousX = event.touches[0].clientX
        previousY = event.touches[0].clientY
      }
    }

    const onTouchTap = (event: TouchEvent) => {
      if (selectedTower || event.changedTouches.length !== 1 || touchMoved) return
      raycaster.setFromCamera(
        getPointer(event.changedTouches[0].clientX, event.changedTouches[0].clientY),
        camera
      )
      const hits = raycaster.intersectObjects(clickables, false)
      if (!hits.length) return
      const tower = hits[0].object.userData.tower as TowerData
      selectTower(tower)
    }

    renderer.domElement.style.cursor = 'grab'
    renderer.domElement.addEventListener('mousedown', onMouseDown)
    renderer.domElement.addEventListener('mousemove', onMouseMove)
    renderer.domElement.addEventListener('mouseup', onMouseUp)
    renderer.domElement.addEventListener('mouseleave', onMouseUp)
    renderer.domElement.addEventListener('click', onClick)
    renderer.domElement.addEventListener('wheel', onWheel, { passive: false })
    renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: false })
    renderer.domElement.addEventListener('touchmove', onTouchMove, { passive: false })
    renderer.domElement.addEventListener('touchend', onTouchEnd)
    renderer.domElement.addEventListener('touchend', onTouchTap)
    window.addEventListener('resize', onResize)

    let frame = 0
    const animate = () => {
      frame = requestAnimationFrame(animate)

      if (selectedTower) {
        city.rotation.y *= 0.92
        city.rotation.x *= 0.92
      } else {
        if (!dragging) {
          velocityY *= 0.94
          velocityX *= 0.93
          targetRotationY += velocityY
          targetRotationX += velocityX
        }
        targetRotationX = Math.max(-0.18, Math.min(0.52, targetRotationX))
        city.rotation.y += (targetRotationY - city.rotation.y) * 0.085
        city.rotation.x += (targetRotationX - city.rotation.x) * 0.085
      }

      ring.rotation.z += 0.002

      animatedHalos.forEach((halo, index) => {
        halo.rotation.z += (halo.userData.spin as number) + index * 0.0002
        halo.position.y += Math.sin(performance.now() * 0.0012 + index) * 0.002
      })

      streams.forEach((stream) => {
        stream.t += stream.speed * stream.direction
        if (stream.t >= 1) {
          stream.t = 1
          stream.direction = -1
        }
        if (stream.t <= 0) {
          stream.t = 0
          stream.direction = 1
        }
        stream.mesh.position.lerpVectors(stream.start, stream.end, stream.t)
        const direction = stream.end.clone().sub(stream.start)
        stream.mesh.rotation.y = Math.atan2(direction.x, direction.z)
      })

      camera.position.lerp(camTarget, 0.06)
      lookCurrent.lerp(lookTarget, 0.06)
      camera.lookAt(lookCurrent)

      composer.render()
    }

    animate()

    return () => {
      renderer.domElement.removeEventListener('mousedown', onMouseDown)
      renderer.domElement.removeEventListener('mousemove', onMouseMove)
      renderer.domElement.removeEventListener('mouseup', onMouseUp)
      renderer.domElement.removeEventListener('mouseleave', onMouseUp)
      renderer.domElement.removeEventListener('click', onClick)
      renderer.domElement.removeEventListener('wheel', onWheel)
      renderer.domElement.removeEventListener('touchstart', onTouchStart)
      renderer.domElement.removeEventListener('touchmove', onTouchMove)
      renderer.domElement.removeEventListener('touchend', onTouchEnd)
      renderer.domElement.removeEventListener('touchend', onTouchTap)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(frame)
      composer.dispose()
      renderer.dispose()
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <>
      <div ref={mountRef} style={{ position: 'fixed', inset: 0, zIndex: 0 }} />
      <Overlay />
      {selected && <Panel tower={selected} onClose={() => closeRef.current?.()} />}
    </>
  )
}
