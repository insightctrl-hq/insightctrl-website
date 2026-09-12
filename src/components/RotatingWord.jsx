import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const DISPLAY_MS = 2500

function RotatingWord({ words, className = '' }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % words.length)
    }, DISPLAY_MS)
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <span className={`relative block ${className}`}>
      <span className="invisible" aria-hidden="true">
        {words.reduce((longest, word) => (word.length > longest.length ? word : longest), '')}
      </span>
      <AnimatePresence>
        <motion.span
          key={words[index]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.35, delay: 0.22, ease: 'easeOut' } }}
          exit={{ opacity: 0, transition: { duration: 0.22, ease: 'easeIn' } }}
          className="gradient-text absolute left-0 top-0 whitespace-nowrap"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

export default RotatingWord
