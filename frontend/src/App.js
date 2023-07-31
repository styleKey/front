import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/layouts/Header';
import Navbar from './components/layouts/Navbar';
import Home from './components/routers/Home';
import Test from './components/routers/Test';
import Style from './components/routers/Style';
import Login from './components/routers/Login';
import Footer from './components/layouts/Footer';

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/style/*" element={<Style />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
