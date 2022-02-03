import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-gray-200">
      <ul className="flex justify-around p-5">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>Logout</li>
      </ul>
    </nav>
  );
};

export default Navigation;
