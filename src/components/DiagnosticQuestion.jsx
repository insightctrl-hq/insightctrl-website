import { motion, useIsPresent } from 'framer-motion'

function DiagnosticQuestion({
  questionNumber,
  total,
  questionText,
  options,
  onAnswer,
  onBack,
  showBack = false,
}) {
  const isPresent = useIsPresent()

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`w-full ${isPresent ? '' : 'pointer-events-none'}`}
    >
      <p className="text-eyebrow">
        Question {questionNumber} of {total}
      </p>

      <div className="mt-4 h-px w-full bg-border">
        <div
          className="h-px bg-accent-blue transition-all duration-300"
          style={{ width: `${(questionNumber / total) * 100}%` }}
        />
      </div>

      <h2 className="mt-10 text-[28px] font-semibold leading-[1.25] tracking-[-0.01em] text-text-primary">
        {questionText}
      </h2>

      <div className="mt-8 flex flex-col gap-2">
        {options.map((option) => (
          <button
            key={option.label}
            type="button"
            onClick={() => onAnswer(option)}
            className="rounded-xl border border-border bg-bg-surface px-5 py-4 text-left text-[14px] leading-[1.6] text-text-primary transition-colors duration-200 hover:border-border-accent"
          >
            {option.label}
          </button>
        ))}
      </div>

      {showBack && (
        <button
          type="button"
          onClick={onBack}
          className="mt-8 text-[13px] text-text-secondary transition-colors hover:text-text-primary"
        >
          Back
        </button>
      )}
    </motion.div>
  )
}

export default DiagnosticQuestion
