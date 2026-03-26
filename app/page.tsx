import dynamic from 'next/dynamic'

const CityScene = dynamic(() => import('@/components/CityScene'), { ssr: false })

export default function Home() {
  return (
    <main style={{ width: '100%', minHeight: '100vh', background: '#020810' }}>
      <CityScene />
    </main>
  )
}
