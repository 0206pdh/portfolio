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
export const BUILDINGS: BldData[] = [
  {
    id: 'main', name: '@0206pdh', subtitle: 'GitHub Profile · 23 Public Repos',
    description: 'Cloud & Backend Engineer in training based in South Korea. Studying AWS infrastructure, DevOps pipelines, and systems design. 23 public repos spanning fintech AI pipelines, browser extensions, crypto bots, and competitive programming.',
    link: 'https://github.com/0206pdh',
    tags: ['AWS', 'Python', 'FastAPI', 'Docker', 'Node.js', 'Java', 'TypeScript'],
    stats: [{ label: 'Public Repos', value: '23' }, { label: 'Languages', value: '5+' }, { label: 'Domain', value: 'Cloud / Backend' }],
    x: 0, z: 0, w: 2.8, d: 2.8, h: 14, type: 'main', base: 0x060e28, accent: 0x1844dd, wire: 0x4488ff,
  },
  {
    id: 'fin_spring', name: 'fin_spring', subtitle: 'Financial Event-Driven Market Impact System',
    description: 'Real-time financial news → FX directional bias + sector market pressure classification. LangGraph 3-step chain handles event classification, FX channel identification, and keyword generation. Rule-based scoring engine — explainable, not speculative.',
    link: 'https://github.com/0206pdh/fin_spring',
    tags: ['Python', 'FastAPI', 'TimescaleDB', 'pgvector', 'Redis', 'LangGraph', 'GPT-4o-mini', 'Docker'],
    stats: [{ label: 'Query Speed', value: '−99.7%' }, { label: 'Time-series', value: '−93%' }, { label: 'Parse Errors', value: '0%' }],
    x: 5, z: 0, w: 1.9, d: 1.9, h: 9, type: 'pinned', base: 0x080c22, accent: 0x2840d0, wire: 0x5060ff,
  },
  {
    id: 'yt_filter', name: 'YT Comment Filter', subtitle: 'YouTube Live Toxic Comment Filter',
    description: 'Chrome extension + FastAPI backend detecting toxic YouTube live comments using a local ML model. Privacy-first — no external API calls. Containerized with Docker. AWS ECS Fargate + ECR + CloudWatch migration planned.',
    link: 'https://github.com/0206pdh/youtube_live_comment_filter',
    tags: ['Python', 'FastAPI', 'JavaScript', 'Chrome Extension', 'Docker', 'ML', 'AWS ECS'],
    stats: [{ label: 'Inference', value: 'Local ML' }, { label: 'Deploy', value: 'Docker' }, { label: 'Roadmap', value: 'AWS ECS' }],
    x: -5, z: 0, w: 1.7, d: 1.7, h: 7, type: 'pinned', base: 0x0e0820, accent: 0x7020c0, wire: 0xa040e0,
  },
  {
    id: 'algonotion', name: 'AlgoNotion', subtitle: 'Baekjoon → Notion Chrome Extension',
    description: 'Chrome extension (Manifest V3) that auto-captures accepted Baekjoon OJ solutions and syncs them into a Notion database. Enriches entries via solved.ac API (title + difficulty). Manual upload button injected on the Baekjoon status page.',
    link: 'https://github.com/0206pdh/AlgoNotion_Extention',
    tags: ['JavaScript', 'Chrome Extension', 'Notion API', 'solved.ac API', 'Manifest V3'],
    stats: [{ label: 'Platform', value: 'Chrome MV3' }, { label: 'Sync', value: 'Auto' }, { label: 'APIs', value: 'Notion + solved.ac' }],
    x: 0.5, z: 5, w: 1.5, d: 1.5, h: 5, type: 'pinned', base: 0x061618, accent: 0x008898, wire: 0x20c8e0,
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
    x: -7, z: -2, w: 2.2, d: 2.2, h: 11, type: 'skills', base: 0x060e18, accent: 0x1830a0, wire: 0x3060c0,
  },
  { id: 'financial_ts', name: 'Market Impact TS', subtitle: 'Financial Event System v1 (TypeScript)',
    description: 'Earlier TypeScript-heavy version of the financial market impact system. Same FX/sector analysis concept with a full-stack architecture and OpenAI integration.',
    link: 'https://github.com/0206pdh/Financial-Event-Driven-Market-Impact-System',
    tags: ['TypeScript', 'FastAPI', 'PostgreSQL', 'OpenAI'],
    x: 8.5, z: -3.5, w: 1.4, d: 1.4, h: 7.5, type: 'other', base: 0x080c20, accent: 0x18289a, wire: 0x283888 },
  { id: 'algobot', name: 'AlgoBot', subtitle: 'Crypto Trading Bot with GUI',
    description: 'Python crypto trading bot supporting live trading, backtesting, simulations, and strategy optimization. GUI + multi-exchange support.',
    link: 'https://github.com/0206pdh/algobot',
    tags: ['Python', 'GUI', 'Crypto', 'Backtesting'],
    x: -8.5, z: -3.5, w: 1.4, d: 1.4, h: 6, type: 'other', base: 0x080c20, accent: 0x18289a, wire: 0x283888 },
  { id: 'road_construct', name: 'Road Construct', subtitle: 'Road Construction Alert System',
    description: 'Node.js + MongoDB backend marking road construction info on a map and alerting nearby users in real-time.',
    link: 'https://github.com/0206pdh/Road_Construct', tags: ['Node.js', 'MongoDB', 'JavaScript'],
    x: 6.5, z: -7, w: 1.2, d: 1.2, h: 4.5, type: 'other', base: 0x080c20, accent: 0x18289a, wire: 0x283888 },
  { id: 'coding_hub', name: 'Coding Test Hub', subtitle: 'Baekjoon Auto-Push Repository',
    description: 'Automated Baekjoon OJ solution archive powered by BaekjoonHub. Java-based competitive programming history.',
    link: 'https://github.com/0206pdh/coding-test-hub', tags: ['Java', 'BaekjoonHub', 'Algorithms'],
    x: -6.5, z: -7, w: 1.2, d: 1.2, h: 5, type: 'other', base: 0x080c20, accent: 0x18289a, wire: 0x283888 },
  { id: 'toxicfree', name: 'ToxicFree', subtitle: 'Toxic Comment Filter Extension (v1)',
    description: 'Early Chrome extension for filtering toxic YouTube comments. Predecessor to the YouTube Live Comment Filter project.',
    link: 'https://github.com/0206pdh/ToxicFree_Extension', tags: ['Chrome Extension', 'AI', 'JavaScript'],
    x: 3.5, z: -8.5, w: 1.1, d: 1.1, h: 4, type: 'other', base: 0x080c20, accent: 0x18289a, wire: 0x283888 },
  { id: 'serverless', name: 'Serverless Tax', subtitle: 'Serverless Tax Calculator',
    description: 'JavaScript-based serverless tax calculation service.',
    link: 'https://github.com/0206pdh/serverless-tax-calculate', tags: ['JavaScript', 'Serverless'],
    x: -3.5, z: -8.5, w: 1.0, d: 1.0, h: 3, type: 'other', base: 0x080c20, accent: 0x18289a, wire: 0x283888 },
  { id: 'safe_way', name: 'SafeWay', subtitle: 'Safe Route Navigation App',
    description: 'JavaScript-based application for finding safe routes.',
    link: 'https://github.com/0206pdh/safe_way', tags: ['JavaScript', 'Maps'],
    x: 9.5, z: 2.5, w: 1.0, d: 1.0, h: 3, type: 'other', base: 0x080c20, accent: 0x18289a, wire: 0x283888 },
  { id: 'db_project', name: 'DB Project', subtitle: 'Database Course Project',
    description: 'Java-based database management system developed as a course assignment.',
    link: 'https://github.com/0206pdh/DataBase_project', tags: ['Java', 'Database', 'SQL'],
    x: -9.5, z: 2.5, w: 1.0, d: 1.0, h: 2.5, type: 'other', base: 0x080c20, accent: 0x18289a, wire: 0x283888 },
  { id: 'aws_library', name: 'AWS Library', subtitle: 'Cloud Library Management CLI',
    description: 'Python CLI-based library system with CSV data loading, book/member management, and checkout tracking.',
    link: 'https://github.com/0206pdh/aws13th-library-system', tags: ['Python', 'AWS', 'CLI'],
    x: 7, z: 6, w: 1.0, d: 1.0, h: 2, type: 'other', base: 0x080c20, accent: 0x18289a, wire: 0x283888 },
]

