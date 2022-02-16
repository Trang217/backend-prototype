// ---- hooks, dependencies, styling import ----
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import capitalize from "../../utils/capitalize";
import AnimalBubble from "../../components/AnimalBubble";

// ---- COMPONENT ----

const Badge = ({ badge }) => {
  //? ---- hooks ----
  const navigate = useNavigate();

  //? ---- event handlers ----

  const toQuiz = () => {
    navigate(`/quiz/${type}`);
  };
  //? ---- variables ----

  const { type, score, date } = badge;

  //? ---- rendering ----
  return (
    <div className={score > 0 ? "oneBadge" : "oneBadge grayscale"}>
      <p className="type">{capitalize(type)}</p>
      <div className="icon">
        <AnimalBubble name={type} type="badge" />
        {score > 0 ? <div className="rosette"></div> : null}
      </div>

      {score > 0 ? (
        <div className="activeBadge">
          <p>
            Score: {score}/10
            <br></br>
            Explored on: {format(new Date(date), "EEEE, do MMMM yyyy")}
          </p>
          <button onClick={toQuiz}>Do the quiz again</button>
        </div>
      ) : (
        <div className="inactiveBadge">
          <p>Once you explored the {type} you'll find your badge here!</p>
        </div>
      )}
    </div>
  );
};
export default Badge;
