import { useTheme } from '../hooks/useTheme'

const STEP = 60
const W = 900
const H = 460
const ARC_R = 190

function mulberry32(seed) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// Generated once at module load so the texture never reshuffles between renders.
const { crosshairs, tickRuns } = (() => {
  const rand = mulberry32(84021)
  const cols = Math.floor(W / STEP)
  const rows = Math.floor(H / STEP)

  const picked = new Set()
  const marks = []
  while (marks.length < 13) {
    const cx = (1 + Math.floor(rand() * (cols - 1))) * STEP
    const cy = (1 + Math.floor(rand() * (rows - 1))) * STEP
    const key = `${cx}:${cy}`
    if (picked.has(key)) continue
    picked.add(key)
    marks.push({ x: cx, y: cy })
  }

  const runs = []
  for (let i = 0; i < 3; i += 1) {
    const y = (1 + Math.floor(rand() * (rows - 1))) * STEP
    const from = Math.floor(rand() * 4) * STEP
    runs.push({ y, from, to: from + STEP * (2 + Math.floor(rand() * 3)) })
  }

  return { crosshairs: marks, tickRuns: runs }
})()

function BlueprintGrid() {
  const { theme } = useTheme()
  const ink = theme === 'light' ? '#0A0F1E' : '#FFFFFF'

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <pattern id="blueprint-grid" width={STEP} height={STEP} patternUnits="userSpaceOnUse">
          <path
            d={`M ${STEP} 0 L 0 0 0 ${STEP}`}
            fill="none"
            stroke={ink}
            strokeOpacity="0.04"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#blueprint-grid)" />

      <g stroke={ink} strokeOpacity="0.08" strokeWidth="1">
        {crosshairs.map((mark) => (
          <g key={`${mark.x}-${mark.y}`}>
            <line x1={mark.x - 3} y1={mark.y} x2={mark.x + 3} y2={mark.y} />
            <line x1={mark.x} y1={mark.y - 3} x2={mark.x} y2={mark.y + 3} />
          </g>
        ))}
      </g>

      <g stroke={ink} strokeOpacity="0.06" strokeWidth="1">
        {tickRuns.map((run) =>
          Array.from({ length: Math.floor((run.to - run.from) / 10) }, (_, i) => {
            const x = run.from + i * 10
            return <line key={`${run.y}-${x}`} x1={x} y1={run.y} x2={x} y2={run.y - 3} />
          }),
        )}
      </g>

      <g fill="none" stroke={ink} strokeOpacity="0.05" strokeWidth="1">
        <path d={`M ${W - ARC_R} 0 A ${ARC_R} ${ARC_R} 0 0 1 ${W} ${ARC_R}`} />
        <path d={`M 0 ${H - ARC_R} A ${ARC_R} ${ARC_R} 0 0 0 ${ARC_R} ${H}`} />
      </g>
    </svg>
  )
}

export default BlueprintGrid
