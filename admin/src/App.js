import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import StylePointList from './components/StylePoint/StylePointList';
import StylePointDetail from './components/StylePoint/StylePointDetail';
import BrandList from './components/Brand/BrandList';
import BrandDetail from './components/Brand/BrandDetail';
import CoordiLookList from './components/CoordiLook/CoordiLookList';
import CoordiLookDetail from './components/CoordiLook/CoordiLookDetail';
import ItemList from './components/Item/ItemList';
import ItemDetail from './components/Item/ItemDetail';
import CategoryList from './components/Category/CategoryList';
import CategoryDetail from './components/Category/CategoryDetail';

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
          <Route path="/admin/categories" element={<CategoryList />} />
          <Route path="/admin/category/:id" element={<CategoryDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
