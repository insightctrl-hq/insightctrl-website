import { createContext, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'insightctrl-theme'
const ThemeContext = createContext(null)

function getInitialTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'light' || stored === 'dark') return stored
  } catch {
    // localStorage can throw in private mode or with site data blocked
  }
  return 'dark'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // preference just will not persist
    }
  }, [theme])

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))

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
