import dynamic from 'next/dynamic'

const Scene3D = dynamic(() => import('@/components/Scene3D'), { ssr: false })
const PortfolioUI = dynamic(() => import('@/components/PortfolioUI'), { ssr: false })

export default function Home() {
  return (
    <>
      <Scene3D />
      <PortfolioUI />
    </>
  )
}
