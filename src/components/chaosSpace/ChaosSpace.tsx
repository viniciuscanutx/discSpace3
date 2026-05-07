import { useState, useEffect } from 'react'
import type { Review } from '../../types'
import { FloatingReview } from '../floatingReview/FloatingReview'
import { SpotlightCard } from '../spotlightCard/SpotlightCard'
import './ChaosSpace.css'

interface FloatingItem {
  review: Review
  top: string
  left: string
  delay: string
}

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
  const [floatingItems, setFloatingItems] = useState<FloatingItem[]>([])

  useEffect(() => {
    const items = reviews.map((review) => ({
      review,
      top: `${Math.random() * 70 + 5}%`,
      left: `${Math.random() * 75 + 5}%`,
      delay: `-${Math.random() * 10}s`,
    }))
    setFloatingItems(items)
  }, [reviews])

  return (
    <div className="chaos-space">
      <div className="disc-container">
        <div className="vinyl-record"></div>
        <div className="orbit-ring orbit-1"></div>
        <div className="orbit-ring orbit-2"></div>
      </div>

      <div className="reviews-container">
        {floatingItems.map((item, index) => (
          <FloatingReview
            key={item.review.id || index}
            top={item.top}
            left={item.left}
            delay={item.delay}
            review={item.review}
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
