function ThinkPieceCard({ title, date, excerpt, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-interactive flex h-full flex-col"
    >
      {date && <p className="text-eyebrow">{date}</p>}
      <h3 className="mt-3 text-[17px] font-semibold leading-[1.35] tracking-[-0.01em] text-text-primary">
        {title}
      </h3>
      <p className="mt-2 flex-1 text-body">{excerpt}</p>
      <span className="mt-5 text-[13px] font-medium text-accent-cyan">Read on Substack</span>
    </a>
  )
}

export default ThinkPieceCard
