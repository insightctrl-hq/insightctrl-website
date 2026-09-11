function Card({ children, highlight = false, className = '' }) {
  return (
    <div
      className={`rounded-xl border bg-bg-surface p-5 transition-colors duration-200 ${
        highlight ? 'border-border-accent' : 'border-border hover:border-border-accent'
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default Card
