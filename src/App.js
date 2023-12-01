import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage.js";
import Quiz from "./Components/Quiz.js";
import Quiz50 from "./Components/Quiz50.js";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quiz50" element={<Quiz50 />} />
      </Routes>
    </Router>
  );
};

export default App;
