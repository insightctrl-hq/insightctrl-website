const VARIANT_CLASSES = {
  default: 'text-text-muted',
  success: 'text-success',
  pending: 'text-pending',
  pro: 'text-accent-cyan',
}

function Badge({ label, variant = 'default' }) {
  return (
    <span
      className={`inline-flex items-center rounded border border-border px-2 py-1 text-[11px] font-medium tracking-[0.08em] ${VARIANT_CLASSES[variant]}`}
    >
      {label}
    </span>
  )
}

export default Badge
