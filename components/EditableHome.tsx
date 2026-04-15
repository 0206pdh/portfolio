import SiteHeader from '@/components/SiteHeader'
import { SocialIcon } from '@/components/SiteHeader'
import { categories, profile, socialLinks } from '@/lib/siteContent'

export default function EditableHome() {
  return (
    <main className="site-shell">
      <SiteHeader />

      <section id="top" className="intro">
        <div className="intro-copy">
          <p className="eyebrow">Blog Portfolio</p>
          <h1>{profile.headline}</h1>
          <p className="intro-text">
            {profile.summary}
          </p>
          <div className="focus-list" aria-label="Focus areas">
            {profile.focus.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </div>
        <div className="intro-panel" aria-label="Profile links">
          <article className="recent-item">
            <span>{profile.role}</span>
            <h2>{profile.name}</h2>
            <p>{profile.location}</p>
          </article>
          <div className="contact-grid" aria-label="Contact links">
            {socialLinks.map((link) => (
              <a key={link.id} href={link.href} target={link.id === 'email' ? undefined : '_blank'} rel="noreferrer">
                <SocialIcon id={link.id} />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
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