const SKILL_FLOORS = [
  { color: 0x4080ff, h: 2.2 }, { color: 0x9040e0, h: 2.0 },
  { color: 0x20c8d8, h: 2.2 }, { color: 0xd040b0, h: 2.0 }, { color: 0x40d870, h: 2.0 },
]

const STREAM_PAIRS = [
  ['main', 'fin_spring'], ['main', 'yt_filter'], ['main', 'algonotion'],
  ['main', 'skills'], ['fin_spring', 'financial_ts'], ['yt_filter', 'toxicfree'],
]

// ─── Panel ────────────────────────────────────────────────────────────────────
function Panel({ bld, onClose }: { bld: BldData; onClose: () => void }) {
  const hex = '#' + bld.accent.toString(16).padStart(6, '0')
  return (
    <div style={{ position:'fixed', top:0, right:0, height:'100%', width:400, background:'rgba(5,12,30,0.93)',
      backdropFilter:'blur(20px)', borderLeft:`1px solid ${hex}28`, zIndex:200, overflowY:'auto',
      animation:'slideIn 0.3s cubic-bezier(0.25,0.46,0.45,0.94)' }}>
      <style>{`@keyframes slideIn{from{transform:translateX(30px);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>
      <div style={{ padding:'30px 28px 20px', borderBottom:`1px solid ${hex}18` }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
          <div>
            <div style={{ fontSize:'0.58rem', letterSpacing:'0.2em', textTransform:'uppercase', color:hex, opacity:.65, marginBottom:7 }}>
              {bld.type==='main'?'GitHub Profile':bld.type==='skills'?'Skills Tower':bld.type==='pinned'?'Pinned Repo':'Repository'}
            </div>
            <h2 style={{ fontSize:'1.2rem', fontWeight:700, color:'#d8e8ff', lineHeight:1.2, marginBottom:5 }}>{bld.name}</h2>
            <p style={{ fontSize:'0.72rem', color:'rgba(130,170,240,0.5)', lineHeight:1.4 }}>{bld.subtitle}</p>
          </div>
          <button onClick={onClose} style={{ background:'none', border:`1px solid rgba(80,120,200,0.22)`, borderRadius:6,
            color:'rgba(130,170,240,0.45)', cursor:'pointer', padding:'5px 10px', fontSize:'0.72rem', flexShrink:0,
            marginLeft:10, transition:'all 0.2s' }}
            onMouseEnter={e=>{e.currentTarget.style.borderColor=hex;e.currentTarget.style.color='#fff'}}
            onMouseLeave={e=>{e.currentTarget.style.borderColor='rgba(80,120,200,0.22)';e.currentTarget.style.color='rgba(130,170,240,0.45)'}}>
            ESC
          </button>
        </div>
      </div>
      <div style={{ padding:'22px 28px' }}>
        {bld.stats && (
          <div style={{ display:'flex', gap:10, marginBottom:20 }}>
            {bld.stats.map(s => (
              <div key={s.label} style={{ flex:1, background:`${hex}10`, border:`1px solid ${hex}22`, borderRadius:7, padding:'11px 12px' }}>
                <div style={{ fontSize:'0.95rem', fontWeight:700, color:hex, marginBottom:2 }}>{s.value}</div>
                <div style={{ fontSize:'0.62rem', color:'rgba(110,150,210,0.45)', letterSpacing:'0.05em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}
        <p style={{ fontSize:'0.85rem', color:'rgba(155,190,255,0.6)', lineHeight:1.75, marginBottom:22 }}>{bld.description}</p>
        {bld.skills && (
          <div style={{ marginBottom:22 }}>
            <p style={{ fontSize:'0.58rem', letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(90,130,200,0.4)', marginBottom:12 }}>Floors (bottom → top)</p>
            <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
              {bld.skills.map(f => (
                <div key={f.floor} style={{ background:`${f.color}0e`, border:`1px solid ${f.color}22`, borderRadius:7, padding:'10px 14px' }}>
                  <div style={{ fontSize:'0.75rem', fontWeight:600, color:f.color, marginBottom:5 }}>{f.floor}</div>
                  <div style={{ display:'flex', flexWrap:'wrap', gap:4 }}>
                    {f.items.map(it => <span key={it} style={{ fontSize:'0.65rem', padding:'2px 7px', borderRadius:10, background:`${f.color}15`, color:`${f.color}bb` }}>{it}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div style={{ marginBottom:24 }}>
          <p style={{ fontSize:'0.58rem', letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(90,130,200,0.4)', marginBottom:9 }}>Tech Stack</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:5 }}>
            {bld.tags.map(t => <span key={t} style={{ fontSize:'0.7rem', padding:'3px 10px', borderRadius:20, background:`${hex}14`, border:`1px solid ${hex}28`, color:`${hex}bb`, fontWeight:500 }}>{t}</span>)}
          </div>
        </div>
        <a href={bld.link} target="_blank" rel="noopener noreferrer"
          style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:7, padding:'12px', borderRadius:8,
            textDecoration:'none', fontWeight:600, fontSize:'0.82rem', letterSpacing:'0.04em', transition:'all 0.25s',
            background:`${hex}18`, border:`1px solid ${hex}35`, color:hex }}
          onMouseEnter={e=>{e.currentTarget.style.background=`${hex}28`;e.currentTarget.style.boxShadow=`0 0 18px ${hex}28`}}
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
      <div style={{ position:'fixed', bottom:32, left:40, zIndex:100, pointerEvents:'none' }}>
        <p style={{ fontSize:'0.58rem', letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(100,150,220,0.45)', marginBottom:5 }}>Cloud & Backend Engineer</p>
        <h1 style={{ fontSize:'1.5rem', fontWeight:800, letterSpacing:'-0.02em', background:'linear-gradient(120deg,#c0d4ff,#7aabff)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text', margin:0 }}>Dohyun Park</h1>
        <p style={{ fontSize:'0.68rem', color:'rgba(110,150,220,0.35)', marginTop:3, fontFamily:'monospace' }}>박도현 · @0206pdh</p>
      </div>
      <div style={{ position:'fixed', top:28, right:40, zIndex:100, textAlign:'right', pointerEvents:'none' }}>
        <p style={{ fontSize:'0.6rem', letterSpacing:'0.12em', color:'rgba(100,150,210,0.38)', lineHeight:2 }}>
          Drag to rotate · Scroll to zoom · Click a building
        </p>
      </div>
      <div style={{ position:'fixed', bottom:32, right:40, zIndex:100, textAlign:'right', pointerEvents:'none' }}>
        {[{ c:'#4488ff', l:'GitHub Profile' },{ c:'#5060ff', l:'Pinned Repos' },{ c:'#3060c0', l:'Skills Tower' },{ c:'#283888', l:'All Repos' },{ c:'#a8d0ff', l:'Contribution Clouds' }].map(i=>(
          <div key={i.l} style={{ display:'flex', alignItems:'center', justifyContent:'flex-end', gap:7, marginBottom:4 }}>
            <span style={{ fontSize:'0.6rem', color:'rgba(110,150,210,0.35)', letterSpacing:'0.05em' }}>{i.l}</span>
            <div style={{ width:7, height:7, borderRadius:1, background:i.c, opacity:0.65 }}/>
          </div>
        ))}
      </div>
    </>
  )
}

// ─── Cloud texture factory ────────────────────────────────────────────────────
function makeCloudTex(): THREE.CanvasTexture {
  const s = 256
  const c = document.createElement('canvas')
  c.width = s; c.height = s
  const ctx = c.getContext('2d')!
  const g = ctx.createRadialGradient(s/2,s/2,0, s/2,s/2,s/2)
  g.addColorStop(0,   'rgba(210,228,255,1)')
  g.addColorStop(0.3, 'rgba(185,210,255,0.75)')
  g.addColorStop(0.65,'rgba(160,195,255,0.3)')
  g.addColorStop(1,   'rgba(0,0,0,0)')
  ctx.fillStyle = g
  ctx.fillRect(0,0,s,s)
  return new THREE.CanvasTexture(c)
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function CityScene() {
  const mountRef   = useRef<HTMLDivElement>(null)
  const deselectRef = useRef<(() => void) | null>(null)
  const [selected, setSelected] = useState<BldData | null>(null)

  useEffect(() => {
    if (!mountRef.current) return
    let alive = true
    let cleanupFn: (() => void) | null = null

    async function init() {
      // ── Fetch GitHub contributions ──────────────────────────────────────────
      let contribs: ContribDay[] = []
      try {
        const res = await fetch('https://github-contributions-api.jogruber.de/v4/0206pdh?y=last')
        const data = await res.json()
        contribs = (data.contributions as ContribDay[]).filter(c => c.level > 0)
      } catch { /* no clouds fallback */ }

      if (!alive || !mountRef.current) return

      const W = window.innerWidth, H = window.innerHeight

      // ── Renderer ─────────────────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({ antialias: true })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      renderer.setSize(W, H)
      renderer.shadowMap.enabled = W > 800
      renderer.shadowMap.type = THREE.PCFSoftShadowMap
      mountRef.current.appendChild(renderer.domElement)

      // ── Scene ─────────────────────────────────────────────────────────────────
      const scene = new THREE.Scene()
      const BG = 0x0d1f3c        // ← brighter navy
      scene.background = new THREE.Color(BG)
      scene.fog = new THREE.Fog(BG, 22, 42)

      // ── Camera ────────────────────────────────────────────────────────────────
      const camera = new THREE.PerspectiveCamera(22, W / H, 0.1, 200)
      camera.position.set(0, 8, 22)
      const lookAtCur = new THREE.Vector3(0, 2, 0)
      const CAM_BASE  = new THREE.Vector3(0, 8, 22)

      // ── Lights ────────────────────────────────────────────────────────────────
      scene.add(new THREE.AmbientLight(0xffffff, 4.5))
      const spot = new THREE.SpotLight(0xffffff, 16, 0, undefined, 0.12)
      spot.position.set(8, 14, 10)
      spot.castShadow = true
      spot.shadow.mapSize.set(4096, 4096)
      scene.add(spot)
      scene.add(new THREE.DirectionalLight(0x8090ff, 1.2))   // soft blue fill

      // ── City group ────────────────────────────────────────────────────────────
      const city = new THREE.Group()
      scene.add(city)

      // Ground
      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(80, 80),
        new THREE.MeshStandardMaterial({ color: 0x0a1630, roughness: 1 })
      )
      ground.rotation.x = -Math.PI / 2
      ground.receiveShadow = true
      city.add(ground)

      // Grid
      city.add(new THREE.GridHelper(80, 160, 0x1e3878, 0x0c1830))

      // Stars (scene-level, don't rotate with city)
      const sp = new Float32Array(5000 * 3)
      for (let i = 0; i < 5000; i++) {
        const r = 70 + Math.random() * 90
        const th = Math.random() * Math.PI * 2, ph = Math.acos(2*Math.random()-1)
        sp[i*3]=r*Math.sin(ph)*Math.cos(th); sp[i*3+1]=r*Math.sin(ph)*Math.sin(th); sp[i*3+2]=r*Math.cos(ph)
      }
      const sg = new THREE.BufferGeometry()
      sg.setAttribute('position', new THREE.BufferAttribute(sp, 3))
      scene.add(new THREE.Points(sg, new THREE.PointsMaterial({ color: 0xaabbee, size: 0.18, sizeAttenuation: true, transparent: true, opacity: 0.7 })))

      // ── Building helpers ──────────────────────────────────────────────────────
      const clickables: THREE.Mesh[] = []

      function addBuilding(b: BldData) {
        if (b.type === 'skills') { addSkillsTower(b); return }
        const geo = new THREE.BoxGeometry(b.w, b.h, b.d)
        const mat = new THREE.MeshStandardMaterial({ color: b.base, roughness: 0.2, metalness: 0.88,
          emissive: new THREE.Color(b.accent), emissiveIntensity: b.type === 'main' ? 0.22 : 0.18 })
        const mesh = new THREE.Mesh(geo, mat)
        mesh.position.set(b.x, b.h/2, b.z)
        mesh.castShadow = true
        mesh.userData = { bldData: b, mat, baseI: mat.emissiveIntensity }
        clickables.push(mesh)
        city.add(mesh)
        // Wireframe overlay
        const wm = new THREE.Mesh(geo.clone(), new THREE.MeshBasicMaterial({ color: b.wire, wireframe: true, transparent: true, opacity: b.type==='main'?0.1:0.07 }))
        wm.position.copy(mesh.position); city.add(wm)
        // Glow slab
        const sl = new THREE.Mesh(new THREE.BoxGeometry(b.w+0.14, 0.06, b.d+0.14),
          new THREE.MeshBasicMaterial({ color: b.accent, transparent: true, opacity: 0.55 }))
        sl.position.set(b.x, 0.03, b.z); city.add(sl)
        // Roof accent (non-other)
        if (b.type !== 'other') {
          const rf = new THREE.Mesh(new THREE.BoxGeometry(b.w*0.55, 0.07, b.d*0.55),
            new THREE.MeshBasicMaterial({ color: b.wire, transparent: true, opacity: 0.75 }))
          rf.position.set(b.x, b.h+0.035, b.z); city.add(rf)
        }
      }

      function addSkillsTower(b: BldData) {
        let yOff = 0
        SKILL_FLOORS.forEach(fl => {
          const geo = new THREE.BoxGeometry(b.w, fl.h - 0.1, b.d)
          const mat = new THREE.MeshStandardMaterial({ color: 0x060e18, roughness: 0.2, metalness: 0.9,
            emissive: new THREE.Color(fl.color), emissiveIntensity: 0.24 })
          const mesh = new THREE.Mesh(geo, mat)
          mesh.position.set(b.x, yOff + fl.h/2, b.z)
          mesh.castShadow = true
          mesh.userData = { bldData: b, mat, baseI: 0.24 }
          clickables.push(mesh)
          city.add(mesh)
          const wm = new THREE.Mesh(geo.clone(), new THREE.MeshBasicMaterial({ color: fl.color, wireframe: true, transparent: true, opacity: 0.1 }))
          wm.position.copy(mesh.position); city.add(wm)
          const sep = new THREE.Mesh(new THREE.BoxGeometry(b.w+0.1, 0.07, b.d+0.1),
            new THREE.MeshBasicMaterial({ color: fl.color, transparent: true, opacity: 0.8 }))
          sep.position.set(b.x, yOff+0.035, b.z); city.add(sep)
          yOff += fl.h
        })
        // Spire
        const sp = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.065, 2, 8),
          new THREE.MeshBasicMaterial({ color: 0x60a8ff }))
        sp.position.set(b.x, yOff+1, b.z); city.add(sp)
        // Slab
        city.add(Object.assign(new THREE.Mesh(new THREE.BoxGeometry(b.w+0.14, 0.06, b.d+0.14),
          new THREE.MeshBasicMaterial({ color: 0x3060c0, transparent: true, opacity: 0.55 })),
          { position: new THREE.Vector3(b.x, 0.03, b.z) }))
      }

      BUILDINGS.forEach(addBuilding)

      // ── Data streams ──────────────────────────────────────────────────────────
      const bldMap = Object.fromEntries(BUILDINGS.map(b => [b.id, b]))
      interface Stream { mesh: THREE.Mesh; s: THREE.Vector3; e: THREE.Vector3; t: number; spd: number; dir: 1|-1 }
      const streams: Stream[] = []
      const sMat = new THREE.MeshBasicMaterial({ color: 0x30e8ff, transparent: true, opacity: 0.7 })
      const sGeo = new THREE.BoxGeometry(0.55, 0.04, 0.09)
      STREAM_PAIRS.forEach(([aid, bid]) => {
        const a = bldMap[aid], b = bldMap[bid]
        if (!a || !b) return
        for (let i = 0; i < 2; i++) {
          const mesh = new THREE.Mesh(sGeo, sMat)
          streams.push({ mesh, s: new THREE.Vector3(a.x, 0.08+i*0.12, a.z), e: new THREE.Vector3(b.x, 0.08+i*0.12, b.z), t: Math.random(), spd: 0.004+Math.random()*0.004, dir: 1 })
          city.add(mesh)
        }
      })

      // ── GitHub contribution clouds ─────────────────────────────────────────────
      const cloudTex = makeCloudTex()
      interface CloudSprite { spr: THREE.Sprite; dx: number; dz: number; floatOff: number; floatSpd: number }
      const cloudSprites: CloudSprite[] = []

      if (contribs.length > 0) {
        contribs.forEach(day => {
          const lvl = day.level  // 1-4
          const clusterCount = lvl === 1 ? 2 : lvl === 2 ? 3 : lvl === 3 ? 4 : 5

          // Base position for this day's cloud cluster
          const bx = (Math.random() - 0.5) * 22
          const bz = (Math.random() - 0.5) * 22
          const by = 7 + lvl * 1.8 + Math.random() * 3   // higher = more active day

          for (let k = 0; k < clusterCount; k++) {
            const baseScale = 1.8 + lvl * 1.2
            const sprScale  = baseScale * (0.65 + Math.random() * 0.7)

            const mat = new THREE.SpriteMaterial({
              map: cloudTex,
              color: new THREE.Color(0xc8dcff),
              transparent: true,
              opacity: 0.06 + lvl * 0.045 + Math.random() * 0.03,
              depthWrite: false,
            })
            const spr = new THREE.Sprite(mat)
            spr.position.set(
              bx + (Math.random() - 0.5) * baseScale * 0.8,
              by + (Math.random() - 0.5) * 0.8,
              bz + (Math.random() - 0.5) * baseScale * 0.8,
            )
            spr.scale.set(sprScale, sprScale * 0.45, 1)
            city.add(spr)
            cloudSprites.push({
              spr,
              dx: (Math.random() - 0.5) * 0.0028,
              dz: (Math.random() - 0.5) * 0.0028,
              floatOff: Math.random() * Math.PI * 2,
              floatSpd: 0.0004 + Math.random() * 0.0006,
            })
          }
        })
      }

      // ── Camera / rotation state ────────────────────────────────────────────────
      let selBld: BldData | null = null
      let cameraZoom = 1.0
      const camPosTarget = CAM_BASE.clone()
      const lookTarget   = new THREE.Vector3(0, 2, 0)

      // 360° drag rotation
      let isDragging = false
      let prevMX = 0, prevMY = 0
      let velY = 0, velX = 0
      let tgtRotY = 0, tgtRotX = 0

      // Hover
      let hovMesh: THREE.Mesh | null = null
      const hovRay   = new THREE.Raycaster()
      const clickRay = new THREE.Raycaster()

      function doSelect(bld: BldData) {
        selBld = bld
        setSelected(bld)
        camPosTarget.set(bld.x * 0.55, bld.h * 0.42 + 1.5, bld.z + 13)
        lookTarget.set(bld.x, bld.h * 0.42, bld.z)
        renderer.domElement.style.cursor = 'default'
      }
      function doDeselect() {
        if (hovMesh) { const m = hovMesh.userData.mat as THREE.MeshStandardMaterial; if (m) m.emissiveIntensity = hovMesh.userData.baseI; hovMesh = null }
        selBld = null
        setSelected(null)
        camPosTarget.copy(CAM_BASE).multiplyScalar(cameraZoom)
        lookTarget.set(0, 2, 0)
        renderer.domElement.style.cursor = 'crosshair'
      }
      deselectRef.current = doDeselect

      // ── Events ─────────────────────────────────────────────────────────────────
      function updateHover(cx: number, cy: number) {
        if (selBld) return
        const r = renderer.domElement.getBoundingClientRect()
        const mx = ((cx-r.left)/r.width)*2-1, my = -((cy-r.top)/r.height)*2+1
        hovRay.setFromCamera(new THREE.Vector2(mx, my), camera)
        const hits = hovRay.intersectObjects(clickables, false)
        if (hovMesh) { const m = hovMesh.userData.mat as THREE.MeshStandardMaterial; if (m) m.emissiveIntensity = hovMesh.userData.baseI; hovMesh = null }
        if (hits.length) {
          hovMesh = hits[0].object as THREE.Mesh
          const m = hovMesh.userData.mat as THREE.MeshStandardMaterial
          if (m) m.emissiveIntensity = 0.6
          renderer.domElement.style.cursor = 'pointer'
        } else {
          renderer.domElement.style.cursor = isDragging ? 'grabbing' : 'grab'
        }
      }

      const onMouseDown = (e: MouseEvent) => {
        if (selBld) return
        isDragging = true; velY = 0; velX = 0
        prevMX = e.clientX; prevMY = e.clientY
        renderer.domElement.style.cursor = 'grabbing'
      }
      const onMouseMove = (e: MouseEvent) => {
        updateHover(e.clientX, e.clientY)
        if (!isDragging || selBld) return
        const dx = (e.clientX - prevMX) * 0.009
        const dy = (e.clientY - prevMY) * 0.009
        velY = dx; velX = dy
        tgtRotY += dx; tgtRotX += dy
        prevMX = e.clientX; prevMY = e.clientY
      }
      const onMouseUp = () => { isDragging = false; renderer.domElement.style.cursor = 'grab' }
      const onClick = (e: MouseEvent) => {
        if (selBld || Math.abs(velY) > 0.01 || Math.abs(velX) > 0.01) return
        const r = renderer.domElement.getBoundingClientRect()
        clickRay.setFromCamera(new THREE.Vector2(((e.clientX-r.left)/r.width)*2-1, -((e.clientY-r.top)/r.height)*2+1), camera)
        const hits = clickRay.intersectObjects(clickables, false)
        if (hits.length) { const bld = hits[0].object.userData.bldData as BldData; if (bld) doSelect(bld) }
      }
      const onWheel = (e: WheelEvent) => {
        e.preventDefault()
        cameraZoom *= e.deltaY > 0 ? 1.12 : 0.9
        cameraZoom = Math.max(0.22, Math.min(4.0, cameraZoom))
        if (!selBld) camPosTarget.copy(CAM_BASE).multiplyScalar(cameraZoom)
      }
      const onResize = () => { camera.aspect = window.innerWidth/window.innerHeight; camera.updateProjectionMatrix(); renderer.setSize(window.innerWidth, window.innerHeight) }

      renderer.domElement.style.cursor = 'grab'
      renderer.domElement.addEventListener('mousedown', onMouseDown)
      renderer.domElement.addEventListener('mousemove', onMouseMove)
      renderer.domElement.addEventListener('mouseup',   onMouseUp)
      renderer.domElement.addEventListener('click',     onClick)
      renderer.domElement.addEventListener('wheel',     onWheel, { passive: false })
      window.addEventListener('resize', onResize)

      // ── Touch ──────────────────────────────────────────────────────────────────
      let lastPinch = 0
      const onTouchStart = (e: TouchEvent) => {
        if (e.touches.length === 1) { isDragging = true; velY=0; velX=0; prevMX=e.touches[0].clientX; prevMY=e.touches[0].clientY }
        if (e.touches.length === 2) lastPinch = Math.hypot(e.touches[0].clientX-e.touches[1].clientX, e.touches[0].clientY-e.touches[1].clientY)
      }
      const onTouchMove = (e: TouchEvent) => {
        e.preventDefault()
        if (e.touches.length === 1 && isDragging) {
          const dx=(e.touches[0].clientX-prevMX)*0.009, dy=(e.touches[0].clientY-prevMY)*0.009
          velY=dx; velX=dy; tgtRotY+=dx; tgtRotX+=dy
          prevMX=e.touches[0].clientX; prevMY=e.touches[0].clientY
        }
        if (e.touches.length === 2) {
          const d = Math.hypot(e.touches[0].clientX-e.touches[1].clientX, e.touches[0].clientY-e.touches[1].clientY)
          if (lastPinch > 0) { cameraZoom *= lastPinch/d; cameraZoom=Math.max(0.22,Math.min(4,cameraZoom)); if (!selBld) camPosTarget.copy(CAM_BASE).multiplyScalar(cameraZoom) }
          lastPinch = d
        }
      }
      const onTouchEnd = () => { isDragging = false; lastPinch = 0 }
      renderer.domElement.addEventListener('touchstart', onTouchStart, { passive: false })
      renderer.domElement.addEventListener('touchmove',  onTouchMove,  { passive: false })
      renderer.domElement.addEventListener('touchend',   onTouchEnd)

      // ── Animation loop ─────────────────────────────────────────────────────────
      let raf: number, t = 0

      const animate = () => {
        raf = requestAnimationFrame(animate)
        t += 0.001

        // City rotation
        if (selBld) {
          city.rotation.y *= 0.9
          city.rotation.x *= 0.9
        } else {
          if (!isDragging) { velY *= 0.94; velX *= 0.94; tgtRotY += velY; tgtRotX += velX }
          city.rotation.y += (tgtRotY - city.rotation.y) * 0.1
          city.rotation.x += (tgtRotX - city.rotation.x) * 0.1
          // No clamping — full 360° freedom
        }

        // Camera
        camera.position.lerp(camPosTarget, 0.055)
        lookAtCur.lerp(lookTarget, 0.055)
        camera.lookAt(lookAtCur)

        // Contribution clouds drift
        cloudSprites.forEach(cs => {
          cs.spr.position.x += cs.dx
          cs.spr.position.z += cs.dz
          cs.spr.position.y += Math.sin(t * 600 * cs.floatSpd + cs.floatOff) * 0.00035
          // Wrap within city bounds
          if (cs.spr.position.x >  13) cs.spr.position.x = -13
          if (cs.spr.position.x < -13) cs.spr.position.x =  13
          if (cs.spr.position.z >  13) cs.spr.position.z = -13
          if (cs.spr.position.z < -13) cs.spr.position.z =  13
        })

        // Data streams
        streams.forEach(s => {
          s.t += s.spd * s.dir
          if (s.t >= 1) { s.t = 1; s.dir = -1 }
          if (s.t <= 0) { s.t = 0; s.dir =  1 }
          s.mesh.position.lerpVectors(s.s, s.e, s.t)
          const dir = s.e.clone().sub(s.s)
          s.mesh.rotation.y = Math.atan2(dir.x, dir.z)
        })

        renderer.render(scene, camera)
      }
      animate()

      cleanupFn = () => {
        renderer.domElement.removeEventListener('mousedown', onMouseDown)
        renderer.domElement.removeEventListener('mousemove', onMouseMove)
        renderer.domElement.removeEventListener('mouseup',   onMouseUp)
        renderer.domElement.removeEventListener('click',     onClick)
        renderer.domElement.removeEventListener('wheel',     onWheel)
        renderer.domElement.removeEventListener('touchstart',onTouchStart)
        renderer.domElement.removeEventListener('touchmove', onTouchMove)
        renderer.domElement.removeEventListener('touchend',  onTouchEnd)
        window.removeEventListener('resize', onResize)
        cancelAnimationFrame(raf)
        renderer.dispose()
        if (mountRef.current?.contains(renderer.domElement)) mountRef.current.removeChild(renderer.domElement)
      }
    }

    init()
    return () => { alive = false; cleanupFn?.() }
  }, [])

  return (
    <>
      <div ref={mountRef} style={{ position:'fixed', inset:0, zIndex:0 }} />
      <HUD />
      {selected && <Panel bld={selected} onClose={() => deselectRef.current?.()} />}
    </>
  )
}
