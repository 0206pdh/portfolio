import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dohyun Park | Cloud & Backend Portfolio',
  description:
    'Cloud and backend portfolio for Dohyun Park, organized with GitHub repositories, Velog posts, and contact links.',
  keywords: ['Cloud Engineer', 'AWS', 'DevOps', 'Backend', 'Portfolio', 'Velog', 'GitHub'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
