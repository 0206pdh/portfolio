'use client'

import { FormEvent, useMemo, useState } from 'react'
import SiteHeader from '@/components/SiteHeader'
import { useEditableContent } from '@/components/useEditableContent'
import { ContentItem } from '@/lib/siteContent'

function createId() {
  if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
    return crypto.randomUUID()
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export default function ContentManager() {
  const { content, isLoaded, saveContent, resetContent } = useEditableContent()
  const [categoryId, setCategoryId] = useState('blog')
  const [groupTitle, setGroupTitle] = useState('Posts')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [href, setHref] = useState('')

  const selectedCategory = useMemo(
    () => content.find((category) => category.id === categoryId) ?? content[0],
    [categoryId, content],
  )
  const selectedGroup = selectedCategory?.groups.find((group) => group.title === groupTitle) ?? selectedCategory?.groups[0]

  function updateItem(categoryIdToUpdate: string, groupTitleToUpdate: string, nextItem: ContentItem) {
    saveContent(
      content.map((category) =>
        category.id === categoryIdToUpdate
          ? {
              ...category,
              groups: category.groups.map((group) =>
                group.title === groupTitleToUpdate
                  ? {
                      ...group,
                      items: group.items.map((item) => (item.id === nextItem.id ? nextItem : item)),
                    }
                  : group,
              ),
            }
          : category,
      ),
    )
  }

  function deleteItem(categoryIdToUpdate: string, groupTitleToUpdate: string, itemId: string) {
    saveContent(
      content.map((category) =>
        category.id === categoryIdToUpdate
          ? {
              ...category,
              groups: category.groups.map((group) =>
                group.title === groupTitleToUpdate
                  ? {
                      ...group,
                      items: group.items.filter((item) => item.id !== itemId),
                    }
                  : group,
              ),
            }
          : category,
      ),
    )
  }

  function addItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!selectedCategory || !selectedGroup || !title.trim()) {
      return
    }

    const nextItem: ContentItem = {
      id: createId(),
      title: title.trim(),
      description: description.trim(),
      href: href.trim() || undefined,
      createdAt: new Date().toISOString(),
    }

    saveContent(
      content.map((category) =>
        category.id === selectedCategory.id
          ? {
              ...category,
              groups: category.groups.map((group) =>
                group.title === selectedGroup.title
                  ? {
                      ...group,
                      items: [nextItem, ...group.items],
                    }
                  : group,
              ),
            }
          : category,
      ),
    )

    setTitle('')
    setDescription('')
    setHref('')
  }

  function handleCategoryChange(nextCategoryId: string) {
    const nextCategory = content.find((category) => category.id === nextCategoryId)
    setCategoryId(nextCategoryId)
    setGroupTitle(nextCategory?.groups[0]?.title ?? '')
  }

  return (
    <main className="site-shell">
      <SiteHeader showManage />

      <section className="manager-hero">
        <p className="eyebrow">Manage</p>
        <h1>Write your content here.</h1>
        <p>
          Add posts, project notes, and GitHub links from this page. Saved content is stored
          in this browser and appears on the category pages.
        </p>
      </section>

      <section className="manager-grid">
        <form className="manager-form" onSubmit={addItem}>
          <label>
            Category
            <select value={categoryId} onChange={(event) => handleCategoryChange(event.target.value)}>
              {content.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </label>

          <label>
            Section
            <select value={groupTitle} onChange={(event) => setGroupTitle(event.target.value)}>
              {selectedCategory?.groups.map((group) => (
                <option key={group.title} value={group.title}>
                  {group.title}
                </option>
              ))}
            </select>
          </label>

          <label>
            Title
            <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Write a title" />
          </label>

          <label>
            Description
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Write notes, details, or a short summary"
              rows={7}
            />
          </label>

          <label>
            Link
            <input value={href} onChange={(event) => setHref(event.target.value)} placeholder="https://..." />
          </label>

          <button type="submit">Add content</button>
          <button type="button" className="secondary-button" onClick={resetContent}>
            Clear saved content
          </button>
          {!isLoaded && <p className="form-note">Loading saved content...</p>}
        </form>

        <div className="manager-list">
          {content.map((category) => (
            <section key={category.id} className="manager-category">
              <h2>{category.title}</h2>
              {category.groups.map((group) => (
                <div key={group.title} className="manager-group">
                  <h3>{group.title}</h3>
                  {group.items.length > 0 ? (
                    group.items.map((item) => (
                      <article key={item.id} className="editor-card">
                        <label>
                          Title
                          <input
                            value={item.title}
                            onChange={(event) =>
                              updateItem(category.id, group.title, { ...item, title: event.target.value })
                            }
                          />
                        </label>
                        <label>
                          Description
                          <textarea
                            value={item.description}
                            onChange={(event) =>
                              updateItem(category.id, group.title, { ...item, description: event.target.value })
                            }
                            rows={5}
                          />
                        </label>
                        <label>
                          Link
                          <input
                            value={item.href ?? ''}
                            onChange={(event) =>
                              updateItem(category.id, group.title, { ...item, href: event.target.value })
                            }
                          />
                        </label>
                        <button type="button" className="secondary-button" onClick={() => deleteItem(category.id, group.title, item.id)}>
                          Delete
                        </button>
                      </article>
                    ))
                  ) : (
                    <p className="empty-copy">Nothing saved here yet.</p>
                  )}
                </div>
              ))}
            </section>
          ))}
        </div>
      </section>
    </main>
  )
}
