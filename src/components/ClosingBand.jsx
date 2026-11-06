import { Link } from 'react-router-dom'
import IntakeButton from './IntakeButton'
import InverseBand from './InverseBand'

const DEFAULT_SECONDARY = { label: 'Run the free diagnostic', to: '/diagnostic' }

// Both paths through the site (the diagnostic, or the essays) end here, so the
// primary action is always booking. The secondary link offers the other path.
function ClosingBand({ secondary = DEFAULT_SECONDARY }) {
  return (
    <InverseBand className="py-24 md:py-32">
      <div className="container-content">
        {/* one sentence per line, so the two halves read as a pair */}
        <h2 className="text-balance text-hero">
          <span className="block">Insight into what is broken.</span>
          <span className="block">CTRL over how it gets fixed.</span>
        </h2>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <IntakeButton label="Book a session" size="lg" />
          <Link to={secondary.to} className="text-link">
            {secondary.label}
          </Link>
        </div>
      </div>
    </InverseBand>
  )
}

export default ClosingBand
