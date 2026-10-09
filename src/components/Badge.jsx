const VARIANT_CLASSES = {
  default: 'text-text-muted',
  success: 'text-success',
  pending: 'text-pending',
  pro: 'text-accent-cyan',
  warning: 'text-warning',
  danger: 'text-danger',
}

function Badge({ label, variant = 'default' }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center whitespace-nowrap rounded border border-border px-2 py-1 text-[0.6875rem] font-medium tracking-[0.08em] ${VARIANT_CLASSES[variant]}`}
    >
      {label}
    </span>
  )
}

export default Badge
