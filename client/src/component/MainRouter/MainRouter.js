import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Login from "../login/Login";
import Home from "../Home/Home";
import AccountDetail from "../AccountDetail/AccountDetail";
import Navigation from "../Navigation/Navigation";
import ProtectedRoute from "../Navigation/ProtectedRoute";
import { AuthContext, AuthProvider } from "../../context/AuthContext";

const MainRouter = () => {
  const { loggedIn } = useContext(AuthContext);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute auth={loggedIn}>
                <AccountDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default MainRouter;
