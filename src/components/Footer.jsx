import { Link } from 'react-router-dom'
import { ROUTES } from '../constants/routes'
import { SOCIAL_LINKS, CONTACT_EMAIL } from '../constants/links'
import { useTheme } from '../hooks/useTheme'

const LINK_CLASS =
  'text-[0.8125rem] text-text-secondary transition-colors hover:text-text-primary'

function Footer() {
  const { theme } = useTheme()

  return (
    <footer className="border-t border-border print:hidden">
      <div className="container-content grid grid-cols-1 gap-12 py-16 md:grid-cols-3">
        <div>
          <img
            src={theme === 'light' ? '/logo-light.png' : '/logo.png'}
            alt="InsightCTRL"
            className="w-[132px]"
          />
          <p className="mt-5 text-body">Strategy, structure, and operational clarity.</p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-eyebrow">Navigate</p>
          {ROUTES.map((route) => (
            <Link key={route.path} to={route.path} className={LINK_CLASS}>
              {route.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-eyebrow">Elsewhere</p>
          <a href={SOCIAL_LINKS.x} target="_blank" rel="noopener noreferrer" className={LINK_CLASS}>
            X
          </a>
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK_CLASS}
          >
            LinkedIn
          </a>
          <a
            href={SOCIAL_LINKS.substack}
            target="_blank"
            rel="noopener noreferrer"
            className={LINK_CLASS}
          >
            Substack
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className={LINK_CLASS}>
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-content py-6">
          <p className="text-[0.6875rem] tracking-[0.08em] text-text-muted">
            © {new Date().getFullYear()} InsightCTRL
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
