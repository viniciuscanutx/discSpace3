import type { Review } from '../../types'
import { FloatingReview } from '../floatingReview/FloatingReview'
import { SpotlightCard } from '../spotlightCard/SpotlightCard'
import './ChaosSpace.css'

interface ChaosSpaceProps {
  activePost: Review | null
  onPostSelect: (rev: Review) => void
  onPostClose: () => void
  reviews: Review[]
  onFloatingSelect: (rev: Review) => void
}

export function ChaosSpace({
  activePost,
  onPostClose,
  reviews,
  onFloatingSelect,
}: ChaosSpaceProps) {
  return (
    <div className="chaos-space">
      <div className="disc-container">
        <div className="vinyl-record"></div>
        <div className="orbit-ring orbit-1"></div>
        <div className="orbit-ring orbit-2"></div>
      </div>

      <div className="reviews-container">
        {reviews.map((review, index) => (
          <FloatingReview
            key={review.id || index}
            top={`${10 + (index % 5) * 15}%`}
            left={`${10 + (index % 4) * 20}%`}
            delay={`-${index * 0.5}s`}
            review={review}
            onSelect={onFloatingSelect}
          />
        ))}
      </div>

      {activePost && (
        <SpotlightCard review={activePost} onClose={onPostClose} />
      )}
    </div>
  )
}
