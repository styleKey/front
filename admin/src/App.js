import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';

import StylePointList from './components/StylePoint/StylePointList';
import StylePointDetail from './components/StylePoint/StylePointDetail';
import EditStylePoint from './components/StylePoint/EditStylePoint';

import BrandDetail from './components/Brand/BrandDetail';
import CreateBrand from './components/Brand/CreateBrand';
import EditBrand from './components/Brand/EditBrand';

import CoordiLookDetail from './components/CoordiLook/CoordiLookDetail';
import CreateCoordiLook from './components/CoordiLook/CreateCoordiLook';
import EditCoordiLook from './components/CoordiLook/EditCoordiLook';

import ItemDetail from './components/Item/ItemDetail';
import CreateItem from './components/Item/CreateItem';
import EditItem from './components/Item/EditItem';

import CategoryDetail from './components/Category/CategoryDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="App-container">
          <Routes>
            <Route path="/" element={<StylePointList />} />
            <Route path="/stylepoints" element={<StylePointList />} />
            <Route path="/stylepoint/:id" element={<StylePointDetail />} />
            <Route path="/stylepoint/:id/edit" element={<EditStylePoint />} />

            <Route path="/brand/:id" element={<BrandDetail />} />
            <Route path="/brand/create" element={<CreateBrand />} />
            <Route path="/brand/:id/edit" element={<EditBrand />} />

            <Route path="/coordilook/:id" element={<CoordiLookDetail />} />
            <Route path="/coordilook/create" element={<CreateCoordiLook />} />
            <Route path="/coordilook/:id/edit" element={<EditCoordiLook />} />

            <Route path="/item/:id" element={<ItemDetail />} />
            <Route path="/item/create" element={<CreateItem />} />
            <Route path="/item/:id/edit" element={<EditItem />} />

            <Route path="/category/:id" element={<CategoryDetail />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
