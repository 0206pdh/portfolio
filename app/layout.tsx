import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dohyun Park | Blog Portfolio',
  description:
    'Blog-style portfolio for Dohyun Park, organized by blog posts, projects, and GitHub repositories.',
  keywords: ['Cloud Engineer', 'AWS', 'DevOps', 'Backend', 'Portfolio', 'Blog'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
