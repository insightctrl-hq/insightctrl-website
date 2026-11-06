import { useEffect, useRef } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'

// The Chaos to CTRL arc, used as the stage picker. Larger than the Home arc so each
// stage is a comfortable target, with labels set at body size.
const WIDTH = 380
const HEIGHT = 540
const P0 = { x: 210, y: 30 }
const P1 = { x: 8, y: 270 }
const P2 = { x: 210, y: 510 }
const PATH = `M ${P0.x} ${P0.y} Q ${P1.x} ${P1.y} ${P2.x} ${P2.y}`

const pointAt = (t) => ({
  x: (1 - t) ** 2 * P0.x + 2 * (1 - t) * t * P1.x + t ** 2 * P2.x,
  y: (1 - t) ** 2 * P0.y + 2 * (1 - t) * t * P1.y + t ** 2 * P2.y,
})

// Arc length is not linear in t on a quadratic curve, so the lit stroke uses a
// sampled length table to land exactly on each stage's dot.
const SAMPLES = 240
const LENGTHS = (() => {
  const table = [0]
  let prev = pointAt(0)
  for (let i = 1; i <= SAMPLES; i += 1) {
    const next = pointAt(i / SAMPLES)
    table.push(table[i - 1] + Math.hypot(next.x - prev.x, next.y - prev.y))
    prev = next
  }
  return table
})()
const TOTAL = LENGTHS[SAMPLES]
const fractionAt = (t) => {
  const exact = t * SAMPLES
  const i = Math.floor(exact)
  if (i >= SAMPLES) return 1
  return (LENGTHS[i] + (LENGTHS[i + 1] - LENGTHS[i]) * (exact - i)) / TOTAL
}

function StageArcPicker({ stages, selectedIndex, onSelect }) {
  const nodeRefs = useRef([])
  const last = stages.length - 1
  const tFor = (i) => i / last
  const reach = useMotionValue(tFor(selectedIndex))

  // The pulse travels from the previous stage to the one just chosen.
  useEffect(() => {
    const controls = animate(reach, tFor(selectedIndex), {
      type: 'spring',
      bounce: 0,
      duration: 0.7,
    })
    return () => controls.stop()
  }, [selectedIndex])

  const litLength = useTransform(reach, fractionAt)
  const headX = useTransform(reach, (t) => pointAt(t).x)
  const headY = useTransform(reach, (t) => pointAt(t).y)

  const focusStage = (i) => {
    const next = (i + stages.length) % stages.length
    onSelect(next)
    nodeRefs.current[next]?.focus()
  }

  const onKeyDown = (event, i) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault()
      focusStage(i + 1)
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault()
      focusStage(i - 1)
    } else if (event.key === 'Home') {
      event.preventDefault()
      focusStage(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      focusStage(last)
    } else if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault()
      onSelect(i)
    }
  }

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="block h-auto w-full max-w-[380px]"
      role="radiogroup"
      aria-label="The seven stages, from Clarity to Autonomy"
    >
      <path
        d={PATH}
        fill="none"
        strokeWidth="1.5"
        strokeLinecap="round"
        style={{ stroke: 'var(--text-primary)', strokeOpacity: 0.16 }}
      />
      <motion.path
        d={PATH}
        fill="none"
        strokeWidth="2"
        strokeLinecap="round"
        style={{ stroke: 'var(--accent-blue)', pathLength: litLength }}
      />

      {stages.map((stage, i) => {
        const { x, y } = pointAt(tFor(i))
        const selected = i === selectedIndex
        const reached = i <= selectedIndex
        return (
          <g
            key={stage.id}
            ref={(el) => {
              nodeRefs.current[i] = el
            }}
            role="radio"
            aria-checked={selected}
            aria-label={`Stage ${i + 1}: ${stage.name}`}
            tabIndex={selected ? 0 : -1}
            className="arc-stage cursor-pointer"
            onClick={() => onSelect(i)}
            onKeyDown={(event) => onKeyDown(event, i)}
          >
            {/* generous invisible target covering the dot and its label */}
            <rect x={x - 18} y={y - 22} width={WIDTH - x + 14} height={44} fill="transparent" />
            <rect
              className="arc-focus"
              x={x - 14}
              y={y - 19}
              width={WIDTH - x + 8}
              height={38}
              rx={8}
              fill="none"
              strokeWidth="1.5"
              style={{ stroke: 'var(--accent-blue)' }}
            />
            <circle
              cx={x}
              cy={y}
              r={selected ? 7 : 4.5}
              style={{
                fill: reached ? 'var(--accent-blue)' : 'var(--bg-primary)',
                stroke: reached ? 'var(--accent-blue)' : 'var(--border-accent)',
                strokeWidth: 1.5,
                transition: 'r 200ms cubic-bezier(0.23, 1, 0.32, 1), fill 200ms ease',
              }}
            />
            <text
              x={x + 22}
              y={y}
              dominantBaseline="middle"
              fontSize="17"
              fontWeight={selected ? 700 : 500}
              style={{
                fill: selected ? 'var(--text-primary)' : 'var(--text-secondary)',
                transition: 'fill 200ms ease',
              }}
            >
              {stage.name}
            </text>
          </g>
        )
      })}

      <motion.circle r="4" cx={headX} cy={headY} style={{ fill: 'var(--accent-cyan)' }} />
    </svg>
  )
}

export default StageArcPicker
