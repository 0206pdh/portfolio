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
interface ContribDay { date: string; count: number; level: number }

// ─── Building data ────────────────────────────────────────────────────────────
const BUILDINGS: BldData[] = [
  {
    id: 'main', name: '@0206pdh', subtitle: 'GitHub Profile · 23 Public Repos',
    description: 'Cloud & Backend Engineer in training based in South Korea. Studying AWS infrastructure, DevOps pipelines, and systems design. 23 public repos spanning fintech AI pipelines, browser extensions, crypto bots, and competitive programming.',
    link: 'https://github.com/0206pdh',
    tags: ['AWS', 'Python', 'FastAPI', 'Docker', 'Node.js', 'Java', 'TypeScript'],
    stats: [{ label: 'Public Repos', value: '23' }, { label: 'Languages', value: '5+' }, { label: 'Domain', value: 'Cloud/Backend' }],
    x: 0, z: 0, w: 2.8, d: 2.8, h: 14, type: 'main', base: 0x0e1e50, accent: 0x2255ff, wire: 0x5588ff,
  },
  {
    id: 'fin_spring', name: 'fin_spring', subtitle: 'Financial Event-Driven Market Impact System',
    description: 'Real-time financial news → FX directional bias + sector market pressure. LangGraph 3-step chain handles event classification, FX channel identification, and keyword generation. Rule-based scoring — explainable, not speculative.',
    link: 'https://github.com/0206pdh/fin_spring',
    tags: ['Python', 'FastAPI', 'TimescaleDB', 'pgvector', 'Redis', 'LangGraph', 'GPT-4o-mini', 'Docker'],
    stats: [{ label: 'Query Speed', value: '−99.7%' }, { label: 'Time-series', value: '−93%' }, { label: 'Parse Errors', value: '0%' }],
    x: 5, z: 0, w: 1.9, d: 1.9, h: 9, type: 'pinned', base: 0x0c1235, accent: 0x3850e0, wire: 0x6070ff,
  },
  {
    id: 'yt_filter', name: 'YT Comment Filter', subtitle: 'YouTube Live Toxic Comment Filter',
    description: 'Chrome extension + FastAPI backend detecting toxic YouTube live comments using a local ML model. Privacy-first — no external API calls. Containerized with Docker. AWS ECS Fargate migration planned.',
    link: 'https://github.com/0206pdh/youtube_live_comment_filter',
    tags: ['Python', 'FastAPI', 'JavaScript', 'Chrome Extension', 'Docker', 'ML', 'AWS ECS'],
    stats: [{ label: 'Inference', value: 'Local ML' }, { label: 'Deploy', value: 'Docker' }, { label: 'Roadmap', value: 'AWS ECS' }],
    x: -5, z: 0, w: 1.7, d: 1.7, h: 7, type: 'pinned', base: 0x180d30, accent: 0x8028d0, wire: 0xb050f0,
  },
  {
    id: 'algonotion', name: 'AlgoNotion', subtitle: 'Baekjoon → Notion Chrome Extension',
    description: 'Chrome extension (Manifest V3) that auto-captures accepted Baekjoon OJ solutions and syncs them into Notion. Enriches entries via solved.ac API (title + difficulty).',
    link: 'https://github.com/0206pdh/AlgoNotion_Extention',
    tags: ['JavaScript', 'Chrome Extension', 'Notion API', 'solved.ac API', 'Manifest V3'],
    stats: [{ label: 'Platform', value: 'Chrome MV3' }, { label: 'Sync', value: 'Auto' }, { label: 'APIs', value: 'Notion + solved.ac' }],
    x: 0.5, z: 5, w: 1.5, d: 1.5, h: 5, type: 'pinned', base: 0x061820, accent: 0x00a0b8, wire: 0x30d8f0,
  },
  {
    id: 'skills', name: 'Tech Stack', subtitle: 'Skills Tower — 5 Domains',
    description: 'Each floor represents a skill domain. Ground floor: Cloud & DevOps. Upper floors: Backend, Database, AI/LLM, Languages.',
    link: 'https://github.com/0206pdh',
    tags: ['AWS', 'Docker', 'Python', 'FastAPI', 'PostgreSQL', 'Redis', 'LangGraph', 'TypeScript'],
    stats: [{ label: 'Cloud', value: 'AWS + Docker' }, { label: 'Backend', value: 'Py · Node · Spring' }, { label: 'AI', value: 'LangGraph + OpenAI' }],
    skills: [
      { floor: 'Cloud & DevOps', color: '#4488ff', items: ['AWS (EC2, S3, RDS, IAM)', 'Docker', 'Linux / Shell', 'GitHub Actions CI/CD'] },
      { floor: 'Backend',        color: '#9944ee', items: ['Python / FastAPI', 'Node.js / Express', 'Java / Spring', 'REST API Design'] },
      { floor: 'Database',       color: '#22ddee', items: ['PostgreSQL', 'Redis', 'MySQL', 'TimescaleDB / pgvector'] },
      { floor: 'AI / LLM',      color: '#ee44cc', items: ['OpenAI API / Function Calling', 'LangGraph', 'Local ML Inference', 'pgvector Semantic Search'] },
      { floor: 'Languages',      color: '#44ee88', items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'SQL'] },
    ],
    x: -7, z: -2, w: 2.2, d: 2.2, h: 11, type: 'skills', base: 0x080e20, accent: 0x2040c0, wire: 0x4060e0,
  },
  { id: 'financial_ts', name: 'Market Impact TS', subtitle: 'Financial Event System v1 (TypeScript)',
    description: 'Earlier TypeScript-heavy version of the financial market impact system. Same FX/sector analysis concept, full-stack with OpenAI integration.',
    link: 'https://github.com/0206pdh/Financial-Event-Driven-Market-Impact-System', tags: ['TypeScript', 'FastAPI', 'PostgreSQL', 'OpenAI'],
    x: 8.5, z: -3.5, w: 1.4, d: 1.4, h: 7.5, type: 'other', base: 0x0a1028, accent: 0x2030a0, wire: 0x3040b0 },
  { id: 'algobot', name: 'AlgoBot', subtitle: 'Crypto Trading Bot with GUI',
    description: 'Python crypto trading bot supporting live trading, backtesting, simulations, and strategy optimization. GUI + multi-exchange support.',
    link: 'https://github.com/0206pdh/algobot', tags: ['Python', 'GUI', 'Crypto', 'Backtesting'],
    x: -8.5, z: -3.5, w: 1.4, d: 1.4, h: 6, type: 'other', base: 0x0a1028, accent: 0x2030a0, wire: 0x3040b0 },
  { id: 'road_construct', name: 'Road Construct', subtitle: 'Road Construction Alert System',
    description: 'Node.js + MongoDB backend marking road construction info on a map and alerting nearby users.',
    link: 'https://github.com/0206pdh/Road_Construct', tags: ['Node.js', 'MongoDB', 'JavaScript'],
    x: 6.5, z: -7, w: 1.2, d: 1.2, h: 4.5, type: 'other', base: 0x0a1028, accent: 0x2030a0, wire: 0x3040b0 },
  { id: 'coding_hub', name: 'Coding Test Hub', subtitle: 'Baekjoon Auto-Push Repository',
    description: 'Automated Baekjoon OJ solution archive powered by BaekjoonHub. Java-based competitive programming history.',
    link: 'https://github.com/0206pdh/coding-test-hub', tags: ['Java', 'BaekjoonHub', 'Algorithms'],
    x: -6.5, z: -7, w: 1.2, d: 1.2, h: 5, type: 'other', base: 0x0a1028, accent: 0x2030a0, wire: 0x3040b0 },
  { id: 'toxicfree', name: 'ToxicFree', subtitle: 'Toxic Comment Filter Extension (v1)',
    description: 'Early Chrome extension for filtering toxic YouTube comments. Predecessor to the YouTube Live Comment Filter.',
    link: 'https://github.com/0206pdh/ToxicFree_Extension', tags: ['Chrome Extension', 'AI', 'JavaScript'],
    x: 3.5, z: -8.5, w: 1.1, d: 1.1, h: 4, type: 'other', base: 0x0a1028, accent: 0x2030a0, wire: 0x3040b0 },
  { id: 'serverless', name: 'Serverless Tax', subtitle: 'Serverless Tax Calculator',
    description: 'JavaScript-based serverless tax calculation service.',
    link: 'https://github.com/0206pdh/serverless-tax-calculate', tags: ['JavaScript', 'Serverless'],
    x: -3.5, z: -8.5, w: 1.0, d: 1.0, h: 3, type: 'other', base: 0x0a1028, accent: 0x2030a0, wire: 0x3040b0 },
  { id: 'safe_way', name: 'SafeWay', subtitle: 'Safe Route Navigation App',
    description: 'JavaScript application for finding safe routes.',
    link: 'https://github.com/0206pdh/safe_way', tags: ['JavaScript', 'Maps'],
    x: 9.5, z: 2.5, w: 1.0, d: 1.0, h: 3, type: 'other', base: 0x0a1028, accent: 0x2030a0, wire: 0x3040b0 },
  { id: 'db_project', name: 'DB Project', subtitle: 'Database Course Project',
    description: 'Java-based database management system developed as a course assignment.',
    link: 'https://github.com/0206pdh/DataBase_project', tags: ['Java', 'Database', 'SQL'],
    x: -9.5, z: 2.5, w: 1.0, d: 1.0, h: 2.5, type: 'other', base: 0x0a1028, accent: 0x2030a0, wire: 0x3040b0 },
  { id: 'aws_library', name: 'AWS Library', subtitle: 'Cloud Library Management CLI',
    description: 'Python CLI-based library system with CSV data loading, book/member management, and checkout tracking.',
    link: 'https://github.com/0206pdh/aws13th-library-system', tags: ['Python', 'AWS', 'CLI'],
    x: 7, z: 6, w: 1.0, d: 1.0, h: 2, type: 'other', base: 0x0a1028, accent: 0x2030a0, wire: 0x3040b0 },
]

