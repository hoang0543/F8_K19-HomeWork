import { useGame } from "../context/GameContext";

const LETTERS = ["A", "B", "C", "D"];

function Answers() {
  const {
    currentQuestion,
    processing,
    hiddenOptions,
    answerState,
    selectAnswer,
  } = useGame();

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="answers">
      {currentQuestion.answers.map(
        (answer, index) => {
          const state = answerState[index];

          return (
            <button
              key={index}
              className={`answer-button ${
                state || ""
              }`}
              disabled={
                processing ||
                hiddenOptions.includes(index)
              }
              style={{
                visibility:
                  hiddenOptions.includes(index)
                    ? "hidden"
                    : "visible",
              }}
              onClick={() =>
                selectAnswer(index)
              }
            >
              <span className="answer-letter">
                {LETTERS[index]}
              </span>

              <span>
                {answer}
              </span>
            </button>
          );
        }
      )}
    </div>
  );
}

export default Answers;