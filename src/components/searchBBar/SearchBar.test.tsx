import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SearchBar } from './SearchBar'

describe('SearchBar', () => {
  const mockOnSelect = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    // Mock fetch for iTunes API
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the search input with placeholder', () => {
    render(<SearchBar onSelect={mockOnSelect} />)
    const input = screen.getByPlaceholderText('Musica ou Album...')
    expect(input).toBeInTheDocument()
  })

  it('does not search when input has less than 3 characters', async () => {
    const user = userEvent.setup({ delay: null })
    render(<SearchBar onSelect={mockOnSelect} />)
    const input = screen.getByPlaceholderText('Musica ou Album...')
    await user.type(input, 'ab')

    // Wait to ensure no fetch is called
    await waitFor(() => {
      expect(global.fetch).not.toHaveBeenCalled()
    })
  })

  it('calls fetch API when input has 3+ characters', async () => {
    const user = userEvent.setup({ delay: null })
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      json: () => Promise.resolve({ results: [] }),
    })

    render(<SearchBar onSelect={mockOnSelect} />)
    const input = screen.getByPlaceholderText('Musica ou Album...')
    await user.type(input, 'rad')

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled()
    }, { timeout: 2000 })
  })

  it('calls onSelect when clicking a result', async () => {
    const mockResult = {
      trackId: 1,
      trackName: 'Creep',
      collectionName: 'Pablo Honey',
      artistName: 'Radiohead',
      artworkUrl100: 'http://example.com/cover.jpg',
      wrapperType: 'track',
    }
    ;(global.fetch as ReturnType<typeof vi.fn>).mockResolvedValue({
      json: () => Promise.resolve({ results: [mockResult] }),
    })

    const user = userEvent.setup({ delay: null })
    render(<SearchBar onSelect={mockOnSelect} />)
    const input = screen.getByPlaceholderText('Musica ou Album...')
    await user.type(input, 'rad')

    await waitFor(() => {
      expect(screen.getByText('Creep')).toBeInTheDocument()
    }, { timeout: 2000 })

    await user.click(screen.getByText('Creep'))
    expect(mockOnSelect).toHaveBeenCalledWith(
      expect.objectContaining({ trackName: 'Creep' })
    )
  })
})
