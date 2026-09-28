import { useGame } from "../context/GameContext";

function Question() {
  const {
    currentLevel,
    currentQuestion,
  } = useGame();

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="question-box">
      <div className="question-number">
        Câu hỏi số{" "}
        <strong>
          {currentLevel + 1}
        </strong>
      </div>

      <h2>
        {currentQuestion.question}
      </h2>
    </div>
  );
}

export default Question;