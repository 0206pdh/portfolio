'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Scene3D() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Setup Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    // Darker, premium background color
    renderer.setClearColor(0x000205, 1)
    mountRef.current.appendChild(renderer.domElement)

    // Setup Scene & Camera
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x000205, 0.0015) // Deep fog for depth

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.set(0, 10, 60)

    // Interactive Group
    const group = new THREE.Group()
    scene.add(group)

    // Create Premium Particle Wave
    const particleCount = 15000
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    const color1 = new THREE.Color(0x68d8be) // Turquoise
    const color2 = new THREE.Color(0x7aaef4) // Blue
    const color3 = new THREE.Color(0x75acf5) // Light Blue

    for (let i = 0; i < particleCount; i++) {
        // distribute points evenly in x and z
        const x = (Math.random() - 0.5) * 200
        const z = (Math.random() - 0.5) * 200
        const y = 0
        
        positions[i * 3] = x
        positions[i * 3 + 1] = y
        positions[i * 3 + 2] = z

        // Color based on random distribution
        const mixedColor = color1.clone().lerp(color2, Math.random()).lerp(color3, Math.random())
        colors[i * 3] = mixedColor.r
        colors[i * 3 + 1] = mixedColor.g
        colors[i * 3 + 2] = mixedColor.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    // Create a circular texture for particles
    const canvas = document.createElement('canvas')
    canvas.width = 16
    canvas.height = 16
    const context = canvas.getContext('2d')
    if (context) {
        const gradient = context.createRadialGradient(8, 8, 0, 8, 8, 8)
        gradient.addColorStop(0, 'rgba(255,255,255,1)')
        gradient.addColorStop(1, 'rgba(255,255,255,0)')
        context.fillStyle = gradient
        context.fillRect(0, 0, 16, 16)
    }
    const particleTexture = new THREE.CanvasTexture(canvas)

    const material = new THREE.PointsMaterial({
        size: 0.6,
        vertexColors: true,
        map: particleTexture,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    })

    const particles = new THREE.Points(geometry, material)
    group.add(particles)

    // Glowing lines to connect some central particles (aesthetic touch)
    const lineGeo = new THREE.BufferGeometry()
    const linePoss = []
    for(let i=0; i<300; i++) {
        const theta = Math.random() * Math.PI * 2
        linePoss.push(Math.sin(theta)*15, (Math.random()-0.5)*10, Math.cos(theta)*15)
        const theta2 = theta + (Math.random()-0.5)*0.5
        linePoss.push(Math.sin(theta2)*15, (Math.random()-0.5)*10, Math.cos(theta2)*15)
    }
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePoss, 3))
    const lineMat = new THREE.LineBasicMaterial({
        color: 0x6ea2f3,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending
    })
    const lines = new THREE.LineSegments(lineGeo, lineMat)
    group.add(lines)

    // Mouse Interaction
    let targetX = 0
    let targetY = 0
    const onMouseMove = (event: MouseEvent) => {
        targetX = (event.clientX - window.innerWidth / 2) * 0.001
        targetY = (event.clientY - window.innerHeight / 2) * 0.001
    }
    window.addEventListener('mousemove', onMouseMove)

    // Resize Handler
    const onResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    // Animation Loop
    let time = 0
    let rafId: number
    const animate = () => {
        time += 0.005
        rafId = requestAnimationFrame(animate)

        // Wave animation
        const posAttribute = geometry.attributes.position
        for(let i = 0; i < particleCount; i++) {
            const x = posAttribute.getX(i)
            const z = posAttribute.getZ(i)
            
            // Complex wave equation
            const y = Math.sin(x * 0.05 + time) * 3 + Math.cos(z * 0.05 + time * 0.8) * 3 + Math.sin((x+z)*0.02 + time)*2
            posAttribute.setY(i, y)
        }
        posAttribute.needsUpdate = true

        // Smoothly rotate group based on mouse
        group.rotation.y += (targetX * 0.5 - group.rotation.y) * 0.05
        group.rotation.x += (targetY * 0.2 - group.rotation.x) * 0.05

        // Gentle camera float
        camera.position.y = 15 + Math.sin(time*0.5) * 5

        renderer.render(scene, camera)
    }
    animate()

    return () => {
        window.removeEventListener('mousemove', onMouseMove)
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
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        pointerEvents: 'none',
        background: '#000205'
      }}
    />
  )
}
