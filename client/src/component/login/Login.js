import { useState, useContext } from "react";
import axios from "../../utils/axiosInstance";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  const [active, setActive] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    console.log(loginData);
    try {
      const response = await axios.post("/api/users/login", loginData);
      console.log(handleLogin);
      //console.log(useContext(AuthContext));

      handleLogin(response.data.user.userName);
      navigate("/");
    } catch (error) {
      console.log(error);
      setIsError(true);

      setErrorMessage(error.response.data.message);
      console.log(errorMessage);
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
    console.log(signUpData);
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
      navigate("/");
    } catch (error) {
      console.log(error);
      setIsError(true);
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <section className="signUp-signIn flex items-start pt-20 justify-center min-h-screen py-2 bg-gray-200">
      <div
        className={`container bg-white rounded-xl w-3/4 relative overflow-hidden mt-5 ${
          active ? "right-panel-active" : null
        }`}
      >
        <div className="sign-up-container absolute top-0 h-full transition-all duration-700 ease-in-out mt-2">
          <form
            onSubmit={handleResisterSubmit}
            className=" flex flex-col items-center justify-center bg-white text-center px-10 h-full "
          >
            <h2 className="text-3xl font-bold text-teal-500 mb-2">
              Create Account
            </h2>
            <p className="text-gray-400 my-2">
              Are you new? Just one more step before you can start exploring!
              Please tell us who you are!
            </p>

            <div className="flex flex-col items-center">
              <label htmlFor="firstName" className="text-gray-500 my-2">
                First name:
              </label>
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-1">
                <input
                  required
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="First name"
                  className="bg-gray-100 outline-none text-sm flex-1"
                  onChange={() => setErrorMessage("")}
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <label htmlFor="userName" className="text-gray-500 my-2">
                Username:
              </label>
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-1">
                <input
                  id="userName"
                  type="text"
                  name="userName"
                  placeholder="Username"
                  className="bg-gray-100 outline-none text-sm flex-1"
                  onChange={() => setErrorMessage("")}
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <label htmlFor="signUpEmail" className="text-gray-500 my-2">
                Email:
              </label>
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-1">
                <input
                  id="signUpEmail"
                  type="email"
                  name="signUpEmail"
                  placeholder="myemail@gmail.com"
                  className="bg-gray-100 outline-none text-sm flex-1"
                  onChange={() => setErrorMessage("")}
                />
              </div>
            </div>

            <div className="flex flex-col items-center">
              <label htmlFor="signUpPassword" className="text-gray-500 my-2">
                Password:
              </label>
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-1">
                <input
                  id="signUpPassword"
                  type="password"
                  name="signUpPassword"
                  placeholder=" ******"
                  className="bg-gray-100 outline-none text-sm flex-1"
                  onChange={() => setErrorMessage("")}
                />
              </div>
            </div>

            <ErrorMessage isVisible={isError} errorMessage={errorMessage} />

            <button className="tracking-wide mt-6 border-2 border-teal-500 text-teal-500 rounded-2xl px-8 py-1.5 inline-block font-semibold hover:bg-teal-500 hover:text-white">
              Sign up
            </button>
          </form>
        </div>

        <div className="sign-in-container absolute top-0 h-full transition-all duration-700 ease-in-out">
          <form
            onSubmit={handleLoginSubmit}
            className="flex flex-col items-center justify-center bg-white text-center px-10 h-full"
          >
            <h1 className="text-3xl font-bold text-teal-500 mb-10">
              Sign in to Oiko to explore
            </h1>

            <div className="flex flex-col items-center">
              <label htmlFor="email" className="text-gray-500 my-2">
                Email:
              </label>
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-1">
                <input
                  required
                  id="email"
                  type="email"
                  name="email"
                  placeholder="myemail@gmail.com"
                  className="bg-gray-100 outline-none text-sm flex-1"
                  onChange={() => setErrorMessage("")}
                />
              </div>
            </div>
            <div className="flex flex-col items-center">
              <label htmlFor="password" className="text-gray-500 my-2">
                Password:
              </label>
              <div className="bg-gray-100 w-64 p-2 flex items-center mb-3">
                <input
                  required
                  id="password"
                  type="password"
                  name="password"
                  placeholder=" ******"
                  className="bg-gray-100 outline-none text-sm flex-1"
                  onChange={() => setErrorMessage("")}
                />
              </div>
            </div>

            <div className="flex justify-between w-64 mb-5">
              <a
                href="www://www.google.com"
                className="text-xs text-gray-600 hover:text-gray-900 hover:underline"
              >
                Forgot your password?
              </a>
            </div>

            <ErrorMessage isVisible={isError} errorMessage={errorMessage} />

            <button className="tracking-wide mt-6 border-2 border-teal-500 text-teal-500 rounded-2xl px-8 py-1.5 inline-block font-semibold hover:bg-teal-500 hover:text-white">
              Log in
            </button>
          </form>
        </div>

        <div className="overlay-container">
          <div className="overlay bg-teal-500">
            <div className="overlay-panel overlay-left">
              <h1 className="text-3xl font-bold mb-5">Welcome back!</h1>
              <p className="text-xl mb-10 tracking-wide">
                To start exploring, please sign in!
              </p>

              <button
                onClick={handleClick}
                className="tracking-wide border-2 border-white rounded-2xl px-6 py-1.5 inline-block font-semibold hover:bg-white hover:text-teal-500"
                id="signIn"
              >
                Go to sign in
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1 className="text-3xl font-bold mb-5">Hello, Explorer!</h1>
              <p className="mb-10 text-xl tracking-wide ">
                Enter your details and start journey with us!
              </p>
              <button
                onClick={handleClick}
                className="tracking-wide border-2 border-white rounded-2xl px-6 py-1.5 inline-block font-semibold hover:bg-white hover:text-teal-500"
                id="signUp"
              >
                To sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
