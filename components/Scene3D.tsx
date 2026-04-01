'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { CARDS } from '@/lib/data'

interface Scene3DProps {
  activeCardId: string | null
  onSelectCard: (id: string) => void
}

export default function Scene3D({ activeCardId, onSelectCard }: Scene3DProps) {
  const mountRef = useRef<HTMLDivElement>(null)

  // We store references to our mutable 3D objects here to access them in effect
  const sceneRef = useRef<{
    controls: OrbitControls | null
    camera: THREE.PerspectiveCamera | null
    interactiveMeshes: { mesh: THREE.Mesh; cardId: string }[]
    defaultCameraPos: THREE.Vector3
    targetCameraPos: THREE.Vector3 | null
    targetCameraLookAt: THREE.Vector3 | null
  }>({
    controls: null,
    camera: null,
    interactiveMeshes: [],
    defaultCameraPos: new THREE.Vector3(0, 15, 30),
    targetCameraPos: null,
    targetCameraLookAt: null,
  })

  useEffect(() => {
    if (!mountRef.current) return

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    mountRef.current.appendChild(renderer.domElement)

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.copy(sceneRef.current.defaultCameraPos)
    sceneRef.current.camera = camera

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.minDistance = 5
    controls.maxDistance = 100
    sceneRef.current.controls = controls

    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2)
    directionalLight.position.set(20, 30, 20)
    scene.add(directionalLight)

    // Optional debug grid so we always see where the ground is
    const gridHelper = new THREE.GridHelper(200, 50, 0x888888, 0xcccccc)
    gridHelper.position.y = -15
    scene.add(gridHelper)

    const loader = new GLTFLoader()
    loader.load(
      '/models/web_diagram_copy.gltf',
      (gltf) => {
        const model = gltf.scene
        
        // -- EXTREME BULLETPROOF FRAMING (Handles NaN Geometries) --
        // Calculate bounding box manually to ignore any corrupt (NaN) geometries in the GLTF
        model.updateMatrixWorld(true)
        const box = new THREE.Box3()
        model.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh
                if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox()
                const b = mesh.geometry.boundingBox
                if (b && isFinite(b.max.x) && !isNaN(b.max.x)) {
                    const worldBox = b.clone().applyMatrix4(mesh.matrixWorld)
                    box.union(worldBox)
                }
            }
        })

        const size = new THREE.Vector3()
        const center = new THREE.Vector3()
        
        if (!box.isEmpty() && isFinite(box.max.x)) {
            box.getSize(size)
            box.getCenter(center)
            const maxDim = Math.max(size.x, size.y, size.z)
            
            if (maxDim > 0) {
                const scaleFactor = 40 / maxDim
                model.scale.setScalar(scaleFactor)
                model.updateMatrixWorld(true)
                
                // Re-center
                const scaledBox = new THREE.Box3()
                model.traverse((child) => {
                    if ((child as THREE.Mesh).isMesh) {
                        const mesh = child as THREE.Mesh
                        const b = mesh.geometry.boundingBox
                        if (b && isFinite(b.max.x) && !isNaN(b.max.x)) {
                            const worldBox = b.clone().applyMatrix4(mesh.matrixWorld)
                            scaledBox.union(worldBox)
                        }
                    }
                })
                scaledBox.getCenter(center)
            }
        }

        // Apply negative center offset to position the valid geometries exactly at origin
        model.position.x -= center.x
        model.position.y -= center.y
        model.position.z -= center.z

        // Expand camera planes heavily
        camera.near = 0.5
        camera.far = 15000
        camera.updateProjectionMatrix()

        // Safely place camera back from the 40-unit model
        camera.position.set(0, 15, 60)
        controls.target.set(0, 0, 0)
        controls.update()

        // Update references for reset/lerp
        sceneRef.current.defaultCameraPos.copy(camera.position)
        sceneRef.current.targetCameraPos = sceneRef.current.defaultCameraPos.clone()
        sceneRef.current.targetCameraLookAt = new THREE.Vector3(0, 0, 0)
        
        console.log(`Model Reloaded! Scaled to 40 max.`)

        // Find some distinct meshes to attach CARDS data to
        const possibleMeshes: THREE.Mesh[] = []
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh
            
            // Generate bounding boxes and ignore corrupted geometry
            if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox()
            const b = mesh.geometry.boundingBox
            if (b && isFinite(b.max.x) && !isNaN(b.max.x)) {
                // Determine rough volume
                const dx = b.max.x - b.min.x
                const dy = b.max.y - b.min.y
                const dz = b.max.z - b.min.z
                
                // Keep very low threshold since we already filtered out NaN geometries
                if (dx * dy * dz > 0.000001) {
                    possibleMeshes.push(mesh)
                }
            }
          }
        })

        // Sort by volume descending so we assign main boxes first
        possibleMeshes.sort((a, b) => {
            const bA = a.geometry.boundingBox!
            const bB = b.geometry.boundingBox!
            const vA = (bA.max.x - bA.min.x) * (bA.max.y - bA.min.y) * (bA.max.z - bA.min.z)
            const vB = (bB.max.x - bB.min.x) * (bB.max.y - bB.min.y) * (bB.max.z - bB.min.z)
            return vB - vA
        })

        // Map the first few suitable meshes to CARDS
        const interactive = []
        for (let i = 0; i < Math.min(CARDS.length, possibleMeshes.length); i++) {
           interactive.push({ mesh: possibleMeshes[i], cardId: CARDS[i].id })
           // Add a subtle glowing outline/material to indicate it's clickable
           const origMat = possibleMeshes[i].material
           possibleMeshes[i].userData = { isInteractive: true, originalMaterial: origMat, cardId: CARDS[i].id }
        }
        sceneRef.current.interactiveMeshes = interactive

        scene.add(model)
      },
      undefined,
      (error) => {
          console.error('Error loading gltf:', error)
          // Add a fallback cube if loading fails just so the user sees something
          const geom = new THREE.BoxGeometry(10, 10, 10)
          const mat = new THREE.MeshStandardMaterial({ color: 0xff0000 })
          const fallback = new THREE.Mesh(geom, mat)
          scene.add(fallback)
          sceneRef.current.interactiveMeshes = [{ mesh: fallback, cardId: CARDS[0].id }]
      }
    )

    // Raycaster for click events
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    const onPointerDown = (event: PointerEvent) => {
      // Don't raycast if it's right click
      if (event.button !== 0) return

      // Convert mouse position to normalized device coordinates (-1 to +1)
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      
      const meshes = sceneRef.current.interactiveMeshes.map(i => i.mesh)
      const intersects = raycaster.intersectObjects(meshes, false)

      if (intersects.length > 0) {
        // Found a clicked interactive mesh
        const clickedMesh = intersects[0].object as THREE.Mesh
        const cardId = clickedMesh.userData.cardId
        onSelectCard(cardId) // Tell React to open the UI
      }
    }

    const onPointerMove = (event: PointerEvent) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
        raycaster.setFromCamera(mouse, camera)

        const meshes = sceneRef.current.interactiveMeshes.map(i => i.mesh)
        const intersects = raycaster.intersectObjects(meshes, false)
        
        if (intersects.length > 0) {
            document.body.style.cursor = 'pointer'
        } else {
            document.body.style.cursor = 'default'
        }
    }

    // Bind events
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    let rafId: number
    const animate = () => {
      rafId = requestAnimationFrame(animate)

      controls.update()

      // Handle Camera Lerping when a card is selected
      const { targetCameraPos, targetCameraLookAt } = sceneRef.current
      if (targetCameraPos && targetCameraLookAt) {
          // Temporarily disable controls while lerping
          controls.enabled = false
          camera.position.lerp(targetCameraPos, 0.05)
          
          // Lerp camera target
          controls.target.lerp(targetCameraLookAt, 0.05)
      } else {
          // If no active card, we can slowly lerp back to original target if we were zoomed in
          controls.enabled = true
      }

      // Add a subtle hovering effect to interactive meshes
      const time = Date.now() * 0.001
      sceneRef.current.interactiveMeshes.forEach((item, index) => {
        // Gently pulse opacity or emissive if hovered? (Optional polish)
        if (item.mesh.material && (item.mesh.material as THREE.MeshStandardMaterial).emissive) {
           const mat = item.mesh.material as THREE.MeshStandardMaterial
           if (item.cardId === activeCardId) {
             // highlight currently active
             mat.emissive.setHex(0x3366ff)
           } else {
             mat.emissive.setHex(0x000000)
           }
        }
      })

      renderer.render(scene, camera)
    }
    animate()

    return () => {
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
      cancelAnimationFrame(rafId)
      renderer.dispose()
      document.body.style.cursor = 'default'
      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement)
      }
    }
  }, [onSelectCard])

  // Sync activeCardId changes to camera targets
  useEffect(() => {
     if (!sceneRef.current.camera) return

     if (activeCardId) {
        // Find the mesh associated with this card
        const match = sceneRef.current.interactiveMeshes.find(m => m.cardId === activeCardId)
        if (match) {
            const meshBox = new THREE.Box3().setFromObject(match.mesh)
            const targetCenter = meshBox.getCenter(new THREE.Vector3())
            
            // Calculate a position slightly above and in front of the box
            const size = meshBox.getSize(new THREE.Vector3())
            const maxDim = Math.max(size.x, size.y, size.z)
            const offset = new THREE.Vector3(maxDim, maxDim, maxDim).multiplyScalar(1.5)
            
            sceneRef.current.targetCameraPos = targetCenter.clone().add(offset)
            sceneRef.current.targetCameraLookAt = targetCenter.clone()
        }
     } else {
        // Reset view
        sceneRef.current.targetCameraPos = sceneRef.current.defaultCameraPos.clone()
        sceneRef.current.targetCameraLookAt = new THREE.Vector3(0, 0, 0)
     }
  }, [activeCardId])

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        background: '#f4f7f6' // Bright background per request
      }}
    />
  )
}
