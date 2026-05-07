import type { ItunesResult, SelectedAlbum } from '../../types'
import { SearchBar } from '../searchBBar/SearchBar'
import './albumSelector.css'

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
        className={`album-cover-pixel ${!selectedAlbum?.coverUrl ? 'cover-fallback-empty' : ''}`}
        style={selectedAlbum?.coverUrl ? { backgroundImage: `url(${selectedAlbum.coverUrl})` } : {}}
      >
        {!selectedAlbum?.coverUrl && <div className="album-fallback-vinyl"></div>}
      </div>
      <div className="album-info-creation">
        {selectedAlbum ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
            <span className="album-info-title" title={selectedAlbum.title}>{selectedAlbum.title}</span>
            {selectedAlbum.type === 'sound' && selectedAlbum.collectionName && selectedAlbum.collectionName !== selectedAlbum.title && (
              <span style={{ color: '#aaa', fontSize: '13px', fontFamily: 'var(--text-font)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={selectedAlbum.collectionName}>
                {selectedAlbum.collectionName}
              </span>
            )}
            <span className="album-info-artist" style={{ display: 'flex', alignItems: 'center' }}>
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={selectedAlbum.artist}>{selectedAlbum.artist}</span>
              <span className="type-badge" style={{ flexShrink: 0, fontSize: '10px', padding: '1px 4px', marginLeft: '8px' }}>
                {selectedAlbum.type === 'sound' ? '[MUSIC]' : '[ALBUM]'}
              </span>
            </span>
            <span className="album-info-date">{selectedAlbum.releaseDate}</span>
          </div>
        ) : (
          <div className="empty-selection-msg">
            <span className="empty-title">Ainda não selecionado</span>
            <span className="empty-subtitle">Busque uma música ou álbum abaixo</span>
          </div>
        )}
        <SearchBar onSelect={onSelect} />
      </div>
    </div>
  )
}
