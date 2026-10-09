import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import StageCard from '../components/StageCard'
import EngagementTierCard from '../components/EngagementTierCard'
import DiagnosticQuestion from '../components/DiagnosticQuestion'
import DiagnosticResult from '../components/DiagnosticResult'
import DiagnosticGauge from '../components/DiagnosticGauge'
import { DIAGNOSTIC_STAGES, scoreToBand } from '../data/diagnosticStages'

const HOW_IT_WORKS = [
  {
    title: 'Run the diagnostic',
    body: 'Five free questions. One clear score.',
  },
  {
    title: 'See the root cause',
    body: 'Traced to the structural failure.',
  },
  {
    title: 'Choose how to work with us',
    body: 'Book a session, or bring us in to build.',
  },
]

function Diagnostic() {
  const navigate = useNavigate()
  const [selectedStageId, setSelectedStageId] = useState(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [direction, setDirection] = useState(1)

  const selectedStage = DIAGNOSTIC_STAGES.find((stage) => stage.id === selectedStageId) ?? null
  const isComplete = selectedStage && answers.length === selectedStage.questions.length

  const startStage = (stageId) => {
    setSelectedStageId(stageId)
    setQuestionIndex(0)
    setAnswers([])
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAnswer = (option) => {
    const nextAnswers = [...answers, option.score]
    setAnswers(nextAnswers)
    setDirection(1)
    if (nextAnswers.length < selectedStage.questions.length) {
      setQuestionIndex(nextAnswers.length)
    }
  }

  const handleBack = () => {
    if (questionIndex === 0) {
      setSelectedStageId(null)
      setAnswers([])
      return
    }
    setDirection(-1)
    setQuestionIndex(questionIndex - 1)
    setAnswers(answers.slice(0, -1))
  }

  const handleRestart = () => {
    setSelectedStageId(null)
    setQuestionIndex(0)
    setAnswers([])
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (selectedStage && !isComplete) {
    const currentQuestion = selectedStage.questions[questionIndex]
    const total = selectedStage.questions.length
    return (
      <div className="container-content py-20">
        <div className="mx-auto max-w-xl">
          <p className="text-eyebrow">
            Question {questionIndex + 1} of {total}
          </p>

          {/* Lives outside the keyed question so it persists and fills continuously */}
          <div className="mb-10 mt-4 h-px w-full bg-border">
            <div
              className="h-px origin-left bg-accent-blue transition-transform duration-300 ease-out"
              style={{ transform: `scaleX(${(questionIndex + 1) / total})` }}
            />
          </div>

          <AnimatePresence mode="popLayout" custom={direction}>
            <DiagnosticQuestion
              key={questionIndex}
              custom={direction}
              questionText={currentQuestion.text}
              options={currentQuestion.options}
              onAnswer={handleAnswer}
              onBack={handleBack}
              showBack
            />
          </AnimatePresence>
        </div>
      </div>
    )
  }

  if (selectedStage && isComplete) {
    const score = answers.reduce((total, value) => total + value, 0)
    const band = scoreToBand(score)
    const rootCause = selectedStage.results[band]
    const stageIndex = DIAGNOSTIC_STAGES.findIndex((stage) => stage.id === selectedStage.id)
    const nextStage = DIAGNOSTIC_STAGES[stageIndex + 1] ?? null

    return (
      <div className="container-content py-20">
        <div className="mx-auto max-w-xl">
          <DiagnosticResult
            stageName={selectedStage.name}
            score={score}
            band={band}
            rootCause={rootCause}
            nextStageName={nextStage?.name}
            onContinue={() => (nextStage ? startStage(nextStage.id) : navigate('/'))}
            onRestart={handleRestart}
          />
        </div>
      </div>
    )
  }

  return (
    <div className="container-content">
      <section className="grid items-center gap-x-10 py-12 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <p className="text-eyebrow">Take the free diagnostic</p>
          <h1 className="mt-5 text-section-headline">
            You may have been solving the wrong problem. Operational clarity starts with an
            honest diagnosis.
          </h1>
          <p className="mt-5 max-w-[32rem] text-body">
            You already know something is wrong. Pick the stage where the pain is loudest and
            find out what to fix first.
          </p>
        </div>

        <div className="hidden lg:block">
          <DiagnosticGauge />
        </div>
      </section>

      <section className="section-divider py-20">
        <p className="text-eyebrow">How it works</p>
        <div className="mt-8 flex flex-col divide-y divide-border sm:flex-row sm:divide-x sm:divide-y-0">
          {HOW_IT_WORKS.map((step) => (
            <div
              key={step.title}
              className="py-4 first:pt-0 last:pb-0 sm:flex-1 sm:px-6 sm:py-0 sm:first:pl-0"
            >
              <h3 className="text-[0.8125rem] font-semibold tracking-[-0.01em] text-text-primary">
                {step.title}
              </h3>
              <p className="mt-1.5 text-[0.8125rem] text-text-secondary">{step.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-divider py-20">
        <p className="text-eyebrow">The seven stages</p>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DIAGNOSTIC_STAGES.map((stage) => (
            <StageCard
              key={stage.id}
              name={stage.name}
              question={stage.question}
              symptoms={stage.symptoms}
              onDiagnosticClick={() => startStage(stage.id)}
              onBookClick={() => navigate('/book')}
            />
          ))}
        </div>
      </section>

      <section className="section-divider py-20">
        <p className="text-eyebrow">Work with us</p>
        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          <EngagementTierCard
            badge="Consult"
            title="Operating Room"
            description="Sixty minutes with an InsightCTRL advisor. Walk in with a question. Leave with a direction."
            ctaLabel="Book a session"
            onCtaClick={() => navigate('/book')}
          />
          <EngagementTierCard
            badge="Build"
            title="Full Build"
            description="The strategy is clear. The systems are not. We come in and build them with you."
            ctaLabel="Start a build"
            onCtaClick={() => navigate('/book')}
          />
          <EngagementTierCard
            badge="Partner"
            title="Partner"
            description="Some visions take longer than a project. We work with a select few founders as their long-term operational partner."
            ctaLabel="Apply to partner"
            onCtaClick={() => navigate('/book')}
            highlight
          />
        </div>
      </section>
    </div>
  )
}

export default Diagnostic
