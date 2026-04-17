import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAppStore } from './store/useAppStore'
import { DEFAULT_USERNAME } from './constants'
import { CreationPanel } from './components/creationPanel/CreationPanel'
import { ChaosSpace } from './components/chaosSpace/ChaosSpace'
import { UserProfile } from './components/userProfile/UserProfile'
import { AudioPlayer } from './components/audioPlayer/AudioPlayer'
import { LaunchAnimation } from './components/launchAnimation/LaunchAnimation'
import { AboutPage } from './pages/AboutPage'

function HomeView() {
  const {
    selectedAlbum, reviewText, customSentiment, selectedIcon, rating,
    activePost, chaosReviews, userXp, xpProgress, showLaunchAnimation,
    setSelectedAlbum, clearSelectedAlbum, setReviewText, setCustomSentiment,
    setSelectedIcon, setRating, setActivePost, launchReview, hideLaunchAnimation,
  } = useAppStore()

  return (
    <>
      <div className="about-link-container">
        <a href="/about" className="about-link">ABOUT</a>
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
        username={DEFAULT_USERNAME}
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
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
