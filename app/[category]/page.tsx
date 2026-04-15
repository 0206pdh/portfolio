import { notFound } from 'next/navigation'
import { categories } from '@/lib/siteContent'

type CategoryPageProps = {
  params: {
    category: string
  }
}

export function generateStaticParams() {
  return categories.map((category) => ({
    category: category.id,
  }))
}

export function generateMetadata({ params }: CategoryPageProps) {
  const category = categories.find((item) => item.id === params.category)

  if (!category) {
    return {}
  }

  return {
    title: `${category.title} | Dohyun Park`,
    description: category.description,
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = categories.find((item) => item.id === params.category)

  if (!category) {
    notFound()
  }

  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="brand" href="/">
          Dohyun Park
        </a>
        <nav className="top-nav" aria-label="Main categories">
          {categories.map((item) => (
            <a key={item.id} href={`/${item.id}`} aria-current={item.id === category.id ? 'page' : undefined}>
              {item.title}
            </a>
          ))}
        </nav>
      </header>

      <section className="detail-hero">
        <div>
          <p className="eyebrow">{category.label}</p>
          <h1>{category.title}</h1>
          <p>{category.description}</p>
        </div>
        <div className="detail-visual" aria-hidden="true">
          <span>{category.title}</span>
        </div>
      </section>

      <section className="detail-list" aria-label={`${category.title} sections`}>
        {category.groups.map((group) => (
          <article key={group.title} className="detail-card">
            <div>
              <p className="eyebrow">Section</p>
              <h2>{group.title}</h2>
              <p>{group.summary}</p>
            </div>
            {group.items.length > 0 ? (
              <ul>
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <div className="empty-panel">No content yet</div>
            )}
          </article>
        ))}
      </section>
    </main>
  )
}
