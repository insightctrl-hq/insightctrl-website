import { useEffect, useRef, useState } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { DIAGNOSTIC_STAGES } from '../data/diagnosticStages'

const GEOMETRY = {
  vertical: {
    width: 280,
    height: 470,
    p0: { x: 175, y: 26 },
    p1: { x: 22, y: 235 },
    p2: { x: 175, y: 444 },
    fontSize: 12,
    label: (point) => ({ x: point.x + 15, y: point.y, anchor: 'start' }),
  },
  horizontal: {
    width: 336,
    height: 90,
    p0: { x: 28, y: 62 },
    p1: { x: 168, y: 2 },
    p2: { x: 308, y: 62 },
    fontSize: 11,
    // Seven names don't fit side by side on a phone, so they alternate below and above.
    label: (point, i) => ({ x: point.x, y: point.y + (i % 2 ? -16 : 16), anchor: 'middle' }),
  },
}

function stagesFor({ p0, p1, p2, label }) {
  const pointAt = (t) => ({
    x: (1 - t) ** 2 * p0.x + 2 * (1 - t) * t * p1.x + t ** 2 * p2.x,
    y: (1 - t) ** 2 * p0.y + 2 * (1 - t) * t * p1.y + t ** 2 * p2.y,
  })
  return DIAGNOSTIC_STAGES.map((stage, i) => {
    const t = i / (DIAGNOSTIC_STAGES.length - 1)
    const point = pointAt(t)
    return { name: stage.name, t, point, label: label(point, i) }
  })
}

const LAYOUTS = Object.fromEntries(
  Object.entries(GEOMETRY).map(([key, g]) => [
    key,
    {
      ...g,
      path: `M ${g.p0.x} ${g.p0.y} Q ${g.p1.x} ${g.p1.y} ${g.p2.x} ${g.p2.y}`,
      stages: stagesFor(g),
    },
  ]),
)

function StageNode({ progress, stage, fontSize, idle, active, dotIdle }) {
  const range = [stage.t - 0.09, stage.t, stage.t + 0.09]
  const fill = useTransform(progress, range, [idle, active, idle])
  const dotFill = useTransform(progress, range, [dotIdle, active, dotIdle])
  const dotRadius = useTransform(progress, range, [2.5, 4, 2.5])

  return (
    <g>
      <motion.circle cx={stage.point.x} cy={stage.point.y} r={dotRadius} fill={dotFill} />
      <motion.text
        x={stage.label.x}
        y={stage.label.y}
        textAnchor={stage.label.anchor}
        fill={fill}
        fontSize={fontSize}
        letterSpacing="0.04em"
        dominantBaseline="middle"
      >
        {stage.name}
      </motion.text>
    </g>
  )
}

function HeroArc({ orientation = 'vertical' }) {
  const layout = LAYOUTS[orientation]
  const gradientId = `hero-arc-pulse-${orientation}`
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
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
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

  // The vertical arc renders 1:1 so its labels stay a true 12px; the horizontal one
  // scales down only on screens narrower than itself.
  const sizing =
    orientation === 'vertical'
      ? { width: layout.width, height: layout.height, className: 'block' }
      : { className: 'block h-auto w-full', style: { maxWidth: layout.width } }

  return (
    <svg
      viewBox={`0 0 ${layout.width} ${layout.height}`}
      {...sizing}
      role="img"
      aria-label="The seven stage Chaos to CTRL sequence, from Clarity to Autonomy"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>

      <path
        ref={pathRef}
        d={layout.path}
        fill="none"
        stroke={line}
        strokeOpacity={isLight ? 0.18 : 0.14}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {length > 0 && (
        <motion.path
          d={layout.path}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={`${segment} ${length}`}
          style={{ strokeDashoffset: dashOffset }}
        />
      )}

      {layout.stages.map((stage) => (
        <StageNode
          key={stage.name}
          stage={stage}
          progress={progress}
          fontSize={layout.fontSize}
          idle={idle}
          active={activeLabel}
          dotIdle={dotIdle}
        />
      ))}
    </svg>
  )
}

export default HeroArc
