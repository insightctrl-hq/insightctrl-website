import { useEffect, useRef } from 'react'
import { animate, useMotionValue } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { DIAGNOSTIC_STAGES } from '../data/diagnosticStages'

// The seven stage names start scattered at odd angles, with no pattern, then settle
// in order along the arc. Plays once and stays resolved.
const STAGE_NAMES = DIAGNOSTIC_STAGES.map((stage) => stage.name)
const DOT_COUNT = 36

// Deterministic layout so the scatter does not reshuffle on every render.
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

const smoothstep = (x) => {
  const c = Math.min(1, Math.max(0, x))
  return c * c * (3 - 2 * c)
}

// Same shape as the Home arc: opening to the right, so each name sits beside its dot.
const arcPoint = (t, w, h) => {
  const p0 = { x: 0.42 * w, y: 0.07 * h }
  const p1 = { x: -0.02 * w, y: 0.5 * h }
  const p2 = { x: 0.42 * w, y: 0.93 * h }
  const u = 1 - t
  return {
    x: u * u * p0.x + 2 * u * t * p1.x + t * t * p2.x,
    y: u * u * p0.y + 2 * u * t * p1.y + t * t * p2.y,
  }
}

function ChaosToArc({ className = 'h-[420px]' }) {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const { theme } = useTheme()
  const progress = useMotionValue(0)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      progress.set(1)
      return undefined
    }
    // a beat of chaos first, so the visitor sees what is being resolved
    const controls = animate(progress, 1, { duration: 3.2, ease: 'easeInOut', delay: 1 })
    return () => controls.stop()
  }, [progress])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return undefined
    const ctx = canvas.getContext('2d')

    const isLight = theme === 'light'
    const inkRgb = isLight ? '26,37,64' : '255,255,255'
    const wordRgb = isLight ? '71,85,105' : '148,163,184'
    let width = 0
    let height = 0
    let fontSize = 15
    let words = []
    let dots = []
    let raf = 0

    const build = () => {
      const rand = mulberry32(20260911)
      fontSize = Math.max(12, Math.min(16, height / 28))
      // each name gets its own height band, in shuffled order, so the scatter looks
      // random without names piling on top of one another
      const bands = STAGE_NAMES.map((_, i) => i)
      for (let i = bands.length - 1; i > 0; i -= 1) {
        const j = Math.floor(rand() * (i + 1))
        ;[bands[i], bands[j]] = [bands[j], bands[i]]
      }
      words = STAGE_NAMES.map((name, i) => ({
        name,
        t: i / (STAGE_NAMES.length - 1),
        cx: (0.02 + rand() * 0.55) * width,
        cy: ((bands[i] + 0.5) / STAGE_NAMES.length) * height * 0.9 + height * 0.05,
        angle: (rand() - 0.5) * 1.3,
        // later stages settle slightly after earlier ones, so the order reads
        phase: i * 0.035,
      }))
      dots = []
      for (let i = 0; i < DOT_COUNT; i += 1) {
        dots.push({
          cx: (0.02 + rand() * 0.9) * width,
          cy: (0.05 + rand() * 0.9) * height,
          t: i / (DOT_COUNT - 1),
          phase: rand() * 0.2,
          wobble: 0.5 + rand() * 1.6,
          wobblePhase: rand() * Math.PI * 2,
        })
      }
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = wrap.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      build()
    }

    const settle = (phase, p) => smoothstep((p - phase) / (1 - 0.25))

    const render = (time) => {
      const p = progress.get()
      ctx.clearRect(0, 0, width, height)

      // the resolved arc, drawn as order arrives
      if (p > 0.05) {
        const gradient = ctx.createLinearGradient(0, 0, 0, height)
        gradient.addColorStop(0, '#2563EB')
        gradient.addColorStop(1, '#06B6D4')
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.5
        ctx.lineCap = 'round'
        ctx.globalAlpha = smoothstep((p - 0.05) / 0.6)
        ctx.beginPath()
        const steps = 90
        const drawTo = Math.max(1, Math.floor(steps * smoothstep(p)))
        for (let s = 0; s <= drawTo; s += 1) {
          const pt = arcPoint(s / steps, width, height)
          if (s === 0) ctx.moveTo(pt.x, pt.y)
          else ctx.lineTo(pt.x, pt.y)
        }
        ctx.stroke()
        ctx.globalAlpha = 1
      }

      // loose particles drift onto the arc and fade into it
      dots.forEach((dot) => {
        const local = settle(dot.phase, p)
        const target = arcPoint(dot.t, width, height)
        const drift = (1 - local) * dot.wobble * 3
        const x = dot.cx + (target.x - dot.cx) * local + Math.sin(time * 0.0011 + dot.wobblePhase) * drift
        const y = dot.cy + (target.y - dot.cy) * local + Math.cos(time * 0.0009 + dot.wobblePhase) * drift
        ctx.fillStyle = `rgba(${inkRgb},${0.32 * (1 - local)})`
        ctx.beginPath()
        ctx.arc(x, y, 1.4, 0, Math.PI * 2)
        ctx.fill()
      })

      // the seven stage names: scattered and tilted, then aligned beside the arc
      ctx.textBaseline = 'middle'
      words.forEach((word) => {
        const local = settle(word.phase, p)
        const anchor = arcPoint(word.t, width, height)
        const tx = anchor.x + 14
        const drift = (1 - local) * 2.5
        const x = word.cx + (tx - word.cx) * local + Math.sin(time * 0.001 + word.angle * 7) * drift
        const y = word.cy + (anchor.y - word.cy) * local + Math.cos(time * 0.0008 + word.angle * 5) * drift

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(word.angle * (1 - local))
        ctx.font = `500 ${fontSize}px Satoshi, system-ui, sans-serif`
        ctx.fillStyle = `rgba(${wordRgb},${0.55 + 0.45 * local})`
        ctx.fillText(word.name, 0, 0)
        ctx.restore()

        if (local > 0.6) {
          ctx.fillStyle = `rgba(37,99,235,${(local - 0.6) / 0.4})`
          ctx.beginPath()
          ctx.arc(anchor.x, anchor.y, 2.5, 0, Math.PI * 2)
          ctx.fill()
        }
      })

      // once resolved nothing moves, so stop drawing until something changes
      if (p < 1) raf = requestAnimationFrame(render)
    }

    const start = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(render)
    }

    resize()
    start()
    const unsubscribe = progress.on('change', () => {
      if (!raf || progress.get() < 1) start()
    })

    const observer = new ResizeObserver(() => {
      resize()
      start()
    })
    observer.observe(wrap)

    // the canvas needs Satoshi loaded before it can draw the names in it
    document.fonts?.ready.then(start)

    return () => {
      cancelAnimationFrame(raf)
      unsubscribe()
      observer.disconnect()
    }
  }, [theme, progress])

  return (
    <div
      ref={wrapRef}
      className={`w-full ${className}`}
      role="img"
      aria-label="The seven stage names, scattered at first, settling in order along a single arc from Clarity to Autonomy"
    >
      <canvas ref={canvasRef} className="block" />
    </div>
  )
}

export default ChaosToArc
