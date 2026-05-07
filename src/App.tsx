import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useAppStore } from './store/useAppStore'
import { CreationPanel } from './components/creationPanel/CreationPanel'
import { ChaosSpace } from './components/chaosSpace/ChaosSpace'
import { UserProfile } from './components/userProfile/UserProfile'
import { AudioPlayer } from './components/audioPlayer/AudioPlayer'
import { LaunchAnimation } from './components/launchAnimation/LaunchAnimation'
import { AboutPage } from './pages/AboutPage'
import { LoginPage } from './pages/LoginPage'

function HomeView() {
  const {
    selectedAlbum, reviewText, customSentiment, selectedIcon, rating,
    activePost, reviews, userXp, xpProgress, showLaunchAnimation, username,
    setSelectedAlbum, clearSelectedAlbum, setReviewText, setCustomSentiment,
    setSelectedIcon, setRating, setActivePost, submitReview, hideLaunchAnimation,
    fetchReviews,
  } = useAppStore()

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  useEffect(() => {
    if (reviews.length > 0 && !activePost) {
      const randomReview = reviews[Math.floor(Math.random() * reviews.length)]
      setActivePost(randomReview)
    }
  }, [reviews])

  if (!username) {
    return <Navigate to="/login" replace />
  }

  return (
    <>
      <div className="about-link-container">
        <a href="/about" className="about-link">SOBRE</a>
      </div>

      <CreationPanel
        selectedAlbum={selectedAlbum}
        reviewText={reviewText}
        rating={rating}
        sentiment={customSentiment}
        selectedIcon={selectedIcon}
        onSelectAlbum={setSelectedAlbum}
        onClearAlbum={clearSelectedAlbum}
        onReviewTextChange={setReviewText}
        onRatingChange={setRating}
        onSentimentChange={setCustomSentiment}
        onIconChange={setSelectedIcon}
        onLaunch={submitReview}
      />

      <ChaosSpace
        activePost={activePost}
        onPostSelect={setActivePost}
        onPostClose={() => setActivePost(null)}
        reviews={reviews}
        onFloatingSelect={setActivePost}
      />

      <UserProfile
        username={username}
        level={userXp}
        xpProgress={xpProgress}
      />

      <AudioPlayer />
      <LaunchAnimation active={showLaunchAnimation} onComplete={hideLaunchAnimation} />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
