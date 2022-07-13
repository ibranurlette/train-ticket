import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./home";
import Header from "./header";
import Footer from "./footer";
import Login from "./login";
import Register from "./register";
import Payment from "./payment";
import Order from "./order";
import Transaction from "./admin/transaction";

function App() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/order" element={<Order />} />
          <Route path="/transaction" element={<Transaction />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
