import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PeptoneDesign from "./PeptoneDesign";
import Background from "./Background";
import Navbar from "./Navbar";
import BubbleAnimation from './BubbleAnimation'

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          {/* <Route path="/" element={<BubbleAnimation />} /> */}
          <Route path="/" element={<Background />} />
          <Route path="/page2" element={<PeptoneDesign />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
