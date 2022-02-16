import { useState } from "react";
import QuizContext from "./QuizContext";
import data from "../../pages/Quiz/desert.json";

export default function QuizProvider({ children }) {
  //? ---- hooks ----
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [checkAnswer, setCheckAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [notify, setNotify] = useState(false);

  //? ---- data----
  const { questions } = data;
  const { correct_answer, answers, message } = questions[currentQuestion];

  //? ---- event handlers ----

  const animate = () => {
    setNotify(true);
    setTimeout(() => setNotify(false), 1000);
  };

  const handleAnswer = () => {
    selectedAnswer === "" ? animate() : setIsSubmitted(true);
    if (selectedAnswer === correct_answer) {
      setCheckAnswer(true);
      setScore(score + 1);
    } else {
      setCheckAnswer(false);
    }
    setSelectedAnswer("");
  };

  const handleNextQuestion = () => {
    setIsSubmitted(false);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowResults(true);
    }
  };

  const chooseAnswer = (e) => {
    setSelectedAnswer(e.target.textContent);
  };

  const providedData = {
    answers,
    message,
    correct_answer,
    currentQuestion,
    showResults,
    isSubmitted,
    checkAnswer,
    score,
    handleAnswer,
    handleNextQuestion,
    chooseAnswer,
    questions,
    animate,
    notify,
  };

  return (
    <QuizContext.Provider value={providedData}>{children}</QuizContext.Provider>
  );
}
