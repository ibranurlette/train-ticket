import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";
import Header from "./global/header";
import Footer from "./global/footer";
import Login from "./auth/login";
import Report from "./admin/report";
import UserApp from "./admin/user-app";
import UserOffice from "./admin/user-office";

function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  useEffect(() => {
    if (token && pathname === "/report") {
      navigate("/report");
    } else if (token && pathname === "/user-app") {
      navigate("/user-app");
    } else if (token && pathname === "/user-office") {
      navigate("/user-office");
    } else {
      navigate("/");
    }
  }, [token, pathname, navigate]);

  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <Routes>
        {!token ? (
          <Route path="/" element={<Login />} />
        ) : (
          <>
            <Route path="/report" element={<Report />} />
            <Route path="/user-app" element={<UserApp />} />
            <Route path="/user-office" element={<UserOffice />} />
          </>
        )}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
