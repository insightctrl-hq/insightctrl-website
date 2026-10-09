function ThinkPieceCard({ title, date, excerpt, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-interactive flex h-full flex-col"
    >
      {date && <p className="text-eyebrow">{date}</p>}
      <h3
        title={title}
        className="mt-3 line-clamp-3 break-words text-[1.0625rem] font-semibold leading-[1.35] tracking-[-0.01em] text-text-primary"
      >
        {title}
      </h3>
      {excerpt && <p className="mt-2 line-clamp-3 flex-1 text-body">{excerpt}</p>}
      <span className="mt-auto pt-5 text-[0.8125rem] font-medium text-accent-cyan">Read on Substack</span>
    </a>
  )
}

export default ThinkPieceCard
