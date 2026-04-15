export type Category = {
  id: string
  title: string
  label: string
  description: string
  groups: {
    title: string
    summary: string
    items: ContentItem[]
  }[]
}

export type ContentItem = {
  id: string
  title: string
  description: string
  href?: string
  createdAt: string
}

export type SocialLink = {
  id: 'email' | 'github' | 'velog' | 'instagram'
  label: string
  href: string
}

export const profile = {
  name: 'Dohyun Park',
  role: 'Cloud / Backend Engineer',
  location: 'South Korea',
  headline: 'Cloud & Backend Portfolio',
  summary:
    'AWS, backend systems, DevOps, and system design.',
  focus: ['AWS', 'Backend', 'DevOps', 'System Design'],
}

export const socialLinks: SocialLink[] = [
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:0206pdh@naver.com',
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/0206pdh',
  },
  {
    id: 'velog',
    label: 'Velog',
    href: 'https://velog.io/@0206pdh/posts',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    href: 'https://www.instagram.com/dohyun_0206',
  },
]

export const categories: Category[] = [
  {
    id: 'blog',
    title: 'Blog',
    label: 'Velog',
    description: 'Velog posts and study logs.',
    groups: [
      {
        title: 'Velog',
        summary: 'Posts on Velog.',
        items: [
          {
            id: 'velog-posts',
            title: '0206pdh.log',
            description: 'Blog posts and notes.',
            href: 'https://velog.io/@0206pdh/posts',
            createdAt: '2026-04-15T00:00:00.000Z',
          },
        ],
      },
      {
        title: 'Series',
        summary: 'Grouped writing.',
        items: [
          {
            id: 'velog-series',
            title: 'Velog Series',
            description: 'Series page for grouped posts.',
            href: 'https://velog.io/@0206pdh/series',
            createdAt: '2026-04-15T00:00:00.000Z',
          },
        ],
      },
      {
        title: 'Drafts',
        summary: 'Personal drafts.',
        items: [],
      },
    ],
  },
  {
    id: 'projects',
    title: 'Projects',
    label: 'Build',
    description: 'Selected GitHub repositories.',
    groups: [
      {
        title: 'Featured',
        summary: 'Main projects.',
        items: [
          {
            id: 'portfolio',
            title: 'portfolio',
            description: 'TypeScript portfolio site.',
            href: 'https://github.com/0206pdh/portfolio',
            createdAt: '2026-04-15T00:00:00.000Z',
          },
          {
            id: 'myagent-team',
            title: 'MyAgent_team',
            description: 'TypeScript project repository.',
            href: 'https://github.com/0206pdh/MyAgent_team',
            createdAt: '2026-04-14T00:00:00.000Z',
          },
          {
            id: 'fin-spring',
            title: 'fin_spring',
            description: 'Finance TypeScript project.',
            href: 'https://github.com/0206pdh/fin_spring',
            createdAt: '2026-04-08T00:00:00.000Z',
          },
        ],
      },
      {
        title: 'Backend / Cloud',
        summary: 'Backend and cloud work.',
        items: [
          {
            id: 'velog-cli',
            title: 'velog-cli',
            description: 'Python CLI-related repository.',
            href: 'https://github.com/0206pdh/velog-cli',
            createdAt: '2026-04-14T00:00:00.000Z',
          },
          {
            id: 'myagent',
            title: 'MyAgent',
            description: 'Python project repository.',
            href: 'https://github.com/0206pdh/MyAgent',
            createdAt: '2026-04-09T00:00:00.000Z',
          },
          {
            id: 'dockviz-cli',
            title: 'dockviz-cli',
            description: 'Go CLI repository.',
            href: 'https://github.com/0206pdh/dockviz-cli',
            createdAt: '2026-04-06T00:00:00.000Z',
          },
        ],
      },
      {
        title: 'Archive',
        summary: 'Older repositories.',
        items: [
          {
            id: 'youtube-live-comment-filter',
            title: 'youtube_live_comment_filter',
            description: 'YouTube live comment filtering.',
            href: 'https://github.com/0206pdh/youtube_live_comment_filter',
            createdAt: '2026-03-26T00:00:00.000Z',
          },
          {
            id: 'coding-test-hub',
            title: 'coding-test-hub',
            description: 'Baekjoon auto-push repository.',
            href: 'https://github.com/0206pdh/coding-test-hub',
            createdAt: '2026-03-20T00:00:00.000Z',
          },
        ],
      },
    ],
  },
  {
    id: 'github',
    title: 'GitHub',
    label: 'Code',
    description: 'Profile, repositories, and activity.',
    groups: [
      {
        title: 'Profile',
        summary: 'Main profile.',
        items: [
          {
            id: 'github-profile',
            title: '0206pdh',
            description: 'GitHub profile.',
            href: 'https://github.com/0206pdh',
            createdAt: '2026-04-15T00:00:00.000Z',
          },
          {
            id: 'profile-readme',
            title: 'Profile README',
            description: 'About, stack, and contact.',
            href: 'https://github.com/0206pdh/0206pdh',
            createdAt: '2026-04-09T00:00:00.000Z',
          },
        ],
      },
      {
        title: 'Repositories',
        summary: 'Public repositories.',
        items: [
          {
            id: 'repo-list',
            title: 'Public repositories',
            description: 'All public repositories.',
            href: 'https://github.com/0206pdh?tab=repositories',
            createdAt: '2026-04-15T00:00:00.000Z',
          },
        ],
      },
      {
        title: 'Activity',
        summary: 'GitHub activity.',
        items: [
          {
            id: 'github-activity',
            title: 'Contribution activity',
            description: 'Contribution graph and activity.',
            href: 'https://github.com/0206pdh',
            createdAt: '2026-04-15T00:00:00.000Z',
          },
        ],
      },
    ],
  },
]
