import dynamic from 'next/dynamic'
import Navigation from '@/components/Navigation'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Projects from '@/components/sections/Projects'
import Skills from '@/components/sections/Skills'
import Contact from '@/components/sections/Contact'

// Three.js must only run in the browser — disable SSR
const SpaceBackground = dynamic(() => import('@/components/SpaceBackground'), { ssr: false })

export default function Home() {
  return (
    <main style={{ position: 'relative' }}>
      {/* Fixed Three.js background */}
      <SpaceBackground />

      {/* Navigation overlays */}
      <Navigation />

      {/* Scrollable content on top of canvas */}
      <div style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </main>
  )
}
