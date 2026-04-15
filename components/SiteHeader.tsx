import { SocialLink, socialLinks } from '@/lib/siteContent'

type SiteHeaderProps = {
  showManage?: boolean
}

export function SocialIcon({ id }: { id: SocialLink['id'] }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: '0 0 24 24',
    fill: 'none',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true,
  }

  switch (id) {
    case 'email':
      return (
        <svg {...common}>
          <path d="M4.5 7.5h15v9h-15v-9Z" stroke="currentColor" strokeWidth="1.8" />
          <path d="m5.5 8.2 6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      )
    case 'github':
      return (
        <svg {...common}>
          <path
            d="M12 3.8a8.2 8.2 0 0 0-2.6 16c.4.1.5-.2.5-.4v-1.6c-2.2.5-2.7-.9-2.7-.9-.4-.9-.9-1.1-.9-1.1-.7-.5.1-.5.1-.5.8.1 1.2.9 1.2.9.7 1.2 1.9.9 2.3.7.1-.5.3-.9.5-1.1-1.8-.2-3.6-.9-3.6-4 0-.9.3-1.6.8-2.2-.1-.2-.4-1 .1-2.1 0 0 .7-.2 2.2.8.7-.2 1.4-.3 2.1-.3.7 0 1.4.1 2.1.3 1.6-1 2.2-.8 2.2-.8.5 1.1.2 1.9.1 2.1.5.6.8 1.3.8 2.2 0 3.1-1.9 3.8-3.6 4 .3.3.5.7.5 1.4v2.2c0 .2.2.5.5.4A8.2 8.2 0 0 0 12 3.8Z"
            fill="currentColor"
          />
        </svg>
      )
    case 'velog':
      return (
        <svg {...common}>
          <path d="M5 6h3.4l3.3 8.6L15 6h3.4l-5.2 12h-3L5 6Z" fill="currentColor" />
        </svg>
      )
    case 'instagram':
      return (
        <svg {...common}>
          <rect x="5" y="5" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="16.4" cy="7.7" r="1" fill="currentColor" />
        </svg>
      )
    default:
      return null
  }
}

export default function SiteHeader({ showManage = false }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <a className="brand" href="/">
        Dohyun Park
      </a>
      <nav className="top-nav" aria-label="Main categories">
        {showManage && (
          <a href="/manage" aria-current="page">
            Manage
          </a>
        )}
      </nav>
      <div className="social-nav" aria-label="Contact links">
        {socialLinks.map((link) => (
          <a key={link.id} href={link.href} target={link.id === 'email' ? undefined : '_blank'} rel="noreferrer" aria-label={link.label}>
            <SocialIcon id={link.id} />
          </a>
        ))}
      </div>
    </header>
  )
}
