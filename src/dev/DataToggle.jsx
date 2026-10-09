// Dev-only chrome for the break-ui pass. Plain on purpose: it is not part of the
// design under test. Rendered only when import.meta.env.DEV is true.
import { useSearchParams } from 'react-router-dom'
import { DATA_MODES, useDataMode } from './worstCase'

const LABELS = { demo: 'Demo data', worst: 'Worst case', empty: 'Empty', one: 'One' }

function DataToggle() {
  const [params, setParams] = useSearchParams()
  const mode = useDataMode()

  const select = (next) => {
    const updated = new URLSearchParams(params)
    if (next === 'demo') updated.delete('data')
    else updated.set('data', next)
    setParams(updated, { replace: true })
  }

  return (
    <div
      className="print:hidden"
      style={{
        position: 'fixed',
        bottom: 16,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        display: 'flex',
        gap: 2,
        padding: 3,
        borderRadius: 999,
        background: '#e5e7eb',
        font: '12px system-ui, sans-serif',
      }}
    >
      {DATA_MODES.map((m) => (
        <button
          key={m}
          type="button"
          onClick={() => select(m)}
          style={{
            padding: '5px 10px',
            borderRadius: 999,
            border: 0,
            cursor: 'pointer',
            background: m === mode ? '#fff' : 'transparent',
            color: '#111',
          }}
        >
          {LABELS[m]}
        </button>
      ))}
    </div>
  )
}

export default DataToggle
