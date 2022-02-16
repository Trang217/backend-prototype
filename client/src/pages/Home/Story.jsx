// ---- hooks, dependencies, styling import ----
import { useState } from "react";

// ---- data ----
const story = [
  "It was a windy night when the Scientist sat down to write everything he knew about the Earth and its ecosystems...",
  "“Oh no! An ink blob!” - he sighed, but the night was full and his eyes began to close...",
  '“Where am I...?" - said the Ink Blot looking around - “Explorer"s journal! But I see the scientist is deep asleep... Well, I must learn as much as I can before dawn so I can fill this story"',
];

const journal =
  "What is an ecosystem and what’s so special about it?/The word ecosystem derives from the ancient Greek word oikos which means house or home. A system is a set of things that work together as an interconnected network. So when we talk about ecosystems we talk about our home. And by home, we mean our home planet Earth with all its different landscapes, animals and plants./An ecosystem is a geographic area where plants, animals, and other organisms, as well as weather and landscape, work together to form a bubble of life./Ecosystems can be very small or very large, very hot or very cold, very dry or very wet. Ecosystems are often connected in a larger biome. Biomes are sections of land, sea, or atmosphere. Deserts, ponds, reefs, and rainforests are all types of biomes, for example./They're organized very generally, based on the types of plants and animals that live in them. Within each forest, each pond, each reef, or each section of the desert, you'll find many different ecosystems. The whole surface of Earth is a series of connected ecosystems./Desert ecosystem, for example, is";

// ---- COMPONENT ----

const Story = ({ closeModal }) => {
  //? ---- hooks ----

  const [iter, setIter] = useState(0);
  const [slide, setSlide] = useState(false);
  const [dialog, setDialog] = useState(1);
  const [showButton, setShowButton] = useState(false);

  //? ---- event handlers ----

  const splitJournal = journal.split("/");

  const handleNext = () => {
    if (iter < splitJournal.length - 1) setIter(iter + 1);
    setSlide(true);
    setTimeout(() => setSlide(false), 2000);
    if(iter === 4) {
      setShowButton(true)
    }
  };

  const handleButton = () => {
    if (dialog < 3) setDialog(dialog + 1);
    if(dialog === 2) setShowButton(false);
  };


  //? ---- variables ----

  //? ---- rendering ----
  return (
    <div className="story">
      <div className="story-title">
        {dialog === 3 ? (
          <button onClick={closeModal}>Start exploring!</button>
        ) : iter === 5 ? (
          <p id="ohno"> {story[dialog]}</p>
        ) : (
          <p className="show">{story[0]}</p>
        )}
      </div>
      <div className="journal show-journal">
        <p className={slide ? "slide-me" : null}>{splitJournal[iter]}</p>
        {iter < 5 ? <button  className="pulse-me" onClick={handleNext}>next</button> : null}
        {iter === 5 ? (
          <> <div className="inkblot" ></div>
         </>
        ) : null}
        {showButton ? <div onClick={handleButton} className="circle-button">
            <div></div>
            <div></div>
            <div></div>
          </div> : null }
      </div>
    </div>
  );
};
export default Story;
