// ---- hooks, dependencies, styling import ----
import { useState, useEffect, useRef, useContext } from "react";
import compass from "../../assets/images/compass.png";

// ---- components ----
import Navigation from "./Navigation";

// ---- context import ----
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

// ---- data ----

// ---- COMPONENT ----
export default function Sidebar() {
  //? ---- hooks ----
  const { loggedIn } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);

  //? ---- event handlers ----

  const closeSidebar = () => {
    setIsOpen(!isOpen);
  };

  //* close Sidebar when click outside the Sidebar Component is detected
  const wrapperRef = useRef(null);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  //? ---- rendering ----

  return (
    <div>
      {loggedIn ? (
        <div ref={wrapperRef}>
          <div className="menuBtn" onClick={closeSidebar}>
            <img alt="logo" src={compass} />
          </div>

          <div className={`sidebar ${!isOpen ? "hideSidebar" : null}`}>
            <Navigation closeSidebar={closeSidebar} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
