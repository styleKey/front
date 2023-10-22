import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Logobar from './components/layouts/Logobar';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import StylePointList from './components/pages/StylePointList';
import StylePointDetail from './components/pages/StylePointDetail';
import BrandList from './components/pages/BrandList';
import CoordiLookList from './components/pages/CoordiLookList';
import ItemList from './components/pages/ItemList';
import ItemDetail from './components/pages/ItemDetail';

function App() {
  const routes = [
    { path: '/', element: <StylePointList /> },
    { path: '/stylepoints', element: <StylePointList /> },
    { path: '/stylepoint/:stylepointId', element: <StylePointDetail /> },
    { path: '/brands', element: <BrandList /> },
    { path: '/coordilooks', element: <CoordiLookList /> },
    { path: '/items', element: <ItemList /> },
    { path: '/item/:itemId', element: <ItemDetail /> },
  ];

  return (
    <Router>
      <div className="App">
        <Logobar />
        <Navbar />
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
