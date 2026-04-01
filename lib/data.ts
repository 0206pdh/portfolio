export type SkillIcon =
  | 'aws'
  | 'python'
  | 'fastapi'
  | 'docker'
  | 'typescript'
  | 'postgres'
  | 'redis'
  | 'langgraph'
  | 'javascript'
  | 'notion'
  | 'chrome'
  | 'three'
  | 'backend'
  | 'school'

export interface SkillTag {
  label: string
  icon: SkillIcon
  color: string
}

export interface CarouselCard {
  id: string
  section: string
  title: string
  subtitle: string
  summary: string
  period?: string
  href?: string
  metrics: { label: string; value: string }[]
  tags: SkillTag[]
}

const TAG = (label: string, icon: SkillIcon, color: string): SkillTag => ({ label, icon, color })

export const CARDS: CarouselCard[] = [
  {
    id: 'profile',
    section: 'Profile',
    title: 'Dohyun Park',
    subtitle: 'Cloud, backend, and interactive web portfolio',
    summary:
      'Computer Engineering student focused on AWS, backend systems, and practical implementation. Evolving to build premium, interactive experiences.',
    period: '2020 - 2026',
    metrics: [
      { label: 'School', value: 'Kwangwoon' },
      { label: 'Major', value: 'CSE' },
      { label: 'Focus', value: 'Cloud' },
    ],
    tags: [
      TAG('AWS', 'aws', '#f3b15e'),
      TAG('Python', 'python', '#7aaef4'),
      TAG('FastAPI', 'fastapi', '#68d8be'),
      TAG('Docker', 'docker', '#75acf5'),
      TAG('Three.js', 'three', '#d8dce2'),
    ],
  },
  {
    id: 'education',
    section: 'Education',
    title: 'Kwangwoon University',
    subtitle: 'Department of Computer Engineering',
    summary:
      'Studied Computer Engineering from March 2020 to February 2026, building foundations in software, algorithms, systems, and databases.',
    period: 'Mar 2020 - Feb 2026',
    metrics: [
      { label: 'Track', value: 'B.S.' },
      { label: 'Duration', value: '6 yrs' },
      { label: 'Theme', value: 'Core CS' },
    ],
    tags: [
      TAG('Computer Eng.', 'school', '#bbc1cf'),
      TAG('Algorithms', 'backend', '#f2b067'),
      TAG('Database', 'postgres', '#6ea2f3'),
      TAG('Software', 'school', '#8ad3b8'),
    ],
  },
  {
    id: 'fin_spring',
    section: 'Project',
    title: 'Financial Event-Driven Market Impact System',
    subtitle: 'Explainable backend pipeline for finance signals',
    summary:
      'Backend-focused system that transforms financial events into structured and explainable market impact signals.',
    href: 'https://github.com/0206pdh/fin_spring',
    metrics: [
      { label: 'Stack', value: 'FastAPI' },
      { label: 'Store', value: 'Redis' },
      { label: 'Theme', value: 'Finance' },
    ],
    tags: [
      TAG('FastAPI', 'fastapi', '#68d8be'),
      TAG('PostgreSQL', 'postgres', '#6ea2f3'),
      TAG('Redis', 'redis', '#ed8686'),
      TAG('LangGraph', 'langgraph', '#9ad469'),
      TAG('Docker', 'docker', '#75acf5'),
    ],
  },
  {
    id: 'yt_filter',
    section: 'Project',
    title: 'YouTube Live Comment Filter',
    subtitle: 'Extension plus backend for toxic comment handling',
    summary:
      'Chrome extension and FastAPI backend for filtering harmful live chat with local inference and deployable infrastructure.',
    href: 'https://github.com/0206pdh/youtube_live_comment_filter',
    metrics: [
      { label: 'Client', value: 'Chrome' },
      { label: 'Model', value: 'Local' },
      { label: 'Deploy', value: 'AWS' },
    ],
    tags: [
      TAG('Python', 'python', '#7aaef4'),
      TAG('FastAPI', 'fastapi', '#68d8be'),
      TAG('Chrome Ext.', 'chrome', '#89a8ff'),
      TAG('Docker', 'docker', '#75acf5'),
      TAG('Backend', 'backend', '#d8dce2'),
    ],
  },
  {
    id: 'algonotion',
    section: 'Project',
    title: 'AlgoNotion Extension',
    subtitle: 'Baekjoon workflow automation into Notion',
    summary:
      'Extension workflow that captures solved problems and syncs metadata into a structured Notion database.',
    href: 'https://github.com/0206pdh/AlgoNotion_Extention',
    metrics: [
      { label: 'Mode', value: 'Auto' },
      { label: 'Source', value: 'BOJ' },
      { label: 'Target', value: 'Notion' },
    ],
    tags: [
      TAG('JavaScript', 'javascript', '#efd369'),
      TAG('Notion API', 'notion', '#d8dce2'),
      TAG('Chrome Ext.', 'chrome', '#89a8ff'),
      TAG('TypeScript', 'typescript', '#6ea2f3'),
      TAG('Backend', 'backend', '#d8dce2'),
    ],
  },
]
