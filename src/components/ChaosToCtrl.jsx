import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { DIAGNOSTIC_STAGES } from '../data/diagnosticStages'

const EASE_OUT = [0.23, 1, 0.32, 1]

function ChaosToCtrl() {
  return (
    <section className="section-divider pb-20 pt-6">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Sticky only on desktop: in a single column it would pin over the cards */}
        <div className="lg:sticky lg:top-40 lg:col-span-5 lg:self-start">
          <p className="text-eyebrow">Our framework</p>
          <h2 className="mt-5 text-section-headline">From Chaos to CTRL.</h2>
          <p className="mt-5 text-body">
            A seven-stage operational engineering sequence that moves a business from structural
            chaos to founder control. Every visible problem in a business traces back to a broken
            earlier stage. We find that stage and build from there.
          </p>
          <Link
            to="/thinking"
            className="mt-5 inline-block text-[0.8125rem] font-medium text-accent-cyan transition-colors hover:text-text-primary"
          >
            Learn more →
          </Link>
        </div>

        <ol className="flex flex-col gap-4 lg:col-span-7">
          {DIAGNOSTIC_STAGES.map((stage, i) => (
            <motion.li
              key={stage.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -80px 0px' }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              className="card"
            >
              <p className="text-eyebrow tabular-nums">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="mt-3 text-[1.0625rem] font-semibold tracking-[-0.01em] text-text-primary">
                {stage.name}
              </h3>
              <p className="mt-2 text-body">{stage.question}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default ChaosToCtrl
