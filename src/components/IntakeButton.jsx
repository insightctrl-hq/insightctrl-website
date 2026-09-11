import Button from './Button'
import { TALLY_URL } from '../constants/links'

function IntakeButton({
  label = "Let's talk",
  variant = 'primary',
  size = 'md',
  url = TALLY_URL,
  className = '',
}) {
  const handleClick = () => {
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <Button
      label={label}
      onClick={handleClick}
      variant={variant}
      size={size}
      className={className}
    />
  )
}

export default IntakeButton
