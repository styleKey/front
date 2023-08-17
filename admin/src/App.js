import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import StylePointForm from './components/StylePointForm'; // StylePointForm 컴포넌트 가져오기
import BrandForm from './components/BrandForm'; // BrandForm 컴포넌트 가져오기
import './App.css';

function App() {
  return (
    <Router> {/* Router 컴포넌트를 사용하여 라우팅 설정 */}
      <nav>
        <ul>
          <li>
            <Link to="/stylepoint">StylePoint 스타일포인트</Link> {/* /stylepoint 경로로 이동하는 링크 */}
            <Link to="/brand">Brand 브랜드</Link> {/* /brand 경로로 이동하는 링크 */}
          </li>
        </ul>
      </nav>

      <Routes> {/* 라우팅 경로에 따라 컴포넌트를 렌더링하기 위한 Routes 컴포넌트 */}
        <Route path="/stylepoint" element={<StylePointForm />} /> {/* /stylepoint 경로에 StylePointForm 컴포넌트를 렌더링 */}
        <Route path="/brand" element={<BrandForm />} /> {/* /stylepoint 경로에 StylePointForm 컴포넌트를 렌더링 */}
      </Routes>
    </Router>
  );
}

export default App; // App 컴포넌트를 내보내기