const SKILL_FLOORS = [
  { color: 0x4488ff, h: 2.2 }, { color: 0x9944ee, h: 2.0 },
  { color: 0x22ddee, h: 2.2 }, { color: 0xee44cc, h: 2.0 }, { color: 0x44ee88, h: 2.0 },
]

const STREAM_PAIRS = [
  ['main', 'fin_spring'], ['main', 'yt_filter'], ['main', 'algonotion'],
  ['main', 'skills'], ['fin_spring', 'financial_ts'], ['yt_filter', 'toxicfree'],
]

// ─── Cloud texture ────────────────────────────────────────────────────────────
function makeCloudTex(): THREE.CanvasTexture {
  const s = 256, c = document.createElement('canvas')
  c.width = s; c.height = s
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(s/2, s/2, 0, s/2, s/2, s/2)
  g.addColorStop(0,    'rgba(220,235,255,1)')
  g.addColorStop(0.35, 'rgba(195,215,255,0.72)')
  g.addColorStop(0.7,  'rgba(170,200,255,0.28)')
  g.addColorStop(1,    'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, s, s)
  return new THREE.CanvasTexture(c)
}

// ─── Panel ────────────────────────────────────────────────────────────────────
function Panel({ bld, onClose }: { bld: BldData; onClose: () => void }) {
  const hex = '#' + bld.accent.toString(16).padStart(6, '0')
  return (
    <div style={{ position:'fixed', top:0, right:0, height:'100%', width:400,
      background:'rgba(5,12,32,0.94)', backdropFilter:'blur(20px)',
      borderLeft:`1px solid ${hex}30`, zIndex:200, overflowY:'auto',
      animation:'slideIn 0.3s ease' }}>
      <style>{`@keyframes slideIn{from{transform:translateX(30px);opacity:0}to{transform:none;opacity:1}}`}</style>
      <div style={{ padding:'28px 26px 18px', borderBottom:`1px solid ${hex}18` }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div>
            <div style={{ fontSize:'0.58rem', letterSpacing:'0.2em', textTransform:'uppercase', color:hex, opacity:.6, marginBottom:7 }}>
              {bld.type==='main'?'GitHub Profile':bld.type==='skills'?'Skills Tower':bld.type==='pinned'?'Pinned Repo':'Repository'}
            </div>
            <h2 style={{ fontSize:'1.2rem', fontWeight:700, color:'#d8eaff', lineHeight:1.2, marginBottom:5 }}>{bld.name}</h2>
            <p style={{ fontSize:'0.71rem', color:'rgba(140,175,240,0.5)', lineHeight:1.4 }}>{bld.subtitle}</p>
          </div>
          <button onClick={onClose} style={{ background:'none', border:`1px solid rgba(80,120,200,0.2)`,
            borderRadius:6, color:'rgba(140,175,240,0.4)', cursor:'pointer', padding:'5px 10px',
            fontSize:'0.7rem', marginLeft:10, transition:'all 0.2s' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=hex;e.currentTarget.style.color='#fff'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(80,120,200,0.2)';e.currentTarget.style.color='rgba(140,175,240,0.4)'}}>
            ✕
          </button>
        </div>
      </div>
      <div style={{ padding:'20px 26px' }}>
        {bld.stats && (
          <div style={{ display:'flex', gap:8, marginBottom:18 }}>
            {bld.stats.map(s => (
              <div key={s.label} style={{ flex:1, background:`${hex}10`, border:`1px solid ${hex}22`, borderRadius:7, padding:'10px 12px' }}>
                <div style={{ fontSize:'0.92rem', fontWeight:700, color:hex, marginBottom:2 }}>{s.value}</div>
                <div style={{ fontSize:'0.6rem', color:'rgba(120,155,215,0.45)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}
        <p style={{ fontSize:'0.84rem', color:'rgba(160,195,255,0.62)', lineHeight:1.75, marginBottom:20 }}>{bld.description}</p>
        {bld.skills && (
          <div style={{ marginBottom:20 }}>
            <p style={{ fontSize:'0.58rem', letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(100,140,210,0.38)', marginBottom:10 }}>Floors (bottom → top)</p>
            <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
              {bld.skills.map(f => (
                <div key={f.floor} style={{ background:`${f.color}0c`, border:`1px solid ${f.color}20`, borderRadius:7, padding:'9px 13px' }}>
                  <div style={{ fontSize:'0.74rem', fontWeight:600, color:f.color, marginBottom:5 }}>{f.floor}</div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
                    {f.items.map(it => <span key={it} style={{ fontSize:'0.63rem', padding:'2px 7px', borderRadius:10, background:`${f.color}14`, color:`${f.color}bb` }}>{it}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={{ marginBottom:22 }}>
          <p style={{ fontSize:'0.58rem', letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(100,140,210,0.38)', marginBottom:8 }}>Stack</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
            {bld.tags.map(t => <span key={t} style={{ fontSize:'0.68rem', padding:'3px 10px', borderRadius:20, background:`${hex}12`, border:`1px solid ${hex}26`, color:`${hex}bb`, fontWeight:500 }}>{t}</span>)}
          </div>
        </div>
        <a href={bld.link} target="_blank" rel="noopener noreferrer"
          style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:7, padding:'12px',
            borderRadius:8, textDecoration:'none', fontWeight:600, fontSize:'0.8rem',
            background:`${hex}18`, border:`1px solid ${hex}35`, color:hex, transition:'all 0.25s' }}
          onMouseEnter={e=>{e.currentTarget.style.background=`${hex}28`;e.currentTarget.style.boxShadow=`0 0 16px ${hex}28`}}
          onMouseLeave={e=>{e.currentTarget.style.background=`${hex}18`;e.currentTarget.style.boxShadow='none'}}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
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
      <div style={{ position:'fixed', bottom:30, left:36, zIndex:100, pointerEvents:'none' }}>
        <p style={{ fontSize:'0.58rem', letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(120,160,230,0.5)', marginBottom:4 }}>Cloud & Backend Engineer</p>
        <h1 style={{ fontSize:'1.45rem', fontWeight:800, letterSpacing:'-0.02em', background:'linear-gradient(120deg,#c8dcff,#80b8ff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', margin:0 }}>Dohyun Park</h1>
        <p style={{ fontSize:'0.66rem', color:'rgba(120,160,225,0.38)', marginTop:3, fontFamily:'monospace' }}>박도현 · @0206pdh</p>
      </div>
      <div style={{ position:'fixed', top:26, right:36, zIndex:100, textAlign:'right', pointerEvents:'none' }}>
        <p style={{ fontSize:'0.59rem', letterSpacing:'0.1em', color:'rgba(130,165,225,0.38)', lineHeight:2 }}>Drag to rotate · Scroll to zoom · Click a building</p>
      </div>
    </>
  )
}

// ─── Main scene ───────────────────────────────────────────────────────────────
export default function CityScene() {
  const mountRef    = useRef<HTMLDivElement>(null)
  const deselectRef = useRef<(() => void) | null>(null)
  // Refs for cross-effect Three.js access
  const cityRef       = useRef<THREE.Group | null>(null)
  const cloudGroupRef = useRef<THREE.Group | null>(null)
  const cloudTexRef   = useRef<THREE.CanvasTexture | null>(null)

  const [selected,  setSelected]  = useState<BldData | null>(null)
  const [contribs,  setContribs]  = useState<ContribDay[]>([])

  // ── Fetch contributions independently ──────────────────────────────────────
  useEffect(() => {
    fetch('https://github-contributions-api.jogruber.de/v4/0206pdh?y=last')
      .then(r => r.json())
      .then(d => setContribs((d.contributions as ContribDay[]).filter((c: ContribDay) => c.level > 0)))
      .catch(() => {/* no clouds – silent fail */})
  }, [])

  // ── Add contribution clouds when data arrives ──────────────────────────────
  useEffect(() => {
    if (contribs.length === 0 || !cityRef.current || !cloudGroupRef.current || !cloudTexRef.current) return
    const group = cloudGroupRef.current
    const tex   = cloudTexRef.current

    // Clear previous sprites
    while (group.children.length) group.remove(group.children[0])

    contribs.forEach(day => {
      const lvl = day.level
      const n   = lvl === 1 ? 2 : lvl === 2 ? 3 : lvl === 3 ? 4 : 5
      const bx  = (Math.random() - 0.5) * 22
      const bz  = (Math.random() - 0.5) * 22
      const by  = 7 + lvl * 1.8 + Math.random() * 3

      for (let k = 0; k < n; k++) {
        const base  = 1.8 + lvl * 1.1
        const scale = base * (0.6 + Math.random() * 0.8)
        const mat   = new THREE.SpriteMaterial({
          map: tex, color: new THREE.Color(0xc0d8ff),
          transparent: true, opacity: 0.06 + lvl * 0.04 + Math.random() * 0.03,
          depthWrite: false,
        })
        const spr = new THREE.Sprite(mat)
        spr.position.set(
          bx + (Math.random() - 0.5) * base * 0.9,
          by + (Math.random() - 0.5) * 0.7,
          bz + (Math.random() - 0.5) * base * 0.9,
        )
        spr.scale.set(scale, scale * 0.42, 1)
        spr.userData = {
          dx: (Math.random() - 0.5) * 0.0025,
          dz: (Math.random() - 0.5) * 0.0025,
          fOff: Math.random() * Math.PI * 2,
          fSpd: 0.0004 + Math.random() * 0.0005,
        }
        group.add(spr)
      }
    })
  }, [contribs])

  // ── Three.js scene (synchronous) ───────────────────────────────────────────
  useEffect(() => {
    const el = mountRef.current
    if (!el) return

    const W = window.innerWidth, H = window.innerHeight

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    renderer.setClearColor(0x0d1f3c)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    el.appendChild(renderer.domElement)

    // Scene
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0d1f3c)
    scene.fog = new THREE.Fog(0x0d1f3c, 24, 46)

    // Camera
    const camera = new THREE.PerspectiveCamera(22, W / H, 0.1, 200)
    camera.position.set(0, 8, 22)
    const lookCur = new THREE.Vector3(0, 2, 0)
    const CAM_BASE = new THREE.Vector3(0, 8, 22)

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 5)
    scene.add(ambient)
    const sun = new THREE.DirectionalLight(0xffffff, 2.5)
    sun.position.set(10, 20, 10)
    sun.castShadow = true
    sun.shadow.mapSize.set(2048, 2048)
    scene.add(sun)
    const fillBlue = new THREE.DirectionalLight(0x6688ff, 1.5)
    fillBlue.position.set(-8, 5, -5)
    scene.add(fillBlue)

    // City group
    const city = new THREE.Group()
    scene.add(city)
    cityRef.current = city

    // Ground
    const gnd = new THREE.Mesh(
      new THREE.PlaneGeometry(80, 80),
      new THREE.MeshStandardMaterial({ color: 0x0c1a30, roughness: 1 })
    )
    gnd.rotation.x = -Math.PI / 2
    gnd.receiveShadow = true
    city.add(gnd)

    // Grid
    city.add(new THREE.GridHelper(80, 160, 0x203878, 0x0e1c38))

    // Stars
    const sp = new Float32Array(5000 * 3)
    for (let i = 0; i < 5000; i++) {
      const r = 70 + Math.random() * 90
      const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1)
      sp[i*3] = r*Math.sin(ph)*Math.cos(th); sp[i*3+1] = r*Math.sin(ph)*Math.sin(th); sp[i*3+2] = r*Math.cos(ph)
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3))
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xaabbee, size: 0.18, sizeAttenuation: true, transparent: true, opacity: 0.75 })))

    // Cloud group (inside city so it rotates with buildings)
    const cloudGroup = new THREE.Group()
    city.add(cloudGroup)
    cloudGroupRef.current = cloudGroup
    cloudTexRef.current = makeCloudTex()

    // ── Building factory ──────────────────────────────────────────────────────
    const clickables: THREE.Mesh[] = []

    function slab(w: number, d: number, x: number, z: number, color: number) {
      const m = new THREE.Mesh(
        new THREE.BoxGeometry(w + 0.15, 0.07, d + 0.15),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.6 })
      )
      m.position.set(x, 0.04, z)
      city.add(m)
    }

    BUILDINGS.forEach(b => {
      if (b.type === 'skills') {
        // Skills tower — stacked floors
        let yOff = 0
        SKILL_FLOORS.forEach(fl => {
          const geo = new THREE.BoxGeometry(b.w, fl.h - 0.08, b.d)
          const mat = new THREE.MeshStandardMaterial({
            color: 0x0c1425, roughness: 0.18, metalness: 0.9,
            emissive: new THREE.Color(fl.color), emissiveIntensity: 0.3,
          })
          const mesh = new THREE.Mesh(geo, mat)
          mesh.position.set(b.x, yOff + fl.h / 2, b.z)
          mesh.castShadow = true
          mesh.userData = { bldData: b, mat, baseI: 0.3 }
          clickables.push(mesh)
          city.add(mesh)

          // Wireframe
          const wm = new THREE.Mesh(geo.clone(), new THREE.MeshBasicMaterial({ color: fl.color, wireframe: true, transparent: true, opacity: 0.12 }))
          wm.position.copy(mesh.position)
          city.add(wm)

          // Floor separator
          const sep = new THREE.Mesh(
            new THREE.BoxGeometry(b.w + 0.08, 0.07, b.d + 0.08),
            new THREE.MeshBasicMaterial({ color: fl.color, transparent: true, opacity: 0.85 })
          )
          sep.position.set(b.x, yOff + 0.04, b.z)
          city.add(sep)
          yOff += fl.h
        })
        // Spire
        const spire = new THREE.Mesh(
          new THREE.CylinderGeometry(0.025, 0.07, 2.0, 8),
          new THREE.MeshBasicMaterial({ color: 0x66aaff })
        )
        spire.position.set(b.x, yOff + 1.0, b.z)
        city.add(spire)
        slab(b.w, b.d, b.x, b.z, 0x2244cc)

      } else {
        // Normal building
        const geo = new THREE.BoxGeometry(b.w, b.h, b.d)
        const mat = new THREE.MeshStandardMaterial({
          color: b.base, roughness: 0.18, metalness: 0.88,
          emissive: new THREE.Color(b.accent),
          emissiveIntensity: b.type === 'main' ? 0.28 : b.type === 'pinned' ? 0.22 : 0.16,
        })
        const mesh = new THREE.Mesh(geo, mat)
        mesh.position.set(b.x, b.h / 2, b.z)
        mesh.castShadow = true
        mesh.userData = { bldData: b, mat, baseI: mat.emissiveIntensity }
        clickables.push(mesh)
        city.add(mesh)

        // Wireframe
        const wm = new THREE.Mesh(geo.clone(), new THREE.MeshBasicMaterial({ color: b.wire, wireframe: true, transparent: true, opacity: b.type === 'main' ? 0.12 : 0.07 }))
        wm.position.copy(mesh.position)
        city.add(wm)

        // Base slab
        slab(b.w, b.d, b.x, b.z, b.accent)

        // Roof (main + pinned)
        if (b.type !== 'other') {
          const roof = new THREE.Mesh(
            new THREE.BoxGeometry(b.w * 0.55, 0.07, b.d * 0.55),
            new THREE.MeshBasicMaterial({ color: b.wire, transparent: true, opacity: 0.8 })
          )
          roof.position.set(b.x, b.h + 0.04, b.z)
          city.add(roof)
        }
      }
    })

    // ── Data streams ──────────────────────────────────────────────────────────
    interface Stream { mesh: THREE.Mesh; s: THREE.Vector3; e: THREE.Vector3; t: number; spd: number; dir: 1|-1 }
    const streams: Stream[] = []
    const bldMap = Object.fromEntries(BUILDINGS.map(b => [b.id, b]))
    const sMat = new THREE.MeshBasicMaterial({ color: 0x40eeff, transparent: true, opacity: 0.75 })
    const sGeo = new THREE.BoxGeometry(0.5, 0.04, 0.08)
    STREAM_PAIRS.forEach(([aid, bid]) => {
      const a = bldMap[aid], b = bldMap[bid]
      if (!a || !b) return
      for (let i = 0; i < 2; i++) {
        const m = new THREE.Mesh(sGeo, sMat.clone())
        const stream: Stream = {
          mesh: m,
          s: new THREE.Vector3(a.x, 0.08 + i * 0.1, a.z),
          e: new THREE.Vector3(b.x, 0.08 + i * 0.1, b.z),
          t: Math.random(), spd: 0.004 + Math.random() * 0.004, dir: 1,
        }
        streams.push(stream)
        city.add(m)
      }
    })

    // ── Interaction state ─────────────────────────────────────────────────────
    let selBld: BldData | null = null
    let cameraZoom = 1.0
    const camTarget  = CAM_BASE.clone()
    const lookTarget = new THREE.Vector3(0, 2, 0)

    // Drag rotation
    let dragging = false, prevX = 0, prevY = 0
    let velY = 0, velX = 0, tgtY = 0, tgtX = 0.0

    // Hover
    let hovMesh: THREE.Mesh | null = null
    const ray = new THREE.Raycaster()

    function doSelect(bld: BldData) {
      selBld = bld; setSelected(bld)
      camTarget.set(bld.x * 0.5, bld.h * 0.4 + 2, bld.z + 13)
      lookTarget.set(bld.x, bld.h * 0.4, bld.z)
      renderer.domElement.style.cursor = 'default'
    }
    function doDeselect() {
      if (hovMesh) { (hovMesh.userData.mat as THREE.MeshStandardMaterial).emissiveIntensity = hovMesh.userData.baseI; hovMesh = null }
      selBld = null; setSelected(null)
      camTarget.copy(CAM_BASE).multiplyScalar(cameraZoom)
      lookTarget.set(0, 2, 0)
      renderer.domElement.style.cursor = 'grab'
    }
    deselectRef.current = doDeselect

    function getNDC(cx: number, cy: number) {
      const r = renderer.domElement.getBoundingClientRect()
      return new THREE.Vector2(((cx-r.left)/r.width)*2-1, -((cy-r.top)/r.height)*2+1)
    }

    // Events
    const onDown  = (e: MouseEvent) => { if (selBld) return; dragging=true; velY=velX=0; prevX=e.clientX; prevY=e.clientY; renderer.domElement.style.cursor='grabbing' }
    const onMove  = (e: MouseEvent) => {
      // Hover
      if (!selBld) {
        ray.setFromCamera(getNDC(e.clientX, e.clientY), camera)
        const hits = ray.intersectObjects(clickables, false)
        if (hovMesh) { (hovMesh.userData.mat as THREE.MeshStandardMaterial).emissiveIntensity = hovMesh.userData.baseI; hovMesh = null }
        if (hits.length) { hovMesh = hits[0].object as THREE.Mesh; (hovMesh.userData.mat as THREE.MeshStandardMaterial).emissiveIntensity = 0.65; renderer.domElement.style.cursor = dragging ? 'grabbing' : 'pointer' }
        else if (!dragging) renderer.domElement.style.cursor = 'grab'
      }
      if (!dragging || selBld) return
      const dx = (e.clientX-prevX)*0.009, dy = (e.clientY-prevY)*0.009
      velY=dx; velX=dy; tgtY+=dx; tgtX+=dy; prevX=e.clientX; prevY=e.clientY
    }
    const onUp    = () => { dragging=false; renderer.domElement.style.cursor = 'grab' }
    const onClick = (e: MouseEvent) => {
      if (selBld || Math.abs(velY)>0.01) return
      ray.setFromCamera(getNDC(e.clientX, e.clientY), camera)
      const hits = ray.intersectObjects(clickables, false)
      if (hits.length) { const b = hits[0].object.userData.bldData as BldData; if (b) doSelect(b) }
    }
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      cameraZoom = Math.max(0.22, Math.min(4.0, cameraZoom * (e.deltaY > 0 ? 1.12 : 0.9)))
      if (!selBld) camTarget.copy(CAM_BASE).multiplyScalar(cameraZoom)
    }
    const onResize = () => { camera.aspect=window.innerWidth/window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth,window.innerHeight) }

    // Touch
    let lastPinch = 0
    const onTStart = (e: TouchEvent) => { if (e.touches.length===1){dragging=true;velY=velX=0;prevX=e.touches[0].clientX;prevY=e.touches[0].clientY} if(e.touches.length===2)lastPinch=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY) }
    const onTMove  = (e: TouchEvent) => {
      e.preventDefault()
      if (e.touches.length===1&&dragging){const dx=(e.touches[0].clientX-prevX)*0.009,dy=(e.touches[0].clientY-prevY)*0.009;velY=dx;velX=dy;tgtY+=dx;tgtX+=dy;prevX=e.touches[0].clientX;prevY=e.touches[0].clientY}
      if (e.touches.length===2){const d=Math.hypot(e.touches[0].clientX-e.touches[1].clientX,e.touches[0].clientY-e.touches[1].clientY);if(lastPinch>0){cameraZoom=Math.max(0.22,Math.min(4,cameraZoom*lastPinch/d));if(!selBld)camTarget.copy(CAM_BASE).multiplyScalar(cameraZoom)}lastPinch=d}
    }
    const onTEnd = () => { dragging=false; lastPinch=0 }

    renderer.domElement.style.cursor = 'grab'
    renderer.domElement.addEventListener('mousedown', onDown)
    renderer.domElement.addEventListener('mousemove', onMove)
    renderer.domElement.addEventListener('mouseup',   onUp)
    renderer.domElement.addEventListener('click',     onClick)
    renderer.domElement.addEventListener('wheel',     onWheel, { passive: false })
    renderer.domElement.addEventListener('touchstart',onTStart, { passive: false })
    renderer.domElement.addEventListener('touchmove', onTMove,  { passive: false })
    renderer.domElement.addEventListener('touchend',  onTEnd)
    window.addEventListener('resize', onResize)

    // ── Animation loop ─────────────────────────────────────────────────────────
    let raf: number, t = 0

    const animate = () => {
      raf = requestAnimationFrame(animate)
      t += 0.001

      // City rotation
      if (selBld) {
        city.rotation.y *= 0.9; city.rotation.x *= 0.9
      } else {
        if (!dragging) { velY *= 0.94; velX *= 0.94; tgtY += velY; tgtX += velX }
        city.rotation.y += (tgtY - city.rotation.y) * 0.1
        city.rotation.x += (tgtX - city.rotation.x) * 0.1
      }

      // Smooth camera
      camera.position.lerp(camTarget, 0.055)
      lookCur.lerp(lookTarget, 0.055)
      camera.lookAt(lookCur)

      // Contribution cloud drift
      cloudGroup.children.forEach(child => {
        const u = (child as THREE.Sprite).userData
        if (!u.dx) return
        child.position.x += u.dx; child.position.z += u.dz
        child.position.y += Math.sin(t * 600 * u.fSpd + u.fOff) * 0.0003
        if (child.position.x >  13) child.position.x = -13
        if (child.position.x < -13) child.position.x =  13
        if (child.position.z >  13) child.position.z = -13
        if (child.position.z < -13) child.position.z =  13
      })

      // Data streams
      streams.forEach(s => {
        s.t += s.spd * s.dir
        if (s.t >= 1) { s.t = 1; s.dir = -1 }
        if (s.t <= 0) { s.t = 0; s.dir = 1 }
        s.mesh.position.lerpVectors(s.s, s.e, s.t)
        const d = s.e.clone().sub(s.s)
        s.mesh.rotation.y = Math.atan2(d.x, d.z)
      })

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      renderer.domElement.removeEventListener('mousedown', onDown)
      renderer.domElement.removeEventListener('mousemove', onMove)
      renderer.domElement.removeEventListener('mouseup',   onUp)
      renderer.domElement.removeEventListener('click',     onClick)
      renderer.domElement.removeEventListener('wheel',     onWheel)
      renderer.domElement.removeEventListener('touchstart',onTStart)
      renderer.domElement.removeEventListener('touchmove', onTMove)
      renderer.domElement.removeEventListener('touchend',  onTEnd)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(raf)
      cloudGroupRef.current = null
      cloudTexRef.current   = null
      cityRef.current       = null
      renderer.dispose()
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <>
      <div ref={mountRef} style={{ position:'fixed', inset:0, zIndex:0 }} />
      <HUD />
      {selected && <Panel bld={selected} onClose={() => deselectRef.current?.()} />}
    </>
  )
}
