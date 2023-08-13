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
              <Link to="/category">Category [0번대]</Link>
            </li>
            <li>
              <Link to="/stylepoint">StylePoint [100번대]</Link>
            </li>
            <li>
              <Link to="/brand">Brand [200번대]</Link>
            </li>
            <li>
              <Link to="/item">Item [300번대]</Link>
            </li>
            <li>
              <Link to="/coordilook">CoordiLook [400번대]</Link>
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
