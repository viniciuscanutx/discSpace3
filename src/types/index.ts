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
  type: 'album' | 'sound'
  releaseDate: string
  previewUrl: string | null
}

export interface Review {
  id?: number
  type: 'album' | 'sound'
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

export interface ApiReview {
  review_id: string
  album_name: string
  title: string
  artist: string
  cover_url: string
  preview_url: string | null
  price?: number
  rating: string
  sentiment: string
  text: string
  icon: string
  type: 'album' | 'sound'
  username: string
  xp: number
}

export interface CreateReviewPayload {
  album_name: string
  title: string
  artist: string
  cover_url: string
  preview_url?: string | null
  rating: string
  sentiment: string
  text: string
  icon: string
  type: 'album' | 'sound'
  username: string
  xp?: number
}

export interface ApiResponse<T> {
  success: boolean
  message: string
  data?: T
}
