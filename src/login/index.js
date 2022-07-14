import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../client/_action/auth";

const Login = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    dispatch(login({ username, password }))
      .then(async (res) => {
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <div className="mx-auto w-96">
      <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8">
        <label className="block text-gray-700 text-lg font-bold mb-5">
          Halaman Login
        </label>
        {error ? (
          <div className="relative flex-auto border-b">
            <div
              className="bg-red-100 border-l-4 border-red-500 text-black-700 p-4"
              role="alert"
            >
              <p>{error}</p>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className="">
          <div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                name="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="Username"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder=""
              />
            </div>

            <button
              className="bg-gray-800 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={() => handleLogin()}
            >
              Masuk
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
