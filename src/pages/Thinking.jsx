import { motion } from 'framer-motion'
import ThinkPieceCard from '../components/ThinkPieceCard'
import ThinkPieceSkeletons from '../components/ThinkPieceSkeletons'
import { useSubstackFeed } from '../hooks/useSubstackFeed'
import { SUBSTACK_URL } from '../constants/links'
import { WORST_POSTS, pickFixture, useDataMode } from '../dev/worstCase'

function Thinking() {
  const feed = useSubstackFeed()
  const mode = useDataMode()
  const posts = pickFixture(mode, feed.posts, WORST_POSTS)
  const loading = mode === 'demo' && feed.loading
  const featured = posts.slice(0, 4)

  return (
    <div className="container-content">
      <section className="py-12">
        <p className="text-eyebrow">Our Insights</p>
        <h1 className="mt-5 text-hero">Ideas that drive better businesses.</h1>
        <a
          href={SUBSTACK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block text-[0.8125rem] font-medium text-accent-cyan transition-colors hover:text-text-primary"
        >
          Full archive on Substack
        </a>
      </section>

      {(loading || posts.length > 0) && (
        <section className="section-divider py-20">
          {loading ? (
            <ThinkPieceSkeletons />
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {featured.map((post, i) => (
                <motion.div
                  key={post.url}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1], delay: i * 0.05 }}
                >
                  <ThinkPieceCard
                    title={post.title}
                    date={post.date}
                    excerpt={post.excerpt}
                    url={post.url}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </section>
      )}

      {!loading && posts.length === 0 && (
        <section className="section-divider py-20">
          <p className="max-w-[36rem] text-body">New think-pieces are on the way.</p>
        </section>
      )}
    </div>
  )
}

export default Thinking
