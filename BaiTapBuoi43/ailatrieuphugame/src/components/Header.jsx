import { useGame } from "../context/GameContext";

function Header() {
  const {
    screen,
    timeLeft,
    processing,
    openWalkAway,
  } = useGame();

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-area">
          <div className="logo-icon">
            🏆
          </div>

          <div>
            <h1>AI LÀ TRIỆU PHÚ</h1>

            <p>
              Thử thách trí tuệ & chinh phục 150 Triệu
            </p>
          </div>
        </div>

        {screen === "game" && (
          <div className="header-actions">
            <div className="timer">
              ⏱️

              <strong>
                {timeLeft}
              </strong>

              <span>s</span>
            </div>

            <button
              className="walk-away-button"
              onClick={openWalkAway}
              disabled={processing}
            >
              🚶 Dừng cuộc chơi
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;