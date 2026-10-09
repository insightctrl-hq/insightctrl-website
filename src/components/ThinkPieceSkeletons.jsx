import { motion } from 'framer-motion'

const CARDS = [0, 1, 2, 3]

function ThinkPieceSkeletons() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" aria-hidden="true">
      {CARDS.map((i) => (
        <motion.div
          key={i}
          className="h-[168px] rounded-xl border border-border bg-bg-surface"
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.2,
          }}
        />
      ))}
    </div>
  )
}

export default ThinkPieceSkeletons
