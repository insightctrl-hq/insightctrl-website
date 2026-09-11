import { motion } from 'framer-motion'
import Badge from './Badge'
import Button from './Button'

const BAND_VARIANT = {
  Strong: 'success',
  Partial: 'pending',
  Critical: 'default',
}

function DiagnosticResult({ stageName, score, band, rootCause, onBook, onBuild }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="w-full"
    >
      <p className="text-eyebrow">{stageName}</p>

      <div className="mt-4 flex items-center gap-3">
        <Badge label={band} variant={BAND_VARIANT[band] ?? 'default'} />
        <span className="text-[13px] text-text-secondary">{score} of 20</span>
      </div>

      <p className="mt-8 border-t border-border pt-8 text-[18px] leading-[1.6] text-text-primary">
        {rootCause}
      </p>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <Button label="Book Operating Room" onClick={onBook} variant="primary" />
        <Button label="Full Build" onClick={onBuild} variant="outline" />
      </div>
    </motion.div>
  )
}

export default DiagnosticResult
