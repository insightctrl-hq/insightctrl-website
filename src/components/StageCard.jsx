import Button from './Button'

function StageCard({ name, question, symptoms, onDiagnosticClick, onBookClick }) {
  return (
    <div className="card-interactive flex h-full flex-col">
      <h3 className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-text-primary">{name}</h3>
      <p className="mt-2 text-body">{question}</p>

      {symptoms.length > 0 && (
        <ul className="mt-5 flex flex-1 flex-col gap-2 border-t border-border pt-5">
          {symptoms.map((symptom) => (
            <li key={symptom} className="text-[0.8125rem] leading-[1.6] text-text-muted">
              {symptom}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-6 flex flex-col gap-2">
        <Button label="Take this diagnostic" onClick={onDiagnosticClick} variant="primary" />
        <Button label="Book a session" onClick={onBookClick} variant="outline" />
      </div>
    </div>
  )
}

export default StageCard
