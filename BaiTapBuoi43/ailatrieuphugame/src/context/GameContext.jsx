import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  BACKUP_QUESTIONS,
  PRIZE_LADDER,
  QUESTION_DATABASE,
} from "../data/questions";

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [screen, setScreen] = useState("start");

  const [questions, setQuestions] = useState(
    JSON.parse(JSON.stringify(QUESTION_DATABASE))
  );

  const [backupQuestions, setBackupQuestions] = useState(
    JSON.parse(JSON.stringify(BACKUP_QUESTIONS))
  );

  const [currentLevel, setCurrentLevel] = useState(0);

  const [selectedOption, setSelectedOption] = useState(null);

  const [timeLeft, setTimeLeft] = useState(60);

  const [processing, setProcessing] = useState(false);

  const [usedLifelines, setUsedLifelines] = useState({
    "5050": false,
    phone: false,
    audience: false,
    switch: false,
  });

  const [hiddenOptions, setHiddenOptions] = useState([]);

  const [answerState, setAnswerState] = useState({});

  const [modal, setModal] = useState(null);

  const [friendDialogue, setFriendDialogue] = useState("");

  const [poll, setPoll] = useState([0, 0, 0, 0]);

  const [result, setResult] = useState({
    title: "",
    description: "",
    prize: "0 VNĐ",
    status: "lose",
  });

  const audioContextRef = useRef(null);

  const timeoutRef = useRef(null);

  const currentQuestion = questions[currentLevel];

  // =========================
  // AUDIO
  // =========================

  const initAudio = () => {
    try {
      if (!audioContextRef.current) {
        const AudioContext =
          window.AudioContext || window.webkitAudioContext;

        if (AudioContext) {
          audioContextRef.current = new AudioContext();
        }
      }

      if (audioContextRef.current?.state === "suspended") {
        audioContextRef.current.resume();
      }
    } catch (error) {
      console.log("Audio init error:", error);
    }
  };

  const playSound = (type) => {
    try {
      initAudio();

      const audioContext = audioContextRef.current;

      if (!audioContext) return;

      const oscillator = audioContext.createOscillator();

      const gain = audioContext.createGain();

      oscillator.connect(gain);

      gain.connect(audioContext.destination);

      const now = audioContext.currentTime;

      if (type === "tick") {
        oscillator.frequency.setValueAtTime(800, now);

        gain.gain.setValueAtTime(0.05, now);

        gain.gain.exponentialRampToValueAtTime(
          0.001,
          now + 0.05
        );

        oscillator.start(now);

        oscillator.stop(now + 0.05);
      }

      if (type === "select") {
        oscillator.type = "sine";

        oscillator.frequency.setValueAtTime(400, now);

        oscillator.frequency.exponentialRampToValueAtTime(
          600,
          now + 0.15
        );

        gain.gain.setValueAtTime(0.1, now);

        gain.gain.exponentialRampToValueAtTime(
          0.001,
          now + 0.15
        );

        oscillator.start(now);

        oscillator.stop(now + 0.15);
      }

      if (type === "correct") {
        oscillator.type = "triangle";

        oscillator.frequency.setValueAtTime(
          523.25,
          now
        );

        oscillator.frequency.setValueAtTime(
          659.25,
          now + 0.15
        );

        oscillator.frequency.setValueAtTime(
          783.99,
          now + 0.3
        );

        gain.gain.setValueAtTime(0.15, now);

        gain.gain.exponentialRampToValueAtTime(
          0.001,
          now + 0.6
        );

        oscillator.start(now);

        oscillator.stop(now + 0.6);
      }

      if (type === "wrong") {
        oscillator.type = "sawtooth";

        oscillator.frequency.setValueAtTime(
          220,
          now
        );

        oscillator.frequency.linearRampToValueAtTime(
          110,
          now + 0.4
        );

        gain.gain.setValueAtTime(0.2, now);

        gain.gain.exponentialRampToValueAtTime(
          0.001,
          now + 0.4
        );

        oscillator.start(now);

        oscillator.stop(now + 0.4);
      }

      if (type === "lifeline") {
        oscillator.type = "sine";

        oscillator.frequency.setValueAtTime(
          300,
          now
        );

        oscillator.frequency.exponentialRampToValueAtTime(
          800,
          now + 0.25
        );

        gain.gain.setValueAtTime(0.1, now);

        gain.gain.exponentialRampToValueAtTime(
          0.001,
          now + 0.25
        );

        oscillator.start(now);

        oscillator.stop(now + 0.25);
      }
    } catch (error) {
      console.log("Audio error:", error);
    }
  };

  // =========================
  // GAME
  // =========================

  const resetQuestionState = () => {
    setSelectedOption(null);

    setAnswerState({});

    setHiddenOptions([]);

    setProcessing(false);

    setTimeLeft(60);
  };

  const startGame = () => {
    clearTimeout(timeoutRef.current);

    initAudio();

    setQuestions(
      JSON.parse(JSON.stringify(QUESTION_DATABASE))
    );

    setBackupQuestions(
      JSON.parse(JSON.stringify(BACKUP_QUESTIONS))
    );

    setCurrentLevel(0);

    setSelectedOption(null);

    setTimeLeft(60);

    setProcessing(false);

    setHiddenOptions([]);

    setAnswerState({});

    setModal(null);

    setPoll([0, 0, 0, 0]);

    setFriendDialogue("");

    setUsedLifelines({
      "5050": false,
      phone: false,
      audience: false,
      switch: false,
    });

    setScreen("game");
  };

  const selectAnswer = (index) => {
    if (processing) return;

    if (hiddenOptions.includes(index)) return;

    playSound("select");

    setSelectedOption(index);

    setAnswerState({
      [index]: "selected",
    });

    setModal("confirm");
  };

  const cancelAnswerSelection = () => {
    setSelectedOption(null);

    setAnswerState({});

    setModal(null);
  };

  const nextQuestion = () => {
    setCurrentLevel((previousLevel) => previousLevel + 1);

    resetQuestionState();
  };

  const showFinalResult = (
    title,
    description,
    prize,
    status
  ) => {
    setResult({
      title,
      description,
      prize,
      status,
    });

    setModal("gameover");

    setProcessing(true);
  };

  const showGameOver = (
    isWinner,
    isTimeout = false
  ) => {
    if (isWinner) {
      showFinalResult(
        "XUẤT SẮC! BẠN LÀ TRIỆU PHÚ!",
        "Chúc mừng bạn đã chinh phục thành công tất cả 15 câu hỏi!",
        `${PRIZE_LADDER[14]} VNĐ`,
        "win"
      );

      return;
    }

    let prize = "0 VNĐ";

    if (currentLevel >= 10) {
      prize = `${PRIZE_LADDER[9]} VNĐ`;
    } else if (currentLevel >= 5) {
      prize = `${PRIZE_LADDER[4]} VNĐ`;
    }

    const description = isTimeout
      ? "Đã hết thời gian suy nghĩ cho câu hỏi này!"
      : "Rất tiếc! Đáp án của bạn chưa chính xác.";

    showFinalResult(
      "KẾT THÚC CUỘC CHƠI",
      description,
      prize,
      "lose"
    );
  };

  const confirmAnswer = () => {
    if (
      selectedOption === null ||
      processing ||
      !currentQuestion
    ) {
      return;
    }

    setModal(null);

    setProcessing(true);

    const selected = selectedOption;

    const correct = currentQuestion.correct;

    timeoutRef.current = setTimeout(() => {
      const isCorrect = selected === correct;

      if (isCorrect) {
        playSound("correct");

        setAnswerState({
          [selected]: "correct",
        });

        timeoutRef.current = setTimeout(() => {
          if (currentLevel === 14) {
            showGameOver(true);

            return;
          }

          nextQuestion();
        }, 1500);

        return;
      }

      playSound("wrong");

      setAnswerState({
        [selected]: "wrong",
        [correct]: "correct",
      });

      timeoutRef.current = setTimeout(() => {
        showGameOver(false);
      }, 1800);
    }, 1000);
  };

  // =========================
  // TIMER
  // =========================

  useEffect(() => {
    if (screen !== "game") return;

    if (processing) return;

    if (modal === "walkaway") return;

    if (!currentQuestion) return;

    const timer = setInterval(() => {
      setTimeLeft((previousTime) => {
        if (previousTime <= 1) {
          return 0;
        }

        if (previousTime <= 11) {
          playSound("tick");
        }

        return previousTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [
    screen,
    processing,
    modal,
    currentLevel,
    currentQuestion,
  ]);

  useEffect(() => {
    if (timeLeft !== 0) return;

    if (processing) return;

    if (screen !== "game") return;

    if (!currentQuestion) return;

    setProcessing(true);

    setModal(null);

    playSound("wrong");

    setAnswerState({
      [currentQuestion.correct]: "correct",
    });

    timeoutRef.current = setTimeout(() => {
      showGameOver(false, true);
    }, 1600);
  }, [timeLeft]);

  // =========================
  // LIFELINES
  // =========================

  const useLifeline = (type) => {
    if (!currentQuestion) return;

    if (processing) return;

    if (usedLifelines[type]) return;

    playSound("lifeline");

    setUsedLifelines((previous) => ({
      ...previous,
      [type]: true,
    }));

    if (type === "5050") {
      const wrongAnswers = [0, 1, 2, 3].filter(
        (index) =>
          index !== currentQuestion.correct
      );

      wrongAnswers.sort(() => Math.random() - 0.5);

      setHiddenOptions([
        wrongAnswers[0],
        wrongAnswers[1],
      ]);

      return;
    }

    if (type === "phone") {
      const letters = ["A", "B", "C", "D"];

      const correctLetter =
        letters[currentQuestion.correct];

      const dialogues = [
        `Theo mình thì đáp án chính xác là ${correctLetter}.`,
        `Mình đã từng đọc về câu này. Bạn chọn ${correctLetter} nhé!`,
        `Mình không chắc 100%, nhưng mình nghiêng khoảng 80% về đáp án ${correctLetter}.`,
      ];

      const randomDialogue =
        dialogues[
          Math.floor(
            Math.random() * dialogues.length
          )
        ];

      setFriendDialogue(randomDialogue);

      setModal("phone");

      return;
    }

    if (type === "audience") {
      const correctPercentage =
        Math.floor(Math.random() * 30) + 55;

      let remaining = 100 - correctPercentage;

      const percentages = [0, 0, 0, 0];

      percentages[currentQuestion.correct] =
        correctPercentage;

      const otherIndexes = [0, 1, 2, 3].filter(
        (index) =>
          index !== currentQuestion.correct
      );

      const first = Math.floor(
        Math.random() * (remaining + 1)
      );

      remaining -= first;

      const second = Math.floor(
        Math.random() * (remaining + 1)
      );

      const third = remaining - second;

      percentages[otherIndexes[0]] = first;

      percentages[otherIndexes[1]] = second;

      percentages[otherIndexes[2]] = third;

      setPoll(percentages);

      setModal("audience");

      return;
    }

    if (type === "switch") {
      if (backupQuestions.length === 0) {
        return;
      }

      const newQuestion =
        backupQuestions[
          backupQuestions.length - 1
        ];

      setBackupQuestions((previous) =>
        previous.slice(0, -1)
      );

      setQuestions((previousQuestions) => {
        const updatedQuestions = [
          ...previousQuestions,
        ];

        updatedQuestions[currentLevel] =
          newQuestion;

        return updatedQuestions;
      });

      setSelectedOption(null);

      setAnswerState({});

      setHiddenOptions([]);

      setTimeLeft(60);
    }
  };

  // =========================
  // WALK AWAY
  // =========================

  const openWalkAway = () => {
    if (processing) return;

    setModal("walkaway");
  };

  const getWalkAwayPrize = () => {
    if (currentLevel === 0) {
      return "0";
    }

    return PRIZE_LADDER[currentLevel - 1];
  };

  const executeWalkAway = () => {
    const prize =
      currentLevel === 0
        ? "0 VNĐ"
        : `${PRIZE_LADDER[currentLevel - 1]} VNĐ`;

    showFinalResult(
      "DỪNG CUỘC CHƠI",
      `Bạn đã quyết định dừng cuộc chơi tại câu ${
        currentLevel + 1
      }.`,
      prize,
      "walkaway"
    );
  };

  // =========================
  // MODALS
  // =========================

  const closeModal = () => {
    if (modal === "gameover") return;

    setModal(null);
  };

  const restartGame = () => {
    clearTimeout(timeoutRef.current);

    setScreen("start");

    setModal(null);

    setProcessing(false);

    setCurrentLevel(0);

    setSelectedOption(null);

    setTimeLeft(60);

    setAnswerState({});

    setHiddenOptions([]);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const value = {
    screen,

    questions,

    currentQuestion,

    currentLevel,

    selectedOption,

    timeLeft,

    processing,

    usedLifelines,

    hiddenOptions,

    answerState,

    modal,

    friendDialogue,

    poll,

    result,

    startGame,

    selectAnswer,

    cancelAnswerSelection,

    confirmAnswer,

    useLifeline,

    openWalkAway,

    getWalkAwayPrize,

    executeWalkAway,

    closeModal,

    restartGame,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error(
      "useGame phải được sử dụng bên trong GameProvider"
    );
  }

  return context;
}