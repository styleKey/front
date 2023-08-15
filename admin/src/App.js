import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import StylePointForm from './components/StylePointForm';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <nav>
          <ul>
            <li>
              <Link to="/stylepoint">StylePoint 스타일포인트</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/stylepoint" element={<StylePointForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
