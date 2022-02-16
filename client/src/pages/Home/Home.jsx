// ---- hooks, dependencies, styling import ----
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

// ---- components ----

import AnimalBubble from "../../components/AnimalBubble";
import Story from "./Story";

// ---- COMPONENT ----

const Home = () => {
  //? ---- hooks ----
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  //? ---- event handlers ----

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const navigateToProfile = () => {
    console.log("Player clicked, navigate to profile");
  };

  //? ---- rendering ----
  return (
    <div className="home">
      <div className="start">
        <div
          className="inkBlot pulse-me"
          onClick={() => navigate("/badges")}
        ></div>
        <button onClick={openModal}>What am I doing here?</button>
        <Modal
          isOpen={isOpen}
          ariaHideApp={false}
          style={{
            overlay: {
              backgroundColor: "rgba(204, 196, 157, 0.5)",
            },
            content: {
              border: "none",
              backgroundColor: "transparent",
            },
          }}
        >
          <div className="story-overlay">
            <Story closeModal={closeModal} />
            <button className="closeModal" onClick={closeModal}>
              Back to home
            </button>
          </div>
        </Modal>
      </div>
      <div>
        <AnimalBubble name="rainforest" doesNavigate="true" type="home" />
        <AnimalBubble name="desert" doesNavigate="true" type="home" />
        <AnimalBubble name="ocean" doesNavigate="true" type="home" />
      </div>
    </div>
  );
};
export default Home;
