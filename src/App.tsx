import { useState, useEffect, useRef, type FormEvent } from 'react'

// ── Types ───────────────────────────────────────────────────────
interface ItunesResult {
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

interface SelectedAlbum {
  title: string
  collectionName?: string
  artist: string
  coverUrl: string
  type: string
  releaseDate: string
  previewUrl: string | null
}

interface Review {
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

interface ChaosReview {
  id: number
  top: string
  left: string
  delay: string
  review: Review
}

// ── Constants ───────────────────────────────────────────────────
const AVAILABLE_ICONS = ['✨','👽','🖤','💀','🚀','🎶','🔮','🔥','🧠']

// ── Mock Data ───────────────────────────────────────────────────
const MOCK_DATA: Review[] = [
  {
    id: 1,
    type: 'album',
    album: 'In Rainbows',
    artist: 'Radiohead',
    text: 'Mergulho profundo na melancolia imersiva. Uma obra-prima de produção. Cuidado com o oxigênio! A transição rítmica em "15 Step" ainda quebra minha mente.',
    sentiment: 'MELANCOLIA',
    icon: '💧',
    rating: 5,
    username: 'GalacticVibe',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music115/v4/4a/4c/cb/4a4ccbb2-b67f-4b07-dded-d39b8b1effa6/191428135080.jpg/400x400cc.jpg',
    xp: 45
  },
  {
    id: 2,
    type: 'track',
    album: 'Nights',
    collectionName: 'blonde.',
    artist: 'Frank Ocean',
    text: 'A batida dessa track viaja no espaço tempo em que estou agora. Som absurdo.',
    sentiment: 'NOSTALGIA',
    icon: '🚀',
    rating: 5,
    username: 'StarBoy_BR',
    coverUrl: 'https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/7f/8a/40/7f8a403d-946d-9f67-888e-5543494e3046/190758758131.jpg/400x400cc.jpg',
    xp: 30
  }
]

// ── Sub-components ──────────────────────────────────────────────
function FloatingReview({ top, left, delay, review, onSelect }: {
  top: string
  left: string
  delay: string
  review: Review
  onSelect: (rev: Review) => void
}) {
  return (
    <div
      className="floating-review"
      style={{
        top,
        left,
        animation: `drift 10s infinite alternate ease-in-out ${delay}`
      }}
      onClick={() => onSelect(review)}
      title={review.album}
    >
      <div
        className="mini-cover"
        style={{
          backgroundImage: review.coverUrl
            ? `url(${review.coverUrl})`
            : 'linear-gradient(45deg, #222, #555)'
        }}
      >
        {!review.coverUrl && <span style={{ fontSize: '12px' }}>{review.icon}</span>}
      </div>
      <div style={{ fontSize: '9px', color: '#ccc', marginTop: '4px', maxWidth: '40px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        @{review.username}
      </div>
      <style>{`
        @keyframes drift { 0% { transform: translateY(0); } 100% { transform: translateY(-15px) rotate(3deg); } }
      `}</style>
    </div>
  )
}

// ── Main App ────────────────────────────────────────────────────
function App() {
  const [username] = useState('AstroNauta_Br')

  const [selectedAlbum, setSelectedAlbum] = useState<SelectedAlbum | null>(null)
  const [reviewText, setReviewText] = useState('')
  const [customSentiment, setCustomSentiment] = useState('')
  const [selectedIcon, setSelectedIcon] = useState('👽')
  const [isIconPickerOpen, setIsIconPickerOpen] = useState(false)
  const [rating, setRating] = useState(5)

  // Busca de Álbuns na ITUNES API
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<ItunesResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Post Ativo & Lista Caótica
  const [activePost, setActivePost] = useState<Review>(MOCK_DATA[0])
  const [chaosReviews, setChaosReviews] = useState<ChaosReview[]>([
    { id: 1, top: '10%', left: '15%', delay: '0s', review: MOCK_DATA[0] },
    { id: 2, top: '70%', left: '40%', delay: '-2s', review: MOCK_DATA[1] }
  ])

  const [userXp, setUserXp] = useState(1)
  const [xpProgress, setXpProgress] = useState(20)

  // Busca na API da Apple Music (iTunes)
  useEffect(() => {
    if (searchTerm.trim().length < 3) {
      setSearchResults([])
      return
    }

    if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current)

    searchTimeoutRef.current = setTimeout(async () => {
      setIsSearching(true)
      try {
        const url = `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&media=music&limit=15`
        const response = await fetch(url)
        const data = await response.json()
        setSearchResults(data.results || [])
      } catch (err) {
        console.error('Falha na busca:', err)
      } finally {
        setIsSearching(false)
      }
    }, 500)

  }, [searchTerm])

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
    setSearchTerm('')
    setSearchResults([])
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

    // Reset forms
    setSelectedAlbum(null)
    setSearchTerm('')
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

    // Update Level/XP
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

  const renderStars = (count: number) => {
    return '\u2605'.repeat(count) + '\u2606'.repeat(5 - count)
  }

  return (
    <>
      {/* SEÇÃO 1: CREATION */}
      <div className="creation-section">
        <div className="section-header">"Feeling"</div>

        {/* Box de Seleção de Álbum */}
        <div className="active-album-box">
          {selectedAlbum && (
            <div
              className="clear-selection-btn"
              onClick={() => setSelectedAlbum(null)}
              title="Remover Seleção"
            >✖</div>
          )}
          <div
            className={`album-cover-pixel ${!selectedAlbum?.coverUrl ? 'cover-fallback' : ''}`}
            style={selectedAlbum?.coverUrl ? { backgroundImage: `url(${selectedAlbum.coverUrl})` } : {}}
          ></div>
          <div className="album-info-creation">
            {selectedAlbum && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
                <span className="album-info-title" title={selectedAlbum.title}>{selectedAlbum.title}</span>
                {selectedAlbum.type === 'track' && selectedAlbum.collectionName && selectedAlbum.collectionName !== selectedAlbum.title && (
                  <span style={{ color: '#aaa', fontSize: '13px', fontFamily: 'var(--text-font)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={selectedAlbum.collectionName}>
                    {selectedAlbum.collectionName}
                  </span>
                )}
                <span className="album-info-artist" style={{ display: 'flex', alignItems: 'center' }}>
                  <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={selectedAlbum.artist}>{selectedAlbum.artist}</span>
                  <span className="type-badge" style={{ flexShrink: 0, fontSize: '10px', padding: '1px 4px', marginLeft: '8px' }}>
                    {selectedAlbum.type === 'track' ? '[MUSIC]' : '[ALBUM]'}
                  </span>
                </span>
                <span className="album-info-date">{selectedAlbum.releaseDate}</span>
              </div>
            )}

            <div style={{ position: 'relative', marginTop: selectedAlbum ? '8px' : '0' }}>
              <input
                className="search-input"
                placeholder="Musica ou Album..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {isSearching && <div className="search-dropdown"><div style={{ padding: '8px' }}>Buscando sinais...</div></div>}
              {searchResults.length > 0 && (
                <div className="search-dropdown">
                  {searchResults.map(res => (
                    <div
                      className="search-result-item"
                      key={res.trackId || res.collectionId}
                      onClick={() => selectAlbumFromSearch(res)}
                    >
                      <img src={res.artworkUrl100} className="search-result-cover" alt={res.trackName || res.collectionName || ''} />
                      <div style={{ flex: 1, overflow: 'hidden' }}>
                        <div style={{ color: '#fff', fontSize: '14px', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                          {res.trackName || res.collectionName}
                        </div>
                        <div style={{ color: '#888', fontSize: '12px' }}>{res.artistName}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* CAIXA DE REVIEW */}
        <div className="review-input-container">
          <textarea
            className="review-text-area"
            placeholder="Tente descrever seus sentimentos..."
            maxLength={300}
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          ></textarea>
          <div style={{ textAlign: 'right', fontSize: '15px', color: '#666', marginTop: '4px' }}>
            {reviewText.length}/300
          </div>
        </div>

        {/* DIV DA NOTA (RATING) */}
        <div className="rating-container">
          <span className="rating-label">RATING:</span>
          <div className="stars-selector">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                style={{ color: star <= rating ? 'var(--yellow-star)' : '#444' }}
              >★</span>
            ))}
          </div>
        </div>

        {/* CAIXA DE STATUS REPORT (ÍCONE E SENTIMENTO) */}
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
                      setSelectedIcon(i)
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
              value={customSentiment}
              onChange={(e) => setCustomSentiment(e.target.value)}
            />
          </div>
        </div>

        <button className="launch-btn" onClick={handleLaunch}>
          LAUNCH INTO SPACE
        </button>
      </div>

      {/* SEÇÃO 2: CHAOS SCROLL */}
      <div className="chaos-section">
        <div className="chaos-space">
          <div className="vinyl-record"></div>
          <div className="orbit-ring orbit-1"></div>
          <div className="orbit-ring orbit-2"></div>

          {/* Cards flutuantes no fundo */}
          {chaosReviews.map(item => (
            <FloatingReview
              key={item.id}
              top={item.top}
              left={item.left}
              delay={item.delay}
              review={item.review}
              onSelect={(rev) => setActivePost(rev)}
            />
          ))}

          {/* O POST ATIVO */}
          {activePost && (
            <div className="active-post-spotlight">
              <div
                style={{
                  position: 'absolute',
                  top: -20, bottom: -20, left: -20, right: -20,
                  backgroundImage: activePost.coverUrl ? `url(${activePost.coverUrl})` : 'none',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'blur(40px) grayscale(100%) brightness(0.15)',
                  zIndex: -1
                }}
              ></div>
              <div
                onClick={() => setActivePost(null)}
                style={{ position: 'absolute', top: '8px', right: '12px', cursor: 'pointer', color: '#888', fontSize: '20px', userSelect: 'none' }}
                title="Close Review"
              >✖</div>
              <div className="spotlight-header">
                <div
                  className="spotlight-cover"
                  style={activePost.coverUrl ? { backgroundImage: `url(${activePost.coverUrl})` } : { backgroundColor: '#222' }}
                ></div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
                  <div className="spotlight-title" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={activePost.album}>
                    {activePost.album}
                  </div>
                  {activePost.type === 'track' && activePost.collectionName && activePost.collectionName !== activePost.album && (
                    <div style={{ color: '#aaa', fontSize: '16px', fontFamily: 'var(--text-font)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={activePost.collectionName}>
                      {activePost.collectionName}
                    </div>
                  )}
                  <div className="spotlight-artist" style={{ display: 'flex', alignItems: 'center', minWidth: 0 }}>
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={activePost.artist}>
                      {activePost.artist}
                    </span>
                    <span className="type-badge" style={{ flexShrink: 0, marginLeft: '8px' }}>
                      {activePost.type === 'track' ? '[MUSIC]' : '[ALBUM]'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="spotlight-text" style={{ fontStyle: 'italic' }}>
                "{activePost.text}"
              </div>

              <div style={{ textAlign: 'right', color: 'var(--cyan-neon)', fontFamily: 'var(--pixel-font)', fontSize: '20px', letterSpacing: '1px' }}>
                @{activePost.username}
              </div>

              <div className="spotlight-footer">
                <div className="stars">{renderStars(activePost.rating)}</div>
                <div className="sentiment-badge">
                  <span style={{ fontSize: '20px' }}>{activePost.icon}</span>
                  {activePost.sentiment}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PERFIL */}
        <div className="user-profile">
          <div className="avatar-box">🤺</div>
          <div className="profile-details">
            <div className="player-level">SOUND EXPLORER LV. {userXp}</div>
            <div className="xp-bar-wrapper">
              <span className="xp-label">XP</span>
              <div className="xp-bar-fill" style={{ width: `${xpProgress}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
