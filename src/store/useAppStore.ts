import { create } from 'zustand'
import type { SelectedAlbum, Review, ItunesResult, CreateReviewPayload } from '../types'
import { getReviews, createReview as apiCreateReview, deleteReview as apiDeleteReview } from '../services/api'

interface AppState {
  selectedAlbum: SelectedAlbum | null
  reviewText: string
  customSentiment: string
  selectedIcon: string
  rating: number
  activePost: Review | null
  reviews: Review[]
  reviewsLoading: boolean
  reviewsError: string | null
  userXp: number
  xpProgress: number
  audioPlayer: {
    isPlaying: boolean
    volume: number
    currentTime: number
    duration: number
    trackTitle: string
  }
  showLaunchAnimation: boolean
  username: string

  // Actions
  setUsername: (name: string) => void
  setSelectedAlbum: (album: ItunesResult) => void
  clearSelectedAlbum: () => void
  setReviewText: (text: string) => void
  setCustomSentiment: (sentiment: string) => void
  setSelectedIcon: (icon: string) => void
  setRating: (rating: number) => void
  setActivePost: (post: Review | null) => void
  hideLaunchAnimation: () => void

  // API
  fetchReviews: () => Promise<void>
  submitReview: () => Promise<boolean>
  removeReview: (id: string) => Promise<boolean>

  // Audio
  setAudioPlaying: (playing: boolean) => void
  setAudioVolume: (volume: number) => void
  setAudioTime: (time: number) => void
  setAudioDuration: (duration: number) => void
  setAudioTrackTitle: (title: string) => void
}

export const useAppStore = create<AppState>((set, get) => ({
  selectedAlbum: null,
  reviewText: '',
  customSentiment: '',
  selectedIcon: '👽',
  rating: 5,
  activePost: null,
  reviews: [],
  reviewsLoading: false,
  reviewsError: null,
  userXp: parseInt(localStorage.getItem('discSpace_userXp') || '1', 10),
  xpProgress: parseInt(localStorage.getItem('discSpace_xpProgress') || '0', 10),
  audioPlayer: {
    isPlaying: false,
    volume: 0.15,
    currentTime: 0,
    duration: 0,
    trackTitle: '',
  },
  showLaunchAnimation: false,
  username: localStorage.getItem('discSpace_username') || '',

  setUsername: (name) => {
    localStorage.setItem('discSpace_username', name)
    set({ username: name })
  },

  setSelectedAlbum: (item) => set({
    selectedAlbum: {
      title: item.trackName || item.collectionName || '',
      collectionName: item.collectionName,
      artist: item.artistName,
      coverUrl: item.artworkUrl100?.replace('100x100', '400x400') ?? '',
      type: item.wrapperType === 'collection' ? 'album' : 'sound',
      releaseDate: item.releaseDate ? item.releaseDate.substring(0, 4) : '',
      previewUrl: item.previewUrl || null
    }
  }),
  
  clearSelectedAlbum: () => set({ selectedAlbum: null }),
  setReviewText: (text) => set({ reviewText: text }),
  setCustomSentiment: (sentiment) => set({ customSentiment: sentiment }),
  setSelectedIcon: (icon) => set({ selectedIcon: icon }),
  setRating: (rating) => set({ rating }),
  setActivePost: (post) => set({ activePost: post }),

  hideLaunchAnimation: () => set({ showLaunchAnimation: false }),

  // API
  fetchReviews: async () => {
    set({ reviewsLoading: true, reviewsError: null })
    const response = await getReviews()
    if (response.success && response.data) {
      const mappedReviews: Review[] = response.data.map((r) => ({
        id: parseInt(r.review_id, 10),
        type: r.type,
        album: r.album_name || r.title || '',
        artist: r.artist,
        coverUrl: r.cover_url,
        previewUrl: r.preview_url,
        text: r.text,
        sentiment: r.sentiment,
        icon: r.icon,
        rating: parseFloat(r.rating),
        username: r.username,
        xp: r.xp,
      }))
      set({ reviews: mappedReviews, reviewsLoading: false })
    } else {
      set({ reviewsError: response.message, reviewsLoading: false })
    }
  },

  submitReview: async () => {
    const state = get()
    if (!state.selectedAlbum || !state.reviewText.trim()) return false

    const payload: CreateReviewPayload = {
      album_name: state.selectedAlbum.title,
      title: state.selectedAlbum.title,
      artist: state.selectedAlbum.artist,
      cover_url: state.selectedAlbum.coverUrl,
      preview_url: state.selectedAlbum.previewUrl,
      rating: String(state.rating),
      sentiment: state.customSentiment || '',
      text: state.reviewText,
      icon: state.selectedIcon,
      type: state.selectedAlbum.type as 'album' | 'sound',
      username: state.username || 'Space User',
    }

    const xpEarned = Math.floor(Math.random() * 50) + 10
    let newProgress = state.xpProgress + xpEarned
    let newUserXp = state.userXp
    if (newProgress >= 100) {
      newUserXp = state.userXp + 1
      newProgress = newProgress - 100
    }

    localStorage.setItem('discSpace_userXp', String(newUserXp))
    localStorage.setItem('discSpace_xpProgress', String(newProgress))

    const response = await apiCreateReview({ ...payload, xp: xpEarned })
    if (response.success) {
      set({
        selectedAlbum: null,
        reviewText: '',
        customSentiment: '',
        selectedIcon: '👽',
        rating: 5,
        userXp: newUserXp,
        xpProgress: newProgress,
        showLaunchAnimation: true,
      })
      await get().fetchReviews()
      return true
    }
    return false
  },

  removeReview: async (id: string) => {
    const response = await apiDeleteReview(id)
    if (response.success) {
      set(state => ({ reviews: state.reviews.filter(r => r.id?.toString() !== id) }))
      return true
    }
    return false
  },

  // Audio
  setAudioPlaying: (playing) => set(state => ({ audioPlayer: { ...state.audioPlayer, isPlaying: playing } })),
  setAudioVolume: (volume) => set(state => ({ audioPlayer: { ...state.audioPlayer, volume } })),
  setAudioTime: (time) => set(state => ({ audioPlayer: { ...state.audioPlayer, currentTime: time } })),
  setAudioDuration: (duration) => set(state => ({ audioPlayer: { ...state.audioPlayer, duration } })),
  setAudioTrackTitle: (title) => set(state => ({ audioPlayer: { ...state.audioPlayer, trackTitle: title } })),
}))
