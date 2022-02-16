const LandingMobile = () => {
  
  return (
    <div className="background">
      <div className="landingContent">
        <div id="sloth"></div>
        <div id="snake"></div>
        <div id="fish"></div>
        <p className="title">Hey there!</p>
        <p>
          When you open this website on a larger device you can create an
          account or sign in to discover some interesting facts about our
          planet’s astonishing landscapes, amazing wildlife, and diverse flora.
          At the end of each exploration you'll be able to do a fun little quiz
          to test your knowledge and collect some badges on your profile!
        </p>
        <p>
          This website was created as a final project by four developers
          graduating from Digital Career Institute in February 2022 who are
          passionate about coding, art, animation, and our planet.
        </p>
        <button>
          <a
            href="https://github.com/Trang217/Final-Project"
            target="_blank"
            rel="noreferrer"
          >
            See the repo on GitHub
          </a>
        </button>
      </div>
    </div>
  );
};

export default LandingMobile;
