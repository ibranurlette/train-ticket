import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import Home from "./home";
import Header from "./header";
import Footer from "./footer";
import Login from "./login";
import Register from "./register";
import Payment from "./payment";
import Order from "./order";
import Transaction from "./admin/transaction";
import CreateTicket from "./admin/createTicket";
import ListTicket from "./admin/ticket";

function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  // Navigate back to home if already login or token already exist
  useEffect(() => {
    ((token && pathname === "/login") || (token && pathname === "/register")) &&
      navigate("/");
  }, [token, pathname, navigate]);

  return (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/order" element={<Order />} />
        <Route path="/transaction" element={<Transaction />} />
        <Route path="/create-ticket" element={<CreateTicket />} />
        <Route path="/list-ticket" element={<ListTicket />} />
        )}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
