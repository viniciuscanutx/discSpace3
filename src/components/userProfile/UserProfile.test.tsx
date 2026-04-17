import { render, screen } from '@testing-library/react'
import { UserProfile } from '../userProfile/UserProfile'

describe('UserProfile', () => {
  it('renders the avatar', () => {
    render(<UserProfile username="test" level={1} xpProgress={20} />)
    expect(screen.getByText('🤺')).toBeInTheDocument()
  })

  it('displays the player level', () => {
    render(<UserProfile username="test" level={5} xpProgress={20} />)
    expect(screen.getByText('SOUND EXPLORER LV. 5')).toBeInTheDocument()
  })

  it('displays XP label', () => {
    render(<UserProfile username="test" level={1} xpProgress={20} />)
    expect(screen.getByText('XP')).toBeInTheDocument()
  })

  it('renders the XP bar with correct width', () => {
    render(<UserProfile username="test" level={1} xpProgress={75} />)
    const xpFill = document.querySelector('.xp-bar-fill')
    expect(xpFill).toHaveStyle({ width: '75%' })
  })
})
