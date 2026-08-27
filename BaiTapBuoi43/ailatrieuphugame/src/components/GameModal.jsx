import { useGame } from "../context/GameContext";

const LETTERS = ["A", "B", "C", "D"];

function GameModals() {
  const {
    modal,

    cancelAnswerSelection,

    confirmAnswer,

    closeModal,

    friendDialogue,

    poll,

    getWalkAwayPrize,

    executeWalkAway,

    result,

    restartGame,
  } = useGame();

  if (!modal) {
    return null;
  }

  if (modal === "confirm") {
    return (
      <div className="modal-backdrop">
        <div className="modal yellow-modal">
          <div className="modal-icon yellow">
            ?
          </div>

          <h2>
            Xác nhận lựa chọn
          </h2>

          <p>
            Bạn có chắc chắn muốn chọn đáp án này
            là câu trả lời cuối cùng không?
          </p>

          <div className="modal-actions">
            <button
              className="secondary-button"
              onClick={
                cancelAnswerSelection
              }
            >
              Thử chọn lại
            </button>

            <button
              className="yellow-button"
              onClick={confirmAnswer}
            >
              Chốt đáp án!
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (modal === "phone") {
    return (
      <div className="modal-backdrop">
        <div className="modal blue-modal">
          <div className="modal-icon blue">
            ☎
          </div>

          <h2>
            Gọi điện thoại cho người thân
          </h2>

          <p className="small">
            Chuyên gia đang hỗ trợ bạn...
          </p>

          <div className="friend-dialogue">
            "{friendDialogue}"
          </div>

          <button
            className="blue-button full"
            onClick={closeModal}
          >
            Cảm ơn người thân!
          </button>
        </div>
      </div>
    );
  }

  if (modal === "audience") {
    return (
      <div className="modal-backdrop">
        <div className="modal green-modal">
          <div className="modal-icon green">
            📊
          </div>

          <h2>
            Ý kiến khán giả trường quay
          </h2>

          <div className="poll-container">
            {LETTERS.map(
              (letter, index) => (
                <div
                  key={letter}
                  className="poll-row"
                >
                  <div className="poll-info">
                    <strong>
                      {letter}
                    </strong>

                    <span>
                      {poll[index]}%
                    </span>
                  </div>

                  <div className="poll-track">
                    <div
                      className="poll-bar"
                      style={{
                        width: `${poll[index]}%`,
                      }}
                    />
                  </div>
                </div>
              )
            )}
          </div>

          <button
            className="green-button full"
            onClick={closeModal}
          >
            Tiếp tục cuộc chơi
          </button>
        </div>
      </div>
    );
  }

  if (modal === "walkaway") {
    return (
      <div className="modal-backdrop">
        <div className="modal red-modal">
          <div className="modal-icon red">
            ✋
          </div>

          <h2>
            Dừng cuộc chơi?
          </h2>

          <p>
            Bạn có chắc chắn muốn dừng và mang về{" "}
            <strong className="yellow-text">
              {getWalkAwayPrize()} VNĐ
            </strong>{" "}
            không?
          </p>

          <div className="modal-actions">
            <button
              className="secondary-button"
              onClick={closeModal}
            >
              Chơi tiếp
            </button>

            <button
              className="red-button"
              onClick={
                executeWalkAway
              }
            >
              Chắc chắn dừng
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (modal === "gameover") {
    return (
      <div className="modal-backdrop">
        <div className="modal result-modal">
          <div
            className={`result-icon ${result.status}`}
          >
            {result.status === "win"
              ? "👑"
              : result.status ===
                  "walkaway"
                ? "💰"
                : "❌"}
          </div>

          <h2 className="result-title">
            {result.title}
          </h2>

          <p>
            {result.description}
          </p>

          <div className="prize-box">
            <span>
              SỐ TIỀN THƯỞNG CỦA BẠN
            </span>

            <strong>
              {result.prize}
            </strong>
          </div>

          <button
            className="yellow-button full"
            onClick={restartGame}
          >
            THỬ SỨC LẠI 🔄
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default GameModals;