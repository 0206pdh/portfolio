import { categories } from '@/lib/siteContent'

type SiteHeaderProps = {
  current?: string
}

export default function SiteHeader({ current }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <a className="brand" href="/">
        Dohyun Park
      </a>
      <nav className="top-nav" aria-label="Main categories">
        {categories.map((category) => (
          <a key={category.id} href={`/${category.id}`} aria-current={current === category.id ? 'page' : undefined}>
            {category.title}
          </a>
        ))}
        <a href="/manage" aria-current={current === 'manage' ? 'page' : undefined}>
          Manage
        </a>
      </nav>
    </header>
  )
}
