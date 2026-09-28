import { useGame } from "../context/GameContext";

function StartScreen() {
  const { startGame } = useGame();

  return (
    <div className="start-screen">
      <div className="start-logo">
        🏆
      </div>

      <h2>
        AI LÀ TRIỆU PHÚ
      </h2>

      <p className="start-description">
        Hãy chuẩn bị tinh thần bước vào ghế nóng,
        vượt qua 15 câu hỏi kiến thức phong phú và
        giành lấy tiền thưởng{" "}
        <strong>
          150.000.000 VNĐ
        </strong>
        !
      </p>

      <div className="rules">
        <h3>
          ℹ️ Quy tắc trò chơi
        </h3>

        <p>
          • Trả lời 15 câu hỏi trắc nghiệm từ dễ đến
          khó.
        </p>

        <p>
          • Mốc an toàn:{" "}
          <strong>
            câu 5 - 2.000.000đ
          </strong>{" "}
          và{" "}
          <strong>
            câu 10 - 22.000.000đ
          </strong>
          .
        </p>

        <p>
          • Bạn có{" "}
          <strong>
            4 quyền trợ giúp
          </strong>
          .
        </p>

        <p>
          • Có thể dừng cuộc chơi bất cứ lúc nào.
        </p>
      </div>

      <button
        className="start-button"
        onClick={startGame}
      >
        BẮT ĐẦU VÀO GHẾ NÓNG ▶
      </button>
    </div>
  );
}

export default StartScreen;