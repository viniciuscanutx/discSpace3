export interface ItunesResult {
  trackId?: number
  collectionId?: number
  trackName?: string
  collectionName?: string
  artistName: string
  artworkUrl100: string
  wrapperType: string
  releaseDate?: string
  previewUrl?: string | null
}

export interface SelectedAlbum {
  title: string
  collectionName?: string
  artist: string
  coverUrl: string
  type: string
  releaseDate: string
  previewUrl: string | null
}

export interface Review {
  id?: number
  type: string
  album: string
  collectionName?: string
  artist: string
  coverUrl: string
  previewUrl: string | null
  text: string
  sentiment: string
  icon: string
  rating: number
  username: string
  xp: number
}

export interface ChaosReview {
  id: number
  top: string
  left: string
  delay: string
  review: Review
}
