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
      className="flex items-center justify-center text-text-muted transition-[color,transform] duration-200 ease-out hover:text-text-primary active:scale-[0.9] active:duration-100"
    >
      {isDark ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  )
}

export default ThemeToggle
