import { useState, createContext, useEffect } from "react";

export const AuthContext = createContext({});

export const AuthProvider = (props) => {
  const loginSession = JSON.parse(sessionStorage.getItem("login")) || {
    userName: "",
    loggedIn: false,
  };

  const [userName, setUserName] = useState(loginSession["userName"]);
  const [loggedIn, setLoggedIn] = useState(loginSession["loggedIn"]);

  useEffect(() => {
    sessionStorage.setItem(
      "login",
      JSON.stringify({ username: userName, loggedIn: loggedIn })
    );
  }, [userName, loggedIn]);

  const handleLogin = (_userName) => {
    if (_userName) {
      setUserName(_userName);
      setLoggedIn(true);
    } else {
      setUserName("");
      setLoggedIn(false);
    }
  };
  return (
    <AuthContext.Provider value={{ userName, loggedIn, handleLogin }}>
      {props.children}
    </AuthContext.Provider>
  );
};
