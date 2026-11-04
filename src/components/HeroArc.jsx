import { useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { DIAGNOSTIC_STAGES } from '../data/diagnosticStages'

const VIEW_W = 280
const VIEW_H = 470
const P0 = { x: 175, y: 26 }
const P1 = { x: 22, y: 235 }
const P2 = { x: 175, y: 444 }
const ARC_PATH = `M ${P0.x} ${P0.y} Q ${P1.x} ${P1.y} ${P2.x} ${P2.y}`

const pointAt = (t) => ({
  x: (1 - t) ** 2 * P0.x + 2 * (1 - t) * t * P1.x + t ** 2 * P2.x,
  y: (1 - t) ** 2 * P0.y + 2 * (1 - t) * t * P1.y + t ** 2 * P2.y,
})

const STAGES = DIAGNOSTIC_STAGES.map((stage, i) => {
  const t = i / (DIAGNOSTIC_STAGES.length - 1)
  return { name: stage.name, t, point: pointAt(t) }
})

function StageNode({ progress, stage, idle, active, dotIdle }) {
  const range = [stage.t - 0.09, stage.t, stage.t + 0.09]
  const fill = useTransform(progress, range, [idle, active, idle])
  const dotFill = useTransform(progress, range, [dotIdle, active, dotIdle])
  const dotRadius = useTransform(progress, range, [2.5, 4, 2.5])

  return (
    <g>
      <motion.circle cx={stage.point.x} cy={stage.point.y} r={dotRadius} fill={dotFill} />
      <motion.text
        x={stage.point.x + 15}
        y={stage.point.y}
        fill={fill}
        fontSize="12"
        letterSpacing="0.04em"
        dominantBaseline="middle"
      >
        {stage.name}
      </motion.text>
    </g>
  )
}

function HeroArc() {
  const { theme } = useTheme()
  const pathRef = useRef(null)
  const [length, setLength] = useState(0)
  const progress = useMotionValue(0)

  const isLight = theme === 'light'
  const line = isLight ? '#1A2540' : '#FFFFFF'
  const idle = isLight ? '#667085' : '#8A93A6'
  const activeLabel = isLight ? '#0A0F1E' : '#F1F5F9'
  const dotIdle = isLight ? 'rgba(26,37,64,0.45)' : 'rgba(255,255,255,0.35)'

  useEffect(() => {
    if (pathRef.current) setLength(pathRef.current.getTotalLength())
  }, [])

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      progress.set(1)
      return undefined
    }
    const controls = animate(progress, 1, {
      duration: 5,
      ease: 'linear',
      repeat: Infinity,
      repeatDelay: 1,
      repeatType: 'loop',
    })
    return () => controls.stop()
  }, [progress])

  const segment = Math.max(length * 0.12, 40)
  const dashOffset = useTransform(progress, [0, 1], [segment, -length])

  return (
    <svg
      viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
      width={VIEW_W}
      height={VIEW_H}
      className="block"
      role="img"
      aria-label="The seven stage Chaos to CTRL sequence, from Clarity to Autonomy"
    >
      <defs>
        <linearGradient id="hero-arc-pulse" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>

      <path
        ref={pathRef}
        d={ARC_PATH}
        fill="none"
        stroke={line}
        strokeOpacity={isLight ? 0.18 : 0.14}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {length > 0 && (
        <motion.path
          d={ARC_PATH}
          fill="none"
          stroke="url(#hero-arc-pulse)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={`${segment} ${length}`}
          style={{ strokeDashoffset: dashOffset }}
        />
      )}

      {STAGES.map((stage) => (
        <StageNode
          key={stage.name}
          stage={stage}
          progress={progress}
          idle={idle}
          active={activeLabel}
          dotIdle={dotIdle}
        />
      ))}
    </svg>
  )
}

export default HeroArc
