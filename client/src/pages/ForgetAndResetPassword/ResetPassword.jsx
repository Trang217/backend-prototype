// ---- hooks, dependencies, styling import ----
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";

// ---- COMPONENT ----
import ErrorMessage from "../LoginAndRegistration/ErrorMessage";

const ResetPassword = () => {
  //? ---- variables ----
  const navigate = useNavigate();
  const { token } = useParams();

  //? ---- hooks ----
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //? ---- event handlers ----

  const handleForgetPasswordSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const resetPasswordData = {
      password: formData.get("password"),
    };

    try {
      const response = await axios.patch(
        `/api/users/resetPassword/${token}`,
        resetPasswordData
      );
      setMessage(response.data.message);
      setPassword("");
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.response.data.message);
    }
  };

  const onInputChange = (e) => {
    setPassword(e.target.value);
    setErrorMessage("");
  };

  return (
    <div className="forget-reset-password">
      <h1> Reset your new password!</h1>

      <form onSubmit={handleForgetPasswordSubmit}>
        {message.length ? (
          <>
            <p>{message}</p>
            <button onClick={() => navigate("/login")}>
              Take me back to login
            </button>
          </>
        ) : (
          <>
            <label htmlFor="password">Enter your new password:</label>
            <div className="input-container">
              <input
                value={password}
                required
                id="password"
                type="password"
                name="password"
                placeholder=" ******"
                onChange={onInputChange}
              />
            </div>
            <button>Reset</button>
            <ErrorMessage isVisible={isError} errorMessage={errorMessage} />
          </>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
