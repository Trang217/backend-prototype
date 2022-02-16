// ---- COMPONENT ----

const Answer = ({
  questions,
  checkAnswer,
  handleNextQuestion,
  currentQuestion,
}) => {
  //? ---- variables ----
  const correctMessages = [
    "Well done!",
    "Fantastic!",
    "Great job!",
    "Wow, you got it right!",
    "Brilliant!",
    "A gold star for you!",
    "Excellent!",
    "Way to go!",
    "Outstanding!",
    "Well, look at you go!",
    "You remembered!",
    "Exactly right!",
    "You’ve just mastered that!",
  ];

  const praise =
    correctMessages[Math.floor(Math.random() * correctMessages.length)];

  const { correct_answer, message } = questions[currentQuestion];

  //? ---- rendering ----
  return (
    <div className="container">
      <span>
        {currentQuestion + 1}/{questions.length}
      </span>
      <div className="q-msg">
        {checkAnswer ? <p>{praise}</p> : null}
        <span>
          The correct answer is <i> {correct_answer}</i>.
        </span>
      </div>
      <p className="answer-container">{message}</p>
      <button className="submit-btn" onClick={handleNextQuestion}>
        {currentQuestion === questions.length - 1
          ? "See the results!"
          : "Next question"}
      </button>
    </div>
  );
};
export default Answer;
