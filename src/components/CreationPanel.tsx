import type { ItunesResult, SelectedAlbum, Review } from '../types'
import { AlbumSelector } from './AlbumSelector'
import { ReviewEditor } from './ReviewEditor'

interface CreationPanelProps {
  selectedAlbum: SelectedAlbum | null
  reviewText: string
  rating: number
  sentiment: string
  selectedIcon: string
  onSelectAlbum: (item: ItunesResult) => void
  onClearAlbum: () => void
  onReviewTextChange: (text: string) => void
  onRatingChange: (rating: number) => void
  onSentimentChange: (sentiment: string) => void
  onIconChange: (icon: string) => void
  onLaunch: () => void
}

export function CreationPanel({
  selectedAlbum,
  reviewText,
  rating,
  sentiment,
  selectedIcon,
  onSelectAlbum,
  onClearAlbum,
  onReviewTextChange,
  onRatingChange,
  onSentimentChange,
  onIconChange,
  onLaunch,
}: CreationPanelProps) {
  return (
    <div className="creation-section">
      <div className="section-header">"Feeling"</div>

      <AlbumSelector
        selectedAlbum={selectedAlbum}
        onSelect={onSelectAlbum}
        onClear={onClearAlbum}
      />

      <ReviewEditor
        reviewText={reviewText}
        onReviewTextChange={onReviewTextChange}
        rating={rating}
        onRatingChange={onRatingChange}
        sentiment={sentiment}
        onSentimentChange={onSentimentChange}
        selectedIcon={selectedIcon}
        onIconChange={onIconChange}
      />

      <button className="launch-btn" onClick={onLaunch}>
        LAUNCH INTO SPACE
      </button>
    </div>
  )
}
