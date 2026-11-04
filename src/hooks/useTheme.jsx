import { createContext, useContext, useEffect, useState } from 'react'

// Only an explicit toggle is stored. The key changed when light became the default,
// because the old key held 'dark' for every past visitor, chosen or not.
const STORAGE_KEY = 'insightctrl-theme-choice'
const BROWSER_BAR_COLOR = { light: '#FFFFFF', dark: '#070D1A' }
const ThemeContext = createContext(null)

function getInitialTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // localStorage can throw in private mode or with site data blocked
  }
  return 'light'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', BROWSER_BAR_COLOR[theme])
  }, [theme])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      // preference just will not persist
    }
  }

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}

// Re-scopes the theme for a subtree, so visuals that read the theme in JS match the
// tokens that a data-theme attribute re-scopes in CSS.
export function ThemeOverride({ theme, children }) {
  const context = useContext(ThemeContext)
  return <ThemeContext.Provider value={{ ...context, theme }}>{children}</ThemeContext.Provider>
}
