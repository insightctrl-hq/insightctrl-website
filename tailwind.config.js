/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  // hover: only applies on devices with a real pointer, so taps on phones don't
  // leave borders stuck in their hover colour
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      // The stock curves are too weak to feel intentional
      transitionTimingFunction: {
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
      colors: {
        'bg-primary': 'var(--bg-primary)',
        'bg-surface': 'var(--bg-surface)',
        'bg-elevated': 'var(--bg-elevated)',
        border: 'var(--border)',
        'border-accent': 'var(--border-accent)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'accent-blue': 'var(--accent-blue)',
        'accent-cyan': 'var(--accent-cyan)',
        'accent-link': 'var(--accent-link)',
        success: 'var(--success)',
        pending: 'var(--pending)',
        warning: 'var(--warning)',
        danger: 'var(--danger)',
      },
      fontFamily: {
        sans: ['Satoshi', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(90deg, #2563EB, #06B6D4)',
      },
      borderWidth: {
        DEFAULT: 'var(--border-width)',
      },
      boxShadow: {
        none: 'none',
      },
    },
  },
  plugins: [],
}
