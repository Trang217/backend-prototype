// ---- hooks, dependencies, styling import ----
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axiosInstance";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";

// ---- COMPONENT ----
import ErrorMessage from "../LoginAndRegistration/ErrorMessage";

const DeleteAccount = () => {
  //? ---- hooks ----
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  //? ---- event handlers ----

  const handleClick = async () => {
    try {
      const response = await axios.patch("/api/users/delete");
      if (response.status === 200) {
        console.log("user is deleted!");
        setMessage(response.data.message);

        setTimeout(() => {
          handleLogin("");
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      setIsError(true);
      setErrorMessage(error.response.data.message);
    }
  };

  //? ---- variables ----

  //? ---- rendering ----
  return (
    <div className="accountModal">
      {message.length ? (
        <p>{message}</p>
      ) : (
        <>
          <p>Are you sure you want to delete your account?</p>
          <button className="saveBtn" onClick={handleClick}>
            Delete account
          </button>
          <ErrorMessage isVisible={isError} errorMessage={errorMessage} />
        </>
      )}
    </div>
  );
};
export default DeleteAccount;
