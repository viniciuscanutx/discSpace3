import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
    activePost, chaosReviews, userXp, xpProgress, showLaunchAnimation, username,
    setSelectedAlbum, clearSelectedAlbum, setReviewText, setCustomSentiment,
    setSelectedIcon, setRating, setActivePost, launchReview, hideLaunchAnimation,
  } = useAppStore()

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
        onLaunch={launchReview}
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
