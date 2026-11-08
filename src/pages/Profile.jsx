import { Link, Navigate, useParams } from 'react-router-dom'
import ClosingBand from '../components/ClosingBand'
import { FOUNDERS } from '../data/founders'

function Profile() {
  const { slug } = useParams()
  const founder = FOUNDERS.find((f) => f.slug === slug)
  if (!founder) return <Navigate to="/about" replace />

  return (
    <>
      <section className="container-content pb-24 pt-12 md:pt-16">
        <Link to="/about" className="text-link text-[0.9375rem]">
          Back to About
        </Link>
        <div className="mt-10 grid gap-x-16 gap-y-10 md:grid-cols-[minmax(0,280px)_minmax(0,1fr)]">
          <img
            src={founder.photo}
            alt={`Portrait of ${founder.name}`}
            width="640"
            height="800"
            className="block aspect-[4/5] w-full max-w-[280px] rounded-lg bg-bg-surface object-cover"
          />
          <div>
            <h1 className="text-section-headline">{founder.name}</h1>
            <p className="mt-2 text-[1.0625rem] text-text-muted">{founder.title}</p>
            <div className="mt-8 max-w-[36rem] space-y-5">
              {founder.bio.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-body">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ClosingBand />
    </>
  )
}

export default Profile
