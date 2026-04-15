import type { ItunesResult, SelectedAlbum } from '../types'
import { SearchBar } from './SearchBar'

interface AlbumSelectorProps {
  selectedAlbum: SelectedAlbum | null
  onSelect: (item: ItunesResult) => void
  onClear: () => void
}

export function AlbumSelector({ selectedAlbum, onSelect, onClear }: AlbumSelectorProps) {
  return (
    <div className="active-album-box">
      {selectedAlbum && (
        <div
          className="clear-selection-btn"
          onClick={onClear}
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
        <SearchBar onSelect={onSelect} />
      </div>
    </div>
  )
}
