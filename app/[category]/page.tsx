import { notFound } from 'next/navigation'
import EditableCategory from '@/components/EditableCategory'
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

  return <EditableCategory categoryId={category.id} />
}
