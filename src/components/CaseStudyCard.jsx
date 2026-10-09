import Card from './Card'
import Badge from './Badge'

function CaseStudyCard({ status, client, industry, description, engagementType }) {
  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="break-words text-[1.25rem] font-semibold tracking-[-0.01em] text-text-primary">
            {client}
          </h3>
          {industry && <p className="mt-1 text-[0.8125rem] text-text-muted">{industry}</p>}
        </div>
        {status && <Badge label={status} variant="success" />}
      </div>

      <p className="mt-5 flex-1 text-body">{description}</p>

      {engagementType && (
        <p className="mt-5 border-t border-border pt-4 text-eyebrow">{engagementType}</p>
      )}
    </Card>
  )
}

export default CaseStudyCard
