// ---- hooks, dependencies, styling import ----
import { useContext } from "react";
import { Outlet } from "react-router-dom";

// ---- components ----
import LoginAndRegistration from "../../pages/LoginAndRegistration/LoginAndRegistration";

// ---- context import ----
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

// ---- COMPONENT ----

const ProtectedRoutes = () => {
  const { loggedIn } = useContext(AuthContext);
  return loggedIn ? <Outlet /> : <LoginAndRegistration />;
};

export default ProtectedRoutes;
