import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./Pages/HomePage";
import RegistrationPage from "./Pages/RegistrationPage";
import GamePage from "./Pages/GamePage";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationPage />} />
          <Route path="/gamePage" element={<GamePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
