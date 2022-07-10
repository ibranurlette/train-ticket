import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./home";
import Header from "./header";
import Footer from "./footer";
import Login from "./login";
import Register from "./register";

function App() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
