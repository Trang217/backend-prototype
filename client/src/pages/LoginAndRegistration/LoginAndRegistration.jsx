// ---- hooks, dependencies, styling import ----
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";

// ---- components ----
import ErrorMessage from "./ErrorMessage";

// ---- context import ----
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

const LoginAndRegistration = () => {
  //? ---- variables ----
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  //? ---- hooks ----
  const [active, setActive] = useState(false);
  const [isError, setIsError] = useState(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState("");
  const [signUpErrorMessage, setSignUpErrorMessage] = useState("");

  //? ---- event handlers ----
  const handleClick = () => {
    setActive(!active);
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const response = await axios.post("/api/users/login", loginData);
      handleLogin(response.data.user.userName);
      navigate("/home");
    } catch (error) {
      // console.log(error);
      setIsError(true);
      setLoginErrorMessage(error.response.data.message);
    }
  };

  const handleResisterSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const signUpData = {
      firstName: formData.get("firstName"),
      userName: formData.get("userName"),
      email: formData.get("signUpEmail"),
      password: formData.get("signUpPassword"),
    };
    //console.log(signUpData);
    try {
      const response = await axios.post("/api/users/register", signUpData);
      if (response.status === 200) {
        console.log("user was created");
      }

      //sign user in

      const signInResponse = await axios.post("/api/users/login", {
        email: signUpData.email,
        password: signUpData.password,
      });
      handleLogin(signInResponse.data.user.userName);
      navigate("/home");
    } catch (error) {
      //  console.log(error);
      setIsError(true);
      setSignUpErrorMessage(error.response.data.message);
    }
  };

  return (
    <section className="signUp-signIn">
      <div className={`container ${active ? "right-panel-active" : null}`}>
        <div className="sign-up-container">
          <form
            onSubmit={handleResisterSubmit}
            className="sign-up-form form-control"
          >
            <h2>Create account</h2>
            <p>
              Are you new? Just one more step before you can start exploring!
              <br />
              Please tell us who you are!
            </p>

            <div className="label-input-container">
              <label htmlFor="firstName">First name:</label>
              <div className="input-container">
                <input
                  required
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  onChange={() => setSignUpErrorMessage("")}
                />
              </div>
            </div>

            <div className="label-input-container">
              <label htmlFor="userName">Username:</label>
              <div className="input-container">
                <input
                  required
                  id="userName"
                  type="text"
                  name="userName"
                  placeholder="Username"
                  onChange={() => setSignUpErrorMessage("")}
                />
              </div>
            </div>

            <div className="label-input-container">
              <label htmlFor="signUpEmail">Email:</label>
              <div className="input-container">
                <input
                  required
                  id="signUpEmail"
                  type="email"
                  name="signUpEmail"
                  placeholder="myemail@gmail.com"
                  onChange={() => setSignUpErrorMessage("")}
                />
              </div>
            </div>

            <div className="label-input-container">
              <label htmlFor="signUpPassword">Password:</label>
              <div className="input-container">
                <input
                  required
                  id="signUpPassword"
                  type="password"
                  name="signUpPassword"
                  placeholder=" ******"
                  onChange={() => setSignUpErrorMessage("")}
                />
              </div>
            </div>

            <ErrorMessage
              isVisible={isError}
              errorMessage={signUpErrorMessage}
            />

            <button className="submit-btn">Sign up</button>
          </form>
        </div>

        <div className="sign-in-container">
          <form onSubmit={handleLoginSubmit} className="sign-in-form">
            <h1>
              Sign in to Oiko <br /> to explore
            </h1>

            <div className="label-input-container ">
              <label htmlFor="email">Email:</label>
              <div className="input-container">
                <input
                  required
                  id="email"
                  type="email"
                  name="email"
                  placeholder="myemail@gmail.com"
                  onChange={() => setLoginErrorMessage("")}
                />
              </div>
            </div>
            <div className="label-input-container">
              <label htmlFor="password">Password:</label>
              <div className="input-container">
                <input
                  required
                  id="password"
                  type="password"
                  name="password"
                  placeholder=" ******"
                  onChange={() => setLoginErrorMessage("")}
                />
              </div>
            </div>

            <p
              className="forgetPassword"
              onClick={() => navigate("/forget-password")}
            >
              Forgot your password?
            </p>

            <ErrorMessage
              isVisible={isError}
              errorMessage={loginErrorMessage}
            />

            <button className="submit-btn">Log in</button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome back!</h1>
              <p>
                To start exploring,
                <br />
                please sign in!
              </p>
              <button
                onClick={handleClick}
                id="signIn"
                className="submit-btn-light"
              >
                Go to sign in
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Explorer!</h1>
              <p>
                Enter your details and start <br />
                your journey with us!
              </p>
              <button
                onClick={handleClick}
                id="signUp"
                className="submit-btn-light"
              >
                Go to sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginAndRegistration;
