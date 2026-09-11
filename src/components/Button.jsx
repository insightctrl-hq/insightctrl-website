const VARIANT_CLASSES = {
  primary: 'bg-accent-blue text-white border border-accent-blue hover:border-accent-cyan',
  outline: 'bg-transparent text-text-primary border border-border hover:border-border-accent',
}

const SIZE_CLASSES = {
  sm: 'px-4 py-2 text-[13px]',
  md: 'px-5 py-3 text-[13px]',
  lg: 'px-6 py-3.5 text-[14px]',
}

function Button({
  label,
  onClick,
  variant = 'primary',
  size = 'md',
  type = 'button',
  className = '',
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-lg font-medium tracking-[-0.01em] transition-colors duration-200 ${VARIANT_CLASSES[variant]} ${SIZE_CLASSES[size]} ${className}`}
    >
      {label}
    </button>
  )
}

export default Button
