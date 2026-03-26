import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dohyun Park | Cloud & Backend Engineer',
  description:
    'Portfolio of Dohyun Park (박도현) — Cloud & Backend Engineer specializing in AWS, DevOps, and systems design.',
  keywords: ['Cloud Engineer', 'AWS', 'DevOps', 'Backend', 'Portfolio', '박도현'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
