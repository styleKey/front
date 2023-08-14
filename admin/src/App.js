import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import StylePointForm from './components/StylePointForm';
import CoordiLookForm from './components/CoordiLookForm';
import BrandForm from './components/BrandForm';
import CategoryForm from './components/CategoryForm';
import ItemForm from './components/ItemForm';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="container">
        <nav>
          <ul>
          <li>
              <Link to="/stylepoint">StylePoint 스타일포인트</Link>
            </li>
            <li>
              <Link to="/category">Category 카테고리(상의, 하의 등등)</Link>
            </li>
            <li>
              <Link to="/brand">Brand 브랜드</Link>
            </li>
            <li>
              <Link to="/item">Item 아이템</Link>
            </li>
            <li>
              <Link to="/coordilook">CoordiLook 코디룩</Link>
            </li>
          </ul>
        </nav>

        
        <Routes>
          <Route path="/stylepoint" element={<StylePointForm />} />
          <Route path="/coordilook" element={<CoordiLookForm />} />
          <Route path="/brand" element={<BrandForm />} />
          <Route path="/category" element={<CategoryForm />} />
          <Route path="/item" element={<ItemForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
