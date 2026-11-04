import { useEffect, useState } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'

const STEP = 60
const W = 900
const H = 460
const ARC_R = 190
const CIRCUIT_SECONDS = 8

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

// Every vertex is a multiple of STEP, so the pulse only ever travels along lines
// the grid actually draws. Closing the loop lets the dash animation wrap without
// a visible jump at the end of each circuit.
const CIRCUIT = [
  [120, 60],
  [360, 60],
  [360, 120],
  [540, 120],
  [540, 240],
  [300, 240],
  [300, 180],
  [120, 180],
]

const CIRCUIT_D = `${CIRCUIT.map(([x, y], i) => `${i ? 'L' : 'M'} ${x} ${y}`).join(' ')} Z`

const SEGMENTS = CIRCUIT.map(([x1, y1], i) => {
  const [x2, y2] = CIRCUIT[(i + 1) % CIRCUIT.length]
  return { x1, y1, x2, y2, len: Math.hypot(x2 - x1, y2 - y1) }
})

const CIRCUIT_LEN = SEGMENTS.reduce((total, seg) => total + seg.len, 0)

const BOUNDS = {
  x1: Math.min(...CIRCUIT.map(([x]) => x)),
  y1: Math.min(...CIRCUIT.map(([, y]) => y)),
  x2: Math.max(...CIRCUIT.map(([x]) => x)),
  y2: Math.max(...CIRCUIT.map(([, y]) => y)),
}

function pointAt(distance) {
  let remaining = distance % CIRCUIT_LEN
  for (const seg of SEGMENTS) {
    if (remaining <= seg.len) {
      const t = remaining / seg.len
      return { x: seg.x1 + (seg.x2 - seg.x1) * t, y: seg.y1 + (seg.y2 - seg.y1) * t }
    }
    remaining -= seg.len
  }
  return { x: SEGMENTS[0].x1, y: SEGMENTS[0].y1 }
}

// A gradient stroke is positioned in user space, so it colours by screen position
// rather than by position along the dash — it cannot fade a tail on its own.
// These layers share one head position with different tail lengths instead, which
// stacks into a trail that falls off behind the moving point.
const TRAIL_LAYERS = [
  { length: 150, width: 1.5, opacity: 0.2 },
  { length: 78, width: 1.5, opacity: 0.4 },
  { length: 34, width: 1.5, opacity: 0.9 },
]

function TrailLayer({ progress, length, width, opacity }) {
  // Head sits at `length - dashOffset`, so offsetting by the tail length pins every
  // layer's leading edge to the same point on the path.
  const dashOffset = useTransform(progress, (p) => length - p * CIRCUIT_LEN)

  return (
    <motion.path
      d={CIRCUIT_D}
      fill="none"
      stroke="url(#blueprint-pulse)"
      strokeWidth={width}
      strokeLinecap="round"
      opacity={opacity}
      strokeDasharray={`${length} ${CIRCUIT_LEN - length}`}
      style={{ strokeDashoffset: dashOffset }}
    />
  )
}

function BlueprintGrid() {
  const { theme } = useTheme()
  const isLight = theme === 'light'

  const ink = isLight ? '#0A0F1E' : '#FFFFFF'
  const gridOpacity = isLight ? 0.1 : 0.12
  const crosshairOpacity = isLight ? 0.2 : 0.24
  const tickOpacity = isLight ? 0.15 : 0.18
  const arcOpacity = isLight ? 0.13 : 0.15

  const progress = useMotionValue(0)
  const [reducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const headX = useTransform(progress, (p) => pointAt(p * CIRCUIT_LEN).x)
  const headY = useTransform(progress, (p) => pointAt(p * CIRCUIT_LEN).y)

  useEffect(() => {
    if (reducedMotion) return undefined
    const controls = animate(progress, 1, {
      duration: CIRCUIT_SECONDS,
      ease: 'linear',
      repeat: Infinity,
      repeatType: 'loop',
    })
    return () => controls.stop()
  }, [progress, reducedMotion])

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
            strokeOpacity={gridOpacity}
            strokeWidth="1"
          />
        </pattern>

        <linearGradient
          id="blueprint-pulse"
          gradientUnits="userSpaceOnUse"
          x1={BOUNDS.x1}
          y1={BOUNDS.y1}
          x2={BOUNDS.x2}
          y2={BOUNDS.y2}
        >
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>

      <rect width="100%" height="100%" fill="url(#blueprint-grid)" />

      <g stroke={ink} strokeOpacity={crosshairOpacity} strokeWidth="1">
        {crosshairs.map((mark) => (
          <g key={`${mark.x}-${mark.y}`}>
            <line x1={mark.x - 3} y1={mark.y} x2={mark.x + 3} y2={mark.y} />
            <line x1={mark.x} y1={mark.y - 3} x2={mark.x} y2={mark.y + 3} />
          </g>
        ))}
      </g>

      <g stroke={ink} strokeOpacity={tickOpacity} strokeWidth="1">
        {tickRuns.map((run) =>
          Array.from({ length: Math.floor((run.to - run.from) / 10) }, (_, i) => {
            const x = run.from + i * 10
            return <line key={`${run.y}-${x}`} x1={x} y1={run.y} x2={x} y2={run.y - 3} />
          }),
        )}
      </g>

      <g fill="none" stroke={ink} strokeOpacity={arcOpacity} strokeWidth="1">
        <path d={`M ${W - ARC_R} 0 A ${ARC_R} ${ARC_R} 0 0 1 ${W} ${ARC_R}`} />
        <path d={`M 0 ${H - ARC_R} A ${ARC_R} ${ARC_R} 0 0 0 ${ARC_R} ${H}`} />
      </g>

      {!reducedMotion && (
        <g>
          {TRAIL_LAYERS.map((layer) => (
            <TrailLayer key={layer.length} progress={progress} {...layer} />
          ))}
          <motion.circle cx={headX} cy={headY} r="2.5" fill="url(#blueprint-pulse)" />
        </g>
      )}
    </svg>
  )
}

export default BlueprintGrid
