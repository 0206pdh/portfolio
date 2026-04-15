'use client'

import SiteHeader from '@/components/SiteHeader'
import { useEditableContent } from '@/components/useEditableContent'

type EditableCategoryProps = {
  categoryId: string
}

export default function EditableCategory({ categoryId }: EditableCategoryProps) {
  const { content } = useEditableContent()
  const category = content.find((item) => item.id === categoryId)

  if (!category) {
    return null
  }

  return (
    <main className="site-shell">
      <SiteHeader />

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
              <ul className="content-items">
                {group.items.map((item) => (
                  <li key={item.id}>
                    <div>
                      <strong>{item.title}</strong>
                      {item.description && <p>{item.description}</p>}
                    </div>
                    {item.href && (
                      <a href={item.href} target="_blank" rel="noreferrer">
                        Open
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="empty-panel">
                <span>No content yet</span>
                <a href="/manage">Add content</a>
              </div>
            )}
          </article>
        ))}
      </section>
    </main>
  )
}
