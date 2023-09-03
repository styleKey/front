import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';

import StylePointList from './components/StylePoint/StylePointList';
import StylePointDetail from './components/StylePoint/StylePointDetail';

import BrandList from './components/Brand/BrandList';
import BrandDetail from './components/Brand/BrandDetail';
import CreateBrand from './components/Brand/CreateBrand';
import EditBrand from './components/Brand/EditBrand';

import CoordiLookList from './components/CoordiLook/CoordiLookList';
import CoordiLookDetail from './components/CoordiLook/CoordiLookDetail';
import CreateCoordiLook from './components/CoordiLook/CreateCoordiLook';

import ItemList from './components/Item/ItemList';
import ItemDetail from './components/Item/ItemDetail';
import CreateItem from './components/Item/CreateItem';

import CategoryList from './components/Category/CategoryList';
import CategoryDetail from './components/Category/CategoryDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element={<StylePointList />} />
          <Route path="/stylepoints" element={<StylePointList />} />
          <Route path="/stylepoint/:id" element={<StylePointDetail />} />s

          <Route path="/brands" element={<BrandList />} />
          <Route path="/brand/:id" element={<BrandDetail />} />
          <Route path="/brand/create" element={<CreateBrand />} />
          <Route path="/brand/:id/edit" element={<EditBrand />} />

          <Route path="/coordilooks" element={<CoordiLookList />} />
          <Route path="/coordilook/:id" element={<CoordiLookDetail />} />
          <Route path="/coordilook/create" element={<CreateCoordiLook />} />

          <Route path="/items" element={<ItemList />} />
          <Route path="/item/:id" element={<ItemDetail />} />
          <Route path="/item/create" element={<CreateItem />} />

          <Route path="/categories" element={<CategoryList />} />
          <Route path="/category/:id" element={<CategoryDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
