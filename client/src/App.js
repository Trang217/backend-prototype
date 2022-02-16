import Resize from "./components/Resize";
import LandingMobile from "./components/LandingMobile/LandingMobile";
import MainRouter from "./hoc/MainRouter/MainRouter";
import useWindowDimensions from "./utils/windowSize";

const App = () => {
  const { height, width } = useWindowDimensions();
  return (
    <div className="app">
      {width < 600 ? (
        <LandingMobile />
      ) : width < 1080 || height < 710 ? (
        <Resize />
      ) : (
        <MainRouter />
      )}
    </div>
  );
};

export default App;
