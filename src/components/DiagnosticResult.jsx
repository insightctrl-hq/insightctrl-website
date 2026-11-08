import { motion } from 'framer-motion'
import Button from './Button'
import StageArcPicker from './StageArcPicker'
import { DIAGNOSTIC_STAGES } from '../data/diagnosticStages'
import { TALLY_URL, TALLY_RESULTS_FORM_ID } from '../constants/links'
import { openTallyPopup } from '../lib/tally'

// The rating decides the next step. A Strong score moves on to the next stage; a
// Partial or Critical one is where a session helps most, so booking leads.
const BOOKING_FIRST = new Set(['Partial', 'Critical'])

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
  stageIndex,
  score,
  band,
  rootCause,
  nextStageName,
  onContinue,
  onRestart,
}) {
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

  const bookingFirst = BOOKING_FIRST.has(band)
  const continueLabel = nextStageName ? `Continue to ${nextStageName}` : 'Return to home'
  const nextIndex = nextStageName ? stageIndex + 1 : null

  // same approved copy and price as the Operating Room on Services
  const operatingRoom = (
    <>
      <h2 className="text-[1.375rem] font-bold tracking-[-0.01em] text-text-primary">
        Operating Room
      </h2>
      <p className="mt-2 max-w-[32rem] text-body">
        One hour on one specific question or task. You get a written diagnostic report within
        24 hours.
      </p>
      <p className="mt-4 text-[1.0625rem] font-medium text-text-primary">₦50,000</p>
    </>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
      className="w-full"
    >
      <div className="mb-8 hidden items-center justify-between print:flex">
        <img src="/logo-light.png" alt="InsightCTRL" className="w-[120px]" />
        <p className="text-eyebrow">{printDate}</p>
      </div>

      <div className="grid items-start gap-x-20 gap-y-14 lg:grid-cols-[300px_minmax(0,1fr)]">
        {/* the arc sits beside the verdict on wide screens and after it on phones */}
        <div className="order-2 mx-auto w-full max-w-[240px] lg:order-1 lg:mx-0 lg:max-w-none print:hidden">
          <StageArcPicker
            stages={DIAGNOSTIC_STAGES}
            selectedIndex={stageIndex}
            nextIndex={nextIndex}
            readOnly
          />
        </div>

        <div className="order-1 max-w-[40rem] lg:order-2">
          <p className="text-eyebrow">{stageName}</p>
          <h1 className="mt-3 text-hero">{band}</h1>
          <p className="mt-3 text-[0.9375rem] tabular-nums text-text-muted">{score} of 20 points</p>
          <p className="text-lead mt-8 text-text-primary">{rootCause}</p>

          <div className="mt-12 border-t border-border pt-10 print:hidden">
            {bookingFirst ? (
              <>
                {operatingRoom}
                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                  <Button label="Book the Operating Room" onClick={handleBook} size="lg" />
                  <button type="button" onClick={onContinue} className="text-link">
                    {continueLabel}
                  </button>
                </div>
              </>
            ) : (
              <>
                <Button label={continueLabel} onClick={onContinue} size="lg" />
                <div className="mt-12">{operatingRoom}</div>
                <button type="button" onClick={handleBook} className="text-link mt-5">
                  Book the Operating Room
                </button>
              </>
            )}

            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
              <button type="button" onClick={handlePrint} className="text-link text-[0.9375rem]">
                Print my results
              </button>
              <button
                type="button"
                onClick={onRestart}
                className="text-[0.9375rem] text-text-muted transition-colors hover:text-text-primary"
              >
                Take another diagnostic
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default DiagnosticResult
