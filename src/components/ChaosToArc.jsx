import { useEffect, useRef, useState } from 'react'
import { animate, useMotionValue } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import HeroArc, { LAYOUTS, arcColors } from './HeroArc'

// The seven stage names start scattered at odd angles, then settle into exactly the
// Home arc. When they land, the canvas hands over to the real HeroArc, so the
// resolved state is the same component, pulse included.
const DOT_COUNT = 30

// The horizontal arc is only 90 units tall, too cramped to scatter in, so its box
// gets extra room above and below; the arc sits in the middle of it.
const BOX = {
  vertical: { height: 470, offsetY: 0 },
  horizontal: { height: 190, offsetY: 50 },
}

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

function ChaosToArc({ orientation = 'vertical' }) {
  const layout = LAYOUTS[orientation]
  const box = BOX[orientation]
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const { theme } = useTheme()
  const progress = useMotionValue(0)
  const [resolved, setResolved] = useState(false)

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      progress.set(1)
      setResolved(true)
      return undefined
    }
    // a beat of chaos first, so the visitor sees what is being resolved
    const controls = animate(progress, 1, {
      duration: 3,
      ease: 'easeInOut',
      delay: 1,
      onComplete: () => setResolved(true),
    })
    return () => controls.stop()
  }, [progress])

  useEffect(() => {
    if (resolved) return undefined
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return undefined
    const ctx = canvas.getContext('2d')
    const colors = arcColors(theme === 'light')
    const inkRgb = theme === 'light' ? '26,37,64' : '255,255,255'
    const path = new Path2D(layout.path)
    let scale = 1
    let raf = 0

    const rand = mulberry32(20260911)
    // each name gets its own height band, in shuffled order, so the scatter looks
    // random without names piling on top of one another
    const bands = layout.stages.map((_, i) => i)
    for (let i = bands.length - 1; i > 0; i -= 1) {
      const j = Math.floor(rand() * (i + 1))
      ;[bands[i], bands[j]] = [bands[j], bands[i]]
    }
    const n = layout.stages.length
    const words = layout.stages.map((stage, i) => ({
      stage,
      cx: (0.08 + rand() * 0.6) * layout.width,
      cy: ((bands[i] + 0.5) / n) * box.height * 0.88 + box.height * 0.06,
      angle: (rand() - 0.5) * 1.3,
      phase: i * 0.03,
    }))
    const dots = Array.from({ length: DOT_COUNT }, () => ({
      cx: rand() * layout.width,
      cy: rand() * box.height,
      wobble: 0.5 + rand() * 1.5,
      wobblePhase: rand() * Math.PI * 2,
    }))

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const width = wrap.getBoundingClientRect().width
      scale = width / layout.width
      const height = box.height * scale
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr * scale, 0, 0, dpr * scale, 0, 0)
    }

    const render = (time) => {
      const p = progress.get()
      ctx.clearRect(0, 0, layout.width, box.height)

      // the arc line fades in underneath as the names find their places
      ctx.save()
      ctx.translate(0, box.offsetY)
      ctx.globalAlpha = colors.lineOpacity * smoothstep((p - 0.3) / 0.6)
      ctx.strokeStyle = colors.line
      ctx.lineWidth = 1.5
      ctx.lineCap = 'round'
      ctx.stroke(path)
      ctx.restore()

      dots.forEach((dot) => {
        const drift = dot.wobble * 3
        const x = dot.cx + Math.sin(time * 0.0011 + dot.wobblePhase) * drift
        const y = dot.cy + Math.cos(time * 0.0009 + dot.wobblePhase) * drift
        ctx.fillStyle = `rgba(${inkRgb},${0.3 * (1 - smoothstep(p * 1.4))})`
        ctx.beginPath()
        ctx.arc(x, y, 1.3, 0, Math.PI * 2)
        ctx.fill()
      })

      ctx.textBaseline = 'middle'
      ctx.font = `400 ${layout.fontSize}px Satoshi, system-ui, sans-serif`
      if ('letterSpacing' in ctx) ctx.letterSpacing = `${layout.fontSize * 0.04}px`
      words.forEach((word) => {
        const local = smoothstep((p - word.phase) / (1 - 0.18))
        const { label, point } = word.stage
        const drift = (1 - local) * 2.5
        const x = word.cx + (label.x - word.cx) * local + Math.sin(time * 0.001 + word.angle * 7) * drift
        const targetY = label.y + box.offsetY
        const y = word.cy + (targetY - word.cy) * local + Math.cos(time * 0.0008 + word.angle * 5) * drift

        ctx.save()
        ctx.translate(x, y)
        ctx.rotate(word.angle * (1 - local))
        ctx.textAlign = label.anchor === 'middle' ? 'center' : 'left'
        ctx.fillStyle = colors.idle
        ctx.globalAlpha = 0.6 + 0.4 * local
        ctx.fillText(word.stage.name, 0, 0)
        ctx.restore()

        ctx.globalAlpha = smoothstep((local - 0.5) / 0.5)
        ctx.fillStyle = colors.dotIdle
        ctx.beginPath()
        ctx.arc(point.x, point.y + box.offsetY, 2.5, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
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
  }, [theme, progress, resolved, layout, box])

  const sizing =
    orientation === 'vertical'
      ? { width: layout.width }
      : { width: '100%', maxWidth: layout.width }

  return (
    <div
      ref={wrapRef}
      className="relative"
      style={{ ...sizing, aspectRatio: `${layout.width} / ${box.height}` }}
    >
      {resolved ? (
        <div className="absolute inset-x-0" style={{ top: `${(box.offsetY / box.height) * 100}%` }}>
          <HeroArc orientation={orientation} />
        </div>
      ) : (
        <canvas
          ref={canvasRef}
          className="block"
          role="img"
          aria-label="The seven stage names, scattered at first, settling in order along the arc"
        />
      )}
    </div>
  )
}

export default ChaosToArc
