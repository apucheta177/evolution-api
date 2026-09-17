import './TurnBanner.css';

export function TurnBanner({ player, label = 'Turno de' }: { player?: string; label?: string }) {
  if (!player) return null;
  return (
    <div className="turn-banner">
      <span className="turn-label">{label}</span>
      <span className="turn-player">{player}</span>
    </div>
  );
}
