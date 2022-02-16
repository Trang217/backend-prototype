import React from "react";

const ResetPassword = () => {
  return (
    <div>
      <form>
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
            />
          </div>
        </div>
        <button className="tracking-wide mt-6 border-2 border-teal-500 text-teal-500 rounded-2xl px-8 py-1.5 inline-block font-semibold hover:bg-teal-500 hover:text-white">
          Reset new password
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
