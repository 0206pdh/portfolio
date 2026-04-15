'use client'

import { useEffect, useState } from 'react'
import { Category, categories } from '@/lib/siteContent'

export const CONTENT_STORAGE_KEY = 'portfolio-content-v1'

function cloneCategories() {
  return JSON.parse(JSON.stringify(categories)) as Category[]
}

function mergeWithTemplate(saved: Category[]) {
  return categories.map((templateCategory) => {
    const savedCategory = saved.find((category) => category.id === templateCategory.id)

    return {
      ...templateCategory,
      groups: templateCategory.groups.map((templateGroup) => {
        const savedGroup = savedCategory?.groups.find((group) => group.title === templateGroup.title)

        return {
          ...templateGroup,
          items: savedGroup?.items ?? [],
        }
      }),
    }
  })
}

export function useEditableContent() {
  const [content, setContent] = useState<Category[]>(() => cloneCategories())
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const saved = window.localStorage.getItem(CONTENT_STORAGE_KEY)

    if (saved) {
      try {
        setContent(mergeWithTemplate(JSON.parse(saved) as Category[]))
      } catch {
        setContent(cloneCategories())
      }
    }

    setIsLoaded(true)
  }, [])

  function saveContent(nextContent: Category[]) {
    setContent(nextContent)
    window.localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(nextContent))
  }

  function resetContent() {
    const nextContent = cloneCategories()
    setContent(nextContent)
    window.localStorage.removeItem(CONTENT_STORAGE_KEY)
  }

  return { content, isLoaded, saveContent, resetContent }
}
