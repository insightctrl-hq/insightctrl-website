import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ROUTES } from '../constants/routes'
import IntakeButton from './IntakeButton'
import ThemeToggle from './ThemeToggle'
import { useTheme } from '../hooks/useTheme'

function Nav() {
  const location = useLocation()
  const { theme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)
  const logoSrc = theme === 'light' ? '/logo-light.png' : '/logo.png'

  useEffect(() => {
    if (!menuOpen) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <header className="nav-material fixed top-0 left-0 right-0 z-50 border-b border-border print:hidden">
      <div className="container-content flex h-16 items-center justify-between">
        <Link to="/" onClick={closeMenu} className="flex items-center">
          <img src={logoSrc} alt="InsightCTRL" className="w-[132px]" />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {ROUTES.map((route) => {
            const isActive = location.pathname === route.path
            return (
              <Link
                key={route.path}
                to={route.path}
                className={`relative py-1 text-[0.8125rem] font-medium transition-colors ${
                  isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {route.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-accent-blue" />
                )}
              </Link>
            )
          })}
          <ThemeToggle />
          <IntakeButton label="Book a session" size="sm" />
        </nav>

        <button
          type="button"
          className="flex flex-col gap-[5px] p-1 transition-transform duration-200 ease-out active:scale-[0.9] active:duration-100 md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span
            className={`h-px w-5 bg-text-primary transition-transform duration-200 ${
              menuOpen ? 'translate-y-[6px] rotate-45' : ''
            }`}
          />
          <span
            className={`h-px w-5 bg-text-primary transition-opacity duration-200 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`h-px w-5 bg-text-primary transition-transform duration-200 ${
              menuOpen ? '-translate-y-[6px] -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          // Enters from the bar that opened it and leaves the same way. A critically
          // damped spring keeps it interruptible if the toggle is tapped mid-flight.
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.3 }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 bg-bg-primary md:hidden"
          >
            <nav className="container-content flex flex-col items-start gap-7 pt-16">
              {ROUTES.map((route) => {
                const isActive = location.pathname === route.path
                return (
                  <Link
                    key={route.path}
                    to={route.path}
                    onClick={closeMenu}
                    className={`text-[1.75rem] font-semibold tracking-[-0.02em] ${
                      isActive ? 'text-text-primary' : 'text-text-secondary'
                    }`}
                  >
                    {route.label}
                  </Link>
                )
              })}
              <div className="mt-4 flex items-center gap-5">
                <ThemeToggle />
                <IntakeButton label="Book a session" size="md" />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Nav
