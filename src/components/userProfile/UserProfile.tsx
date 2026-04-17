interface UserProfileProps {
  username: string
  level: number
  xpProgress: number
}

export function UserProfile({ username, level, xpProgress }: UserProfileProps) {
  return (
    <div className="user-profile">
      <div className="avatar-box">🤺</div>
      <div className="profile-details">
        <div className="player-level">SOUND EXPLORER LV. {level}</div>
        <div className="xp-bar-wrapper">
          <span className="xp-label">XP</span>
          <div className="xp-bar-fill" style={{ width: `${xpProgress}%` }}></div>
        </div>
      </div>
    </div>
  )
}
