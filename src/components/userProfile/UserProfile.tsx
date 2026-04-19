import './UserProfile.css'
interface UserProfileProps {
  username: string
  level: number
  xpProgress: number
}

export function UserProfile({ username, level, xpProgress }: UserProfileProps) {
  return (
    <div className="user-profile">
      <div className="avatar-box">{username[0].toUpperCase() + username[1].toUpperCase()}</div>
      <div className="profile-details">
        <div className="user-name">{username}</div>
        <div className="player-level">EXPLORADOR LV. {level}</div>
        <div className="xp-bar-wrapper">
          <span className="xp-label">XP</span>
          <div className="xp-bar-fill" style={{ width: `${xpProgress}%` }}></div>
        </div>
      </div>
    </div>
  )
}
