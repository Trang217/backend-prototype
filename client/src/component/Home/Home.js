import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Home = () => {
  const { userName } = useContext(AuthContext);
  return (
    <div>
      <h1 className="text-center mt-10">Hello {userName} </h1>
    </div>
  );
};

export default Home;
