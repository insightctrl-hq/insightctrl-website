import { motion, useIsPresent } from 'framer-motion'

// direction is 1 when moving forward and -1 when going back, so a question
// returns along the same path it left by.
const VARIANTS = {
  enter: (direction) => ({ opacity: 0, x: 24 * direction }),
  center: { opacity: 1, x: 0 },
  exit: (direction) => ({ opacity: 0, x: -24 * direction }),
}

function DiagnosticQuestion({
  custom = 1,
  questionText,
  options,
  onAnswer,
  onBack,
  showBack = false,
}) {
  const isPresent = useIsPresent()

  return (
    <motion.div
      custom={custom}
      variants={VARIANTS}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
      className={`w-full ${isPresent ? '' : 'pointer-events-none'}`}
    >
      <h2 className="text-[1.75rem] font-semibold leading-[1.25] tracking-[-0.01em] text-text-primary">
        {questionText}
      </h2>

      <div className="mt-8 flex flex-col gap-2">
        {options.map((option) => (
          <button
            key={option.label}
            type="button"
            onClick={() => onAnswer(option)}
            className="rounded-xl border border-border bg-bg-surface px-5 py-4 text-left text-[0.875rem] leading-[1.6] text-text-primary transition-[border-color,transform] duration-200 ease-out hover:border-border-accent active:scale-[0.985] active:duration-100"
          >
            {option.label}
          </button>
        ))}
      </div>

      {showBack && (
        <button
          type="button"
          onClick={onBack}
          className="mt-8 text-[0.8125rem] text-text-secondary transition-colors hover:text-text-primary"
        >
          Back
        </button>
      )}
    </motion.div>
  )
}

export default DiagnosticQuestion
