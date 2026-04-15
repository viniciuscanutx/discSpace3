import { useState } from 'react'
import { AVAILABLE_ICONS } from '../constants'

interface ReviewEditorProps {
  reviewText: string
  onReviewTextChange: (text: string) => void
  rating: number
  onRatingChange: (rating: number) => void
  sentiment: string
  onSentimentChange: (sentiment: string) => void
  selectedIcon: string
  onIconChange: (icon: string) => void
}

export function ReviewEditor({
  reviewText,
  onReviewTextChange,
  rating,
  onRatingChange,
  sentiment,
  onSentimentChange,
  selectedIcon,
  onIconChange,
}: ReviewEditorProps) {
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false)

  return (
    <>
      <div className="review-input-container">
        <textarea
          className="review-text-area"
          placeholder="Tente descrever seus sentimentos..."
          maxLength={300}
          value={reviewText}
          onChange={(e) => onReviewTextChange(e.target.value)}
        ></textarea>
        <div style={{ textAlign: 'right', fontSize: '15px', color: '#666', marginTop: '4px' }}>
          {reviewText.length}/300
        </div>
      </div>

      <div className="rating-container">
        <span className="rating-label">RATING:</span>
        <div className="stars-selector">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => onRatingChange(star)}
              style={{ color: star <= rating ? 'var(--yellow-star)' : '#444' }}
            >★</span>
          ))}
        </div>
      </div>

      <div className="status-report-container">
        <span className="status-label">STATUS REPORT</span>
        <div className="status-input-row" style={{ position: 'relative' }}>
          <div
            className="selected-icon-box"
            style={{ cursor: 'pointer' }}
            onClick={() => setIsIconPickerOpen(!isIconPickerOpen)}
          >
            {selectedIcon}
          </div>
          {isIconPickerOpen && (
            <div className="icon-picker-popup">
              {AVAILABLE_ICONS.map(i => (
                <span
                  key={i}
                  className={`mini-icon ${selectedIcon === i ? 'active' : ''}`}
                  onClick={() => {
                    onIconChange(i)
                    setIsIconPickerOpen(false)
                  }}
                >{i}</span>
              ))}
            </div>
          )}
          <input
            className="sentiment-text-input"
            type="text"
            placeholder="SEU SENTIMENTO..."
            maxLength={20}
            value={sentiment}
            onChange={(e) => onSentimentChange(e.target.value)}
          />
        </div>
      </div>
    </>
  )
}
