import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Logobar from "./components/layouts/Logobar";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";

import Home from "./components/pages/Home";
import Style from "./components/pages/Style";
import Test from "./components/pages/Test";

function App() {
  return (
    <Router>
      <div className="App">
        <Logobar />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/test" element={<Test />} />
          <Route path="/style" element={<Style />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
