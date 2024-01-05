import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Logobar from "./components/layouts/Logobar";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <Logobar />
        <Navbar />

        <Footer />
      </div>
    </Router>
  );
}

export default App;
