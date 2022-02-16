// ---- hooks, dependencies, styling import ----
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";
//import closeSidebar from "./Sidebar";

// ---- context import ----
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

// ---- COMPONENT ----

export default function Navigation({closeSidebar}) {
  //? ---- variables ----
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  //? ---- event handlers ----
  const handleLogout = async () => {
    await axios.get("/api/users/logout");
    closeSidebar();
    handleLogin("");
    navigate("/");
  };

  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/home" onClick={closeSidebar}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/badges" onClick={closeSidebar}>
            Badges
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={closeSidebar}>
            About
          </Link>
        </li>
        <li>
          <Link to="/account" onClick={closeSidebar}>
            Account
          </Link>
        </li>
        <li>
          <button className="logoutBtn" onClick={handleLogout}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
