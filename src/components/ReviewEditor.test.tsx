import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ReviewEditor } from './ReviewEditor'

describe('ReviewEditor', () => {
  const defaultProps = {
    reviewText: '',
    onReviewTextChange: vi.fn(),
    rating: 3,
    onRatingChange: vi.fn(),
    sentiment: '',
    onSentimentChange: vi.fn(),
    selectedIcon: '👽',
    onIconChange: vi.fn(),
  }

  it('renders the review textarea with placeholder', () => {
    render(<ReviewEditor {...defaultProps} />)
    const textarea = screen.getByPlaceholderText('Tente descrever seus sentimentos...')
    expect(textarea).toBeInTheDocument()
  })

  it('displays current review text', () => {
    render(<ReviewEditor {...defaultProps} reviewText="Great album!" />)
    const textarea = screen.getByDisplayValue('Great album!')
    expect(textarea).toBeInTheDocument()
  })

  it('shows character count', () => {
    render(<ReviewEditor {...defaultProps} reviewText="Hello" />)
    expect(screen.getByText('5/300')).toBeInTheDocument()
  })

  it('renders the rating label', () => {
    render(<ReviewEditor {...defaultProps} />)
    expect(screen.getByText('RATING:')).toBeInTheDocument()
  })

  it('renders 5 stars', () => {
    render(<ReviewEditor {...defaultProps} rating={3} />)
    const starsSelector = document.querySelector('.stars-selector')
    expect(starsSelector?.children).toHaveLength(5)
  })

  it('renders status report section with sentiment input', () => {
    render(<ReviewEditor {...defaultProps} />)
    expect(screen.getByText('STATUS REPORT')).toBeInTheDocument()
    const sentimentInput = screen.getByPlaceholderText('SEU SENTIMENTO...')
    expect(sentimentInput).toBeInTheDocument()
  })

  it('shows selected icon in icon picker button', () => {
    render(<ReviewEditor {...defaultProps} selectedIcon="🔥" />)
    const iconBox = document.querySelector('.selected-icon-box')
    expect(iconBox?.textContent).toBe('🔥')
  })

  it('calls onReviewTextChange when typing in textarea', async () => {
    const user = userEvent.setup()
    const onReviewTextChange = vi.fn()
    render(<ReviewEditor {...defaultProps} onReviewTextChange={onReviewTextChange} reviewText="existing" />)
    const textarea = screen.getByPlaceholderText('Tente descrever seus sentimentos...')
    await user.type(textarea, ' more')
    // Controlled component fires onChange per character; verify it was called
    expect(onReviewTextChange).toHaveBeenCalled()
  })

  it('calls onRatingChange when clicking a star', async () => {
    const user = userEvent.setup()
    const onRatingChange = vi.fn()
    render(<ReviewEditor {...defaultProps} onRatingChange={onRatingChange} />)
    const stars = document.querySelectorAll('.stars-selector span')
    await user.click(stars[4])
    expect(onRatingChange).toHaveBeenCalledWith(5)
  })

  it('calls onSentimentChange when typing sentiment', async () => {
    const user = userEvent.setup()
    const onSentimentChange = vi.fn()
    render(<ReviewEditor {...defaultProps} onSentimentChange={onSentimentChange} />)
    const sentimentInput = screen.getByPlaceholderText('SEU SENTIMENTO...')
    await user.type(sentimentInput, 'HAPPY')
    // Controlled component fires onChange per character
    expect(onSentimentChange).toHaveBeenCalled()
  })
})
