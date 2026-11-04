import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import HeroArc from '../components/HeroArc'

function Home() {
  const navigate = useNavigate()

  return (
    <section className="container-content flex flex-col justify-center py-16 lg:min-h-[calc(100svh-4rem)] lg:py-12">
      <div className="grid items-center gap-x-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <p className="text-eyebrow">Port Harcourt, Nigeria — Operational Advisory</p>
          {/* fluid size keeps "you don't have a business." on one line beside the arc */}
          <h1 className="mt-8 text-balance text-hero text-[clamp(2rem,10.5vw,2.5rem)] md:text-[3.5rem] lg:text-[clamp(2.5rem,5vw,3.75rem)]">
            <span className="mb-4 block text-[1.25rem] font-medium leading-[1.4] tracking-[-0.01em] text-text-secondary md:text-[1.5rem]">
              Without defined systems and structure,
            </span>
            <span className="block">you don't have a{' '}business.</span>
            <span className="block">You have chaos operating at{' '}scale.</span>
          </h1>
          <p className="mt-6 max-w-[34rem] text-[1.125rem] leading-[1.65] text-text-secondary">
            Take CTRL of your business. Run our free diagnostic.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button
              label="Start with a diagnosis"
              size="lg"
              onClick={() => navigate('/diagnostic')}
            />
            <Link to="/services" className="text-link">
              Explore services <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="mt-12 lg:hidden">
            <HeroArc orientation="horizontal" />
          </div>
        </div>

        <div className="hidden justify-self-end lg:block">
          <HeroArc />
        </div>
      </div>
    </section>
  )
}

export default Home
