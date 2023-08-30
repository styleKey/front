import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import StylePointList from './components/StylePointList';
import StylePointDetail from './components/StylePointDetail';
import BrandList from './components/BrandList';
import BrandDetail from './components/BrandDetail';
import CoordiLookList from './components/CoordiLookList';
import CoordiLookDetail from './components/CoordiLookDetail';
import ItemList from './components/ItemList';
import ItemDetail from './components/ItemDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/admin/stylepoints" element={<StylePointList />} />
          <Route path="/admin/stylepoint/:id" element={<StylePointDetail />} />s
          <Route path="/admin/brands" element={<BrandList />} />
          <Route path="/admin/brand/:id" element={<BrandDetail />} />
          <Route path="/admin/coordilooks" element={<CoordiLookList />} />
          <Route path="/admin/coordilook/:id" element={<CoordiLookDetail />} />
          <Route path="/admin/items" element={<ItemList />} />
          <Route path="/admin/item/:id" element={<ItemDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
