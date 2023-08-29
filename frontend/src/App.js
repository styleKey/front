import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Logobar from './components/layouts/Logobar';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';

import Home from './components/pages/Home';
import Test from './components/pages/Test';
import StylePoint from './components/pages/StylePoint';
import SignUp from './components/pages/SignUp';

const pageComponents = {
  Home,
  Test,
  StylePoint,
  SignUp,
};

const routeData = [
  { path: '/', component: 'Home' },
  { path: '/Test', component: 'Test' },
  { path: '/StylePoint', component: 'StylePoint' },
  { path: '/SignUp', component: 'SignUp' },
];

function App() {
  return (
    <Router>
      <Logobar />
      <Navbar />
      <Routes>
        {routeData.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={React.createElement(pageComponents[route.component])}
          />
        ))}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
