'use client'

import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

// ─── Types ────────────────────────────────────────────────────────────────────
interface SkillFloor { floor: string; color: string; items: string[] }
export interface BldData {
  id: string; name: string; subtitle: string; description: string; link: string
  tags: string[]; stats?: { label: string; value: string }[]; skills?: SkillFloor[]
  x: number; z: number; w: number; d: number; h: number
  type: 'main' | 'pinned' | 'skills' | 'other'
  base: number; accent: number; wire: number
}

// ─── City data ────────────────────────────────────────────────────────────────
export const BUILDINGS: BldData[] = [
  {
    id: 'main', name: '@0206pdh', subtitle: 'GitHub Profile · 23 Public Repos',
    description: 'Cloud & Backend Engineer in training based in South Korea. Studying AWS infrastructure, DevOps pipelines, and systems design. 23 public repos spanning fintech AI pipelines, browser extensions, crypto bots, and competitive programming.',
    link: 'https://github.com/0206pdh',
    tags: ['AWS', 'Python', 'FastAPI', 'Docker', 'Node.js', 'Java', 'TypeScript'],
    stats: [{ label: 'Public Repos', value: '23' }, { label: 'Languages', value: '5+' }, { label: 'Domain', value: 'Cloud / Backend' }],
    x: 0, z: 0, w: 2.8, d: 2.8, h: 14, type: 'main',
    base: 0x060e28, accent: 0x1844dd, wire: 0x4488ff,
  },
  {
    id: 'fin_spring', name: 'fin_spring', subtitle: 'Financial Event-Driven Market Impact System',
    description: 'Real-time financial news → FX directional bias + sector market pressure classification. LangGraph 3-step chain handles event classification, FX channel identification, and keyword generation. Rule-based scoring engine — explainable, not speculative.',
    link: 'https://github.com/0206pdh/fin_spring',
    tags: ['Python', 'FastAPI', 'TimescaleDB', 'pgvector', 'Redis', 'LangGraph', 'GPT-4o-mini', 'Docker'],
    stats: [{ label: 'Query Speed', value: '−99.7%' }, { label: 'Time-series', value: '−93%' }, { label: 'Parse Errors', value: '0%' }],
    x: 5, z: 0, w: 1.9, d: 1.9, h: 9, type: 'pinned',
    base: 0x080c22, accent: 0x2840d0, wire: 0x5060ff,
  },
  {
    id: 'yt_filter', name: 'YT Comment Filter', subtitle: 'YouTube Live Toxic Comment Filter',
    description: 'Chrome extension + FastAPI backend detecting toxic YouTube live comments using a local ML model. Privacy-first — no external API calls. Containerized with Docker, optional Windows EXE. AWS ECS Fargate + ECR + CloudWatch migration planned.',
    link: 'https://github.com/0206pdh/youtube_live_comment_filter',
    tags: ['Python', 'FastAPI', 'JavaScript', 'Chrome Extension', 'Docker', 'ML', 'AWS ECS'],
    stats: [{ label: 'Inference', value: 'Local ML' }, { label: 'Deploy', value: 'Docker' }, { label: 'Roadmap', value: 'AWS ECS' }],
    x: -5, z: 0, w: 1.7, d: 1.7, h: 7, type: 'pinned',
    base: 0x0e0820, accent: 0x7020c0, wire: 0xa040e0,
  },
  {
    id: 'algonotion', name: 'AlgoNotion', subtitle: 'Baekjoon → Notion Chrome Extension',
    description: 'Chrome extension (Manifest V3) that auto-captures accepted Baekjoon OJ solutions and syncs them into a Notion database. Enriches entries via solved.ac API (title + difficulty). Manual upload button injected on the Baekjoon status page.',
    link: 'https://github.com/0206pdh/AlgoNotion_Extention',
    tags: ['JavaScript', 'Chrome Extension', 'Notion API', 'solved.ac API', 'Manifest V3'],
    stats: [{ label: 'Platform', value: 'Chrome MV3' }, { label: 'Sync', value: 'Auto' }, { label: 'APIs', value: 'Notion + solved.ac' }],
    x: 0.5, z: 5, w: 1.5, d: 1.5, h: 5, type: 'pinned',
    base: 0x061618, accent: 0x008898, wire: 0x20c8e0,
  },
  {
    id: 'skills', name: 'Tech Stack', subtitle: 'Skills Tower — 5 Domains',
    description: 'Each floor represents a skill domain. Ground floor: Cloud & DevOps. Upper floors: Backend, Database, AI/LLM, Languages.',
    link: 'https://github.com/0206pdh',
    tags: ['AWS', 'Docker', 'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'LangGraph', 'TypeScript', 'Java'],
    stats: [{ label: 'Cloud', value: 'AWS + Docker' }, { label: 'Backend', value: 'Python · Node · Spring' }, { label: 'AI', value: 'LangGraph + OpenAI' }],
    skills: [
      { floor: 'Cloud & DevOps', color: '#4080ff', items: ['AWS (EC2, S3, RDS, IAM)', 'Docker', 'Linux / Shell', 'GitHub Actions CI/CD'] },
      { floor: 'Backend',        color: '#9040e0', items: ['Python / FastAPI', 'Node.js / Express', 'Java / Spring', 'REST API Design'] },
      { floor: 'Database',       color: '#20c8d8', items: ['PostgreSQL', 'Redis', 'MySQL', 'TimescaleDB / pgvector'] },
      { floor: 'AI / LLM',      color: '#d040b0', items: ['OpenAI API / Function Calling', 'LangGraph', 'Local ML Inference', 'pgvector Semantic Search'] },
      { floor: 'Languages',      color: '#40d870', items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'] },
    ],
    x: -7, z: -2, w: 2.2, d: 2.2, h: 11, type: 'skills',
    base: 0x060e18, accent: 0x1830a0, wire: 0x3060c0,
  },
  {
    id: 'financial_ts', name: 'Market Impact TS', subtitle: 'Financial Event System v1 (TypeScript)',
    description: 'Earlier TypeScript-heavy (73.8%) version of the financial market impact system. Same FX/sector analysis concept with a full-stack architecture and OpenAI integration.',
    link: 'https://github.com/0206pdh/Financial-Event-Driven-Market-Impact-System',
    tags: ['TypeScript', 'FastAPI', 'PostgreSQL', 'OpenAI'],
    x: 8.5, z: -3.5, w: 1.4, d: 1.4, h: 7.5, type: 'other',
    base: 0x080c20, accent: 0x18289a, wire: 0x283888,
  },
  {
    id: 'algobot', name: 'AlgoBot', subtitle: 'Crypto Trading Bot with GUI',
    description: 'Python crypto trading bot supporting live trading, backtesting, simulations, and strategy optimization. Features a full GUI and multi-exchange support.',
    link: 'https://github.com/0206pdh/algobot',
    tags: ['Python', 'GUI', 'Crypto', 'Backtesting'],
    x: -8.5, z: -3.5, w: 1.4, d: 1.4, h: 6, type: 'other',
    base: 0x080c20, accent: 0x18289a, wire: 0x283888,
  },
  {
    id: 'road_construct', name: 'Road Construct', subtitle: 'Road Construction Alert System',
    description: 'Node.js + MongoDB backend marking road construction info on a map and alerting nearby users in real-time.',
    link: 'https://github.com/0206pdh/Road_Construct',
    tags: ['Node.js', 'MongoDB', 'JavaScript'],
    x: 6.5, z: -7, w: 1.2, d: 1.2, h: 4.5, type: 'other',
    base: 0x080c20, accent: 0x18289a, wire: 0x283888,
  },
  {
    id: 'coding_hub', name: 'Coding Test Hub', subtitle: 'Baekjoon Auto-Push Repository',
    description: 'Automated Baekjoon OJ solution archive powered by BaekjoonHub. Java-based competitive programming history.',
    link: 'https://github.com/0206pdh/coding-test-hub',
    tags: ['Java', 'BaekjoonHub', 'Competitive Programming'],
    x: -6.5, z: -7, w: 1.2, d: 1.2, h: 5, type: 'other',
    base: 0x080c20, accent: 0x18289a, wire: 0x283888,
  },
  {
    id: 'toxicfree', name: 'ToxicFree', subtitle: 'Toxic Comment Filter Extension (v1)',
    description: 'Early Chrome extension for filtering toxic YouTube comments. Predecessor to the YouTube Live Comment Filter project with local AI inference.',
    link: 'https://github.com/0206pdh/ToxicFree_Extension',
    tags: ['Chrome Extension', 'AI', 'JavaScript'],
    x: 3.5, z: -8.5, w: 1.1, d: 1.1, h: 4, type: 'other',
    base: 0x080c20, accent: 0x18289a, wire: 0x283888,
  },
  {
    id: 'serverless', name: 'Serverless Tax', subtitle: 'Serverless Tax Calculator',
    description: 'JavaScript-based serverless tax calculation service.',
    link: 'https://github.com/0206pdh/serverless-tax-calculate',
    tags: ['JavaScript', 'Serverless'],
    x: -3.5, z: -8.5, w: 1.0, d: 1.0, h: 3, type: 'other',
    base: 0x080c20, accent: 0x18289a, wire: 0x283888,
  },
  {
    id: 'safe_way', name: 'SafeWay', subtitle: 'Safe Route Navigation App',
    description: 'JavaScript-based safe route navigation application.',
    link: 'https://github.com/0206pdh/safe_way',
    tags: ['JavaScript', 'Maps'],
    x: 9.5, z: 2.5, w: 1.0, d: 1.0, h: 3, type: 'other',
    base: 0x080c20, accent: 0x18289a, wire: 0x283888,
  },
  {
    id: 'db_project', name: 'DB Project', subtitle: 'Database Course Project',
    description: 'Java-based database management system developed as a course assignment.',
    link: 'https://github.com/0206pdh/DataBase_project',
    tags: ['Java', 'Database', 'SQL'],
    x: -9.5, z: 2.5, w: 1.0, d: 1.0, h: 2.5, type: 'other',
    base: 0x080c20, accent: 0x18289a, wire: 0x283888,
  },
  {
    id: 'aws_library', name: 'AWS Library', subtitle: 'Cloud Library Management CLI',
    description: 'Python CLI-based library system with CSV data loading, book/member management, and checkout tracking.',
    link: 'https://github.com/0206pdh/aws13th-library-system',
    tags: ['Python', 'AWS', 'CLI'],
    x: 7, z: 6, w: 1.0, d: 1.0, h: 2, type: 'other',
    base: 0x080c20, accent: 0x18289a, wire: 0x283888,
  },
]

// Skill floor config (bottom → top)
const SKILL_FLOORS = [
  { color: 0x4080ff, h: 2.2 },
  { color: 0x9040e0, h: 2.0 },
  { color: 0x20c8d8, h: 2.2 },
  { color: 0xd040b0, h: 2.0 },
  { color: 0x40d870, h: 2.0 },
]

// Data stream connections
const STREAM_PAIRS = [
  ['main', 'fin_spring'], ['main', 'yt_filter'], ['main', 'algonotion'],
  ['main', 'skills'], ['fin_spring', 'financial_ts'], ['yt_filter', 'toxicfree'],
]

// ─── Info Panel ───────────────────────────────────────────────────────────────
function Panel({ bld, onClose }: { bld: BldData; onClose: () => void }) {
  const accentHex = '#' + bld.accent.toString(16).padStart(6, '0')
  const isSkills = bld.type === 'skills' && bld.skills

  return (
    <div
      style={{
        position: 'fixed', top: 0, right: 0, height: '100%', width: 420,
        background: 'rgba(4,10,28,0.92)', backdropFilter: 'blur(20px)',
        borderLeft: `1px solid ${accentHex}30`,
        zIndex: 200, overflowY: 'auto', padding: '0',
        animation: 'slideIn 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}
    >
      <style>{`
        @keyframes slideIn { from { transform: translateX(40px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
      `}</style>

      {/* Header */}
      <div style={{ padding: '32px 32px 24px', borderBottom: `1px solid ${accentHex}20` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: accentHex, opacity: 0.7, marginBottom: 8 }}>
              {bld.type === 'main' ? 'GitHub Profile' : bld.type === 'skills' ? 'Skills Tower' : bld.type === 'pinned' ? 'Pinned Repo' : 'Repository'}
            </div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#d8e8ff', lineHeight: 1.2, marginBottom: 6 }}>{bld.name}</h2>
            <p style={{ fontSize: '0.75rem', color: 'rgba(140,175,240,0.55)', lineHeight: 1.4 }}>{bld.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: `1px solid rgba(80,120,200,0.25)`, borderRadius: 6,
              color: 'rgba(140,175,240,0.5)', cursor: 'pointer', padding: '6px 10px',
              fontSize: '0.75rem', flexShrink: 0, marginLeft: 12, transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = accentHex; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(80,120,200,0.25)'; e.currentTarget.style.color = 'rgba(140,175,240,0.5)' }}
          >ESC</button>
        </div>
      </div>

      <div style={{ padding: '24px 32px' }}>
        {/* Stats */}
        {bld.stats && (
          <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
            {bld.stats.map(s => (
              <div key={s.label} style={{ flex: 1, background: `${accentHex}12`, border: `1px solid ${accentHex}28`, borderRadius: 8, padding: '12px 14px' }}>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: accentHex, marginBottom: 2 }}>{s.value}</div>
                <div style={{ fontSize: '0.65rem', color: 'rgba(120,160,220,0.5)', letterSpacing: '0.06em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Description */}
        <p style={{ fontSize: '0.87rem', color: 'rgba(160,195,255,0.65)', lineHeight: 1.75, marginBottom: 24 }}>{bld.description}</p>

        {/* Skills floors */}
        {isSkills && (
          <div style={{ marginBottom: 24 }}>
            <p style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(100,140,210,0.45)', marginBottom: 14 }}>Floors (bottom → top)</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {bld.skills!.map(f => (
                <div key={f.floor} style={{ background: `${f.color}10`, border: `1px solid ${f.color}28`, borderRadius: 8, padding: '12px 16px' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 600, color: f.color, marginBottom: 6 }}>{f.floor}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                    {f.items.map(item => (
                      <span key={item} style={{ fontSize: '0.68rem', padding: '2px 8px', borderRadius: 10, background: `${f.color}18`, color: `${f.color}cc` }}>{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tags */}
        <div style={{ marginBottom: 28 }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(100,140,210,0.45)', marginBottom: 10 }}>Tech Stack</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {bld.tags.map(t => (
              <span key={t} style={{ fontSize: '0.72rem', padding: '4px 11px', borderRadius: 20, background: `${accentHex}18`, border: `1px solid ${accentHex}30`, color: `${accentHex}cc`, fontWeight: 500 }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Link */}
        <a
          href={bld.link} target="_blank" rel="noopener noreferrer"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            padding: '13px 20px', borderRadius: 8, textDecoration: 'none', fontWeight: 600,
            fontSize: '0.85rem', letterSpacing: '0.04em', transition: 'all 0.25s',
            background: `${accentHex}20`, border: `1px solid ${accentHex}40`, color: accentHex,
          }}
          onMouseEnter={e => { e.currentTarget.style.background = `${accentHex}30`; e.currentTarget.style.boxShadow = `0 0 20px ${accentHex}30` }}
          onMouseLeave={e => { e.currentTarget.style.background = `${accentHex}20`; e.currentTarget.style.boxShadow = 'none' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
          </svg>
          View on GitHub
        </a>
      </div>
    </div>
  )
}

// ─── HUD ──────────────────────────────────────────────────────────────────────
function HUD() {
  return (
    <>
      {/* Name tag — bottom left */}
      <div style={{ position: 'fixed', bottom: 36, left: 44, zIndex: 100, pointerEvents: 'none' }}>
        <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(80,120,200,0.45)', marginBottom: 6 }}>
          Cloud & Backend Engineer
        </p>
        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, letterSpacing: '-0.02em', background: 'linear-gradient(120deg,#c0d4ff,#7aabff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: 0 }}>
          Dohyun Park
        </h1>
        <p style={{ fontSize: '0.72rem', color: 'rgba(120,160,240,0.4)', marginTop: 4, fontFamily: 'monospace' }}>
          박도현 · @0206pdh
        </p>
      </div>

      {/* Hint — top right */}
      <div style={{ position: 'fixed', top: 32, right: 44, zIndex: 100, textAlign: 'right', pointerEvents: 'none' }}>
        <p style={{ fontSize: '0.62rem', letterSpacing: '0.14em', color: 'rgba(80,120,190,0.4)', lineHeight: 1.9 }}>
          Drag to rotate · Click a building to explore
        </p>
      </div>

      {/* Legend — bottom right */}
      <div style={{ position: 'fixed', bottom: 36, right: 44, zIndex: 100, textAlign: 'right', pointerEvents: 'none' }}>
        {[
          { color: '#4488ff', label: 'GitHub Profile' },
          { color: '#5060ff', label: 'Pinned Repos' },
          { color: '#3060c0', label: 'Skills Tower' },
          { color: '#283888', label: 'All Repos' },
        ].map(l => (
          <div key={l.label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, marginBottom: 5 }}>
            <span style={{ fontSize: '0.62rem', color: 'rgba(120,160,220,0.4)', letterSpacing: '0.06em' }}>{l.label}</span>
            <div style={{ width: 8, height: 8, borderRadius: 1, background: l.color, opacity: 0.7 }} />
          </div>
        ))}
      </div>
    </>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function CityScene() {
  const mountRef = useRef<HTMLDivElement>(null)
  const deselectRef = useRef<(() => void) | null>(null)
  const [selected, setSelected] = useState<BldData | null>(null)

  useEffect(() => {
    if (!mountRef.current) return
    const W = window.innerWidth, H = window.innerHeight

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    renderer.shadowMap.enabled = W > 800
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setClearColor(0x020810)
    mountRef.current.appendChild(renderer.domElement)

    // ── Scene ─────────────────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    const BG = 0x020810
    scene.background = new THREE.Color(BG)
    scene.fog = new THREE.Fog(BG, 18, 30)

    // ── Camera ────────────────────────────────────────────────────────────────
    const camera = new THREE.PerspectiveCamera(22, W / H, 0.1, 200)
    camera.position.set(0, 8, 22)
    const lookAtCurrent = new THREE.Vector3(0, 2, 0)

    // ── Lights ────────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 3.5))
    const spot = new THREE.SpotLight(0xffffff, 18, 0, undefined, 0.1)
    spot.position.set(8, 12, 8)
    spot.castShadow = true
    spot.shadow.mapSize.set(4096, 4096)
    scene.add(spot)
    scene.add(new THREE.PointLight(0x4060ff, 1.5, 30, 2))

    // ── City group ────────────────────────────────────────────────────────────
    const city = new THREE.Group()
    scene.add(city)

    // Ground
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(60, 60),
      new THREE.MeshStandardMaterial({ color: 0x040810, roughness: 1, metalness: 0 })
    )
    ground.rotation.x = -Math.PI / 2
    ground.receiveShadow = true
    city.add(ground)

    // Grid
    city.add(new THREE.GridHelper(60, 120, 0x1a2880, 0x080c20))

    // Stars (simple points far away, not in city group)
    const starPos = new Float32Array(4000 * 3)
    for (let i = 0; i < 4000; i++) {
      const r = 60 + Math.random() * 80
      const th = Math.random() * Math.PI * 2
      const ph = Math.acos(2 * Math.random() - 1)
      starPos[i*3] = r * Math.sin(ph) * Math.cos(th)
      starPos[i*3+1] = r * Math.sin(ph) * Math.sin(th)
      starPos[i*3+2] = r * Math.cos(ph)
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xaabbee, size: 0.15, sizeAttenuation: true })))

    // ── Building factory ──────────────────────────────────────────────────────
    const clickables: THREE.Mesh[] = []

    function addBuilding(b: BldData) {
      if (b.type === 'skills') { addSkillsTower(b); return }

      const geo = new THREE.BoxGeometry(b.w, b.h, b.d)
      const mat = new THREE.MeshStandardMaterial({
        color: b.base, roughness: 0.25, metalness: 0.85,
        emissive: new THREE.Color(b.accent), emissiveIntensity: 0.18,
      })
      const mesh = new THREE.Mesh(geo, mat)
      mesh.position.set(b.x, b.h / 2, b.z)
      mesh.castShadow = true
      mesh.userData = { bldData: b, mat, baseIntensity: 0.18 }
      clickables.push(mesh)
      city.add(mesh)

      // Wireframe
      const wm = new THREE.Mesh(geo.clone(), new THREE.MeshBasicMaterial({ color: b.wire, wireframe: true, transparent: true, opacity: 0.07 }))
      wm.position.copy(mesh.position)
      city.add(wm)

      // Glowing base slab
      const slab = new THREE.Mesh(
        new THREE.BoxGeometry(b.w + 0.12, 0.06, b.d + 0.12),
        new THREE.MeshBasicMaterial({ color: b.accent, transparent: true, opacity: 0.55 })
      )
      slab.position.set(b.x, 0.03, b.z)
      city.add(slab)

      // Rooftop accent
      if (b.type !== 'other') {
        const roof = new THREE.Mesh(
          new THREE.BoxGeometry(b.w * 0.5, 0.08, b.d * 0.5),
          new THREE.MeshBasicMaterial({ color: b.wire, transparent: true, opacity: 0.7 })
        )
        roof.position.set(b.x, b.h + 0.04, b.z)
        city.add(roof)
      }
    }

    function addSkillsTower(b: BldData) {
      let yOff = 0
      SKILL_FLOORS.forEach((fl, i) => {
        const geo = new THREE.BoxGeometry(b.w, fl.h - 0.1, b.d)
        const mat = new THREE.MeshStandardMaterial({
          color: 0x060e18, roughness: 0.25, metalness: 0.85,
          emissive: new THREE.Color(fl.color), emissiveIntensity: 0.22,
        })
        const mesh = new THREE.Mesh(geo, mat)
        mesh.position.set(b.x, yOff + fl.h / 2, b.z)
        mesh.castShadow = true
        mesh.userData = { bldData: b, mat, baseIntensity: 0.22 }
        clickables.push(mesh)
        city.add(mesh)

        // Wireframe
        const wm = new THREE.Mesh(geo.clone(), new THREE.MeshBasicMaterial({ color: fl.color, wireframe: true, transparent: true, opacity: 0.1 }))
        wm.position.copy(mesh.position)
        city.add(wm)

        // Floor separator (glowing ring)
        const sep = new THREE.Mesh(
          new THREE.BoxGeometry(b.w + 0.1, 0.07, b.d + 0.1),
          new THREE.MeshBasicMaterial({ color: fl.color, transparent: true, opacity: 0.75 })
        )
        sep.position.set(b.x, yOff + 0.035, b.z)
        city.add(sep)

        yOff += fl.h
      })

      // Spire
      const spire = new THREE.Mesh(
        new THREE.CylinderGeometry(0.025, 0.06, 1.8, 8),
        new THREE.MeshBasicMaterial({ color: 0x4080ff })
      )
      spire.position.set(b.x, yOff + 0.9, b.z)
      city.add(spire)

      // Glowing base
      const slab = new THREE.Mesh(
        new THREE.BoxGeometry(b.w + 0.14, 0.06, b.d + 0.14),
        new THREE.MeshBasicMaterial({ color: 0x3060c0, transparent: true, opacity: 0.55 })
      )
      slab.position.set(b.x, 0.03, b.z)
      city.add(slab)
    }

    BUILDINGS.forEach(addBuilding)

    // ── Data streams (moving boxes between buildings) ──────────────────────────
    const bldMap = Object.fromEntries(BUILDINGS.map(b => [b.id, b]))
    interface Stream { mesh: THREE.Mesh; s: THREE.Vector3; e: THREE.Vector3; t: number; spd: number; dir: 1 | -1 }
    const streams: Stream[] = []
    const streamMat = new THREE.MeshBasicMaterial({ color: 0x20d8ff, transparent: true, opacity: 0.65 })
    const streamGeo = new THREE.BoxGeometry(0.55, 0.04, 0.09)

    STREAM_PAIRS.forEach(([aId, bId]) => {
      const a = bldMap[aId], b = bldMap[bId]
      if (!a || !b) return
      for (let i = 0; i < 2; i++) {
        const mesh = new THREE.Mesh(streamGeo, streamMat)
        streams.push({
          mesh,
          s: new THREE.Vector3(a.x, 0.08 + i * 0.12, a.z),
          e: new THREE.Vector3(b.x, 0.08 + i * 0.12, b.z),
          t: Math.random(), spd: 0.004 + Math.random() * 0.004,
          dir: 1,
        })
        city.add(mesh)
      }
    })

    // ── Interaction state ─────────────────────────────────────────────────────
    const mouse = new THREE.Vector2()
    let selBld: BldData | null = null
    const camPosDef = new THREE.Vector3(0, 8, 22)
    const lookDef = new THREE.Vector3(0, 2, 0)
    const camPosTarget = camPosDef.clone()
    const lookTarget = lookDef.clone()
    let fovTarget = 22
    let hovMesh: THREE.Mesh | null = null
    const clickRay = new THREE.Raycaster()
    const hovRay = new THREE.Raycaster()

    function doSelect(bld: BldData) {
      selBld = bld
      setSelected(bld)
      // Zoom target: in front of the building
      camPosTarget.set(bld.x * 0.55, bld.h * 0.4 + 1.5, bld.z + 13)
      lookTarget.set(bld.x, bld.h * 0.4, bld.z)
      fovTarget = 10
      renderer.domElement.style.cursor = 'default'
    }

    function doDeselect() {
      if (hovMesh) {
        const mat = hovMesh.userData.mat as THREE.MeshStandardMaterial
        if (mat) mat.emissiveIntensity = hovMesh.userData.baseIntensity
        hovMesh = null
      }
      selBld = null
      setSelected(null)
      camPosTarget.copy(camPosDef)
      lookTarget.copy(lookDef)
      fovTarget = 22
      renderer.domElement.style.cursor = 'crosshair'
    }

    deselectRef.current = doDeselect

    // ── Event handlers ─────────────────────────────────────────────────────────
    const onMove = (e: MouseEvent) => {
      const r = renderer.domElement.getBoundingClientRect()
      mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1
      mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1

      if (selBld) return

      hovRay.setFromCamera(mouse, camera)
      const hits = hovRay.intersectObjects(clickables, false)

      if (hovMesh) {
        const mat = hovMesh.userData.mat as THREE.MeshStandardMaterial
        if (mat) mat.emissiveIntensity = hovMesh.userData.baseIntensity
        hovMesh = null
      }
      if (hits.length) {
        hovMesh = hits[0].object as THREE.Mesh
        const mat = hovMesh.userData.mat as THREE.MeshStandardMaterial
        if (mat) mat.emissiveIntensity = 0.55
        renderer.domElement.style.cursor = 'pointer'
      } else {
        renderer.domElement.style.cursor = 'crosshair'
      }
    }

    const onClick = (e: MouseEvent) => {
      if (selBld) return
      const r = renderer.domElement.getBoundingClientRect()
      const cx = ((e.clientX - r.left) / r.width) * 2 - 1
      const cy = -((e.clientY - r.top) / r.height) * 2 + 1
      clickRay.setFromCamera(new THREE.Vector2(cx, cy), camera)
      const hits = clickRay.intersectObjects(clickables, false)
      if (hits.length) {
        const bld = hits[0].object.userData.bldData as BldData
        if (bld) doSelect(bld)
      }
    }

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    renderer.domElement.style.cursor = 'crosshair'
    renderer.domElement.addEventListener('mousemove', onMove)
    renderer.domElement.addEventListener('click', onClick)
    window.addEventListener('resize', onResize)

    // ── Animation loop ─────────────────────────────────────────────────────────
    let raf: number
    let t = 0

    const animate = () => {
      raf = requestAnimationFrame(animate)
      t += 0.001

      if (selBld) {
        // Settle city rotation toward neutral
        city.rotation.y *= 0.92
        city.rotation.x *= 0.92
      } else {
        // Mouse-driven rotation (City3D style)
        city.rotation.y += (mouse.x * 0.32 - city.rotation.y) * 0.028
        city.rotation.x += (-mouse.y * 0.06 - city.rotation.x) * 0.024
        city.rotation.x = Math.max(-0.05, Math.min(0.22, city.rotation.x))
      }

      // Smooth camera
      camera.position.lerp(camPosTarget, 0.05)
      lookAtCurrent.lerp(lookTarget, 0.05)
      camera.lookAt(lookAtCurrent)
      camera.fov += (fovTarget - camera.fov) * 0.06
      camera.updateProjectionMatrix()

      // Data streams
      streams.forEach(s => {
        s.t += s.spd * s.dir
        if (s.t >= 1) { s.t = 1; s.dir = -1 }
        if (s.t <= 0) { s.t = 0; s.dir = 1 }
        s.mesh.position.lerpVectors(s.s, s.e, s.t)
        const dir = s.e.clone().sub(s.s)
        s.mesh.rotation.y = Math.atan2(dir.x, dir.z)
      })

      // Slow smoke particles (optional: tiny pulsing on main tower roof)
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      renderer.domElement.removeEventListener('mousemove', onMove)
      renderer.domElement.removeEventListener('click', onClick)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
      renderer.dispose()
      if (mountRef.current?.contains(renderer.domElement)) mountRef.current.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <>
      <div ref={mountRef} style={{ position: 'fixed', inset: 0, zIndex: 0 }} />
      <HUD />
      {selected && (
        <Panel bld={selected} onClose={() => deselectRef.current?.()} />
      )}
    </>
  )
}
