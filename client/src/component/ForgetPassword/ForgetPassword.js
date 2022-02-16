import React, { useState } from "react";
import axios from "../../utils/axiosInstance";
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [message, setMessage] = useState("");

  const handleForgetPasswordSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const forgetPasswordData = {
      email: formData.get("email"),
    };

    try {
      const response = await axios.post(
        "/api/users/forgotPassword",
        forgetPasswordData
      );
      setMessage(response.data.message);
      setEmail("");
    } catch (error) {
      console.log(error);
      setIsError(true);

      setErrorMessage(error.response.data.message);
      console.log(errorMessage);
    }
  };

  const onInputChange = (e) => {
    setEmail(e.target.value);
    setErrorMessage("");
  };
  return (
    <div className="flex flex-col items-center">
      <form onSubmit={handleForgetPasswordSubmit}>
        <label htmlFor="email" className="text-gray-500 my-2">
          Email:
        </label>
        <div className="bg-gray-100 w-64 p-2 flex items-center mb-1">
          <input
            value={email}
            required
            id="email"
            type="email"
            name="email"
            placeholder="Enter your email"
            className="bg-gray-100 outline-none text-sm flex-1"
            onChange={onInputChange}
          />
        </div>
        <button className="tracking-wide mt-3 border-2 border-gray-300 text-gray-500 rounded-2xl px-6 py-1 inline-block font-semibold">
          Submit
        </button>
        <ErrorMessage isVisible={isError} errorMessage={errorMessage} />
        <p>{message}</p>
      </form>
    </div>
  );
};

export default ForgetPassword;
