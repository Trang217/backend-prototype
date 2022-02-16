// ---- hooks, dependencies, styling import ----
import { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";

// ---- components ----
import Question from "./Question";
import Answer from "./Answer";
import Results from "./Results";

// ---- COMPONENT ----

const Quiz = ({ biomeName }) => {
  //? ---- hooks ----
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [checkAnswer, setCheckAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [notify, setNotify] = useState(false);
  const [questions, setQuestions] = useState([]);

  //? ---- API CONNECTION ----

  const getData = async () => {
    try {
      const response = await axios.get(`/api/content/quiz/${biomeName}`);
      const data = response.data.quizContent.questions;
      setQuestions(data);
    } catch (error) {
      console.log(error);
    }
  };

  //? ---- event handlers ----

  const animate = () => {
    setNotify(true);
    setTimeout(() => setNotify(false), 1000);
  };

  const handleAnswer = () => {
    selectedAnswer === "" ? animate() : setIsSubmitted(true);
    if (selectedAnswer === questions[currentQuestion].correct_answer) {
      setCheckAnswer(true);
      setScore(score + 1);
    } else {
      setCheckAnswer(false);
    }
    setSelectedAnswer("");
  };

  const updateScore = async () => {
    const scoreData = {
      score: score,
      type: biomeName.toLowerCase(),
    };
    try {
      const response = await axios.patch(
        `api/users/update/badges/${biomeName}`,
        scoreData
      );
      if (response.status === 200) {
        console.log("Request to update score sent");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextQuestion = () => {
    setIsSubmitted(false);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      updateScore();
      setShowResults(true);
    }
  };

  const chooseAnswer = (e) => {
    setSelectedAnswer(e.target.textContent);
  };

  useEffect(() => getData(), []);

  //? ---- rendering ----
  return (
    <div className="quiz">
      <p className="title">
       { showResults ? `Congratulations, you finished the ${biomeName} quiz!` : `Can you help the Scientist write a chapter about the ${biomeName}?`}
      </p>

      {questions.length > 0 ? (
        showResults ? (
          <Results biomeName={biomeName} score={score} questions={questions} />
        ) : isSubmitted ? (
          <Answer
            questions={questions}
            checkAnswer={checkAnswer}
            handleNextQuestion={handleNextQuestion}
            currentQuestion={currentQuestion}
          />
        ) : (
          <Question
            handleAnswer={handleAnswer}
            currentQuestion={currentQuestion}
            selectedAnswer = {selectedAnswer}
            chooseAnswer={chooseAnswer}
            notify={notify}
            questions={questions}
          />
        )
      ) : null}
    </div>
  );
};
export default Quiz;
