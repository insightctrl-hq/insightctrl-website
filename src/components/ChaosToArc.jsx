import { useEffect, useRef } from 'react'
import { animate, useMotionValue } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'

const DOT_COUNT = 60

// Deterministic layout so the cluster does not reshuffle on every render.
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

const arcPoint = (t, w, h) => {
  const p0 = { x: 0.5 * w, y: 0.86 * h }
  const p1 = { x: 0.7 * w, y: 0.08 * h }
  const p2 = { x: 0.98 * w, y: 0.42 * h }
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
    // Plays once and stays resolved: chaos becomes CTRL and does not fall back.
    const controls = animate(progress, 1, { duration: 3.2, ease: 'easeInOut', delay: 0.4 })
    return () => controls.stop()
  }, [progress])

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return undefined
    const ctx = canvas.getContext('2d')

    const inkRgb = theme === 'light' ? '26,37,64' : '255,255,255'
    let width = 0
    let height = 0
    let dots = []
    let edges = []
    let raf = 0

    const build = () => {
      const rand = mulberry32(20260911)
      dots = []
      for (let i = 0; i < DOT_COUNT; i += 1) {
        dots.push({
          cx: (0.05 + rand() * 0.4) * width,
          cy: (0.1 + rand() * 0.8) * height,
          t: i / (DOT_COUNT - 1),
          phase: rand() * 0.22,
          wobble: 0.5 + rand() * 1.6,
          wobblePhase: rand() * Math.PI * 2,
        })
      }
      edges = []
      for (let i = 0; i < DOT_COUNT; i += 1) {
        for (let k = 0; k < 2; k += 1) {
          const j = Math.floor(rand() * DOT_COUNT)
          if (j === i) continue
          const d = Math.hypot(dots[i].cx - dots[j].cx, dots[i].cy - dots[j].cy)
          if (d < width * 0.36) edges.push([i, j])
        }
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

    const positionOf = (dot, p, time) => {
      const local = smoothstep((p - dot.phase) / (1 - dot.phase))
      const target = arcPoint(dot.t, width, height)
      // wobble decays as the dot settles onto the arc, keeping the motion organic
      const drift = (1 - local) * dot.wobble * 3
      return {
        x: dot.cx + (target.x - dot.cx) * local + Math.sin(time * 0.0011 + dot.wobblePhase) * drift,
        y: dot.cy + (target.y - dot.cy) * local + Math.cos(time * 0.0009 + dot.wobblePhase) * drift,
        local,
      }
    }

    const render = (time) => {
      const p = progress.get()
      ctx.clearRect(0, 0, width, height)

      const points = dots.map((dot) => positionOf(dot, p, time))

      // chaotic connective tissue, fades out as order emerges
      const edgeAlpha = 0.3 * (1 - smoothstep(p * 1.15))
      if (edgeAlpha > 0.001) {
        ctx.lineWidth = 0.6
        ctx.strokeStyle = `rgba(${inkRgb},${edgeAlpha})`
        ctx.beginPath()
        edges.forEach(([i, j]) => {
          ctx.moveTo(points[i].x, points[i].y)
          ctx.lineTo(points[j].x, points[j].y)
        })
        ctx.stroke()
      }

      // the resolved arc, drawn progressively in the brand gradient
      if (p > 0.02) {
        const gradient = ctx.createLinearGradient(0.5 * width, height, width, 0.4 * height)
        gradient.addColorStop(0, '#2563EB')
        gradient.addColorStop(1, '#06B6D4')
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.5
        ctx.lineCap = 'round'
        ctx.globalAlpha = smoothstep((p - 0.02) / 0.98)
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

      points.forEach((pt) => {
        const alpha = 0.3 + pt.local * 0.25
        ctx.fillStyle = `rgba(${inkRgb},${alpha})`
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, 1.4 - pt.local * 0.4, 0, Math.PI * 2)
        ctx.fill()
      })

      raf = requestAnimationFrame(render)
    }

    resize()
    raf = requestAnimationFrame(render)

    const observer = new ResizeObserver(resize)
    observer.observe(wrap)

    return () => {
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [theme, progress])

  return (
    <div
      ref={wrapRef}
      className={`w-full ${className}`}
      role="img"
      aria-label="A scattered cluster resolving into a single continuous arc"
    >
      <canvas ref={canvasRef} className="block" />
    </div>
  )
}

export default ChaosToArc
