// ---- hooks, dependencies, styling import ----
import { useNavigate } from "react-router-dom";

// ---- COMPONENT ----

const Results = ({ biomeName, score, questions }) => {
  const navigate = useNavigate();
  //? ---- event handlers ----

  const refresh = () => {
    window.location.reload(false);
  };
  //? ---- variables ----

  //? ---- rendering ----
  return (
    <div className="container">
      <h3>
        You scored {score} out of {questions.length}.
        {score >= questions.length / 2 ? " That's amazing!" : null}
      </h3>
      <button className="nav-btn" onClick={() => navigate("/badges")}>
        I want to see the new badge!
      </button>
      <button className="nav-btn" onClick={refresh}>
        I want to do the quiz again!
      </button>
      <button className="nav-btn" onClick={() => navigate("/home")}>
        I want to explore another ecosystem!
      </button>
    </div>
  );
};
export default Results;
