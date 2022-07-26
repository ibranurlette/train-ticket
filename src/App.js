import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

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
import { getUsers } from "./client/_action/user";

function App() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pathname = window.location.pathname;
  const [user, setUser] = useState();

  useEffect(() => {
    dispatch(getUsers())
      .then(async (res) => {
        setUser(res.value);
      })
      .catch((err) => {
        console.log("ERROR GET USER", err);
      });
  }, [dispatch, token]);

  // Navigate back to home if already login or token already exist
  useEffect(() => {
    if (token && user && user.status === "0") {
      ((token && pathname === "/login") ||
        (token && pathname === "/register")) &&
        navigate("/");
    } else if (token && user && user.status === "1") {
      ((token && pathname === "/login") ||
        (token && pathname === "/register")) &&
        navigate("/transaction");
    }
  }, [token, pathname, navigate, user]);

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
