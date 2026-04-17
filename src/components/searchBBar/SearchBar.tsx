import { useState, useEffect, useRef } from 'react'
import type { ItunesResult } from '../../types'
import './SearchBar.css'

interface SearchBarProps {
  onSelect: (item: ItunesResult) => void
}

export function SearchBar({ onSelect }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<ItunesResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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

  return (
    <div style={{ position: 'relative', marginTop: '8px' }}>
      <input
        className="search-input"
        placeholder="Musica ou Album..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {isSearching && (
        <div className="search-dropdown">
          <div style={{ padding: '8px' }}>Buscando sinais...</div>
        </div>
      )}
      {searchResults.length > 0 && (
        <div className="search-dropdown">
          {searchResults.map(res => (
            <div
              className="search-result-item"
              key={res.trackId || res.collectionId}
              onClick={() => {
                onSelect(res)
                setSearchTerm('')
                setSearchResults([])
              }}
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
  )
}
