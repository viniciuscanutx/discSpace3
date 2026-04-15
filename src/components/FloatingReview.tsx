import type { Review } from '../types'

interface FloatingReviewProps {
  top: string
  left: string
  delay: string
  review: Review
  onSelect: (rev: Review) => void
}

export function FloatingReview({ top, left, delay, review, onSelect }: FloatingReviewProps) {
  return (
    <div
      className="floating-review"
      style={{
        top,
        left,
        animation: `drift 10s infinite alternate ease-in-out ${delay}`
      }}
      onClick={() => onSelect(review)}
      title={review.album}
    >
      <div
        className="mini-cover"
        style={{
          backgroundImage: review.coverUrl
            ? `url(${review.coverUrl})`
            : 'linear-gradient(45deg, #222, #555)'
        }}
      >
        {!review.coverUrl && <span style={{ fontSize: '12px' }}>{review.icon}</span>}
      </div>
      <div style={{ fontSize: '9px', color: '#ccc', marginTop: '4px', maxWidth: '40px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        @{review.username}
      </div>
      <style>{`
        @keyframes drift { 0% { transform: translateY(0); } 100% { transform: translateY(-15px) rotate(3deg); } }
      `}</style>
    </div>
  )
}
