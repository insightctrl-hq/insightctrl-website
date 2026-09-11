import ThinkPieceCard from '../components/ThinkPieceCard'
import { useSubstackFeed } from '../hooks/useSubstackFeed'
import { SUBSTACK_URL } from '../constants/links'

function Thinking() {
  const { posts, loading } = useSubstackFeed()

  return (
    <div className="container-content">
      <section className="py-20">
        <p className="text-eyebrow">Our Insights</p>
        <h1 className="mt-5 text-hero">Ideas that drive better businesses.</h1>
        <a
          href={SUBSTACK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block text-[13px] font-medium text-accent-cyan transition-colors hover:text-text-primary"
        >
          Full archive on Substack
        </a>
      </section>

      <section className="section-divider py-20">
        {loading && <p className="text-body">Loading think-pieces.</p>}

        {!loading && posts.length === 0 && (
          <p className="max-w-[36rem] text-body">
            New think-pieces are on the way. Placeholder text, final copy supplied by Chibueze.
          </p>
        )}

        {!loading && posts.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <ThinkPieceCard
                key={post.url}
                title={post.title}
                date={post.date}
                excerpt={post.excerpt}
                url={post.url}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Thinking
