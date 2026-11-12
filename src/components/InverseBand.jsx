import { ThemeOverride, useTheme } from '../hooks/useTheme'

function InverseBand({ className = '', children, ...rest }) {
  const { theme } = useTheme()
  const inverse = theme === 'dark' ? 'light' : 'dark'

  return (
    <ThemeOverride theme={inverse}>
      <section
        data-theme={inverse}
        className={`bg-bg-primary text-text-primary transition-colors duration-300 ${className}`}
        {...rest}
      >
        {children}
      </section>
    </ThemeOverride>
  )
}

export default InverseBand
