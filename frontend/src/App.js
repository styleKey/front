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
  return (
    <Router>
      <div className="App">
        <Logobar />
        <Navbar />
        <Routes>
          <Route path="/" element={<StylePointList />} />
          <Route path="/stylepoint/:stylepointId" element={<StylePointDetail />} />
          <Route path="/brands" element={<BrandList />} />
          <Route path="/coordilooks" element={<CoordiLookList />} />
          <Route path="/items" element={<ItemList />} />
          <Route path="/item/:itemId" element={<ItemDetail />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
