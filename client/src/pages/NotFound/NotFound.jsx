// ---- hooks, dependencies, styling import ----
import "./notFound.scss";
import { useNavigate } from "react-router-dom";

// ---- COMPONENT ----

const NotFound = () => {
  //? ---- hooks ----
  const navigate = useNavigate();

  //? ---- event handlers ----
  const handleHome = () => {
    navigate("/home");
  };

  //? ---- rendering ----
  return (
    <div className="notFound">
      <div>
        <h2>Whoops!</h2>
        <p>Looks like we wandered off...</p>
        <button onClick={handleHome}>Take me back home</button>
      </div>
    </div>
  );
};
export default NotFound;
