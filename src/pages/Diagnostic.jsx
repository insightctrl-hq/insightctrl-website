import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Button from '../components/Button'
import ClosingBand from '../components/ClosingBand'
import DiagnosticQuestion from '../components/DiagnosticQuestion'
import DiagnosticResult from '../components/DiagnosticResult'
import StageArcPicker from '../components/StageArcPicker'
import { DIAGNOSTIC_STAGES, scoreToBand } from '../data/diagnosticStages'

function Diagnostic() {
  const navigate = useNavigate()
  const panelRef = useRef(null)
  // the stage highlighted on the arc, before the visitor starts its questions
  const [pickedIndex, setPickedIndex] = useState(0)
  const [selectedStageId, setSelectedStageId] = useState(null)
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState([])
  const [direction, setDirection] = useState(1)

  const selectedStage = DIAGNOSTIC_STAGES.find((stage) => stage.id === selectedStageId) ?? null
  const isComplete = selectedStage && answers.length === selectedStage.questions.length

  const picked = DIAGNOSTIC_STAGES[pickedIndex]

  const pickStage = (index) => {
    setPickedIndex(index)
    // On narrow screens the stage details sit below the arc, so bring them into
    // view; on wide screens they are already beside it.
    if (!window.matchMedia('(min-width: 1024px)').matches) {
      requestAnimationFrame(() =>
        panelRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' }),
      )
    }
  }

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
      <div className="container-content pb-24 pt-16 md:pt-20">
        <div>
          <DiagnosticResult
            stageName={selectedStage.name}
            stageIndex={stageIndex}
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
    <>
      <section className="container-content pb-24 pt-16 md:pt-24">
        <div className="max-w-[46rem]">
          <h1 className="text-balance text-hero">You may have been solving the wrong problem.</h1>
          <p className="text-lead mt-6">Operational clarity starts with an honest diagnosis.</p>
          <p className="mt-4 max-w-[36rem] text-body">
            Every visible problem in a business traces back to a broken earlier stage. Pick the
            stage where the pain is loudest and find out what to fix first.
          </p>
        </div>

        <div className="mt-16 grid items-start gap-x-20 gap-y-12 lg:grid-cols-[380px_minmax(0,1fr)]">
          <StageArcPicker
            stages={DIAGNOSTIC_STAGES}
            selectedIndex={pickedIndex}
            onSelect={pickStage}
          />

          <div ref={panelRef} className="scroll-mt-24 lg:sticky lg:top-28">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={picked.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
                aria-live="polite"
              >
                <p className="text-eyebrow">
                  Stage {pickedIndex + 1} of {DIAGNOSTIC_STAGES.length}
                </p>
                <h2 className="mt-3 text-section-headline">{picked.name}</h2>
                <p className="text-lead mt-5 max-w-[32rem] text-balance text-text-primary">{picked.question}</p>
                <ul className="mt-8 max-w-[32rem] space-y-3">
                  {picked.symptoms.map((symptom) => (
                    <li key={symptom} className="text-body">
                      {symptom}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Button
                    label={`Run the ${picked.name} diagnostic`}
                    size="lg"
                    onClick={() => startStage(picked.id)}
                  />
                  <span className="text-[0.9375rem] text-text-muted">
                    {picked.questions.length} questions
                  </span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <ClosingBand secondary={{ label: 'Read our Insights', to: '/insights' }} />
    </>
  )
}

export default Diagnostic
