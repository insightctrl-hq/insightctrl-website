import { motion } from 'framer-motion'
import Button from './Button'
import { TALLY_RESULTS_FORM_ID } from '../constants/links'
import { openTallyPopup, rememberContactGiven } from '../lib/tally'

// Shown once, between the last answer and the results. The Tally form collects a
// name and WhatsApp number; stage, band and score arrive as hidden fields so each
// contact comes with the weak stage already known.
function DiagnosticContactGate({ stageName, band, score, onUnlock }) {
  const unlock = () => {
    rememberContactGiven()
    onUnlock()
  }

  const handleShow = async () => {
    try {
      await openTallyPopup(TALLY_RESULTS_FORM_ID, {
        layout: 'modal',
        width: 420,
        autoClose: 800,
        hiddenFields: { stage: stageName, band, score: String(score) },
        onSubmit: unlock,
      })
    } catch {
      // Tally blocked (ad blocker, offline): don't strand the visitor
      unlock()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
      className="mx-auto max-w-xl"
    >
      <p className="text-eyebrow">{stageName}</p>
      <h1 className="mt-3 text-balance text-section-headline">Where should we send your results?</h1>
      <div className="mt-10">
        <Button label="Show my results" size="lg" onClick={handleShow} />
      </div>
    </motion.div>
  )
}

export default DiagnosticContactGate
