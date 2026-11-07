// Five signal traces. Revenue is the only one drawn in full; the rest are there but
// barely visible, the way a business without a system reads to its founder.
// Static on purpose: the page's one moment of motion is the arc.
const WIDTH = 440
const ROW = 56
const TOP = 28
const STEPS = 22

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

function trace(seed, baseline, swing, rise) {
  const rand = mulberry32(seed)
  const points = []
  for (let i = 0; i <= STEPS; i += 1) {
    const x = (i / STEPS) * WIDTH
    const y = baseline - (i / STEPS) * rise + (rand() - 0.5) * swing
    points.push(`${x.toFixed(1)},${y.toFixed(1)}`)
  }
  return points.join(' ')
}

const ROWS = Array.from({ length: 5 }, (_, i) => TOP + i * ROW)
const REVENUE = trace(7, ROWS[0] + 10, 16, 14)
const HIDDEN = ROWS.slice(1).map((y, i) => trace(31 + i * 11, y, 12, 0))
const HEIGHT = TOP + 4 * ROW + 24

function SignalTraces() {
  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="block h-auto w-full max-w-[440px]"
      role="img"
      aria-label="Five signal lines. Only revenue is visible; the other four are faint."
    >
      <text
        x="0"
        y={ROWS[0] - 16}
        fontSize="13"
        fontWeight="500"
        className="fill-text-primary"
      >
        Revenue
      </text>
      <polyline
        points={REVENUE}
        fill="none"
        strokeWidth="1.75"
        strokeLinejoin="round"
        strokeLinecap="round"
        className="stroke-text-primary"
      />
      {HIDDEN.map((points) => (
        <polyline
          key={points}
          points={points}
          fill="none"
          strokeWidth="1.5"
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeDasharray="2 6"
          className="stroke-text-muted"
          opacity="0.35"
        />
      ))}
    </svg>
  )
}

export default SignalTraces
