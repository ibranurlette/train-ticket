import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register } from "../../client/_action/auth_register";

const Register = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    addres: "",
  });
  const [error, setError] = useState("");

  const handleRegister = (event) => {
    event.preventDefault();
    dispatch(register(form))
      .then(async (res) => {
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <div className="mx-auto w-96 my-5">
      <form className="bg-white shadow-lg rounded px-8 pt-6 pb-8">
        <label className="block text-gray-700 text-center text-lg font-bold mb-5">
          Halaman Register
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
            <div className="flex justify-between">
              <div className="mb-6 mr-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                  }}
                  placeholder="Name"
                />
              </div>
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
                  value={form.username}
                  onChange={(e) => {
                    setForm({ ...form, username: e.target.value });
                  }}
                  placeholder="Username"
                />
              </div>
            </div>

            <div className="flex justify-between">
              <div className="mb-6 mr-2">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="email"
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                  }}
                  placeholder="Email"
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
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="******************"
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="gender"
              >
                gender
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                  value={form.gender}
                >
                  <option value="">Pilih</option>
                  <option value="male">Laki-Laki</option>
                  <option value="female">Perempuan</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="phone"
              >
                phone
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="number"
                name="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="phone"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="addres"
              >
                Alamat
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="addres"
                name="addres"
                value={form.addres}
                onChange={(e) => setForm({ ...form, addres: e.target.value })}
                placeholder="Alamat"
              />
            </div>

            <button
              className="bg-gray-800 mt-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              onClick={(e) => handleRegister(e)}
            >
              Daftar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;
