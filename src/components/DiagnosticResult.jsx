import { motion } from 'framer-motion'
import Badge from './Badge'
import Button from './Button'
import { TALLY_URL, TALLY_RESULTS_FORM_ID } from '../constants/links'
import { openTallyPopup } from '../lib/tally'

// One status colour per rating, shared by the card's top rule and the badge.
// Cyan stays reserved for the arc's pulse, so Strong reads as green.
const BAND_STYLE = {
  Strong: { rule: 'border-t-success', badge: 'success' },
  Partial: { rule: 'border-t-warning', badge: 'warning' },
  Critical: { rule: 'border-t-danger', badge: 'danger' },
}

const EMAIL_GIVEN_KEY = 'insightctrl-results-email-given'

const printDate = new Date().toLocaleDateString('en-GB', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

function rememberEmailGiven() {
  try {
    sessionStorage.setItem(EMAIL_GIVEN_KEY, '1')
  } catch {
    // storage blocked: they'll just be asked again next time
  }
}

function hasGivenEmail() {
  try {
    return sessionStorage.getItem(EMAIL_GIVEN_KEY) === '1'
  } catch {
    return false
  }
}

function DiagnosticResult({
  stageName,
  score,
  band,
  rootCause,
  nextStageName,
  onContinue,
  onRestart,
}) {
  const style = BAND_STYLE[band] ?? BAND_STYLE.Critical

  // Scores and stage only, never personal data, so the booking form arrives
  // with context. Tally ignores these unless the form has matching hidden fields.
  const bookingUrl = `${TALLY_URL}?${new URLSearchParams({
    source: 'diagnostic',
    stage: stageName,
    band,
    score: String(score),
  })}`

  const handleBook = () => window.open(bookingUrl, '_blank', 'noopener,noreferrer')

  const handlePrint = async () => {
    if (!TALLY_RESULTS_FORM_ID || hasGivenEmail()) {
      window.print()
      return
    }
    let submitted = false
    try {
      await openTallyPopup(TALLY_RESULTS_FORM_ID, {
        layout: 'modal',
        width: 420,
        autoClose: 800,
        hiddenFields: { stage: stageName, band, score: String(score) },
        onSubmit: () => {
          submitted = true
          rememberEmailGiven()
        },
        // Print after the popup has gone, so it isn't on the page
        onClose: () => {
          if (submitted) setTimeout(() => window.print(), 300)
        },
      })
    } catch {
      // Tally blocked (ad blocker, offline): don't strand the visitor
      window.print()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
      className="w-full"
    >
      <div className="mb-8 hidden items-center justify-between print:flex">
        <img src="/logo-light.png" alt="InsightCTRL" className="w-[120px]" />
        <p className="text-eyebrow">{printDate}</p>
      </div>

      <div
        className={`overflow-hidden rounded-xl border border-t-4 border-border bg-bg-surface ${style.rule}`}
      >
        <div className="p-6 sm:p-8">
          <p className="text-eyebrow">{stageName}</p>

          <div className="mt-4 flex items-center gap-3">
            <Badge label={band} variant={style.badge} />
            <span className="text-[0.8125rem] tabular-nums text-text-secondary">
              {score} of 20
            </span>
          </div>

          <p className="text-lead mt-8 border-t border-border pt-8 text-text-primary">
            {rootCause}
          </p>
        </div>

        <div className="border-t border-border bg-bg-primary p-6 sm:p-8 print:hidden">
          {/* same approved copy and price as the Operating Room on Services */}
          <h3 className="text-[1.375rem] font-bold tracking-[-0.01em] text-text-primary">
            Operating Room
          </h3>
          <p className="mt-2 text-body">
            One hour on one specific question or task. You get a written diagnostic report
            within 24 hours.
          </p>
          <p className="mt-4 text-[1.0625rem] font-medium text-text-primary">₦50,000</p>
          <Button
            label="Book a session"
            onClick={handleBook}
            variant="primary"
            className="mt-6 w-full sm:w-auto"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row print:hidden">
        <Button
          label={nextStageName ? `Continue to ${nextStageName}` : 'Return to home'}
          onClick={onContinue}
          variant="outline"
        />
        <Button label="Print my results" onClick={handlePrint} variant="outline" />
      </div>

      <button
        type="button"
        onClick={onRestart}
        className="mt-6 text-[0.8125rem] text-text-secondary transition-colors hover:text-text-primary print:hidden"
      >
        Take another diagnostic
      </button>
    </motion.div>
  )
}

export default DiagnosticResult
