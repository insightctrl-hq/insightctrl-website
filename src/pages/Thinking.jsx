import { motion } from 'framer-motion'
import ThinkPieceCard from '../components/ThinkPieceCard'
import ThinkPieceSkeletons from '../components/ThinkPieceSkeletons'
import { useSubstackFeed } from '../hooks/useSubstackFeed'
import { SUBSTACK_URL } from '../constants/links'

function Thinking() {
  const { posts, loading } = useSubstackFeed()
  const featured = posts.slice(0, 4)

  return (
    <div className="container-content">
      <section className="grid items-center gap-x-10 gap-y-12 py-12 lg:grid-cols-[minmax(0,1fr)_340px]">
        <div>
          <p className="text-eyebrow">Our Insights</p>
          <h1 className="mt-5 text-hero">Ideas that drive better businesses.</h1>
          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block text-[13px] font-medium text-accent-cyan transition-colors hover:text-text-primary"
          >
            Full archive on Substack
          </a>
        </div>

        <div>
          {loading ? (
            <ThinkPieceSkeletons />
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {featured.map((post, i) => (
                <motion.div
                  key={post.url}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.08 }}
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
        </div>
      </section>

      {!loading && posts.length === 0 && (
        <section className="section-divider py-20">
          <p className="max-w-[36rem] text-body">New think-pieces are on the way.</p>
        </section>
      )}
    </div>
  )
}

export default Thinking
