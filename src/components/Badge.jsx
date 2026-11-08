// Status label for a diagnostic rating. Colour carries the rating; no tracking or
// caps, so it reads as a word, not a stamp.
const VARIANT_CLASSES = {
  success: 'text-success',
  warning: 'text-warning',
  danger: 'text-danger',
}

function Badge({ label, variant }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center whitespace-nowrap rounded border border-border px-2 py-1 text-[0.8125rem] font-medium ${VARIANT_CLASSES[variant] ?? 'text-text-muted'}`}
    >
      {label}
    </span>
  )
}

export default Badge
