import { useEffect, useRef } from 'react'
import { animate, motion, useMotionValue, useMotionValueEvent } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'

const SIZE = 300
const C = SIZE / 2
const R_OUTER = 140
const R_INNER = 112
const R_ARC = 126
const START_DEG = 120 // 7 o'clock
const END_DEG = 240 // 11 o'clock

const polar = (r, deg) => {
  const rad = (deg * Math.PI) / 180
  return { x: C + r * Math.cos(rad), y: C + r * Math.sin(rad) }
}

const TICKS = Array.from({ length: 24 }, (_, i) => {
  const deg = i * 15
  const major = deg % 45 === 0
  const from = major ? 118 : 124
  return { deg, major, from, to: 134 }
})

const arcStart = polar(R_ARC, START_DEG)
const arcEnd = polar(R_ARC, END_DEG)
const ARC_PATH = `M ${arcStart.x} ${arcStart.y} A ${R_ARC} ${R_ARC} 0 0 1 ${arcEnd.x} ${arcEnd.y}`
const ARC_LENGTH = 2 * Math.PI * R_ARC * ((END_DEG - START_DEG) / 360)

function DiagnosticGauge() {
  const { theme } = useTheme()
  const rotation = useMotionValue(START_DEG)
  const isLight = theme === 'light'
  const ink = isLight ? '#1A2540' : '#FFFFFF'
  const needleRef = useRef(null)

  // Framer treats `transform` as a CSS transform, so drive the SVG attribute directly.
  useMotionValueEvent(rotation, 'change', (deg) => {
    needleRef.current?.setAttribute('transform', `rotate(${deg} ${C} ${C})`)
  })

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      rotation.set(END_DEG)
      return undefined
    }
    let stopped = false
    let oscillation
    const sweep = animate(rotation, END_DEG, { duration: 1.5, ease: 'easeOut' })
    sweep.then(() => {
      if (stopped) return
      // settle into a live-signal wander of a few degrees
      oscillation = animate(rotation, [END_DEG, END_DEG + 3, END_DEG - 3, END_DEG], {
        duration: 3,
        ease: 'easeInOut',
        repeat: Infinity,
      })
    })
    return () => {
      stopped = true
      sweep.stop()
      oscillation?.stop()
    }
  }, [rotation])

  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      className="block"
      role="img"
      aria-label="A diagnostic gauge reading a live signal"
    >
      <defs>
        {/* userSpaceOnUse: the needle is a horizontal line, so an objectBoundingBox
            gradient would collapse on its zero-height box and render nothing */}
        <linearGradient
          id="gauge-arc-gradient"
          gradientUnits="userSpaceOnUse"
          x1={C - R_ARC}
          y1={C + R_ARC}
          x2={C}
          y2={C - R_ARC}
        >
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient
          id="gauge-needle-gradient"
          gradientUnits="userSpaceOnUse"
          x1={C}
          y1={C}
          x2={C + 104}
          y2={C}
        >
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>

      <circle cx={C} cy={C} r={R_OUTER} fill="none" stroke={ink} strokeOpacity="0.2" strokeWidth="1" />
      <circle cx={C} cy={C} r={R_INNER} fill="none" stroke={ink} strokeOpacity="0.2" strokeWidth="0.5" />

      <g stroke={ink} strokeOpacity="0.4">
        {TICKS.map((tick) => {
          const a = polar(tick.from, tick.deg)
          const b = polar(tick.to, tick.deg)
          return (
            <line
              key={tick.deg}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              strokeWidth={tick.major ? 1.25 : 0.75}
            />
          )
        })}
      </g>

      <motion.path
        d={ARC_PATH}
        fill="none"
        stroke="url(#gauge-arc-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray={ARC_LENGTH}
        initial={{ strokeDashoffset: ARC_LENGTH }}
        animate={{ strokeDashoffset: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />

      <g ref={needleRef} transform={`rotate(${START_DEG} ${C} ${C})`}>
        <line
          x1={C + 18}
          y1={C}
          x2={C + 104}
          y2={C}
          stroke="url(#gauge-needle-gradient)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      <circle cx={C} cy={C} r="3" fill={ink} fillOpacity="0.5" />
    </svg>
  )
}

export default DiagnosticGauge
