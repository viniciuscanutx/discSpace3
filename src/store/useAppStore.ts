import { create } from 'zustand'
import type { SelectedAlbum, Review, ChaosReview, ItunesResult } from '../types'
import { MOCK_DATA } from '../data/mockData'

interface AppState {
  selectedAlbum: SelectedAlbum | null
  reviewText: string
  customSentiment: string
  selectedIcon: string
  rating: number
  activePost: Review | null
  chaosReviews: ChaosReview[]
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
  launchReview: () => boolean
  hideLaunchAnimation: () => void

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
  activePost: MOCK_DATA[0],
  chaosReviews: [
    { id: 1, top: '10%', left: '15%', delay: '0s', review: MOCK_DATA[0] },
    { id: 2, top: '70%', left: '40%', delay: '-2s', review: MOCK_DATA[1] }
  ],
  userXp: 1,
  xpProgress: 20,
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
      type: item.wrapperType,
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

  launchReview: () => {
    const state = get()
    if (!state.selectedAlbum || !state.reviewText.trim()) return false

    const novoReview: Review = {
      type: state.selectedAlbum.type,
      album: state.selectedAlbum.title,
      collectionName: state.selectedAlbum.collectionName,
      artist: state.selectedAlbum.artist,
      coverUrl: state.selectedAlbum.coverUrl,
      previewUrl: state.selectedAlbum.previewUrl,
      text: state.reviewText,
      sentiment: state.customSentiment || '',
      icon: state.selectedIcon,
      rating: state.rating,
      username: state.username || 'Space User',
      xp: Math.floor(Math.random() * 50) + 10
    }

    const newChaosItem: ChaosReview = {
      id: Date.now(),
      top: (Math.random() * 70 + 5) + '%',
      left: (Math.random() * 75 + 5) + '%',
      delay: -(Math.random() * 10) + 's',
      review: novoReview
    }

    // XP
    let newProgress = state.xpProgress + novoReview.xp
    let newUserXp = state.userXp
    if (newProgress >= 100) {
      newUserXp = state.userXp + 1
      newProgress = newProgress - 100
    }

    set({
      activePost: novoReview,
      chaosReviews: [...state.chaosReviews, newChaosItem],
      selectedAlbum: null,
      reviewText: '',
      customSentiment: '',
      selectedIcon: '👽',
      rating: 5,
      userXp: newUserXp,
      xpProgress: newProgress,
      showLaunchAnimation: true,
    })

    return true
  },

  hideLaunchAnimation: () => set({ showLaunchAnimation: false }),

  // Audio
  setAudioPlaying: (playing) => set(state => ({ audioPlayer: { ...state.audioPlayer, isPlaying: playing } })),
  setAudioVolume: (volume) => set(state => ({ audioPlayer: { ...state.audioPlayer, volume } })),
  setAudioTime: (time) => set(state => ({ audioPlayer: { ...state.audioPlayer, currentTime: time } })),
  setAudioDuration: (duration) => set(state => ({ audioPlayer: { ...state.audioPlayer, duration } })),
  setAudioTrackTitle: (title) => set(state => ({ audioPlayer: { ...state.audioPlayer, trackTitle: title } })),
}))
