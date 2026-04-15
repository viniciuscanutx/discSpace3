import { useState, useEffect, useRef } from 'react'
import type { ItunesResult, SelectedAlbum, Review, ChaosReview } from './types'
import { DEFAULT_USERNAME } from './constants'
import { MOCK_DATA } from './data/mockData'
import { CreationPanel } from './components/CreationPanel'
import { ChaosSpace } from './components/ChaosSpace'
import { UserProfile } from './components/UserProfile'

function App() {
  const [username] = useState(DEFAULT_USERNAME)
  const [selectedAlbum, setSelectedAlbum] = useState<SelectedAlbum | null>(null)
  const [reviewText, setReviewText] = useState('')
  const [customSentiment, setCustomSentiment] = useState('')
  const [selectedIcon, setSelectedIcon] = useState('👽')
  const [rating, setRating] = useState(5)

  const [activePost, setActivePost] = useState<Review>(MOCK_DATA[0])
  const [chaosReviews, setChaosReviews] = useState<ChaosReview[]>([
    { id: 1, top: '10%', left: '15%', delay: '0s', review: MOCK_DATA[0] },
    { id: 2, top: '70%', left: '40%', delay: '-2s', review: MOCK_DATA[1] }
  ])

  const [userXp, setUserXp] = useState(1)
  const [xpProgress, setXpProgress] = useState(20)

  const selectAlbumFromSearch = (item: ItunesResult) => {
    setSelectedAlbum({
      title: item.trackName || item.collectionName || '',
      collectionName: item.collectionName,
      artist: item.artistName,
      coverUrl: item.artworkUrl100?.replace('100x100', '400x400') ?? '',
      type: item.wrapperType,
      releaseDate: item.releaseDate ? item.releaseDate.substring(0, 4) : '',
      previewUrl: item.previewUrl || null
    })
  }

  const handleLaunch = () => {
    if (!selectedAlbum) return alert('Selecione uma música ou álbum antes de lançar!')
    if (!reviewText.trim()) return

    const novoReview: Review = {
      type: selectedAlbum.type,
      album: selectedAlbum.title,
      collectionName: selectedAlbum.collectionName,
      artist: selectedAlbum.artist,
      coverUrl: selectedAlbum.coverUrl,
      previewUrl: selectedAlbum.previewUrl,
      text: reviewText,
      sentiment: customSentiment || '',
      icon: selectedIcon,
      rating,
      username,
      xp: Math.floor(Math.random() * 50) + 10
    }

    setActivePost(novoReview)

    setSelectedAlbum(null)
    setReviewText('')
    setCustomSentiment('')
    setSelectedIcon('👽')
    setRating(5)

    const newChaosItem: ChaosReview = {
      id: Date.now(),
      top: (Math.random() * 70 + 5) + '%',
      left: (Math.random() * 75 + 5) + '%',
      delay: -(Math.random() * 10) + 's',
      review: novoReview
    }

    setChaosReviews(prev => [...prev, newChaosItem])

    setXpProgress(prev => {
      let newProgress = prev + novoReview.xp
      if (newProgress >= 100) {
        setUserXp(u => u + 1)
        newProgress = newProgress - 100
      }
      return newProgress
    })
  }

  // Player de Áudio Ambiente
  useEffect(() => {
    let audio: HTMLAudioElement | null = null
    if (activePost.previewUrl) {
      audio = new Audio(activePost.previewUrl)
      audio.volume = 0.15
      audio.play().catch(e => console.log('Autoplay bloqueado pelo navegador:', e))
    }

    return () => {
      if (audio) {
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [activePost])

  return (
    <>
      <CreationPanel
        selectedAlbum={selectedAlbum}
        reviewText={reviewText}
        rating={rating}
        sentiment={customSentiment}
        selectedIcon={selectedIcon}
        onSelectAlbum={selectAlbumFromSearch}
        onClearAlbum={() => setSelectedAlbum(null)}
        onReviewTextChange={setReviewText}
        onRatingChange={setRating}
        onSentimentChange={setCustomSentiment}
        onIconChange={setSelectedIcon}
        onLaunch={handleLaunch}
      />

      <ChaosSpace
        activePost={activePost}
        onPostSelect={setActivePost}
        onPostClose={() => setActivePost(null)}
        chaosReviews={chaosReviews}
        onFloatingSelect={setActivePost}
      />

      <UserProfile
        username={username}
        level={userXp}
        xpProgress={xpProgress}
      />
    </>
  )
}

export default App
