import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/login/login"
import "../style/App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        
      </Routes>
    </Router>
  );
}

export default App;
