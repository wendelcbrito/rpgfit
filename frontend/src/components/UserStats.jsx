import './UserStats.css';

function UserStats({ user }) {
  if (!user) return null;

  const percentXP = Math.min((user.xp / 100) * 100, 100);

  return (
    <div className="user-stats">
      <div className="avatar-placeholder">
        🧝 {/* pode substituir por imagem depois */}
      </div>

      <div className="stats-info">
        <strong>{user.username}</strong> — Nível {user.level}
        <div className="xp-bar-container">
          <div className="xp-bar" style={{ width: `${percentXP}%` }}></div>
        </div>
        <small>{user.xp} / 100 XP</small>
      </div>
    </div>
  );
}

export default UserStats;
