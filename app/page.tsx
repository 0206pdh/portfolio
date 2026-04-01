'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'

const Scene3D = dynamic(() => import('@/components/Scene3D'), { ssr: false })
const PortfolioUI = dynamic(() => import('@/components/PortfolioUI'), { ssr: false })

export default function Home() {
  const [activeCardId, setActiveCardId] = useState<string | null>(null)

  return (
    <main style={{ width: '100%', height: '100vh', overflow: 'hidden', background: '#000205' }}>
      <Scene3D activeCardId={activeCardId} onSelectCard={setActiveCardId} />
      <PortfolioUI activeCardId={activeCardId} onClose={() => setActiveCardId(null)} />
    </main>
  )
}
