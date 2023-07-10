import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// import { getUsers } from "../../client/_action/user";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [user, setUser] = useState();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  // useEffect(() => {
  //   dispatch(getUsers())
  //     .then(async (res) => {
  //       setUser(res.value);
  //     })
  //     .catch((err) => {
  //       console.log("ERROR GET USER", err);
  //     });
  // }, [dispatch, token]);

  const RouteAdmin = () => (
    <>
      <Link to="/create-ticket" className="mr-5">
        Buat Tiket
      </Link>
      <Link to="/transaction" className="mr-5">
        Transaksi
      </Link>
      <Link to="/list-ticket" className="mr-5">
        Ticket
      </Link>
    </>
  );

  const RouteTokenExist = () =>
    token && (
      <>
        {user && user.status === "1" ? (
          <RouteAdmin />
        ) : (
          <>
            <Link to="/report" className="mr-5">
              Home
            </Link>
            <Link to="/user-app" className="mr-5">
              User App
            </Link>
            <Link to="/user-office" className="mr-5">
              User Office
            </Link>
          </>
        )}

        <Link to="/" className="mr-5" onClick={handleLogout}>
          Keluar
        </Link>
      </>
    );

  const RouteTokenNotExist = () => (
    <>
      <Link to="/" className="mr-5">
        Home
      </Link>
      <Link to="/login" className="mr-5">
        Masuk
      </Link>
      <Link to="/register">Daftar</Link>
    </>
  );

  return (
    <div className="w-full bg-blue-800 text-white p-5 md:flex md:justify-between items-center mx-auto">
      <h1 className="text-2xl font-bold sm:mb-2 md:mb-0">Ticket Train</h1>
      <div className="font-bold sm:flex sm:justify-between">
        {!token ? <RouteTokenNotExist /> : <RouteTokenExist />}
      </div>
    </div>
  );
};

export default Header;
