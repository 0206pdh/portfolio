'use client'

import SiteHeader from '@/components/SiteHeader'
import { useEditableContent } from '@/components/useEditableContent'

export default function EditableHome() {
  const { content } = useEditableContent()
  const itemCount = content.reduce(
    (total, category) => total + category.groups.reduce((groupTotal, group) => groupTotal + group.items.length, 0),
    0,
  )

  return (
    <main className="site-shell">
      <SiteHeader />

      <section id="top" className="intro">
        <div className="intro-copy">
          <p className="eyebrow">Blog Portfolio</p>
          <h1>Write and manage your portfolio from the site.</h1>
          <p className="intro-text">
            Blog, Projects, and GitHub are ready as empty sections. Use Manage to add,
            edit, or remove your own content without touching the code.
          </p>
        </div>
        <div className="intro-panel" aria-label="Content state">
          <article className="recent-item">
            <span>{itemCount > 0 ? 'Content' : 'Ready'}</span>
            <h2>{itemCount > 0 ? `${itemCount} item(s) saved in this browser.` : 'No content has been added yet.'}</h2>
            <p>
              {itemCount > 0
                ? 'Open a category to review what you saved.'
                : 'Open Manage to start writing posts, project notes, or repository links.'}
            </p>
          </article>
          <a className="manage-link" href="/manage">
            Open Manage
          </a>
        </div>
      </section>

      <section className="category-index" aria-label="Category links">
        {content.map((category) => (
          <a key={category.id} className="category-link" href={`/${category.id}`}>
            <span>{category.label}</span>
            <strong>{category.title}</strong>
          </a>
        ))}
      </section>

      <div className="content-stack">
        {content.map((category) => (
          <section key={category.id} id={category.id} className="category-section">
            <div className="category-visual" aria-hidden="true">
              <span>{category.title}</span>
            </div>
            <div className="category-content">
              <p className="eyebrow">{category.label}</p>
              <h2>{category.title}</h2>
              <p>{category.description}</p>
              <div className="subsection-grid">
                {category.groups.map((group) => (
                  <article key={group.title} className="subsection-card">
                    <h3>{group.title}</h3>
                    <p>{group.summary}</p>
                    {group.items.length > 0 ? (
                      <ul>
                        {group.items.slice(0, 3).map((item) => (
                          <li key={item.id}>
                            <strong>{item.title}</strong>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="empty-copy">Empty section</p>
                    )}
                  </article>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  )
}
