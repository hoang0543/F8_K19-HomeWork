import { useGame } from "../context/GameContext";

function Lifelines() {
  const {
    usedLifelines,
    processing,
    useLifeline,
  } = useGame();

  return (
    <div className="lifelines">
      <button
        className="lifeline-button"
        disabled={
          usedLifelines["5050"] ||
          processing
        }
        onClick={() =>
          useLifeline("5050")
        }
      >
        <span>％</span>
        <span>50:50</span>
      </button>

      <button
        className="lifeline-button"
        disabled={
          usedLifelines.phone ||
          processing
        }
        onClick={() =>
          useLifeline("phone")
        }
      >
        <span>☎</span>
        <span>Người thân</span>
      </button>

      <button
        className="lifeline-button"
        disabled={
          usedLifelines.audience ||
          processing
        }
        onClick={() =>
          useLifeline("audience")
        }
      >
        <span>👥</span>
        <span>Khán giả</span>
      </button>

      <button
        className="lifeline-button"
        disabled={
          usedLifelines.switch ||
          processing
        }
        onClick={() =>
          useLifeline("switch")
        }
      >
        <span>🔄</span>
        <span>Đổi câu</span>
      </button>
    </div>
  );
}

export default Lifelines;