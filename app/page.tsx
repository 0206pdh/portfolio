import dynamic from 'next/dynamic'

const CityScene = dynamic(() => import('@/components/CityScene'), { ssr: false })

export default function Home() {
  return (
    <main style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#020810' }}>
      <CityScene />
    </main>
  )
}
