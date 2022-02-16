// ---- hooks, dependencies, styling import ----
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import Modal from "react-modal";

// ---- components ----
import AboutUs from "../AboutUs/AboutUs";
import AnimalBubble from "../../components/AnimalBubble";

// ---- context ----
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

// ---- COMPONENT ----
const Landing = () => {
  //? ---- hooks ----
  let navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const { loggedIn } = useContext(AuthContext);

  //? ---- event handlers ----

  //Start the adventure button handler
  const handleClick = () => {
    loggedIn ? navigate("/home") : navigate("/login");
  };

  // Show Modal with AboutUS component
  const handleModal = () => {
    setModalOpen(!modalOpen);
  };

  //? ---- rendering ----
  return (
    <div className="landing">
      {!loggedIn ? (
        <button className="openModalButton" onClick={handleModal}>
          ABOUT
        </button>
      ) : null}
      <div className="landingContent">
        <p className="title">Hey there, little explorer!</p>
        <p>
          Create an account or sign in to playfully discover some interesting
          facts about our planet’s astonishing landscapes, amazing wildlife, and
          diverse flora.
        </p>
        <p>
          At the end of each exploration you can do a fun little quiz to test
          your knowledge and collect some badges on your profile!
        </p>
        <button className="startBtn" onClick={handleClick}>
          Start the Adventure
        </button>
      </div>
      <AnimalBubble name="rainforest" type="home" />
      <AnimalBubble name="desert" type="home" />
      <AnimalBubble name="ocean" type="home" />

      {modalOpen ? (
        <Modal
          isOpen={modalOpen}
          style={{
            overlay: {
              backgroundColor: "rgba(204, 196, 157, 0.5)",
            },
            content: {
              border: "none",
              left: "15%",
              right: "15%",
              backgroundColor: "transparent",
            },
          }}
        >
          <div className="modalContent">
            <AboutUs />
            <button className="closeModalBtn" onClick={handleModal}>
              X
            </button>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

export default Landing;
