import { useGame } from "../context/GameContext";
import { PRIZE_LADDER } from "../data/questions";

function MoneyLadder() {
  const { currentLevel } = useGame();

  return (
    <aside className="money-ladder">
      <div className="money-title">
        <span>
          THANG TIỀN THƯỞNG
        </span>

        <span>
          🏅
        </span>
      </div>

      <div className="money-list">
        {[...PRIZE_LADDER]
          .map((money, index) => ({
            money,
            index,
          }))
          .reverse()
          .map(({ money, index }) => {
            const isCurrent =
              index === currentLevel;

            const isPassed =
              index < currentLevel;

            const isMilestone =
              index === 4 ||
              index === 9 ||
              index === 14;

            let className =
              "money-item";

            if (isCurrent) {
              className += " current";
            } else if (isPassed) {
              className += " passed";
            } else if (isMilestone) {
              className += " milestone";
            }

            return (
              <div
                key={index}
                className={className}
              >
                <span>
                  Câu {index + 1}
                </span>

                <strong>
                  {money} đ
                </strong>
              </div>
            );
          })}
      </div>
    </aside>
  );
}

export default MoneyLadder;