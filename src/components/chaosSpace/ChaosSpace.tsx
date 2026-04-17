import type { Review, ChaosReview } from '../../types'
import { FloatingReview } from '../floatingReview/FloatingReview'
import { SpotlightCard } from '../spotlightCard/SpotlightCard'
import './ChaosSpace.css'

interface ChaosSpaceProps {
  activePost: Review | null
  onPostSelect: (rev: Review) => void
  onPostClose: () => void
  chaosReviews: ChaosReview[]
  onFloatingSelect: (rev: Review) => void
}

export function ChaosSpace({
  activePost,
  onPostClose,
  chaosReviews,
  onFloatingSelect,
}: ChaosSpaceProps) {
  return (
    <div className="chaos-space">
      <div className="vinyl-record"></div>
      <div className="orbit-ring orbit-1"></div>
      <div className="orbit-ring orbit-2"></div>

      {chaosReviews.map(item => (
        <FloatingReview
          key={item.id}
          top={item.top}
          left={item.left}
          delay={item.delay}
          review={item.review}
          onSelect={onFloatingSelect}
        />
      ))}

      {activePost && (
        <SpotlightCard review={activePost} onClose={onPostClose} />
      )}
    </div>
  )
}
