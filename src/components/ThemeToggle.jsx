import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex items-center justify-center text-text-muted transition-colors hover:text-text-primary"
    >
      {isDark ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  )
}

export default ThemeToggle
