import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import axios from 'axios'; // axios 임포트
import StylePointForm from './components/StylePointForm';
import './App.css';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/stylepoint">StylePoint 스타일포인트</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        {/* StylePointForm에 axios 인스턴스 전달 */}
        <Route path="/stylepoint" element={<StylePointForm />} />
      </Routes>
    </Router>
  );
}

export default App;
