import { Link, useNavigate } from 'react-router-dom'
import Button from './Button'
import InverseBand from './InverseBand'

function ClosingBand() {
  const navigate = useNavigate()

  return (
    <InverseBand className="py-24 md:py-28">
      <div className="container-content">
        <h2 className="text-balance text-hero">
          <span className="block">Insight into what is broken.</span>
          <span className="block text-accent-link">CTRL over how it gets fixed.</span>
        </h2>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Button
            label="Start with a diagnosis"
            size="lg"
            arrow
            onClick={() => navigate('/diagnostic')}
          />
          <Link to="/book" className="text-link">
            Book a session <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </InverseBand>
  )
}

export default ClosingBand
