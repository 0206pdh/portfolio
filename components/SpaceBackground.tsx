'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function SpaceBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // ── Renderer ─────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x020810)
    mountRef.current.appendChild(renderer.domElement)

    // ── Scene & Camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x020810, 0.005)

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500)
    camera.position.set(0, 0, 5)

    // ── World group (rotates with mouse) ──────────────────────────────────────
    const world = new THREE.Group()
    scene.add(world)

    // ── Cloud texture factory ─────────────────────────────────────────────────
    function makeCloudTex(sharpness = 0.0): THREE.Texture {
      const s = 256
      const c = document.createElement('canvas')
      c.width = s; c.height = s
      const ctx = c.getContext('2d')!
      const g = ctx.createRadialGradient(s/2, s/2, s * sharpness, s/2, s/2, s * 0.5)
      g.addColorStop(0, 'rgba(255,255,255,1)')
      g.addColorStop(0.25, 'rgba(200,215,255,0.75)')
      g.addColorStop(0.6, 'rgba(140,165,255,0.2)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, s, s)
      return new THREE.CanvasTexture(c)
    }
    const cloudTex = makeCloudTex(0.0)

    // ── Stars ─────────────────────────────────────────────────────────────────
    const N = 6500
    const pos = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      const r = 90 + Math.random() * 180
      const th = Math.random() * Math.PI * 2
      const ph = Math.acos(2 * Math.random() - 1)
      pos[i*3]   = r * Math.sin(ph) * Math.cos(th)
      pos[i*3+1] = r * Math.sin(ph) * Math.sin(th)
      pos[i*3+2] = r * Math.cos(ph) - 55
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
      color: 0xd8e8ff, size: 0.18, sizeAttenuation: true, transparent: true, opacity: 0.9,
    }))
    world.add(stars)

    // ── Cloud layers ──────────────────────────────────────────────────────────
    const LAYERS = [
      { z:  3,   n: 24, cols: [0x3a5cc0, 0x5040b8], op: [0.11, 0.16], sx:70, sy:30, sz:14, sMin:14, sMax:38 },
      { z: -15,  n: 28, cols: [0x4856b8, 0x6030a0], op: [0.09, 0.13], sx:78, sy:32, sz:15, sMin:16, sMax:42 },
      { z: -33,  n: 24, cols: [0x3530a0, 0x502888], op: [0.07, 0.12], sx:72, sy:28, sz:13, sMin:15, sMax:40 },
      { z: -50,  n: 20, cols: [0x281e80, 0x402065], op: [0.06, 0.10], sx:65, sy:26, sz:12, sMin:14, sMax:37 },
      { z: -68,  n: 18, cols: [0x1e1560, 0x301550], op: [0.05, 0.09], sx:58, sy:23, sz:11, sMin:13, sMax:34 },
      { z: -86,  n: 16, cols: [0x150d45, 0x221040], op: [0.04, 0.08], sx:52, sy:20, sz:10, sMin:12, sMax:31 },
      { z: -104, n: 14, cols: [0x0d0830, 0x180b28], op: [0.03, 0.07], sx:46, sy:18, sz:9,  sMin:10, sMax:28 },
    ]

    const cloudGroups: THREE.Group[] = []
    LAYERS.forEach(({ z, n, cols, op, sx, sy, sz, sMin, sMax }) => {
      const g = new THREE.Group()
      g.position.z = z
      for (let i = 0; i < n; i++) {
        const col = cols[Math.floor(Math.random() * cols.length)]
        const mat = new THREE.SpriteMaterial({
          map: cloudTex, color: new THREE.Color(col),
          transparent: true, opacity: op[0] + Math.random() * (op[1] - op[0]),
          blending: THREE.AdditiveBlending, depthWrite: false,
        })
        const spr = new THREE.Sprite(mat)
        spr.position.set((Math.random()-.5)*sx, (Math.random()-.5)*sy, (Math.random()-.5)*sz)
        const s = sMin + Math.random() * (sMax - sMin)
        spr.scale.set(s, s * (.45 + Math.random() * .55), 1)
        g.add(spr)
      }
      cloudGroups.push(g)
      world.add(g)
    })

    // ── Wide nebula wisps ─────────────────────────────────────────────────────
    for (let i = 0; i < 55; i++) {
      const col = Math.random() > .5 ? 0x5020a8 : 0x2050b8
      const mat = new THREE.SpriteMaterial({
        map: cloudTex, color: new THREE.Color(col),
        transparent: true, opacity: .015 + Math.random() * .04,
        blending: THREE.AdditiveBlending, depthWrite: false,
      })
      const spr = new THREE.Sprite(mat)
      spr.position.set((Math.random()-.5)*110, (Math.random()-.5)*55, -Math.random()*108)
      const s = 35 + Math.random() * 65
      spr.scale.set(s, s*(.4+Math.random()*.6), 1)
      world.add(spr)
    }

    // ── Glinting bright stars ─────────────────────────────────────────────────
    const glintTex = makeCloudTex(0)
    for (let i = 0; i < 70; i++) {
      const mat = new THREE.SpriteMaterial({
        map: glintTex, color: new THREE.Color(0xffffff),
        transparent: true, opacity: .4 + Math.random() * .6,
        blending: THREE.AdditiveBlending, depthWrite: false,
      })
      const spr = new THREE.Sprite(mat)
      spr.position.set((Math.random()-.5)*130, (Math.random()-.5)*65, -Math.random()*108)
      const s = .3 + Math.random() * 1.4
      spr.scale.set(s, s, 1)
      world.add(spr)
    }

    // ── Mouse & scroll state ──────────────────────────────────────────────────
    let mx = 0, my = 0          // normalized -1..1
    let targetZ = 5, currentZ = 5
    let animT = 0

    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1
      my = -(e.clientY / window.innerHeight) * 2 + 1
    }
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const prog = total > 0 ? window.scrollY / total : 0
      targetZ = 5 - prog * 112
    }
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('mousemove', onMouse, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    // ── Render loop ───────────────────────────────────────────────────────────
    let rafId: number
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      animT += 0.001

      // Camera flies through on scroll
      currentZ += (targetZ - currentZ) * 0.045
      camera.position.z = currentZ

      // Mouse → world rotation (City3D style)
      world.rotation.y += (mx * 0.28 - world.rotation.y) * 0.028
      world.rotation.x += (my * 0.09 - world.rotation.x) * 0.025
      // Clamp vertical
      world.rotation.x = Math.max(-0.12, Math.min(0.18, world.rotation.x))

      // Slow star drift
      stars.rotation.y += 0.00007
      stars.rotation.x += 0.00002

      // Cloud layers gently drift
      cloudGroups.forEach((g, i) => {
        g.rotation.z += 0.00004 * (i % 2 === 0 ? 1 : -1)
        g.position.x = Math.sin(animT * 0.07 + i) * 0.5
      })

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafId)
      renderer.dispose()
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [])

  return (
    <div
      ref={mountRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
