import type { Review } from '../../types'
import './SpotlightCard.css'

interface SpotlightCardProps {
  review: Review
  onClose: () => void
}

export function SpotlightCard({ review, onClose }: SpotlightCardProps) {
  
  const renderStars = (count: number) => {
    return '\u2605'.repeat(count) + '\u2606'.repeat(5 - count)
  }

  return (
    <div className="active-post-spotlight">
      <div
        style={{
          position: 'absolute',
          top: -20, bottom: -20, left: -20, right: -20,
          backgroundImage: review.coverUrl ? `url(${review.coverUrl})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(40px) grayscale(100%) brightness(0.15)',
          zIndex: -1
        }}
      ></div>
      <div
        onClick={onClose}
        style={{ position: 'absolute', top: '8px', right: '12px', cursor: 'pointer', color: '#888', fontSize: '20px', userSelect: 'none' }}
        title="Close Review"
      >✖</div>
      <div className="spotlight-header">
        <div
          className="spotlight-cover"
          style={review.coverUrl ? { backgroundImage: `url(${review.coverUrl})` } : { backgroundColor: '#222' }}
        ></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
          <div className="spotlight-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={review.album}>
            {review.album}
          </div>
          {review.type === 'sound' && review.collectionName && review.collectionName !== review.album && (
            <div style={{ color: '#aaa', fontSize: '16px', fontFamily: 'var(--text-font)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={review.collectionName}>
              {review.collectionName}
            </div>
          )}
          <div className="spotlight-artist" style={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
            <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={review.artist}>
              {review.artist}
            </span>
            <span className="type-badge" style={{ flexShrink: 0, marginLeft: '8px' }}>
              {review.type === 'sound' ? '[MUSIC]' : '[ALBUM]'}
            </span>
          </div>
        </div>
      </div>

      <div className="spotlight-text" style={{ fontStyle: 'italic' }}>
        "{review.text}"
      </div>

      <div style={{ textAlign: 'right', color: 'var(--cyan-neon)', fontFamily: 'var(--pixel-font)', fontSize: '20px', letterSpacing: '1px' }}>
        @{review.username}
      </div>

      <div className="spotlight-footer">
        <div className="stars">{renderStars(review.rating)}</div>
        <div className="sentiment-badge">
          <span style={{ fontSize: '20px' }}>{review.icon}</span>
          {review.sentiment}
        </div>
      </div>
    </div>
  )
}
