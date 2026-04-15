import { categories } from '@/lib/siteContent'

export default function Home() {
  return (
    <main className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Home">
          Dohyun Park
        </a>
        <nav className="top-nav" aria-label="Main categories">
          {categories.map((category) => (
            <a key={category.id} href={`/${category.id}`}>
              {category.title}
            </a>
          ))}
        </nav>
      </header>

      <section id="top" className="intro">
        <div className="intro-copy">
          <p className="eyebrow">Blog Portfolio</p>
          <h1>Clean structure first. Content can come later.</h1>
          <p className="intro-text">
            The site is organized into Blog, Projects, and GitHub. Each category has
            empty sections ready for your own posts, project writeups, and repository links.
          </p>
        </div>
        <div className="intro-panel" aria-label="Empty content state">
          <article className="recent-item">
            <span>Ready</span>
            <h2>No posts or projects have been added yet.</h2>
            <p>Use the category pages as the structure and fill them with your own content.</p>
          </article>
        </div>
      </section>

      <section className="category-index" aria-label="Category links">
        {categories.map((category) => (
          <a key={category.id} className="category-link" href={`/${category.id}`}>
            <span>{category.label}</span>
            <strong>{category.title}</strong>
          </a>
        ))}
      </section>

      <div className="content-stack">
        {categories.map((category) => (
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
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
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
