import { Link, useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import HeroArc from '../components/HeroArc'

function Home() {
  const navigate = useNavigate()

  return (
    <section className="container-content flex flex-col justify-center py-16 lg:min-h-[calc(100svh-4rem)] lg:py-12">
      <div className="grid items-center gap-x-12 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <h1 className="text-balance text-[clamp(2rem,9.2vw,2.75rem)] font-bold leading-[1.02] tracking-[-0.03em] text-text-primary md:text-[3.75rem] lg:text-[clamp(3rem,5.2vw,4.4375rem)]">
            <span className="text-lead mb-5 block md:text-[1.375rem]">
              Without defined systems and structure,
            </span>
            <span className="block">you don't have a{' '}business.</span>
            <span className="block">You have chaos operating at{' '}scale.</span>
          </h1>
          <p className="text-lead mt-8 max-w-[36rem]">
            Take CTRL of your business. Run our free diagnostic.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Button
              label="Run the free diagnostic"
              size="lg"
              onClick={() => navigate('/diagnostic')}
            />
            <Link to="/insights" className="text-link">
              Read our Insights
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
