// ---- COMPONENT ----

const Question = ({
  handleAnswer,
  currentQuestion,
  selectedAnswer,
  chooseAnswer,
  notify,
  questions,
}) => {
  //? ---- variables ----

  const { question, answers } = questions[currentQuestion];

  //? ---- rendering ----
  return (
    <div className="container">
      <span>
        {currentQuestion + 1}/{questions.length}
      </span>
      <div className="q-msg">
        <span>{question}</span>
      </div>

      <div className="answer-container">
        {answers.map((answer, i) => (
          <button
            className={`answer ${
              selectedAnswer === answer ? "selected" : null
            } ${notify ? "wobble-me" : null}`}
            onClick={chooseAnswer}
            key={i}
          >
            {answer}
          </button>
        ))}
      </div>
      <button className="submit-btn" onClick={handleAnswer}>
        Answer
      </button>
    </div>
  );
};
export default Question;
