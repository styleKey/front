import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import StylePointForm from './components/StylePointForm';
import BrandForm from './components/BrandForm';
import CoordiLookForm from './components/CoordiLookForm';
import ItemForm from './components/ItemForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>
          <Link to="/" className="link-no-underline">Admin Page</Link>
        </h1>
        <nav>
          <ul>
            <li>
              <Link to="/style-points">Style Points</Link>
            </li>
            <li>
              <Link to="/brands">Brands</Link>
            </li>
            <li>
              <Link to="/coordi-looks">Coordi Looks</Link>
            </li>
            <li>
              <Link to="/items">Items</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/style-points" element={<StylePointForm />} />
          <Route path="/brands" element={<BrandForm />} />
          <Route path="/coordi-looks" element={<CoordiLookForm />} />
          <Route path="/items" element={<ItemForm />} />
        </Routes>
      </div>
    </Router>
  );
}

function Home() {
  return <p>패션취향테스트를 통한 사용자맞춤형 패션 정보 제공 웹 서비스</p>;
}

export default App;
