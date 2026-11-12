import { Link } from 'react-router-dom'
import ClosingBand from '../components/ClosingBand'
import { useSubstackFeed } from '../hooks/useSubstackFeed'
import { SUBSTACK_URL, SUBSTACK_SUBSCRIBE_URL } from '../constants/links'
import { WORST_POSTS, pickFixture, useDataMode } from '../dev/worstCase'

// Insights is the second path to booking: read an essay, get hooked, book. The
// newest essay leads; the rest follow as a plain list. Nothing animates.
const external = { target: '_blank', rel: 'noopener noreferrer' }

function SubscribeLink() {
  return (
    <a
      href={SUBSTACK_SUBSCRIBE_URL}
      {...external}
      className="inline-flex items-center justify-center rounded-lg bg-accent-blue px-6 py-3.5 text-[1rem] font-medium text-white transition-colors hover:bg-[#1D4ED8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 focus-visible:ring-offset-bg-primary"
    >
      Subscribe on Substack
    </a>
  )
}

function LeadEssay({ post }) {
  return (
    <article className="max-w-[44rem]">
      {post.date && <p className="text-eyebrow">{post.date}</p>}
      <h2 className="mt-3 text-balance text-section-headline">
        <a href={post.url} {...external} className="hover:underline hover:decoration-1 hover:underline-offset-4">
          {post.title}
        </a>
      </h2>
      {post.excerpt && <p className="text-lead mt-5 line-clamp-4">{post.excerpt}</p>}
      <a href={post.url} {...external} className="text-link mt-6">
        Read on Substack
      </a>
    </article>
  )
}

function EssayList({ posts }) {
  return (
    <ul className="grid gap-x-16 gap-y-12 md:grid-cols-2">
      {posts.map((post) => (
        <li key={post.url} className="max-w-[30rem]">
          {post.date && <p className="text-eyebrow">{post.date}</p>}
          <h3 className="mt-2 text-[1.375rem] font-bold leading-[1.25] tracking-[-0.01em]">
            <a
              href={post.url}
              {...external}
              title={post.title}
              className="line-clamp-3 break-words hover:underline hover:decoration-1 hover:underline-offset-4"
            >
              {post.title}
            </a>
          </h3>
          {post.excerpt && <p className="mt-2 line-clamp-3 text-body">{post.excerpt}</p>}
        </li>
      ))}
    </ul>
  )
}

function Thinking() {
  const feed = useSubstackFeed()
  const mode = useDataMode()
  const posts = pickFixture(mode, feed.posts, WORST_POSTS)
  const loading = mode === 'demo' && feed.loading
  const [lead, ...rest] = posts

  return (
    <>
      <section className="container-content pb-20 pt-16 md:pb-24 md:pt-24">
        <h1 className="max-w-[44rem] text-balance text-hero">Ideas that drive better businesses.</h1>
        <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
          <SubscribeLink />
          <a href={SUBSTACK_URL} {...external} className="text-link">
            Full archive on Substack
          </a>
        </div>
      </section>

      <section className="container-content" aria-busy={loading}>
        <div className="border-t border-border py-24">
          {loading && (
            // a still placeholder, not a pulsing one: the wait is short and motion adds nothing
            <div aria-hidden="true" className="max-w-[44rem] space-y-4">
              <div className="h-4 w-24 rounded bg-bg-surface" />
              <div className="h-10 w-full rounded bg-bg-surface" />
              <div className="h-10 w-3/4 rounded bg-bg-surface" />
            </div>
          )}
          {!loading && lead && <LeadEssay post={lead} />}
          {!loading && rest.length > 0 && (
            <div className="mt-24">
              <EssayList posts={rest} />
            </div>
          )}
          {!loading && !lead && (
            <>
              <p className="text-lead max-w-[36rem]">New think-pieces are on the way.</p>
              {/* the empty page still gives the reader somewhere to go */}
              <Link to="/diagnostic" className="text-link mt-6">
                Run the free diagnostic
              </Link>
            </>
          )}
        </div>
      </section>

      <ClosingBand />
    </>
  )
}

export default Thinking
