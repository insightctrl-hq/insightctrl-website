import Card from './Card'
import Badge from './Badge'
import Button from './Button'

function EngagementTierCard({
  badge,
  title,
  description,
  price,
  ctaLabel,
  onCtaClick,
  highlight = false,
}) {
  return (
    <Card highlight={highlight} className="flex h-full flex-col">
      {badge && (
        <div className="mb-5">
          <Badge label={badge} variant={highlight ? 'pro' : 'default'} />
        </div>
      )}
      <h3 className="text-[17px] font-semibold tracking-[-0.01em] text-text-primary">{title}</h3>
      <p className="mt-2 flex-1 text-body">{description}</p>
      {price && (
        <p className="mt-5 border-t border-border pt-5 text-[20px] font-semibold tracking-[-0.01em] text-text-primary">
          {price}
        </p>
      )}
      <Button
        label={ctaLabel}
        onClick={onCtaClick}
        variant={highlight ? 'primary' : 'outline'}
        className="mt-5 w-full"
      />
    </Card>
  )
}

export default EngagementTierCard
