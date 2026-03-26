'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function SpaceBackground() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // ── Renderer ──────────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0x020810)
    mountRef.current.appendChild(renderer.domElement)

    // ── Scene & Camera ────────────────────────────────────────────────────────
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x020810, 0.006)

    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 500)
    camera.position.set(0, 0, 5)

    // ── Cloud sprite texture ──────────────────────────────────────────────────
    function makeCloudTex(innerR: number, outerR: number): THREE.Texture {
      const size = 256
      const c = document.createElement('canvas')
      c.width = size
      c.height = size
      const ctx = c.getContext('2d')!
      const g = ctx.createRadialGradient(size / 2, size / 2, size * innerR, size / 2, size / 2, size * outerR)
      g.addColorStop(0, 'rgba(255,255,255,1)')
      g.addColorStop(0.3, 'rgba(200,215,255,0.7)')
      g.addColorStop(0.65, 'rgba(150,170,255,0.25)')
      g.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = g
      ctx.fillRect(0, 0, size, size)
      return new THREE.CanvasTexture(c)
    }

    const cloudTex = makeCloudTex(0.0, 0.5)
    const wispTex = makeCloudTex(0.05, 0.5)

    // ── Stars ─────────────────────────────────────────────────────────────────
    const starCount = 6000
    const starPos = new Float32Array(starCount * 3)
    const starSizes = new Float32Array(starCount)
    for (let i = 0; i < starCount; i++) {
      const r = 80 + Math.random() * 160
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      starPos[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta)
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      starPos[i * 3 + 2] = r * Math.cos(phi) - 50
      starSizes[i] = 0.05 + Math.random() * 0.25
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    starGeo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1))
    const starMat = new THREE.PointsMaterial({
      color: 0xd0e0ff,
      size: 0.18,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.85,
    })
    const stars = new THREE.Points(starGeo, starMat)
    scene.add(stars)

    // ── Cloud layers ──────────────────────────────────────────────────────────
    const LAYERS = [
      { z: 3,    count: 22, colors: [0x3a5cc0, 0x4a4aaa], opacity: [0.10, 0.14], sx: 65, sy: 28, sz: 12, sMin: 14, sMax: 35 },
      { z: -15,  count: 26, colors: [0x4050b8, 0x5538a0], opacity: [0.08, 0.12], sx: 72, sy: 30, sz: 14, sMin: 16, sMax: 40 },
      { z: -32,  count: 24, colors: [0x3530a0, 0x502888], opacity: [0.07, 0.11], sx: 68, sy: 26, sz: 13, sMin: 15, sMax: 38 },
      { z: -50,  count: 20, colors: [0x281e80, 0x402065], opacity: [0.06, 0.10], sx: 62, sy: 24, sz: 12, sMin: 14, sMax: 36 },
      { z: -68,  count: 18, colors: [0x1e1560, 0x301550], opacity: [0.05, 0.09], sx: 55, sy: 22, sz: 11, sMin: 13, sMax: 33 },
      { z: -86,  count: 16, colors: [0x150d45, 0x221040], opacity: [0.04, 0.08], sx: 50, sy: 20, sz: 10, sMin: 12, sMax: 30 },
      { z: -104, count: 14, colors: [0x0d0830, 0x180b28], opacity: [0.03, 0.07], sx: 45, sy: 18, sz: 9,  sMin: 10, sMax: 28 },
    ]

    const cloudGroups: THREE.Group[] = []

    LAYERS.forEach(({ z, count, colors, opacity, sx, sy, sz, sMin, sMax }) => {
      const group = new THREE.Group()
      group.position.z = z

      for (let i = 0; i < count; i++) {
        const col = colors[Math.floor(Math.random() * colors.length)]
        const op = opacity[0] + Math.random() * (opacity[1] - opacity[0])
        const mat = new THREE.SpriteMaterial({
          map: cloudTex,
          color: new THREE.Color(col),
          transparent: true,
          opacity: op,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        })
        const sprite = new THREE.Sprite(mat)
        sprite.position.set(
          (Math.random() - 0.5) * sx,
          (Math.random() - 0.5) * sy,
          (Math.random() - 0.5) * sz,
        )
        const s = sMin + Math.random() * (sMax - sMin)
        sprite.scale.set(s, s * (0.5 + Math.random() * 0.5), 1)
        group.add(sprite)
      }
      cloudGroups.push(group)
      scene.add(group)
    })

    // ── Nebula wisps (large, very faint, across the whole scene) ──────────────
    for (let i = 0; i < 50; i++) {
      const col = Math.random() > 0.5 ? 0x5020a8 : 0x2050b8
      const mat = new THREE.SpriteMaterial({
        map: wispTex,
        color: new THREE.Color(col),
        transparent: true,
        opacity: 0.02 + Math.random() * 0.04,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      const sprite = new THREE.Sprite(mat)
      sprite.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 50,
        -Math.random() * 108,
      )
      const s = 30 + Math.random() * 60
      sprite.scale.set(s, s * (0.4 + Math.random() * 0.6), 1)
      scene.add(sprite)
    }

    // ── Bright highlight stars (larger, glowing) ──────────────────────────────
    for (let i = 0; i < 60; i++) {
      const mat = new THREE.SpriteMaterial({
        map: makeCloudTex(0, 0.15),
        color: new THREE.Color(0xffffff),
        transparent: true,
        opacity: 0.5 + Math.random() * 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
      const sprite = new THREE.Sprite(mat)
      sprite.position.set(
        (Math.random() - 0.5) * 120,
        (Math.random() - 0.5) * 60,
        -Math.random() * 108,
      )
      const s = 0.4 + Math.random() * 1.2
      sprite.scale.set(s, s, 1)
      scene.add(sprite)
    }

    // ── Scroll → camera Z ─────────────────────────────────────────────────────
    let targetZ = 5
    let currentZ = 5
    let animT = 0

    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      const progress = total > 0 ? window.scrollY / total : 0
      // Camera travels from z=5 (start) to z=-107 (end of last layer)
      targetZ = 5 - progress * 112
    }

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    // ── Render loop ───────────────────────────────────────────────────────────
    let rafId: number
    const animate = () => {
      rafId = requestAnimationFrame(animate)
      animT += 0.001

      // Smooth camera move
      currentZ += (targetZ - currentZ) * 0.045
      camera.position.z = currentZ

      // Gentle idle sway (very subtle)
      camera.position.x = Math.sin(animT * 0.4) * 0.4
      camera.position.y = Math.sin(animT * 0.25) * 0.2

      // Slow star rotation
      stars.rotation.y += 0.000065
      stars.rotation.x += 0.000025

      // Drift clouds slightly
      cloudGroups.forEach((g, i) => {
        g.rotation.z += 0.000045 * (i % 2 === 0 ? 1 : -1)
        g.position.x = Math.sin(animT * 0.08 + i * 0.9) * 0.4
      })

      renderer.render(scene, camera)
    }
    animate()

    return () => {
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
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}
