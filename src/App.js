import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";

import Home from "./home";
import Header from "./global/header";
import Footer from "./global/footer";
import Login from "./auth/login";
import Register from "./auth/register";
import Payment from "./payments/payment";
import Order from "./order";
import Transaction from "./admin/transaction";
import CreateTicket from "./admin/createTicket";
import ListTicket from "./admin/ticket";
import EditTicket from "./admin/ticket/edit";

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
        <Route path="/edit-ticket" element={<EditTicket />} />
        )}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
