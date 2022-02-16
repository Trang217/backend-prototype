// ---- hooks, dependencies, styling import ----
import aleksandra from "./images/aleksandra.jpeg";
import luisa from "./images/luisa.jpeg";
import patrick from "./images/patrick.jpeg";
import trang from "./images/trang.jpeg";

// ---- COMPONENT ----

const AboutUs = () => {
  //? ---- rendering ----
  return (
    <div className="about">
      <h1>About the project</h1>
      <p>
        This website was created as a final project for a Full Stack Web
        Development Course at{" "}
        <a
          href="https://digitalcareerinstitute.org/"
          target="_blank"
          rel="noreferrer"
        >
          Digital Career Institute
        </a>{" "}
        in January and February 2022. We wanted to offer you a fun experience
        while exploring different ecosystems and learning about their uniqueness
        and relevance in a playful way.
      </p>

      <h2>About the team</h2>

      <p>
        We are a team of four developers who are passionate about coding, art,
        animation, and our planet.
      </p>
      <div className="imagesContainer">
        <span>
          <a
            href="https://github.com/Aleksandra-Wiktoria-Bury"
            target="_blank"
            rel="noreferrer"
          >
            <img src={aleksandra} alt="Aleksandra Bury" />
            Aleksandra
          </a>
        </span>
        <span>
          <a
            href="https://github.com/luisalisanne"
            target="_blank"
            rel="noreferrer"
          >
            <img src={luisa} alt="Luisa-Lisanne Forck" />
            Luisa
          </a>
        </span>
        <span>
          <a href="https://github.com/pmdice" target="_blank" rel="noreferrer">
            <img src={patrick} alt="Patrick Mohr" />
            Patrick
          </a>
        </span>
        <span>
          <a
            href="https://github.com/Trang217"
            target="_blank"
            rel="noreferrer"
          >
            <img src={trang} alt="Trang Nguyen" />
            Trang
          </a>
        </span>
      </div>
      <p>
        If you’d like to take a look at what’s happening behind the scenes,
        <br></br>
        check out our project repository on GitHub:{" "}
      </p>

      <button>
        <a
          href="https://github.com/Trang217/Final-Project"
          target="_blank"
          rel="noreferrer"
        >
          Take me to the repo
        </a>
      </button>
    </div>
  );
};
export default AboutUs;
