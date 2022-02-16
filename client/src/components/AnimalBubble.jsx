// ---- hooks, dependencies, styling import ----
import { useState} from "react";
import { useNavigate } from "react-router-dom";
// ---- data ----
import data from "../pages/Landing/data.json";

//---- COMPONENT ----
const AnimalBubble = ({ name, doesNavigate, type }) => {
  //? ---- hooks ----

  const [isShown, setIsShown] = useState();
  const navigate = useNavigate();

  //? ---- variables ----
  const [animal, message] = data[`${name}`];
  const variant = animal.concat("-", type);

  //? ---- handlers

  const openGame = (game) => {
    navigate(`/${game}`) // switch statement in the future
  };

  //? ---- rendering ----
  return (
    <div
      className={`${variant}`}
      onMouseEnter={type === "home" ? () => setIsShown(true) : null}
      onMouseLeave={type === "home" ? () => setIsShown(false) : null}
      onClick={doesNavigate ? () => openGame(name) : null}
    >
      {isShown ? <div className="speechBubble">{message}</div> : null}
    </div>
  );
};

export default AnimalBubble;
