'use client'

import React, { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
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
    framingCenter: THREE.Vector3 | null // Add this to remember center
    composer?: EffectComposer | null
  }>({
    controls: null,
    camera: null,
    interactiveMeshes: [],
    defaultCameraPos: new THREE.Vector3(0, 15, 30),
    targetCameraPos: null,
    targetCameraLookAt: null,
    framingCenter: null,
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

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0)
    directionalLight.position.set(20, 30, 20)
    scene.add(directionalLight)

    // Add Post-Processing Composer for Neon Glow (Bloom)
    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.8,  // strength
      0.5,  // radius
      0.2   // threshold - low enough to catch glowing neon textures
    )
    composer.addPass(bloomPass)

    // Store composer reference to clean up and resize later
    sceneRef.current.composer = composer

    const loader = new GLTFLoader()
    loader.load(
      '/models/web_diagram_copy.gltf',
      (gltf) => {
        const model = gltf.scene
        
        // -- AUTO CAMERA RIGGING (No Scaling) --
        model.updateMatrixWorld(true)
        const contentBox = new THREE.Box3()
        
        model.traverse((child) => {
            if ((child as THREE.Mesh).isMesh) {
                const mesh = child as THREE.Mesh
                if (!mesh.geometry.boundingBox) mesh.geometry.computeBoundingBox()
                const b = mesh.geometry.boundingBox
                if (b && isFinite(b.max.x) && !isNaN(b.max.x)) {
                    const localSize = b.getSize(new THREE.Vector3())
                    
                    // 1. Detect giant floor planes (Spline backgrounds)
                    if (Math.max(localSize.x, localSize.y, localSize.z) > 400) {
                        // Instead of hiding, paint it deep space black to naturally blend with background
                        mesh.material = new THREE.MeshBasicMaterial({ color: 0x040608 })
                        return // Skip adding this background to the content bounding box
                    }

                    // 2. Boost Emissive glow for neon effects
                    if (mesh.material && (mesh.material as any).emissive) {
                        const mat = mesh.material as THREE.MeshStandardMaterial
                        if (mat.emissive.r > 0 || mat.emissive.g > 0 || mat.emissive.b > 0) {
                            mat.emissiveIntensity = 2.5
                        }
                    }

                    // 3. Add valid, non-background mesh to the content box
                    const worldBox = b.clone().applyMatrix4(mesh.matrixWorld)
                    contentBox.union(worldBox)
                }
            }
        })

        // -- Compute Camera Framing --
        const size = new THREE.Vector3()
        const center = new THREE.Vector3()
        let maxDim = 100 // default fallback
        
        if (!contentBox.isEmpty() && isFinite(contentBox.max.x)) {
            contentBox.getSize(size)
            contentBox.getCenter(center)
            maxDim = Math.max(size.x, size.y, size.z)
        }

        // Expand camera clipping planes safely based on real dimensions
        camera.near = 0.5
        camera.far = Math.max(10000, maxDim * 10)
        camera.updateProjectionMatrix()

        // Position camera relative to the REAL center and size of the content
        const cameraZ = center.z + maxDim * 1.5
        const cameraY = center.y + maxDim * 0.8
        camera.position.set(center.x, cameraY, cameraZ)
        
        controls.target.copy(center)
        controls.update()

        // Update references for zooming back out smoothly
        sceneRef.current.defaultCameraPos.copy(camera.position)
        sceneRef.current.targetCameraPos = sceneRef.current.defaultCameraPos.clone()
        sceneRef.current.targetCameraLookAt = center.clone()
        sceneRef.current.framingCenter = center.clone()
        
        console.log(`Auto Camera Rigged! Center:`, center, `MaxDim:`, maxDim)

        // Find some distinct meshes to attach CARDS data to
        const possibleMeshes: THREE.Mesh[] = []
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh
            // Skip the newly blackened background plane
            if ((mesh.material as THREE.MeshBasicMaterial).color?.getHex() === 0x040608) {
               return
            }

            
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
      if (sceneRef.current.composer) {
          sceneRef.current.composer.setSize(window.innerWidth, window.innerHeight)
      }
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

      // Use composer instead of raw renderer
      if (sceneRef.current.composer) {
          sceneRef.current.composer.render()
      } else {
          renderer.render(scene, camera)
      }
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
        // Reset view to framing center
        sceneRef.current.targetCameraPos = sceneRef.current.defaultCameraPos.clone()
        if (sceneRef.current.framingCenter) {
            sceneRef.current.targetCameraLookAt = sceneRef.current.framingCenter.clone()
        }
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
        background: '#040608' // Deep dark space background
      }}
    />
  )
}
