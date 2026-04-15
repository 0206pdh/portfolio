export type Category = {
  id: string
  title: string
  label: string
  description: string
  groups: {
    title: string
    summary: string
    items: string[]
  }[]
}

export const categories: Category[] = [
  {
    id: 'blog',
    title: 'Blog',
    label: 'Write',
    description: 'A place for posts, notes, and study logs.',
    groups: [
      {
        title: 'Posts',
        summary: 'Long-form writing and technical notes.',
        items: [],
      },
      {
        title: 'Series',
        summary: 'Grouped posts around one topic.',
        items: [],
      },
      {
        title: 'Notes',
        summary: 'Short references and quick records.',
        items: [],
      },
    ],
  },
  {
    id: 'projects',
    title: 'Projects',
    label: 'Build',
    description: 'A place for project writeups and implementation records.',
    groups: [
      {
        title: 'Featured',
        summary: 'Primary projects to show first.',
        items: [],
      },
      {
        title: 'In Progress',
        summary: 'Work that is still being built.',
        items: [],
      },
      {
        title: 'Archive',
        summary: 'Older projects and experiments.',
        items: [],
      },
    ],
  },
  {
    id: 'github',
    title: 'GitHub',
    label: 'Code',
    description: 'A place for repositories and code links.',
    groups: [
      {
        title: 'Pinned',
        summary: 'Repositories to feature.',
        items: [],
      },
      {
        title: 'Study',
        summary: 'Learning repositories and practice code.',
        items: [],
      },
      {
        title: 'Activity',
        summary: 'Profile links and contribution records.',
        items: [],
      },
    ],
  },
]
